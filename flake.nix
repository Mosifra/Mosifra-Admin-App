{
  description = "Tauri devenv";
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs";
  };
  outputs = {
    self,
    nixpkgs,
  }: let
    system = "x86_64-linux";
    pkgs = import nixpkgs {inherit system;};
  in {
    packages.${system}.default = pkgs.rustPlatform.buildRustPackage rec {
      pname = "mosifra-admin-app";
      version = "0.1.0";

      src = ./.;

      cargoHash = "sha256-h6yp64aQpj534dnxytsnmPdbAPp0QGjCQ20xeDgIlRg=";

      npmDeps = pkgs.fetchNpmDeps {
        name = "${pname}-${version}-npm-deps";
        inherit src;
        hash = "sha256-jE58v93Jfxe+kKSXQ+5R0p1VusaSi/SwIwJ+V1gVe+o=";
      };

      makeCacheWritable = true;

      nativeBuildInputs = with pkgs; [
        cargo-tauri.hook

        nodejs
        bun
        pkgs.npmHooks.npmConfigHook

        pkg-config
        wrapGAppsHook3
      ];

      buildInputs = with pkgs; [
        glib-networking
        openssl
        webkitgtk_4_1
        at-spi2-atk
        cairo
        gdk-pixbuf
        glib
        gtk3
        harfbuzz
        librsvg
        libsoup_3
        pango
      ];

      cargoRoot = "src-tauri";
      buildAndTestSubdir = cargoRoot;

      meta = with pkgs.lib; {
        description = "Mosifra Admin App";
        license = licenses.mit;
        platforms = platforms.linux;
      };
    };

    devShells.${system}.default = pkgs.mkShell {
      nativeBuildInputs = with pkgs; [
        pkg-config
        gobject-introspection
        cargo
        bun
        cargo-tauri
        nodejs
        rustc
        rustfmt
        clippy
        rust-analyzer
      ];
      buildInputs = with pkgs; [
        at-spi2-atk
        xdg-utils
        atkmm
        cairo
        gdk-pixbuf
        glib
        gtk3
        harfbuzz
        librsvg
        libsoup_3
        pango
        webkitgtk_4_1
        openssl
        glib-networking
      ];
      shellHook = ''
        export PATH=$PATH:/run/current-system/sw/bin
        export XDG_DATA_DIRS=${pkgs.gsettings-desktop-schemas}/share/gsettings-schemas/${pkgs.gsettings-desktop-schemas.name}:${pkgs.gtk3}/share/gsettings-schemas/${pkgs.gtk3.name}:$XDG_DATA_DIRS;
        export GIO_MODULE_DIR="${pkgs.glib-networking}/lib/gio/modules"
        export WEBKIT_DISABLE_COMPOSITING_MODE=1

        mkdir -p $HOME/.local/bin
        ln -sf $(which xdg-open) $HOME/.local/bin/xdg-open
        export PATH=$HOME/.local/bin:$PATH
        neovide &
      '';
    };
  };
}
