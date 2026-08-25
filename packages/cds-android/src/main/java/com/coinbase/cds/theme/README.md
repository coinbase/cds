# `com.coinbase.cds.theme`

The CDS token layer for Jetpack Compose. One `@Immutable` holder behind a single
`staticCompositionLocalOf`, read through accessors on the `CdsTheme` companion.

```kotlin
CdsThemeProvider(theme = CdsDefaultTheme, colorScheme = CdsColorScheme.Light) {
    Box(
        Modifier
            .background(CdsTheme.colors.bg)
            .padding(CdsTheme.space.x2),
    ) { /* ... */ }
}
```

## Vocabulary

"Token" gets used for at least three different things. In this package:

| Term                    | Meaning                                                                                                                                                | Example                                                     |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------- |
| **Design token**        | A name/value pair.                                                                                                                                     | `bgPrimary` = `Color(0xFF0052FF)`                           |
| **Token schema**        | The set of valid names. In TypeScript this is the `ThemeVars` namespace; here it's the property names on the token classes plus the `Cds*Token` enums. | `CdsColorToken`                                             |
| **Theme**               | One complete set of values for that schema.                                                                                                            | `CdsDefaultTheme`                                           |
| **Color scheme** (mode) | Light or dark — a selection _within_ a theme, not a theme of its own.                                                                                  | `CdsColorScheme.Dark`                                       |
| **Primitive tier**      | Raw, context-free values.                                                                                                                              | `CdsSpectrum`, `CdsSpace`, `CdsBorderRadius`                |
| **Semantic tier**       | Intent-named, referencing primitives.                                                                                                                  | `CdsColors` (`bgPrimary` → `blue.step60`)                   |
| **Component tier**      | Scoped to one component.                                                                                                                               | `ButtonColors`, `ButtonMetrics`                             |
| **Composite token**     | One token whose value is a bundle of sub-values.                                                                                                       | `CdsTypography.body` (family + size + weight + line height) |

Composite tokens are the concept the web theme has no name for, and the reason its
`fontFamily`/`fontSize`/`fontWeight`/`lineHeight` maps are all keyed by the same 13 role names.

Naming conventions that follow from this:

- **Container types are plural, item types singular.** `CdsColors`, `CdsShadows`,
  `CdsIllustrationColors` hold many; `CdsShadow` is one shadow and `CdsColorRamp` is one hue's ramp.
  `CdsSpace` stays singular as a mass noun.
- **Accessor properties are plural**, matching every system surveyed (`JetsnackTheme.colors`,
  `BpkTheme.colors`, `MaterialTheme.colorScheme`): `CdsTheme.colors`, `CdsTheme.shadows`.
- **Serialized token keys stay identical to TypeScript** via `tokenName`. Property ergonomics and
  cross-platform token parity are separate concerns, so `CdsTheme.space.x1_5` carries
  `tokenName == "1.5"` and a serialized theme round-trips against the web shape:
  `{"space": {"1.5": 12}}`.

## Rung naming

`space` rungs are multiples of an 8dp base, so they follow the TypeScript keys with an `x` prefix
(Kotlin identifiers can't start with a digit) and `_` for the decimal point: `x0`, `x0_25`, `x0_5`,
`x0_75`, `x1`, `x1_5`, `x2`, `x3` … `x10`.

`borderRadius` and `borderWidth` rungs are abstract steps rather than multipliers, so they take the
TypeScript keys directly: `radius0`, `radius100` … `radius1000`; `borderWidth0`, `borderWidth100` …
`borderWidth500`.

Rungs are deliberately **not** named for the dp values they resolve to. A name that encodes a value
is only correct if the value can't be re-themed, which defeats the purpose of a token — the web
`coinbaseDenseTheme` remaps token `'2'` from 16px to 12px, and this repo's own `AcmeTheme` shifts
every rung up one step. A property named `space16` would return 16dp in only one of the three themes
that exist today.

Use `tokenName` for the upstream key and `name` for human-readable labels.

## Token enums are not exhaustively matchable

Every scale has a `Cds*Token` enum with a matching `operator get`, which recovers the enumerability
TypeScript object keys give the web theme for free — that's what lets the theme gallery iterate a
scale without a hand-maintained list.

The one cost lands on external consumers: **entries may be added in a minor release.** An exhaustive
`when (token)` over one of these enums stops compiling when a rung is added, and code compiled
against the older jar throws `NoWhenBranchMatchedException` if it ever receives the new value.
Include an `else` branch.

## Authoring a theme

This section covers the _why_. The consumer-facing how-to, with worked examples for each approach,
is [`cds/docs/custom-themes.md`](../../../../../../../docs/custom-themes.md).

`CdsTheme` and every token type has an `internal` constructor. Build one with the `cdsTheme` DSL:

```kotlin
val acmeTheme = cdsTheme {
    id = "acme"
    lightColors { fgPrimary = brandLight; bgPrimary = brandLight }
    darkColors { fgPrimary = brandDark; bgPrimary = brandDark }
    space { x2 = 24.dp }
}
```

The reason is ABI evolution. A public constructor — or `copy()` on a `data class` — compiles to a
method with one parameter per token plus a synthetic `copy$default` carrying a bitmask, so adding a
token changes the signature and anything compiled against the old jar hits `NoSuchMethodError`.
`componentN()` is a second hazard: inserting rather than appending a property silently changes the
meaning of every destructuring declaration. Dropping `data class` and hand-writing `copy()` does not
help, because the default-argument encoding is identical either way — the evolvability has to come
from the construction style.

With a builder, adding a token adds one field: a pure addition that touches no existing signature
and shows up as a one-line diff in `cds/api/cds.api`.

Every token type hand-writes `equals`/`hashCode`. That's load-bearing, not politeness:
`CdsThemeProvider` calls `remember(theme, colorScheme)`, which keys on equality, so with identity
equality a theme built inline at a call site would produce a new resolved theme — and re-invalidate
the whole subtree — on every recomposition.

## Adding your own tokens

CDS ships no mechanism for this, on purpose. Re-theming a token CDS _defines_ works through
`cdsTheme` above, and CDS components pick the new value up because `Button` reads
`CdsTheme.space.x2`. But a token CDS never defined — `brandGradientStart` — can only ever be read by
your own code, because no CDS component can know the name exists. So `:cds` has no reason to store,
resolve, or validate it, and the right amount of API surface is none.

Own a parallel CompositionLocal holding both scheme variants, and resolve at _read_ time against the
ambient CDS scheme:

```kotlin
@Immutable
data class AcmeTokens(val brandGradientStart: Color, val promoBannerHeight: Dp)

@Immutable
data class AcmeTokenSet(val light: AcmeTokens, val dark: AcmeTokens)

private val LocalAcmeTokens = staticCompositionLocalOf { AcmeDefaultTokens }

val CdsTheme.Companion.acme: AcmeTokens
    @Composable @ReadOnlyComposable get() {
        val set = LocalAcmeTokens.current
        return if (CdsTheme.colorScheme == CdsColorScheme.Light) set.light else set.dark
    }
```

Call sites then read `CdsTheme.acme.brandGradientStart` right beside `CdsTheme.colors.bgPrimary`.

Resolving on read rather than on provide is the whole trick: the tokens track whatever CDS scheme is
ambient at that point in the tree, so `CdsInvertedThemeProvider` flips them correctly at arbitrary
depth with no coordination between the two providers. This is also the pattern Wire ships in
production as `MaterialTheme.wireDimensions`. Avoid a string-keyed map — it gives up type safety for
nothing.

Subclassing `CdsTheme` is not supported, and the reason is stability rather than taste. `@Immutable`
is a contract the Compose compiler trusts _without verifying_; making the class `open` would hand
that contract to subclasses, so a subclass adding a `var` or holding a plain `List` produces a type
Compose still treats as immutable when it isn't. The symptom is a skipped recomposition and stale
UI — silent, and hard to trace back to the theme. This is why Material 3 keeps `ColorScheme`,
`Typography`, and `Shapes` final.

## Deprecation policy

The CDS monorepo convention is `@deprecated` plus `@deprecationExpectedRemoval vN`. The Kotlin
equivalents:

| CDS (TypeScript)                     | Kotlin                                           |
| ------------------------------------ | ------------------------------------------------ |
| `@deprecated Use X instead`          | `@Deprecated("Use X instead", ReplaceWith("X"))` |
| Soft deprecation, still works        | `DeprecationLevel.WARNING`                       |
| Removal announced for next major     | `DeprecationLevel.ERROR`                         |
| Removed from source, retained in ABI | `DeprecationLevel.HIDDEN`                        |

Anything annotated `@ExperimentalCdsApi` is exempt: it may change or disappear in any release.

## Public API surface

Anything `:cds` exposes is a contract, whether or not it was meant as one.
[Hyrum's Law](https://www.hyrumslaw.com/) is why: with enough consumers, every observable behavior
ends up depended on regardless of what the documentation promises. A declaration that goes public by
accident is therefore indistinguishable in practice from one that was promised, and can't be taken
back without breaking somebody.

So the goal is to expose as little as possible, as deliberately as possible. What stays `internal`
stays free to change — which is why the token types keep `internal` constructors and are authored
through the builder in `ThemeBuilder.kt`.

`explicitApi()` is the guardrail currently switched on: it fails the build on anything public by
default rather than by decision. It says nothing about declarations that are already public and
change shape, which is the failure mode that surfaces as a `NoSuchMethodError` in a consumer's app
rather than a compile error here. ABI snapshot tooling and custom lint rules are the usual ways to
cover that; neither is set up here, and both are worth weighing before the first stable publish.

## Toolchain floors

Because `:cds` declares the Compose artifacts with `api(...)`, it publishes a version _constraint_
and not merely a dependency. Three things are pinned in `cds/build.gradle.kts` for that reason: the
minimum Compose BOM, an explicit `jvmTarget`, and a conservative `apiVersion`/`languageVersion` so
the published metadata stays readable to compilers older than the one that built it. `compileSdk` is
kept as low as will build, because AGP records it in the AAR metadata and hard-fails any consumer
compiling against a lower API.
