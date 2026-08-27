# CDSDesignSystem (iOS)

> [GitHub Releases](https://github.com/coinbase/cds/releases)

All notable changes to this project will be documented in this file.

The iOS `CDSDesignSystem` package adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).
Its versions are independent of the `@coinbase/cds-*` npm packages and of `com.coinbase.cds:cds`
(Android).

<!-- template-start -->

## 0.0.1 (8/27/2026 PST)

#### 🚀 Updates

- Initial public theme API: `CDSTheme`, the `cdsTheme { }` builder, `CDSThemeProvider`,
  `InvertedThemeProvider`, `CDSThemeSet`, and the token types (`CDSColorToken`,
  `CDSSpectrumHueToken`, `CDSColorRampToken`, `CDSRadiusToken`, `CDSSpacingToken`,
  `CDSBorderWidthToken`, `CDSIconSizeToken`, `CDSAvatarSizeToken`, `CDSControlSizeToken`,
  `CDSIllustrationColorToken`, `CDSShadowToken`, `CDSTextStyle`).
- Theming only — no UI components yet.

#### Requirements

- iOS 17+ / macOS 14+
- Swift 6 (language mode v6)
- Xcode 16+
