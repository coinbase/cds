---
name: swiftui-best-practices
description: USE THIS when migrating a CDS React Native component to native iOS, or when writing or reviewing SwiftUI in packages/cds-ios or apps/ios-gallery. Covers rewrite patterns (Style vs SwiftUI API vs CDS view), RN visual spec (not HIG look-alikes), HIG-styled control enforcement, tokens, gallery, and tests.
---

# CDS iOS — migrate RN → SwiftUI

Read `packages/cds-ios/AGENTS.md` before writing any Swift. That file is the API-boundary source of
truth (public theme only; components stay `internal` until they stabilize). This skill is the
**migration workflow**: take one RN component and produce the iOS equivalent without wrapping HIG
controls in a CDS view.

[CDS SwiftUI Best Practices](https://linear.app/coinbase/document/cds-swiftui-best-practices-fff9ce770a56)
is the working reference (parallel to
[CDS Compose Best Practices](https://linear.app/coinbase/document/cds-compose-best-practices-8810460c4b23)).
**Read it before porting a component**, and add new port learnings there, not here. It includes
the full RN component → iOS map. If Linear is unavailable, rely on this file.

Also read:

- [Native CDS: Rewrite Goals](https://linear.app/coinbase/document/native-cds-rewrite-goals-5b664fab3b30)
- The component's Linear issue in [Migrate CDS components to native](https://linear.app/coinbase/project/migrate-cds-components-to-native-f5911543a456/issues)
- RN source under `packages/mobile/` (capability, not view tree)

Do **not** copy RN JSX into SwiftUI. Do **not** share widget code with Android. Do **not** make
components `public` to make the gallery compile. Do **not** leak Lottie / third-party types into
the CDS public (or even internal-customer-facing) API.

**Visual spec is RN, not HIG.** Match the React Native component’s layout, states, and chrome as
closely as iOS allows (tokens, Figma, RN source). HIG wins only for OS chrome that is not a CDS
component (nav bar, keyboard, status bar) or where iOS physically cannot match (Dynamic Type
reflow, safe area, no hover). Do not ship SwiftUI `.alert` / `DisclosureGroup` / `.popover` as the
CDS Alert / Accordion / Tooltip just because Apple has a look-alike.

## Classify before writing code

Pick **one** rewrite pattern. If the Linear issue already has `ios_work`, honor it unless it still
says “use SwiftUI API” for a component whose **chrome** does not match RN — then reclassify to
**CDS view**.

| Pattern                      | When                                                                                                                                | Call site                                      | CDS ships                            |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------- | ------------------------------------ |
| **style SwiftUI control**    | Apple has the widget **and** a Style protocol, and `makeBody` can match RN chrome (`Button`, `Toggle`, `ProgressView`, `TextField`) | Keep Apple's type + attach `.cds`              | `internal` Style + `.cds(…)` factory |
| **modifier on SwiftUI view** | Apple has the widget **but no Style protocol** (`Text`, `Divider` insets)                                                           | Keep Apple's type + `.cdsText` / `.cdsDivider` | `internal` `ViewModifier`            |
| **CDS view**                 | RN chrome is not the platform default (`Alert` modal, `Accordion`, `Tooltip` / Nudge, Coachmark, Avatar, Lottie host, SlideButton)  | `Alert(…)`, `Accordion(…)`, `SlideButton(…)`   | `internal` `View`                    |
| **use SwiftUI API**          | The RN component **already looks like** the system API (`HStack` / `Spacer` / `padding`, existing `CDSThemeProvider`)               | Use the system API                             | Gallery + docs only                  |
| **skip**                     | Not iOS (`AndroidNavigationBar`, `MediaQueryProvider` / `useBreakpoints`)                                                           | n/a                                            | Do not port                          |

`Text` is **modifier**, not Style: SwiftUI has no `TextStyle` protocol. `CDSTextStyle` is a
typography **role enum**, not a `View`. Never name a new type `CDSTextStyle` for a modifier.

When two patterns could apply, prefer: Style → modifier → CDS view (if RN chrome differs) →
SwiftUI API (only if it already looks like RN) → skip.

Need Design = the native version cannot match RN and would look or behave dramatically different
(research question 7). A missing Figma link alone is not a reason, and neither is “should this
look like HIG instead.”

## Do not wrap styled HIG controls — wrap the app

**Do not** invent `CDSButton`, `CDSToggle`, `CDSText`, `CDSProgressCircle`, `CDSTextField`, or
`CDSDivider` views that hide the system widget. Overlay components whose RN chrome is **not**
system chrome (`Alert`, `Accordion`, `Tooltip`) **are** CDS views — that is visual parity, not a
Button wrapper.

The goal is **the entire app looks like CDS**, not “developers remembered to import CDSButton”.
Those are opposite mechanisms:

| Approach                            | Forgotten `Button("Save") {}` | Entire app?                     |
| ----------------------------------- | ----------------------------- | ------------------------------- |
| Wrap in `CDSButton`                 | Compiles, looks like **HIG**  | No — CDS is opt-in per control  |
| Default Style on `CDSThemeProvider` | Compiles, looks like **CDS**  | Yes — CDS is opt-out per chrome |

SwiftUI cannot replace `SwiftUI.Button` at import time the way RN replaces `Pressable` with
`@coinbase/cds-mobile` `Button`. The analog of MaterialTheme / RN `ThemeProvider` is environment
inheritance. **Wrap `CDSThemeProvider` around the app. Do not wrap the control.**

A `CDSButton` type also swallows SwiftUI API (`ButtonRole`, toolbar placement, `keyboardShortcut`,
`Menu`, label as `View`) and recreates the RN facade this rewrite exists to delete.

### How the whole app becomes CDS

`CDSThemeProvider` already injects `\.cdsTheme` and `colorScheme`. It should also install the
SwiftUI style environment so **unstyled** HIG controls pick up CDS without a per-instance modifier:

1. **Always-safe defaults** (do these on the provider):
   - `.tint` from the theme primary
   - `.font` from `typography.body` so `Text` is CDS body unless a role is set
   - `.foregroundStyle` from `colors.fg`
   - `.toggleStyle(.cds(.primary))`
   - `.progressViewStyle(.cds(.m))`
   - future `.textFieldStyle(.cds)` (not picker styles: apps can't implement `PickerStyle` /
     `DatePickerStyle`)
2. **Button is inherited too, but the default variant is not filled primary.** A root
   `.buttonStyle(.cds(.primary))` paints every toolbar item, list-row button, and many nav
   actions as a primary pill — that is not “the app is CDS”, that is “the app is covered in CTAs”.
   Default a CDS style that applies type, color, radius, and press **without** the filled primary
   chrome (a `.cds` / `.cds(.plain)` default). Explicit CTAs still write
   `.buttonStyle(.cds(.primary))`. Toolbar / list chrome that must stay HIG opts out with
   `.buttonStyle(.plain)` (or a later `.cds(.toolbar)`).
3. **OS `.alert` / `.confirmationDialog` are not CDS Alert.** They ignore app `ButtonStyle` and
   will never match RN’s custom modal. Ship a CDS Alert view for the RN component. Leave SwiftUI
   `.alert` for true system dialogs (not a CDS export).
4. **Typography roles still use `.cdsText(.title3)`** (and so on). Environment `.font` can only
   supply one default (body). Wrapping `CDSText("Hello")` is still wrong — it blocks `Text`
   concatenation, `AttributedString`, and `Label`.
5. **Gallery is the spec.** Show both the inherited default and the explicit variant override.
6. **Do not add a second sugar** (`.cdsButton(.primary)` that only forwards to `.buttonStyle`)
   unless Style discovery is proven painful.

If a **product app** wants `RetailPrimaryButton`, that wrapper lives in the app, not in CDS.

### Shipped call sites (copy these)

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

// CDS Alert (RN overlay) — custom view, not SwiftUI .alert
// Alert(title: "Delete wallet?", …)

// OS dialog only — not the CDS Alert component
.alert("Delete wallet?", isPresented: $show) {
    Button("Delete", role: .destructive) { }
    Button("Cancel", role: .cancel) { }
}
```

`CDSButtonLabel` is a **label helper**, not a Button wrapper. Skip it when the label is custom.

## Read RN for capability, not tree

From `packages/mobile/` (and shared bits in `packages/common/`):

- Take: variants, sizes, state (disabled, loading, error), a11y labels, animation **intent**,
  token names (`bgPrimary`, `space.x2`, `borderRadius.roundedFull`), and the **visual design**
  (padding, radius, chrome, pictogram, caret). That is the iOS spec.
- Leave: `Box`/`HStack` RN trees, `ThemeProvider` wrappers in every story, React `memo`/`useCallback`,
  web `className`/`styles`, Pressable-as-root, RN-only props (`testID` patterns that don't map).

Map tokens through `CDSTheme` (`@Environment(\.cdsTheme)`). Never hard-code hex, point sizes, or
UIColor that duplicates a token.

## Implement

1. Put code in `packages/cds-ios/Sources/Components/<Name>.swift`. Metrics-only helpers can live
   next to the style (see `buttonColors` / `buttonMetrics`) or in `Sources/Components/internal/`
   if shared.
2. Stay `internal`. No `public` on the component, Style, modifier, or variant enums until gallery +
   token tests exist **and** a human decides to stabilize.
3. Use `@Environment(\.cdsTheme)` and `@Environment(\.isEnabled)`. Do not take a `theme:` parameter
   on the Style unless a pure function needs it for tests.
4. Extract **pure mapping functions** (`buttonColors`, `toggleTrackColor`, `progressCircleDiameter`)
   so `Tests/CDSDesignSystemTests/ComponentStyleTests.swift` can lock token wiring without
   rendering.
5. Third-party (Lottie): wrap in a CDS type. Call sites never import `Lottie` for a CDS animation.
6. Accessibility: keep system traits from the HIG control. Don't replace `Button` with a `onTapGesture`
   `View` just to draw chrome — that's what `ButtonStyle.makeBody` is for.
7. Add a gallery section in `apps/ios-gallery/Sources/ComponentsGallery.swift` using the **real
   call site** (HIG control + Style, or the CDS view for overlays).
8. Tests: `yarn nx run cds-ios:test`. Then `yarn nx run cds-ios:build` if the gallery or package
   graph changed. Do not run unscoped `yarn test`.

## Anti-patterns

- `struct CDSButton: View` that takes `title` / `variant` and hides `SwiftUI.Button`
- Porting RN `Box` as `CDS.Box`
- Shipping SwiftUI `.alert` / `DisclosureGroup` / `.popover` as CDS Alert / Accordion / Tooltip
- Setting `.buttonStyle(.cds(.primary))` on `CDSThemeProvider` (filled primary on every Button)
- `public` components so the gallery compiles (use `@testable`)
- Copying Android composable names/APIs because "parity"
- Importing `Lottie` (or any library) from gallery or from a public CDS header
- Using `UIViewRepresentable` when a SwiftUI Style/modifier/view will do
- Making `CDSTextStyle` a `View` or `ViewModifier`

## Checklist

- [ ] Pattern chosen (Style / modifier / CDS view / SwiftUI API / skip)
- [ ] Visual matches RN (gallery vs RN/Figma); HIG analog used only if it already looks like RN
- [ ] No wrapper around Button / Toggle / Text / ProgressView
- [ ] Tokens via `CDSTheme`, pure mappers unit-tested
- [ ] Gallery shows the real call site
- [ ] `internal` visibility
- [ ] `yarn nx run cds-ios:test` passes
