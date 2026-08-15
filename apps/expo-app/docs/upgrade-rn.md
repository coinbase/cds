# How to Upgrade to Next React Native version

Expo handles react native upgrades through their [SDK](https://docs.expo.dev/workflow/upgrading-expo-sdk-walkthrough/). Their SDK will handle updating native modules, as well as recommend native package versions that are compatible with the new react native version. We can stray from their recommendations, but with caution.

1.  Update to the new SDK version from root. You can check the [latest patch version on npm](https://www.npmjs.com/package/expo):

```shell
yarn workspace expo-app add expo@^<version on npm>
```

2. Fixes native and expo dependencies to match recommended versions. You can override versions in package.json after running the fix command.

```shell
cd apps/expo-app && npx expo install --fix
```

3. Upgrade all native dependencies within our repo (cds-mobile, etc) to match the versions provided by expo.

**This is super important because that native versions must match for the expo-app build to be successful**

4. Nuke your repo. Cached versions will be compiled in the expo build step and lead to version mismatches. `.nx`, `apps/expo-app/.expo`, `apps/expo-app/ios`, `apps/expo-app/android` should all be removed. Node modules should be removed because of version mismatches as well. Start fresh :)

```shell
cd ../../ && rm -rf apps/expo-app/ios apps/expo-app/android apps/expo-app/.expo && yarn clean && rm -rf node_modules
```

5. Reboot with `yarn`

6. Resolve any errors generated from dependency bumps or the react native upgrade.

```shell
yarn nx run mobile:build
```

7. Test debug builds and generate the new shared, native module builds for everyone to use. Be sure to commit ios debug, ios release, and android release builds to your PR.

```shell
yarn nx run expo-app:build:ios-debug
yarn nx run expo-app:build:android-debug
yarn nx run expo-app:build:ios-release
yarn nx run expo-app:build:android-release
```

## Having trouble?

[See our help docs](/apps/expo-app/docs/help.md)
