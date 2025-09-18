# CDS - Mobile

Components for React Native.

## How To Get Started

Add the relative path to the CDS icon font to your react-native.config.js. If your project lives in the monorepo this lives in the root `react-native.config.js` file. There is an example for CDS playground in there.

You will need to run `npx react-native link` to link the assets for Android and iOS and then run build, `npx react-native run-ios` or `npx react-native run-android` for them to be available.

### Outside mono/repo

- Install package with `yarn add @cbhq/cds-mobile`.
- Update `react-native.config.js` to include icon font in assets, i.e. `assets: ['./node_modules/@cbhq/cds-mobile/icons/font']`.
