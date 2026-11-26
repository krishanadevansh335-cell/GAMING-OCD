use gcc_core::{GameEntry, Result};

pub struct LocalDatabase;

impl LocalDatabase {
    pub fn new() -> Self {
        Self
    }

    pub fn get_all_games(&self) -> Result<Vec<GameEntry>> {
        Ok(vec![])
    }
}
