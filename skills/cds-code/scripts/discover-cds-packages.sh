#!/usr/bin/env bash
#
# Discovers installed CDS packages, their versions, valid export paths,
# and the CDS runtime (web or mobile).
#
# Usage:
#   bash discover-cds-packages.sh [node_modules_path]
#
# If node_modules_path is omitted, walks up from $PWD to find the nearest
# node_modules directory.
#
# Output: a CDS Runtime line, then one section per discovered CDS package
# with name, version, and every valid subpath export.

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

resolve_package() {
  local node_modules="$1" suffix="$2"
  for scope in $(ls "$node_modules" | grep '^@' 2>/dev/null); do
    if [[ -f "$node_modules/$scope/$suffix/package.json" ]]; then
      echo "$scope/$suffix"
      return 0
    fi
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

# Detect CDS runtime
has_web=0
has_mobile=0
resolve_package "$NODE_MODULES" "cds-web" >/dev/null 2>&1 && has_web=1
resolve_package "$NODE_MODULES" "cds-mobile" >/dev/null 2>&1 && has_mobile=1

if [[ $has_web -eq 1 && $has_mobile -eq 1 ]]; then
  echo "CDS Runtime: web (both web and mobile are installed, defaulting to web)"
elif [[ $has_web -eq 1 ]]; then
  echo "CDS Runtime: web"
elif [[ $has_mobile -eq 1 ]]; then
  echo "CDS Runtime: mobile"
else
  echo "CDS Runtime: unknown (neither cds-web nor cds-mobile found)"
fi
echo ""

# Print package details
found=0

for suffix in "${CDS_PACKAGE_SUFFIXES[@]}"; do
  pkg_name="$(resolve_package "$NODE_MODULES" "$suffix" 2>/dev/null)" || continue
  found=1

  pkg_json="$NODE_MODULES/$pkg_name/package.json"
  version=$(node -e "console.log(require('$pkg_json').version)")

  echo "=== $pkg_name@$version ==="
  echo ""

  node -e "
    const exports = require('$pkg_json').exports || {};
    const paths = Object.keys(exports)
      .filter(p => p !== './package.json' && !p.toLowerCase().includes('v7'))
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
