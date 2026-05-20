# Mobile native modules builds

- [Mobile native modules builds](#mobile-native-modules-builds)
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

It is a native module build of your application that is:

- Used for hot reloading & local development
- Large & stored locally in your repo
- Gitignore'd (because android debug files are big to commit).

### When do you need to rebuild debug builds?

- If you don't have any local debug build to develop off of
- If there's any dependency change in `apps/expo-app/package.json` and `packages/mobile/package.json`

### How do I rebuild a debug build?

| Platform | Profile - engine type | Command                                    |
| -------- | --------------------- | ------------------------------------------ |
| ios      | local - hermes        | `yarn nx run expo-app:build:ios-debug`     |
| android  | local -hermes         | `yarn nx run expo-app:build:android-debug` |

## Release Builds

### What is a release build?

It is a native module build of your application that is:

- Used for visreg
- Much smaller & committed to our repo
- Cannot support hot reloading

### When do you need to rebuild release builds?

- Any native dependency change in `apps/expo-app/package.json` or `packages/mobile/package.json`
- Any change to native Expo config or build tooling

> JS-only changes do not require a full rebuild — use `yarn nx run expo-app:patch-bundle-ios` / `patch-bundle-android` to swap the JS bundle into the existing prebuild instead.

### How do I rebuild a release build?

Generate the new shared, native module builds for everyone to use. **Be sure to commit both**. Visreg will use these builds to compare UIs from your PR to what was generated on master.

**Note: Committing these builds reduces CI time drastically by 14min for ios and 7 mins for android**

```shell
yarn nx run expo-app:build:ios-release
yarn nx run expo-app:build:android-release
```

## Advanced

### Creating new build configurations

You can create other build types using [app.json](/apps/expo-app/app.json) and [project.json](/apps/expo-app/project.json).

Create a new config in [project.json](/apps/expo-app/project.json) `targets.build.configurations`. The key will become your new command for `yarn nx run expo-app:build:<your key>`.

[Here is the reference guide on app configurations from Expo](https://docs.expo.dev/versions/latest/config/app/).
