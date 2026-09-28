# RN component → iOS rewrite map

Use with the Linear issue's `ios_work`. Visual spec is RN, not HIG. Reclassify any issue that
still says `use SwiftUI API` when RN chrome does not match the system analog.

## style SwiftUI control

| RN | SwiftUI control | CDS ships |
| --- | --- | --- |
| Button | `Button` | `CDSButtonStyle` + `.buttonStyle(.cds)` + `CDSButtonLabel` |
| IconButton | `Button` | same Style; icon-only label (not a new view) |
| Pressable | `Button` / `onTapGesture` | prefer `Button` + Style; don't ship `CDS.Pressable` |
| Switch | `Toggle` | `CDSToggleStyle` + `.toggleStyle(.cds)` |
| Checkbox | `Toggle` | `ToggleStyle` (checkbox look) — not a CDS.Checkbox view |
| Radio | `Toggle` | radio `ToggleStyle` on a `Toggle` bound to the selection (apps can't implement `PickerStyle`) |
| ProgressCircle | `ProgressView` | `CDSCircularProgressViewStyle` + `.progressViewStyle(.cds)` |
| ProgressBar | `ProgressView` | linear `ProgressViewStyle` |
| Input / TextInput | `TextField` / `SecureField` | `TextFieldStyle` |
| SearchInput | `searchable` / `TextField` | style the field; prefer `.searchable` in nav |

## modifier on SwiftUI view

| RN | SwiftUI | CDS ships |
| --- | --- | --- |
| Text / Fallback | `Text` | `.cdsText(_:)` — **no** `TextStyle` protocol |
| TextFallback (skeleton) | Measure against RN. `.redacted` is HIG loading — use a CDS skeleton view if it does not match the sized bar. |
| Divider | `Divider` | optional `.cdsDivider` for color/insets |
| DotCount / Count | `Text` + badge chrome | prefer modifier or small view if layout is unique |

## use SwiftUI API (only if it already looks like RN)

| RN | SwiftUI |
| --- | --- |
| Box / HStack / VStack / Spacer | `padding`, `Color`, `HStack`, `VStack`, `Spacer` |
| ThemeProvider / InvertedThemeProvider | already exist as `CDSThemeProvider` / `InvertedThemeProvider` |
| RemoteImage | `AsyncImage` (or app image pipeline — don't wrap URLSession in CDS) |
| Link | `Link` / `Text` + `OpenURLAction` |
| StickyFooter / Screen | `safeAreaInset` / `toolbar` — app layout, unless the chrome is branded |
| Tabs | `TabView` / `Picker` segment — only if visual matches RN; else CDS view |
| Pagination | `TabView` + page style / `scrollTargetBehavior` — same caveat |

Do **not** map Alert → `.alert`, Accordion → `DisclosureGroup`, Tooltip/Nudge → `.popover`.
Tray / Modal / Overlay may *present* with `.sheet` / `.fullScreenCover` if the **content** paints
RN; branded sheet chrome is a CDS view.

## CDS view (RN chrome ≠ platform default, or no HIG primitive)

| RN | Why a View |
| --- | --- |
| Alert | RN is a custom modal (pictogram, CDS buttons). SwiftUI `.alert` is OS chrome and will not match. |
| Accordion | RN exclusive-open + caret/separators. `DisclosureGroup` is HIG disclosure, not RN Accordion. |
| Tooltip / Nudge | RN tooltip chrome. iOS has no tooltip; `.popover` is the HIG analog, not the RN look. |
| Avatar | composed image + size tokens + status |
| SlideButton | custom interaction |
| RollingNumber | custom animation |
| Coachmark / Tour / Spotlight | custom overlay chrome |
| Spinner (Lottie) | host CDS animation; hide Lottie types |
| LottieStatusAnimation | same; blocked on Lottie integration |
| Media (complex) | only if AsyncImage + overlay isn't enough |
| Carousel | if paging + peek + tokens exceed `ScrollView` |
| BrowserBar | branded chrome |
| Stepper (multi-step flow) | **not** HIG −/+ `Stepper`; CDS flow chrome |
| ListCell | if CDS cell chrome ≠ `List` + `LabeledContent` |
| Select | RN trigger + tray list. Apps can't implement `PickerStyle`; `MenuStyle` only styles the trigger. |
| DatePicker | same limit (`DatePickerStyle` is not app-implementable); RN field + calendar tray |
| Combobox | if SwiftUI `Picker` can't express search+list |

## skip / not iOS

| RN | Why |
| --- | --- |
| AndroidNavigationBar | Android only |
| MediaQueryProvider / useBreakpoints / DeviceState | use size classes / `horizontalSizeClass` |
| ComponentConfigProvider | web/RN defaulting; iOS uses Style params + environment |
| AccessibilityWidget / web a11y helpers | use SwiftUI accessibility modifiers |
| useTheme | `@Environment(\.cdsTheme)` already |

## Enforcement reminder

Button / Toggle / Text / ProgressView stay **Apple's type** + Style/modifier. Overlay components
whose RN chrome is not HIG are CDS views. Whole-app CDS for HIG controls is environment defaults
on `CDSThemeProvider`, not a `CDSButton` wrapper.
