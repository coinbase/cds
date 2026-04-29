# CDS v9 Migration Guide

> A plain-markdown mirror of the [v9 Migration Guide on the docsite](https://github.com/coinbase/cds-staging/blob/master/apps/docs/docs/guides/v9-migration-guide.mdx). Use whichever rendering is most convenient.

## Table of Contents

- [Introduction](#introduction)
- [New Packages](#new-packages)
- [Migration Script](#migration-script)
- [Breaking Change Overview](#breaking-change-overview)
- [Package Install & Resolution](#package-install--resolution)
- [Visualization Package Consolidation](#visualization-package-consolidation)
- [TypeScript Type Changes](#typescript-type-changes)
- [Animation Library Migration](#animation-library-migration-react-spring--framer-motion--reanimated)
- [Migrator Transforms in Detail](#migrator-transforms-in-detail)
- [New Deprecations](#new-deprecations)
- [Removed APIs (Dropped Deprecations)](#removed-apis-dropped-deprecations)
- [Suggested Upgrade Order](#suggested-upgrade-order)
- [FAQ](#faq)

---

## Introduction

CDS v9 builds on the foundation laid in v8 and focuses on stability, modernization, and removing legacy implementation details that had leaked into the public API.

Highlights of this release:

- React 19 support on web (with backwards compatibility for React 18)
- React Native 0.81 / Expo SDK 54 support on mobile (see CMR v7)
- Hard-coded fixed heights/widths removed from all components — sizing is now layout/content-driven and themeable
- Visualization packages merged into `@coinbase/cds-web` and `@coinbase/cds-mobile` for simplicity
- Cleanup of legacy v7 import paths and unused deprecated APIs
- Migration off the unmaintained `react-spring` library begins (Stepper, SlideButton)

Most consumers will be able to upgrade with the help of `@coinbase/cds-migrator`. The remaining changes are small, scoped TypeScript and runtime adjustments documented below.

If you experience any trouble migrating, reach out via Slack.

---

## New Packages

The following packages are released as part of CDS v9:

- `@coinbase/cds-common@9.0.0`
- `@coinbase/cds-web@9.0.0`
- `@coinbase/cds-mobile@9.0.0`
- `@coinbase/cds-icons@6.0.0`
- `@coinbase/cds-illustrations@5.0.0`
- `@coinbase/cds-lottie-files@4.0.0`
- `@coinbase/cds-web-visualization@4.0.0` _(Deprecated — see below)_
- `@coinbase/cds-mobile-visualization@4.0.0` _(Deprecated — see below)_

The visualization packages will continue to receive updates until they are removed in CDS v10. New code should import from `@coinbase/cds-web/visualizations/*` and `@coinbase/cds-mobile/visualizations/*` (see [Visualization Package Consolidation](#visualization-package-consolidation)).

---

## Migration Script

We highly recommend starting with the automated migration script. The `@coinbase/cds-migrator` package handles the most common, repetitive transformations for the v8 → v9 upgrade.

### What the Migration Script Automates

Look for **🤖 Migration Script ✓** markers throughout this guide to identify changes that are handled automatically.

The following transforms ship in the `v8-to-v9` preset:

| Transform                       | What it does                                                                                                         |
| ------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| `button-variant-values`         | Remaps `Button` / `IconButton` `variant`: `"tertiary"` → `"inverse"`, `"foregroundMuted"` → `"secondary"`.           |
| `migrate-use-merge-refs-import` | Migrates `useMergeRefs` → `mergeRefs` and updates imports from `cds-common/hooks/useMergeRefs` → `cds-common/utils/mergeRefs`. |
| `migrate-layout-types-web`      | Moves `PositionStyles` from `cds-common` → `cds-web/styles/styleProps`; replaces `DimensionValue` with a local `string \| number \| 'auto'` alias. |
| `migrate-layout-types-mobile`   | Moves `PositionStyles` from `cds-common` → `cds-mobile/styles/styleProps`; rewires `DimensionValue` to `react-native`'s `DimensionValue`. |
| `migrate-visualization-imports` | Rewrites `@coinbase/cds-(web\|mobile)-visualization/*` imports to `@coinbase/cds-(web\|mobile)/visualizations/*`.   |

### Running the Script

```bash
# Preview all changes (recommended first step)
npx @coinbase/cds-migrator ./src -p v8-to-v9 --dry-run

# Review the generated migration.log
cat migration.log

# Apply the migration
npx @coinbase/cds-migrator ./src -p v8-to-v9
```

You can also run a single transform:

```bash
npx @coinbase/cds-migrator ./src -t button-variant-values --dry-run
```

The migrator records what it has already run in `.cds-migration-history.json` (commit this file) and will leave `// TODO` comments in the source for cases that need manual review (for example, dynamic `variant` expressions).

See the [migrator README](../README.md) for the full CLI reference.

### What Requires Manual Migration

The following changes are **not** automated and need manual attention. Each is covered in detail below:

- Removing `cds-web/v7` and `cds-mobile/v7` imports (you must finish your v8 migration first)
- Adding `react-dom` to your app's `dependencies` if you used it transitively through CDS
- Tightening some TypeScript types (`Carousel`, `Drawer`, `Tray`, `Modal`, `TableCell.end`, etc.)
- Updating custom Stepper progress UIs and `SlideButton` slot components to use Reanimated / `framer-motion` instead of `react-spring`

---

## Breaking Change Overview

### Packages & Imports

- **v7 import paths dropped** — `@coinbase/cds-web/v7` and `@coinbase/cds-mobile/v7` are no longer bundled. Apps must finish their CDS 8 migration before upgrading to v9.
- **`react-dom` no longer a peer dependency of `@coinbase/cds-common`** — declare it explicitly in your app if you use the DOM.
- **Visualization packages merged** — deep paths on `@coinbase/cds-(web|mobile)-visualization` may no longer resolve. Use the new `@coinbase/cds-(web|mobile)/visualizations/*` exports.

### Animation Library Updates

- **Stepper** — `progress` in custom step/progress UIs is now a `number` (0–1) instead of a `react-spring` value. Use `progressTimingConfig` / `defaultProgressTimingConfig` for built-in animation.
- **SlideButton (mobile)** — Custom `SlideButtonBackgroundComponent` / `SlideButtonHandleComponent` slots receive `progress` as a Reanimated `SharedValue<number>` instead of `react-spring`'s `SpringValue<number>`. `animationConfig` on `DefaultSlideButtonHandle` is deprecated; use `slideButtonSpringConfig` with `withSpring` instead. SlideButton also applies new default heights (40 compact / 56 regular).

### TypeScript Type Changes

- **`CarouselItemRenderChildren`** (web + mobile) — Now `(props) => ReactNode` instead of `React.FC`.
- **`DrawerRenderChildren`** (mobile) and **`TrayRenderChildren`** (web + mobile) — Now `(props) => ReactNode` instead of `React.FC`.
- **`Modal`** (web) — Render-prop children is `(props) => React.ReactNode` instead of `FC`.
- **`TableCell.end`** and alpha **`SelectOptionGroupProps.accessory`** — Now `React.ReactElement<CellAccessoryProps>`.
- **`SearchInput` / `BrowserBarSearchInput` / `TextInput` / `DateInput`** (mobile) — `onFocus` / `onBlur` use `FocusEvent` / `BlurEvent` instead of `NativeSyntheticEvent<TextInputFocusEventData>`.

### Hard-Coded Dimensions Removed

CDS v9 removes hard-coded fixed heights and widths from all components. Components are now driven by their content, your layout, or theme tokens. As a side effect, several constants and utilities that exposed those fixed pixel values are deprecated (see [New Deprecations](#new-deprecations)).

### Dropped (Removed) Deprecations

The following APIs were deprecated in v8 and have been removed in v9 because Sourcegraph showed no remaining customer usage. If your codebase still references them, replace them before upgrading:

- `emptyObject`
- `AnnouncementCardProps` (web + mobile)
- `FeatureEntryCardProps` (web + mobile)
- `RadioGroupProps` (web + mobile)
- `CheckboxGroupProps` (web + mobile)
- `FeedCardProps` (web + mobile)
- `StickyFooterProps` (common)
- `LinearGradient#isBelowChildren`
- `IconCounterButton#iconSize` (web + mobile)

For all remaining active deprecations, the CDS team will provide migrators / agents ahead of CDS v10.

---

## Package Install & Resolution

### Drop v7 Import Paths

CDS v9 no longer bundles the v7 compatibility layer that was accessible under `cds-web/v7` and `cds-mobile/v7`. These paths existed to enable an incremental migration to CDS 8.

**Steps:**

1. Search your codebase for any remaining `@coinbase/cds-web/v7` / `@coinbase/cds-mobile/v7` imports.
2. Migrate each call site to the modern v8 API by following the v8 Migration Guide.
3. Once all v7 imports are gone, you can upgrade to v9.

```tsx
// ❌ Before (still on v8 with incremental migration)
import { Button } from '@coinbase/cds-web/v7/buttons/Button';

// ✅ After (must complete before upgrading to v9)
import { Button } from '@coinbase/cds-web/buttons/Button';
```

### Declare `react-dom` Explicitly

In v9, `@coinbase/cds-common` no longer lists `react-dom` as a peer dependency. If your app uses the DOM and relied on `react-dom` being pulled in transitively through CDS, declare it directly:

```json
{
  "peerDependencies": {
    "react-dom": "^18.0.0 || ~19.1.2"
  },
  "dependencies": {
    "react-dom": "19.1.2"
  }
}
```

### React 19 / React Native 0.81

- **Web** — `@coinbase/cds-web` now supports React 19 while keeping React 18 compatibility. Both are accepted in `peerDependencies`.
- **Mobile** — `@coinbase/cds-mobile` targets React Native `~0.81.5` and Expo SDK 54. See **CMR v7** for the full set of updated peer dependencies (`react-native-reanimated@4.1.1`, `react-native-gesture-handler@2.28.0`, `react-native-safe-area-context@5.6.0`, etc.).

---

## Visualization Package Consolidation

> 🤖 **Migration Script ✓** — handled by `migrate-visualization-imports`

The standalone visualization packages are now shipped as sub-paths of the main packages. The standalone packages are deprecated and will be removed in CDS v10.

| Old import path                                | New import path                                 |
| ---------------------------------------------- | ----------------------------------------------- |
| `@coinbase/cds-web-visualization`              | `@coinbase/cds-web/visualizations`              |
| `@coinbase/cds-web-visualization/chart`        | `@coinbase/cds-web/visualizations/chart`        |
| `@coinbase/cds-web-visualization/sparkline`    | `@coinbase/cds-web/visualizations/sparkline`    |
| `@coinbase/cds-web-visualization/<deep>`       | `@coinbase/cds-web/visualizations/<deep>`       |
| `@coinbase/cds-mobile-visualization`           | `@coinbase/cds-mobile/visualizations`           |
| `@coinbase/cds-mobile-visualization/chart`     | `@coinbase/cds-mobile/visualizations/chart`     |
| `@coinbase/cds-mobile-visualization/sparkline` | `@coinbase/cds-mobile/visualizations/sparkline` |
| `@coinbase/cds-mobile-visualization/<deep>`    | `@coinbase/cds-mobile/visualizations/<deep>`    |

```tsx
// ❌ Before (v8)
import { Chart } from '@coinbase/cds-web-visualization/chart';
import { Sparkline } from '@coinbase/cds-mobile-visualization/sparkline';

// ✅ After (v9)
import { Chart } from '@coinbase/cds-web/visualizations/chart';
import { Sparkline } from '@coinbase/cds-mobile/visualizations/sparkline';
```

After running the `migrate-visualization-imports` codemod, remove the standalone packages from your `package.json`:

```bash
yarn remove @coinbase/cds-web-visualization @coinbase/cds-mobile-visualization
```

> **Note:** The standalone packages are still published in v9 to support gradual migration, but are marked `@deprecated` and will be removed in CDS v10.

---

## TypeScript Type Changes

A handful of types were tightened to better reflect actual runtime behavior. These changes are source-compatible at runtime but may surface as TypeScript errors when you upgrade.

### `CarouselItemRenderChildren`

**Affects:** `@coinbase/cds-web`, `@coinbase/cds-mobile`

The render-children type for `Carousel` is now a function returning `ReactNode`, not a `React.FC`. Drop any `React.FC` typing from custom render functions.

```tsx
// ❌ Before (v8)
import type { CarouselItemRenderChildren } from '@coinbase/cds-web/carousel/Carousel';
const renderItem: CarouselItemRenderChildren = (props) => <Item {...props} />;
// previously equivalent to React.FC<...>

// ✅ After (v9)
import type { CarouselItemRenderChildren } from '@coinbase/cds-web/carousel/Carousel';
const renderItem: CarouselItemRenderChildren = (props) => <Item {...props} />;
// now equivalent to (props) => ReactNode
```

If you were destructuring `displayName`, `defaultProps`, or other `React.FC` static properties, move them to a regular function component declared separately.

### `DrawerRenderChildren` & `TrayRenderChildren`

**Affects:** `Drawer` (mobile), `Tray` (web + mobile)

Same shape change as `CarouselItemRenderChildren` — `(props) => ReactNode` instead of `React.FC`.

```tsx
// ✅ After (v9)
const renderTray: TrayRenderChildren = (props) => <MyTrayContent {...props} />;
```

### `Modal` Render-Prop Children (Web)

```tsx
// ❌ Before (v8)
const children: React.FC<ModalChildrenProps> = (props) => <ModalBody {...props} />;
<Modal>{children}</Modal>;

// ✅ After (v9)
const children = (props: ModalChildrenProps): React.ReactNode => <ModalBody {...props} />;
<Modal>{children}</Modal>;
```

### `TableCell.end` and `SelectOptionGroupProps.accessory`

**Affects:** `@coinbase/cds-web`

Both now require `React.ReactElement<CellAccessoryProps>`. Tighten the elements you pass so TypeScript accepts them — typically by passing one of the built-in cell accessory components instead of an arbitrary node.

```tsx
// ❌ Before (v8) — was previously typed as ReactNode
<TableCell end={<div>123</div>} />

// ✅ After (v9)
import { CellTextAccessory } from '@coinbase/cds-web/cells';
<TableCell end={<CellTextAccessory text="123" />} />
```

### Mobile Input `onFocus` / `onBlur` Event Types

**Affects:** `SearchInput`, `BrowserBarSearchInput`, `TextInput`, `DateInput` in `@coinbase/cds-mobile`

These handlers now use Reanimated-friendly `FocusEvent` / `BlurEvent` types. Update local handler signatures if you previously typed them as `NativeSyntheticEvent<TextInputFocusEventData>`.

```tsx
// ❌ Before (v8)
import type { NativeSyntheticEvent, TextInputFocusEventData } from 'react-native';
const onFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
  /* ... */
};

// ✅ After (v9)
import type { FocusEvent } from '@coinbase/cds-mobile';
const onFocus = (e: FocusEvent) => {
  /* ... */
};
```

In most cases, removing the explicit type annotation and letting TypeScript infer it from the prop is the simplest fix.

---

## Animation Library Migration (`react-spring` → `framer-motion` + Reanimated)

CDS is migrating off `react-spring`, which is poorly maintained and has been the source of recurring bugs. The implementation detail leaked into the public API of two components — `Stepper` and `SlideButton` — and v9 fixes that ahead of an eventual `react-spring` removal.

### Stepper

**Affects:** `@coinbase/cds-web`, `@coinbase/cds-mobile`

If you supply a custom step / progress UI to `Stepper`, the `progress` prop is now a plain `number` between `0` and `1` instead of a `react-spring` value. For built-in progress animation, configure timing via the new `progressTimingConfig` / `defaultProgressTimingConfig` props. The legacy `progressSpringConfig` prop is ignored on this animation path.

```tsx
// ❌ Before (v8) — progress was a SpringValue<number>
const CustomProgress = ({ progress }: { progress: SpringValue<number> }) => (
  <animated.div style={{ width: progress.to((p) => `${p * 100}%`) }} />
);

// ✅ After (v9) — progress is a number between 0 and 1
const CustomProgress = ({ progress }: { progress: number }) => (
  <div style={{ width: `${progress * 100}%` }} />
);

// Built-in animation timing
<Stepper
  progressTimingConfig={{ duration: 0.4, ease: 'easeInOut' }}
  // progressSpringConfig is ignored in v9
/>;
```

### SlideButton (Mobile)

**Affects:** `@coinbase/cds-mobile`

Custom `SlideButtonBackgroundComponent` and `SlideButtonHandleComponent` slots now receive `progress` as a Reanimated `SharedValue<number>` instead of a `react-spring` `SpringValue<number>`. Any custom slot that drove animation with spring helpers must switch to Reanimated.

```tsx
// ❌ Before (v8)
import { SpringValue } from '@react-spring/native';
const BackgroundComponent = ({ progress }: { progress: SpringValue<number> }) => {
  // animated.View, react-spring helpers...
};

// ✅ After (v9)
import Animated, { useAnimatedStyle, type SharedValue } from 'react-native-reanimated';

const BackgroundComponent = ({ progress }: { progress: SharedValue<number> }) => {
  const style = useAnimatedStyle(() => ({ opacity: progress.value }));
  return <Animated.View style={style} />;
};
```

**Spring config:** `animationConfig` on `DefaultSlideButtonHandle` is deprecated. Use `slideButtonSpringConfig` together with Reanimated's `withSpring`.

**Layout:** `SlideButton` now applies default heights (`40` for compact, `56` for regular) and derives the handle's `minWidth` from `height`. If you previously omitted `height` and relied on the old interactable-height + spring-driven sizing, double-check the rendered layout — you may need to set `height` explicitly to preserve v8 behavior.

---

## Migrator Transforms in Detail

The following sections walk through the transforms that the CLI applies so you know what to expect (and how to apply each manually if you need to).

### Button `variant` values

> 🤖 **Migration Script ✓** — handled by `button-variant-values`

**Affects:** `Button`, `IconButton` from `@coinbase/cds-web/buttons` and `@coinbase/cds-mobile/buttons` (and deeper paths).

| v8 value            | v9 value      |
| ------------------- | ------------- |
| `"tertiary"`        | `"inverse"`   |
| `"foregroundMuted"` | `"secondary"` |

```tsx
// ❌ Before (v8)
<Button variant="tertiary">Tap</Button>
<IconButton variant="foregroundMuted" name="bell" />

// ✅ After (v9)
<Button variant="inverse">Tap</Button>
<IconButton variant="secondary" name="bell" />
```

The codemod only rewrites string literal values. **Dynamic expressions** (e.g. `variant={someVar}`) get a `// TODO` comment so you can audit them by hand:

```tsx
// TODO: Button variant values changed in v9: "tertiary" is now "inverse",
// "foregroundMuted" is now "secondary". Check if this dynamic value needs updating.
<Button variant={dynamicVariant}>...</Button>
```

> **Why?** v9 reclaims the `tertiary` name for a new semantic meaning, and `foregroundMuted` was deprecated in v8 along with the matching color token.

### `useMergeRefs` → `mergeRefs`

> 🤖 **Migration Script ✓** — handled by `migrate-use-merge-refs-import`

The `useMergeRefs` hook was always identical at runtime to a regular `mergeRefs` function. v9 makes the API match: import `mergeRefs` from `@coinbase/cds-common/utils/mergeRefs`. The `hooks/useMergeRefs` re-export still works in v9 but is `@deprecated` and will be removed in v10.

```tsx
// ❌ Before (v8)
import { useMergeRefs } from '@coinbase/cds-common/hooks/useMergeRefs';
const ref = useMergeRefs(refA, refB);

// ✅ After (v9)
import { mergeRefs } from '@coinbase/cds-common/utils/mergeRefs';
const ref = mergeRefs(refA, refB);
```

The codemod handles:

- Import / export specifier rewrites (including `as` aliases and `export { useMergeRefs } from …`)
- Module path strings (e.g. inside Jest mocks)
- Call-site renames where the file already participates in a CDS `mergeRefs` migration
- Consolidating multiple imports from the same `utils/mergeRefs` module

### Layout Types (`PositionStyles`, `DimensionValue`)

> 🤖 **Migration Script ✓** — handled by `migrate-layout-types-web` / `migrate-layout-types-mobile`

`PositionStyles` and `DimensionValue` were exported from `@coinbase/cds-common`, but their meanings differ on web vs mobile. v9 makes them platform-specific.

**Web:**

```tsx
// ❌ Before (v8)
import type { PositionStyles, DimensionValue } from '@coinbase/cds-common';

// ✅ After (v9)
import type { PositionStyles } from '@coinbase/cds-web/styles/styleProps';
type DimensionValue = string | number | 'auto';
```

The web codemod inserts a local `type DimensionValue = string | number | 'auto'` alias matching the previous common-package union.

**Mobile:**

```tsx
// ❌ Before (v8)
import type { PositionStyles, DimensionValue } from '@coinbase/cds-common';

// ✅ After (v9)
import type { PositionStyles } from '@coinbase/cds-mobile/styles/styleProps';
import type { DimensionValue } from 'react-native';
```

> **Heads up:** React Native's `DimensionValue` is a slightly different union than the old common one. Review any usages that relied on `'auto'` or other CDS-specific values to make sure the constraint still matches.

### Visualization Imports

> 🤖 **Migration Script ✓** — handled by `migrate-visualization-imports`

Covered in detail in [Visualization Package Consolidation](#visualization-package-consolidation).

---

## New Deprecations

The following APIs are **still available in v9** but are scheduled for removal in CDS v10. Migrators and/or AI agents will be released following the v9 launch to help with each. You can also start migrating manually using the guidance below.

### Packages

- **`@coinbase/cds-web-visualization`** — Use `@coinbase/cds-web/visualizations/{chart,sparkline}` instead. Remove the dependency once your imports are migrated.
- **`@coinbase/cds-mobile-visualization`** — Use `@coinbase/cds-mobile/visualizations/{chart,sparkline}` instead. Remove the dependency once your imports are migrated.

### Components

- **`AvatarButton`** (web + mobile) — Border-related props have no effect; remove them.
- **`IconCounterButton`** (web + mobile) — `dangerouslySetColor` is deprecated; use `style` / `className` (web) or theme-driven props.
- **`Spinner`** (web + mobile) — Prefer indeterminate `ProgressCircle` (and `ActivityIndicator` on mobile where documented).
- **`Stepper` spring exports** (web + mobile) — Use `progressTimingConfig` / `defaultProgressTimingConfig`.
- **`Text#dangerouslySetColor`** (web + mobile) — Use `style`, `className`, or `color` instead.
- **Individual Text components** — `TextBody`, `TextCaption`, `TextDisplay1`, `TextDisplay2`, `TextDisplay3`, `TextHeadline`, `TextInherited`, `TextLabel1`, `TextLabel2`, `TextLegal`, `TextTitle1`, `TextTitle2`, `TextTitle3`, `TextTitle4`. Use `Text` with the matching `font`:

  ```tsx
  // ❌ Before
  <TextBody>Hello</TextBody>

  // ✅ After
  <Text as="p" font="body">Hello</Text>
  ```

- **`DefaultSlideButtonHandle` / `SlideButton#animationConfig`** (mobile) — Use `slideButtonSpringConfig` with Reanimated `withSpring`.

### Hooks & Functions

- **`getButtonSpacingProps`** (`@coinbase/cds-common`) — Going away without a built-in replacement. Handle button spacing locally or with your own helper.
- **`getDotSize`** (`@coinbase/cds-common`) — Fixed pixel sizing for dots is no longer provided as a shared helper.
- **`useMergeRefs`** (`@coinbase/cds-common/hooks/useMergeRefs` re-export) — Use `mergeRefs` from `@coinbase/cds-common/utils/mergeRefs` (automated by `migrate-use-merge-refs`).
- **`usePopper`** (`@coinbase/cds-web`) — Temporary compatibility shim. Use Floating UI directly in your app if you still need popper-like positioning.
- **`useStatusBarHeight`** (`@coinbase/cds-mobile`) — Use `useSafeAreaInsets().top` from `react-native-safe-area-context`.
- **`useHasNotch`** (`@coinbase/cds-mobile`) — Outdated device heuristic. Replace with `useSafeAreaInsets().top > 20` from `react-native-safe-area-context` if you need an equivalent.

### Tokens & Constants

The following tokens were fixed pixel values that pin component sizing. With v9 removing hard-coded heights/widths, they are no longer published. Define your own values or rely on layout-driven sizing.

- **`compactListHeight`** (`@coinbase/cds-common`)
- **`listHeight`** (`@coinbase/cds-common`)
- **`selectOptionHeight`** (`@coinbase/cds-common`)
- **`dotSizeTokens`** (`@coinbase/cds-common`)

### Types

- **`Banner`** (web + mobile) — Type alias removed; use `BannerProps`.
- **`BoxBaseProps` position-related JSDoc** (`@coinbase/cds-common`) — Prefer `PositionStyles` from mobile `styleProps` (or web `styleProps`) where the guidance applies.
- **`ButtonBaseProps` `foregroundMuted`** (`@coinbase/cds-common`) — Use `secondary` (handled by `button-variant-values`).
- **`CardHeaderProps`** (`@coinbase/cds-common`) — Use `ContentCardHeaderProps` for content cards.
- **`CardMediaProps`** (`@coinbase/cds-common`) — Use `SpotSquare`, `Pictogram`, or `RemoteImage` by type, per JSDoc.
- **`CarouselItemRenderChildren`** (web + mobile) — Type shape updated (function returning `React.ReactNode`); adjust typings if you referenced the old type.
- **`DimensionStyles`** and related dimension value types (`@coinbase/cds-common`) — Prefer dimension props with `'auto' | number | string`.
- **`LottieStatus` / `LottieStatusAnimation*Props`** (common re-exports) — Use `LottieStatus` from `@coinbase/cds-common/types/LottieStatus` and platform `LottieStatusAnimation*Props` from `@coinbase/cds-web` or `@coinbase/cds-mobile`.
- **`Position`** (`@coinbase/cds-common`) — Use `CSSProperties['position']` (web) or `ViewStyle['position']` (RN).

---

## Removed APIs (Dropped Deprecations)

The following APIs were `@deprecated` in v8 and are **fully removed** in v9. Audit your codebase before upgrading — these removals are not automated by the migrator because customer usage was zero on internal Sourcegraph searches.

| Removed API                                 | Replacement                                                                          |
| ------------------------------------------- | ------------------------------------------------------------------------------------ |
| `emptyObject`                               | Define your own `const empty = {}` (or use `Object.freeze({})`).                     |
| `AnnouncementCardProps` (web + mobile)      | Use the `MessagingCard` props or your own composition.                               |
| `FeatureEntryCardProps` (web + mobile)      | Compose with `ContentCard` / `MessagingCard`.                                        |
| `RadioGroupProps` (web + mobile)            | Use the component-derived props directly: `React.ComponentProps<typeof RadioGroup>`. |
| `CheckboxGroupProps` (web + mobile)         | Use `React.ComponentProps<typeof CheckboxGroup>`.                                    |
| `FeedCardProps` (web + mobile)              | Compose with `ContentCard`.                                                          |
| `StickyFooterProps` (common)                | Use `PageFooter` props directly.                                                     |
| `LinearGradient#isBelowChildren`            | Achieve layering with explicit `zIndex` / stacking.                                  |
| `IconCounterButton#iconSize` (web + mobile) | Size is now derived from the icon and the button — remove the prop.                  |

---

## Suggested Upgrade Order

A typical v8 → v9 upgrade looks like this:

1. **Make sure you're fully on v8.** Remove any remaining `cds-web/v7` / `cds-mobile/v7` imports.
2. **Audit removed deprecations.** Search for the APIs in [Removed APIs](#removed-apis-dropped-deprecations) and migrate any usages.
3. **Bump CDS packages** to v9 in your `package.json` and reinstall.
4. **Add `react-dom` explicitly** (web apps) and update mobile peer dependencies for RN 0.81 / Expo SDK 54.
5. **Run the migrator in dry-run mode** to preview changes:

   ```bash
   npx @coinbase/cds-migrator ./src -p v8-to-v9 --dry-run
   ```

6. **Apply the migrator:**

   ```bash
   npx @coinbase/cds-migrator ./src -p v8-to-v9
   ```

7. **Resolve any TODO comments** the migrator left behind (typically dynamic Button `variant` expressions).
8. **Update Stepper / SlideButton custom slots** to use the new `number` / `SharedValue<number>` `progress` API.
9. **Tighten TypeScript types** that the compiler now flags (`Carousel`, `Drawer`, `Tray`, `Modal`, `TableCell.end`, mobile input `onFocus` / `onBlur`).
10. **Run your full type-check, test, and visual regression suites.**
11. **Plan ahead for v10** — start migrating the [New Deprecations](#new-deprecations) using the migrators / agents we'll publish following the v9 release.

---

## FAQ

### Why upgrade to v9?

CDS v9 modernizes the runtime story:

- React 19 + React Native 0.81 / Expo SDK 54 support
- Removes hard-coded fixed dimensions so components actually respect your layout and theme
- Consolidates the visualization packages into the main packages (one fewer dependency)
- Cleans up legacy v7 imports, unused deprecations, and `react-spring` API leakage
- Comes with a migrator preset that handles the most repetitive changes for you

### Are migration scripts available?

Yes. `@coinbase/cds-migrator` ships with a `v8-to-v9` preset covering button variants, `useMergeRefs`, layout types, and visualization imports. See the [Migration Script](#migration-script) section above and the [migrator README](../README.md) for the full CLI reference.

### Can I run the migrator one transform at a time?

Yes:

```bash
npx @coinbase/cds-migrator ./src -t button-variant-values
npx @coinbase/cds-migrator ./src -t migrate-use-merge-refs-import
npx @coinbase/cds-migrator ./src -t migrate-layout-types-web
npx @coinbase/cds-migrator ./src -t migrate-layout-types-mobile
npx @coinbase/cds-migrator ./src -t migrate-visualization-imports
```

The migrator records what's been run in `.cds-migration-history.json` (commit this file) so you don't accidentally re-run a transform.

### What about CDS v10?

Most active deprecations are scheduled for removal in CDS v10. We'll publish migrators / agents for each one ahead of that release. The list of new deprecations introduced in v9 is in [New Deprecations](#new-deprecations).

### Where do I get help?

If something doesn't migrate cleanly, reach out via Slack — we're happy to help and to fold common cases back into the migrator.
