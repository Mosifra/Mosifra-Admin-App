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
      ];
      shellHook = ''
        export PATH=$PATH:/run/current-system/sw/bin
        # Crée un lien temporaire vers /usr/bin/xdg-open
        mkdir -p $HOME/.local/bin
        ln -sf $(which xdg-open) $HOME/.local/bin/xdg-open
        export PATH=$HOME/.local/bin:$PATH
        neovide &
      '';
    };
  };
}
