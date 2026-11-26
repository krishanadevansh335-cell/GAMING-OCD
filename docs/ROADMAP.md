# Development Roadmap & Implementation Order

1. **Phase 1: Foundation (Current)**
   - Workspace monorepo setup (pnpm + Cargo).
   - Tauri 2 configuration with custom IPC command handlers.
   - Initial React dashboard shell and design system tokens.

2. **Phase 2: Game Discovery & Catalog**
   - VDF parsing for standard Steam installation locations on Windows and Linux.
   - Heroic / Legendary manifest parser for Epic & GOG games.

3. **Phase 3: Launch Wrapper & Session Hooks**
   - Sandboxed process execution.
   - Discord Rich Presence integration during active game sessions.

4. **Phase 4: OS Routing Engine**
   - Windows side: `bcdedit` and UEFI boot-next target setting.
   - Linux side: `systemd-boot` / GRUB configuration for next reboot handoff.

5. **Phase 5: Performance Optimization**
   - Windows Game Mode enforcement and process priority elevation.
   - Linux GameScope argument injection and TDP governor management.
