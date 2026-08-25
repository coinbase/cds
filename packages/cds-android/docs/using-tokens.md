# Using theme tokens

How to read CDS design tokens from your composables, and how to carry a token through your own code
— state, domain logic, your own component APIs — in a way that stays type-safe and survives a
light/dark flip.

For authoring a theme, see [Creating a custom theme](custom-themes.md). For the full list of token
names, see the [token reference](token-reference.md).

---

## Contents

- [Reading tokens in a composable](#reading-tokens-in-a-composable)
- [Reading the current color scheme](#reading-the-current-color-scheme)
- [Ambient theme vs. a specific theme](#ambient-theme-vs-a-specific-theme)
- [Reading tokens outside composition](#reading-tokens-outside-composition)
- [Carrying tokens through your own code](#carrying-tokens-through-your-own-code)
- [Passing tokens to CDS components](#passing-tokens-to-cds-components)
- [Designing your own component APIs](#designing-your-own-component-apis)
- [Iterating a scale](#iterating-a-scale)
- [Performance notes](#performance-notes)
- [Quick reference](#quick-reference)

---

## Reading tokens in a composable

Every token is reachable through an accessor on the `CdsTheme` companion. There is no parameter to
thread and nothing to inject — the accessors resolve against the nearest `CdsThemeProvider` above the
call site.

Underneath, those accessors read a `CompositionLocal` (`LocalCdsTheme`) that `CdsThemeProvider`
installs. If you know the web CDS, this is the same shape as a React context paired with a
`useTheme()` hook: provide once at the root, read at any depth, no prop-drilling in between. Two
differences are worth knowing if that's your mental model. These are ordinary property reads, not
hooks, so there are no ordering rules — reading a token inside an `if` or `when` branch is fine. And
they resolve _per call site_ by walking up the composition tree, so nesting a `CdsThemeProvider`
re-themes that subtree only, the way nesting a context provider would.

```kotlin
@Composable
fun PriceCard(label: String, price: String) {
    Column(
        modifier = Modifier
            .clip(RoundedCornerShape(CdsTheme.borderRadius.radius400))
            .background(CdsTheme.colors.bgSecondary)
            .padding(CdsTheme.space.x2),
        verticalArrangement = Arrangement.spacedBy(CdsTheme.space.x0_5),
    ) {
        Text(text = label, font = CdsFontToken.Label2, color = CdsTheme.colors.fgMuted)
        Text(text = price, font = CdsFontToken.Title3)
    }
}
```

The full set of accessors:

| Accessor                      | Returns                 | Example read                                  |
| ----------------------------- | ----------------------- | --------------------------------------------- |
| `CdsTheme.colors`             | `CdsColors`             | `CdsTheme.colors.bgPrimary`                   |
| `CdsTheme.spectrum`           | `CdsSpectrum`           | `CdsTheme.spectrum.blue.step60`               |
| `CdsTheme.illustrationColors` | `CdsIllustrationColors` | `CdsTheme.illustrationColors.accent1`         |
| `CdsTheme.space`              | `CdsSpace`              | `CdsTheme.space.x2`                           |
| `CdsTheme.borderWidth`        | `CdsBorderWidth`        | `CdsTheme.borderWidth.borderWidth100`         |
| `CdsTheme.borderRadius`       | `CdsBorderRadius`       | `CdsTheme.borderRadius.radius400`             |
| `CdsTheme.iconSize`           | `CdsIconSize`           | `CdsTheme.iconSize.m`                         |
| `CdsTheme.avatarSize`         | `CdsAvatarSize`         | `CdsTheme.avatarSize.xl`                      |
| `CdsTheme.controlSize`        | `CdsControlSize`        | `CdsTheme.controlSize.switchWidth`            |
| `CdsTheme.typography`         | `CdsTypography`         | `CdsTheme.typography.body`                    |
| `CdsTheme.shadows`            | `CdsShadows`            | `CdsTheme.shadows.elevation1.blurRadius`      |
| `CdsTheme.colorScheme`        | `CdsColorScheme`        | `CdsTheme.colorScheme == CdsColorScheme.Dark` |

Four properties of these reads are worth knowing.

**They're already scheme-resolved.** `CdsTheme.colors` is the color set for whichever scheme is
ambient — there is no `.light`/`.dark` to pick from and no `if (isDark)` to write. Flipping the
scheme changes what these return, everywhere, with no work at the call site.

**Read at the leaf; don't thread values through parameters.** Passing `bgColor: Color` down three
composables is the pattern the token layer exists to eliminate. Read `CdsTheme.colors.bg` where you
paint it. The one exception is a genuinely configurable color — a caller-chosen accent — which is a
parameter like any other.

**They work in default parameter expressions.** The accessors are `@ReadOnlyComposable`, and default
expressions on a composable parameter are evaluated in the composable's own scope, so this works and
is what CDS's own components do:

```kotlin
@Composable
fun Badge(
    text: String,
    color: Color = CdsTheme.colors.fgMuted,   // resolves per call site, not once at class-load
) { /* ... */ }
```

**They require a provider.** Reading a token with no `CdsThemeProvider` anywhere above throws
`IllegalStateException: No CDS theme found.` The exception is `@Preview`, where a missing provider
falls back to `CdsDefaultTheme` rather than crashing.

## Reading the current color scheme

`CdsTheme.colorScheme` tells you which scheme resolved. Reach for it when you need an asset the token
layer doesn't cover — a raster logo, a Lottie file, a map style:

```kotlin
@Composable
fun BrandLogo() {
    val logo = when (CdsTheme.colorScheme) {
        CdsColorScheme.Light -> R.drawable.logo_light
        CdsColorScheme.Dark -> R.drawable.logo_dark
    }
    Image(painterResource(logo), contentDescription = "Acme")
}
```

Note what this is _not_ for. `if (CdsTheme.colorScheme == Dark) Color.White else Color.Black` is a
token that should live in the theme — `fg` already is that token. Branching on the scheme to pick a
color means the value is missing from your theme, and it won't respond to
`CdsInvertedThemeProvider` the way a real token would.

Prefer `CdsTheme.colorScheme` over Compose's `isSystemInDarkTheme()` inside your UI. The former is
what actually got provided — including in an inverted subtree, or when your app has its own
appearance setting; the latter is only the device setting, and the two disagree exactly when it
matters.

## Ambient theme vs. a specific theme

Two things read similarly and mean different things:

```kotlin
CdsTheme.colors.bgPrimary   // ambient + resolved: needs composition, follows the current scheme
AcmeTheme.lightColors.bgPrimary   // one explicit scheme of one explicit theme: readable anywhere
```

Use the first in UI. Use the second in tests, tooling, and anywhere you need a value without a
composition — it's a plain property read on a `CdsTheme` instance, with no Compose runtime involved.

## Reading tokens outside composition

Custom `Modifier`s draw outside composition, so the accessors aren't available. That's why
`LocalCdsTheme` is public: read it from a `CompositionLocalConsumerModifierNode` with
`currentValueOf`.

```kotlin
private class ThemedUnderlineNode : DrawModifierNode, CompositionLocalConsumerModifierNode,
    Modifier.Node() {
    override fun ContentDrawScope.draw() {
        drawContent()
        val theme = currentValueOf(LocalCdsTheme) ?: return
        drawLine(
            color = theme.colors.bgLinePrimary,
            start = Offset(0f, size.height),
            end = Offset(size.width, size.height),
            strokeWidth = theme.borderWidth.borderWidth200.toPx(),
        )
    }
}
```

`LocalCdsTheme.current` is `CdsTheme.Resolved?` — nullable, because there may be no provider — and it
exposes the same axes as the companion accessors (`theme.colors`, `theme.space`, plus
`theme.colorScheme` and `theme.theme` for the unresolved instance). It is read-only by design; install
a theme with `CdsThemeProvider`, never by providing this local yourself.

Reading it in a draw or layout phase like this also means a theme change repaints without
recomposing, which is the reason to use a node instead of hoisting the value into composition.

## Carrying tokens through your own code

This is the "I want a variable holding a CDS color that I can pass around" case. It has a good answer
and a tempting wrong one, and the difference only shows up later.

Every scale has **two representations**:

|           | Type                       | Needs composition? | Scheme-specific? | Use for                                                          |
| --------- | -------------------------- | ------------------ | ---------------- | ---------------------------------------------------------------- |
| **Name**  | `CdsColorToken.FgPositive` | No                 | No               | State, domain logic, your own APIs, anything stored or persisted |
| **Value** | `Color(0xFF098551)`        | Yes, to obtain     | Yes              | The final read, at the point you paint                           |

The rule that falls out: **pass names around, resolve to values at the edge.** A resolved `Color` is a
snapshot of one scheme at one moment. Capture it in state and it goes stale the instant the user flips
dark mode or your content lands inside `CdsInvertedThemeProvider` — silently, since a stale `Color` is
still a perfectly valid `Color`.

Token names are plain enums: no Compose dependency at the definition site, `when`-able, comparable,
unit-testable, and `tokenName` gives you a stable string for logs or persistence.

```kotlin
// Domain -> token. A pure function: no composition, no Compose runtime, trivially unit-testable.
fun statusColorToken(status: OrderStatus): CdsColorToken = when (status) {
    OrderStatus.Filled -> CdsColorToken.FgPositive
    OrderStatus.Pending -> CdsColorToken.FgMuted
    OrderStatus.Failed -> CdsColorToken.FgNegative
}
```

```kotlin
// UI state carries the name, not the color.
data class OrderRowState(
    val label: String,
    val amount: String,
    val amountColor: CdsColorToken,
)
```

```kotlin
// Resolve at the point of use, with the indexed accessor every scale provides.
@Composable
fun OrderRow(state: OrderRowState) {
    Text(
        text = state.amount,
        font = CdsFontToken.Headline,
        color = CdsTheme.colors[state.amountColor],
    )
}
```

`CdsTheme.colors[token]` is the load-bearing piece: every axis has an `operator get` taking its token
enum, so a name resolves against the ambient theme in one expression.

```kotlin
CdsTheme.colors[CdsColorToken.FgPositive]      // Color
CdsTheme.space[CdsSpaceToken.X2]               // Dp
CdsTheme.borderRadius[CdsBorderRadiusToken.Radius400]  // Dp
CdsTheme.typography[CdsFontToken.Headline]     // TextStyle
CdsTheme.spectrum[CdsSpectrumHueToken.Blue][CdsColorRampToken.Step60]  // Color
```

You can also resolve against an explicit `CdsColors` instance with no composition at all, which is
how to keep resolution logic in a plain testable function:

```kotlin
fun amountColor(colors: CdsColors, status: OrderStatus): Color = colors[statusColorToken(status)]

// In a test:
assertEquals(
    CdsDefaultTheme.lightColors.fgNegative,
    amountColor(CdsDefaultTheme.lightColors, OrderStatus.Failed),
)
```

**One caveat on `when` over a token enum.** Entries may be added in a minor release, so these enums
aren't safe to match exhaustively: an exhaustive `when` stops compiling when a rung is added, and code
compiled against the older release throws `NoWhenBranchMatchedException` if it ever receives the new
value. Include an `else`. Matching over _your_ enum to produce a token — as in `statusColorToken`
above — has no such problem, and is the direction to prefer.

**What not to do:**

```kotlin
// Wrong: a Color captured in a ViewModel is frozen to whichever scheme was ambient when it was read
// -- if it could be read there at all, which it can't without a composition.
class OrderViewModel : ViewModel() {
    val amountColor: Color = /* ... */
}

// Wrong: persisting a resolved value defeats theming entirely.
prefs.putInt("accent", CdsTheme.colors.bgPrimary.toArgb())

// Right: persist the name.
prefs.putString("accent", CdsColorToken.BgPrimary.tokenName)
```

## Passing tokens to CDS components

CDS component parameters come in three shapes, and knowing which is which tells you what to hold in
your own code.

| Parameter shape                                        | Example                                                        | What to store                                                                                        |
| ------------------------------------------------------ | -------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| **Token enum** — a choice among theme tokens           | `Text(font = CdsFontToken.Headline)`                           | The token enum. Pass it straight through.                                                            |
| **Component enum** — a choice scoped to that component | `Button(variant = ButtonVariant.Primary, size = ButtonSize.M)` | The component enum. Colors are derived from the theme internally; there's no color parameter to set. |
| **Resolved value** — an arbitrary value is legitimate  | `Text(color = CdsTheme.colors.fgMuted)`                        | A token name, resolved at the call site.                                                             |

So a variable typed `CdsFontToken` or `ButtonVariant` passes directly into a component and stays
type-safe end to end:

```kotlin
val headingFont: CdsFontToken = CdsFontToken.Title3
val confirmVariant: ButtonVariant = if (isDestructive) ButtonVariant.Negative else ButtonVariant.Primary

Text(text = "Confirm order", font = headingFont)
Button(text = "Confirm", onClick = ::confirm, variant = confirmVariant)
```

A variable typed `CdsColorToken` needs one resolution step at the boundary, because `Text.color`
takes a `Color`:

```kotlin
Text(text = amount, color = CdsTheme.colors[amountToken])
```

Some slot parameters hand you a resolved value rather than asking for one — `Button`'s
`leadingIcon: @Composable (tint: Color) -> Unit` passes the tint the button already computed for its
variant, so your icon matches without your having to work out which `fg*` token that variant uses:

```kotlin
Button(
    text = "Add funds",
    onClick = ::addFunds,
    variant = ButtonVariant.Primary,
    leadingIcon = { tint -> Icon(painterResource(R.drawable.ic_plus), null, tint = tint) },
)
```

**This convention is stable across future components.** As more components land, expect the same
three shapes: token enums where the parameter names a token, component enums where the choice is
component-scoped, and `Color`/`Dp` only where an arbitrary value is meaningful. State modeled as
token enums keeps working against any of them; state modeled as resolved `Color`s has to be unwound
first.

## Designing your own component APIs

Your own components sit next to CDS's, so following the same three shapes keeps the boundary
predictable — and means a component you write today drops in beside a CDS component that lands later.

**Take a token enum when the parameter names a token.** The component resolves it internally, so
callers can't pass a color that isn't in the theme, and the value stays correct across scheme flips:

```kotlin
@Composable
fun StatusPill(
    text: String,
    color: CdsColorToken = CdsColorToken.FgMuted,   // a name, not a Color
) {
    Box(
        Modifier
            .clip(RoundedCornerShape(CdsTheme.borderRadius.radius1000))
            .background(CdsTheme.colors[color].copy(alpha = 0.12f))
            .padding(horizontal = CdsTheme.space.x1, vertical = CdsTheme.space.x0_5),
    ) {
        Text(text = text, font = CdsFontToken.Label1, color = CdsTheme.colors[color])
    }
}
```

`StatusPill(text = "Filled", color = statusColorToken(status))` then carries a token from domain logic
to pixels without ever materializing a `Color` in between.

**Take your own enum when the choice is component-scoped.** If callers should pick an _intent_ rather
than a token — the way `ButtonVariant.Negative` means "this is destructive," not "paint it red" — model
that intent and map it to tokens inside. It keeps the token mapping in one place, so a design change
is one edit rather than a search across call sites.

```kotlin
enum class PillTone { Neutral, Positive, Negative }

private fun PillTone.token(): CdsColorToken = when (this) {
    PillTone.Neutral -> CdsColorToken.FgMuted
    PillTone.Positive -> CdsColorToken.FgPositive
    PillTone.Negative -> CdsColorToken.FgNegative
}
```

**Take a resolved `Color` or `Dp` only when an arbitrary value is legitimate** — a caller-supplied
brand accent, a measured width. Defaulting the parameter from the theme
(`color: Color = CdsTheme.colors.fgMuted`) gives you a themed default plus an escape hatch, which is
what CDS's `Text` does.

**Don't add a `Boolean` for the scheme.** A `isDark: Boolean` parameter duplicates state the theme
already carries and goes wrong the moment the component appears inside `CdsInvertedThemeProvider`.
Read `CdsTheme.colorScheme` if you truly need it.

## Iterating a scale

`Cds*Token.entries` makes a scale enumerable, which is what you want for a palette screen, a debug
overlay, or a test that walks every token:

```kotlin
@Composable
fun ColorSwatches() {
    val colors = CdsTheme.colors
    Column {
        CdsColorToken.entries.forEach { token ->
            Row(verticalAlignment = Alignment.CenterVertically) {
                Box(Modifier.size(CdsTheme.iconSize.l).background(colors[token]))
                Text(text = token.tokenName, font = CdsFontToken.Label2)
            }
        }
    }
}
```

`tokenName` is the canonical CDS spelling (`fgMuted`, `1.5`, `title1`), shared with the web theme —
use it for labels and for parsing or emitting serialized themes. Use `name` when you want the Kotlin
identifier.

## Performance notes

**Reads are cheap.** The theme lives in a single `staticCompositionLocalOf`, so a read is a lookup
with no per-read subscription tracking. Reading a dozen tokens in one composable costs nothing worth
optimizing, and hoisting `val colors = CdsTheme.colors` into a local is for readability, not speed.

**Providers are not cheap — install few.** The flip side of `static` is that changing a provided value
invalidates that provider's whole subtree rather than just the readers. One `CdsThemeProvider` at the
app root plus the occasional deliberate nesting is the intended shape; a provider per row in a
`LazyColumn` is not.

**Themes compare by value.** Every token type hand-writes `equals`/`hashCode`, and
`CdsThemeProvider` keys its `remember` on them, so passing an equal theme doesn't rebuild anything.
That's what makes an inline `cdsTheme { }` at a call site merely wasteful rather than a recomposition
bug — though a top-level `val` is still the right home for a theme.

**`remember` derived values, keyed on the token.** If you compute something non-trivial from a token
— a gradient, a `Brush`, a blended color — key it so it recomputes on a theme or scheme change:

```kotlin
val brush = CdsTheme.colors.bgPrimary.let { primary ->
    remember(primary) { Brush.verticalGradient(listOf(primary, primary.copy(alpha = 0f))) }
}
```

## Quick reference

| I want to…                          | Do this                                                                                    |
| ----------------------------------- | ------------------------------------------------------------------------------------------ |
| Paint a themed color                | `Modifier.background(CdsTheme.colors.bg)`                                                  |
| Pad or space something              | `Modifier.padding(CdsTheme.space.x2)`, `Arrangement.spacedBy(CdsTheme.space.x1)`           |
| Round a corner                      | `RoundedCornerShape(CdsTheme.borderRadius.radius400)`                                      |
| Style text                          | `Text(font = CdsFontToken.Headline)` — family, size, weight, and line height come as a set |
| Know if it's dark                   | `CdsTheme.colorScheme == CdsColorScheme.Dark` — for assets, not for picking colors         |
| Hold a color in state               | Store `CdsColorToken`; resolve with `CdsTheme.colors[token]`                               |
| Resolve a token without composition | `CdsDefaultTheme.lightColors[token]`, or pass a `CdsColors` in                             |
| Read a token from a `Modifier.Node` | `currentValueOf(LocalCdsTheme)`                                                            |
| Enumerate a scale                   | `CdsColorToken.entries`, `CdsSpaceToken.entries`, …                                        |
| Invert a subtree                    | `CdsInvertedThemeProvider { }`                                                             |
