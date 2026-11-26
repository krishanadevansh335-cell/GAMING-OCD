mod commands;

pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            commands::system::get_system_summary,
            commands::games::list_games,
            commands::games::launch_game_by_id,
            commands::routing::get_current_os,
            commands::routing::request_os_reboot,
        ])
        .run(tauri::generate_context!())
        .expect("error while running GAMING-OCD desktop application");
}
