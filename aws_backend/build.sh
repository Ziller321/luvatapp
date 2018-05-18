#!/usr/bin/env bash
if test "$BASH" = "" || "$BASH" -uc "a=();true \"\${a[@]}\"" 2>/dev/null; then
    set -euo pipefail
else
    set -eo pipefail
fi
shopt -s nullglob globstar


rm -rf _build
mkdir _build

version=$(git describe --tags --long --always)
echo ">>> Building version: $version"
echo "$version" > _build/version.info

# TODO: create zip, remove from terraform's responsibility
echo ""
echo ""
echo "Build successfull! (⌐■_■)"
echo ""
echo "Deploy instuctions:"
echo " 1) goto ./terraform"
echo " 2) do terraform init"
echo " 3) make sure you are on the right workspace ! (terraform.io/docs/commands/workspace)" 
echo " 4) terraform apply (carefully check changes before approving the deploy)"
echo ""
