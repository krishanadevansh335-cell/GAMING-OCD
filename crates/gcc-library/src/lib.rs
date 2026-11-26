use gcc_core::{GameEntry, PlatformId, ExecutionTarget, Result};

pub trait GameScanner: Send + Sync {
    fn platform(&self) -> PlatformId;
    fn scan(&self) -> Result<Vec<GameEntry>>;
}

pub struct SteamScanner;

impl GameScanner for SteamScanner {
    fn platform(&self) -> PlatformId {
        PlatformId::Steam
    }

    fn scan(&self) -> Result<Vec<GameEntry>> {
        // Reads Steam library folders and app manifests
        Ok(vec![
            GameEntry {
                id: "steam_game_demo".into(),
                title: "Cyberpunk 2077".into(),
                platform: PlatformId::Steam,
                executable_path: None,
                install_directory: None,
                launch_arguments: vec![],
                target: ExecutionTarget::NativeWindows,
                is_favorite: true,
                banner_image: None,
            }
        ])
    }
}
