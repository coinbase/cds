# Theme token reference

Every token axis in `CDSTheme` / `CDSThemeSet`, the type it carries, and the `cds-default` values. Use
this as a checklist when authoring a theme — see [Creating a custom theme](custom-themes.md) for how,
and [Using theme tokens](using-tokens.md) for reading these from a view.

Values here describe the current release, hand-ported from the CDS token source
(`packages/mobile/src/themes/defaultTheme.ts`) into `Sources/Theme/`. Rungs may be **added** in a
minor release; when that happens, a theme built with `cdsTheme` inherits the new value from its base.

## Axes at a glance

| Axis                                        | Type                    | `CDSThemeSet` field(s)                              | Per scheme? | Rungs              |
| ------------------------------------------- | ----------------------- | --------------------------------------------------- | ----------- | ------------------ |
| [Spectrum](#spectrum)                       | `CDSSpectrum`           | `lightSpectrum`, `darkSpectrum`                     | Yes         | 11 hues × 13 steps |
| [Colors](#colors)                           | `CDSColors`             | `light`, `dark`                                     | Yes         | 43                 |
| [Illustration colors](#illustration-colors) | `CDSIllustrationColors` | `lightIllustrationColors`, `darkIllustrationColors` | Yes         | 15                 |
| [Spacing](#spacing)                         | `CDSSpacing`            | `spacing`                                           | No          | 15                 |
| [Radius](#radius)                           | `CDSRadius`             | `radius`                                            | No          | 11                 |
| [Border width](#border-width)               | `CDSBorderWidth`        | `borderWidth`                                       | No          | 6                  |
| [Icon size](#icon-size)                     | `CDSIconSize`           | `iconSize`                                          | No          | 4                  |
| [Avatar size](#avatar-size)                 | `CDSAvatarSize`         | `avatarSize`                                        | No          | 6                  |
| [Control size](#control-size)               | `CDSControlSize`        | `controlSize`                                       | No          | 6                  |
| [Typography](#typography)                   | `CDSTypography`         | `typography`                                        | No          | 13                 |
| [Shadows](#shadows)                         | `CDSShadowScale`        | `shadow`                                            | No          | 2 × 5 fields       |

Plus `id`, a stable slug identifying the theme (`"cds-default"`).

Every axis also has a `CDS*Token` enum and a subscript, so you can resolve a token by value
(`theme.spacing[.x2]`) and iterate a whole scale (`CDSSpacingToken.allCases`). Each enum case carries
`tokenName`, the canonical CDS key shared with the web and Android token contracts — useful for labels
and for parsing serialized themes.

---

## Spectrum

The primitive color tier: raw tonal ramps, context-free. **CDS views do not read this tier** — they
read [Colors](#colors). Override the spectrum for your own code's benefit, and because a coherent
semantic tier is easier to author on top of one (see
[custom themes, Approach 2](custom-themes.md#approach-2-rebrand-from-a-custom-spectrum)).

Hues (`CDSSpectrumHueToken`): `blue`, `green`, `orange`, `gray`, `indigo`, `pink`, `purple`, `red`,
`teal`, `yellow`, `chartreuse`.

Steps, per hue (`CDSColorRampToken`): `step0`, `step5`, `step10`, `step15`, `step20`, `step30`,
`step40`, `step50`, `step60`, `step70`, `step80`, `step90`, `step100`.

`step0` is the lightest end in the light scheme and the darkest in the dark scheme — a ramp inverts
between schemes rather than being reused. Default values are in `Sources/Theme/Spectrum.swift`
(`CDSSpectrum.light` / `CDSSpectrum.dark`), or browse them in the theme gallery.

```swift
$0.lightSpectrum = $0.lightSpectrum.with {
    $0.blue = $0.blue.with { $0.step60 = Color(cdsHex: 0x1A5CFF) }
}
```

## Colors

The semantic tier (`CDSColors`): intent-named values that CDS views actually read. The columns give
the spectrum step each name maps to in `cds-default` (via `CDSColors.lightDeriving(from:)` /
`darkDeriving(from:)`), which is the most useful thing to know when picking your own value.

| Token (`CDSColorToken`) | Light               | Dark                |
| ----------------------- | ------------------- | ------------------- |
| `fg`                    | `gray.step100`      | `gray.step100`      |
| `fgMuted`               | `gray.step60`       | `gray.step60`       |
| `fgInverse`             | `gray.step0`        | `gray.step0`        |
| `fgPrimary`             | `blue.step60`       | `blue.step70`       |
| `fgPositive`            | `green.step60`      | `green.step60`      |
| `fgNegative`            | `red.step60`        | `red.step60`        |
| `fgWarning`             | `orange.step60`     | `orange.step70`     |
| `bg`                    | `gray.step0`        | `gray.step0`        |
| `bgAlternate`           | `gray.step10`       | `gray.step5`        |
| `bgInverse`             | `gray.step100`      | `gray.step100`      |
| `bgOverlay`             | `gray.step80` @ 33% | `gray.step0` @ 33%  |
| `bgPrimary`             | `blue.step60`       | `blue.step70`       |
| `bgPrimaryWash`         | `blue.step0`        | `blue.step0`        |
| `bgSecondary`           | `gray.step10`       | `gray.step15`       |
| `bgTertiary`            | `gray.step20`       | `gray.step20`       |
| `bgSecondaryWash`       | `gray.step5`        | `gray.step5`        |
| `bgNegative`            | `red.step60`        | `red.step60`        |
| `bgNegativeWash`        | `red.step0`         | `red.step0`         |
| `bgPositive`            | `green.step60`      | `green.step60`      |
| `bgPositiveWash`        | `green.step0`       | `green.step0`       |
| `bgWarning`             | `orange.step60`     | `orange.step60`     |
| `bgWarningWash`         | `orange.step0`      | `orange.step0`      |
| `bgLine`                | `gray.step60` @ 20% | `gray.step60` @ 20% |
| `bgLineHeavy`           | `gray.step60` @ 66% | `gray.step60` @ 66% |
| `bgLineInverse`         | `gray.step0`        | `gray.step0`        |
| `bgLinePrimary`         | `blue.step60`       | `blue.step70`       |
| `bgLinePrimarySubtle`   | `blue.step20`       | `blue.step20`       |
| `bgElevation1`          | `gray.step0`        | `gray.step5`        |
| `bgElevation2`          | `gray.step0`        | `gray.step10`       |
| `accentSubtleGreen`     | `green.step0`       | `green.step0`       |
| `accentBoldGreen`       | `green.step60`      | `green.step60`      |
| `accentSubtleBlue`      | `blue.step0`        | `blue.step0`        |
| `accentBoldBlue`        | `blue.step60`       | `blue.step60`       |
| `accentSubtlePurple`    | `purple.step0`      | `purple.step0`      |
| `accentBoldPurple`      | `purple.step80`     | `purple.step80`     |
| `accentSubtleYellow`    | `yellow.step0`      | `yellow.step0`      |
| `accentBoldYellow`      | `yellow.step30`     | `yellow.step30`     |
| `accentSubtleRed`       | `red.step0`         | `red.step0`         |
| `accentBoldRed`         | `red.step60`        | `red.step60`        |
| `accentSubtleGray`      | `gray.step10`       | `gray.step10`       |
| `accentBoldGray`        | `gray.step80`       | `gray.step80`       |
| `currentColor`          | `Color.primary`     | `Color.primary`     |
| `transparent`           | `Color.clear`       | `Color.clear`       |

`currentColor` maps to SwiftUI's environment primary content color (RN/web's `currentColor` has no
direct SwiftUI analog); `transparent` is `Color.clear`. Neither is scheme-derived.

Because a ramp inverts between schemes, most rows name the same step in both columns and still resolve
to different colors. The rows where the _step_ differs (`fgPrimary`, `fgWarning`, `bgPrimary`,
`bgLinePrimary`, `bgAlternate`, `bgSecondary`, `bgElevation1`/`bgElevation2`, and `bgOverlay`) are the
deliberate contrast corrections; mirror them when you override those tokens.

**Pairings to preserve.** These tokens are consumed together, so verify them against each other:

| Surface            | Container     | Content            |
| ------------------ | ------------- | ------------------ |
| Primary button     | `bgPrimary`   | `fgInverse`        |
| Secondary button   | `bgSecondary` | `fg`               |
| Tertiary button    | `bgTertiary`  | `fg`               |
| Positive button    | `bgPositive`  | `fgInverse`        |
| Negative button    | `bgNegative`  | `fgInverse`        |
| Transparent button | `transparent` | `fgPrimary` / `fg` |
| Screen background  | `bg`          | `fg`, `fgMuted`    |

## Illustration colors

A separate palette (`CDSIllustrationColors`) for illustrations and spot art, which have different needs
from UI chrome. Both schemes are fully populated with concrete RGB values (in
`Sources/Theme/CDSIllustrationColors.swift`) rather than derived from the spectrum.

Tokens (`CDSIllustrationColorToken`): `primary`, `black`, `white`, `gray`, `gray2`, `gray3`, `gray4`,
`positive`, `negative`, `accent1`, `accent2`, `accent3`, `accent4`, `invert`, `invert2`.

## Spacing

An 8pt base unit. Rung names are the multiplier (`x` prefix because a Swift identifier can't start with
a digit, `_` for the decimal point), deliberately _not_ the point value — a denser theme is free to
remap `x2` from 16 to 12. `tokenName` is the CDS key (`x1_5` → `1.5`).

| Token (`CDSSpacingToken`) | `tokenName` | Default |
| ------------------------- | ----------- | ------- |
| `x0`                      | `0`         | 0       |
| `x0_25`                   | `0.25`      | 2       |
| `x0_5`                    | `0.5`       | 4       |
| `x0_75`                   | `0.75`      | 6       |
| `x1`                      | `1`         | 8       |
| `x1_5`                    | `1.5`       | 12      |
| `x2`                      | `2`         | 16      |
| `x3`                      | `3`         | 24      |
| `x4`                      | `4`         | 32      |
| `x5`                      | `5`         | 40      |
| `x6`                      | `6`         | 48      |
| `x7`                      | `7`         | 56      |
| `x8`                      | `8`         | 64      |
| `x9`                      | `9`         | 72      |
| `x10`                     | `10`        | 80      |

## Radius

Abstract rungs; the numeric suffix is the CDS scale key (`r400` → `tokenName` `400`).

| Token (`CDSRadiusToken`) | Default                                                                   |
| ------------------------ | ------------------------------------------------------------------------- |
| `r0`                     | 0                                                                         |
| `r100`                   | 4                                                                         |
| `r200`                   | 8                                                                         |
| `r300`                   | 12                                                                        |
| `r400`                   | 16                                                                        |
| `r500`                   | 24                                                                        |
| `r600`                   | 32                                                                        |
| `r700`                   | 40                                                                        |
| `r800`                   | 48                                                                        |
| `r900`                   | 56                                                                        |
| `r1000`                  | 100000 — the pill rung, oversized so it renders fully rounded at any size |

Keep `r1000` absurd if you override the scale. A "large but plausible" value stops looking like a pill
as soon as a view grows past it.

## Border width

Abstract rungs, not multipliers, so the numeric suffix is the CDS scale key (`w100` → `100`).

| Token (`CDSBorderWidthToken`) | Default |
| ----------------------------- | ------- |
| `w0`                          | 0       |
| `w100`                        | 1       |
| `w200`                        | 2       |
| `w300`                        | 4       |
| `w400`                        | 6       |
| `w500`                        | 8       |

## Icon size

| Token (`CDSIconSizeToken`) | Default |
| -------------------------- | ------- |
| `xs`                       | 12      |
| `s`                        | 16      |
| `m`                        | 24      |
| `l`                        | 32      |

## Avatar size

| Token (`CDSAvatarSizeToken`) | Default |
| ---------------------------- | ------- |
| `s`                          | 16      |
| `m`                          | 24      |
| `l`                          | 32      |
| `xl`                         | 40      |
| `xxl`                        | 48      |
| `xxxl`                       | 56      |

## Control size

Not a ramp — each name measures one specific part of one specific control.

| Token (`CDSControlSizeToken`) | Default |
| ----------------------------- | ------- |
| `checkboxSize`                | 20      |
| `radioSize`                   | 20      |
| `switchWidth`                 | 52      |
| `switchHeight`                | 32      |
| `switchThumbSize`             | 30      |
| `tileSize`                    | 106     |

## Typography

Thirteen named roles (`CDSTextStyle`), not a numeric scale. Each resolves to a `CDSTextAttributes`: a
**composite token** bundling `size`, `lineHeight`, `weight`, an `uppercased` flag, and an optional
`fontName`, so a role re-themes as a unit and mismatched combinations aren't representable.

| Token (`CDSTextStyle`) | Size | Line height | Weight      | Uppercased |
| ---------------------- | ---- | ----------- | ----------- | ---------- |
| `display1`             | 64   | 72          | `.regular`  |            |
| `display2`             | 48   | 56          | `.regular`  |            |
| `display3`             | 40   | 48          | `.regular`  |            |
| `title1`               | 28   | 36          | `.semibold` |            |
| `title2`               | 28   | 36          | `.regular`  |            |
| `title3`               | 20   | 28          | `.semibold` |            |
| `title4`               | 20   | 28          | `.regular`  |            |
| `headline`             | 16   | 24          | `.semibold` |            |
| `body`                 | 16   | 24          | `.regular`  |            |
| `label1`               | 14   | 20          | `.semibold` |            |
| `label2`               | 14   | 20          | `.regular`  |            |
| `caption`              | 13   | 16          | `.semibold` | yes        |
| `legal`                | 13   | 16          | `.regular`  |            |

There is no family token: `fontName` is `nil` by default (system font), so all roles resolve to the
system font until you register your own fonts and set `fontName` per role — see
[custom themes, custom fonts](custom-themes.md#overriding-typography-and-custom-fonts). CDS specifies
Inter for text and Source Code Pro for mono, but bundles no font resources.

`caption` carries `uppercased: true`; CDS's internal `Text` applies the transform. Uppercase it
yourself if you render caption text with SwiftUI's own `Text`.

## Shadows

Two elevation shadows (`CDSShadowScale`), identical across light and dark (so they live outside the
per-scheme axes). A `CDSShadow` is five fields — `color`, `opacity`, `radius`, `x`, `y` — rather than a
single elevation value, so the call site can render it precisely. Apply one with the `.cdsShadow(_:)`
view modifier.

| Field     | `elevation1` | `elevation2` |
| --------- | ------------ | ------------ |
| `color`   | `.black`     | `.black`     |
| `opacity` | 0.12         | 0.12         |
| `radius`  | 12           | 24           |
| `x`       | 0            | 0            |
| `y`       | 8            | 8            |

```swift
$0.shadow.elevation1 = CDSShadow(opacity: 0.08, radius: 16, y: 8)
```
