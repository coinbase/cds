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
- If there's any dependency change in `apps/mobile-app/package.json` and `packages/mobile/package.json`

### How do I rebuild a debug build?

| Platform | Profile - engine type | Command                                      |
| -------- | --------------------- | -------------------------------------------- |
| ios      | local - hermes        | `yarn nx run mobile-app:build:ios-debug`     |
| android  | local -hermes         | `yarn nx run mobile-app:build:android-debug` |

## Release Builds

### What is a release build?

It is a native module build of your application that is:

- Used for visreg
- Much smaller & committed to our repo
- Cannot support hot reloading

### When do you need to rebuild release builds?

- Any dependency change in `apps/mobile-app/package.json` and `packages/mobile/package.json`
- Any JS change in `packages/mobile/*`.

### How do I rebuild a release build?

Generate the new shared, native module builds for everyone to use. **Be sure to commit both**. Visreg will use these builds to compare UIs from your PR to what was generated on master.

**Note: Committing these builds reduces CI time drastically by 14min for ios and 7 mins for android**

```shell
yarn nx run mobile-app:build:ios-release
yarn nx run mobile-app:build:android-release
```

## Advanced

### Creating new build configurations

You can create other build types using [app.config.js](/apps/mobile-app/app.config.ts) and [project.json](/apps/mobile-app/project.json).

Create a new config in [project.json](/apps/mobile-app/project.json) `targets.build.configurations`. The key will be come your new command for `yarn nx run mobile-app:build:<your key>`.

Pass ENVs to configure your build. See [setEnvVars](/apps/mobile-app/scripts/utils/setEnvVars.mjs) for options and [project.json](/apps/mobile-app/project.json) for examples.

[Here is the reference guide on app configurations from Expo](https://docs.expo.dev/versions/latest/config/app/).

### Run on real device

With [Expo Go](https://docs.expo.dev/get-started/expo-go/), you can easily run the app on a real physical device by following these steps:

**NOTE:** For security reasons, please make sure your device has Coinbase Security Profile installed before proceeding.

1. Download [Expo Go](https://expo.dev/client) to your device.
2. Run `yarn nx run mobile-app:go` to start the development server. This will output a QR code in your terminal.
3. Make sure your device and metro are connected to the same network. You might also need to disconnect VPN.
4. On your device, scan the QR code generated in step2. It will redirect you to Expo Go and install the debug app.
5. The app will now reload whenever you save changes in your code.
