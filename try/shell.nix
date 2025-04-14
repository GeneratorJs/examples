{ pkgs ? import <nixpkgs> {} }:
#{ pkgs ? import (fetchTarball  "https://github.com/NixOS/nixpkgs/tarball/nixos-24.05") {} }:
let
  message = "Lets Start Development";
in 
pkgs.mkShellNoCC {
  buildInputs = with pkgs; [ nodejs ];

  packages = with pkgs; [
    nodejs_22
    nodePackages.browser-sync 
    nodePackages.nodemon 
    nodePackages.parcel
    vscodium 
    firefox
    nodejs 
 #   pkgs.nodePackages.nodemon
 #   pkgs.nodePackages.browser-sync 
 #   pkgs.nodePackages.parcel
    vim 
    curl     
  #  cinnamon.nemo
  ];

  shellHook = ''
    cowsay ${message}
    npm run dev & echo "y" | codium . & firefox localhost:3000 & npm run dev & firefox 127.0.0.1:5501
    '';
}