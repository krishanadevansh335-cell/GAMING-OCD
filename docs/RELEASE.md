# Release guide

## Foundation release

The initial display/release version is `0.0.01`; its tag is `v0.0.01`. Package manifests use valid SemVer `0.0.1`, since SemVer forbids a leading zero in a numeric component. `.github/workflows/release-windows.yml` builds Windows NSIS bundles on a tag and creates a **draft** GitHub Release. A maintainer must verify the artifacts and publish the draft.

## Before enabling signed updates

1. Replace `OWNER/REPOSITORY` in the Tauri updater endpoint with the actual public repository.
2. Generate a real updater signing key using the official Tauri CLI on a secure machine. Do not commit the private key.
3. Put the private key and optional key password in the protected GitHub `release` environment as `TAURI_SIGNING_PRIVATE_KEY` and `TAURI_SIGNING_PRIVATE_KEY_PASSWORD`.
4. Put only the matching public key in `apps/desktop/src-tauri/tauri.conf.json`.
5. Confirm the updater manifest is produced and signatures verify before publishing any release.
6. Review and pin third-party GitHub Actions to commit SHAs before production use; current action references are readable version tags and are not production-pinned.

The placeholder public key and endpoint intentionally prevent a functioning updater until configured. Tauri updater artifacts are enabled in bundle configuration. Never distribute an unsigned update package or bypass signature verification. Automatic installation, user prompts, progress, and restart controls remain future interface work.

## Draft release checks

- Confirm `VERSION`, the `v0.0.01` tag, and normalized `0.0.1` Cargo/pnpm/Tauri metadata agree.
- Run the frontend and Rust checks documented in `DEVELOPMENT.md`.
- Build and install the Windows bundle on a clean Windows 10/11 environment.
- Verify launch, navigation and placeholder labelling.
- Verify update signatures with the configured public key.
- Inspect the draft release artifacts before publishing.

Desktop updates are independent from the Docker API image. The central API is not required by the desktop app.
