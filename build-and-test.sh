#!/bin/bash -eu
set -eu # We do this twice so that winadows github runners will properly read them
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")"; pwd)" # Figure out where the script is running
# shellcheck source=lib/robust-bash.sh
. "$SCRIPT_DIR"/lib/robust-bash.sh 

npm install # We can't do npm ci because lerna has optional dependencies :(
npx lerna bootstrap

npx lerna run format:check
npx lerna run build
npx lerna run lint
npx lerna run test
npx lerna run test:verify
npx lerna run package
