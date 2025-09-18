# Mobile App

This is a playground for mobile component development. It uses `packages/ui-mobile-playground` to manage the UI components that render the mobile storybook components. This app is primarily expo logic that wraps and renders `ui-mobile-playground` components.

## When to use Expo Go vs Expo Prebuilds?

**[Expo Go](#expo-go)** (Recommended for most cases)

Expo Go enables fast development and testing directly on devices with over-the-air updates from your dev server.

- Recommended for most development
- For testing on physical device

**[Expo Prebuilds](./docs/prebuilds.md)**

Expo prebuilds generate full native iOS and Android binaries with embedded JS bundle for testing custom native code.

- Required if you made dependency changes, like updating React Native
- Needed for testing any custom native modules and integrations

## Expo Go

1. Run `yarn install` from root

2. Start the [expo development server](https://docs.expo.dev/more/expo-cli/#develop) by running:

```
yarn nx run mobile-app:go
```

### Run the app in the iOS/Android simulator

Press 'i' or 'a' to open iOS or Android simulator respectively.

### Run the app on a physical device

> For security reasons, please make sure your device has Coinbase Security Profile installed before proceeding.

1. Download [Expo Go](https://expo.dev/client) on your device.
2. Scan the QR code from the terminal using the Expo Go app on your phone.
3. Make sure your device and metro server are connected to the same network. You might need to disconnect VPN.

## Creating a new route

Whenever you want to add a new screen to the mobile-app, you'll need to run this codegen script to generate the new route(s).

```zsh
yarn nx run codegen:mobile-routes
```

## Advanced

<!-- - [How to share your builds with others](./docs/share-builds.md) -->

- [How to generate prebuilds](./docs/prebuilds.md)
- [How to upgrade React Native version](./docs/upgrade-rn.md)
- [How and when to create new mobile build](./docs/building-mobile.md)
- [How to upgrade a native dependency](./docs/upgrading-mobile-dep.md)
- [How to debug failures & common errors](./docs/help.md)
