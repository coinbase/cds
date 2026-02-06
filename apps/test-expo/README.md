# test-expo

Expo-based demo app for testing CDS mobile components.

## Building and Running

### Commands

| Command                                                 | Description                                                  | Artifacts                |
| ------------------------------------------------------- | ------------------------------------------------------------ | ------------------------ |
| `yarn nx run test-expo:build --configuration=<config>`  | Builds standalone app artifacts                              | See configurations below |
| `yarn nx run test-expo:launch --configuration=<config>` | Installs build artifact on simulator/emulator                | None                     |
| `yarn nx run test-expo:ios`                             | Builds (if needed), installs, launches app, and starts Metro | Runs app + Metro         |
| `yarn nx run test-expo:android`                         | Builds (if needed), installs, launches app, and starts Metro | Runs app + Metro         |
| `yarn nx run test-expo:start`                           | Starts Metro bundler                                         | None                     |
| `yarn nx run test-expo:validate`                        | Checks Expo dependency versions for compatibility            | None                     |

### Build Configurations

| Configuration        | Platform | Profile | Target    | Output                                   |
| -------------------- | -------- | ------- | --------- | ---------------------------------------- |
| `ios-debug`          | iOS      | Debug   | Simulator | `builds/ios-debug/testexpo.tar.gz`       |
| `ios-release`        | iOS      | Release | Simulator | `builds/ios-release/testexpo.tar.gz`     |
| `ios-debug-device`   | iOS      | Debug   | Device    | `builds/ios-debug-device/testexpo.ipa`   |
| `ios-release-device` | iOS      | Release | Device    | `builds/ios-release-device/testexpo.ipa` |
| `android-debug`      | Android  | Debug   | Emulator  | `builds/android-debug/testexpo.apk`      |
| `android-release`    | Android  | Release | Emulator  | `builds/android-release/testexpo.apk`    |

### Local Development Setup

For a general setup guide covering all platform and device combinations (iOS/Android, simulator/real device), see [Set up your environment](https://docs.expo.dev/get-started/set-up-your-environment/).

#### iOS Simulator

iOS works seamlessly with build artifacts.

For first-time setup, see the [Expo iOS Simulator guide](https://docs.expo.dev/workflow/ios-simulator/).

1. **Run the app**:

   ```bash
   yarn nx run test-expo:ios
   ```

   This will:
   - Build the app if no artifact exists at `builds/ios-debug/testexpo.tar.gz`
   - Boot the iOS Simulator if not already running
   - Extract, install, and launch the app
   - Start Metro bundler

2. **Rebuild when native dependencies change**:
   ```bash
   rm -rf builds/ios-debug
   yarn nx run test-expo:ios
   ```

#### Android Emulator

Android requires more manual steps due to expo-dev-client limitations.

For first-time setup, see the [Expo Android Studio Emulator guide](https://docs.expo.dev/workflow/android-studio-emulator/).

1. **Prerequisites**:
   - Android Studio installed with an emulator configured
   - `ANDROID_HOME` environment variable set

2. **Run the app**:

   ```bash
   yarn nx run test-expo:android
   ```

   This will:
   - Build the APK if no artifact exists at `builds/android-debug/testexpo.apk`
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
   rm -rf builds/android-debug
   yarn nx run test-expo:android
   ```

### Expo Go Compatibility

This app cannot run in Expo Go due to dependencies on native modules. Specifically, `@react-native-community/datetimepicker` (used by cds-mobile) contains native code not included in Expo Go.

You must use the development build workflow described above.
