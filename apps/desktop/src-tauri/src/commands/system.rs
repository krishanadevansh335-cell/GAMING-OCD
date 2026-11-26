use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct SystemSummary {
    pub os_name: String,
    pub hostname: String,
    pub arch: String,
    pub active_game_mode: bool,
}

#[tauri::command]
pub fn get_system_summary() -> SystemSummary {
    SystemSummary {
        os_name: std::env::consts::OS.to_string(),
        hostname: "Gaming-Rig".to_string(),
        arch: std::env::consts::ARCH.to_string(),
        active_game_mode: true,
    }
}
