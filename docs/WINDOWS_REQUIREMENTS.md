# GAMING-OCD — Windows Development & Environment Status

Target Machine: **Acer Predator Helios Neo 16** (Intel Core i9-14900HX, NVIDIA GeForce RTX 4070 Laptop GPU, 16 GB RAM)  
Operating System: **Windows 11 64-bit**

---

## 1. Environment Audit & Installation Checklist

### Development Environment (Core Prerequisites)
- [x] **Windows 11 64-bit**: Verified.
- [x] **Visual Studio Code**: Installed (`v1.130.0`).
- [x] **Node.js**: Installed (`v24.14.0`).
- [x] **pnpm**: Installed globally (`v12.23.0`).
- [x] **Git**: Installed (`v2.53.0.windows.1`).
- [x] **WebView2 Runtime**: Verified present in `C:\Program Files (x86)\Microsoft\EdgeWebView\Application`.
- [ ] **Microsoft Visual Studio C++ Build Tools**: Required for MSVC C++ compilation.
  - Install command: `winget install --id Microsoft.VisualStudio.2022.BuildTools --override "--passive --wait --add Microsoft.VisualStudio.Workload.VCTools --includeRecommended"`
- [ ] **Rust (stable-x86_64-pc-windows-msvc)**: Required for compiling Tauri 2 backend and Rust crates.
  - Install command: `winget install --id Rustlang.Rustup` (or download `rustup-init.exe` from [rust-lang.org](https://rust-lang.org/tools/install/)).
- [ ] **Tauri CLI**: After Rust is installed: `cargo install tauri-cli --version "^2.0.0"`.

---

### Project Workspace & Dependencies
- [x] **Monorepo Structure**: React 18 + TypeScript + Tauri 2 + Rust workspace.
- [x] **pnpm Workspaces**: Configured and lockfile verified (`apps/desktop`, `crates/*`, `platform/*`).
- [x] **Tailwind CSS & Design Tokens**: Configured with dark gaming theme.
- [x] **Frontend Production Build**: Verified (`pnpm build` creates optimized production bundle in `apps/desktop/dist/`).
- [x] **Tauri 2 Configuration**: Configured with window parameters and IPC permissions (`apps/desktop/src-tauri/tauri.conf.json`).
- [ ] **Native Rust Backend Build**: Ready to compile once C++ Build Tools & Rust are installed.

---

### Windows Gaming Integrations (Local Detection)
- [x] **Steam**: Detected in Windows registry (`c:/new folder/steam.exe`).
- [ ] **Epic Games Launcher**: Optional.
- [ ] **GOG Galaxy**: Optional.
- [ ] **EA App**: Optional.
- [ ] **Discord**: Optional.
- [ ] **OBS Studio**: Optional.
- [ ] **NVIDIA Broadcast**: Optional.

---

## 2. Next Steps for Windows 11 Build

1. Open PowerShell as Administrator and run:
   ```powershell
   winget install --id Microsoft.VisualStudio.2022.BuildTools --override "--passive --wait --add Microsoft.VisualStudio.Workload.VCTools --includeRecommended"
   winget install --id Rustlang.Rustup
   ```
2. Restart terminal to refresh environment variables, and verify:
   ```powershell
   rustc --version
   cargo --version
   ```
3. Run the desktop application:
   ```powershell
   # In browser preview mode:
   pnpm dev

   # In native Windows Tauri 2 window:
   pnpm --filter desktop tauri dev
   ```
