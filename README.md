# Coinbase Design System

<p align="center">
  <img src="apps/docs/static/img/docusaurus-social-card.jpg" alt="Coinbase Design System">
</p>

Welcome to the Coinbase Design System (CDS)!

Please visit our website https://cds.coinbase.com for the latest documentation.

## Contributing setup

CDS uses three toolchains: Node for web and React Native, Gradle for native Android, and Xcode for
native iOS. Start with the [contributor guide](docs/README.md) and follow the
[setup instructions](docs/setup.md) for the platform you are changing.

## Quick Start

Run one of the available apps to get started:

### Storybook (Web)

```sh
yarn nx run storybook:dev
```

### Documentation Site

```sh
yarn nx run docs:dev
```

### Mobile App

```sh
yarn nx run expo-app:ios
yarn nx run expo-app:android
```

See [apps/expo-app/README.md](apps/expo-app/README.md) for details.

### Native Android App

```sh
yarn nx run android-app:launch
```

Requires JDK 21 and the Android SDK. Open `android/` in Android Studio for the IDE workflow.

### Native iOS App

```sh
yarn nx run ios-gallery:launch
```

Requires macOS, Xcode with Swift 6 support, an iOS 17+ Simulator, and XcodeGen. Generate the project
and open both iOS modules with:

```sh
yarn nx run ios-gallery:build
open ios/CDS.xcworkspace
```

See the [native setup guide](docs/setup.md) for Android and iOS prerequisites.

## Platforms

CDS ships on four platforms:

| Platform                 | Package                |
| ------------------------ | ---------------------- |
| Web (React)              | `packages/web`         |
| Mobile (React Native)    | `packages/mobile`      |
| Native Android (Compose) | `packages/cds-android` |
| Native iOS (SwiftUI)     | `packages/cds-ios`     |

## Contributing

We welcome contributions to the Coinbase Design System. Read [CONTRIBUTING.md](CONTRIBUTING.md) for
the pull-request process and [`docs/`](docs/README.md) for local development, validation, and CI
guidance.

## Versioning

CDS generally follows [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

We aim to preserve type/public API compatibility across minor and patch releases.
Visual changes are allowed in minor releases.
Review changelog entries and validate UI when upgrading.

Node packages use Nx release version plans, while Android and iOS version independently. See the
[versioning and release guide](docs/release.md).

## Security

For information about reporting security vulnerabilities, please see our [Security Policy](SECURITY.md).

## License

This project is licensed under the terms described in [LICENSE](LICENSE).
