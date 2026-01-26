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
    packages.${system}.default = pkgs.stdenv.mkDerivation rec {
      pname = "mosifra-admin";
      version = "0.1.0";

      src = ./.;

      nativeBuildInputs = with pkgs; [
        pkg-config
        cargo
        cargo-tauri
        rustc
        bun
        nodejs
        wrapGAppsHook3
      ];

      buildInputs = with pkgs; [
        at-spi2-atk
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

      buildPhase = ''
        export HOME=$(mktemp -d)

        bun install --frozen-lockfile
        bun run build

        cd src-tauri
        cargo tauri build --bundles deb
        cd ..
      '';

      installPhase = ''
        mkdir -p $out/bin

        cp src-tauri/target/release/${pname} $out/bin/${pname}

        # Or the .deb
        # mkdir -p $out/share
        # cp src-tauri/target/release/bundle/deb/*.deb $out/share/
      '';

      meta = with pkgs.lib; {
        description = "Mosifra Admin Tauri App";
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
