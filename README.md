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

To use it, you only need **Nix** installed with the experimental features
`nix-command` and `flakes` enabled.

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

## Environment file

To properly run the app, you'll need a .env file in the same folder as the
executable, containing the following values :

- `JWT_SECRET` : The string to use to hash the jwt tokens which will be created
  by the app.

> It needs to be the same as the one used for the Mosifra API, or the app won't
> be able to communicate with it

- `ADMIN_PWD` : The password required to access the app
- `API_BASEURL` : The root url of the api, e.g. `http://localhost:8000`

## Notes

The shell ensures proper GTK/WebKit environment variables are set.

Standard Tauri commands can be used inside the shell.
