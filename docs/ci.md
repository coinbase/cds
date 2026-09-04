# CI architecture

[`.github/workflows/ci.yml`](../.github/workflows/ci.yml) is the pull-request orchestrator. It
classifies changed paths by toolchain, then starts only the required lanes.

## Toolchain tags

Every Nx project has exactly one execution tag:

- `toolchain:node` for TypeScript/JavaScript projects
- `toolchain:gradle` for native Android projects
- `toolchain:xcode` for native iOS projects

The tag describes which toolchain can execute a project's targets. Platform tags may describe the
product surface, but CI scheduling is based on the toolchain classification.

## Affected-only behavior

The orchestrator determines whether Node, Gradle, or Xcode paths changed:

- Node changes call the reusable [Node workflow](../.github/workflows/node.yml). Its Linux jobs use
  `nx affected` plus `toolchain:node`, so only affected Node projects with the requested target run.
- Gradle changes call the reusable [Android workflow](../.github/workflows/android.yml), which
  builds and tests the Android library and demo app with JDK 21 and the Android SDK.
- Xcode changes call the reusable [iOS workflow](../.github/workflows/ios.yml), which builds
  and tests the Swift library and builds the gallery on macOS.

This keeps toolchains isolated while preserving dependency-aware validation:

- A web-only change does not run React Native, Android, or iOS work.
- A change to a shared Node dependency may affect multiple dependent Node projects, such as both
  web and React Native packages.
- An Android-only change runs the Gradle lane without Node or Xcode jobs.
- An iOS-only change runs the Xcode lane without Node or Gradle jobs.
- Changes to centralized CI or Nx classification files safely enable all toolchains.

Manually dispatching `ci.yml` enables every toolchain. The reusable Android and iOS workflows can
also be dispatched independently for toolchain-specific reruns.
