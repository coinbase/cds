# Card Components Architecture

This document explains the architecture of the CDS card component system, designed to help engineers understand how to use and extend these components.

## Storybook

[https://cds-storybook.netlify.app/?path=/story/components-alpha-contentcard--default](https://cds-storybook.netlify.app/?path=/story/components-alpha-contentcard--default)

## Overview

The card component system is built on a foundation of atomic components that provide consistent styling and behavior. On top of this foundation, we have specialized card variants for specific use cases. The architecture follows two main patterns:

1. **Layout Component Pattern**: Used by `MediaCard`, `MessagingCard`, and `DataCard` \- these wrap a layout component inside `CardRoot`
2. **Composite Component Pattern**: Used by `ContentCard` \- provides multiple sub-components for flexible composition

**Alpha Components**: `DataCard` is released as an alpha component and is located in the `alpha` directory. `MediaCard`, `MessagingCard`, and the updated `ContentCard` are stable components located in the main `cards` directory.

---

## Release Strategy

The new card components replace existing card components with improved APIs and architecture. Here's the migration strategy:

### 1\. MediaCard

**Replaces**: `ContainedAssetCard` \+ `FloatingAssetCard`

- `MediaCard` will be released directly as a stable component (new name)
- Both `ContainedAssetCard` and `FloatingAssetCard` will be marked as deprecated
- No more floating asset card variant \- `MediaCard` provides a unified API

#### Migration from ContainedAssetCard

| Old Prop      | New Prop                        | Notes                                              |
| :------------ | :------------------------------ | :------------------------------------------------- |
| `header`      | `thumbnail`                     | Renamed                                            |
| `title`       | `title`                         | Same                                               |
| `subtitle`    | `subtitle`                      | Same                                               |
| `description` | `description`                   | Same                                               |
| `children`    | `media`                         | Media content now passed as prop                   |
| `size`        | -                               | **Removed** - Use layout/width props directly      |
| `onClick`     | `onClick` + `renderAsPressable` | Must add `renderAsPressable` for interactive cards |

```tsx
// Before
<ContainedAssetCard
  header={<Avatar ... />}
  title="Asset Title"
  subtitle="Subtitle"
  description="Description"
  size="l"
  onClick={handleClick}
>
  <RemoteImage ... />
</ContainedAssetCard>

// After
<MediaCard
  renderAsPressable
  thumbnail={<Avatar ... />}
  title="Asset Title"
  subtitle="Subtitle"
  description="Description"
  media={<RemoteImage ... />}
  mediaPlacement="end"
  onClick={handleClick}
/>
```

#### Migration from FloatingAssetCard

| Old Prop      | New Prop                        | Notes                                                |
| :------------ | :------------------------------ | :--------------------------------------------------- |
| `media`       | `thumbnail`                     | Renamed - media is now thumbnail                     |
| `title`       | `title`                         | Same                                                 |
| `subtitle`    | `subtitle`                      | Same                                                 |
| `description` | `description`                   | Same                                                 |
| `size`        | -                               | **Removed** - Floating variation no longer supported |
| `onClick`     | `onClick` + `renderAsPressable` | Must add `renderAsPressable` for interactive cards   |

**Note**: The floating variation (media outside the card container) is no longer supported. `MediaCard` provides a contained layout with media placement options.

```tsx
// Before
<FloatingAssetCard
  title="Asset Title"
  subtitle="Subtitle"
  description="Description"
  media={<RemoteImage ... />}
  onClick={handleClick}
/>

// After
<MediaCard
  renderAsPressable
  title="Asset Title"
  subtitle="Subtitle"
  description="Description"
  thumbnail={<RemoteImage ... />}
  onClick={handleClick}
/>
```

### 2\. MessagingCard

**Replaces**: `UpsellCard` \+ `NudgeCard`

- `MessagingCard` will be released directly as a stable component (new name)
- It combines both previous components into one, providing two variants via the `type` prop: `"upsell"` and `"nudge"`
- Both `UpsellCard` and `NudgeCard` will be marked as deprecated

#### Migration from UpsellCard

| Old Prop                   | New Prop                        | Notes                                              |
| :------------------------- | :------------------------------ | :------------------------------------------------- |
| -                          | `type="upsell"`                 | **Required** - Specify the variant                 |
| `title`                    | `title`                         | Same                                               |
| `description`              | `description`                   | Same                                               |
| `media`                    | `media`                         | Same                                               |
| `action` (ReactNode)       | `action`                        | Same - pass string or custom ReactNode             |
| `onActionPress`            | `onActionButtonClick/Press`     | Renamed - handler when `action` is a string        |
| `onDismissPress`           | `onDismissButtonClick/Press`    | Renamed                                            |
| `background`               | `background`                    | Override default (upsell defaults to `bgPrimary`)  |
| `dangerouslySetBackground` | `dangerouslySetBackground`      | Same - spectrum colors via CardRoot props          |
| `onClick`                  | `onClick` + `renderAsPressable` | Must add `renderAsPressable` for interactive cards |

**Note**: The `action` prop accepts either a string or a custom ReactNode:

- **String**: Renders a default button; use `onActionButtonClick/Press` to handle clicks
- **ReactNode**: Renders as-is; handle events within your custom element

**Background defaults**: MessagingCard sets background based on `type`: `bgPrimary` for upsell, `bgAlternate` for nudge. You can override with the `background` or `dangerouslySetBackground` props.

```tsx
// Before (with string action)
<UpsellCard
  title="Title"
  description="Description"
  media={<RemoteImage ... />}
  action="Get Started"
  onActionPress={handleAction}
  onDismissPress={handleDismiss}
  onClick={handleCardClick}
/>

// After (with string action)
<MessagingCard
  renderAsPressable
  type="upsell"
  title="Title"
  description="Description"
  media={<RemoteImage ... />}
  action="Get Started"
  onActionButtonClick={handleAction}
  onDismissButtonClick={handleDismiss}
  mediaPlacement="end"
  onClick={handleCardClick}
/>

// Before (with custom action ReactNode)
<UpsellCard
  title="Title"
  description="Description"
  action={<Button onClick={handleAction}>Custom Action</Button>}
  onDismissPress={handleDismiss}
/>

// After (with custom action ReactNode)
<MessagingCard
  type="upsell"
  title="Title"
  description="Description"
  action={<Button onClick={handleAction}>Custom Action</Button>}
  onDismissButtonClick={handleDismiss}
  mediaPlacement="end"
/>
```

#### Migration from NudgeCard

| Old Prop             | New Prop                        | Notes                                                           |
| :------------------- | :------------------------------ | :-------------------------------------------------------------- |
| -                    | `type="nudge"`                  | **Required** - Specify the variant                              |
| `title`              | `title`                         | Same                                                            |
| `description`        | `description`                   | Same                                                            |
| `pictogram`          | `media`                         | Pass as ReactNode: `<Pictogram dimension="48x48" name="..." />` |
| `media`              | `media`                         | Same                                                            |
| `mediaPosition`      | `mediaPlacement`                | Renamed; `"left"` → `"start"`, `"right"` → `"end"`              |
| `action` (ReactNode) | `action`                        | Same - pass string or custom ReactNode                          |
| `onActionPress`      | `onActionButtonClick/Press`     | Renamed - handler when `action` is a string                     |
| `onDismissPress`     | `onDismissButtonClick/Press`    | Renamed                                                         |
| `numberOfLines`      | -                               | **Removed**                                                     |
| `compact`            | -                               | **Removed**                                                     |
| `onClick`            | `onClick` + `renderAsPressable` | Must add `renderAsPressable` for interactive cards              |

```tsx
// Before
<NudgeCard
  title="Title"
  description="Description"
  pictogram="addToWatchlist"
  action="Learn more"
  onActionPress={handleAction}
  onDismissPress={handleDismiss}
  mediaPosition="right"
/>

// After
<MessagingCard
  type="nudge"
  title="Title"
  description="Description"
  media={<Pictogram dimension="48x48" name="addToWatchlist" />}
  action="Learn more"
  onActionButtonClick={handleAction}
  onDismissButtonClick={handleDismiss}
  mediaPlacement="end"
/>
```

### 3\. DataCard

**Replaces**: Old `DataCard`

- New `DataCard` adds support for any visualization component to be inserted (charts, progress bars, etc.)
- Will be released as an **alpha component** (located in `alpha` directory)
- The old `DataCard` will be marked as deprecated

#### Migration from Old DataCard

| Old Prop          | New Prop                        | Notes                                                           |
| :---------------- | :------------------------------ | :-------------------------------------------------------------- |
| `title`           | `title`                         | Same                                                            |
| `description`     | `subtitle`                      | Renamed                                                         |
| `progress`        | -                               | **Removed** - Pass visualization as children                    |
| `progressVariant` | -                               | **Removed** - Use `ProgressBar` or `ProgressCircle` as children |
| `progressColor`   | -                               | **Removed** - Set on visualization component directly           |
| `startLabel`      | -                               | **Removed** - Use `ProgressBarWithFixedLabels`                  |
| `endLabel`        | -                               | **Removed** - Use `ProgressBarWithFixedLabels`                  |
| -                 | `thumbnail`                     | **New** - Add thumbnail image                                   |
| -                 | `titleAccessory`                | **New** - Add inline content next to title                      |
| -                 | `layout`                        | **New** - `"horizontal"` or `"vertical"`                        |
| -                 | `children`                      | **New** - Pass any visualization component                      |
| `onClick`         | `onClick` + `renderAsPressable` | Must add `renderAsPressable` for interactive cards              |

**Key Change**: The new `DataCard` does not render visualizations internally. Pass visualization components (ProgressBar, ProgressCircle, LineChart, etc.) as children.

```tsx
// Before
import { DataCard } from '@coinbase/cds-web/cards/DataCard';

<DataCard
  title="Progress"
  description="45% complete"
  progress={0.45}
  progressVariant="bar"
  startLabel="0"
  endLabel="45"
/>;

// After
import { DataCard } from '@coinbase/cds-web/alpha/data-card';

<DataCard
  title="Progress"
  subtitle="45% complete"
  layout="vertical"
  thumbnail={<RemoteImage src={assetUrl} shape="circle" size="l" />}
>
  <ProgressBarWithFixedLabels startLabel={0} endLabel={45} labelPlacement="below">
    <ProgressBar accessibilityLabel="45% complete" progress={0.45} weight="semiheavy" />
  </ProgressBarWithFixedLabels>
</DataCard>;
```

#### Circle Progress Migration

```tsx
// Before
<DataCard
  title="Completion"
  description="Almost done"
  progress={0.75}
  progressVariant="circle"
  progressColor="fgPositive"
  startLabel="75%"
/>

// After
<DataCard
  title="Completion"
  subtitle="Almost done"
  layout="horizontal"
  thumbnail={<RemoteImage ... />}
  titleAccessory={<Text color="fgPositive" font="label1">75%</Text>}
>
  <ProgressCircle
    accessibilityLabel="75% complete"
    progress={0.75}
    color="fgPositive"
    size={100}
  />
</DataCard>
```

### 4\. ContentCard

**Updates**: Existing `ContentCard`

- The existing `ContentCard` is updated in-place with improved APIs, clearer prop naming, and pressable functionality
- Remains as a **stable component** (located in main `cards` directory)
- Backward-compatible with deprecated prop fallbacks for smooth migration

#### What Changed

**ContentCard (Root)**

- **Added**: `borderRadius={500}` default for rounded corners
- **Updated**: `padding={2}` default for consistent spacing on root (previously on sub-components)
- **Updated**: `gap={2}` default for consistent spacing between sub-components

**Note**: ContentCard does not support `renderAsPressable`. If you need a pressable card, wrap ContentCard in a `<Pressable>` component.

**ContentCardHeader**

| Old Prop | New Prop    | Notes                    |
| :------- | :---------- | :----------------------- |
| `avatar` | `thumbnail` | Deprecated with fallback |
| `meta`   | `subtitle`  | Deprecated with fallback |
| `end`    | `actions`   | Deprecated with fallback |

- **Removed**: Default padding (now handled by root ContentCard)
- **Added**: `styles` and `classNames` props for custom styling hooks
- **Changed Layout**: Title and subtitle now stack vertically in a `VStack`
- **Removed**: `marginEnd={-1}`

**ContentCardBody**

| Old Prop        | New Prop         | Notes                                           |
| :-------------- | :--------------- | :---------------------------------------------- |
| `body`          | `description`    | Deprecated with fallback                        |
| `mediaPosition` | `mediaPlacement` | `"left"` → `"start"`, `"right"` → `"end"`       |
| `label`         | -                | **Deprecated** - Use ReactNode in `description` |

- **Added**: `title` prop (optional)
- **Removed**: Default padding (now handled by root ContentCard)
- **Added**: `styles` and `classNames` props for custom styling hooks

**ContentCardFooter**

- **Removed**: Default padding (now handled by root ContentCard)
- **Made configurable**: `justifyContent` (was hardcoded to `space-between`)

#### Potential Breaking Changes

| Change                                   | Impact                                                                                                                                             | Severity          |
| :--------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------- | :---------------- |
| **Padding moved to root**                | Padding is now on the root `ContentCard` (`padding={2}`) instead of individual sub-components. Cards with custom padding may look different.       | 🟡 Medium         |
| **Gap updated**                          | The root now has `gap={2}` (updated) for consistent spacing between Header, Body, and Footer.                                                      | 🟢 Low            |
| **Layout change in Header**              | Title/subtitle now stack vertically instead of horizontally. Visual change for existing headers with `meta`.                                       | 🟡 Medium         |
| **`marginEnd={-1}` removed from Header** | May affect alignment of action buttons.                                                                                                            | 🟡 Medium         |
| **Base type change**                     | `ContentCardBaseProps` now extends `PressableBaseProps` instead of `BoxBaseProps`/`VStackProps`. TypeScript consumers may see new props available. | 🟢 Low (additive) |

#### Migration Examples

**Prop Renaming (Optional but Recommended)**

```tsx
// Before
<ContentCardHeader
  avatar={<Avatar />}
  meta="News"
  end={<IconButton />}
/>
<ContentCardBody
  body="Article title"
  mediaPosition="right"
/>

// After
<ContentCardHeader
  thumbnail={<Avatar />}
  subtitle="News"
  actions={<IconButton />}
/>
<ContentCardBody
  title="Article title"
  mediaPlacement="end"
/>
```

**If Padding Looks Wrong**

```tsx
// To customize padding, override on the root ContentCard:
<ContentCard padding={0}>
  ...
</ContentCard>

// Or customize padding and gap together:
<ContentCard padding={3} gap={1}>
  ...
</ContentCard>
```

**If Using `label` Prop**

```tsx
// Before
<ContentCardBody body="Title" label="Supplemental text" />

// After (use ReactNode in description)
<ContentCardBody
  title="Title"
  description={
    <>
      Description text
      <Text font="label2">Supplemental text</Text>
    </>
  }
/>
```

**For Pressable Cards**

ContentCard does not have a built-in pressable mode. Wrap it in a `<Pressable>` component with `background`, `borderRadius`, and optionally `width` props:

```tsx
<Pressable
  background="bgAlternate"
  borderRadius={500}
  onClick={() => handlePress()}
  width="fit-content"
>
  <ContentCard>...</ContentCard>
</Pressable>
```

**Important**: When wrapping ContentCard in Pressable, avoid placing additional interactive elements (buttons, links, etc.) inside the card. Nested interactive elements create accessibility issues and confusing UX. If you need actions inside the card, do not wrap the card in Pressable.

### 5\. Additional Deprecated Components

The following legacy card components are also deprecated and should be migrated:

| Deprecated Component | Migration Target | Notes                                                        |
| :------------------- | :--------------- | :----------------------------------------------------------- |
| `FeedCard`           | `ContentCard`    | Use ContentCard with Header, Body, and Footer sub-components |
| `FeatureEntryCard`   | `MessagingCard`  | Use MessagingCard with appropriate `type` prop               |
| `AnnouncementCard`   | `MessagingCard`  | Use MessagingCard with appropriate `type` prop               |

**Note**: `FeatureEntryCard` and `AnnouncementCard` previously pointed to `NudgeCard` and `UpsellCard` as migration targets, but those are now also deprecated. Migrate directly to `MessagingCard`.

---

## Foundation: CardRoot

The card component system is built on a foundational `CardRoot` component that ensures consistency across card variants.

### CardRoot

**Purpose**: The root container component created to handle polymorphism and interactivity for `DataCard`, `MediaCard`, and `MessagingCard`.

**Key Features**:

- Handles both pressable (interactive) and non-pressable card states
- Provides polymorphic support for custom element types
- Renders as `Pressable` when `renderAsPressable={true}`, or as a layout container otherwise
- Provides semantic HTML defaults

**Why `renderAsPressable` prop instead of auto-detection?**

`CardRoot` uses an explicit `renderAsPressable` prop instead of auto-detecting interactivity from props like `onClick`, `onKeyDown`, `onKeyUp,` , or `href`. This design decision is based on several principles:

**What `renderAsPressable` controls**: The `renderAsPressable` prop controls visual and tactile interactivity (hover and active states) but does not demand that the component be rendered as a button or link. When `renderAsPressable={true}`, `CardRoot` renders as a `Pressable` (which defaults to `<button>` on web), but you can override the semantic element using the `as` prop. This separation allows independent control of visual interactivity and semantic HTML structure.

**Why explicit is better**:

- **Reliability**: Auto-detection is unreliable because standard props don't cover all interactive scenarios (custom handlers, third-party libraries, programmatic navigation, complex interaction patterns)

- **Explicit Intent**: We shouldn't speculate about consumer intentions based on prop usage. Making interactivity explicit ensures clear communication of intent

- **Accessibility**: When you want visual interactivity but have interactive elements inside the card, you can set `renderAsPressable={true}` for visual/tactile interactivity, then use `as="div"` (or other non-interactive tag) to override the semantic element and set `accessible={false}` to make it non-accessible. This allows screen readers to focus on internal interactive elements rather than creating nested interactive elements.
  **Real-world scenario**: Consumers want the entire `UpsellCard` to be clickable (for navigation or action) but also need a dismiss button inside the card. This works fine for non-visually impaired users who can visually distinguish and click different areas. However, for screen reader users, wrapping the card in a button would create nested interactive elements (button containing a button), which confuses assistive technologies. The solution is to set `renderAsPressable={true}` for visual interactivity, `as="div"` to avoid semantic button nesting, and `accessible={false}` so screen readers can properly focus on the dismiss button inside.

**Usage**: Used as the outer wrapper for `MediaCard`, `MessagingCard`, and `DataCard`. `ContentCard` implements its own root with different defaults.

---

## Card Variants: Layout Component Pattern

`MediaCard`, `MessagingCard`, and `DataCard` all follow the same architectural pattern: they wrap a layout component (`*CardLayout`) inside `CardRoot`. This pattern provides a consistent structure while allowing each variant to customize its internal layout.

### Architecture Pattern

```
[CardVariant]
└── CardRoot (provides outer container, styling, and interactivity)
    └── [CardVariant]Layout (handles internal structure and composition)
```

### Why the Additional CardLayout Layer?

The additional `CardLayout` layer exists instead of using `CardRoot` props directly because of platform differences in how `Pressable` works:

- **On mobile**: `Pressable` has two layers (outer wrapper and inner content). To control the layout of its children, you must use the `contentStyles` prop, as all other props are spread to the outer layer.
- **On web**: `Pressable` behaves differently and can accept layout props directly.

To maintain consistency across platforms and pressable/non-pressable variants, we added this additional layout layer for all platforms. This ensures that layout logic is handled consistently regardless of whether the card is pressable or not, and regardless of platform.

**Future refactoring opportunity**: Once React Native 0.77 is adopted (which supports `display: contents`), we can potentially remove this additional layer. `Pressable` could be refactored to set the inner layer to `display: contents`, which would effectively remove it from the layout tree and allow layout props to be passed directly to `CardRoot` without the need for the intermediate `CardLayout` layer. This refactoring would be **non-breaking** for `MediaCard`, `MessagingCard`, and `DataCard` since the `CardLayout` layer is internal and doesn't change the public API of these components.

### MediaCard

**Use Case**: Display content with a prominent media element (image, video, etc.) taking up 50% of the card width.

**Architecture**:

```
MediaCard
└── CardRoot (borderRadius=500, background=bgAlternate, flexDirection=row, overflow=hidden)
    └── MediaCardLayout
        ├── HStack (root layout container)
        │   ├── VStack (content container - 50% width)
        │   │   ├── thumbnail (optional)
        │   │   └── VStack (text container)
        │   │       ├── VStack (header container)
        │   │       │   ├── subtitle
        │   │       │   └── title
        │   │       └── description
        │   └── Box (media container - 50% width, optional)
```

**Key Features**:

- Split layout: 50% content area, 50% media area
- Optional thumbnail in content area
- Supports both pressable and non-pressable modes

**Styling**: Uses `bgAlternate` background, `borderRadius=500`, row-based layout

#### Migration Instructions

**From ContainedAssetCard:**

| Old Prop   | New Prop                        | Notes                                              |
| :--------- | :------------------------------ | :------------------------------------------------- |
| `header`   | `thumbnail`                     | Renamed                                            |
| `children` | `media`                         | Media content now passed as prop                   |
| `size`     | -                               | **Removed** - Use layout/width props directly      |
| `onClick`  | `onClick` + `renderAsPressable` | Must add `renderAsPressable` for interactive cards |

```tsx
// Before
<ContainedAssetCard
  header={<Avatar ... />}
  title="Asset Title"
  subtitle="Subtitle"
  size="l"
  onClick={handleClick}
>
  <RemoteImage ... />
</ContainedAssetCard>

// After
<MediaCard
  renderAsPressable
  thumbnail={<Avatar ... />}
  title="Asset Title"
  subtitle="Subtitle"
  media={<RemoteImage ... />}
  mediaPlacement="end"
  onClick={handleClick}
/>
```

**From FloatingAssetCard:**

| Old Prop  | New Prop                        | Notes                                                |
| :-------- | :------------------------------ | :--------------------------------------------------- |
| `media`   | `thumbnail`                     | Renamed - media is now thumbnail                     |
| `size`    | -                               | **Removed** - Floating variation no longer supported |
| `onClick` | `onClick` + `renderAsPressable` | Must add `renderAsPressable` for interactive cards   |

**Note**: The floating variation (media outside the card container) is no longer supported.

```tsx
// Before
<FloatingAssetCard
  title="Asset Title"
  media={<RemoteImage ... />}
  onClick={handleClick}
/>

// After
<MediaCard
  renderAsPressable
  title="Asset Title"
  thumbnail={<RemoteImage ... />}
  onClick={handleClick}
/>
```

### MessagingCard

**Use Case**: Display promotional or informational messages with optional dismiss functionality and actions.

**Architecture**:

```
MessagingCard
└── CardRoot (borderRadius=500, background based on type, overflow=hidden)
    └── MessagingCardLayout
        ├── HStack (root layout container, row or row-reverse based on mediaPlacement)
        │   ├── VStack (content container)
        │   │   ├── VStack (text container)
        │   │   │   ├── Tag
        │   │   │   ├── title (color varies by type)
        │   │   │   └── description (color varies by type)
        │   │   └── actions (optional, typically buttons)
        │   ├── Box (media container, optional)
        │   └── IconButton (dismiss button, absolute positioned, optional)
```

**Key Features**:

- Two types: `upsell` (primary background) and `nudge` (alternate background)
- Flexible media placement (`start` or `end`)
- Optional dismiss button (IconButton) in top-right corner
- Actions area for buttons/CTAs
- Dynamic padding adjustments to prevent overlap with dismiss button
- Text colors adapt based on card type (`fgInverse` for upsell, `fg` for nudge)

**Styling**: Background color varies by type (`bgPrimary` for `upsell`, `bgAlternate` for `nudge`)

#### Migration Instructions

**From UpsellCard:**

| Old Prop                   | New Prop                        | Notes                                              |
| :------------------------- | :------------------------------ | :------------------------------------------------- |
| -                          | `type="upsell"`                 | **Required** - Specify the variant                 |
| `action` (ReactNode)       | `action`                        | Same - pass string or custom ReactNode             |
| `onActionPress`            | `onActionButtonClick/Press`     | Renamed - handler when `action` is a string        |
| `onDismissPress`           | `onDismissButtonClick/Press`    | Renamed                                            |
| `background`               | `background`                    | Override default (upsell defaults to `bgPrimary`)  |
| `dangerouslySetBackground` | `dangerouslySetBackground`      | Same - spectrum colors via CardRoot props          |
| `onClick`                  | `onClick` + `renderAsPressable` | Must add `renderAsPressable` for interactive cards |

```tsx
// Before
<UpsellCard
  title="Title"
  description="Description"
  media={<RemoteImage ... />}
  action="Get Started"
  onActionPress={handleAction}
  onDismissPress={handleDismiss}
/>

// After
<MessagingCard
  type="upsell"
  title="Title"
  description="Description"
  media={<RemoteImage ... />}
  action="Get Started"
  onActionButtonClick={handleAction}
  onDismissButtonClick={handleDismiss}
  mediaPlacement="end"
/>
```

**From NudgeCard:**

| Old Prop             | New Prop                        | Notes                                                           |
| :------------------- | :------------------------------ | :-------------------------------------------------------------- |
| -                    | `type="nudge"`                  | **Required** - Specify the variant                              |
| `pictogram`          | `media`                         | Pass as ReactNode: `<Pictogram dimension="48x48" name="..." />` |
| `mediaPosition`      | `mediaPlacement`                | `"left"` → `"start"`, `"right"` → `"end"`                       |
| `action` (ReactNode) | `action`                        | Same - pass string or custom ReactNode                          |
| `onActionPress`      | `onActionButtonClick/Press`     | Renamed - handler when `action` is a string                     |
| `onDismissPress`     | `onDismissButtonClick/Press`    | Renamed                                                         |
| `numberOfLines`      | -                               | **Removed**                                                     |
| `compact`            | -                               | **Removed**                                                     |
| `onClick`            | `onClick` + `renderAsPressable` | Must add `renderAsPressable` for interactive cards              |

```tsx
// Before
<NudgeCard
  title="Title"
  description="Description"
  pictogram="addToWatchlist"
  action="Learn more"
  onActionPress={handleAction}
  onDismissPress={handleDismiss}
/>

// After
<MessagingCard
  type="nudge"
  title="Title"
  description="Description"
  media={<Pictogram dimension="48x48" name="addToWatchlist" />}
  action="Learn more"
  onActionButtonClick={handleAction}
  onDismissButtonClick={handleDismiss}
  mediaPlacement="end"
/>
```

#### Accessibility: Interactive Cards with Dismiss Button

When you need both a dismiss button (`onDismissButtonClick/Press`) and want the entire card to be clickable/pressable, you should handle accessibility carefully to avoid nested interactive elements.

**The Problem**: If you use `renderAsPressable` with `onClick`/`onPress` and also have a dismiss button, the card becomes an interactive element containing another interactive element (the dismiss button). This creates accessibility issues for screen reader users.

**The Solution**: Mark the card as non-accessible and add a separate action button inside the card with the same action. This allows:

- Regular users to click/tap anywhere on the card
- Screen reader users to focus on individual interactive elements (action button + dismiss button)

```tsx
// Web
<MessagingCard
  renderAsPressable
  tabIndex={-1}
  as="div"
  onClick={handleCardClick}
  type="upsell"
  title="Accessible Interactive Card"
  description="Card with both dismiss and card-level action"
  action={
    // Duplicate action for keyboard/screen reader users
    <Button
      compact
      variant="secondary"
      tabIndex={0}
      onClick={(event) => {
        event.stopPropagation();
        handleCardClick();
      }}
    >
      Learn More
    </Button>
  }
  onDismissButtonClick={handleDismiss}
  dismissButtonAccessibilityLabel="Dismiss promotion"
  media={<RemoteImage ... />}
  mediaPlacement="end"
/>

// Mobile (React Native)
<MessagingCard
  renderAsPressable
  accessible={false}
  onPress={handleCardPress}
  type="upsell"
  title="Accessible Interactive Card"
  description="Card with both dismiss and card-level action"
  action={
    // Duplicate action for screen reader users
    <Button compact variant="secondary" onPress={handleCardPress}>
      Learn More
    </Button>
  }
  onDismissButtonPress={handleDismiss}
  dismissButtonAccessibilityLabel="Dismiss promotion"
  media={<RemoteImage ... />}
  mediaPlacement="end"
/>
```

**Key points:**

- **Web**: Set `tabIndex={-1}` on the card to remove it from keyboard navigation; use `as="div"` to avoid semantic button nesting; add `tabIndex={0}` to the Button to ensure it remains focusable; use `event.stopPropagation()` to prevent the card's onClick from firing
- **Mobile**: Set `accessible={false}` to remove the card from the accessibility tree
- Add a `Button` via the `action` prop with the same click/press handler for keyboard/screen reader users
- Use `dismissButtonAccessibilityLabel` to provide an accessible label for the dismiss button
- Use `actionButtonAccessibilityLabel` to provide an accessible label for the action button (when using the built-in `actionButton` prop)
- **Color Contrast**: When using custom backgrounds via `dangerouslySetBackground`, ensure text and icons have sufficient contrast (WCAG AA requires 4.5:1). Use `fgInverse` for dark backgrounds and `fg` for light backgrounds.

### DataCard

**Use Case**: Display data visualizations (charts, progress bars, etc.) alongside metadata.

**Architecture**:

```
DataCard
└── CardRoot (borderRadius=500, background=bgAlternate, flexDirection=row, overflow=hidden)
    └── DataCardLayout
        ├── Box (root layout container, flexDirection based on layout prop)
        │   ├── Box (header container, flexDirection based on layout)
        │   │   ├── thumbnail
        │   │   └── VStack (header content)
        │   │       ├── HStack (title container)
        │   │       │   ├── Tag
        │   │       │   └── title
        │   │       └── subtitle
        │   └── Box (visualization container)
```

**Key Features**:

- Two layout orientations: `horizontal` (side-by-side) and `vertical` (stacked)
- Required visualization props
- Tag positioned inline with title (row-reverse layout)
- Flexible spacing based on layout orientation
- Supports both pressable and non-pressable modes

**Design Decision \- Visualization Slot**:

`DataCard` does not accept visualization-related props or render visualizations internally. Instead, it provides a `visualization` prop that accepts any React node, allowing consumers to insert whatever visualization component they need (charts, progress bars, gauges, etc.).

This design decision provides several benefits:

- **Future-proof**: Not limited to specific visualization types \- can support any visualization component without API changes
- **Flexibility**: Consumers can use any visualization library or custom component
- **Layout control**: Consumers can adjust the layout based on their specific visualization type
- **Documentation guidance**: We provide recommended layouts in documentation for common visualization types, but consumers have full control

By providing a slot rather than accepting visualization props, we avoid locking ourselves into a specific set of visualization types and maintain the ability to support new visualization patterns as they emerge.

**Styling**: Uses `bgAlternate` background, `borderRadius=500`, row-based layout

#### Migration Instructions

**From Old DataCard:**

| Old Prop          | New Prop                        | Notes                                                           |
| :---------------- | :------------------------------ | :-------------------------------------------------------------- |
| `description`     | `subtitle`                      | Renamed                                                         |
| `progress`        | -                               | **Removed** - Pass visualization as children                    |
| `progressVariant` | -                               | **Removed** - Use `ProgressBar` or `ProgressCircle` as children |
| `progressColor`   | -                               | **Removed** - Set on visualization component directly           |
| `startLabel`      | -                               | **Removed** - Use `ProgressBarWithFixedLabels`                  |
| `endLabel`        | -                               | **Removed** - Use `ProgressBarWithFixedLabels`                  |
| -                 | `thumbnail`                     | **New** - Add thumbnail image                                   |
| -                 | `titleAccessory`                | **New** - Add inline content next to title                      |
| -                 | `layout`                        | **New** - `"horizontal"` or `"vertical"`                        |
| -                 | `children`                      | **New** - Pass any visualization component                      |
| `onClick`         | `onClick` + `renderAsPressable` | Must add `renderAsPressable` for interactive cards              |

**Key Change**: The new `DataCard` does not render visualizations internally. Pass visualization components as children.

```tsx
// Before
import { DataCard } from '@coinbase/cds-web/cards/DataCard';

<DataCard
  title="Progress"
  description="45% complete"
  progress={0.45}
  progressVariant="bar"
  startLabel="0"
  endLabel="45"
/>;

// After
import { DataCard } from '@coinbase/cds-web/alpha/data-card';

<DataCard
  title="Progress"
  subtitle="45% complete"
  layout="vertical"
  thumbnail={<RemoteImage src={assetUrl} shape="circle" size="l" />}
>
  <ProgressBarWithFixedLabels startLabel={0} endLabel={45} labelPlacement="below">
    <ProgressBar accessibilityLabel="45% complete" progress={0.45} weight="semiheavy" />
  </ProgressBarWithFixedLabels>
</DataCard>;
```

**Circle Progress Example:**

```tsx
// Before
<DataCard
  title="Completion"
  description="Almost done"
  progress={0.75}
  progressVariant="circle"
  progressColor="fgPositive"
/>

// After
<DataCard
  title="Completion"
  subtitle="Almost done"
  layout="horizontal"
  thumbnail={<RemoteImage ... />}
  titleAccessory={<Text color="fgPositive" font="label1">75%</Text>}
>
  <ProgressCircle
    accessibilityLabel="75% complete"
    progress={0.75}
    color="fgPositive"
    size={100}
  />
</DataCard>
```

---

## ContentCard: Composite Component Pattern

`ContentCard` uses a different architectural approach. Instead of using `CardRoot` \+ a single layout component, it implements a **composite component pattern** with multiple sub-components. This provides more flexibility for complex content structures.

### Architecture

```
ContentCard (root, replaces CardRoot)
├── ContentCardHeader (optional)
│   ├── thumbnail
│   ├── VStack (content container)
│   │   ├── title
│   │   └── subtitle
│   └── action (optional)
├── ContentCardBody (optional)
│   ├── media (positioned: top/bottom/start/end)
│   └── VStack (content container)
│       ├── title
│       └── description
└── ContentCardFooter (optional)
    └── actions (typically buttons)
```

### Key Differences from Other Variants

1. **Custom Root Component**: `ContentCard` implements its own root component with different defaults:
   - Web: Uses `VStack` instead of `HStack`
   - Default element: `div` vs `article` in `CardRoot`
   - Default styling: `background='bg'`, `borderRadius=500`, `padding=2`, `gap=2`, `flexDirection='column'`
   - **No built-in pressable mode** - wrap in `<Pressable>` if needed

2. **Composite Structure**: Instead of a single layout component, `ContentCard` is composed of three distinct sub-components:
   - **ContentCardHeader**: Header section with thumbnail, title, subtitle, and optional action
   - **ContentCardBody**: Body section with media and text content (title \+ description)
   - **ContentCardFooter**: Footer section for actions/buttons

3. **Flexible Composition**: Unlike the other variants which have fixed layouts, `ContentCard` allows:
   - Optional header, body, and footer sections
   - Flexible media positioning (`top`, `bottom`, `start`, `end`)
   - Multiple title instances (one in header, one in body)
   - Separate action areas (header action vs footer actions)

4. **Different Defaults**:
   - Uses `bg` background instead of `bgAlternate`
   - Uses `VStack` as the base layout (column direction) instead of `HStack` (row direction)
   - Provides more granular control over padding per section

5. **Semantic HTML**: Each sub-component uses semantic HTML elements:
   - `ContentCardHeader` defaults to `<header>`
   - `ContentCardBody` defaults to `<div>`
   - `ContentCardFooter` defaults to `<footer>`

### ContentCardHeader

**Purpose**: Header section with thumbnail, title, subtitle, and optional action button.

**Structure**:

- Horizontal layout (`HStack`)
- Thumbnail on the left
- Title and subtitle in a vertical stack (flexible width)
- Optional action button on the right

### ContentCardBody

**Purpose**: Body section with flexible media and text content layout.

**Features**:

- Supports media positioning: `top`, `bottom`, `start`, `end`
- Contains title and description text
- Automatically adjusts layout direction based on media position (row for `start`/`end`, column for `top`/`bottom`)

### ContentCardFooter

**Purpose**: Footer section for actions (typically buttons).

**Structure**:

- Horizontal layout (`HStack`)
- Flexible content area for buttons or other actions

**Note**: Padding and gap are handled by the root `ContentCard` component (`padding={2}`, `gap={2}`), not by individual sub-components.

### Migration Instructions

**ContentCardHeader Prop Changes:**

| Old Prop | New Prop    | Notes                    |
| :------- | :---------- | :----------------------- |
| `avatar` | `thumbnail` | Deprecated with fallback |
| `meta`   | `subtitle`  | Deprecated with fallback |
| `end`    | `actions`   | Deprecated with fallback |

**ContentCardBody Prop Changes:**

| Old Prop        | New Prop         | Notes                                           |
| :-------------- | :--------------- | :---------------------------------------------- |
| `body`          | `description`    | Deprecated with fallback                        |
| `mediaPosition` | `mediaPlacement` | `"left"` → `"start"`, `"right"` → `"end"`       |
| `label`         | -                | **Deprecated** - Use ReactNode in `description` |

**ContentCard Root Changes:**

- **Added**: `borderRadius={500}` default
- **Added**: `padding={2}` default for consistent spacing on root
- **Added**: `gap={2}` default for consistent spacing between sub-components
- **Note**: No built-in pressable mode - wrap in `<Pressable>` if needed

**Breaking Changes:**

| Change                     | Severity  |
| :------------------------- | :-------- |
| Padding on root            | 🟡 Medium |
| Gap between sub-components | 🟢 Low    |
| Layout change in Header    | 🟡 Medium |

**Migration Examples:**

```tsx
// Before
<ContentCardHeader
  avatar={<Avatar />}
  meta="News"
  end={<IconButton />}
/>
<ContentCardBody
  body="Article title"
  mediaPosition="right"
/>

// After
<ContentCardHeader
  thumbnail={<Avatar />}
  subtitle="News"
  actions={<IconButton />}
/>
<ContentCardBody
  title="Article title"
  mediaPlacement="end"
/>
```

**If Spacing Looks Wrong:**

```tsx
// To customize padding, override on the root ContentCard:
<ContentCard padding={0}>
  ...
</ContentCard>

// Or customize padding and gap together:
<ContentCard padding={3} gap={1}>
  ...
</ContentCard>
```

**For Pressable Cards:**

Wrap ContentCard in a `<Pressable>` component with `background`, `borderRadius`, and optionally `width` props:

```tsx
<Pressable
  background="bgAlternate"
  borderRadius={500}
  onClick={() => handlePress()}
  width="fit-content"
>
  <ContentCard>...</ContentCard>
</Pressable>
```

**Important**: When wrapping ContentCard in Pressable, avoid placing additional interactive elements (buttons, links, etc.) inside the card. Nested interactive elements create accessibility issues. If you need actions inside the card, do not wrap the card in Pressable.

---

## Comparison: When to Use Which Pattern

| Feature                | MediaCard/MessagingCard/DataCard | ContentCard                              |
| :--------------------- | :------------------------------- | :--------------------------------------- |
| **Root Component**     | Uses `CardRoot`                  | Uses `ContentCard` (custom root)         |
| **Layout Pattern**     | Single layout component          | Composite (Header/Body/Footer)           |
| **Base Direction**     | Row (`HStack`)                   | Column (`VStack`)                        |
| **Default Background** | `bgAlternate`                    | `bg`                                     |
| **Structure**          | Fixed layout                     | Flexible, optional sections              |
| **Media Positioning**  | Fixed (side-by-side)             | Flexible (top/bottom/start/end)          |
| **Actions**            | Single area                      | Multiple areas (header action \+ footer) |
| **Use Case**           | Specific, well-defined layouts   | Flexible content composition             |

### Choosing the Right Component

- **Use `MediaCard`** when you need a 50/50 split layout with prominent media
- **Use `MessagingCard`** when displaying promotional messages with dismiss functionality
- **Use `DataCard`** when displaying data visualizations with metadata
- **Use `ContentCard`** when you need flexible composition with optional sections and multiple action areas

---

## Summary

The card component architecture provides two complementary patterns:

1. **Layout Component Pattern** (`MediaCard`, `MessagingCard`, `DataCard`): Provides consistent, well-defined layouts built on `CardRoot` \+ layout components. Best for specific use cases with predictable structures.

2. **Composite Component Pattern** (`ContentCard`): Provides flexible composition with multiple sub-components. Best for complex content that needs optional sections and flexible layouts.

All components use CDS `Text` and `RemoteImage` components directly for consistent typography and styling across the system.
