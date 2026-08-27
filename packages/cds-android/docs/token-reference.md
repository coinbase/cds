# Theme token reference

Every token axis in `CdsTheme`, the `cdsTheme { }` block that overrides it, and the `cds-default`
values. Use this as a checklist when authoring a theme — see
[Creating a custom theme](custom-themes.md) for how, and [Using theme tokens](using-tokens.md) for
reading these from a composable.

Values here describe the current release. Rungs may be **added** in a minor release; when that
happens, a theme built with `cdsTheme` inherits the new value from its base.

## Axes at a glance

| Axis                                        | Type                    | Builder block(s)                                            | Per scheme? | Rungs              |
| ------------------------------------------- | ----------------------- | ----------------------------------------------------------- | ----------- | ------------------ |
| [Spectrum](#spectrum)                       | `CdsSpectrum`           | `lightSpectrum { }`, `darkSpectrum { }`                     | Yes         | 11 hues × 13 steps |
| [Colors](#colors)                           | `CdsColors`             | `lightColors { }`, `darkColors { }`                         | Yes         | 42                 |
| [Illustration colors](#illustration-colors) | `CdsIllustrationColors` | `lightIllustrationColors { }`, `darkIllustrationColors { }` | Yes         | 15                 |
| [Space](#space)                             | `CdsSpace`              | `space { }`                                                 | No          | 15                 |
| [Border width](#border-width)               | `CdsBorderWidth`        | `borderWidth { }`                                           | No          | 6                  |
| [Border radius](#border-radius)             | `CdsBorderRadius`       | `borderRadius { }`                                          | No          | 11                 |
| [Icon size](#icon-size)                     | `CdsIconSize`           | `iconSize { }`                                              | No          | 4                  |
| [Avatar size](#avatar-size)                 | `CdsAvatarSize`         | `avatarSize { }`                                            | No          | 6                  |
| [Control size](#control-size)               | `CdsControlSize`        | `controlSize { }`                                           | No          | 6                  |
| [Typography](#typography)                   | `CdsTypography`         | `typography { }`                                            | No          | 13                 |
| [Shadows](#shadows)                         | `CdsShadows`            | `shadows { }`                                               | No          | 2 × 4 fields       |

Plus `id`, a stable slug identifying the theme (`"cds-default"`).

Every axis also has a `Cds*Token` enum and an `operator get`, so you can resolve a token by value
(`CdsTheme.space[CdsSpaceToken.X2]`) and iterate a whole scale (`CdsSpaceToken.entries`). Each enum
entry carries `tokenName`, the canonical CDS key shared with the web theme — useful for labels and
for parsing serialized themes.

---

## Spectrum

The primitive color tier: raw tonal ramps, context-free. **CDS components do not read this tier** —
they read [Colors](#colors). Override the spectrum for your own code's benefit, and because a
coherent semantic tier is easier to author on top of one.

Hues: `blue`, `green`, `orange`, `gray`, `indigo`, `pink`, `purple`, `red`, `teal`, `yellow`,
`chartreuse`.

Steps, per hue: `step0`, `step5`, `step10`, `step15`, `step20`, `step30`, `step40`, `step50`,
`step60`, `step70`, `step80`, `step90`, `step100`.

`step0` is the lightest end in the light scheme and the darkest in the dark scheme — a ramp inverts
between schemes rather than being reused. Default hex values are in `Spectrum.kt`
(`CdsSpectrum.Light` / `CdsSpectrum.Dark`), or browse them in the theme gallery.

```kotlin
lightSpectrum {
    blue { step60 = Color(0xFF1A5CFF) }
}
```

## Colors

The semantic tier: intent-named values that CDS components actually read. The "default" column gives
the spectrum step each name maps to in `cds-default`, which is the most useful thing to know when
picking your own value.

| Token                 | Light               | Dark                |
| --------------------- | ------------------- | ------------------- |
| `fg`                  | `gray.step100`      | `gray.step100`      |
| `fgMuted`             | `gray.step60`       | `gray.step60`       |
| `fgInverse`           | `gray.step0`        | `gray.step0`        |
| `fgPrimary`           | `blue.step60`       | `blue.step70`       |
| `fgWarning`           | `orange.step60`     | `orange.step70`     |
| `fgPositive`          | `green.step60`      | `green.step60`      |
| `fgNegative`          | `red.step60`        | `red.step60`        |
| `bg`                  | `gray.step0`        | `gray.step0`        |
| `bgAlternate`         | `gray.step10`       | `gray.step5`        |
| `bgInverse`           | `gray.step100`      | `gray.step100`      |
| `bgOverlay`           | `gray.step80` @ 33% | `gray.step0` @ 33%  |
| `bgPrimary`           | `blue.step60`       | `blue.step70`       |
| `bgPrimaryWash`       | `blue.step0`        | `blue.step0`        |
| `bgSecondary`         | `gray.step10`       | `gray.step15`       |
| `bgTertiary`          | `gray.step20`       | `gray.step20`       |
| `bgSecondaryWash`     | `gray.step5`        | `gray.step5`        |
| `bgNegative`          | `red.step60`        | `red.step60`        |
| `bgNegativeWash`      | `red.step0`         | `red.step0`         |
| `bgPositive`          | `green.step60`      | `green.step60`      |
| `bgPositiveWash`      | `green.step0`       | `green.step0`       |
| `bgWarning`           | `orange.step60`     | `orange.step60`     |
| `bgWarningWash`       | `orange.step0`      | `orange.step0`      |
| `bgLine`              | `gray.step60` @ 20% | `gray.step60` @ 20% |
| `bgLineHeavy`         | `gray.step60` @ 66% | `gray.step60` @ 66% |
| `bgLineInverse`       | `gray.step0`        | `gray.step0`        |
| `bgLinePrimary`       | `blue.step60`       | `blue.step70`       |
| `bgLinePrimarySubtle` | `blue.step20`       | `blue.step20`       |
| `bgElevation1`        | `gray.step0`        | `gray.step5`        |
| `bgElevation2`        | `gray.step0`        | `gray.step10`       |
| `accentSubtleGreen`   | `green.step0`       | `green.step0`       |
| `accentBoldGreen`     | `green.step60`      | `green.step60`      |
| `accentSubtleBlue`    | `blue.step0`        | `blue.step0`        |
| `accentBoldBlue`      | `blue.step60`       | `blue.step60`       |
| `accentSubtlePurple`  | `purple.step0`      | `purple.step0`      |
| `accentBoldPurple`    | `purple.step80`     | `purple.step80`     |
| `accentSubtleYellow`  | `yellow.step0`      | `yellow.step0`      |
| `accentBoldYellow`    | `yellow.step30`     | `yellow.step30`     |
| `accentSubtleRed`     | `red.step0`         | `red.step0`         |
| `accentBoldRed`       | `red.step60`        | `red.step60`        |
| `accentSubtleGray`    | `gray.step10`       | `gray.step10`       |
| `accentBoldGray`      | `gray.step80`       | `gray.step80`       |
| `transparent`         | `Color.Transparent` | `Color.Transparent` |

Because a ramp inverts between schemes, most rows name the same step in both columns and still
resolve to different colors. The rows where the _step_ differs (`fgPrimary`, `bgPrimary`,
`bgSecondary`, `bgElevation1/2`) are the deliberate contrast corrections; mirror them when you
override those tokens.

**Pairings to preserve.** These tokens are consumed together, so verify them against each other:

| Surface            | Container           | Content                                          |
| ------------------ | ------------------- | ------------------------------------------------ |
| Primary button     | `bgPrimary`         | `fgInverse`                                      |
| Secondary button   | `bgSecondary`       | `fg`                                             |
| Tertiary button    | `bgTertiary`        | `fg`                                             |
| Positive button    | `bgPositive`        | `fgInverse`                                      |
| Negative button    | `bgNegative`        | `fgInverse`                                      |
| Transparent button | `Color.Transparent` | `fgPrimary` / `fg` / `fgPositive` / `fgNegative` |
| Screen background  | `bg`                | `fg`, `fgMuted`                                  |

## Illustration colors

A separate palette for illustrations and spot art, which have different needs from UI chrome.

`primary`, `black`, `white`, `gray`, `gray2`, `gray3`, `gray4`, `positive`, `negative`, `accent1`,
`accent2`, `accent3`, `accent4`, `invert`, `invert2`.

## Space

An 8dp base unit. Rung names are the multiplier (`x` prefix because Kotlin identifiers can't start
with a digit, `_` for the decimal point), deliberately _not_ the dp value — a denser theme is free to
remap `x2` from 16dp to 12dp.

| Token   | `tokenName` | Default |
| ------- | ----------- | ------- |
| `x0`    | `0`         | 0dp     |
| `x0_25` | `0.25`      | 2dp     |
| `x0_5`  | `0.5`       | 4dp     |
| `x0_75` | `0.75`      | 6dp     |
| `x1`    | `1`         | 8dp     |
| `x1_5`  | `1.5`       | 12dp    |
| `x2`    | `2`         | 16dp    |
| `x3`    | `3`         | 24dp    |
| `x4`    | `4`         | 32dp    |
| `x5`    | `5`         | 40dp    |
| `x6`    | `6`         | 48dp    |
| `x7`    | `7`         | 56dp    |
| `x8`    | `8`         | 64dp    |
| `x9`    | `9`         | 72dp    |
| `x10`   | `10`        | 80dp    |

## Border width

Abstract rungs, not multipliers, so the numeric suffix is the CDS scale key.

| Token            | Default |
| ---------------- | ------- |
| `borderWidth0`   | 0dp     |
| `borderWidth100` | 1dp     |
| `borderWidth200` | 2dp     |
| `borderWidth300` | 4dp     |
| `borderWidth400` | 6dp     |
| `borderWidth500` | 8dp     |

## Border radius

| Token        | Default                                                                     |
| ------------ | --------------------------------------------------------------------------- |
| `radius0`    | 0dp                                                                         |
| `radius100`  | 4dp                                                                         |
| `radius200`  | 8dp                                                                         |
| `radius300`  | 12dp                                                                        |
| `radius400`  | 16dp                                                                        |
| `radius500`  | 24dp                                                                        |
| `radius600`  | 32dp                                                                        |
| `radius700`  | 40dp                                                                        |
| `radius800`  | 48dp                                                                        |
| `radius900`  | 56dp                                                                        |
| `radius1000` | 100000dp — the pill rung, oversized so it renders fully rounded at any size |

Keep `radius1000` absurd if you override the scale. A "large but plausible" value stops looking like
a pill as soon as a component grows past it.

## Icon size

| Token | Default |
| ----- | ------- |
| `xs`  | 12dp    |
| `s`   | 16dp    |
| `m`   | 24dp    |
| `l`   | 32dp    |

## Avatar size

| Token  | Default |
| ------ | ------- |
| `s`    | 16dp    |
| `m`    | 24dp    |
| `l`    | 32dp    |
| `xl`   | 40dp    |
| `xxl`  | 48dp    |
| `xxxl` | 56dp    |

## Control size

Not a ramp — each name measures one specific part of one specific control.

| Token             | Default |
| ----------------- | ------- |
| `checkboxSize`    | 20dp    |
| `radioSize`       | 20dp    |
| `switchWidth`     | 52dp    |
| `switchHeight`    | 32dp    |
| `switchThumbSize` | 30dp    |
| `tileSize`        | 106dp   |

## Typography

Thirteen named variants, not a numeric scale. Each is a **composite token**: one `TextStyle`
bundling family, size, weight, and line height, so a variant re-themes as a unit and mismatched
combinations aren't representable.

| Token      | Size | Line height | Weight   |
| ---------- | ---- | ----------- | -------- |
| `display1` | 64sp | 72sp        | Normal   |
| `display2` | 48sp | 56sp        | Normal   |
| `display3` | 40sp | 48sp        | Normal   |
| `title1`   | 28sp | 36sp        | SemiBold |
| `title2`   | 28sp | 36sp        | Normal   |
| `title3`   | 20sp | 28sp        | SemiBold |
| `title4`   | 20sp | 28sp        | Normal   |
| `headline` | 16sp | 24sp        | SemiBold |
| `body`     | 16sp | 24sp        | Normal   |
| `label1`   | 14sp | 20sp        | SemiBold |
| `label2`   | 14sp | 20sp        | Normal   |
| `caption`  | 13sp | 16sp        | SemiBold |
| `legal`    | 13sp | 16sp        | Normal   |

Font families are an internal primitive — there is no family token to set. To change the typeface,
assign all 13 variants; `body = body.copy(fontFamily = MyFamily)` keeps CDS's metrics.

CDS specifies Inter for display/sans/text and Source Code Pro for mono, but bundles no font
resources, so all four currently resolve to the platform default. Supplying your own fonts is
therefore a visible change even if you keep every metric.

`caption` also carries an `uppercase` text transform, which has no `TextStyle` representation —
CDS's `Text` applies it when given `CdsFontToken.Caption`. Uppercase it yourself if you render
caption text some other way.

## Shadows

Two elevation shadows, identical across light and dark (so they live outside the per-scheme axes).
Described as four fields rather than a single elevation `Dp` so the call site can render them with
`Modifier.shadow`, a custom `drawBehind`, or a Material elevation.

| Field        | `elevation1` | `elevation2` |
| ------------ | ------------ | ------------ |
| `color`      | Black        | Black        |
| `offsetY`    | 8dp          | 8dp          |
| `opacity`    | 0.12         | 0.12         |
| `blurRadius` | 12dp         | 24dp         |

```kotlin
shadows {
    elevation1 { blurRadius = 16.dp; opacity = 0.08f }
}
```
