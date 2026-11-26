// Windows-specific adapter: Process control, Power Plans, BCD Boot Target
pub fn is_windows_gaming_environment() -> bool {
    cfg!(target_os = "windows")
}
