# CDS - Mobile

Components for React Native.

## How To Get Started

Add the relative path to the CDS icon font to your react-native.config.js. If your project lives in the monorepo this lives in the root `react-native.config.js` file. There is an example for CDS playground in there.

Assets for Android and iOS are automatically linked via autolinking (React Native 0.60+). After updating `react-native.config.js`, run the build and then use `npx react-native run-ios` or `npx react-native run-android` to make them available.

### Outside mono/repo

- Install package with `yarn add @coinbase/cds-mobile`.
- Update `react-native.config.js` to include icon font in assets, i.e. `assets: ['./node_modules/@coinbase/cds-mobile/icons/font']`.
