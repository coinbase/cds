#!/usr/bin/env bash
#
# Discovers installed CDS packages, their versions, and valid export paths.
#
# Usage:
#   bash discover-cds-packages.sh [node_modules_path]
#
# If node_modules_path is omitted, walks up from $PWD to find the nearest
# node_modules directory.
#
# Output: one section per discovered CDS package with name, version, and
# every valid subpath export. Use this output to verify import paths.

set -euo pipefail

CDS_PACKAGE_SUFFIXES=(
  "cds-web"
  "cds-mobile"
  "cds-common"
  "cds-icons"
  "cds-web-visualization"
  "cds-mobile-visualization"
)

find_node_modules() {
  local dir="${1:-$PWD}"
  while [[ "$dir" != "/" ]]; do
    if [[ -d "$dir/node_modules" ]]; then
      echo "$dir/node_modules"
      return 0
    fi
    dir="$(dirname "$dir")"
  done
  return 1
}

if [[ $# -ge 1 ]]; then
  NODE_MODULES="$1"
else
  NODE_MODULES="$(find_node_modules)" || {
    echo "Error: no node_modules directory found." >&2
    exit 1
  }
fi

found=0

for suffix in "${CDS_PACKAGE_SUFFIXES[@]}"; do
  pkg_json=""
  pkg_name=""

  for scope in $(ls "$NODE_MODULES" | grep '^@' 2>/dev/null); do
    candidate="$NODE_MODULES/$scope/$suffix/package.json"
    if [[ -f "$candidate" ]]; then
      pkg_json="$candidate"
      pkg_name="$scope/$suffix"
      break
    fi
  done

  [[ -z "$pkg_json" ]] && continue
  found=1

  version=$(node -e "console.log(require('$pkg_json').version)")

  echo "=== $pkg_name@$version ==="
  echo ""

  node -e "
    const exports = require('$pkg_json').exports || {};
    const paths = Object.keys(exports)
      .filter(p => p !== './package.json')
      .map(p => p === '.' ? '$pkg_name' : '$pkg_name/' + p.slice(2))
      .sort();
    paths.forEach(p => console.log('  ' + p));
  "

  echo ""
done

if [[ $found -eq 0 ]]; then
  echo "No CDS packages found in $NODE_MODULES" >&2
  exit 1
fi
