# CDS - Mobile

Components for React Native.

## How To Get Started

Add the relative path to the CDS icon font to your react-native.config.js. If your project lives in the monorepo this lives in the root `react-native.config.js` file. There is an example for CDS playground in there.

In this monorepo, run the `test-expo` targets from the repo root:

- `yarn nx run test-expo:launch:ios-debug` or `yarn nx run test-expo:launch:android-debug` for local debug launch

### Outside monorepo

- Install package with `yarn add @coinbase/cds-mobile`.
- Update `react-native.config.js` to include icon font in assets, i.e. `assets: ['./node_modules/@coinbase/cds-mobile/icons/font']`.
