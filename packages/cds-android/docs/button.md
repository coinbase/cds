# Button

CDS's primary call-to-action control for Jetpack Compose.

## Quick start

```kotlin
Button(
    text = "Confirm",
    onClick = ::confirm,
    modifier = Modifier.fillMaxWidth(),
)
```

Wrap your app in [CdsThemeProvider](using-tokens.md) first. [Button] reads variant colors, spacing,
radius, and typography from the ambient theme automatically.

## Scope

The Android API is intentionally narrower than React Native in a few places:

| Mobile (RN)                                        | Android CDS                  | Notes                                             |
| -------------------------------------------------- | ---------------------------- | ------------------------------------------------- |
| `children` (any React node)                        | `text: String`               | Label text only; matches the iOS native API shape |
| `start` / `end` slots                              | `startIcon` / `endIcon` only | Generic node slots are not supported yet          |
| `block` / `fullWidth`                              | `Modifier.fillMaxWidth()`    | Layout is caller-controlled via [modifier]        |
| `style` / color overrides                          | —                            | Re-theme via [cdsTheme](custom-themes.md)         |
| Deprecated props (`compact`, `foregroundMuted`, …) | —                            | Omitted by design                                 |

## Variants and sizes

```kotlin
Button(text = "Primary", onClick = {})
Button(text = "Secondary", onClick = {}, variant = ButtonVariant.Secondary)
Button(text = "Inverse", onClick = {}, variant = ButtonVariant.Inverse)
Button(text = "Ghost", onClick = {}, transparent = true)
Button(text = "Small", onClick = {}, size = ButtonSize.S)
```

| [ButtonVariant] | Filled container | Filled content | Transparent content |
| --------------- | ---------------- | -------------- | ------------------- |
| `Primary`       | `bgPrimary`      | `fgInverse`    | `fgPrimary`         |
| `Secondary`     | `bgSecondary`    | `fg`           | `fg`                |
| `Tertiary`      | `bgTertiary`     | `fg`           | `fg`                |
| `Positive`      | `bgPositive`     | `fgInverse`    | `fgPositive`        |
| `Negative`      | `bgNegative`     | `fgInverse`    | `fgNegative`        |
| `Inverse`       | `bgInverse`      | `fgInverse`    | `fg`                |

Sizes (`Xs`, `S`, `M`, `L`) map to the same padding, radius, icon, and font tokens as web and mobile.

## States

```kotlin
Button(text = "Disabled", onClick = {}, enabled = false)
Button(text = "Loading", onClick = {}, loading = true)
```

- **Disabled** — non-interactive, reduced opacity via [CdsInteractionDefaults.DisabledAlpha].
- **Loading** — replaces label and icons with an indeterminate spinner; blocks clicks; exposes loading
  progress semantics while retaining the button label as the content description.

## Icon slots

Icon names are not part of the Android CDS API yet. Pass composable slots that receive the
resolved tint and icon size:

```kotlin
Button(
    text = "Back",
    onClick = ::goBack,
    startIcon = { tint, size ->
        Icon(painterResource(R.drawable.ic_back), contentDescription = null, tint = tint, modifier = Modifier.size(size))
    },
)
```

## Layout and customization

Use standard Compose modifiers instead of React Native-style layout props:

| Need               | Compose approach                                                    |
| ------------------ | ------------------------------------------------------------------- |
| Full width         | `modifier = Modifier.fillMaxWidth()`                                |
| Test hook (RN `testID`) | `modifier = Modifier.testTag("confirm")` on the button root    |
| Custom semantics   | `modifier = Modifier.semantics { … }` merged with Button's defaults |
| Offset / alignment | `Modifier.offset`, parent `Row`/`Column` arrangement                |

### UI testing (Compose UI Test and Maestro)

Button does not take a `testID` parameter. Pass a tag through [modifier] on the root composable — the same node that owns `Role.Button`, `contentDescription`, and click handling.

**In-process tests** (Robolectric / `createComposeRule`):

```kotlin
Button(
    text = "Confirm",
    onClick = ::confirm,
    modifier = Modifier.testTag("checkout-confirm"),
)

composeRule.onNodeWithTag("checkout-confirm").performClick()
```

**Maestro** (black-box) follows [Jetpack Compose guidance](https://docs.maestro.dev/get-started/supported-platform/android/jetpack): prefer visible text when unique (`tapOn: "Confirm"`), then accessibility description, then `id` for duplicates or stable anchors. For `id`, the host app must enable resource-id mapping once near the root:

```kotlin
Modifier.semantics { testTagsAsResourceId = true }
```

`apps/android-app` does this in `MainActivity`. Then Maestro can target:

```yaml
- tapOn:
    id: checkout-confirm
```

Loading buttons keep [text] in `contentDescription`, so `tapOn: { description: "Submit" }` continues to work while the label is hidden.

Raw color, padding, or style object overrides are intentionally absent. Re-theme via
[cdsTheme](custom-themes.md).

## Interaction

Press, hover, and keyboard-focus feedback come from [CdsInteractionDefaults](interaction.md),
wired through a hoisted [MutableInteractionSource]:

```kotlin
val interactionSource = remember { MutableInteractionSource() }
val isPressed by interactionSource.collectIsPressedAsState()

Button(
    text = "Confirm",
    onClick = ::confirm,
    interactionSource = interactionSource,
)
```

Pass the same [interactionSource] you observe — Button forwards it to `hoverable`, `focusable`, and
`clickable` so press, hover, and focus events are all available to customer logic.

[Button]: ../src/main/java/com/coinbase/cds/components/button/Button.kt
[ButtonVariant]: ../src/main/java/com/coinbase/cds/components/button/Button.kt
[CdsInteractionDefaults.DisabledAlpha]: ../src/main/java/com/coinbase/cds/interaction/CdsInteractionDefaults.kt
[MutableInteractionSource]: https://developer.android.com/reference/kotlin/androidx/compose/foundation/interaction/MutableInteractionSource
[interactionSource]: ../src/main/java/com/coinbase/cds/components/button/Button.kt
[modifier]: ../src/main/java/com/coinbase/cds/components/button/Button.kt
