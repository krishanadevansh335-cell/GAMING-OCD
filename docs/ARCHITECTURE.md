# System Architecture & Technical Specifications

GAMING-OCD orchestrates dual-boot gaming on x86_64 systems running Windows 11 and Bazzite Linux.

## Layer Decomposition

1. **Frontend Presentation (`apps/desktop/src`)**
   - React 18 / TypeScript, responsive to 16:9 & 16:10 handheld / TV ratios.
   - Designed for gamepad navigation (D-pad, shoulder triggers).
   - Tauri bridge decoupling UI logic from native platform commands.

2. **Tauri 2 Native Bridge (`apps/desktop/src-tauri`)**
   - High-throughput asynchronous IPC invocations.
   - Security permissions enforced through `capabilities/default.json`.

3. **Core Rust Engine (`crates/`)**
   - `gcc-core`: Common data types and error specifications.
   - `gcc-library`: Manifest parsing for Steam VDF files and Heroic installations.
   - `gcc-launcher`: Process spawning, game mode orchestration, and telemetry tracking.
   - `gcc-routing`: UEFI next-boot target programming.
   - `gcc-compatibility`: Database querying for ProtonDB ratings and anti-cheat compatibility.

4. **Platform Adapters (`platform/`)**
   - Isolated platform adapters preventing execution of platform-incompatible system calls.
