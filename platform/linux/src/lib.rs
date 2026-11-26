// Linux/Bazzite adapter: systemd-boot next-boot, GameScope integration
pub fn is_linux_gaming_environment() -> bool {
    cfg!(target_os = "linux")
}
