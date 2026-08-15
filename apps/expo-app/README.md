# expo-app

Expo-based demo app for testing CDS mobile components. Used as the visual regression (visreg) target app — Maestro flows run against it on BrowserStack App Automate real devices.

## Nx targets

| Command                                                        | Description                                                                       |
| -------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| `yarn nx run expo-app:ios`                                     | Build (if needed), install, launch, and start Metro — full iOS debug dev loop     |
| `yarn nx run expo-app:ios --configuration=release`             | Install and launch the release build (no Metro)                                   |
| `yarn nx run expo-app:android`                                 | Build (if needed), install, launch, and start Metro — full Android debug dev loop |
| `yarn nx run expo-app:android --configuration=release`         | Install and launch the release build (no Metro)                                   |
| `yarn nx run expo-app:start`                                   | Start Metro bundler only (assumes app is already installed)                       |
| `yarn nx run expo-app:build --configuration=<config>`          | Compile the native app and write the artifact to `prebuilds/`                     |
| `yarn nx run expo-app:launch --configuration=<config>`         | Install + launch an existing build artifact on a simulator/emulator               |
| `yarn nx run expo-app:patch-bundle --configuration=ios-device` | Swap the JS bundle inside the committed iOS device `.ipa` — used by CI visreg     |
| `yarn nx run expo-app:patch-bundle --configuration=android`    | Swap the JS bundle inside the committed Android `.apk` — used by CI visreg        |
| `yarn nx run expo-app:validate`                                | Check Expo dependency versions for compatibility                                  |
| `yarn nx run expo-app:lint`                                    | Lint the app source                                                               |
| `yarn nx run expo-app:typecheck`                               | Type-check the app source                                                         |

## Build configurations

| Configuration        | Platform | Profile | Target    | Output                                                 |
| -------------------- | -------- | ------- | --------- | ------------------------------------------------------ |
| `ios-debug`          | iOS      | Debug   | Simulator | `prebuilds/ios-debug/expoapp.tar.gz`                   |
| `ios-release`        | iOS      | Release | Simulator | `prebuilds/ios-release/expoapp.tar.gz`                 |
| `ios-debug-device`   | iOS      | Debug   | Device    | `prebuilds/ios-debug-device/expoapp.ipa`               |
| `ios-release-device` | iOS      | Release | Device    | `prebuilds/ios-release-device/expoapp.ipa` ✓ committed |
| `android-debug`      | Android  | Debug   | Emulator  | `prebuilds/android-debug/expoapp.apk`                  |
| `android-release`    | Android  | Release | Device    | `prebuilds/android-release/expoapp.apk` ✓ committed    |

## Prebuilds

The `prebuilds/` directory contains pre-compiled native artifacts committed to the repo so CI never needs to do a full native build just to run visreg.

**Committed artifacts (used by CI visreg):**

| File                                       | Purpose                                             |
| ------------------------------------------ | --------------------------------------------------- |
| `prebuilds/ios-release-device/expoapp.ipa` | iOS real-device build for BrowserStack App Automate |
| `prebuilds/android-release/expoapp.apk`    | Android build for BrowserStack App Automate         |

**Not committed:** extracted `.app` directories, debug builds (too large).

### Updating prebuilds

Rebuild and commit when native dependencies, the Expo SDK, or native config changes. JS-only changes use `patch-bundle` instead (no rebuild needed).

**Why commit the built artifacts?** CI never runs a full native build on a PR — a full native build takes several minutes per platform on every run. Instead, CI downloads the committed artifact and patches in a fresh JS bundle from the current branch (a few seconds). The committed artifact is the stable native binary; `patch-bundle` keeps the JS layer current. Only rebuild and re-commit when the native layer itself changes.

```bash
# iOS device build — requires macOS (Xcode)
yarn nx run expo-app:build --configuration=ios-release-device

# Android — any OS with Android SDK
yarn nx run expo-app:build --configuration=android-release

git add apps/expo-app/prebuilds/ios-release-device/expoapp.ipa \
        apps/expo-app/prebuilds/android-release/expoapp.apk
git commit -m "chore(expo-app): update release prebuilds"
```

See [docs/building-mobile.md](./docs/building-mobile.md) for more detail.

### patch-bundle target

`patch-bundle` swaps the JS bundle inside a committed native artifact without a native recompile. CI uses this to pick up the latest JS changes cheaply:

| Configuration | Artifact patched                                         | Used by                  |
| ------------- | -------------------------------------------------------- | ------------------------ |
| `ios-device`  | `prebuilds/ios-release-device/expoapp.ipa` (real device) | CI visreg (BrowserStack) |
| `android`     | `prebuilds/android-release/expoapp.apk`                  | CI visreg (BrowserStack) |

BrowserStack re-signs the `.ipa` on upload, so no code signing is needed locally.

## Local development

### iOS Simulator

For first-time setup, see the [Expo iOS Simulator guide](https://docs.expo.dev/workflow/ios-simulator/).

1. **Run the app:**

   ```bash
   yarn nx run expo-app:ios
   ```

   Builds if needed, boots the simulator, installs, launches, and starts Metro.

2. **Rebuild when native dependencies change:**

   ```bash
   rm -rf prebuilds/ios-debug
   yarn nx run expo-app:ios
   ```

### Android Emulator

For first-time setup, see the [Expo Android Studio Emulator guide](https://docs.expo.dev/workflow/android-studio-emulator/).

Prerequisites: Android Studio with an emulator configured and `ANDROID_HOME` set.

1. **Run the app:**

   ```bash
   yarn nx run expo-app:android
   ```

2. **If Metro doesn't connect:**

   ```bash
   adb reverse tcp:8081 tcp:8081
   ```

3. **Rebuild when native dependencies change:**

   ```bash
   rm -rf prebuilds/android-debug
   yarn nx run expo-app:android
   ```

## Expo Go compatibility

This app cannot run in Expo Go — it requires native modules (e.g. `react-native-date-picker`) not included in the Expo Go sandbox. Use the development build workflow above.
