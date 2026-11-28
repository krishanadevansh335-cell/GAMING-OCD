use axum::{routing::get, Router};

async fn health() -> &'static str { "ok" }

#[tokio::main]
async fn main() {
    let app = Router::new().route("/health", get(health));
    let listener = tokio::net::TcpListener::bind("0.0.0.0:8080").await.expect("bind API listener");
    axum::serve(listener, app).await.expect("serve API");
}
