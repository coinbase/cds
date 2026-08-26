#!/usr/bin/env bash
# Build the CDS theme gallery and run it on an iOS Simulator.
# The iOS counterpart to `apps/android-app:launch`. Invoked via `yarn nx run ios-gallery:launch`.
set -euo pipefail

cd "$(dirname "$0")/.."

SCHEME="CDSGalleryiOS"
BUNDLE_ID="com.coinbase.cds.gallery"
PROJECT="CDSGallery.xcodeproj"
DERIVED_DATA=".build/xcode"

if ! command -v xcodegen >/dev/null 2>&1; then
  echo "error: xcodegen not found. Install it with: brew install xcodegen" >&2
  exit 1
fi

echo "==> Generating $PROJECT from project.yml"
xcodegen generate

# Pick a booted simulator if there is one; otherwise boot the first available iPhone.
DEVICE_UDID="$(xcrun simctl list devices booted -j | /usr/bin/python3 -c '
import json,sys
d=json.load(sys.stdin)["devices"]
for _,devs in d.items():
    for dev in devs:
        if dev.get("state")=="Booted":
            print(dev["udid"]); sys.exit(0)
')"

if [ -z "${DEVICE_UDID:-}" ]; then
  echo "==> No booted simulator; booting the first available iPhone"
  DEVICE_UDID="$(xcrun simctl list devices available -j | /usr/bin/python3 -c '
import json,sys
d=json.load(sys.stdin)["devices"]
best=None
for _,devs in d.items():
    for dev in devs:
        if dev.get("isAvailable") and dev["name"].startswith("iPhone"):
            best=dev["udid"]
print(best or "")
')"
  if [ -z "${DEVICE_UDID:-}" ]; then
    echo "error: no available iPhone simulator found" >&2
    exit 1
  fi
  xcrun simctl boot "$DEVICE_UDID"
fi

open -a Simulator

echo "==> Building $SCHEME for the simulator"
xcodebuild -project "$PROJECT" -scheme "$SCHEME" \
  -destination "id=$DEVICE_UDID" -derivedDataPath "$DERIVED_DATA" \
  build

APP_PATH="$(xcodebuild -project "$PROJECT" -scheme "$SCHEME" \
  -destination "id=$DEVICE_UDID" -derivedDataPath "$DERIVED_DATA" \
  -showBuildSettings 2>/dev/null \
  | awk -F' = ' '/ TARGET_BUILD_DIR /{d=$2} / FULL_PRODUCT_NAME /{p=$2} END{print d"/"p}')"

echo "==> Installing $APP_PATH"
xcrun simctl install "$DEVICE_UDID" "$APP_PATH"

echo "==> Launching $BUNDLE_ID"
xcrun simctl launch "$DEVICE_UDID" "$BUNDLE_ID"
