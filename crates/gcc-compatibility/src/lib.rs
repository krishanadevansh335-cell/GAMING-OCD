use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub enum ProtonRating {
    Platinum,
    Gold,
    Silver,
    Bronze,
    Borked,
    Unknown,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct CompatibilityRecord {
    pub game_id: String,
    pub proton_rating: ProtonRating,
    pub anticheat_works_on_linux: bool,
    pub recommended_os: String,
    pub notes: String,
}
