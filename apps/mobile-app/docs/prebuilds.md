## When to use prebuilds?

Use Expo Go for normal dev workflow and testing simple JS code. Only use prebuilds if you:

- Made dependencies changes
- Want to test native modules that require prebuilds

## Setup

1. Setup your dependencies - fastlane, and eas-cli

Get the eas version in [eas.json](/apps/mobile-app/eas.json) at `cli.version`.

```shell
brew install fastlane
npm install -g eas-cli@<insert version>
```

2. Run `yarn install` from root

> All yarn nx commands should be run at the root.

## Work with prebuilds

1. Build the application you wish to develop on with `build`

**Note: you should only need to build if you're missing your desired build in [prebuilds](/apps/mobile-app/prebuilds) or if there's been a recent native dependency upgrade.**

See more info about mobile builds [here](/apps/mobile-app/docs/building-mobile.md).

| Platform | Profile - engine type | Command                                        |
| -------- | --------------------- | ---------------------------------------------- |
| ios      | debug - hermes        | `yarn nx run mobile-app:build:ios-debug`       |
| ios      | release - hermes      | `yarn nx run mobile-app:build:ios-release`     |
| android  | debug - hermes        | `yarn nx run mobile-app:build:android-debug`   |
| android  | release - hermes      | `yarn nx run mobile-app:build:android-release` |

**Note: If you run into errors when trying to prebuild, check out our [Help](/apps/mobile-app/docs/help.md) page to debug.**

2. Install app in your simulator with `launch` configuration.

**Note: You can skip this if you've already launched the build in your [prebuilds](/apps/mobile-app/prebuilds) in your simulator.**

| Platform | Profile - engine type | Command                                         |
| -------- | --------------------- | ----------------------------------------------- |
| ios      | debug - hermes        | `yarn nx run mobile-app:launch:ios-debug`       |
| ios      | release - hermes      | `yarn nx run mobile-app:launch:ios-release`     |
| android  | debug - hermes        | `yarn nx run mobile-app:launch:android-debug`   |
| android  | release - hermes      | `yarn nx run mobile-app:launch:android-release` |

3. Start the metro server for installed application. Only relevant for debug builds because release builds do not have hot reloading.

| Platform | Profile - engine type | Command                                      |
| -------- | --------------------- | -------------------------------------------- |
| ios      | debug - hermes        | `yarn nx run mobile-app:start:ios-debug`     |
| android  | debug - hermes        | `yarn nx run mobile-app:start:android-debug` |

**Note: If you see `CommandError: No development build (com.ui-systems.debug-ios-hermes) for this project is installed. Please make and install a development build on the device first.` run `yarn clean-expo` and rerun the `start` script. See more debug gotchas [here](/apps/mobile-app/docs/help.md)**

When running the debug app after a rebuild or restart, you'll most likely need to close out the Debug app and reopen it to trigger the bundler to recompile.

4. (Optional - use as needed) Run visual regression tests locally

Before running visreg, ensure the release build is installed (step 2 above). Then:

| Platform | Command                             |
| -------- | ----------------------------------- |
| ios      | `yarn nx run mobile-visreg:ios`     |
| android  | `yarn nx run mobile-visreg:android` |

See the [mobile-visreg README](/packages/mobile-visreg/README.md) for full setup, single-route iteration, and Percy upload instructions.

## An overview of Expo NX Targets

There are three core NX targets associated with Expo that we leverage to build and run mobile-app. The various contexts can be summarized as debug and release modes for development, with release builds also serving as the basis for visual regression testing.

The three NX Targets (also declared in `/apps/mobile-app/project.json`):

1. launch
2. start
3. build

These targets call node scripts that live in the [scripts directory of mobile-app](/apps/mobile-app/scripts/). These scripts are intuitively named the same as their respective nx targets.

Visual regression testing is handled separately by the [`packages/mobile-visreg`](/packages/mobile-visreg/README.md) package using Maestro and BrowserStack App Percy.

## Expo Debug vs Release Builds

There are four relevant build variations associated with mobile-app:

Release builds:

1. iOS Release build
2. Android Release build

Debug builds:

3. iOS Debug build
4. Android Debug build

There are two key ideas to understand about these build variations:

1. The difference between a release and a debug build
2. Why visreg uses release builds

## The difference between a release and a debug build

The key difference between release and debug builds is how the javascript is bundled with the native portion of mobile-app. In release builds a fully optimized version of the javascript bundle is packaged into the iOS ipa or Android apk and is referenced by the native app entry point. In a debug build the javascript bundle is not bundled into the app artifact, instead it is kept external to the shippable native portion and the native entry point references a bundle managed by the metro bundler (the metro bundler is what runs in your terminal when you run the start target). This difference is key to understanding why hot-reloading works in debug builds but not in release builds. It is also important to note here that debug is clearly a very different environment compared to release, which is why our visreg tests must be run in the context of release build as opposed to debug.

## Why visreg uses release builds

Visual regression testing is powered by [Maestro](https://maestro.mobile.dev/), which drives the app via deep-links (`<scheme>:///Debug<RouteName>`) to navigate directly to each component route and capture a screenshot. Deep-link navigation requires the app to handle the link at the React Navigation layer — but debug builds run inside the Expo Dev Client shell, which intercepts incoming deep links before React Navigation can process them. This means debug builds cannot be used for visreg; only standard release builds are supported.

Unlike the previous Detox-based approach, Maestro does not require any specialized native build configuration or code injection. The same release prebuild used for deployment is used for visreg, which simplifies the build matrix significantly.

To run visreg locally, install the release build and then run:

```bash
yarn nx run mobile-visreg:ios      # iOS
yarn nx run mobile-visreg:android  # Android
```

See the [mobile-visreg README](/packages/mobile-visreg/README.md) for the full workflow.

## How visreg bundle patching works

A key performance optimization keeps the committed prebuilds (native `.ipa` / `.apk` artifacts) from having to be fully rebuilt on every CI run. Because CDS developers rarely change native modules, it would be wasteful to re-run the full native build (8+ minutes on iOS, 6+ minutes on Android) just to pick up JS changes.

Instead, CI uses a patch step:

```bash
yarn nx run mobile-app:patch-bundle-ios      # iOS
yarn nx run mobile-app:patch-bundle-android  # Android
```

These scripts uncompress the committed release artifact, swap in the freshly bundled JS, and re-compress it into a valid platform artifact. This makes CI visreg runs fast while keeping the native prebuilds in sync with the JS codebase.

**When should the native prebuilds be rebuilt?**
Any time native dependencies, native Expo configs, or relevant build tooling changes. When this happens, regenerate and commit the updated prebuilds:

```bash
yarn nx run mobile-app:build:ios-release
yarn nx run mobile-app:build:android-release
```
