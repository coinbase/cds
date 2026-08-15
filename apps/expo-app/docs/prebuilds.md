## When to use prebuilds?

`expo-app` does not support Expo Go — it requires native modules (e.g. `react-native-date-picker`) that cannot run in the Expo Go sandbox. All development uses prebuilds. Use debug prebuilds for local development with hot reloading, and release prebuilds for visreg.

## Setup

1. Run `yarn install` from root

> All `yarn nx` commands should be run from the repo root.

## Work with prebuilds

1. Build the configuration you need.

**You only need to rebuild if the artifact is missing from [prebuilds](/apps/expo-app/prebuilds) or a native dependency changed. See [building-mobile.md](./building-mobile.md) for when to rebuild.**

| Platform | Profile                       | Command                                                         |
| -------- | ----------------------------- | --------------------------------------------------------------- |
| iOS      | debug (local dev)             | `yarn nx run expo-app:build --configuration=ios-debug`          |
| iOS      | release (BrowserStack visreg) | `yarn nx run expo-app:build --configuration=ios-release-device` |
| Android  | debug (local dev)             | `yarn nx run expo-app:build --configuration=android-debug`      |
| Android  | release (BrowserStack visreg) | `yarn nx run expo-app:build --configuration=android-release`    |

**If you hit errors, check [help.md](./help.md).**

2. Install and launch the app for local development.

| Platform | Profile | Command                                                       |
| -------- | ------- | ------------------------------------------------------------- |
| iOS      | debug   | `yarn nx run expo-app:launch --configuration=ios-debug`       |
| iOS      | release | `yarn nx run expo-app:launch --configuration=ios-release`     |
| Android  | debug   | `yarn nx run expo-app:launch --configuration=android-debug`   |
| Android  | release | `yarn nx run expo-app:launch --configuration=android-release` |

3. Start Metro for debug builds (release builds embed the JS bundle and don't need Metro).

```shell
yarn nx run expo-app:start
```

**If you see `CommandError: No development build … is installed`, run `rm -rf apps/expo-app/ios apps/expo-app/.expo` and retry. See [help.md](./help.md) for more.**

4. (Optional) Run visual regression tests.

Visreg runs on BrowserStack App Automate — see the [mobile-visreg README](/packages/mobile-visreg/README.md) for full setup, including how to obtain credentials and run the suite.

## Expo NX targets overview

The three core Nx targets (`build`, `launch`, `start`) are declared in [`project.json`](/apps/expo-app/project.json). `build` and `launch` delegate to scripts in [`apps/expo-app/scripts/`](/apps/expo-app/scripts/). `start` runs `npx expo start` directly.

Visual regression is handled separately by [`packages/mobile-visreg`](/packages/mobile-visreg/README.md) using Maestro flows on BrowserStack App Automate real devices.

## Debug vs release builds

The key difference is how JS is bundled:

- **Release**: the JS bundle is embedded in the `.ipa`/`.apk` at build time. Used for visreg because deep-link navigation requires React Navigation to handle the link — debug builds intercept deep links inside the Expo Dev Client shell before React Navigation can process them.
- **Debug**: JS is served live by Metro. Supports hot reloading. Not compatible with visreg deep-link navigation.

## How visreg bundle patching works

CI does not run a full native build on every PR. Instead, the committed device artifact (`.ipa` or `.apk`) is patched with a fresh JS bundle:

```bash
yarn nx run expo-app:patch-bundle --configuration=ios-device    # iOS device .ipa (CI visreg)
yarn nx run expo-app:patch-bundle --configuration=android       # Android .apk
```

This decompresses the committed artifact, swaps in the current branch's JS bundle, and recompresses — avoiding a full native rebuild on every CI run.

**When to do a full native rebuild instead:** any native dependency change, Expo SDK upgrade, or native config change. See [building-mobile.md](./building-mobile.md).

## Committed artifacts

| File                                       | Purpose                                       |
| ------------------------------------------ | --------------------------------------------- |
| `prebuilds/ios-release-device/expoapp.ipa` | iOS real-device build for BrowserStack visreg |
| `prebuilds/android-release/expoapp.apk`    | Android build for BrowserStack visreg         |

Debug builds are gitignored (too large). The old iOS simulator tarball (`prebuilds/ios-release/expoapp.tar.gz`) is no longer used — visreg runs on real devices via BrowserStack, not a local simulator.
