use gcc_routing::{BootRouter, FallbackRouter, OSHandoffTarget};

#[tauri::command]
pub fn get_current_os() -> String {
    let router = FallbackRouter;
    match router.detect_active_os() {
        OSHandoffTarget::Windows => "Windows".into(),
        OSHandoffTarget::BazziteLinux => "Bazzite Linux".into(),
    }
}

#[tauri::command]
pub fn request_os_reboot(target_os: String) -> Result<String, String> {
    let router = FallbackRouter;
    let target = match target_os.to_lowercase().as_str() {
        "windows" => OSHandoffTarget::Windows,
        _ => OSHandoffTarget::BazziteLinux,
    };
    router.schedule_reboot(target).map_err(|e| e.to_string())?;
    Ok(format!("Handoff to {:?} scheduled", target))
}
