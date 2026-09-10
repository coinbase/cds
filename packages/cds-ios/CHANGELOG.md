# CDSDesignSystem (iOS)

> [GitHub Releases](https://github.com/coinbase/cds/releases)

All notable changes to this project will be documented in this file.

The iOS `CDSDesignSystem` package adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).
Its versions are independent of the `@coinbase/cds-*` npm packages and of `com.coinbase.cds:cds`
(Android).

<!-- template-start -->

## Unreleased

#### 💥 Breaking

- Align the theme object shape with Android: `space` (was `spacing`), `borderRadius` (was `radius`),
  `shadows` (was `shadow`), `lightColors` / `darkColors` (was `light` / `dark`). Radius rungs are
  `radius400` (was `r400`); border-width rungs are `borderWidth100` (was `w100`). Shadow fields are
  `blurRadius` / `offsetX` / `offsetY` (was `radius` / `x` / `y`). Token types follow the same names
  (`CDSSpace`, `CDSBorderRadius`, `CDSShadows`, `CDSSpaceToken`, `CDSBorderRadiusToken`).

## 0.0.1 (8/27/2026 PST)

#### 🚀 Updates

- Initial public theme API: `CDSTheme`, the `cdsTheme { }` builder, `CDSThemeProvider`,
  `InvertedThemeProvider`, `CDSThemeSet`, and the token types (`CDSColorToken`,
  `CDSSpectrumHueToken`, `CDSColorRampToken`, `CDSRadiusToken`, `CDSSpacingToken`,
  `CDSBorderWidthToken`, `CDSIconSizeToken`, `CDSAvatarSizeToken`, `CDSControlSizeToken`,
  `CDSIllustrationColorToken`, `CDSShadowToken`, `CDSTextStyle`).
- Also ships `internal` (not-yet-public) UI components — `Text`, `Button`, `SlideButton`, and
  `ProgressCircle` — compiled into the artifact but excluded from the public API. The theme layer is
  the only public surface for now; these components stay `internal` until they stabilize.

#### Requirements

- iOS 17+ / macOS 14+
- Swift 6 (language mode v6)
- Xcode 16+
