# Development

## Prerequisites

Install Node.js 20+, pnpm 12.23.0, Rust 1.90 or later (required by the current Tauri updater plugin), the Visual Studio C++ build tools, and WebView2 on Windows.

## Commands

```powershell
pnpm install
pnpm --filter desktop dev
pnpm --filter desktop tauri dev
pnpm --filter desktop typecheck
pnpm --filter desktop build
cargo fmt --all -- --check
cargo check --workspace
cargo test --workspace
```

The browser preview does not require native Tauri APIs for the current shell. No mock game data or simulated device state is supplied.

## Architecture

The React shell owns navigation and visual state. Tauri exposes only a version query; feature IPC should be added only with an approved feature specification. Rust responsibilities are split by modules and crates. SQLite is initialized in Tauri setup through `gcc_database::open_database`, stored in managed application state, and migrated without dropping user data. The initial migration creates only `app_metadata` and `app_settings`.

## Scope rule

Pages not specified for implementation remain labelled placeholders. Do not add operational controls, sample game entries, fabricated telemetry, compatibility claims, or simulated success states.
