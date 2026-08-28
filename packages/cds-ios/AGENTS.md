# cds-ios

Native iOS CDS: Swift 6 + SwiftUI, distributed as the binary XCFramework `CDSDesignSystem`. Swift
package `packages/cds-ios/` (module `CDSDesignSystem`), Nx project `cds-ios`.

This is a **library**, not application code. Everything public here is a promise to consumers that
is expensive to take back, so the default answer to "should this be public?" is no.

## The API boundary

Swift has **no compiler-enforced explicit-API mode** — there is no analog of Kotlin's `explicit API`
that would reject a declaration whose visibility was inherited rather than chosen. The intended
public surface is therefore held by **convention plus this file**, not by the compiler. Read the two
together: when you add or touch a declaration, decide its visibility on purpose.

- Default to `internal` (Swift's implicit default) or `private`. Reach for `public` only when the
  symbol is meant for customers.
- The public surface is the **theme layer** in `Sources/Theme/`: `CDSTheme`, `CDSThemeSet`,
  `cdsTheme(base:_:)`, `CDSThemeProvider`, `InvertedThemeProvider`, the token types
  (`CDSColors`, `CDSSpectrum`, `CDSColorRamp`, `CDSIllustrationColors`, `CDSSpacing`, `CDSRadius`,
  `CDSBorderWidth`, `CDSIconSize`, `CDSAvatarSize`, `CDSControlSize`, `CDSTypography`,
  `CDSTextAttributes`, `CDSShadowScale`, `CDSShadow`), the token enums (`CDSColorToken`,
  `CDSSpectrumHueToken`, `CDSColorRampToken`, `CDSRadiusToken`, `CDSSpacingToken`,
  `CDSBorderWidthToken`, `CDSIconSizeToken`, `CDSAvatarSizeToken`, `CDSControlSizeToken`,
  `CDSIllustrationColorToken`, `CDSShadowToken`, `CDSTextStyle`), and the `\.cdsTheme` environment
  accessor plus the `Color(cdsHex:)` helper.
- Components under `Sources/Components/` — `Text`, `Button` (+ its variants/sizes),
  `SlideButton`, and `ProgressCircle` (the indeterminate progress indicator) — are deliberately
  **`internal`**. They were experiments and are **not customer API yet**, exactly like Android
  shipping `Text`, `Button`, and `SlideButton` as `internal` for the first release. Ship them in the
  artifact; keep them off the public surface until they stabilize. Do not add `public` to a component
  to make a consumer compile. `Sources/Components/internal/` holds `ComponentMetrics` — the only
  shared, non-component internal helper left there.
- **Never widen visibility to make `apps/ios-gallery` compile.** The gallery is a consumer. It reaches
  the internal components with `@testable import CDSDesignSystem` (Debug builds enable testability),
  so it can demo the _real_ components rather than reimplementing stand-ins — an iOS advantage over
  Android, whose sample app must define local look-alikes because Kotlin has no `@testable` equivalent.
  If the gallery cannot express something through the public API and `@testable`, the API is genuinely
  missing something or the app is doing something it should not.
- Changing the signature of an existing `public` declaration is a breaking change.

## Theming

- **Reading tokens:** read the resolved theme from the environment with
  `@Environment(\.cdsTheme) private var theme`, then reach a token by property (`theme.colors.fgPrimary`,
  `theme.spacing.x2`, `theme.radius.r400`, `theme.typography[.title1]`) or by token
  (`theme.colors[.fgPrimary]`, `theme.spectrum[.blue][.step60]`). See [`docs/using-tokens.md`](docs/using-tokens.md).
- **Authoring a theme:** the `cdsTheme { }` builder, which returns a `CDSThemeSet`. Token types have
  `internal` memberwise initializers on purpose — do not add public ones. Build custom values through
  the evolution-safe surface instead: the builder's `inout` closure, the `with { }` copy helpers, and
  `CDSColors.lightDeriving(from:)` / `darkDeriving(from:)`. Adding a token must stay source-compatible,
  which is why `CDSThemeSet.init` defaults every parameter and the memberwise inits stay internal.
- `\.cdsTheme` is the read-only public accessor. Reading it **requires a `CDSThemeProvider` ancestor at
  runtime**; a missing provider traps with an actionable message
  (`"No CDS theme found. Wrap your views in CDSThemeProvider { … }."`) rather than silently rendering
  wrong colors — matching Android's `CdsTheme.current`. The one exception is an Xcode Preview, which
  falls back to the default theme so unwrapped component previews "just work".
- **`InvertedThemeProvider` also requires a `CDSThemeProvider` ancestor.** It reads `\.cdsTheme` to
  learn the current scheme, so using it with no provider above traps just like any other reader
  (matching Android). Install a `CDSThemeProvider` at the root and nest `InvertedThemeProvider` beneath
  it.

Rationale for the theme design and the RN parity notes are in [`README.md`](README.md); the
consumer-facing guides are in [`docs/`](docs/).

## SwiftUI / Swift 6 conventions

- The package builds under **Swift 6 language mode**. Every theme type is `Sendable` **and**
  `Equatable`: `Sendable` so themes cross actor boundaries cleanly, and `Equatable` so
  `CDSThemeProvider` lets SwiftUI skip re-invalidating `\.cdsTheme` readers when the resolved tokens
  are unchanged. Keep both conformances when you add a type or field.
- Keep memberwise initializers `internal` and evolve themes through the `cdsTheme { }` builder and the
  `with { }` helpers, so adding a token stays source-compatible.
- Components accept and respect the ambient theme via `@Environment(\.cdsTheme)`; they do not take a
  theme parameter.

## Boundaries with the rest of the monorepo

- Do not add Yarn/npm dependencies to this package. Its `package.json` is a Yarn/Nx stub
  (`private: true`, `0.0.0`) that exists only so Yarn workspaces and the Nx CI helpers can see the
  project; the real dependency graph is `Package.swift`.
- Do not import `@coinbase/cds-common`. Swift cannot consume it. Tokens here are a hand-port of the
  shared set (from `packages/mobile/src/themes/defaultTheme.ts`); keeping them in sync is manual until
  token codegen exists.
- The library product is declared **`.dynamic`** in `Package.swift` so `xcodebuild archive` can emit a
  `CDSDesignSystem.framework` that the build script packages into the distributable **XCFramework**.
  Do not change it to a static product.
- iOS versions independently. The version lives only in the `ios-v<version>` git tag and
  [`CHANGELOG.md`](CHANGELOG.md) — there is no manifest `version` field (Swift has no Gradle
  `version`). It is unrelated to the 9.x npm versions and to Android's `com.coinbase.cds:cds`, and must
  never be pulled into `yarn release` or `yarn nx release plan`. Cutting a release is manual; follow
  [`docs/releasing.md`](docs/releasing.md).
- `apps/ios-gallery/CDSGallery.xcodeproj` is **generated and disposable** — it is produced by
  `xcodegen generate` from `apps/ios-gallery/project.yml`. Edit `project.yml` and regenerate; never
  hand-edit the `.xcodeproj`.

## Commands

Run from the repo root:

```sh
yarn nx run cds-ios:test        # swift test (theme library)
yarn nx run cds-ios:build       # swift build -c release
yarn nx run cds-ios:xcframework # build the distributable CDSDesignSystem.xcframework (+ checksum)
```

Or directly with SwiftPM from `packages/cds-ios/`: `swift build`, `swift test`.

The root CI workflow selects the reusable macOS workflow (`.github/workflows/ios.yml`) when this
package, `apps/ios-gallery`, or `ios/` changes. Every `cds-ios` / `ios-gallery` Nx project uses
`toolchain:xcode`, so Node jobs do not execute its targets.

`.build/`, `*.xcframework`, and the generated `apps/ios-gallery/*.xcodeproj` are build outputs and
stay untracked.
