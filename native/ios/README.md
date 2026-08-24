# CDS Native iOS — Theming foundation

Native SwiftUI implementation of the CDS theme system, the foundation for the
`native-rewrite` initiative (moving CDS off React Native toward native iOS).

This package intentionally contains **only the theme provider and theming layer** —
no components. It is a Swift Package (`CDSDesignSystem`) that builds standalone with
`swift build` / `swift test`.

## What's here

| Path | Purpose |
| --- | --- |
| `Sources/CDSDesignSystem/Theme/Spectrum.swift` | Tier-1 raw spectrum palette (light + dark) |
| `Sources/CDSDesignSystem/Theme/CDSColors.swift` | Tier-2 semantic color tokens + custom-theme factories |
| `Sources/CDSDesignSystem/Theme/Color+RGB.swift` | `Color` init from CDS RGB strings |
| `Sources/CDSDesignSystem/Theme/Spacing.swift` | Spacing / radius / border-width scales |
| `Sources/CDSDesignSystem/Theme/Typography.swift` | `CDSTextStyle` roles + `CDSText` primitive |
| `Sources/CDSDesignSystem/Theme/CDSTheme.swift` | `CDSTheme`, `CDSThemeSet`, and `CDSThemeProvider` (Environment injection) |

## Usage

```swift
import CDSDesignSystem

// Default CDS theme, follows the system color scheme.
CDSThemeProvider {
    MyRootView()
}

// Custom brand theme.
let brand = CDSThemeSet(
    light: .lightDeriving { $0.bgPrimary = Color(cdsRGB: "12,90,240") },
    dark: .darkDeriving  { $0.bgPrimary = Color(cdsRGB: "12,90,240") }
)
CDSThemeProvider(theme: brand) {
    MyRootView()
}
```

Read the active theme in a view via the environment:

```swift
@Environment(\.cdsTheme) private var theme
```

## Build

```bash
cd native/ios
swift build
swift test
```
