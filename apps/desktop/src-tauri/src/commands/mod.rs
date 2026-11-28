#[tauri::command]
pub fn app_version() -> &'static str {
    "0.0.01"
}
