use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize)]
pub enum PerformanceProfile {
    Eco,
    Balanced,
    Performance,
    Turbo,
}

pub struct GameModeController {
    pub active_profile: PerformanceProfile,
}

impl Default for GameModeController {
    fn default() -> Self {
        Self {
            active_profile: PerformanceProfile::Balanced,
        }
    }
}
