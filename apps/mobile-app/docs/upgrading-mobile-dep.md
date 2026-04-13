# How to Upgrade a Mobile Dependency

Expo handles react native upgrades through their [SDK](https://docs.expo.dev/workflow/upgrading-expo-sdk-walkthrough/). Their SDK will handle updating native modules, as well as recommend native package versions that are compatible with the new react native version.

Check out this doc [for more about mobile builds in general](/apps/mobile-app/docs/building-mobile.md)

**We can stray from their recommendations, but with caution.**

1.  Update to the new package in all relevant packages.

```shell
yarn workspace mobile-app add <dependency name>@<version>
yarn workspace @coinbase/cds-mobile add <dependency name>@<version>
yarn
```

2. Resolve any errors generated from dependency bumps or the react native upgrade.

```shell
yarn nx run mobile:test
```

3. Test that your applications work locally as expected. You will need to build a new debug build & likely uninstall the previous application and reinstall your new build, following [setup instructions](/apps/mobile-app/README.md).

4. Generate the new shared, native module builds for everyone to use. Be sure to commit the release builds. Visreg (via `packages/mobile-visreg`) uses the release builds to capture and compare screenshots. The android-debug build is too large to be committed locally, but should be tested.

```shell
yarn nx run mobile-app:build:ios-debug
yarn nx run mobile-app:build:ios-release
yarn nx run mobile-app:build:android-release
```
