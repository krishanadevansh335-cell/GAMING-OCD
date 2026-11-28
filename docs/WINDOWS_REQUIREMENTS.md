# Windows requirements

GCC v0.0.01 targets Windows 10/11, with Windows 11 as the primary development target.

## Development tools

- Node.js 20+ and pnpm 12.23.0
- Rust 1.90+ for `x86_64-pc-windows-msvc`
- Visual Studio C++ Build Tools (MSVC)
- WebView2 Runtime

## Start the project

```powershell
pnpm install
pnpm --filter desktop dev
pnpm --filter desktop tauri dev
```

The browser preview and native shell provide navigation and explicitly labelled placeholder pages. Game-store detection, game launching, OS handoff, compatibility data, system telemetry, and performance controls are not active.
