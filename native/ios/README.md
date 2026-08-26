# CDS Native iOS — Theming foundation

Native SwiftUI implementation of the CDS theme system, the foundation for the
`native-rewrite` initiative (moving CDS off React Native toward native iOS).

This package contains the **theme provider and theming layer** only — no UI components. It is a
Swift Package (`CDSDesignSystem`) that builds standalone with `swift build` / `swift test`.

It also ships a runnable **theme gallery** (`CDSGalleryApp`) — the iOS counterpart to Android's
`apps/android-app` — that renders every token scale live with light/dark and custom-theme
switching. See [Demo app](#demo-app).

It aims for parity with the React Native `ThemeProvider` (`packages/mobile/src/core/theme.ts`,
`packages/mobile/src/themes/defaultTheme.ts`).

## What's here

| Path | Purpose |
| --- | --- |
| `Theme/Tokens.swift` | Enumerable, addressable token names (`CDSColorToken`, `CDSSpectrumHueToken`, `CDSColorRampToken`) with canonical `tokenName`s |
| `Theme/Spectrum.swift` | Tier-1 strongly-typed spectrum palette (`CDSSpectrum` / `CDSColorRamp`) — all 11 hues × 13 shades (light + dark) |
| `Theme/CDSColors.swift` | Tier-2 semantic color tokens (fg/bg/line/elevation/accent/…) + token subscript + custom-theme factories |
| `Theme/CDSIllustrationColors.swift` | Illustration color palette (light + dark) |
| `Theme/Color+RGB.swift` | `Color` init from CDS RGB strings / components |
| `Theme/Spacing.swift` | Themeable spacing / radius / border-width scales |
| `Theme/Sizes.swift` | Themeable icon / avatar / control size scales |
| `Theme/Shadow.swift` | Shadow (elevation) tokens + `.cdsShadow()` modifier |
| `Theme/Typography.swift` | Themeable typography (`CDSTypography`, `CDSTextAttributes`, `CDSTextStyle` font token) + `CDSText` primitive |
| `Theme/CDSTheme.swift` | `CDSTheme`, `CDSThemeSet`, `cdsTheme { }` builder, `CDSThemeProvider`, `InvertedThemeProvider` |
| `Sources/CDSGalleryApp/` | Runnable SwiftUI theme gallery (colors, spectrum, typography, scales, components, `AcmeTheme`) |

## RN parity

Covered: full spectrum, semantic colors (incl. accents / transparent / currentColor),
illustration colors, spacing/radius/border-width, icon/avatar/control sizes, shadows,
typography, light/dark resolution, custom themes, and `InvertedThemeProvider`.

**Every scale is themeable** — spacing, radius, sizes, shadows, and typography are carried on
the theme (not global constants), so a consumer can override them per `CDSThemeProvider`, just
like RN.

Also covered: token addressability (enumerable `CDSColorToken` / `CDSSpectrumHueToken` /
`CDSColorRampToken` with canonical `tokenName`s), `Equatable` token types (so SwiftUI skips
re-invalidating theme readers on no-op re-renders), and a strict no-provider policy with an
Xcode-Preview fallback.

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

// Custom brand theme via the cdsTheme { } builder — override only what you care about.
// Adding a token to CDS never changes this call site (evolution-safe construction).
let brand = cdsTheme {
    $0.id = "brand"
    $0.light.bgPrimary = Color(cdsRGB: 124, 58, 237)
    $0.dark.bgPrimary  = Color(cdsRGB: 124, 58, 237)
    $0.spacing.x2 = 20
    $0.typography[.body] = CDSTextAttributes(size: 17, lineHeight: 26, weight: .regular)
}
CDSThemeProvider(theme: brand) {
    MyRootView()
}

// Rebrand from a custom palette: override the spectrum and re-derive the semantic colors.
let paletteBrand = cdsTheme {
    $0.lightSpectrum = $0.lightSpectrum.with { $0.blue = $0.blue.with { $0.step60 = Color(cdsRGB: 124, 58, 237) } }
    $0.light = .lightDeriving(from: $0.lightSpectrum)
}
```

### No-provider behavior & Xcode Previews

Reading `\.cdsTheme` requires a `CDSThemeProvider` ancestor at runtime — a missing provider
traps with an actionable message instead of silently rendering wrong colors (matching Android's
`CdsTheme.current`). The one exception is Xcode Previews: an unwrapped component preview falls
back to the default theme (honoring the preview's light/dark setting), so previews "just work":

```swift
#Preview {              // no provider needed — renders the default theme
    CDSText("Hello", style: .title2)
}

#Preview {              // or wrap explicitly to preview a custom theme
    CDSThemeProvider(theme: brand) { CDSText("Hello", style: .title2) }
}
```

Read the active theme in a view via the environment:

```swift
@Environment(\.cdsTheme) private var theme
// Static access:
//   theme.colors.fgPrimary, theme.spacing.x2, theme.radius.r200, theme.typography[.title1]
// Dynamic / serialized access via tokens:
//   theme.colors[.fgPrimary]            // CDSColorToken
//   theme.spectrum[.blue][.step60]      // CDSSpectrumHueToken + CDSColorRampToken
//   for token in CDSColorToken.allCases { print(token.tokenName, theme.colors[token]) }
```

### Token addressability

Every token scale is enumerable and addressable, which is what a shared iOS↔Android token
contract (and serialized/JSON themes) needs:

```swift
CDSColorToken.allCases       // fg, fgMuted, …, transparent  (each has .tokenName "fgMuted")
CDSSpectrumHueToken.allCases // blue, green, …, chartreuse
CDSColorRampToken.allCases   // step0…step100 (.tokenName "0"…"100")
CDSTextStyle.allCases        // display1…legal (the font token)
```

## Build

```bash
cd native/ios
swift build
swift test
```

## Demo app

`CDSGalleryApp` is a runnable SwiftUI gallery — the iOS counterpart to Android's
`apps/android-app` — that renders the whole theme live so you can eyeball parity and try custom
themes. It has segmented controls to switch **theme** (CDS default vs. the sample `AcmeTheme`
brand) and **color scheme** (system / light / dark), and sections for:

- **Semantic colors** — every `CDSColorToken` swatch (`theme.colors[token]`)
- **Spectrum** — all 11 hues × 13 steps (`theme.spectrum[hue][step]`)
- **Typography** — every `CDSTextStyle` role with its size / line-height / weight
- **Spacing / Radius / Border width / Sizes / Shadows** — each themeable scale, drawn to size
- **Components** — `CDSText` variants, token-built surfaces, and an `InvertedThemeProvider` demo

```bash
cd native/ios
swift run CDSGalleryApp        # launches the gallery on the macOS host
```

Because the package targets iOS + macOS, the gallery builds with `swift build` and runs on the
host for quick iteration. To run it in the iOS Simulator, add it to an Xcode app project that
depends on this package (the app shell is `Sources/CDSGalleryApp/CDSGalleryApp.swift`).
`AcmeTheme.swift` shows how a consumer builds a brand theme with the `cdsTheme { }` builder.

## Note on token source

`Spectrum.swift` and the default token values are hand-ported from `defaultTheme.ts`. To keep
web / RN / iOS / Android in lockstep, these should ultimately be **generated** from the single
token source rather than maintained by hand.
