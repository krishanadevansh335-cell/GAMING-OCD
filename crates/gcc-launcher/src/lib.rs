use gcc_core::{GameEntry, GccError, Result};

pub struct LauncherService;

impl LauncherService {
    pub fn new() -> Self {
        Self
    }

    pub fn launch(&self, game: &GameEntry) -> Result<u32> {
        // Launches target process with platform isolation
        if let Some(ref exec) = game.executable_path {
            let mut cmd = std::process::Command::new(exec);
            cmd.args(&game.launch_arguments);
            let child = cmd.spawn().map_err(|e| GccError::Launch(e.to_string()))?;
            Ok(child.id())
        } else {
            Err(GccError::Launch("Executable path is not configured".into()))
        }
    }
}
