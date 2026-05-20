# expo-app

Expo-based demo app for testing CDS mobile components. Used as the visual regression (visreg) target app for the CDS v9 branch.

## Nx targets

| Command                                                | Description                                                                             |
| ------------------------------------------------------ | --------------------------------------------------------------------------------------- |
| `yarn nx run expo-app:ios`                             | Build (if needed), install, launch, and start Metro — full dev loop for iOS (debug)     |
| `yarn nx run expo-app:ios --configuration=release`     | Install and launch the release build artifact (no Metro)                                |
| `yarn nx run expo-app:android`                         | Build (if needed), install, launch, and start Metro — full dev loop for Android (debug) |
| `yarn nx run expo-app:android --configuration=release` | Install and launch the release build artifact (no Metro)                                |
| `yarn nx run expo-app:start`                           | Start Metro bundler only (assumes app is already installed)                             |
| `yarn nx run expo-app:build --configuration=<config>`  | Compile the native app and archive to a tarball in `prebuilds/`                         |
| `yarn nx run expo-app:launch --configuration=<config>` | Install + launch an existing build artifact on a simulator/emulator                     |
| `yarn nx run expo-app:patch-bundle-ios`                | Swap the JS bundle inside the committed iOS Release prebuild — used by visreg CI        |
| `yarn nx run expo-app:patch-bundle-android`            | Swap the JS bundle inside the committed Android Release prebuild — used by visreg CI    |
| `yarn nx run expo-app:validate`                        | Check Expo dependency versions for compatibility                                        |
| `yarn nx run expo-app:lint`                            | Lint the app source                                                                     |
| `yarn nx run expo-app:typecheck`                       | Type-check the app source                                                               |

## Build configurations

| Configuration        | Platform | Profile | Target    | Output                                     |
| -------------------- | -------- | ------- | --------- | ------------------------------------------ |
| `ios-debug`          | iOS      | Debug   | Simulator | `prebuilds/ios-debug/expoapp.tar.gz`       |
| `ios-release`        | iOS      | Release | Simulator | `prebuilds/ios-release/expoapp.tar.gz`     |
| `ios-debug-device`   | iOS      | Debug   | Device    | `prebuilds/ios-debug-device/expoapp.ipa`   |
| `ios-release-device` | iOS      | Release | Device    | `prebuilds/ios-release-device/expoapp.ipa` |
| `android-debug`      | Android  | Debug   | Emulator  | `prebuilds/android-debug/expoapp.apk`      |
| `android-release`    | Android  | Release | Emulator  | `prebuilds/android-release/expoapp.apk`    |

## Prebuilds

The `prebuilds/` directory contains pre-compiled native artifacts (tarballs) that are committed to the repo. This means CI and team members never need to run a full native build just to run visreg or launch the app for JS-only development.

**Committed:** iOS tarballs (`.tar.gz`), Android release zips (`.zip`)
**Not committed:** Extracted `.app` directories (recreated at runtime from the tarball), Android debug APKs

### Updating prebuilds

Rebuild and commit a new tarball whenever native dependencies change (e.g. a new native module, an RN upgrade, or an Expo SDK bump):

```bash
# iOS release (used by visreg CI)
yarn nx run expo-app:build --configuration=ios-release

# iOS debug (used for local development)
yarn nx run expo-app:build --configuration=ios-debug

# Then commit the updated tarballs
git add apps/expo-app/prebuilds/
git commit -m "chore: update expo-app prebuilds"
```

### patch-bundle targets

`patch-bundle-ios` and `patch-bundle-android` update the JS bundle inside an already-extracted prebuild without recompiling native code. This is what visreg CI runs instead of a full build:

1. Extracts `prebuilds/ios-release/expoapp.tar.gz` → `prebuilds/ios-release/expoapp.app`
2. Runs `expo export` to produce a fresh JS bundle from the current branch
3. Replaces the JS bundle inside the `.app`

The patched `.app` is then installed directly onto the simulator for screenshot capture.

## Local development

### iOS Simulator

For first-time setup, see the [Expo iOS Simulator guide](https://docs.expo.dev/workflow/ios-simulator/).

1. **Run the app**:

   ```bash
   yarn nx run expo-app:ios
   ```

   This will:
   - Build the app if no artifact exists at `prebuilds/ios-debug/expoapp.tar.gz`
   - Boot the iOS Simulator if not already running
   - Extract, install, and launch the app
   - Start Metro bundler (debug only — release builds launch standalone)

2. **Rebuild when native dependencies change**:
   ```bash
   rm -rf prebuilds/ios-debug
   yarn nx run expo-app:ios
   ```

### Android Emulator

Android requires more manual steps due to expo-dev-client limitations.

For first-time setup, see the [Expo Android Studio Emulator guide](https://docs.expo.dev/workflow/android-studio-emulator/).

1. **Prerequisites**:
   - Android Studio installed with an emulator configured
   - `ANDROID_HOME` environment variable set

2. **Run the app**:

   ```bash
   yarn nx run expo-app:android
   ```

   This will:
   - Build the APK if no artifact exists at `prebuilds/android-debug/expoapp.apk`
   - Start the Android emulator if not already running
   - Install and launch the app via adb
   - Start Metro bundler

3. **Troubleshooting**:

   If the app doesn't connect to Metro automatically:
   - Press `r` in the Metro terminal to reload the app
   - Or shake the device / press Cmd+M to open the dev menu and select "Reload"

   If Metro connection fails entirely:

   ```bash
   adb reverse tcp:8081 tcp:8081
   ```

   Then reload the app.

4. **Rebuild when native dependencies change**:
   ```bash
   rm -rf prebuilds/android-debug
   yarn nx run expo-app:android
   ```

## Expo Go compatibility

This app cannot run in Expo Go due to dependencies on native modules. Specifically, `@react-native-community/datetimepicker` (used by cds-mobile) contains native code not included in Expo Go.

You must use the development build workflow described above.
