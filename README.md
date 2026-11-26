# GAMING-OCD

**Gaming Operating Center & Director (GAMING-OCD)** is a cross-platform gaming control center engineered for dual-boot and hybrid gaming environments, specifically bridging **Windows** and **Bazzite Linux** (SteamOS-like distributions).

## Architecture Overview

GAMING-OCD is structured as a modular monorepo leveraging:
- **Desktop Frontend (`apps/desktop`)**: React, TypeScript, Tailwind CSS, Lucide icons, and gamepad-first navigation.
- **Desktop Native Shell (`apps/desktop/src-tauri`)**: Tauri 2 application runtime with secure IPC commands.
- **Application Engine (`crates/`)**: Modular Rust crates covering catalog indexing, compatibility checks, telemetry, and game launching.
- **Platform Layers (`platform/`)**: Dedicated platform abstraction adapters for Windows and Linux to prevent cross-platform contamination.

```
GAMING-OCD/
├── apps/
│   └── desktop/               # React + TypeScript + Tauri 2 UI
├── crates/                    # Shared core business logic (Rust)
│   ├── gcc-core/              # Core domain models and errors
│   ├── gcc-database/          # Persistent data store and cache
│   ├── gcc-library/           # Game scanner (Steam, Heroic, etc.)
│   ├── gcc-launcher/          # Execution lifecycle manager
│   ├── gcc-compatibility/     # ProtonDB and anticheat records
│   ├── gcc-routing/           # Windows <-> Bazzite reboot orchestrator
│   ├── gcc-telemetry/         # System metrics and sensor reader
│   └── gcc-game-mode/         # Performance profiles and process tuning
├── platform/                  # OS-specific low-level drivers
│   ├── windows/               # Win32 / BCD / Power / GameBar integrations
│   └── linux/                 # systemd-boot / GameScope / power-profiles
├── data/                      # Game catalogs and compatibility schemas
├── docs/                      # Architectural specifications and manuals
└── .github/                   # Continuous integration workflows
```

## Milestone Roadmap

1. **Foundation**: Monorepo orchestration, Tauri 2 backend, React frontend shell.
2. **Interface**: Fullscreen gamepad-first navigation, library browser, and quick actions.
3. **Detection**: Steam and Heroic installed title discovery.
4. **Launch Engine**: Safe launch wrapper with environment validation.
5. **Compatibility Matrix**: ProtonDB status, anticheat compatibility indicators.
6. **OS Routing**: Verified, non-destructive reboot handoff between Windows and Bazzite Linux.
7. **Game Mode**: Reversible power profile switching and process priority tuning.
8. **Integrations**: Discord Rich Presence, audio sink routing, overlay hooks.
9. **Distribution**: Windows MSI/NSIS and Linux AppImage/RPM packaging.

## Getting Started

### Prerequisites

- Node.js (v20+) & `pnpm`
- Rust (MSRV 1.78+)
- Platform build dependencies (MSVC toolchain on Windows; WebKit2GTK on Linux)

### Development

```bash
# Install frontend dependencies
pnpm install

# Run frontend in browser preview mode
pnpm --filter desktop dev

# Launch desktop app with Tauri 2
pnpm --filter desktop tauri dev
```
