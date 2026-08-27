# Using theme tokens

How to read CDS design tokens from your SwiftUI views, and how to carry a token through your own code
— state, domain logic, your own view APIs — in a way that stays type-safe and survives a light/dark
flip.

For authoring a theme, see [Creating a custom theme](custom-themes.md). For the full list of token
names and their default values, see the [token reference](token-reference.md).

---

## Contents

- [Reading tokens in a view](#reading-tokens-in-a-view)
- [Reading the current color scheme](#reading-the-current-color-scheme)
- [Ambient theme vs. a specific theme](#ambient-theme-vs-a-specific-theme)
- [Carrying tokens through your own code](#carrying-tokens-through-your-own-code)
- [Designing your own view APIs](#designing-your-own-view-apis)
- [Iterating a scale](#iterating-a-scale)
- [Performance notes](#performance-notes)
- [Quick reference](#quick-reference)

---

## Reading tokens in a view

The resolved theme lives in the SwiftUI environment. Read it with `@Environment(\.cdsTheme)` and every
token is a property away — there is no parameter to thread and nothing to inject. The value resolves
against the nearest `CDSThemeProvider` above the view.

If you know the web or React Native CDS, `\.cdsTheme` is the same shape as a React context paired with
a `useTheme()` hook: provide once at the root, read at any depth, no prop-drilling in between. Nesting
a `CDSThemeProvider` re-themes only that subtree, the way nesting a context provider would.

```swift
import SwiftUI
import CDSDesignSystem

struct PriceCard: View {
    @Environment(\.cdsTheme) private var theme

    let label: String
    let price: String

    var body: some View {
        VStack(alignment: .leading, spacing: theme.spacing.x0_5) {
            Text(label)
                .font(theme.typography[.label2].font)
                .foregroundStyle(theme.colors.fgMuted)
            Text(price)
                .font(theme.typography[.title3].font)
                .foregroundStyle(theme.colors.fg)
        }
        .padding(theme.spacing.x2)
        .background(theme.colors.bgSecondary)
        .clipShape(RoundedRectangle(cornerRadius: theme.radius.r400))
    }
}
```

The axes on the resolved `CDSTheme`:

| Property                   | Type                    | Example read                       |
| -------------------------- | ----------------------- | ---------------------------------- |
| `theme.colors`             | `CDSColors`             | `theme.colors.bgPrimary`           |
| `theme.spectrum`           | `CDSSpectrum`           | `theme.spectrum.blue.step60`       |
| `theme.illustrationColors` | `CDSIllustrationColors` | `theme.illustrationColors.accent1` |
| `theme.spacing`            | `CDSSpacing`            | `theme.spacing.x2`                 |
| `theme.borderWidth`        | `CDSBorderWidth`        | `theme.borderWidth.w100`           |
| `theme.radius`             | `CDSRadius`             | `theme.radius.r400`                |
| `theme.iconSize`           | `CDSIconSize`           | `theme.iconSize.m`                 |
| `theme.avatarSize`         | `CDSAvatarSize`         | `theme.avatarSize.xl`              |
| `theme.controlSize`        | `CDSControlSize`        | `theme.controlSize.switchWidth`    |
| `theme.typography`         | `CDSTypography`         | `theme.typography[.body]`          |
| `theme.shadow`             | `CDSShadowScale`        | `theme.shadow.elevation1.radius`   |
| `theme.colorScheme`        | `ColorScheme`           | `theme.colorScheme == .dark`       |

Three properties of these reads are worth knowing.

**They're already scheme-resolved.** `theme.colors` is the color set for whichever scheme is ambient —
there is no `.light`/`.dark` to pick from and no `if isDark` to write. Flipping the scheme changes what
these return, everywhere, with no work at the call site. (Scale axes like `spacing`, `radius`, and
`typography` don't vary by scheme; only `colors` and `illustrationColors` do.)

**Read at the leaf; don't thread values through parameters.** Passing `bgColor: Color` down three
views is the pattern the token layer exists to eliminate. Read `theme.colors.bg` where you paint it.
The one exception is a genuinely configurable color — a caller-chosen accent — which is a parameter
like any other.

**They require a provider.** Reading `\.cdsTheme` with no `CDSThemeProvider` anywhere above traps with
`No CDS theme found. Wrap your views in CDSThemeProvider { … }.` The one exception is an Xcode Preview,
where a missing provider falls back to the default CDS theme (honoring the preview's light/dark
setting) rather than crashing:

```swift
#Preview {                 // no provider needed — renders the default theme
    PriceCard(label: "Balance", price: "$1,024.00")
}
```

## Reading the current color scheme

`theme.colorScheme` tells you which scheme resolved. Reach for it when you need an asset the token
layer doesn't cover — a raster logo, a Lottie file, a map style:

```swift
struct BrandLogo: View {
    @Environment(\.cdsTheme) private var theme

    var body: some View {
        Image(theme.colorScheme == .dark ? "logo-dark" : "logo-light")
    }
}
```

Note what this is _not_ for. `theme.colorScheme == .dark ? Color.white : .black` is a token that
should live in the theme — `fg` already is that token. Branching on the scheme to pick a color means
the value is missing from your theme, and it won't respond to `InvertedThemeProvider` the way a real
token would.

Prefer `theme.colorScheme` over reading SwiftUI's `@Environment(\.colorScheme)` directly inside your
UI: `CDSThemeProvider` writes the scheme it actually resolved (including inside an inverted subtree, or
when your app forces its own appearance), so the two agree even when the device setting disagrees.

## Ambient theme vs. a specific theme

Two things read similarly and mean different things:

```swift
theme.colors.bgPrimary            // ambient + resolved: from the environment, follows the current scheme
CDSTheme.light.colors.bgPrimary   // one explicit scheme of the default theme: readable anywhere
AcmeTheme.resolve(.light).colors.bgPrimary  // one explicit scheme of one explicit theme set
```

Use the first in UI. Use the others in tests, tooling, and anywhere you need a value without a view
context — `CDSTheme.light` / `CDSTheme.dark` are the default theme pre-resolved, and any `CDSThemeSet`
resolves to a `CDSTheme` for a chosen scheme with `.resolve(_:)`.

## Carrying tokens through your own code

This is the "I want a variable holding a CDS color that I can pass around" case. It has a good answer
and a tempting wrong one, and the difference only shows up later.

Every scale has **two representations**:

|           | Type                       | Needs the environment? | Scheme-specific? | Use for                                                          |
| --------- | -------------------------- | ---------------------- | ---------------- | ---------------------------------------------------------------- |
| **Name**  | `CDSColorToken.fgPositive` | No                     | No               | State, domain logic, your own APIs, anything stored or persisted |
| **Value** | `Color(cdsHex: 0x098551)`  | Yes, to obtain         | Yes              | The final read, at the point you paint                           |

The rule that falls out: **pass names around, resolve to values at the edge.** A resolved `Color` is a
snapshot of one scheme at one moment. Capture it in state and it goes stale the instant the user flips
dark mode or your content lands inside `InvertedThemeProvider` — silently, since a stale `Color` is
still a perfectly valid `Color`.

Token names are plain `String`-backed enums: no SwiftUI dependency at the definition site,
`switch`-able, `Equatable`, unit-testable, and `tokenName` gives you a stable string for logs or
persistence.

```swift
// Domain -> token. A pure function: no environment, no SwiftUI, trivially unit-testable.
func statusColorToken(_ status: OrderStatus) -> CDSColorToken {
    switch status {
    case .filled: return .fgPositive
    case .pending: return .fgMuted
    case .failed: return .fgNegative
    }
}
```

```swift
// UI state carries the name, not the color.
struct OrderRowState {
    let label: String
    let amount: String
    let amountColor: CDSColorToken
}
```

```swift
// Resolve at the point of use, with the token subscript every scale provides.
struct OrderRow: View {
    @Environment(\.cdsTheme) private var theme
    let state: OrderRowState

    var body: some View {
        Text(state.amount)
            .font(theme.typography[.headline].font)
            .foregroundStyle(theme.colors[state.amountColor])
    }
}
```

`theme.colors[token]` is the load-bearing piece: every axis has a subscript taking its token enum, so
a name resolves against the ambient theme in one expression.

```swift
theme.colors[.fgPositive]              // Color
theme.spacing[.x2]                     // CGFloat
theme.radius[.r400]                    // CGFloat
theme.typography[.headline]            // CDSTextAttributes
theme.spectrum[.blue][.step60]         // Color
theme.illustrationColors[.accent1]     // Color
theme.shadow[.elevation1]              // CDSShadow
```

You can also resolve against an explicit `CDSColors` instance with no environment at all, which is how
to keep resolution logic in a plain testable function:

```swift
func amountColor(_ colors: CDSColors, _ status: OrderStatus) -> Color {
    colors[statusColorToken(status)]
}

// In a test:
XCTAssertEqual(
    CDSColors.light.fgNegative,
    amountColor(.light, .failed)
)
```

**One caveat on `switch` over a token enum.** Cases may be added in a minor release, so matching one
of these enums exhaustively is brittle: an exhaustive `switch` stops compiling when a case is added.
Include a `default:` branch. Matching over _your_ enum to produce a token — as in `statusColorToken`
above — has no such problem, and is the direction to prefer.

**What not to do:**

```swift
// Wrong: a Color captured in a view model is frozen to whichever scheme was ambient when it was read
// -- if it could be read there at all, which it can't without the environment.
final class OrderViewModel: ObservableObject {
    let amountColor: Color = /* ... */
}

// Right: hold the name.
struct OrderViewModel {
    let amountColor: CDSColorToken = .fgPositive
}

// Wrong: persisting a resolved value defeats theming entirely.
// Right: persist the name.
defaults.set(CDSColorToken.bgPrimary.tokenName, forKey: "accent")
```

## Designing your own view APIs

Your own views sit next to CDS's, so following the same shapes keeps the boundary predictable.

**Take a token enum when the parameter names a token.** The view resolves it internally, so callers
can't pass a color that isn't in the theme, and the value stays correct across scheme flips:

```swift
struct StatusPill: View {
    @Environment(\.cdsTheme) private var theme

    let text: String
    var color: CDSColorToken = .fgMuted   // a name, not a Color

    var body: some View {
        Text(text)
            .font(theme.typography[.label1].font)
            .foregroundStyle(theme.colors[color])
            .padding(.horizontal, theme.spacing.x1)
            .padding(.vertical, theme.spacing.x0_5)
            .background(theme.colors[color].opacity(0.12))
            .clipShape(RoundedRectangle(cornerRadius: theme.radius.r1000))
    }
}
```

`StatusPill(text: "Filled", color: statusColorToken(status))` then carries a token from domain logic
to pixels without ever materializing a `Color` in between.

**Take your own enum when the choice is component-scoped.** If callers should pick an _intent_ rather
than a token — "this is destructive," not "paint it red" — model that intent and map it to tokens
inside. It keeps the token mapping in one place, so a design change is one edit rather than a search
across call sites.

```swift
enum PillTone { case neutral, positive, negative }

private extension PillTone {
    var token: CDSColorToken {
        switch self {
        case .neutral: return .fgMuted
        case .positive: return .fgPositive
        case .negative: return .fgNegative
        }
    }
}
```

**Take a resolved `Color` or `CGFloat` only when an arbitrary value is legitimate** — a caller-supplied
brand accent, a measured width. There's no scheme boolean to add: read `theme.colorScheme` if you
truly need it, and never add an `isDark: Bool` parameter — it duplicates state the theme already
carries and goes wrong the moment the view appears inside `InvertedThemeProvider`.

## Iterating a scale

`.allCases` makes a scale enumerable, which is what you want for a palette screen, a debug overlay, or
a test that walks every token:

```swift
struct ColorSwatches: View {
    @Environment(\.cdsTheme) private var theme

    var body: some View {
        VStack(alignment: .leading) {
            ForEach(CDSColorToken.allCases, id: \.self) { token in
                HStack {
                    RoundedRectangle(cornerRadius: theme.radius.r100)
                        .fill(theme.colors[token])
                        .frame(width: theme.iconSize.l, height: theme.iconSize.l)
                    Text(token.tokenName)
                        .font(theme.typography[.label2].font)
                }
            }
        }
    }
}
```

`tokenName` is the canonical CDS spelling (`fgMuted`, `1.5`, `title1`), shared with the web and Android
token contracts — use it for labels and for parsing or emitting serialized themes.

Every scale is enumerable and addressable the same way:

```swift
CDSColorToken.allCases        // fg, fgMuted, …, currentColor, transparent
CDSSpectrumHueToken.allCases  // blue, green, …, chartreuse
CDSColorRampToken.allCases    // step0…step100 (.tokenName "0"…"100")
CDSRadiusToken.allCases       // r0…r1000 (.tokenName "0"…"1000")
CDSSpacingToken.allCases      // x0…x10 (.tokenName "0"…"10", "1.5")
CDSBorderWidthToken.allCases  // w0…w500 (.tokenName "0"…"500")
CDSIconSizeToken.allCases     // xs…l
CDSAvatarSizeToken.allCases   // s…xxxl
CDSControlSizeToken.allCases  // checkboxSize…tileSize
CDSIllustrationColorToken.allCases // primary…invert2
CDSShadowToken.allCases       // elevation1, elevation2
CDSTextStyle.allCases         // display1…legal (the font token)
```

## Performance notes

**Reads are cheap.** The theme is a single value in the SwiftUI environment, and it is `Equatable`, so
`CDSThemeProvider` lets SwiftUI skip re-invalidating readers when the resolved tokens are unchanged.
Reading a dozen tokens in one view costs nothing worth optimizing.

**Install few providers.** One `CDSThemeProvider` at the app root plus the occasional deliberate
nesting is the intended shape — a provider per row in a `List` is not.

**Themes compare by value.** Every token type is `Equatable`, so passing an equal `CDSThemeSet` doesn't
re-invalidate the subtree. That's what makes an inline `cdsTheme { }` at a call site merely wasteful
rather than a correctness bug — though a top-level `let` (or a `static let`) is still the right home
for a theme.

## Quick reference

| I want to…                     | Do this                                                                       |
| ------------------------------ | ----------------------------------------------------------------------------- |
| Read the theme in a view       | `@Environment(\.cdsTheme) private var theme`                                  |
| Paint a themed color           | `.background(theme.colors.bg)` / `.foregroundStyle(theme.colors.fg)`          |
| Pad or space something         | `.padding(theme.spacing.x2)`, `spacing: theme.spacing.x1`                     |
| Round a corner                 | `RoundedRectangle(cornerRadius: theme.radius.r400)`                           |
| Style text                     | `.font(theme.typography[.headline].font)` — size, weight, and family together |
| Apply a shadow                 | `.cdsShadow(theme.shadow.elevation1)`                                         |
| Know if it's dark              | `theme.colorScheme == .dark` — for assets, not for picking colors             |
| Hold a color in state          | Store `CDSColorToken`; resolve with `theme.colors[token]`                     |
| Resolve a token without a view | `CDSTheme.light.colors[token]`, or pass a `CDSColors` in                      |
| Enumerate a scale              | `CDSColorToken.allCases`, `CDSSpacingToken.allCases`, …                       |
| Invert a subtree               | `InvertedThemeProvider { }` (needs a `CDSThemeProvider` ancestor)             |
