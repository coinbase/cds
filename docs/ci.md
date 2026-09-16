# CI architecture

[`.github/workflows/ci.yml`](../.github/workflows/ci.yml) is the pull-request orchestrator. It
classifies changed paths by toolchain, then always starts the Node, Android, and iOS lanes so
required checks are reported. Jobs inside each lane skip when that toolchain is unaffected.

## Toolchain tags

Every Nx project has exactly one execution tag:

- `toolchain:node` for TypeScript/JavaScript projects
- `toolchain:gradle` for native Android projects
- `toolchain:xcode` for native iOS projects

The tag describes which toolchain can execute a project's targets. Platform tags may describe the
product surface, but CI scheduling is based on the toolchain classification.

## Affected-only behavior

The orchestrator determines whether Node, Gradle, or Xcode paths changed:

- The [Node workflow](../.github/workflows/node.yml) is always called so required `Node / *`
  checks are reported. When Node paths changed, its Linux jobs use `nx affected` plus
  `toolchain:node`. Format (`yarn nx format:check`) runs in that workflow when Node is selected.
  When Node is unaffected, each Node job is skipped; GitHub treats skipped jobs as passing.
- The [Android workflow](../.github/workflows/android.yml) is always called so required
  `Android / *` checks are reported. When Gradle paths changed, it builds and tests the Android
  library and demo app with JDK 21 and the Android SDK. When they did not, its jobs skip.
- The [iOS workflow](../.github/workflows/ios.yml) is always called so required `iOS / *` checks
  are reported. When Xcode paths changed, it builds and tests the Swift library and builds the
  gallery on macOS. When they did not, its jobs skip.

This keeps toolchains isolated while preserving dependency-aware validation:

- A web-only change does not run React Native, Android, or iOS work (those jobs skip).
- A change to a shared Node dependency may affect multiple dependent Node projects, such as both
  web and React Native packages.
- An Android-only change runs the Gradle lane; Node and iOS jobs skip.
- An iOS-only change runs the Xcode lane; Node and Android jobs skip.
- Changes under `docs/`, `.claude/`, `.agents/`, `skills/`, and root-level markdown that do not
  belong to a Node project do not start Node, Gradle, or Xcode on their own.
- Changes to centralized CI or Nx classification files safely enable all toolchains.

Manually dispatching `ci.yml` enables every toolchain. The reusable Android and iOS workflows can
also be dispatched independently for toolchain-specific reruns.
