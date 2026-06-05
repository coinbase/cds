# CDS component selection guide

For full prop and type details, refer to the CDS component docs and TypeScript definitions; this guide is for _choosing_ components and patterns.

When the user describes a UI need, reach for these first:

| Need                            | Use                                                                |
| ------------------------------- | ------------------------------------------------------------------ |
| Page or section title           | `Text` with `font="title1"` – `font="title4"`                      |
| Body copy                       | `Text` with `font="body"`                                          |
| Muted helper text               | `Text` with `font="body"` and `color="fgMuted"`                    |
| Submit / confirm action         | `Button variant="primary"`                                         |
| Cancel / close action           | `Button variant="secondary"`                                       |
| Destructive action              | `Button variant="negative"`                                        |
| Icon-only action                | `IconButton`                                                       |
| Single-line input               | `TextInput`                                                        |
| Dropdown                        | `Select`                                                           |
| Autocomplete / typeahead        | `Combobox`                                                         |
| Filter chip with options        | `SelectChip`                                                       |
| On/off toggle                   | `Switch`                                                           |
| Multi-select boxes              | `Checkbox` inside `ControlGroup role="group"`                      |
| Mutually exclusive options (≤5) | `SegmentedTabs` or `Radio` inside `ControlGroup role="radiogroup"` |
| Mutually exclusive options (>5) | `Select`                                                           |
| Chip-style tabs                 | `TabbedChips` (deep import)                                        |
| Confirm dialog                  | `Modal` + `ModalFooter`                                            |
| Mobile bottom sheet             | `Tray`                                                             |
| Anchored interactive panel      | `Popover`                                                          |
| Hover hint                      | `Tooltip`                                                          |
| Transient success/error         | `useToast().show(...)`                                             |
| Inline page-level alert         | `Banner`                                                           |
| Inline informational note       | `Banner variant="informational"` or `Box` with text                |
| Settings/menu row               | `ListCell`                                                         |
| Tabular data                    | `Table`                                                            |
| Standard card                   | `ContentCard`                                                      |
| Card with media                 | `MediaCard`                                                        |
| In-product messaging card       | `MessagingCard`                                                    |
| Data summary / metric card      | `DataCard`                                                         |
| Loading placeholder shape       | `Fallback`                                                         |
| Indeterminate spinner           | `<ProgressCircle indeterminate />`                                 |
| Determinate circular progress   | `ProgressCircle` with `progress`                                   |
| Determinate linear progress     | `ProgressBar` with `progress`                                      |
| Status pill / label             | `Tag`                                                              |
| User photo                      | `Avatar`                                                           |

Use the detailed sections below only when you need clarification; they intentionally avoid full prop API dumps and focus on **when/why** to pick a component plus key gotchas.

---

## Categories

1. [Layout](#1-layout)
2. [Typography](#2-typography)
3. [Buttons & Actions](#3-buttons--actions)
4. [Form Inputs](#4-form-inputs)
5. [Overlays](#5-overlays)
6. [Lists, Tables & Cards](#6-lists-tables--cards)
7. [Feedback & Status](#7-feedback--status)
8. [Navigation](#8-navigation)
9. [Media & Decoration](#9-media--decoration)
10. [Visualization](#10-visualization)

---

## 1. Layout

### `Box`

- **What it is:** Polymorphic layout primitive for flex/grid and simple block layouts.
- **Use when:** You need one‑off layout or styling that doesn’t fit a more specific component.
- Avoid `marginX="auto"` (not supported) — center with `justifyContent="center"` on the parent or `alignSelf="center"` on the child.

### `VStack` / `HStack`

- **What they are:** Vertical and horizontal flex stacks — thin wrappers around `Box` with a fixed flex direction.
- **Use when:** You’re just stacking items with consistent spacing.
- Prefer these over `Box` when the intent is purely vertical/horizontal stacking.
- They accept **all the same layout props as `Box`** (padding, gap, background, borderRadius, etc.) — so never wrap `<Box paddingX={2}><VStack>` when you can just write `<VStack paddingX={2}>`.

### `Divider`

- Horizontal or vertical rule to separate content.

### `Spacer`

- Empty box to push siblings apart inside flex layouts.
- Prefer using `gap` on the parent; use `Spacer` only when you need explicit flexible space.

### Responsive props

- Layout props accept responsive objects directly, e.g.:
  - `<VStack gap={{ phone: 1, tablet: 2, desktop: 3 }} />`

---

## 2. Typography

- Use the generic **`Text`** component with a `font` prop for all text rendering — do **not** use the derivative shorthand components (`TextTitle1`, `TextTitle2`, `TextTitle3`, `TextTitle4`, `TextHeadline`, `TextBody`, `TextLabel1`, `TextLabel2`, etc.). Those are v7 patterns.
- The `font` prop accepts CDS type-scale tokens: `"title1"` – `"title4"`, `"headline"`, `"body"`, `"label1"`, `"label2"`, `"caption"`, etc.
- For muted/secondary text, use `color="fgMuted"` (not `"foregroundMuted"`).
- `Text` is polymorphic via `as` and supports common text props (`color`, `textAlign`, `textTransform`, etc.).

**Example:**

```tsx
<Text font="title3">Display Name</Text>
<Text font="body" color="fgMuted">user@example.com</Text>
```

---

## 3. Buttons & Actions

### `Button`

- Primary click target for actions.
- **Use for:** Submits, primary/secondary/negative actions, full‑width CTAs (`block`).
- **Key details:**
  - Uses `onClick` (not `onPress`).
  - `compact` is the size control; there is no generic `size` prop.

### `IconButton`

- Icon‑only action.
- **Use for:** Small, compact icon actions (close, edit, settings, etc.).
- **Key details:**
  - **Requires** an `accessibilityLabel` describing the action.

### `ButtonGroup`

- Wrap multiple `Button`s for consistent spacing/alignment within a region (e.g., modal footers, form actions).

---

## 4. Form Inputs

Focus on **which input** to pick, not the full event/value API.

### `TextInput`

- Single‑line text field.
- **Use for:** Freeform text, email, password, numeric, phone, URL, etc.
- For error states, rely on variants + helper text rather than a dedicated `errorText` prop.

### `Select`

`import { Select } from "@coinbase/cds-web/alpha/select";`

- Dropdown for **single** or **multi** selection from a finite option set.
- **Use for:**
  - Mutually exclusive options when there are many values (>5).
  - Multi‑select of structured options.
- Uses an array of `{ value, label, disabled? }` options rather than JSX children.

### `Combobox`

`import { Combobox } from "@coinbase/cds-web/alpha/combobox";`

- Autocomplete / typeahead control.
- **Use when:** The user types to filter a relatively long list of options.

### `SelectChip`

`import { SelectChip } from "@coinbase/cds-web/alpha/select-chip";`

- Filter chip that opens a dropdown of options.
- **Use when:** You want a compact, chip‑style filter control (e.g., filtering lists/tables).

### `Switch`

- On/off toggle.
- **Use for:** Single boolean settings.

### `Checkbox` + `ControlGroup`

- **Use** `Checkbox` for independent toggles or lists of multi‑select items.
- Group multiple checkboxes inside `ControlGroup role="group"` when they belong together.

### `Radio` + `ControlGroup`

- **Use for:** Mutually exclusive options where each option is always visible.
- Wrap radios in `ControlGroup role="radiogroup"`.

### `SegmentedTabs`

- Tab‑style picker for 2–5 mutually exclusive options (a more compact alternative to radios).

### `DateInput` / `DatePicker`

- Date inputs where the value is an ISO string and selection semantics matter.
- Use when users must pick specific calendar dates, not just arbitrary strings.

### `Slider`

- Numeric range selector or single value on a continuum.
- Use when dragging a handle is more intuitive than typing numbers.

### `SearchInput`

- Preset `TextInput` variant with search icon and clear button.
- Use for primary search bars and filter/search fields.

### Form composition helpers

- `Field`: Wraps any input with label + helper/error text.
- `FieldLabel`, `FieldHelperText`, `FieldErrorText`: Low‑level building blocks.
- Use these to keep labels and error messaging consistent across custom compositions.

---

## 5. Overlays

### `Modal`

- Centered overlay dialog.
- **Use for:** Blocking flows requiring focused attention and explicit dismissal.
- **Key details:**
  - No title/description props directly on `Modal`; compose with `ModalHeader`, `ModalBody`, and `ModalFooter`.

### `ModalHeader`, `ModalBody`, `ModalFooter`

- `ModalHeader`: Provides the title and optional description.
- `ModalBody`: Scrollable content region.
- `ModalFooter`: Primary/secondary actions (expects actual `Button` elements, not strings or bare `onClick` handlers).

### `Tray`

- Bottom‑sheet style overlay (mobile‑first).
- **Use for:** Flows that feel lighter than full modals, especially on mobile.

### `Popover`

- Anchored floating panel near a trigger element.
- **Use for:** Contextual menus or small pieces of interactive content anchored to a control.
- Key detail: Trigger/anchor is the `children` of `Popover`, not a separate `trigger` prop. Positioning lives in `contentPosition`.

### `Tooltip`

- Small hover/focus hint attached to a single child element.
- **Use for:** Short, non‑essential explanations of controls and icons.

### `useToast` (hook)

- Imperative toasts for transient success/error/info feedback.
- **Use for:** "Saved successfully", "Could not connect", etc.
- Do not render a `<Toast />` directly; rely on `useToast().show(...)`.

---

## 6. Lists, Tables & Cards

### `ListCell`

- Row primitive for lists, settings, and menus.
- **Use for:** Settings lists, profile lists, navigation lists, etc.
- Use `media` for leading visuals and `accessory` / `accessoryNode` / `end` for trailing content; see CDS docs for the full API.

### `Table`

- Tabular data presentation.
- **Use for:** Dense data, sortable columns, and paginated datasets.

### `Accordion` / `AccordionItem`

- Expand/collapse regions for content that doesn’t need to be visible all at once.

### `ContentCard` (+ `ContentCardHeader`, `ContentCardBody`, `ContentCardFooter`)

- Standard composable card.
- Use wherever you previously used generic `Card` components.

### `MediaCard`

- Card with a prominent media area (e.g., image, illustration).
- Use for content that is visually led (promos, featured content).

### `MessagingCard`

- In‑product messaging card.
- **Use for:** Upsells, nudges, announcements, and similar messaging blocks.
- Uses a `type` to differentiate visual style (e.g., `'upsell'`, `'nudge'`).

### `DataCard`

`import { DataCard } from "@coinbase/cds-web/alpha/data-card";`

- Card for summarizing key data points (metrics, balances).
- **Use for:** Dashboard tiles and summary metrics; always prefer this implementation over legacy `DataCard`.

### `Fallback`

- Skeleton / placeholder shape.
- **Use for:** Loading states where you know the final structure but not the data yet.

---

## 7. Feedback & Status

### `Tag`

- Small status/label pill (there is no `Badge` in CDS).
- **Use for:** Status indicators, small inline labels and tags.

### `Banner`

- Inline page‑level alert.
- **Use for:** Warnings, promotional messages, informational notes, and errors that sit inline with content.
- Takes a `variant` (warning/promotional/informational/error) and optional actions via `Link` components.

### `ProgressCircle`

- Circular progress indicator from `@coinbase/cds-web-visualization`.
- **Use for:**
  - `indeterminate` loading spinners.
  - Determinate progress when you want circular visuals instead of bars.

### `ProgressBar`

- Linear determinate progress from `@coinbase/cds-web-visualization`.
- **Use for:** Long‑running operations where linear progress is easy to interpret.

---

## 8. Navigation

### `Tabs`

- Composable tab bar using a `tabs` data array and controlled `activeTab`.
- **Use for:** Section switching where each tab corresponds to a different view.

### `SegmentedTabs`

- Higher‑level wrapper around `Tabs` for 2–5 mutually exclusive options.
- **Use when:** You want simple segmented controls.

### `TabbedChips`

`import { TabbedChips } from "@coinbase/cds-web/alpha/tabbed-chips/TabbedChips";`

- Chip‑styled tabs.
- **Use for:** Horizontally scrolling chip‑like navigation with overflow handling.

### `Pagination`

- Pagination control.
- **Use for:** Paged results in tables or content feeds.

### `Stepper`

- Multi‑step progress indicator.
- **Use for:** Wizards, onboarding flows, and any multi‑step process, vertically or horizontally.

---

## 9. Media & Decoration

### `Avatar`

- `Avatar`: Single user/entity image with initials fallback.
- **Use for:** Representing people, accounts, or entities.

### `Icon`

- Single glyph icon.
- **Use for:** Supplementary visual cues; pair with labels for clarity and accessibility.

### `Image` / `RemoteImage`

- Display bitmap images with control over object fit, size, and border radius.

### `SpotSquare`

- Decorative square illustration, often used inside cards or list rows.

### `Pictogram`

- Decorative pictogram for more illustrative moments.

### `Logo`

- Coinbase wordmark or symbol.
- **Use for:** Brand marks; pick `variant` and `color` that match the context.

---

## 10. Visualization

From `@coinbase/cds-web-visualization`.

### Charts

- `LineChart`, `BarChart`, `AreaChart`, `PieChart`.
- **Use for:** Time series, comparisons, distributions, and proportions, respectively.
- Configure via `data`, axes, and `series` definitions.

### `Legend`

- Standalone legend component to accompany charts.
