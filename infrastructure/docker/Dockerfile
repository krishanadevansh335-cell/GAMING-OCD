FROM rust:slim AS build
WORKDIR /src
COPY infrastructure/api/Cargo.toml ./Cargo.toml
COPY infrastructure/api/src ./src
RUN cargo build --release

FROM debian:bookworm-slim
COPY --from=build /src/target/release/gcc-central-api /usr/local/bin/gcc-central-api
EXPOSE 8080
USER 65532:65532
ENTRYPOINT ["/usr/local/bin/gcc-central-api"]
