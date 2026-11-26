use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
pub enum PlatformId {
    Steam,
    Heroic,
    Epic,
    Gog,
    Manual,
}

#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
pub enum ExecutionTarget {
    NativeWindows,
    NativeLinux,
    Proton(String),
    Wine(String),
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct GameEntry {
    pub id: String,
    pub title: String,
    pub platform: PlatformId,
    pub executable_path: Option<String>,
    pub install_directory: Option<String>,
    pub launch_arguments: Vec<String>,
    pub target: ExecutionTarget,
    pub is_favorite: bool,
    pub banner_image: Option<String>,
}

#[derive(Debug, thiserror::Error)]
pub enum GccError {
    #[error("Platform error: {0}")]
    Platform(String),
    #[error("Library scan failed: {0}")]
    LibraryScan(String),
    #[error("Game launch failed: {0}")]
    Launch(String),
    #[error("IO failure: {0}")]
    Io(#[from] std::io::Error),
    #[error("Serialization failure: {0}")]
    Serialization(#[from] serde_json::Error),
}

pub type Result<T> = std::result::Result<T, GccError>;
