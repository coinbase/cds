# Creating a custom theme

CDS ships one theme, `CdsDefaultTheme`, and a mechanism for building your own from it. Once your
theme is installed, every CDS component re-themes itself: `Button` reads `CdsTheme.colors.bgPrimary`
and `CdsTheme.space.x3` rather than hard-coded values, so changing those tokens changes the
component with no per-component configuration.

This guide covers three ways to author a theme, from the most common to the least. For the other half
of the story — reading tokens in your composables and carrying them through your own code — see
[Using theme tokens](using-tokens.md).

**Prerequisites:** Kotlin, Jetpack Compose, and a passing familiarity with `CompositionLocal`.

---

## Contents

- [How CDS theming works](#how-cds-theming-works)
- [Which approach do I need?](#which-approach-do-i-need)
- [Approach 1: Extend the default theme](#approach-1-extend-the-default-theme)
- [Approach 2: Define every token yourself](#approach-2-define-every-token-yourself)
- [Approach 3: Add your own tokens alongside CDS's](#approach-3-add-your-own-tokens-alongside-cdss)
- [Installing your theme](#installing-your-theme)
- [Previews](#previews)
- [Testing your theme](#testing-your-theme)
- [Pitfalls](#pitfalls)
- [FAQ](#faq)

---

## How CDS theming works

Four ideas explain the whole API.

**A theme carries both color schemes.** `CdsTheme` holds `lightColors` _and_ `darkColors`,
`lightSpectrum` _and_ `darkSpectrum`. You author one theme, not a light theme and a dark theme.
Scheme-independent axes — spacing, type, radius — are stated once instead of duplicated.

**Choosing a scheme is the provider's job.** `CdsThemeProvider(theme, colorScheme)` takes the two as
independent arguments, and `colorScheme` defaults to the device's dark-mode setting. Two themes times
two schemes is two one-line choices at your app root, not a four-branch `when`.

**Components read semantic tokens, not raw colors.** The color layer has two tiers:
`CdsSpectrum` is the primitive tier (raw ramps like `blue.step60`), and `CdsColors` is the semantic
tier (intent names like `bgPrimary`, `fgMuted`). CDS components only ever read the semantic tier.
This matters when you override tokens — see [Pitfalls](#pitfalls).

**Themes are built, not constructed.** `CdsTheme` and every token type has an `internal`
constructor; `cdsTheme { }` is the entire public construction surface. The reason is binary
compatibility: a public constructor would put one parameter per token into the published ABI, so
adding a token would break every app compiled against the previous release. With a builder, adding a
token adds a field that your code can ignore.

```kotlin
public fun cdsTheme(
    base: CdsTheme = CdsDefaultTheme,
    block: CdsThemeBuilder.() -> Unit,
): CdsTheme
```

Every token you don't assign inside the block is inherited from `base`.

---

## Which approach do I need?

|       | Approach                                                                              | Use when                                                                                                                               |
| ----- | ------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| **1** | [Extend the default theme](#approach-1-extend-the-default-theme)                      | Your brand differs from CDS in specific ways — a brand color, a roomier spacing scale, your own typeface. **This is the common case.** |
| **2** | [Define every token yourself](#approach-2-define-every-token-yourself)                | You are re-theming CDS wholesale for a product that shares no visual DNA with Coinbase, and want no inherited value anywhere.          |
| **3** | [Add your own tokens alongside CDS's](#approach-3-add-your-own-tokens-alongside-cdss) | You need token names CDS doesn't define (`brandGradientStart`, `promoBannerHeight`) while still using CDS components.                  |

Approaches 1 and 2 are the same API used to different degrees. Approach 3 is a separate pattern and
composes with either of the first two.

---

## Approach 1: Extend the default theme

Override the tokens that differ and inherit the rest. Declare the theme as a top-level `val` so it
is allocated once for the life of the process.

```kotlin
package com.acme.app.theme

import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import com.coinbase.cds.theme.CdsDefaultTheme
import com.coinbase.cds.theme.CdsTheme
import com.coinbase.cds.theme.cdsTheme

// Acme's brand purple stands in for CDS's blue. The dark variant is a lighter tint, mirroring how
// CDS itself lightens blue60 -> blue70 in dark mode to hold contrast against a dark background.
private val BrandLight = Color(0xFF7B3FE4)
private val BrandDark = Color(0xFFAE8AFB)

private val DefaultSpace = CdsDefaultTheme.space
private val DefaultRadius = CdsDefaultTheme.borderRadius

val AcmeTheme: CdsTheme = cdsTheme {
    id = "acme"

    lightColors {
        fgPrimary = BrandLight
        bgPrimary = BrandLight
        bgLinePrimary = BrandLight
    }
    darkColors {
        fgPrimary = BrandDark
        bgPrimary = BrandDark
        bgLinePrimary = BrandDark
    }

    // Acme reads roomier than CDS: every rung shifts up one step in CDS's own scale, which keeps
    // the ramp internally coherent instead of picking one-off numbers.
    space {
        // x0 stays 0dp -- "no space" doesn't get roomier.
        x0_25 = DefaultSpace.x0_5
        x0_5 = DefaultSpace.x0_75
        x0_75 = DefaultSpace.x1
        x1 = DefaultSpace.x1_5
        x1_5 = DefaultSpace.x2
        x2 = DefaultSpace.x3
        // ...
        x10 = 88.dp // one step beyond CDS's scale, continuing the same rhythm
    }

    borderRadius {
        // radius0 and radius1000 are untouched: zero is zero, and a pill can't get rounder.
        radius100 = DefaultRadius.radius200
        radius200 = DefaultRadius.radius300
        // ...
    }
}
```

Three things in that example are worth copying rather than just reading.

**Read defaults from a captured `val`, not from the builder.** `DefaultSpace.x1_5` is stable;
inside the block there is no way to read "the value `x1_5` had before this block ran," so shifting a
scale in place would make every rung depend on assignment order.

**Set `id`.** It appears in `toString()`, participates in theme equality, and is what you will look
for when debugging which theme is installed. Use a stable slug like `"acme"`.

**Override rungs, not just values.** Remapping a whole scale one step at a time preserves the
property that made it a scale. Assigning three arbitrary dp values to three rungs does not.

### Overriding typography

The 13 type variants are composite tokens: each `TextStyle` bundles family, size, weight, and line
height, so a variant is re-themed as a unit.

```kotlin
private val AcmeSans = FontFamily(
    Font(R.font.acme_sans_regular, FontWeight.Normal),
    Font(R.font.acme_sans_semibold, FontWeight.SemiBold),
)

val AcmeTheme: CdsTheme = cdsTheme {
    id = "acme"
    typography {
        // Keep CDS's metrics, swap the family: copy() off the inherited style.
        body = body.copy(fontFamily = AcmeSans)
        headline = headline.copy(fontFamily = AcmeSans)

        // Or restate a variant completely.
        display1 = TextStyle(
            fontFamily = AcmeSans,
            fontWeight = FontWeight.Bold,
            fontSize = 56.sp,
            lineHeight = 64.sp,
        )
    }
}
```

Inside `typography { }`, reading `body` gives you the base theme's value until you assign it, which
makes `body = body.copy(...)` the idiomatic way to change one facet of a variant. The same holds for
any scalar token: `space { x2 = x2 * 1.5f }` works.

To change the typeface everywhere, assign all 13 variants. There is no single "font family" token to
set — see [Pitfalls](#pitfalls).

---

## Approach 2: Define every token yourself

There is no public `CdsTheme` constructor, so "from scratch" means calling `cdsTheme` and assigning
every token in every axis. Mechanically it is Approach 1 with nothing left inherited.

**Read this before you start:** because the surface is a builder, the compiler cannot tell you that
you missed a token. A token you don't assign silently keeps the CDS default, and a token added in a
future CDS release arrives already set to the CDS default. If you want a guarantee that no CDS value
leaks into your theme, you need the test in [Testing your theme](#testing-your-theme) — the type
system will not do it for you.

That tradeoff is deliberate. The alternative, a constructor that makes the omission a compile error,
would make every added token a breaking change for every consumer. Given that CDS owns the defaults
and virtually all brand themes derive from them, the builder is the better trade — but it does mean
Approach 2 carries a burden Approach 1 doesn't.

### Structure it in tiers

Build your palette as plain Kotlin values, then use them in both color tiers. Assign the spectrum
_and_ the semantic colors: overriding one does not derive the other.

```kotlin
package com.nova.app.theme

// Tier 1: your own primitives. Plain `Color` vals -- CdsColorRamp has no public constructor, so
// your ramp lives as ordinary Kotlin values that feed the builder below.
private object NovaPalette {
    val blue0 = Color(0xFFF2F7FF)
    val blue60 = Color(0xFF1A5CFF)
    val blue70 = Color(0xFF4C7FFF)
    val gray0 = Color(0xFFFFFFFF)
    val gray100 = Color(0xFF0A0A0A)
    // ... every step of every hue you use
}

val NovaTheme: CdsTheme = cdsTheme {
    id = "nova"

    // Tier 2a: the primitive tier, per scheme. 11 hues x 13 steps.
    lightSpectrum {
        blue {
            step0 = NovaPalette.blue0
            // step5 ... step50
            step60 = NovaPalette.blue60
            step70 = NovaPalette.blue70
            // step80 ... step100
        }
        gray { /* ... */ }
        green { /* ... */ }
        // orange, indigo, pink, purple, red, teal, yellow, chartreuse
    }
    darkSpectrum { /* the same 11 hues, dark values */ }

    // Tier 2b: the semantic tier -- what CDS components actually read. Point these at your own
    // palette, not at the spectrum block above: the two are independent sets of values.
    lightColors {
        fg = NovaPalette.gray100
        fgInverse = NovaPalette.gray0
        fgPrimary = NovaPalette.blue60
        bg = NovaPalette.gray0
        bgPrimary = NovaPalette.blue60
        // ... every name in CdsColorToken
    }
    darkColors { /* ... */ }

    lightIllustrationColors { /* 15 names */ }
    darkIllustrationColors { /* 15 names */ }

    // Tier 3: the scheme-independent axes. Stated once, not per scheme.
    space { /* x0 ... x10 */ }
    borderWidth { /* borderWidth0 ... borderWidth500 */ }
    borderRadius { /* radius0 ... radius1000 */ }
    iconSize { /* xs, s, m, l */ }
    avatarSize { /* s, m, l, xl, xxl, xxxl */ }
    controlSize { /* checkboxSize, radioSize, switchWidth, switchHeight, switchThumbSize, tileSize */ }
    typography { /* 13 TextStyles */ }
    shadows {
        elevation1 { color = Color.Black; offsetY = 4.dp; opacity = 0.1f; blurRadius = 8.dp }
        elevation2 { /* ... */ }
    }
}
```

See the [token reference](token-reference.md) for every name in every axis, so you can work through
them as a checklist.

### Split the file up

A theme that assigns every token runs to several hundred lines. Break it into one file per axis and
compose them, which keeps each piece reviewable and lets a color change touch only the color file:

```kotlin
// NovaColors.kt
internal fun CdsThemeBuilder.novaColors() {
    lightColors { /* ... */ }
    darkColors { /* ... */ }
}

// NovaTheme.kt
val NovaTheme: CdsTheme = cdsTheme {
    id = "nova"
    novaColors()
    novaSpace()
    novaTypography()
    // ...
}
```

`CdsThemeBuilder` is public, so extension functions on it are the natural seam.

---

## Approach 3: Add your own tokens alongside CDS's

**Short answer: yes, this works** — with one qualification. You cannot make a type that _is_ a
superset of `CdsTheme`: the class is final with an `internal` constructor, so there is nothing to
subclass or implement. What you can do — and what production consumers of comparable systems do — is
**compose**: own a second token holder next to CDS's, install both at the root, and read both through
one accessor. CDS components keep working because they read the CDS half, which is unchanged.

The reason CDS ships no built-in mechanism for extra tokens: no CDS component can read a name CDS
never defined, so a `brandGradientStart` stored inside `CdsTheme` would only ever be read by your
code. Storing it in `:cds` would buy nothing.

### The pattern

```kotlin
package com.zenith.app.theme

import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.runtime.Composable
import androidx.compose.runtime.CompositionLocalProvider
import androidx.compose.runtime.Immutable
import androidx.compose.runtime.ReadOnlyComposable
import androidx.compose.runtime.staticCompositionLocalOf
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.dp
import com.coinbase.cds.theme.CdsColorScheme
import com.coinbase.cds.theme.CdsTheme
import com.coinbase.cds.theme.CdsThemeProvider
import com.coinbase.cds.theme.LocalCdsTheme
import com.coinbase.cds.theme.cdsTheme

/** The CDS half: an ordinary Approach 1 theme. */
val ZenithBrandTheme: CdsTheme = cdsTheme {
    id = "zenith"
    lightColors { bgPrimary = Color(0xFF7B3FE4) }
    darkColors { bgPrimary = Color(0xFFAE8AFB) }
}

/** Zenith's own tokens, for one color scheme. */
@Immutable
data class ZenithTokens(
    val brandGradientStart: Color,
    val brandGradientEnd: Color,
    val promoBannerHeight: Dp,
)

/** Both schemes, so the pair is reachable at read time. */
@Immutable
data class ZenithTokenSet(val light: ZenithTokens, val dark: ZenithTokens)

val ZenithDefaultTokens = ZenithTokenSet(
    light = ZenithTokens(Color(0xFF7B3FE4), Color(0xFF3FA9E4), 96.dp),
    dark = ZenithTokens(Color(0xFFAE8AFB), Color(0xFF8ACFFB), 96.dp),
)

private val LocalZenithTokens = staticCompositionLocalOf { ZenithDefaultTokens }

/**
 * Resolves against whatever CDS scheme is ambient *at the call site*, which is what lets
 * CdsInvertedThemeProvider flip these correctly at arbitrary depth.
 */
val CdsTheme.Companion.zenith: ZenithTokens
    @Composable @ReadOnlyComposable
    get() {
        val set = LocalZenithTokens.current
        return if (CdsTheme.colorScheme == CdsColorScheme.Light) set.light else set.dark
    }

/** Installs both halves. Your app root calls this instead of CdsThemeProvider directly. */
@Composable
fun ZenithThemeProvider(
    theme: CdsTheme = ZenithBrandTheme,
    tokens: ZenithTokenSet = ZenithDefaultTokens,
    colorScheme: CdsColorScheme = LocalCdsTheme.current?.colorScheme
        ?: if (isSystemInDarkTheme()) CdsColorScheme.Dark else CdsColorScheme.Light,
    content: @Composable () -> Unit,
) {
    CompositionLocalProvider(LocalZenithTokens provides tokens) {
        CdsThemeProvider(theme = theme, colorScheme = colorScheme, content = content)
    }
}
```

Call sites then read both vocabularies the same way, side by side:

```kotlin
Box(
    Modifier
        .height(CdsTheme.zenith.promoBannerHeight)
        .background(Brush.horizontalGradient(
            listOf(CdsTheme.zenith.brandGradientStart, CdsTheme.zenith.brandGradientEnd),
        ))
        .padding(CdsTheme.space.x2),
)
```

`zenith` is an extension property, so call sites need to import it. If extending CDS's companion
feels like too much borrowed namespace, drop the receiver and expose a plain
`val ZenithTheme.tokens` — the mechanism is identical.

### Why resolve on read instead of on provide

`LocalZenithTokens` holds _both_ schemes and picks one inside the accessor. Resolving there rather
than in the provider is the entire trick: your tokens track whatever CDS scheme is ambient at that
point in the tree, so `CdsInvertedThemeProvider` inverts your tokens along with CDS's, at any depth,
with zero coordination between the two providers. Store a single pre-resolved `ZenithTokens` in the
`CompositionLocal` instead and inverted subtrees will render your brand colors from the wrong scheme.

### Rules for this pattern

- **Make the holder `@Immutable` with `val`s only.** `@Immutable` is a promise the Compose compiler
  trusts without verifying. A `var`, or a plain `List` field, produces stale UI that is very hard to
  trace back to the theme.
- **Use `staticCompositionLocalOf`, not `compositionLocalOf`.** Theme values change rarely; the
  static variant skips per-read tracking and invalidates the subtree on change, which is the right
  trade here and matches what CDS does internally.
- **Don't use a string-keyed map.** `Map<String, Color>` gives up compile-time safety and IDE
  completion for nothing.
- **Extend, don't fork.** Adding your own tokens is additive. If you find yourself wanting to
  _change_ what a CDS token means, that's Approach 1.

---

## Installing your theme

Wrap your content once, at the root:

```kotlin
class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            CdsThemeProvider(theme = AcmeTheme) {
                App()
            }
        }
    }
}
```

`colorScheme` defaults to the device's dark-mode setting. Pass it explicitly to drive the scheme from
your own state — an in-app appearance setting, for instance:

```kotlin
CdsThemeProvider(
    theme = AcmeTheme,
    colorScheme = if (userPrefersDark) CdsColorScheme.Dark else CdsColorScheme.Light,
) { App() }
```

**Nesting overrides one axis at a time.** Both parameters default to the enclosing provider's value,
so a nested provider changes only what you pass and inherits the rest. A bare nested
`CdsThemeProvider { }` is a no-op rather than a silent revert to `CdsDefaultTheme`:

```kotlin
CdsThemeProvider(theme = AcmeTheme) {          // Acme, system scheme
    CdsThemeProvider(colorScheme = Dark) {     // still Acme, forced dark
        PromoSection()
    }
}
```

**Inverting a subtree.** For content that must read against the opposite background — a dark tooltip
on a light screen — use `CdsInvertedThemeProvider`, which flips the scheme and keeps the theme:

```kotlin
CdsInvertedThemeProvider {
    Tooltip("Fees apply")
}
```

Reading a token with no provider anywhere above the call site throws
`IllegalStateException: No CDS theme found. Wrap your composables in CdsThemeProvider.`

---

## Previews

Wrap previews in the theme you want to see, and add one per scheme:

```kotlin
@Preview(name = "Acme light")
@Composable
private fun AcmeLightPreview() {
    CdsThemeProvider(theme = AcmeTheme, colorScheme = CdsColorScheme.Light) { MyScreen() }
}

@Preview(name = "Acme dark", uiMode = Configuration.UI_MODE_NIGHT_YES)
@Composable
private fun AcmeDarkPreview() {
    CdsThemeProvider(theme = AcmeTheme, colorScheme = CdsColorScheme.Dark) { MyScreen() }
}
```

A preview with no provider at all renders `CdsDefaultTheme` rather than crashing, honoring the
preview's `uiMode` for the scheme. That's a convenience for previewing a component in isolation — it
also means **a preview that forgot its provider looks fine and shows you the wrong theme.** If your
brand colors aren't showing up in a preview, check for a missing `CdsThemeProvider` first.

---

## Testing your theme

**Assert what you actually overrode.** Themes are values with real equality, so this is
straightforward:

```kotlin
@Test
fun `acme overrides primary color in both schemes`() {
    assertEquals(BrandLight, AcmeTheme.lightColors.bgPrimary)
    assertEquals(BrandDark, AcmeTheme.darkColors.bgPrimary)
}

@Test
fun `acme leaves typography alone`() {
    assertEquals(CdsDefaultTheme.typography, AcmeTheme.typography)
}
```

**For Approach 2, assert that nothing was inherited.** The token enums make this a loop instead of a
list you'd have to maintain by hand, and it fails when CDS adds a token you haven't assigned yet:

```kotlin
@Test
fun `nova defines every color itself`() {
    val leaked = CdsColorToken.entries.filter { token ->
        NovaTheme.lightColors[token] == CdsDefaultTheme.lightColors[token]
    }
    assertTrue("Still inheriting CDS values: ${leaked.map { it.tokenName }}", leaked.isEmpty())
}
```

Every axis has a matching `Cds*Token` enum and `operator get`, so the same loop works for space,
radius, typography, and the rest.

Two caveats on that test. It compares values, so a token you deliberately set to the same value CDS
uses (white is white) will be reported — allowlist those explicitly rather than deleting the test.
And when a `when` over one of these enums is unavoidable, include an `else` branch: entries may be
added in a minor release, and an exhaustive `when` compiled against an older release throws
`NoWhenBranchMatchedException` when it meets a new value.

**Screenshot-test both schemes.** The failure mode a unit test won't catch is a contrast pairing that
looks fine in light and disappears in dark.

---

## Pitfalls

**Overriding the spectrum does not change the semantic colors.** `CdsColors.Light` is baked from
`CdsSpectrum.Light` once, at CDS build time; it does not re-derive from your override. Because
components read only the semantic tier, `cdsTheme { lightSpectrum { blue { step60 = brand } } }`
changes nothing visible in any CDS component. Set `lightColors`/`darkColors` — and set the spectrum
too if your own code reads raw ramps.

**Check the pairing, not just the color.** Semantic tokens are used in pairs. `Button`'s primary
variant paints `bgPrimary` behind `fgInverse`, so a brand color that's lighter than CDS's blue can
leave white label text unreadable. When you override a `bg*` token, verify its `fg*` partner against
it in both schemes.

**Dark is not "the same color, dimmer."** CDS lightens `blue60` to `blue70` for `bgPrimary` in dark
mode to hold contrast against a dark background. Give your brand color the same treatment rather
than using one value for both schemes.

**There is no font-family token.** Families are an internal primitive; the 13 `TextStyle`s are the
public surface. Changing the typeface means assigning all 13 variants — see
[Overriding typography](#overriding-typography).

**Author one theme, not a light/dark pair.** Two `CdsTheme` values, one per scheme, is the shape this
API is designed to avoid: you'd duplicate every spacing and type override across both, and they'd
drift.

**Hoist your theme out of composition.** `cdsTheme { }` at a call site reallocates on every
recomposition. Value equality means the provider won't invalidate its subtree over it, so this is
waste rather than a bug — but a top-level `val` (or `remember`, if tokens depend on state) is free.

**Don't subclass `CdsTheme`.** It's final, deliberately. `@Immutable` is unverified by the compiler,
so an `open` class would let a subclass break the contract Compose relies on for skipping — and the
symptom is silently stale UI. Material 3 keeps `ColorScheme` and `Typography` final for the same
reason. To add tokens, use [Approach 3](#approach-3-add-your-own-tokens-alongside-cdss).

**`caption` is uppercased for you.** CDS's `Text` applies the `uppercase` text transform when given
`CdsFontToken.Caption`, because Compose has no `TextStyle` equivalent. If you render caption text
without CDS's `Text`, uppercase it yourself.

---

## FAQ

**Can I change how a specific component looks without re-theming globally?**
Nest a provider around it: `CdsThemeProvider(theme = specialTheme) { OneComponent() }`. Component-tier
tokens (`ButtonColors`, `ButtonMetrics`) are internal and derived from the theme, so the theme is the
supported lever.

**Can I load a theme from JSON at runtime?**
Nothing stops you: build the `CdsTheme` with `cdsTheme` once you have the values, and hold it in
state. Every token enum exposes `tokenName`, the canonical CDS key that matches the web theme's
serialized shape (`CdsTheme.space.x1_5` is `"1.5"`, so `{"space": {"1.5": 12}}` round-trips). CDS
ships no parser.

**Does my theme need to define both schemes if my app is light-only?**
Yes, in the sense that both halves exist and something must fill them. If you only override
`lightColors`, the dark half stays CDS default — which is what your users see the moment the app
respects a system dark-mode setting, or the moment anything calls
`CdsInvertedThemeProvider`. Override both.

**How do I check what my theme actually resolved to?**
Read the axes off the instance directly: `AcmeTheme.lightColors.bgPrimary`. Note the seam —
`CdsTheme.colors` on the companion is the _ambient, resolved_ set for the current scheme and needs a
composable context, while `AcmeTheme.lightColors` on an instance is one explicit scheme of one
explicit theme, readable anywhere.

**Will a CDS upgrade break my theme?**
Adding a token is a non-breaking change: your theme inherits the new value from its base. That is
also the tradeoff behind Approach 2 — see the test above for catching it.
