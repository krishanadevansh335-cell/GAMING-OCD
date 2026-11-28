use sqlx::{sqlite::{SqliteConnectOptions, SqlitePoolOptions}, SqlitePool};
use std::path::Path;

#[derive(Debug, thiserror::Error)]
pub enum DatabaseError {
    #[error("SQLite setup failed: {0}")]
    Sqlx(#[from] sqlx::Error),
    #[error("SQLite migration failed: {0}")]
    Migration(#[from] sqlx::migrate::MigrateError),
    #[error("SQLite path is invalid: {0}")]
    Path(#[from] std::io::Error),
}

/// Opens or creates the local GCC database without replacing existing user data.
pub async fn open_database(path: &Path) -> Result<SqlitePool, DatabaseError> {
    if let Some(parent) = path.parent() { std::fs::create_dir_all(parent)?; }
    let options = SqliteConnectOptions::new()
        .filename(path)
        .create_if_missing(true)
        .foreign_keys(true);
    let pool = SqlitePoolOptions::new().max_connections(4).connect_with(options).await?;
    sqlx::migrate!("./migrations").run(&pool).await?;
    Ok(pool)
}
