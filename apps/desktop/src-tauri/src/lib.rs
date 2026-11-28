mod commands;
mod configuration;
mod database;
mod errors;
mod services;
mod updater;
use tauri::Manager;

pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_process::init())
        .plugin(tauri_plugin_updater::Builder::new().build())
        .setup(|app| {
            let database_path = app.path().app_data_dir()?.join("gcc.sqlite3");
            let pool = tauri::async_runtime::block_on(gcc_database::open_database(&database_path))
                .map_err(|error| std::io::Error::other(error.to_string()))?;
            app.manage(pool);
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![commands::app_version])
        .run(tauri::generate_context!())
        .expect("failed to run Gaming Control Center");
}
