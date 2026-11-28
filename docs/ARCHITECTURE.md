# Architecture

## Desktop

`apps/desktop` contains a React + TypeScript + Vite frontend styled with Tailwind and a Tauri 2 Rust shell. The navigation state stays in the frontend. `src-tauri/src/commands` exposes a single version command; no feature command is registered. Tauri capabilities are limited to core and updater APIs.

## Local data

`crates/gcc-database` provides an async SQLite pool constructor with create-if-missing enabled. Tauri initializes it under the app data directory and manages the pool. The only initial tables store generic application metadata and settings; migrations do not drop or replace user data.

## Central service

`infrastructure/api` is an independently containerized Rust HTTP service with only a health endpoint. `.env.example` reserves a PostgreSQL URL for future service needs; the current API does not connect to PostgreSQL or store application features. End-user desktops do not need Docker.

## Updates and distribution

Tauri updater support is registered, while its owner, repository and public key remain placeholders. Signing secrets are supplied through a protected GitHub environment. The Windows workflow makes draft releases only. Desktop updates do not depend on the Docker service.

## Boundaries

Game integrations, compatibility, audio, capture, social, system metrics, game mode, boot routing and actual update UX remain unspecified. UI destinations communicate that these are reserved; no operational behavior is inferred.
