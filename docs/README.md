# Contributor guide

This hub covers repository development across CDS's three toolchains. Choose the guide for the
task you are doing:

- [Set up local development](setup.md) for Node, Gradle, or Xcode.
- [Test and validate changes](testing.md) before requesting review.
- [Understand Nx configuration](nx.md), including the temporary Node-oriented defaults.
- [Understand CI](ci.md), including toolchain selection and Nx affected behavior.
- [Version and release packages](release.md) through their owning toolchain.

## Toolchains and product platforms

| Toolchain | Product platforms                  | Main projects                                    |
| --------- | ---------------------------------- | ------------------------------------------------ |
| Node      | Web (React), mobile (React Native) | `web`, `mobile`, `storybook`, `docs`, `expo-app` |
| Gradle    | Native Android (Jetpack Compose)   | `cds-android`, `android-app`                     |
| Xcode     | Native iOS (SwiftUI)               | `cds-ios`, `ios-gallery`                         |

Nx provides a common command surface from the repository root, while each project still builds
with its assigned toolchain.

## Package-specific guidance

Use this hub for repository-wide setup, validation, and CI behavior. Keep implementation and
consumer details close to their package:

- Web: [`packages/web/README.md`](../packages/web/README.md)
- React Native: [`packages/mobile/README.md`](../packages/mobile/README.md)
- Native Android: [`packages/cds-android/README.md`](../packages/cds-android/README.md) and
  [`packages/cds-android/AGENTS.md`](../packages/cds-android/AGENTS.md)
- Native iOS: [`packages/cds-ios/README.md`](../packages/cds-ios/README.md) and
  [`packages/cds-ios/AGENTS.md`](../packages/cds-ios/AGENTS.md)

Those package guides are the source of truth for public APIs, tokens, and release procedures.
