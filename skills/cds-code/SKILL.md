---
name: cds-code
description: |
  Produces high quality Coinbase Design System (CDS) UI code for React and React Native.
  Use this skill whenever the task involves UI, CDS components, layouts, theming, styling,
  charts, or data visualization.
license: Apache-2.0
metadata:
  author: ruikun.hao@coinbase.com
  version: '1.0.1'
---

# CDS Code

Use this skill to produce CDS-first UI code that is accurate, composable, and aligned with the official docs.

## When to use

- Use when building or editing React or React Native UI with CDS components.
- Use when the task involves layouts, theming, styling, or design tokens.
- Use when working with charts, sparklines, or data visualization components.
- Use when refactoring UI to adopt CDS components.
- Do not use when the task has no UI or frontend component work.

## Prerequisites

- **CDS MCP server** must be connected for doc lookups via `list-cds-routes` and `get-cds-doc`.

---

## Part 1: Workflow -- what to do

This section describes the steps you follow, in order, when working on a UI task.

### Setup (once per session)

When this skill first loads, run these steps once so all later work is grounded in the docs:

1. **Discover installed CDS packages and platform.** Run the discovery script bundled with this skill:
   ```sh
   bash <path-to-skill>/scripts/discover-cds-packages.sh
   ```
   This prints the `CDS Runtime` (`web` or `mobile`), followed by every installed CDS package with its name, version, and valid export subpaths. Save this output -- you will use it to verify import paths and runtime throughout the session.
2. Call the CDS MCP tool `list-cds-routes` for the detected runtime to get the full route listing.
3. Read the platform-specific foundation docs with `get-cds-doc`:
   - `web/getting-started/styling.txt` (or `mobile/getting-started/styling.txt`)
   - `web/getting-started/theming.txt` (or `mobile/getting-started/theming.txt`)

You do not need to repeat these steps for every task -- once per session is enough.

### Step 1: Choose the right component

Follow this order:

1. Look for a CDS component that fits the need. Check the route listing and component guidance in Part 3.
2. If no CDS component fits, use a native platform element only when it is clearly the simplest correct choice.
3. Build custom UI only as a last resort.

### Step 2: Read the docs for that component

1. Find the component in the route listing you fetched during setup.
2. Read its doc with `get-cds-doc`.
3. Use the documented imports, props, examples, and composition patterns instead of guessing.

### Step 3: Write the code

Apply the code style rules from Part 2 below.

### Step 4: Verify visually

Do one visual verification pass before finishing. When rendering and inspection tooling are available:

1. Open the running app in a browser or simulator.
2. Navigate to the screen where your code changes are visible. The app landing page may not show your work -- infer the correct tab, dropdown selection, or route from the code you just edited and click through to reach it. If you cannot find the right screen after a reasonable attempt, ask the user to navigate to it in the browser for you and then continue verification from there.
3. Take a screenshot or visually inspect the rendered output.
4. Compare against the design intent -- check spacing, alignment, typography, color, and overflow.
5. If something looks off, fix the code and verify again.

Do not claim the UI looks correct based only on reading code or DOM structure. If the dev server is not running or inspection tooling is unavailable, ask the user to take a screenshot of the rendered UI and share it with you so you can verify visually. Do not skip verification silently.

> **Cursor example:** Use the built-in browser tools -- `browser_navigate` to open `http://localhost:8080` (or whatever port the local app runs on), then `browser_snapshot` to see the page structure and click through tabs or dropdowns to reach the right screen, then `browser_screenshot` to capture the rendered output for comparison.

### Step 5: Final checklist

Before returning code, confirm:

1. A CDS component was chosen whenever one exists.
2. Layout uses CDS primitives where practical.
3. Styling prefers StyleProps, tokens, and CSS variables over hardcoded values.
4. No `style` override duplicates a value that could be set via a component prop (e.g. `font`, `color`, `textAlign`, `textTransform`, `padding`, `gap`).
5. Imports and prop usage match the docs you just read.
6. Every CDS import path matches a valid export from the discovery script output (see "Verifying import paths" in Part 2).
7. Charts use the CDS visualization package for the target platform when CDS provides the needed visualization primitive.
8. The UI has gone through at least one visual verification pass when rendering and inspection tooling are available.

---

## Part 2: Code style -- how to write it

This section defines the coding preferences and patterns to follow when writing CDS code.

### Layout

Prefer CDS layout primitives over raw platform elements such as `div` and `span` on web or `View` and `Text` on mobile when they express the intent clearly:

- Use `Box` as the default container.
- Use `HStack` for horizontal layout and spacing.
- Use `VStack` for vertical layout and spacing.
- Use `Grid` when you need equal columns, repeated tracks, or true grid behavior.
- Use `Spacer` and `Divider` when they match the layout intent better than custom filler elements.

`Box`, `HStack`, and `VStack` should usually be your first choice for page and component structure. They encode CDS spacing, responsive props, and composition more reliably than ad hoc markup.

On web, remember that `Box` is not semantic by default. Use `as` and `role` when the container should behave like `main`, `section`, `aside`, `button`, or another semantic element.

### Styling

Prefer CDS StyleProps before custom styles:

- Reach for props like `gap`, `padding`, `margin`, `background`, `borderColor`, `borderRadius`, `alignItems`, and `justifyContent` first.
- Prefer responsive StyleProps over custom media queries when the component supports them.
- Prefer component variants and documented props before overriding styles manually.

Use semantic theme values:

- Prefer semantic color tokens such as `bg`, `bgAlternate`, `bgPrimary`, `fg`, `fgMuted`, and `fgPositive`.
- Prefer semantic `color` values over raw `spectrum` values. Raw spectrum colors should be a rare exception.
- Prefer CSS variables over hardcoded values when styling directly on web.

Examples:

- On web, prefer `marginTop: 'var(--space-0_5)'` over `marginTop: '4px'`.
- On web, prefer `borderRadius: 'var(--borderRadius-200)'` over `borderRadius: '8px'`.
- On mobile, prefer `marginTop: theme.space[0.5]` over `marginTop: 4`.
- On mobile, prefer `borderRadius: theme.borderRadius[200]` over `borderRadius: 8`.
- Prefer `<Box background="bgAlternate" padding={2} />` over a custom wrapper with hardcoded CSS.

### Avoiding unnecessary `style` overrides

Before adding any property to a `style` prop, check whether the component already exposes a dedicated prop or StyleProp for that value. Raw `style` overrides bypass the design system's built-in tokens, responsive behavior, and font stacks, which leads to subtle visual bugs.

**Read the component's prop table first.** Only reach for `style` when you have confirmed that no existing prop covers the value you need.

Common props that are frequently misused via `style` instead of the proper prop:

| Instead of `style`                                              | Use the prop                                       |
| --------------------------------------------------------------- | -------------------------------------------------- |
| `style={{ color: "var(--color-fgMuted)" }}`                     | `color="fgMuted"`                                  |
| `style={{ fontSize: 12, fontWeight: 500, lineHeight: "16px" }}` | `font="caption"` (or the matching CDS font token)  |
| `style={{ textAlign: "center" }}`                               | `textAlign="center"`                               |
| `style={{ textTransform: "uppercase" }}`                        | `textTransform="uppercase"`                        |
| `style={{ display: "flex", flexDirection: "column" }}`          | Use `VStack`, or `flexDirection="column"` on `Box` |
| `style={{ gap: 8 }}`                                            | `gap={1}`                                          |
| `style={{ padding: 16 }}`                                       | `padding={2}`                                      |
| `style={{ backgroundColor: "..." }}`                            | `background="bgAlternate"` (or semantic token)     |

**Why this matters:** When you set `font`, `color`, `textAlign`, or other typography properties through `style` instead of props, the component loses its connection to the CDS theme. For example, setting `fontSize` and `fontWeight` via `style` without a `font` prop means the CDS font family never applies -- the text falls back to `inherit` and may render in the wrong typeface.

Prefer:

```tsx
<Text font="caption" color="fgMuted" textAlign="center" textTransform="uppercase">
  Label
</Text>
```

Avoid:

```tsx
<Text
  style={{
    fontSize: 10,
    fontWeight: 500,
    lineHeight: '12px',
    textTransform: 'uppercase',
    textAlign: 'center',
    color: 'var(--color-fgMuted)',
  }}
>
  Label
</Text>
```

The second example bypasses the CDS font family entirely -- `Text` will inherit whatever font its parent has rather than using the CDS typeface.

**When `style` is appropriate:** Use `style` only for values that have no CDS prop equivalent, such as `cursor`, `transform`, `userSelect`, `letterSpacing`, or truly custom layout values like an exact pixel `height` that no spacing token matches. Even then, keep the prop-based values on the prop and only put the leftovers in `style`.

### Theme usage

Use `ThemeProvider` correctly at app boundaries and when nesting themes intentionally.

When you need runtime access to theme values, use `useTheme`. On web, prefer CSS variables when possible for better performance and simpler styling. Use `useTheme` when you truly need computed values in JavaScript or React Native styles.

Prefer theme-derived spacing, radius, typography, and colors over hardcoded numbers and strings.

### Verifying import paths

**This is critical.** Do not guess or memorize CDS import paths. The discovery script output is the source of truth.

Before writing or returning any CDS import, verify it against the export list from setup:

1. Find the CDS package for the target platform in the discovery script output.
2. Confirm the subpath you want to import is listed as a valid export.
3. If the subpath is not listed, it does not exist -- pick the closest valid export instead.

**The package name may vary between projects.** Different repos may install CDS under different scopes. Always use the package name reported by the discovery script, not a hardcoded scope. If the project already has CDS imports in existing code, match whatever scope those files use.

Common mistakes to avoid:

- Inventing deep subpaths like `<pkg>/layout/Box` or `<pkg>/buttons/Button` when the actual export is `<pkg>/layout` or `<pkg>/buttons`.
- Guessing a package scope when the project uses a different one.
- Assuming that the CDS docs examples use the same package name as the target project -- they may differ.

### Visualization and illustration

Treat visualization and illustration packages as part of the CDS-first workflow. If the task includes charts, sparklines, axes, scrubbers, pictograms, hero art, or spot illustrations, look for CDS visualization or CDS illustration components before reaching for custom SVG or bespoke assets.

When a design includes a chart, sparkline, axis, scrubber, or other data visualization:

1. Check CDS visualization docs first.
2. Prefer the CDS visualization package for the target platform when CDS provides the chart or primitive. The actual package name will appear in the discovery script output.
3. Scan routes first when the task is broad to see whether CDS already has a purpose-built visualization component before composing with lower-level primitives.
4. Use custom SVG, canvas, or drawing code only when the CDS visualization package clearly cannot achieve the required behavior or appearance in a reasonable way.

---

## Part 3: Reference

Quick-lookup information for component selection and package mapping.

### Package discovery

CDS packages are published under different scopes depending on the consuming project. **Do not hardcode a package scope.** Instead, rely on the discovery script output from setup, which detects the actual installed packages and their names.

The six CDS packages the script looks for (regardless of scope):

| Package suffix             | Purpose                              |
| -------------------------- | ------------------------------------ |
| `cds-web`                  | Standard web UI components           |
| `cds-mobile`               | Standard mobile UI components        |
| `cds-common`               | Shared types and utilities           |
| `cds-icons`                | Icon definitions and font files      |
| `cds-web-visualization`    | Web charts and data visualization    |
| `cds-mobile-visualization` | Mobile charts and data visualization |

For illustrations and pictograms, use the documented CDS component import paths for the target platform rather than guessing from the standalone package name.

The CDS MCP server exposes visualization and illustration docs through the same route listing as other CDS components. Do not assume that because a route is listed under `mobile/components/...` or `web/components/...` it maps one-to-one to a package name. Read the doc and use the documented import path, then verify against the discovery script output.

### Component selection guidance

Before composing custom UI from `Box` and `Text`, check whether CDS already provides a higher-level component for the job.

Common examples:

- Actions: `Button`, `IconButton`, `ButtonGroup`
- Inputs and selection: `TextInput`, `SearchInput`, `Select`, `Combobox`, `Checkbox`, `Radio`, `Switch`
- Layout and structure: `Box`, `HStack`, `VStack`, `Grid`, `PageHeader`, `SectionHeader`, `Sidebar`
- Feedback and status: `Banner`, `Toast`, `Spinner`, `ProgressBar`, `ProgressCircle`
- Data display: `Table`, `ListCell`, `ContentCell`, `DataCard`, `MessagingCard`
- Navigation and overlays: `Tabs`, `Dropdown`, `Modal`, `Alert`, `Tooltip`
- Visualization: `LineChart`, `AreaChart`, `BarChart`, `Sparkline`, `PeriodSelector`, `XAxis`, `YAxis`, `ReferenceLine`, `Point`, `Legend`, `Scrubber`
- Illustration and media: `Pictogram`, `HeroSquare`, `SpotIcon`, `SpotSquare`, `SpotRectangle`, `LogoMark`, `LogoWordMark`

Do not memorize this list as exhaustive. Use it as a reminder to check the docs before inventing custom markup.

### Code examples

In the examples below, `<cds-web>` is a placeholder for the actual package name reported by the discovery script.

Prefer:

```tsx
import { HStack, VStack } from '<cds-web>/layout';
import { Box } from '<cds-web>/layout';

<HStack gap={2} alignItems="center">
  <Box background="bgAlternate" padding={2} borderRadius={200} />
  <VStack gap={0.5} flexGrow={1} />
</HStack>;
```

Avoid:

```tsx
<div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
  <div style={{ background: '#f5f5f5', padding: 16, borderRadius: 8 }} />
  <div style={{ display: 'flex', flexDirection: 'column', rowGap: 4, flex: 1 }} />
</div>
```

Prefer:

```tsx
<Box background="bgAlternate" padding={2} borderRadius={200} />
```

Avoid:

```tsx
<div style={{ backgroundColor: '#f5f5f5', padding: '16px', borderRadius: '8px' }} />
```
