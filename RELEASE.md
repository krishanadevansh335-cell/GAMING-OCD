# Private source, public signed Windows releases

The application checks `GAMING-OCD-Releases` for signed updater metadata and installer bundles. Keep this source repository private. Publish only the signed installer artifacts and `latest.json` in the public releases repository.

## One-time GitHub setup

1. Create a **public** repository named `GAMING-OCD-Releases` under `krishanadevansh335-cell`. Give it a `main` branch (an initial README is enough). The source repo remains private.
2. In the private source repository, create a fine-grained personal access token scoped only to `GAMING-OCD-Releases`, with repository **Contents: Read and write** permission. Add it as the Actions secret `GCC_RELEASES_TOKEN`.
3. Generate the Tauri updater signing key pair on a trusted machine using the Tauri CLI. Keep the private key out of this repository and add it to the private source repository as `TAURI_SIGNING_PRIVATE_KEY`; add its password as `TAURI_SIGNING_PRIVATE_KEY_PASSWORD` if you set one. Put only the generated public key in `apps/desktop/src-tauri/tauri.conf.json` at `plugins.updater.pubkey`.
4. Ensure the source repository's `release` Actions environment permits the workflow to run.

## Publishing

Update the app version consistently in the root package, desktop package, Cargo workspace, and `apps/desktop/src-tauri/tauri.conf.json`. Push a version tag such as `v0.1.0` to the private source repository. The workflow builds a Windows NSIS installer, signs updater artifacts, and creates a **draft** release in the public artifacts repository. Review and publish that draft to make it available to the app updater.

The installed app checks for updates at startup when automatic checks are enabled in Settings. It shows the version and release notes and waits for the user to select **Install & Restart**. Tauri validates the update signature using the embedded public key.

## Security notes

- Never commit or paste the updater private key or GitHub token into the source tree or chat.
- The release token is used only by the source repository's GitHub Actions workflow to publish artifacts to the public releases repository.
- Public releases expose compiled installers and updater metadata; they do not expose the private source repository.
- The updater endpoint and public key must both be configured before a release can update installations. A valid signing key pair is required; placeholder keys are intentionally not accepted.
