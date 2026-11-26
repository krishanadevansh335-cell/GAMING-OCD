use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct HardwareMetrics {
    pub cpu_usage_percent: f32,
    pub gpu_usage_percent: f32,
    pub ram_used_mb: u64,
    pub ram_total_mb: u64,
    pub battery_percent: Option<f32>,
    pub temperature_celsius: Option<f32>,
}
