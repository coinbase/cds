## Overview

This is the Coinbase Design System (CDS) - a cross-platform component library.
Primary language: Typescript
Package manager: yarn
Task runner & monorepo tooling: Nx
Runtime: NodeJS (see .nvmrc for version)

CDS ships on three platforms: web (React), mobile (React Native), and **native Android**
(Kotlin/Jetpack Compose). The Android package shares no toolchain with the other two - it is
Gradle + JDK 21 + the Android SDK, not Yarn/Nx-driven bundling. Everything in this file describes
the JavaScript side unless a section says otherwise; see "Native Android" below.

## Agent Guidelines

- NEVER make commits without being instructed to do so directly
- IMPORTANT: After you are done writing code, ALWAYS perform these tasks:
  1. run the unit tests for the **specific file(s)** you modified
  2. run typecheck on the **specific package(s)** you modified
  3. run the formatter
  - In Kotlin packages none of those three apply. Run `yarn nx run cds-android:test` and
    `yarn nx run cds-android:assemble` instead - there is no tsc, no Jest, and Prettier does not
    touch `.kt`/`.kts`.
- For complex tasks, ask clarifying questions to the user before executing
- ALWAYS look for relevant skills and rules you can apply before beginning your work

## Core Commands

- `yarn install` - Install dependencies
- `yarn release` - Automates versioning of packages unaffected by changes to keep version numbers in sync
- `yarn clean` - Removes all build artifacts, deletes .nx folder and resets the Nx daemon
- `yarn nx reset` - Reset Nx daemon cache

## Nx Commands

**ALWAYS** run Nx commands using the formats demonstrated by the commands below.

- `yarn nx show projects` - Show all projects in the workspace (project names differ from package names)
- `yarn nx affected --target=test` - Run tests only for affected projects
- `yarn nx run <project>:test` - Run tests for a specific project
- `yarn nx run <project>:test --testNamePattern=<pattern>` - Run tests matching pattern
- `yarn nx format:write` - Formats all files in the workspace with Prettier
- `yarn nx run <project>:lint` - Lint a specific project
- `yarn nx run <project>:typecheck` - Check for type errors in a specific project
- `yarn nx run-many --target=<target1>,<target2>` - Run targets for all projects
- `yarn nx run-many --target=<target1>,<target2> --projects=<project1>,<project2>` - Run targets for specific projects

## Architecture

### General Architecture

- **Platform-specific implementations**: Separate implementations for web (React) and mobile (React Native)
- **Shared functionality**: Common business logic in `packages/common` used across other packages
- **Theme system**: CDS design tokens are themable and applied via CSS variables (web) and styles (react-native) through a ThemeProvider
- **Design tokens**: Design tokens (e.g. "bgPrimary", "fgMuted") can be used as values for special CDS component "style props" (e.g. "background")
- **Component structure**: Each component has its own folder with the component, tests, stories, and Figma bindings
- **Testing**: Tests are written in Typescript and run with Jest.

### Key Packages & Apps:

- **`packages/web/`** - React web components (`@coinbase/cds-web`)
- **`packages/mobile/`** - React Native mobile components (`@coinbase/cds-mobile`)
- **`packages/common/`** - Shared functionality and types (`@coinbase/cds-common`)
- **`packages/icons/`** - Icon definitions and data (`@coinbase/cds-icons`)
- **`packages/illustrations/`** - Illustration assets (`@coinbase/illustrations`)
- **`apps/docs/`** - Public documentation website (Docusaurus)
- **`apps/storybook/`** - Component development and testing environment for cds-web
- **`apps/expo-app/`** - Expo app for testing and visual regression of CDS mobile components
- **`packages/cds-android/`** - Native Android components, Kotlin/Jetpack Compose (`com.coinbase.cds:cds`)
- **`apps/android-app/`** - Native Android demo app that consumes `packages/cds-android` from source
- **`android/`** - Gradle root for the two projects above (wrapper, version catalog, plugin classpath)

## Native Android

Kotlin/Jetpack Compose, built by Gradle. Read `packages/cds-android/AGENTS.md` before editing
anything under `packages/cds-android/` - it is the source of truth for that module's API
boundary. Load the `jetpack-best-practices` skill when writing Compose.

**Layout.** The Gradle root is `android/`, and it maps two Gradle modules onto the Nx layout:
`:cds` -> `packages/cds-android`, `:app` -> `apps/android-app`. Nx project names are
`cds-android` and `android-app`. Open `android/` in Android Studio; run CLI commands from the repo
root.

**Commands.** These shell out to Gradle and require JDK 21 plus the Android SDK:

- `yarn nx run cds-android:assemble` - build the AAR
- `yarn nx run cds-android:test` - JUnit unit tests (headless composition, no Robolectric)
- `yarn nx run android-app:launch` - build, install, and start the demo app on a device/emulator
- `./android/gradlew -p android <task>` - anything Nx does not wrap

**Rules.**

- `:cds` compiles with Kotlin **explicit API mode**. Do not add a `public` declaration unless it
  is intentional customer API.
- Tag every Android Nx project `platform:android`. JavaScript CI (`ci.yml`) excludes that tag from
  every `nx affected` job; Android unit tests run in a separate workflow
  (`.github/workflows/android.yml`) on runners with JDK 21 and the Android SDK. Do not fold
  Gradle jobs into `ci.yml`.
- Never name an Android Nx target `build`, `typecheck`, or `lint`. Those names are wired to
  JavaScript CI jobs that run on machines with no JDK or Android SDK.
- Android versions independently, in Gradle. Never fold it into `yarn release` or the 9.x version
  sync.
- Kotlin cannot import `@coinbase/cds-common`. Android tokens are a hand-port today; shared
  codegen is the goal, not something to fake with a runtime dependency.
- There is no Kotlin linter configured yet. Formatting follows Android Studio's formatter.

## Native iOS

Swift 6 / SwiftUI, built by Swift Package Manager — no Yarn/Nx bundling, no `@coinbase/cds-common`
import. It is the `native-rewrite` counterpart to Android, and follows the same layout: a lighter
umbrella at `ios/`, the library under `packages/`, the app under `apps/`. For Swift review follow the
package README at `packages/cds-ios/README.md`.

**Layout.** Two Swift modules, mapped onto the Nx layout like Android's `:cds`/`:app`:

| Module              | Directory           | Nx project    |
| ------------------- | ------------------- | ------------- |
| `CDSDesignSystem`   | `packages/cds-ios/` | `cds-ios`     |
| `CDSGalleryiOS` app | `apps/ios-gallery/` | `ios-gallery` |

`ios/` is the umbrella (`CDS.xcworkspace` + README). Unlike `android/` it is **not** a build root:
SwiftPM has no `settings.gradle` equivalent and cannot remap target sources to a sibling directory,
so each module is self-rooted. `apps/ios-gallery` depends on `packages/cds-ios` as a local SwiftPM
package (relative path). Run CLI commands from the repo root.

**Commands.** These require Swift 6 / Xcode (macOS only):

- `yarn nx run cds-ios:test` - `swift test` (theme library unit tests)
- `yarn nx run cds-ios:build-ios` - `swift build -c release`
- `yarn nx run ios-gallery:build-ios` - `xcodegen generate` + iOS Simulator build of the app
- `yarn nx run ios-gallery:launch` - build + install + run the gallery on an iOS Simulator
- `cd packages/cds-ios && swift <build|test>` - anything Nx does not wrap

**Rules.**

- Tag every native-iOS Nx project `platform:ios`. JavaScript CI (`ci.yml`) excludes that tag from
  every `nx affected` job; Swift/Xcode builds run in a separate workflow
  (`.github/workflows/ios.yml`) on macOS runners. Do not fold Swift jobs into `ci.yml`.
- Never name a `cds-ios`/`ios-gallery` target `build`, `typecheck`, or `lint`. Those names are wired
  to JavaScript CI jobs that run on Linux runners with no Swift toolchain.
- The package builds under Swift 6 language mode; theme types are `Sendable` + `Equatable`. Keep
  memberwise initializers `internal` and evolve themes via the `cdsTheme { }` builder so adding a
  token stays source-compatible.
- The theme layer is the public surface. Components under `Sources/Components/` (`Text`,
  `Button`, `SlideButton`, `ProgressCircle`) are deliberately `internal` — they ship in the
  XCFramework but are not customer API yet (the same status as Android's `internal` components). Do
  not add `public` to them to make the gallery compile: `apps/ios-gallery` uses `@testable import
CDSDesignSystem` (Debug enables testability) to exercise the real components. Promote a component
  to `public` only when it is an intentional, stable API.
- iOS versions independently (SwiftPM / XCFramework). Never fold it into `yarn release` or the 9.x
  version sync. Cutting a release is manual: build the XCFramework (`yarn nx run cds-ios:xcframework`)
  and attach it to a GitHub Release tagged `ios-v<version>` — follow
  [`packages/cds-ios/docs/releasing.md`](packages/cds-ios/docs/releasing.md) and record the version
  in [`packages/cds-ios/CHANGELOG.md`](packages/cds-ios/CHANGELOG.md).
- Swift cannot import `@coinbase/cds-common`. iOS tokens are a hand-port today; shared codegen is the
  goal, not something to fake with a runtime dependency.
- The generated `apps/ios-gallery/CDSGallery.xcodeproj` is disposable — edit
  `apps/ios-gallery/project.yml` and regenerate with `xcodegen generate`, never hand-edit the project.

## Skills

Skills for this project live in `skills/`. Each skill has a `README.md` and optionally an `evals/` directory with benchmark test cases.

### After running skill evals

If a skill has evals and you run them, update the skill's `README.md` with a `## Performance` section containing the latest benchmark results:

- Overall summary table: pass rate, avg time, avg tokens — with/without skill and the delta
- Per-eval breakdown table showing each task name and pass rates for each configuration
- A callout of the biggest gains (where the skill adds the most value)
- The iteration number and date for traceability

See `skills/cds-code/README.md` for a reference example.

## Standards & Best Practices

### General

- We prefer quality over quantity for unit tests: focus on high-quality tests that provide outsized value before writing exhaustive test cases for coverage.
- Prefer constants over magic numbers: replace hard-coded values with descriptively named constants in camelCase
- Use meaningful names: variables and functions should reveal their purpose
- Code is self-documenting: code shouldn't need comments unless it is unusually complex in which case add brief comments where appropriate
- NEVER use exports marked as deprecated in the codebase when writing code or a plan.

### React

- Always memoize CDS components with `memo` HOC
- Use `useMemo` for expensive computations or for computed/conditional styles
- Use `useCallback` for event handlers passed as props to other components
- Use `useEffect` only for side effects (e.g API calls, subscriptions, browser API calls, etc.)
- Consult React's docs if you feel you need a useEffect for something else (https://react.dev/learn/you-might-not-need-an-effect)
