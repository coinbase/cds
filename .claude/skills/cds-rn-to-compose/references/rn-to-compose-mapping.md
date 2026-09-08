# React Native → Jetpack Compose mapping

Use this when translating CDS mobile patterns to `packages/cds-android`. Prefer Compose-native APIs over RN-shaped APIs.

Official references: see `compose-docs.md`.

## Component structure

| React Native (CDS mobile) | Jetpack Compose (CDS Android) |
|---------------------------|-------------------------------|
| `export const Button = memo(...)` | `@Composable fun Button(...)` |
| `function` returning JSX | `@Composable` returning `Unit` |
| `children` | trailing `@Composable () -> Unit` content lambda |
| `React.memo` | Compose skippability (stable params); no manual memo |
| `useMemo` / `useCallback` | `remember` / stable lambdas when needed |
| `forwardRef` | Not applicable; use semantics / test tags |

## Styling

| React Native | Jetpack Compose | CDS rule |
|--------------|-----------------|----------|
| `style: ViewStyle` | `modifier: Modifier` | First optional param; outermost node |
| `styles.container` etc. | — | No granular styles object; use modifier + slots |
| `StyleSheet.create` | — | Do not port |
| `useTheme()` | `CdsTheme.colors`, `.space`, `.typography` | Never import cds-common |
| `paddingX: 2` (token index) | `CdsTheme.space.x2` | Hand-port from common tokens |
| `borderRadius: 700` | `CdsTheme.borderRadius.radius700` | |
| `width: '100%'` / `block` prop | `Modifier.fillMaxWidth()` | Caller responsibility, not component prop |
| `flexDirection: 'row'` | `Row` | |
| `alignItems` / `justifyContent` | `Arrangement`, `Alignment` | |
| `opacity` disabled | `Modifier.alpha(CdsInteractionDefaults.DisabledAlpha)` | 0.5 token |
| Dynamic interactable styles | `CdsInteractionDefaults.indication(shape)` | Not `getInteractableStyles` pipeline |

**Do not use** the alpha [Compose Styles API](https://developer.android.com/develop/ui/compose/designsystems/styles). Keep resolvers in `*Style.kt` for a future migration seam.

## Interaction

| React Native | Jetpack Compose |
|--------------|-----------------|
| `Pressable` | `Modifier.clickable` |
| `onPress` | `onClick: () -> Unit` |
| `onLongPress` | `combinedClickable(onLongClick = ...)` |
| `disabled` | `enabled = false` on clickable + semantics |
| `Pressable` state callback (`pressed`) | `MutableInteractionSource` + `collectIsPressedAsState()` |
| `Interactable` / `getInteractableStyles` | `CdsInteractionDefaults` + standard gesture modifiers |
| `accessibilityRole` | `Modifier.semantics { role = Role.Button }` |
| `accessibilityLabel` | `contentDescription` |
| `accessibilityState={{ disabled, busy }}` | `disabled()`, `progressBarRangeInfo` |

Wire every interaction type you want customers to observe to the **same** `MutableInteractionSource` passed to `clickable` / `hoverable` / `focusable` and to `indication`.

## Icons & media

| React Native | Jetpack Compose |
|--------------|-----------------|
| `icon: IconName` | `@Composable (tint: Color, size: Dp) -> Unit` slot |
| `<Icon name="..." />` | Caller provides icon composable until public Icon exists |
| `startIcon` / `endIcon` | `startIcon`, `endIcon` slot parameters |

## Layout primitives

| React Native | Jetpack Compose |
|--------------|-----------------|
| `View` | `Box` |
| `HStack` / `VStack` | `Row` / `Column` |
| `Text` (CDS) | Internal `Text` composable in cds-android |
| `ScrollView` | `Column` + parent `verticalScroll` |
| `ActivityIndicator` / `ProgressCircle` | `CircularProgressIndicator` or CDS visualization when ported |

## State & configuration

| React Native | Jetpack Compose |
|--------------|-----------------|
| `useComponentConfig('Button', props)` | **Do not port** — defaults in signature |
| `useTheme()` | `CdsTheme.*` accessors (read `LocalCdsTheme` provided by `CdsThemeProvider`) |
| `ThemeProvider` / theme context | `CdsThemeProvider(theme, colorScheme)` → `LocalCdsTheme` |
| Controlled `value` + `onChange` | Hoisted state: param + callback |
| Internal `useState` | `remember` only for UI-local ephemeral state |

## Types & API boundary

| React Native | Jetpack Compose |
|--------------|-----------------|
| `export type ButtonSize = 'xs' \| 's'...` | `enum class ButtonSize` or sealed types |
| Props interface | Kotlin data class params or direct composable params |
| Public npm export | `public` Kotlin declaration (explicit API mode) |
| Internal helper | `internal fun` |

## Testing

| React Native | Jetpack Compose |
|--------------|-----------------|
| `@testing-library/react-native` | `createComposeRule()` + `onNodeWith...` |
| `fireEvent.press` | `performClick()` |
| Jest matchers | `assertIsDisplayed()`, `assertIsEnabled()` |
| Style logic in TS | Pure Kotlin functions in `*Style.kt` + JUnit |
| — | Robolectric for JVM Android resources |

## Documentation

| React Native | Jetpack Compose |
|--------------|-----------------|
| Storybook stories | `android-app` gallery section |
| Component docsite (web) | `packages/cds-android/docs/<name>.md` |
