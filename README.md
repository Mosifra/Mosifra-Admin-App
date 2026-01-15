# Admin App Setup (Tauri)

This admin project can be run using the provided **Nix Flake** or with a
manually installed Rust + Tauri toolchain.

## Using Nix Flake

The flake sets up a complete development environment, including:

- **Rust & Cargo** (`cargo`, `rustc`, `rustfmt`, `clippy`, `rust-analyzer`)
- **Bun** for JS/TS scripts
- **Cargo Tauri** (`cargo-tauri`)
- **Node.js**
- All necessary GTK, WebKit, and system libraries for Tauri on Linux

Once inside the dev shell:

- Environment variables are configured automatically.
- `bun tauri dev` is launched to start the app.
- `neovide` is also launched for editing convenience.

> ⚠️ Make sure a `.env` file exists in the project root before running the app,
> as it contains all required configuration variables.

## Running Locally Without Flake

If you prefer not to use Nix:

1. Install **Rust**, **Cargo**, **Node.js**, **Bun**, and **Cargo Tauri**.
2. Install required system libraries for GTK/WebKit.
3. Ensure a `.env` file exists in the project root, containing the admin app
   password, and the jwt hash.
4. Start the app with:

bun tauri dev

Notes

The shell ensures proper GTK/WebKit environment variables are set.

Standard Tauri commands can be used inside the shell.
