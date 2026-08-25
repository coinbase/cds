# com.coinbase.cds:cds

> [GitHub Releases](https://github.com/coinbase/cds/releases)

All notable changes to this project will be documented in this file.

`com.coinbase.cds:cds` adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).
Its versions are independent of the `@coinbase/cds-*` npm packages.

<!-- template-start -->

## 0.0.1 (8/25/2026 PST)

#### 🚀 Updates

- Initial public theme API: `CdsTheme`, the `cdsTheme` builder, `CdsThemeProvider`,
  `LocalCdsTheme`, `CdsDefaultTheme`, and the token types under `com.coinbase.cds.theme`.
- Components (`Button`, `Text`, `SlideButton`, and friends) ship in the AAR but are `internal`
  and not customer API yet.

#### Requirements

- `compileSdk` 36, `minSdk` 26
- Kotlin 2.0+
- Java 11 bytecode
- Compose BOM 2026.02.01 or newer
