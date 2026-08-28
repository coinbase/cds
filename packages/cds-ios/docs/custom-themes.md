# Creating a custom theme

CDS ships one theme — the built-in `cds-default` (`CDSThemeSet.default`) — and a mechanism for
building your own from it. Once your theme is installed, every CDS view re-themes itself: it reads
`theme.colors.bgPrimary` and `theme.spacing.x3` rather than hard-coded values, so changing those
tokens changes the view with no per-view configuration.

This guide covers how to author a theme with the `cdsTheme { }` builder. For the other half of the
story — reading tokens in your views and carrying them through your own code — see
[Using theme tokens](using-tokens.md). For every token name and default value, see the
[token reference](token-reference.md).

**Prerequisites:** Swift, SwiftUI, and a passing familiarity with the SwiftUI environment.

---

## Contents

- [How CDS theming works](#how-cds-theming-works)
- [Approach 1: Extend the default theme](#approach-1-extend-the-default-theme)
- [Overriding typography and custom fonts](#overriding-typography-and-custom-fonts)
- [Approach 2: Rebrand from a custom spectrum](#approach-2-rebrand-from-a-custom-spectrum)
- [Approach 3: Define every token yourself](#approach-3-define-every-token-yourself)
- [Installing your theme](#installing-your-theme)
- [Inverting a subtree](#inverting-a-subtree)
- [Previews](#previews)
- [Testing your theme](#testing-your-theme)
- [Pitfalls](#pitfalls)

---

## How CDS theming works

Four ideas explain the whole API.

**A theme carries both color schemes.** A `CDSThemeSet` holds `light` _and_ `dark` (the semantic
`CDSColors` sets), `lightSpectrum` _and_ `darkSpectrum`, `lightIllustrationColors` _and_
`darkIllustrationColors`. You author one theme set, not a light theme and a dark theme.
Scheme-independent axes — spacing, type, radius, sizes, shadows — are stated once instead of
duplicated.

**Choosing a scheme is the provider's job.** `CDSThemeProvider(theme:colorScheme:)` takes the two as
independent arguments, and `colorScheme` defaults to `nil` (follow the system setting). `CDSThemeSet`
turns into the resolved `CDSTheme` that views read via `.resolve(_:)`.

**Views read semantic tokens, not raw colors.** The color layer has two tiers: `CDSSpectrum` is the
primitive tier (raw ramps like `blue.step60`), and `CDSColors` is the semantic tier (intent names like
`bgPrimary`, `fgMuted`). CDS views only ever read the semantic tier. This matters when you override
tokens — see [Pitfalls](#pitfalls).

**Themes are built, not memberwise-constructed.** `CDSTheme` and the token types
(`CDSColors`, `CDSSpectrum`, `CDSColorRamp`, `CDSIllustrationColors`) have `internal` memberwise
initializers on purpose. The construction surface is the `cdsTheme { }` builder plus the `with { }`
copy helpers. The reason is source stability: a public memberwise initializer would put one argument
per token into the API, so adding a token would break every consumer. `CDSThemeSet.init` instead
defaults every parameter, and you tweak a copy:

```swift
public func cdsTheme(
    base: CDSThemeSet = .default,
    _ block: (inout CDSThemeSet) -> Void
) -> CDSThemeSet
```

Every token you don't assign inside the block is inherited from `base`.

---

## Approach 1: Extend the default theme

The common case: override the tokens that differ and inherit the rest. Declare the theme as a
top-level `let` (or a `static let`) so it is allocated once.

```swift
import SwiftUI
import CDSDesignSystem

enum AcmeTheme {
    // Acme's brand purple stands in for CDS's blue. The dark variant is a lighter tint, mirroring how
    // CDS itself lightens blue60 -> blue70 in dark mode to hold contrast against a dark background.
    static let brandLight = Color(cdsHex: 0x7B3FE4)
    static let brandDark = Color(cdsHex: 0xAE8AFB)

    static let themeSet: CDSThemeSet = cdsTheme {
        $0.id = "acme"

        // Semantic colors, per scheme. `.with { }` copies the default set and tweaks a few tokens.
        $0.light = $0.light.with {
            $0.fgPrimary = brandLight
            $0.bgPrimary = brandLight
            $0.bgLinePrimary = brandLight
        }
        $0.dark = $0.dark.with {
            $0.fgPrimary = brandDark
            $0.bgPrimary = brandDark
            $0.bgLinePrimary = brandDark
        }

        // Scale axes are scheme-independent: assign the fields you want to remap.
        $0.spacing.x2 = 20
        $0.radius.r400 = 20
    }
}
```

Two things in that example are worth copying rather than just reading.

**Set `id`.** It participates in theme equality and is what you'll look for when debugging which theme
is installed. Use a stable slug like `"acme"`.

**Tweak semantic colors with `.with { }`.** `$0.light` and `$0.dark` are `CDSColors` values; the
`with { }` helper copies the base set and lets you override a few tokens without restating all of
them.

## Overriding typography and custom fonts

The 13 type roles are composite tokens: each `CDSTextAttributes` bundles `size`, `lineHeight`,
`weight`, an `uppercased` flag, and an optional `fontName`, so a role is re-themed as a unit. Assign a
role through the `typography` subscript:

```swift
static let themeSet: CDSThemeSet = cdsTheme {
    $0.id = "acme"

    // Restate a role completely.
    $0.typography[.body] = CDSTextAttributes(size: 17, lineHeight: 26, weight: .regular)

    // Or copy the inherited role and change one facet — here, the registered font family.
    $0.typography[.headline] = $0.typography[.headline].with { $0.fontName = "Inter-SemiBold" }
}
```

**Custom fonts go through `CDSTextAttributes.fontName`.** When `fontName` is `nil` (the default), the
role resolves to the system font; set it to the name of a font you've **registered with the app** (via
an `Info.plist` `UIAppFonts` entry or `CTFontManagerRegisterFontsForURL`) and that role renders in your
typeface. There is no single "font family" token — to change the typeface everywhere, set `fontName`
on every role you use. `CDSTypography` also has a `with { }` helper for bulk edits:

```swift
$0.typography = $0.typography.with {
    for role in CDSTextStyle.allCases {
        $0[role] = $0[role].with { $0.fontName = "Inter" }
    }
}
```

CDS specifies Inter for text and Source Code Pro for mono, but bundles no font resources, so out of
the box every role resolves to the system font. Supplying and registering your own fonts is therefore
a visible change even if you keep every metric.

---

## Approach 2: Rebrand from a custom spectrum

If your brand starts from a full tonal palette rather than a handful of semantic overrides, override
the **spectrum** and re-derive the semantic tier from it. Overriding the spectrum alone changes
nothing a CDS view reads (views read the semantic tier), so you must re-derive `light` / `dark` from
the new spectrum with `CDSColors.lightDeriving(from:)` / `darkDeriving(from:)` — the same mapping CDS
itself uses:

```swift
static let themeSet: CDSThemeSet = cdsTheme {
    $0.id = "nova"

    // Remap a hue's ramp, then re-derive the semantic colors from the new spectrum.
    $0.lightSpectrum = $0.lightSpectrum.with {
        $0.blue = $0.blue.with { $0.step60 = Color(cdsHex: 0x7B3FE4) }
    }
    $0.darkSpectrum = $0.darkSpectrum.with {
        $0.blue = $0.blue.with { $0.step70 = Color(cdsHex: 0xAE8AFB) }
    }
    $0.light = .lightDeriving(from: $0.lightSpectrum)
    $0.dark = .darkDeriving(from: $0.darkSpectrum)
}
```

`CDSSpectrum.with { }` and `CDSColorRamp.with { }` are copy helpers, so you touch only the hues and
steps you care about; the rest inherit from `cds-default`.

---

## Approach 3: Define every token yourself

"From scratch" is Approach 1 with nothing left inherited: call `cdsTheme` and assign every axis. Build
your palette as plain `Color` values (`CDSColorRamp` has an internal memberwise init, so a full ramp is
authored via `CDSSpectrum.light.with { }` / a `CDSColorRamp.with { }` off the default), then feed both
color tiers and every scale.

**Read this before you start:** because the surface is a builder, the compiler cannot tell you that
you missed a token. A token you don't assign silently keeps the CDS default, and a token added in a
future CDS release arrives already set to the CDS default. If you want a guarantee that no CDS value
leaks into your theme, you need the test in [Testing your theme](#testing-your-theme) — the type system
will not do it for you.

That tradeoff is deliberate. A memberwise initializer that made the omission a compile error would
make every added token a breaking change for every consumer. Given that CDS owns the defaults and
virtually all brand themes derive from them, the builder is the better trade.

See the [token reference](token-reference.md) for every name in every axis, so you can work through
them as a checklist.

---

## Installing your theme

Wrap your content once, at the root:

```swift
@main
struct AcmeApp: App {
    var body: some Scene {
        WindowGroup {
            CDSThemeProvider(theme: AcmeTheme.themeSet) {
                RootView()
            }
        }
    }
}
```

`colorScheme` defaults to `nil`, which follows the system dark-mode setting. Pass it explicitly to
drive the scheme from your own state — an in-app appearance setting, for instance:

```swift
CDSThemeProvider(
    theme: AcmeTheme.themeSet,
    colorScheme: userPrefersDark ? .dark : .light
) {
    RootView()
}
```

**Nesting overrides the theme for a subtree.** An inner provider re-themes only its subtree while
inheriting the surrounding color scheme unless it forces its own:

```swift
CDSThemeProvider(theme: AcmeTheme.themeSet) {          // Acme, system scheme
    CDSThemeProvider(theme: AcmeTheme.themeSet, colorScheme: .dark) {  // still Acme, forced dark
        PromoSection()
    }
}
```

Reading a token with no provider anywhere above the call site traps with
`No CDS theme found. Wrap your views in CDSThemeProvider { … }.`

## Inverting a subtree

For content that must read against the opposite background — a dark tooltip on a light screen — use
`InvertedThemeProvider`, which flips the scheme and keeps the theme:

```swift
CDSThemeProvider(theme: AcmeTheme.themeSet) {
    ScreenContent()
    InvertedThemeProvider {
        Tooltip("Fees apply")
    }
}
```

`InvertedThemeProvider` re-resolves the current `CDSThemeSet` against the opposite scheme. It reads the
ambient theme to learn the current scheme, so it **requires a `CDSThemeProvider` ancestor** — using it
with no provider above traps just like any other reader. Always nest it beneath a `CDSThemeProvider`.

## Previews

Wrap previews in the theme you want to see, and add one per scheme:

```swift
#Preview("Acme light") {
    CDSThemeProvider(theme: AcmeTheme.themeSet, colorScheme: .light) { MyScreen() }
}

#Preview("Acme dark") {
    CDSThemeProvider(theme: AcmeTheme.themeSet, colorScheme: .dark) { MyScreen() }
}
```

A preview with no provider at all renders `cds-default` rather than trapping, honoring the preview's
light/dark setting. That's a convenience for previewing a view in isolation — it also means **a preview
that forgot its provider looks fine and shows you the wrong theme.** If your brand colors aren't
showing up in a preview, check for a missing `CDSThemeProvider` first.

## Testing your theme

**Assert what you actually overrode.** Themes are values with real equality, so this is
straightforward. Resolve a `CDSThemeSet` to a `CDSTheme` for a scheme, or read the `light` / `dark`
`CDSColors` sets directly:

```swift
func testAcmeOverridesPrimaryColorInBothSchemes() {
    XCTAssertEqual(AcmeTheme.themeSet.light.bgPrimary, AcmeTheme.brandLight)
    XCTAssertEqual(AcmeTheme.themeSet.dark.bgPrimary, AcmeTheme.brandDark)
}

func testAcmeLeavesTypographyAlone() {
    XCTAssertEqual(AcmeTheme.themeSet.typography, CDSThemeSet.default.typography)
}
```

**For a from-scratch theme, assert that nothing was inherited.** The token enums make this a loop
instead of a hand-maintained list, and it fails when CDS adds a token you haven't assigned yet:

```swift
func testNovaDefinesEveryColorItself() {
    let leaked = CDSColorToken.allCases.filter { token in
        NovaTheme.themeSet.light[token] == CDSThemeSet.default.light[token]
    }
    XCTAssertTrue(leaked.isEmpty, "Still inheriting CDS values: \(leaked.map(\.tokenName))")
}
```

Every axis has a matching token enum and subscript, so the same loop works for spacing, radius,
typography, and the rest. One caveat: the test compares values, so a token you deliberately set to the
same value CDS uses (white is white) will be reported — allowlist those explicitly rather than deleting
the test.

## Pitfalls

**Overriding the spectrum does not change the semantic colors.** The `light` / `dark` `CDSColors` sets
are baked once; they don't re-derive from a spectrum override. Because views read only the semantic
tier, remapping `lightSpectrum.blue.step60` alone changes nothing visible in any CDS view. Set `light`
/ `dark` too — or re-derive them with `CDSColors.lightDeriving(from:)` as in
[Approach 2](#approach-2-rebrand-from-a-custom-spectrum).

**Check the pairing, not just the color.** Semantic tokens are used in pairs. A primary button paints
`bgPrimary` behind `fgInverse`, so a brand color lighter than CDS's blue can leave label text
unreadable. When you override a `bg*` token, verify its `fg*` partner against it in both schemes.

**Dark is not "the same color, dimmer."** CDS lightens `blue60` to `blue70` for `bgPrimary` in dark
mode to hold contrast against a dark background. Give your brand color the same treatment rather than
using one value for both schemes.

**There is no font-family token.** To change the typeface, set `fontName` on the roles you use — see
[Overriding typography and custom fonts](#overriding-typography-and-custom-fonts).

**Author one theme set, not a light/dark pair.** A single `CDSThemeSet` carries both schemes. Two
separate sets, one per scheme, is the shape this API is designed to avoid: you'd duplicate every
spacing and type override across both, and they'd drift.

**Hoist your theme out of view bodies.** `cdsTheme { }` inside a `body` reallocates on every render.
Value equality means the provider won't re-invalidate its subtree over it, so this is waste rather than
a bug — but a top-level `let` (or `static let`) is free.

**`caption` is uppercased for you.** The `caption` role carries `uppercased: true`, and CDS's internal
`Text` applies the transform. If you render caption text with SwiftUI's own `Text`, uppercase it
yourself.
