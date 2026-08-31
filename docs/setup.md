# Local development setup

Clone the repository before setting up the toolchain your change needs:

```sh
git clone git@github.com:coinbase/cds.git
cd cds
```

Nx commands in this repository run through Yarn. If you plan to use them, complete the Node setup
even when the underlying project uses Gradle or Xcode. Native contributors can also invoke Gradle,
SwiftPM, and Xcode tools directly.

## Node: web and React Native

Node projects use the version in [`.nvmrc`](../.nvmrc), Yarn, and Nx.

```sh
nvm install
nvm use
corepack enable
yarn install
```

Common development apps:

```sh
yarn nx run storybook:dev
yarn nx run docs:dev
yarn nx run expo-app:ios
yarn nx run expo-app:android
```

The Expo targets additionally require the local iOS or Android development tools expected by
React Native. See [`apps/expo-app/README.md`](../apps/expo-app/README.md).

## Gradle: native Android

Native Android requires JDK 21 and the Android SDK; `yarn install` does not install either.

1. Install Android Studio or the standalone Android command-line tools.
2. Install Android SDK platforms 36 and 37, `platform-tools`, and an emulator image if needed.
3. Set `ANDROID_HOME` and accept licenses with `sdkmanager --licenses`.
4. Open [`android/`](../android/) in Android Studio, not the repository root.

The Gradle wrapper pins the build tooling and can provision its JDK. Verify setup from the
repository root:

```sh
yarn nx run cds-android:build
yarn nx run android-app:launch
```

Without Node/Yarn, invoke Gradle directly:

```sh
./android/gradlew -p android :cds:assembleRelease
```

See [`android/README.md`](../android/README.md) for the IDE workflow and
[`packages/cds-android/README.md`](../packages/cds-android/README.md) for package details.

## Xcode: native iOS

Native iOS development requires macOS, Xcode with Swift 6 support, an iOS 17+ Simulator, and
[XcodeGen](https://github.com/yonaskolb/XcodeGen):

```sh
brew install xcodegen
yarn nx run ios-gallery:build
open ios/CDS.xcworkspace
```

In Xcode, select the `CDSGalleryiOS` scheme and a Simulator. To build, install, and open the
gallery entirely from the command line:

```sh
yarn nx run ios-gallery:launch
```

The library can also be verified without Yarn:

```sh
(cd packages/cds-ios && swift build)
```

See [`ios/README.md`](../ios/README.md) for the workspace layout and
[`packages/cds-ios/README.md`](../packages/cds-ios/README.md) for package details.
