use gcc_core::{GccError, Result};
use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize)]
pub enum OSHandoffTarget {
    Windows,
    BazziteLinux,
}

pub trait BootRouter: Send + Sync {
    fn detect_active_os(&self) -> OSHandoffTarget;
    fn schedule_reboot(&self, target: OSHandoffTarget) -> Result<()>;
}

pub struct FallbackRouter;

impl BootRouter for FallbackRouter {
    fn detect_active_os(&self) -> OSHandoffTarget {
        if cfg!(target_os = "windows") {
            OSHandoffTarget::Windows
        } else {
            OSHandoffTarget::BazziteLinux
        }
    }

    fn schedule_reboot(&self, _target: OSHandoffTarget) -> Result<()> {
        Err(GccError::Platform("Boot manager integration pending initialization".into()))
    }
}
