# Interaction affordances

CDS ships reusable press, hover, drag, and keyboard-focus feedback through Compose's standard
[Indication](https://developer.android.com/reference/kotlin/androidx/compose/foundation/Indication)
API. This is **not** the alpha Compose Styles API — it works on the current stable Compose BOM.

## Quick start

Paint your component with normal CDS tokens, then pass `CdsInteractionDefaults.indication()` to
`clickable`, `focusable`, or `Modifier.indication`:

```kotlin
@Composable
fun CustomAction(
    onClick: () -> Unit,
    modifier: Modifier = Modifier,
    enabled: Boolean = true,
) {
    val interactionSource = remember { MutableInteractionSource() }
    val shape = RoundedCornerShape(CdsTheme.borderRadius.radius700)

    Box(
        modifier = modifier
            .alpha(if (enabled) 1f else CdsInteractionDefaults.DisabledAlpha)
            .clip(shape)
            .background(CdsTheme.colors.bgPrimary)
            .clickable(
                interactionSource = interactionSource,
                indication = CdsInteractionDefaults.indication(shape),
                enabled = enabled,
                role = Role.Button,
                onClick = onClick,
            )
            .padding(CdsTheme.space.x2),
    ) {
        BasicText(
            text = "Custom action",
            style = CdsTheme.typography.headline.copy(color = CdsTheme.colors.fgInverse),
        )
    }
}
```

## API

| Symbol                                     | Purpose                                                                         |
| ------------------------------------------ | ------------------------------------------------------------------------------- |
| `CdsInteractionDefaults.indication()`      | Rectangular focus outline; no shape required                                    |
| `CdsInteractionDefaults.indication(shape)` | Press scrim and focus ring follow [shape]                                       |
| `CdsInteractionDefaults.DisabledAlpha`     | Shared disabled opacity (`0.5`, matches web/mobile `accessibleOpacityDisabled`) |

## Behavior

The indication observes a standard `InteractionSource` and applies CDS tokens:

| State                 | Visual treatment                                               |
| --------------------- | -------------------------------------------------------------- |
| **Pressed / dragged** | `0.98` scale, `0.82` content alpha, scheme-aware scrim overlay |
| **Hovered**           | `0.88` content alpha                                           |
| **Focused**           | `bgPrimary` outline for keyboard/D-pad navigation              |
| **Disabled**          | Not handled here — apply [DisabledAlpha] on the component      |

Pressed and dragged states take priority over hover; focus is hidden while pressed.

## Used by CDS components

[Button](../src/main/java/com/coinbase/cds/components/button/Button.kt) applies
`CdsInteractionDefaults.indication(shape)` internally. Future interactive components will share the
same primitive so customer-built composables and CDS components stay visually aligned.

## Compose Styles migration seam

Interaction rendering lives behind `CdsInteractionDefaults` and component style resolution stays in
files like `ButtonStyle.kt`. A future Compose Styles integration can replace the internal
application layer without changing public component parameters or icon slot contracts.
