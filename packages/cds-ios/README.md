# CDS Native iOS — Theming foundation

Native SwiftUI implementation of the CDS theme system, the foundation for the
`native-rewrite` initiative (moving CDS off React Native toward native iOS).

This package contains the **theme provider and theming layer** only — no UI components. It is a
Swift Package (`CDSDesignSystem`) that builds standalone with `swift build` / `swift test`.

A runnable **theme gallery** that renders every token scale live (light/dark + custom-theme
switching) lives in [`apps/ios-gallery/`](../../apps/ios-gallery/) — the iOS counterpart to
Android's `apps/android-app`. See [Demo app](#demo-app).

It aims for parity with the React Native `ThemeProvider` (`packages/mobile/src/core/theme.ts`,
`packages/mobile/src/themes/defaultTheme.ts`).

## What's here

| Path | Purpose |
| --- | --- |
| `Theme/Tokens.swift` | Enumerable, addressable token names for every scale (`CDSColorToken`, `CDSSpectrumHueToken`, `CDSColorRampToken`, `CDSRadiusToken`, `CDSSpacingToken`, `CDSBorderWidthToken`, `CDSIconSizeToken`, `CDSAvatarSizeToken`, `CDSControlSizeToken`, `CDSIllustrationColorToken`, `CDSShadowToken`) with canonical `tokenName`s |
| `Theme/Spectrum.swift` | Tier-1 strongly-typed spectrum palette (`CDSSpectrum` / `CDSColorRamp`) — all 11 hues × 13 shades (light + dark) |
| `Theme/CDSColors.swift` | Tier-2 semantic color tokens (fg/bg/line/elevation/accent/…) + token subscript + custom-theme factories |
| `Theme/CDSIllustrationColors.swift` | Illustration color palette (light + dark) |
| `Theme/Color+RGB.swift` | `Color` init from CDS RGB strings / components |
| `Theme/Spacing.swift` | Themeable spacing / radius / border-width scales |
| `Theme/Sizes.swift` | Themeable icon / avatar / control size scales |
| `Theme/Shadow.swift` | Shadow (elevation) tokens + `.cdsShadow()` modifier |
| `Theme/Typography.swift` | Themeable typography (`CDSTypography`, `CDSTextAttributes`, `CDSTextStyle` font token) + `CDSText` primitive |
| `Theme/CDSTheme.swift` | `CDSTheme`, `CDSThemeSet`, `cdsTheme { }` builder, `CDSThemeProvider`, `InvertedThemeProvider` |

The demo gallery that consumes this library lives in [`apps/ios-gallery/`](../../apps/ios-gallery/).

## RN parity

Covered: full spectrum, semantic colors (incl. accents / transparent / currentColor),
illustration colors, spacing/radius/border-width, icon/avatar/control sizes, shadows,
typography, light/dark resolution, custom themes, and `InvertedThemeProvider`.

**Every scale is themeable** — spacing, radius, sizes, shadows, and typography are carried on
the theme (not global constants), so a consumer can override them per `CDSThemeProvider`, just
like RN.

Also covered: token addressability (every scale is enumerable and addressable — `CDSColorToken` /
`CDSSpectrumHueToken` / `CDSColorRampToken` / `CDSRadiusToken` / `CDSSpacingToken` /
`CDSBorderWidthToken` / `CDSIconSizeToken` / `CDSAvatarSizeToken` / `CDSControlSizeToken` /
`CDSIllustrationColorToken` / `CDSShadowToken` — with canonical `tokenName`s), `Equatable` token types (so SwiftUI skips
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
CDSRadiusToken.allCases      // r0…r1000 (.tokenName "0"…"1000"); theme.radius[.r400]
CDSSpacingToken.allCases     // x0…x10 (.tokenName "0"…"10", "1.5"); theme.spacing[.x2]
CDSBorderWidthToken.allCases // w0…w500 (.tokenName "0"…"500"); theme.borderWidth[.w100]
CDSIconSizeToken.allCases    // xs…l; theme.iconSize[.m]
CDSAvatarSizeToken.allCases  // s…xxxl; theme.avatarSize[.xl]
CDSControlSizeToken.allCases // checkboxSize…tileSize; theme.controlSize[.checkboxSize]
CDSIllustrationColorToken.allCases // primary…invert2; theme.illustrationColors[.primary]
CDSShadowToken.allCases      // elevation1, elevation2; theme.shadow[.elevation1]
CDSTextStyle.allCases        // display1…legal (the font token)
```

## Build

Directly with SwiftPM:

```bash
cd packages/cds-ios
swift build
swift test
```

Or through Nx (project `cds-ios`, tagged `platform:ios`):

```bash
yarn nx run cds-ios:test        # swift test (theme library)
yarn nx run cds-ios:assemble    # swift build -c release
```

`platform:ios` projects are excluded from the JavaScript CI (`ci.yml`) — Swift/Xcode builds run
in a separate macOS workflow (`.github/workflows/ios.yml`), mirroring how Android uses
`android.yml`. Never name a `cds-ios` target `build`, `typecheck`, or `lint`: those names are
wired to JS CI jobs that run on Linux runners with no Swift toolchain.

## Demo app

The theme gallery lives in [`apps/ios-gallery/`](../../apps/ios-gallery/) (Nx project
`ios-gallery`) — the iOS counterpart to Android's `apps/android-app`. It's a SwiftUI app that
renders the whole theme live so you can eyeball parity and try custom themes, with segmented
controls to switch **theme** (CDS default vs. the sample `AcmeTheme` brand) and **color scheme**
(system / light / dark), and sections for:

- **Semantic colors** — every `CDSColorToken` swatch (`theme.colors[token]`)
- **Illustration colors** — every `CDSIllustrationColorToken` swatch (`theme.illustrationColors[token]`)
- **Spectrum** — all 11 hues × 13 steps (`theme.spectrum[hue][step]`)
- **Typography** — every `CDSTextStyle` role with its size / line-height / weight
- **Spacing / Radius / Border width / Sizes / Shadows** — each themeable scale, drawn to size
- **Components** — `CDSText` variants, token-built surfaces, and an `InvertedThemeProvider` demo

Run it on a Simulator:

```bash
yarn nx run ios-gallery:launch   # xcodegen + build + install + launch
# or open the workspace: (cd apps/ios-gallery && xcodegen generate) && open ios/CDS.xcworkspace
```

`apps/ios-gallery/Sources/AcmeTheme.swift` shows how a consumer builds a brand theme with the
`cdsTheme { }` builder.

## Note on token source

`Spectrum.swift` and the default token values are hand-ported from `defaultTheme.ts`. To keep
web / RN / iOS / Android in lockstep, these should ultimately be **generated** from the single
token source rather than maintained by hand.
