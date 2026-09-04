# Coinbase Design System - Expo Template

A React Native mobile application template integrated with the Coinbase Design System (CDS).

## Installation

Use `gitpick` to create a new project from this template:

```sh
npx -y gitpick coinbase/cds/tree/master/templates/expo-app cds-expo
cd cds-expo
```

## Setup

We suggest [nvm](https://github.com/nvm-sh/nvm/tree/master) to manage Node.js versions. If you have it installed, you can use these commands to set the correct Node.js version. Using corepack ensures you have your package manager setup.

```sh
nvm install
nvm use
corepack enable
yarn
```

## Development

- `yarn start` - Start the Expo development server
- `yarn ios` - Run on iOS simulator
- `yarn android` - Run on Android emulator
- `yarn web` - Run in web browser

## Dev Builds

Some CDS components require native modules that are not available in Expo Go. If you use any of the following components, you will need to create a [development build](https://docs.expo.dev/develop/development-builds/introduction/):

- `DatePicker`
- `openWebBrowser`
- `AndroidNavigationBar`

To create a development build:

```sh
npx expo prebuild
npx expo run:ios   # or npx expo run:android
```

## Documentation

Visit [cds.coinbase.com](https://cds.coinbase.com) for the latest CDS documentation and component examples.
