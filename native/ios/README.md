# CDS Native iOS — Theming foundation

Native SwiftUI implementation of the CDS theme system, the foundation for the
`native-rewrite` initiative (moving CDS off React Native toward native iOS).

This package contains the **theme provider and theming layer** only — no UI components. It is a
Swift Package (`CDSDesignSystem`) that builds standalone with `swift build` / `swift test`.

It aims for parity with the React Native `ThemeProvider` (`packages/mobile/src/core/theme.ts`,
`packages/mobile/src/themes/defaultTheme.ts`).

## What's here

| Path | Purpose |
| --- | --- |
| `Theme/Spectrum.swift` | Tier-1 raw spectrum palette — all 11 hues × 13 shades (light + dark) |
| `Theme/CDSColors.swift` | Tier-2 semantic color tokens (fg/bg/line/elevation/accent/…) + custom-theme factories |
| `Theme/CDSIllustrationColors.swift` | Illustration color palette (light + dark) |
| `Theme/Color+RGB.swift` | `Color` init from CDS RGB strings / components |
| `Theme/Spacing.swift` | Themeable spacing / radius / border-width scales |
| `Theme/Sizes.swift` | Themeable icon / avatar / control size scales |
| `Theme/Shadow.swift` | Shadow (elevation) tokens + `.cdsShadow()` modifier |
| `Theme/Typography.swift` | Themeable typography (`CDSTypography`, `CDSTextAttributes`) + `CDSText` primitive |
| `Theme/CDSTheme.swift` | `CDSTheme`, `CDSThemeSet`, `CDSThemeProvider`, `InvertedThemeProvider` |

## RN parity

Covered: full spectrum, semantic colors (incl. accents / transparent / currentColor),
illustration colors, spacing/radius/border-width, icon/avatar/control sizes, shadows,
typography, light/dark resolution, custom themes, and `InvertedThemeProvider`.

**Every scale is themeable** — spacing, radius, sizes, shadows, and typography are carried on
the theme (not global constants), so a consumer can override them per `CDSThemeProvider`, just
like RN.

Not yet included: bundled Inter / Source Code Pro font files (typography defaults to the system
font; set `fontName` per role once fonts are registered), high-contrast / dense theme variants,
and the `diffThemes` helper.

## Usage

```swift
import CDSDesignSystem

// Default CDS theme, follows the system color scheme.
CDSThemeProvider {
    MyRootView()
}

// Custom brand theme — override just the tokens/scales you care about.
let brand = CDSThemeSet(
    id: "brand",
    light: .light.with { $0.bgPrimary = Color(cdsRGB: 124, 58, 237) },
    dark: .dark.with  { $0.bgPrimary = Color(cdsRGB: 124, 58, 237) },
    spacing: CDSSpacing(x2: 20),
    typography: .default.with { $0[.body] = CDSTextAttributes(size: 17, lineHeight: 26, weight: .regular) }
)
CDSThemeProvider(theme: brand) {
    MyRootView()
}
```

Read the active theme in a view via the environment:

```swift
@Environment(\.cdsTheme) private var theme
// theme.colors.fgPrimary, theme.spacing.x2, theme.radius.r200, theme.typography[.title1], …
```

## Build

```bash
cd native/ios
swift build
swift test
```

## Note on token source

`Spectrum.swift` and the default token values are hand-ported from `defaultTheme.ts`. To keep
web / RN / iOS / Android in lockstep, these should ultimately be **generated** from the single
token source rather than maintained by hand.
