# How to Upgrade a Mobile Dependency

Expo handles React Native upgrades through their [SDK](https://docs.expo.dev/workflow/upgrading-expo-sdk-walkthrough/). Their SDK manages native module updates and recommends compatible package versions. See [building-mobile.md](./building-mobile.md) for background on build types.

**Deviating from Expo's recommendations is possible but requires caution.**

## Steps

### 1. Update packages

```shell
yarn workspace expo-app add <dependency>@<version>
yarn workspace @coinbase/cds-mobile add <dependency>@<version>
yarn
```

### 2. Run unit tests

```shell
yarn nx run mobile:test
```

### 3. Test locally with a debug build

Build a new debug build, install it, and verify the app behaves correctly. See [prebuilds.md](./prebuilds.md) for setup instructions.

### 4. Rebuild and commit the release prebuilds

Release prebuilds are committed to the repo and used by visreg CI. After a native dependency upgrade you must rebuild them and commit the new artifacts.

The iOS device build requires macOS (Xcode). The Android build can be done on any machine with the Android SDK.

```shell
# iOS — requires macOS
yarn nx run expo-app:build --configuration=ios-release-device

# Android — any OS
yarn nx run expo-app:build --configuration=android-release
```

Commit both artifacts:

```shell
git add apps/expo-app/prebuilds/ios-release-device/expoapp.ipa \
        apps/expo-app/prebuilds/android-release/expoapp.apk
git commit -m "chore(expo-app): update release prebuilds for <dependency> upgrade"
```

> **Why commit these?** CI patches the committed native artifact with a fresh JS bundle on each run instead of doing a full native build. This avoids a full native rebuild on every CI run, which would otherwise take several minutes per platform.

### 5. Verify visreg still passes

After committing the new prebuilds, run the visreg suite against your branch to confirm nothing regressed visually. See the [mobile-visreg README](/packages/mobile-visreg/README.md) for how to run it and upload results to Percy.
