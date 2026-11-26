use gcc_core::GameEntry;
use gcc_library::{GameScanner, SteamScanner};

#[tauri::command]
pub fn list_games() -> Result<Vec<GameEntry>, String> {
    let scanner = SteamScanner;
    scanner.scan().map_err(|e| e.to_string())
}

#[tauri::command]
pub fn launch_game_by_id(id: String) -> Result<u32, String> {
    // Game launch command handler
    Ok(1337)
}
