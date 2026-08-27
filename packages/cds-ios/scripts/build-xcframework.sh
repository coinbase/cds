#!/usr/bin/env bash
# Build a distributable XCFramework of CDSDesignSystem — the iOS counterpart to Android's AAR.
#
# Produces:
#   .build/xcframework/CDSDesignSystem.xcframework       (device + simulator slices)
#   .build/xcframework/CDSDesignSystem.xcframework.zip   (the release asset)
#   prints the SwiftPM checksum for the zip (consumers pin this in .binaryTarget(checksum:))
#
# Run from anywhere; it operates on its own package directory.
set -euo pipefail

SCHEME="CDSDesignSystem"
PACKAGE_DIR="$(cd "$(dirname "$0")/.." && pwd)"
OUT="$PACKAGE_DIR/.build/xcframework"
DEVICE_ARCHIVE="$OUT/ios.xcarchive"
SIM_ARCHIVE="$OUT/simulator.xcarchive"
XCFRAMEWORK="$OUT/$SCHEME.xcframework"
ZIP="$OUT/$SCHEME.xcframework.zip"

cd "$PACKAGE_DIR"
rm -rf "$OUT"
mkdir -p "$OUT"

# BUILD_LIBRARY_FOR_DISTRIBUTION=YES emits a stable module interface (.swiftinterface) so the
# binary survives compiler upgrades; SKIP_INSTALL=NO makes archive keep the built framework.
archive() {
  local destination="$1" archive_path="$2"
  xcodebuild archive \
    -scheme "$SCHEME" \
    -destination "$destination" \
    -archivePath "$archive_path" \
    SKIP_INSTALL=NO \
    BUILD_LIBRARY_FOR_DISTRIBUTION=YES \
    | tail -1
}

echo "==> Archiving device slice"
archive "generic/platform=iOS" "$DEVICE_ARCHIVE"
echo "==> Archiving simulator slice"
archive "generic/platform=iOS Simulator" "$SIM_ARCHIVE"

# SPM library archives place the framework under Products/usr/local/lib.
DEVICE_FW="$(find "$DEVICE_ARCHIVE/Products" -name "$SCHEME.framework" -type d | head -1)"
SIM_FW="$(find "$SIM_ARCHIVE/Products" -name "$SCHEME.framework" -type d | head -1)"

if [[ -z "$DEVICE_FW" || -z "$SIM_FW" ]]; then
  echo "error: could not locate $SCHEME.framework in the archives" >&2
  exit 1
fi

echo "==> Creating XCFramework"
xcodebuild -create-xcframework \
  -framework "$DEVICE_FW" \
  -framework "$SIM_FW" \
  -output "$XCFRAMEWORK" \
  | tail -1

echo "==> Zipping"
(cd "$OUT" && ditto -c -k --keepParent "$SCHEME.xcframework" "$SCHEME.xcframework.zip")

echo
echo "XCFramework: $XCFRAMEWORK"
echo "Zip:         $ZIP"
echo -n "Checksum:    "
swift package compute-checksum "$ZIP"
