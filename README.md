# Gaming Control Center (GCC)

**Foundation version:** `0.0.01`
**Status:** Initial Windows desktop foundation / prototype

GCC is a Windows desktop application built with React, TypeScript, Tailwind CSS, Tauri 2 and Rust. This release provides the application shell and reserved destinations. Game discovery, launch, social, audio, capture, performance, downloads, compatibility and OS routing are not implemented.

## Requirements

- Windows 10/11 (Windows 11 is the primary target)
- Node.js 20 or later and pnpm 12.23.0
- Rust stable with the MSVC C++ build tools and WebView2

## Run

```powershell
pnpm install
pnpm --filter desktop dev       # Browser preview
pnpm --filter desktop tauri dev # Windows desktop app
pnpm --filter desktop build     # TypeScript check + frontend bundle
cargo check --workspace
```

## Project layout

- `apps/desktop`: React application and Tauri shell
- `crates/gcc-database`: SQLite connection and minimal metadata/settings schema
- `crates/`: reserved modular Rust workspace boundaries from the prior repository foundation
- `platform/`: reserved platform adapter boundaries
- `infrastructure/`: separate central API container foundation; not needed on desktop
- `.github/workflows/release-windows.yml`: draft-only Windows release pipeline
- `docs/`: architecture, development and release procedures

## Implemented state

| Area | State |
|---|---|
| React shell, Forest Crimson design system, 9 pages | Implemented; `tsc --noEmit` and `vite build` verified |
| Feature pages & telemetry | Honest visual placeholders only (no fake data) |
| Local UI preferences | Implemented via Zustand (theme, sidebar, reduced motion) |
| Tauri 2 window and narrow version IPC | Implemented; Windows packaging pending |
| SQLite startup and minimal schema | Implemented; migration initialization is non-destructive |
| Tauri updater registration | Configured with endpoint/key placeholders; signing/release unverified |
| GitHub release workflow | Draft configuration; not run |
| Docker API health foundation | Source/configuration only; not built |

## Version procedure

The requested display/release identifier is `0.0.01` (see `VERSION` and Git tag `v0.0.01`). Package manifests use valid SemVer `0.0.1`, because SemVer rejects leading zeroes in numeric components. Keep the display identifier and manifest version aligned using this documented normalization.

See [DEVELOPMENT.md](docs/DEVELOPMENT.md), [RELEASE.md](docs/RELEASE.md), and [ARCHITECTURE.md](docs/ARCHITECTURE.md).
