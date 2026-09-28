Working reference for porting CDS React Native components (`packages/mobile`) to SwiftUI (`packages/cds-ios`). Seeded from the Button / Switch / Text / ProgressCircle / SlideButton ports and the ~90-component iOS triage. Add to it as ports land; reorganize once a better structure emerges.

**Canonical (Linear):** [CDS SwiftUI Best Practices](https://linear.app/coinbase/document/cds-swiftui-best-practices-fff9ce770a56)

Companion to [CDS Compose Best Practices](https://linear.app/coinbase/document/cds-compose-best-practices-8810460c4b23). iOS and Android do not share component code; they are sibling implementations of the same design language.

## Resources

**In the coinbase/cds repo**

* `packages/cds-ios/AGENTS.md`: API boundary, theming, Swift 6, gallery `@testable`, versioning
* `packages/cds-ios/README.md`: theme design
* `packages/cds-ios/docs/using-tokens.md`: reading tokens
* Skill: `.claude/skills/swiftui-best-practices` (loads this document; agents add new learnings here)
* Rewrite goals: [Native CDS: Rewrite Goals](https://linear.app/coinbase/document/native-cds-rewrite-goals-5b664fab3b30)
* Reference ports:
  * Button: RN `packages/mobile/src/buttons/Button.tsx` → `Sources/Components/Button.swift` (`CDSButtonStyle` + `CDSButtonLabel`), tests `ComponentStyleTests.swift`, gallery `ComponentsGallery.swift`
  * Switch: `ToggleStyle.swift` — SwiftUI `Toggle` + `.toggleStyle(.cds)`
  * Text: `Text.swift` — SwiftUI `Text` + `.cdsText`
  * ProgressCircle: `ProgressViewStyle.swift` — SwiftUI `ProgressView` + `.progressViewStyle(.cds)`
  * SlideButton: custom `View` (no HIG analog)

**SwiftUI API design (Apple)**

* [Button](https://developer.apple.com/documentation/swiftui/button) · [ButtonStyle](https://developer.apple.com/documentation/swiftui/buttonstyle) · [buttonStyle(_:)](https://developer.apple.com/documentation/swiftui/view/buttonstyle(_:)-7qx1) · [ButtonStyleConfiguration](https://developer.apple.com/documentation/swiftui/buttonstyleconfiguration)
* [PrimitiveButtonStyle](https://developer.apple.com/documentation/swiftui/primitivebuttonstyle) — custom look **and** custom interaction (`trigger()`)
* [ToggleStyle](https://developer.apple.com/documentation/swiftui/togglestyle) · [toggleStyle(_:)](https://developer.apple.com/documentation/swiftui/view/togglestyle(_:))
* [ProgressViewStyle](https://developer.apple.com/documentation/swiftui/progressviewstyle) · [TextFieldStyle](https://developer.apple.com/documentation/swiftui/textfieldstyle) · [LabelStyle](https://developer.apple.com/documentation/swiftui/labelstyle)
* There is **no** SwiftUI `TextStyle` protocol. Typography is `.font` / a `ViewModifier` (`.cdsText`). `CDSTextStyle` is a role enum, not a View.
* [ViewModifier](https://developer.apple.com/documentation/swiftui/viewmodifier) · [Environment](https://developer.apple.com/documentation/swiftui/environment)
* [Accessibility](https://developer.apple.com/documentation/swiftui/view-accessibility)

**WWDC (always `Button` + style, never a branded Button type)**

* [Build SwiftUI apps for tvOS (WWDC20)](https://developer.apple.com/videos/play/wwdc2020/10042/) — custom `ButtonStyle`
* [SwiftUI Accessibility: Beyond the basics (WWDC21)](https://developer.apple.com/videos/play/wwdc2021/10119/?time=1068)
* [The SwiftUI cookbook for navigation (WWDC22)](https://developer.apple.com/videos/play/wwdc2022/10054/)
* Apple DTS: [custom ButtonStyle is the recommended appearance API](https://developer.apple.com/forums/thread/766819)

**Intentionally not used**

* A `CDSButton` / `CDSToggle` / `CDSText` wrapper View that hides the system control. Style / modifier is the CDS layer. Overlay components whose RN chrome is not system chrome (`Alert`, `Accordion`, `Tooltip`) **are** CDS views — that is visual parity, not a Button wrapper.
* UIKit `UIButton` subclasses / `UIButton.Configuration` as the public CDS API. SwiftUI first.
* Copying Compose composable names or Android `Modifier` parameter order onto SwiftUI.

## Guiding principles

* **Visual spec is RN, not HIG.** Match the React Native component’s layout, states, chrome, and motion **intent** as closely as iOS allows (tokens, Figma, RN source). HIG wins only for OS chrome that is not a CDS component (nav bar, keyboard, status bar) or where iOS physically cannot match (Dynamic Type reflow, safe area, no hover).
* RN defines **how it looks**. SwiftUI defines **what it is**. `Button` + `.buttonStyle(.cds)` can look identical to RN `Button`; `makeBody` draws the chrome.
* Port product behavior and visual design. Don't transliterate RN mechanisms (`StyleSheet`, `BoxProps`, `Pressable` props, `useComponentConfig`, `memo` / `useCallback`).
* Don't port the RN view tree. Don't share widget code with Android.
* Don't port deprecated props or components. Grep for `@deprecated`, and record what was skipped and why.
* Ignore `alpha/` status in cds-mobile. Port under the plain name.
* Never leak a third-party API (Lottie, etc.) into a CDS type.

## Classify before writing code

Pick **one** rewrite pattern. Honor the Linear issue's `ios_work` unless it still says `use SwiftUI API` for a component whose **chrome** does not match RN — then reclassify to **CDS view**.

| Pattern | When | Call site | CDS ships |
| --- | --- | --- | --- |
| **style SwiftUI control** | Apple has the widget **and** a Style protocol, and `makeBody` can match RN chrome (`Button`, `Toggle`, `ProgressView`, `TextField`) | Keep Apple's type + `.cds` | `internal` Style + `.cds(…)` factory |
| **modifier on SwiftUI view** | Apple has the widget **but no Style protocol** (`Text`, `Divider` insets) | Keep Apple's type + `.cdsText` / `.cdsDivider` | `internal` `ViewModifier` |
| **CDS view** | RN chrome is not the platform default (`Alert` modal, `Accordion`, `Tooltip`, Coachmark, Avatar, Lottie host, SlideButton) | `Alert(…)`, `Accordion(…)`, `SlideButton(…)` | `internal` `View` |
| **use SwiftUI API** | The RN component **already looks like** the system API (`HStack` / `Spacer` / `padding`, existing `CDSThemeProvider`) | Use the system API | Gallery + docs only |
| **skip** | Not iOS (`AndroidNavigationBar`, `MediaQueryProvider` / `useBreakpoints`) | n/a | Do not port |

When two patterns could apply, prefer: Style → modifier → CDS view (if RN chrome differs) → SwiftUI API (only if it already looks like RN) → skip.

Need Design = the native version cannot match RN and would look or behave dramatically different (research question 7). A missing Figma link alone is not a reason, and neither is “should this look like HIG instead.”

Do **not** map Alert → `.alert`, Accordion → `DisclosureGroup`, Tooltip → `.popover`. Those system APIs do not match RN chrome.

## Public API boundary (Hyrum's Law)

* `CDSDesignSystem` is a published XCFramework. Swift has **no** explicit-API mode. Visibility is convention plus `packages/cds-ios/AGENTS.md`. Default to `internal` / `private`.
* Public today: the **theme layer** only (`CDSTheme`, `CDSThemeSet`, `CDSThemeProvider`, `InvertedThemeProvider`, token types/enums, `\.cdsTheme`, `Color(cdsHex:)`).
* Components under `Sources/Components/` stay `internal` until gallery + token tests exist **and** a human decides to stabilize. Same as Android shipping `Button` / `Text` / `SlideButton` as `internal` for the first release.
* Public later: the Style / modifier / view the caller names, plus enums they must spell (`ButtonVariant`, `ButtonSize`). Internal: mapping functions (`buttonColors`, `buttonMetrics`), assembly helpers, gallery-only previews.
* Never widen visibility so `apps/ios-gallery` compiles. The gallery uses `@testable import CDSDesignSystem` (Debug testability). If the gallery cannot express something, the API is missing or the app is wrong.
* Changing an existing `public` signature is a breaking change.
* Audit signal: grep new files for `public` and challenge each occurrence.

## API shape

* Keep Apple's control when a Style protocol exists. Call site is `Button { }.buttonStyle(.cds(.primary))`, not `CDSButton("Save", .primary)`.
* `CDSButtonLabel` is a **label helper** (icon spacing), not a Button wrapper. Skip it when the label is custom.
* `ButtonStyle` = custom look, standard interaction (Apple tracks `isPressed` and fires the action). `PrimitiveButtonStyle` = custom look **and** custom interaction (`configuration.trigger()`). Use `ButtonStyle` for branded CTAs. Use `PrimitiveButtonStyle` only when the gesture is not a standard tap (hold-to-confirm, slide). SlideButton is a CDS `View`, not a `ButtonStyle`.
* `buttonStyle(_:)` / `toggleStyle(_:)` write into the **environment** for this view and all descendant controls until something closer overrides. They do not have to be direct children.
* RN `block` / `fullWidth` → `fullWidth:` on the Style, or the caller uses `.frame(maxWidth: .infinity)`. Don't add a width prop that fights the layout.
* RN `testID` → the caller uses `.accessibilityIdentifier`. No `testID` param.
* `children` / `ReactNode | string` → `Button`'s `ViewBuilder` label, plus a `String` convenience that already exists on SwiftUI `Button`.
* Component-typed props, render props, `cloneElement` → `@ViewBuilder` slots. Never inspect children.
* Group wrappers (`ButtonGroup`) → don't port. Use `HStack` / `VStack` + `theme.space.*`.
* Thin `X + Pressable` wrappers (`IconButton`) → same `Button` + Style; icon-only label.
* Siblings that share a token table (Button, IconButton) share one Style and public enum.
* Mode generics (`'single' | 'multi'`) → separate named types (`Select` / `MultiSelect`), not a flag.
* Imperative refs (`ref.hide()`) → bindings (`isPresented`) or a hoisted store. No `useToast()` hooks.
* Overlays hoist `isPresented` / `Binding`.
* Do not clone every `Button` initializer (`role:`, `systemImage:`, `keyboardShortcut`). Forward `role` via the system `Button`; let SwiftUI own the rest.
* When cutting a deprecated prop changes the effective default, choose the SwiftUI default deliberately and document the parity delta.

### Why not a wrapper

Ranked for readers coming from RN. Lead with these; don't argue accessibility.

* **SwiftUI has a styling slot RN lacks.** RN wraps `Pressable` because it has no appearance hook. SwiftUI's `ButtonStyle` / `ToggleStyle` replace the whole look and keep Apple's control. Wrapping in RN is not a reason to wrap here.
* **Swift has no `{...props}` spread.** A wrapper must hand-forward every `Button` init (`role:`, `LocalizedStringKey`, `systemImage:`, custom label, `intent:`) and chase each iOS release. Anything not forwarded is unavailable.
* **Closest style wins.** `.buttonStyle(.cds(.secondary))` on a container restyles every descendant `Button`, like a `ThemeProvider`. A wrapper sets its style internally, closer to the control, so a parent can never override it, and a container-level CDS style does nothing to it.
* **Adoption without call-site rewrites.** An existing screen (or third-party code) gets CDS with one modifier at its root. A wrapper needs every call site rewritten.
* **One style covers button-like controls.** `ButtonStyle` also styles `Link`, `ShareLink`, and `Toggle` with `.toggleStyle(.button)`. A wrapper covers one type and invites `CDSLink`, `CDSShareLink`, ….
* **One way to write a button.** Toolbars, `.alert`, menus, and swipe actions ignore app styles and need a plain `Button`. With a style it is always `Button`; with a wrapper, reviewers police `CDSButton` vs `Button`.
* **Platform idiom.** Apple docs, sample code, and AI tools write `Button` + modifiers.
* **Not an accessibility argument.** A thin wrapper around a real `Button` keeps VoiceOver and Dynamic Type. Don't claim otherwise.
* **Not dogma.** Ship a CDS view where Apple gives no app-implementable style (`PickerStyle`, `DatePickerStyle`) or RN chrome differs: Select, DatePicker, Tabs, Alert.

### Whole-app CDS (do not wrap the control)

SwiftUI cannot replace `SwiftUI.Button` at import time. The analog of `CdsThemeProvider` / RN `ThemeProvider` is environment inheritance.

* Wrap `CDSThemeProvider` around the app. Do not invent `CDSButton` to “enforce” usage — that makes a forgotten `Button("Save") {}` look like HIG.
* `CDSThemeProvider` should install safe defaults: `.tint`, body `.font`, `.foregroundStyle` from `fg`, `.toggleStyle(.cds)`, `.progressViewStyle(.cds)`, a **non-filled-primary** default `.buttonStyle(.cds)`. Unstyled controls then look like CDS.
* Do **not** default filled `.cds(.primary)` at the provider root — that paints toolbar items as primary pills. Explicit CTAs write `.buttonStyle(.cds(.primary))`. Toolbar / list chrome that must stay HIG opts out with `.buttonStyle(.plain)`.
* OS `.alert` / `.confirmationDialog` ignore app `ButtonStyle`. They are not CDS Alert.
* If a product app wants `RetailPrimaryButton`, that wrapper lives in the **app**, not in CDS.

Shipped call sites:

```swift
Button("Primary") { }
    .buttonStyle(.cds(.primary))

Button(action: next) {
    CDSButtonLabel("Continue", trailing: Image(systemName: "chevron.right"))
}
.buttonStyle(.cds(.primary, size: .l))

Toggle("Notifications", isOn: $on)
    .toggleStyle(.cds(.primary))

Text("Balance")
    .cdsText(.title3)

ProgressView()
    .progressViewStyle(.cds(.m))
```

## Theming & tokens

* Tokens flow `CDSThemeProvider` → `\.cdsTheme` → `theme.colors` / `space` / `typography` / `borderRadius`. This is the SwiftUI equivalent of `useTheme()`.
* Read `@Environment(\.cdsTheme)`. Do not take a `theme:` parameter on the Style unless a **pure** mapping function needs it for tests.
* Don't thread colors or spacing through component params. Don't use Environment for per-component config. Nest `CDSThemeProvider` or `InvertedThemeProvider` when a subtree needs a different theme.
* `\.cdsTheme` is get-only and **traps** without a provider (except Xcode Previews, which fall back to the default theme). `InvertedThemeProvider` also requires a `CDSThemeProvider` ancestor.
* Style mapping functions (`buttonColors`, `toggleTrackColor`, `progressCircleDiameter`) are pure and take `CDSTheme`. The Style reads the environment once and passes values in.
* Inverted colors: wrap with `InvertedThemeProvider` so slots inherit inverted tokens.
* Token index vs raw points: a token named `200` is `radius200`, not 200pt. Check which form the RN source uses (`borderRadius={200}` vs `style={{ borderRadius: 200 }}`).
* Hardcoded values outside the theme become named internal constants that cite the TS path. Flag them as token gaps.
* Don't duplicate shared tokens (disabled alpha lives in one place, e.g. `cdsDisabledAlpha`).
* Spectrum-driven maps → enum-keyed pure resolvers into `theme.spectrum`. Never raw `Color` params for product variants.
* Wrap tests, gallery, and `#Preview` in `CDSThemeProvider`.
* Brand or scheme selection reads the CDS theme / `colorScheme` environment, not an ad-hoc `UIColor` check.

## Styling

* Opinionated defaults come from tokens, drawn in `ButtonStyle.makeBody` / `ViewModifier.body`. Callers override layout with SwiftUI modifiers, plus a few typed Style params where product needs them (`variant`, `size`, `loading`, `fullWidth`).
* No RN `style` / `styles` objects. No copied `ViewStyle`.
* Padding that depends on a variant or on which slots are present → a pure `*Metrics` function. XCTest the matrix.
* `position: 'absolute'` → `ZStack` / `.overlay` / `.background`. Placement of bars and headers is the caller's job (`safeAreaInset`, `toolbar`).
* Replace `Math.random` visual variation with deterministic variants so previews and tests stay stable.

## Interactions

* Classify every interaction (press, long press, toggle, drag) before choosing Style vs `PrimitiveButtonStyle` vs custom `View`.
* Prefer `Button` + `ButtonStyle` over `onTapGesture` on a `View`. You keep `ButtonRole`, toolbar placement, `keyboardShortcut`, VoiceOver button traits.
* `configuration.isPressed` is how `ButtonStyle` does press. Don't reimplement press with a DragGesture unless you are on `PrimitiveButtonStyle`.
* Disabled: `@Environment(\.isEnabled)` + `cdsDisabledAlpha`. Caller writes `.disabled(true)`.
* Loading: block hits (`allowsHitTesting(false)`), show `ProgressView` with `.progressViewStyle(.cds(…))`, keep the accessible name.
* Gesture-driven controls (SlideButton) need an accessibility alternative (`accessibilityAction` / button fallback).
* RN `hitSlop` → enough padding / `contentShape` for a 44pt minimum target. No `hitSlop` param.

## Accessibility

* Keep the system control's traits. A styled `Button` is still a button; don't replace it with a tappable `View`.
* Icon-only: `accessibilityLabel` on the `Button`. `CDSButtonLabel` is visual; the `Button` owns a11y.
* Don't port RN a11y workarounds (visually hidden Text, cloneElement stripping props). Use `.accessibilityHidden`, `.accessibilityElement(children:)`, `accessibilityRepresentation`.
* Cut font-scaling props. Dynamic Type comes from SwiftUI `Font` / our typography tokens if they use scaled fonts.
* Custom overlays (Alert, Tooltip) must provide focus, dismiss, and roles themselves — do not assume OS `.alert` a11y.

## Layout, animation & RTL

* `View` / `HStack` / `VStack` / `Spacer` / `Box` → native `HStack` / `VStack` / `ZStack` / `Spacer` + `theme.space.*`. Do not invent `CDS.Box` / `CDS.HStack`.
* `onLayout` measuring → `GeometryReader` sparingly, or `Layout` protocol. Don't store layout rects in `Observable` that invalidate every frame.
* Reanimated / `maxHeight` tweens / keep-mounted-until-exit → `withAnimation`, `transition`, `animation`. Match **intent** (ease, spring, duration), not the RN node tree.
* No iOS motion token type yet. Hand-port `packages/common` motion as internal `Animation` constants and cite the TS source.
* RTL: `HStack` / `padding` leading/trailing mirror. Only `Canvas` / explicit `x` offsets need `layoutDirection`. Test both directions in the gallery.
* Insets: `safeAreaInset`, `safeAreaPadding`, `ignoresSafeArea` as needed. Never port `StatusBar.currentHeight` hacks.
* Sheets: `.sheet` / `.fullScreenCover` may **present** Tray / Modal if the **content** paints RN. Branded sheet chrome is a CDS view.

## State, logic & dependencies

* Don't port `useComponentConfig` / `ComponentConfigProvider`. Defaults live on the Style / View init.
* `@State` only for UI-local ephemeral state. Hoist everything customers care about (`isOn`, `isPresented`).
* Hooks and formatters from `packages/common` get hand-ported to pure Swift with XCTest. Don't import `@coinbase/cds-common`.
* Every new dependency (Lottie SPM, etc.) is an explicit decision. Wrap it in a CDS type. Call sites never `import Lottie`.
* Package product is **`.dynamic`** in `Package.swift` (XCFramework). Don't change it to static.
* Do not add Yarn/npm dependencies to `cds-ios`. Real graph is `Package.swift`.
* iOS versions independently (`ios-v*` tags + `CHANGELOG.md`). Never `yarn release`.

## Icons & media

* Until a public Icon exists, icon props → `Image` / `@ViewBuilder` slots. The caller picks the glyph. `CDSButtonLabel` sizes icons from `cdsButtonMetrics`.
* Asset-name props (pictogram, spot) → slots, so the port isn't blocked on the asset pipeline.
* Draw small fixed glyphs with `Image(systemName:)` only when the RN glyph is a system analog; otherwise asset or Canvas.
* Lottie: `airbnb/lottie-spm` 4.6.1. Color filters via After Effects layer names `palette_<token>`. Hide `LottieAnimationView` behind a CDS type.

## Testing

* Pure mappers (`buttonColors`, `buttonMetrics`, `toggleTrackColor`, `progressCircleDiameter`) get XCTest in `ComponentStyleTests.swift`. Cover variant × size matrices there, not in UI tests.
* `yarn nx run cds-ios:test`. Then `yarn nx run cds-ios:build` if the gallery or package graph changed. Do not run unscoped `yarn test`.
* Don't test framework defaults. Don't duplicate one assertion across 20 variants.
* Target ~60% coverage on valuable paths (token wiring, disabled, loading), not maximal coverage.
* Wrap test hosts in `CDSThemeProvider`. Use a resolved `CDSTheme.light` for pure functions.

## Gallery & docs

* Each port gets a gallery section in `apps/ios-gallery/Sources/ComponentsGallery.swift`: variants, sizes, states, and the **real call site** (HIG control + Style, or the CDS view for overlays).
* Gallery reaches `internal` components with `@testable import CDSDesignSystem`. Never `public` a component to make the gallery compile.
* `apps/ios-gallery/CDSGallery.xcodeproj` is generated from `project.yml` via xcodegen. Edit YAML, not the pbxproj.
* Docs: comments on the Style / modifier / view (call site, what CDS owns vs the caller, RN deltas). Theme consumer guides stay in `packages/cds-ios/docs/`.
* Update `packages/cds-ios/CHANGELOG.md` and `AGENTS.md` if the public surface or the component convention changes.

## Triage & sizing

Use the iOS Linear template scale: **XS** ~1 hour · **S** a few hours · **M** ~1 day · **L** several days · **XL** >= 1 week.

* Port = **skip** when the foundation already covers it (HStack/VStack), it's an RN mechanism (Interactable, config providers), or it's Android-only.
* The first port in a family pays for the shared Style. Siblings are usually XS/S.
* Size compound families by their sub-components. Size orchestrators as orchestration and name the blocking chain (Lottie blocks LottieStatusAnimation).
* HIG distance drives estimate only as **engineering** (tokens only / custom Style / invent a view), not as “wait for design to pick HIG.” Visual spec is RN.
* Shared foundations to budget once: ThemeProvider environment defaults, overlay host, field chrome, card surface, Lottie wrapper, motion constants, skeleton (if `.redacted` ≠ RN TextFallback).
