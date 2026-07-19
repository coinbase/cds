# Mobile native builds

- [Debug Builds](#debug-builds)
  - [What is a debug build?](#what-is-a-debug-build)
  - [When do you need to rebuild debug builds?](#when-do-you-need-to-rebuild-debug-builds)
  - [How do I rebuild a debug build?](#how-do-i-rebuild-a-debug-build)
- [Release Builds](#release-builds)
  - [What is a release build?](#what-is-a-release-build)
  - [When do you need to rebuild release builds?](#when-do-you-need-to-rebuild-release-builds)
  - [How do I rebuild a release build?](#how-do-i-rebuild-a-release-build)
- [Advanced](#advanced)
  - [Creating new build configurations](#creating-new-build-configurations)

## Debug Builds

### What is a debug build?

A native build of the app that is:

- Used for hot reloading & local development
- Large & stored only locally (gitignored)

### When do you need to rebuild debug builds?

- You don't have a local debug build yet
- A native dependency changed in `apps/expo-app/package.json` or `packages/mobile/package.json`

### How do I rebuild a debug build?

| Platform | Command                                                    |
| -------- | ---------------------------------------------------------- |
| iOS      | `yarn nx run expo-app:build --configuration=ios-debug`     |
| Android  | `yarn nx run expo-app:build --configuration=android-debug` |

## Release Builds

### What is a release build?

A native build of the app that is:

- Used for CI visual regression testing (via BrowserStack App Automate)
- Small enough to commit to the repo
- Cannot support hot reloading (JS bundle is embedded)

Two release build configurations are committed to the repo:

| Configuration        | Artifact                                   | Used for                                   |
| -------------------- | ------------------------------------------ | ------------------------------------------ |
| `ios-release-device` | `prebuilds/ios-release-device/expoapp.ipa` | iOS visreg on BrowserStack real device     |
| `android-release`    | `prebuilds/android-release/expoapp.apk`    | Android visreg on BrowserStack real device |

### When do you need to rebuild release builds?

- Any native dependency change in `apps/expo-app/package.json` or `packages/mobile/package.json`
- Any change to native Expo config or build tooling

> JS-only changes do not require a full native rebuild — use `patch-bundle` to swap the JS bundle into the existing committed artifact instead. See [prebuilds.md](./prebuilds.md).

### How do I rebuild a release build?

The iOS device build requires macOS (Xcode). The Android build can run on any machine with the Android SDK.

```shell
# iOS device build — requires macOS
yarn nx run expo-app:build --configuration=ios-release-device

# Android build — any OS
yarn nx run expo-app:build --configuration=android-release
```

**Commit the updated artifacts after building.** Visreg CI uses these committed files as the baseline native binary and patches in a fresh JS bundle on each run. This avoids running a full native build (~several minutes per platform) on every CI run.

```shell
git add apps/expo-app/prebuilds/ios-release-device/expoapp.ipa \
        apps/expo-app/prebuilds/android-release/expoapp.apk
git commit -m "chore(expo-app): update release prebuilds"
```

## Advanced

### Creating new build configurations

You can create other build types using [app.json](/apps/expo-app/app.json) and [project.json](/apps/expo-app/project.json).

Add a new config in [project.json](/apps/expo-app/project.json) under `targets.build.configurations`. The key becomes the `--configuration` argument for `yarn nx run expo-app:build --configuration=<your-key>`.

[Expo app configuration reference](https://docs.expo.dev/versions/latest/config/app/)
