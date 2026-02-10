# Component Styles

Add styles API (styles, classNames, and static classNames) to a CDS component.

**Usage:** `/component-styles <ComponentName> [additional context]`

Examples:

- `/component-styles SlideButton`
- `/component-styles Button add static classnames for sub elements`
- `/component-styles Select add styles documentation`
- `/component-styles Avatar mobile only`

If no component name is provided, ask the user which component they want to add styles to.

## Step 1: Locate the Component

Find the component source file:

```bash
packages/web/src/[source-category]/[ComponentName].tsx              # for web
packages/mobile/src/[source-category]/[ComponentName].tsx           # for mobile
packages/web-visualization/src/[source-category]/[ComponentName].tsx    # for web visualization
packages/mobile-visualization/src/[source-category]/[ComponentName].tsx # for mobile visualization
```

## Step 2: Evaluate Component Structure

> **⚠️ IMPORTANT: Adding styles/classNames props is a commitment to the component's internal structure.**
>
> Before adding styles API, carefully review the component's JSX structure:
>
> - **Flag if the component could be simplified** (e.g., unnecessary wrappers, redundant containers)
> - **Do NOT add styles to elements that may be refactored** - this creates breaking changes
> - **Ask the user** if you notice the component structure could be improved before committing to it
>
> Once published, changing or removing selectors is a **breaking change** for consumers.

## Step 3: Identify Styleable Elements

Review the component's JSX to identify elements that should be targetable via styles/classNames:

- **Root element**: The outermost container element
- **Named sections**: Elements with semantic meaning (e.g., `start`, `content`, `end`, `header`, `footer`)
- **Sub-components**: Internal elements that users might want to customize
- **Conditional elements**: Elements that render based on props

## Approved Selector Names

> **IMPORTANT:** Before adding a new selector name not in this list, **get explicit confirmation from the user**.
> When a new selector is approved, add it to this list.

### Approved Selectors (alphabetical)

| Selector              | Description                                           |
| --------------------- | ----------------------------------------------------- |
| `accessory`           | Accessory element (e.g., chevron, icon at end)        |
| `bottomContent`       | Bottom section content                                |
| `carousel`            | Main carousel track element                           |
| `carouselContainer`   | Outer carousel container                              |
| `childrenContainer`   | Container wrapping children                           |
| `content`             | Main content area                                     |
| `contentContainer`    | Container wrapping content                            |
| `description`         | Description text element                              |
| `end`                 | End slot content (e.g., actions, icons)               |
| `fill`                | Fill/progress indicator within a track                |
| `header`              | Header section                                        |
| `helperText`          | Helper/assistive text below content                   |
| `icon`                | Icon element                                          |
| `intermediary`        | Middle/intermediary element between sections          |
| `label`               | Label text element                                    |
| `labels`              | Container for multiple labels                         |
| `logo`                | Logo element                                          |
| `mainContent`         | Primary content area                                  |
| `media`               | Media element (image, avatar, icon)                   |
| `navigation`          | Navigation controls (e.g., prev/next buttons)         |
| `pagination`          | Pagination indicators                                 |
| `pressable`           | Pressable/interactive wrapper                         |
| `progress`            | Progress indicator element                            |
| `progressBar`         | ProgressBar sub-component within a composed component |
| `root`                | Root/outermost container element                      |
| `start`               | Start slot content (e.g., back button)                |
| `step`                | Individual step element (in steppers)                 |
| `substepContainer`    | Container for nested sub-steps                        |
| `subtitle`            | Subtitle text element                                 |
| `tabs`                | Tabs container element                                |
| `thumb`               | Draggable thumb element (in sliders)                  |
| `title`               | Title text element                                    |
| `titleStack`          | Stack containing title/subtitle/description           |
| `titleStackContainer` | Container wrapping titleStack                         |
| `topContent`          | Top section content                                   |
| `track`               | Track/rail element (in progress bars, sliders)        |
| `trigger`             | Trigger element that opens a dropdown/popover         |

## JSDoc Convention for Selector Descriptions

Selector JSDoc comments describe **what the element is**, not what the prop does:

- Sentence case, no trailing period
- Concise noun phrase describing the element itself
- Single-line format: `/** Description */`
- For conditional elements, append context after a comma: `/** Header element, only rendered on phone viewport */`

**Examples:**

```tsx
/** Root element */
/** Title text element */
/** Navigation controls element */
/** Header element, only rendered on phone viewport in horizontal direction */
```

## Step 4: Add Styles API (Web Components)

For web components, add three things:

### 4.1 Static Class Names

Add a static classNames object with JSDoc comments. Place this before the component's type definitions:

```tsx
/**
 * Static class names for [ComponentName] component parts.
 * Use these selectors to target specific elements with CSS.
 */
export const [componentName]ClassNames = {
  /** Root element */
  root: 'cds-[ComponentName]',
  /** [Concise element description] */
  [selectorName]: 'cds-[ComponentName]-[selectorName]',
  // ... more selectors as needed
} as const;
```

**Naming conventions:**

- Use `cds-` prefix for all class names
- Use PascalCase for component name: `cds-NavigationBar`
- Use camelCase for sub-elements: `cds-NavigationBar-contentWrapper`, `cds-Foo-titleStack`
- Keep names descriptive but concise

**Example:**

```tsx
export const fooClassNames = {
  root: 'cds-Foo',
  contentWrapper: 'cds-Foo-contentWrapper',
  titleStack: 'cds-Foo-titleStack',
  helperText: 'cds-Foo-helperText',
} as const;
```

### 4.2 Update Component Props Type

Import and use the `StylesAndClassNames` utility type:

```tsx
import type { StylesAndClassNames } from '../types';

export type [ComponentName]BaseProps = BoxBaseProps & {
  // ... other props (without styles/classNames)
};

export type [ComponentName]Props = [ComponentName]BaseProps & StylesAndClassNames<typeof [componentName]ClassNames> & Omit<BoxProps<[ComponentName]DefaultElement>, 'children'>;
```

This automatically generates the `styles` and `classNames` props based on your static classNames object.

### 4.3 Apply in Component Implementation

Apply the static classNames, dynamic classNames, and styles in the component:

```tsx
import { cx } from '../cx';

// In the component:
<VStack
  className={cx([componentName]ClassNames.root, className, classNames?.root)}
  style={{ ...style, ...styles?.root }}
  // ... other props
>
  <HStack
    className={cx([componentName]ClassNames.contentWrapper, classNames?.contentWrapper)}
    style={styles?.contentWrapper}
  >
    {children}
  </HStack>
</VStack>
```

### 4.4 Add Tests for Static Class Names

Add tests to verify that static class names are applied correctly to the component. This ensures the class names remain stable for consumers who depend on them for CSS targeting.

**Test pattern:**

```tsx
import { [componentName]ClassNames } from '../[ComponentName]';

describe('[ComponentName] static classNames', () => {
  it('applies static class names to component elements', () => {
    render(
      <[ComponentName]WithTheme
        start={<div>Start</div>}  // Include props that render conditional elements
      >
        <div>Children</div>
      </[ComponentName]WithTheme>,
    );

    // Test root element
    const root = screen.getByRole('[role]'); // or use testID/other selector
    expect(root).toHaveClass([componentName]ClassNames.root);

    // Test sub-elements using querySelector with the static class name
    expect(root.querySelector(`.${[componentName]ClassNames.start}`)).toBeInTheDocument();
    expect(root.querySelector(`.${[componentName]ClassNames.content}`)).toBeInTheDocument();
  });
});
```

**Key testing principles:**

- Import the static classNames object from the component
- Use `toHaveClass()` for elements accessible via roles/queries
- Use `querySelector()` with the static class name for internal elements
- Test all selectors, including those on conditionally rendered elements (pass appropriate props)

**Example from NavigationBar:**

```tsx
import { navigationBarClassNames } from '../NavigationBar';

describe('NavigationBar static classNames', () => {
  it('applies static class names to component elements', () => {
    render(
      <NavigationBarWithTheme start={<div>Start</div>}>
        <div>Children</div>
      </NavigationBarWithTheme>,
    );

    const nav = screen.getByRole('navigation');
    expect(nav).toHaveClass(navigationBarClassNames.root);
    expect(nav.querySelector(`.${navigationBarClassNames.start}`)).toBeInTheDocument();
    expect(nav.querySelector(`.${navigationBarClassNames.content}`)).toBeInTheDocument();
  });
});
```

## Step 5: Add Styles API (Mobile Components)

For mobile components, the pattern is simpler (no static classNames):

### 5.1 Add styles prop type

```tsx
export type [ComponentName]Props = {
  // ... other props
  /** Custom styles for individual elements of the [ComponentName] component */
  styles?: {
    /** Root container element */
    root?: StyleProp<ViewStyle>;
    /** [Concise element description] */
    [selectorName]?: StyleProp<ViewStyle | TextStyle>;
    // ... more selectors as needed
  };
};
```

### 5.2 Apply in Component Implementation

```tsx
<View style={[defaultStyles.root, styles?.root]}>
  <View style={[defaultStyles.content, styles?.content]}>{children}</View>
</View>
```

## Step 6: Add JSDoc Notes for Special Cases

If any selectors have special rendering conditions, append the note after the element description with a comma:

```tsx
styles?: {
  /** Header element, only rendered on phone viewport in horizontal direction */
  header?: React.CSSProperties;
};
```

Common cases to document:

- Viewport-specific rendering (phone/tablet/desktop)
- Direction-specific rendering (horizontal/vertical)
- Conditional rendering based on props
- Elements that only render with certain data (e.g., subSteps)

## Reference: StylesAndClassNames Utility

The `StylesAndClassNames` utility type (from `packages/web/src/types.ts`) automatically generates:

```tsx
// Given:
const fooClassNames = {
  root: 'cds-Foo',
  contentWrapper: 'cds-Foo-contentWrapper',
} as const;

// StylesAndClassNames<typeof fooClassNames> generates:
{
  styles?: {
    root?: React.CSSProperties;
    contentWrapper?: React.CSSProperties;
  };
  classNames?: {
    root?: string;
    contentWrapper?: string;
  };
}
```

## Reference: NavigationBar Example

See `packages/web/src/navigation/NavigationBar.tsx` for a complete example of the styles API pattern:

- Lines 16-28: Static classNames with JSDoc
- Line 80: Using `StylesAndClassNames` type on regular Props (not BaseProps)
- Lines 117, 140, 149: Applying classNames with `cx()`
- Lines 125, 142, 152: Applying styles

See `packages/web/src/navigation/__tests__/NavigationBar.test.tsx` for static classNames test example:

- `NavigationBar static classNames` describe block: Tests all static class names are applied

## Step 7: Update Documentation

After adding the styles API to the component, update the documentation:

1. **Run the docgen** to regenerate styles data:

   ```bash
   yarn nx run docs:docgen
   ```

2. **Create or update the styles documentation** following the `/component-docs` command guidelines:
   - Create `_webStyles.mdx` with ComponentStylesTable and StylesExplorer
   - Create `_mobileStyles.mdx` with ComponentStylesTable (if mobile)
   - Update `index.mdx` to import and render the styles tables

See `.cursor/commands/component-docs.md` for detailed documentation templates.

## Final Checklist

Before completing, verify:

- [ ] Reviewed component structure for potential simplifications (flagged to user if found)
- [ ] Selector names are from the approved list (or got user confirmation for new ones)
- [ ] Each selector has a JSDoc comment following the convention (sentence case, no trailing period, concise noun phrase)
- [ ] Class names follow `cds-ComponentName-selectorName` convention (camelCase)
- [ ] Using `StylesAndClassNames` utility type on regular Props (not BaseProps) (web) or manual styles type (mobile)
- [ ] Static classNames applied with `cx()` in component JSX (web only)
- [ ] Dynamic classNames and styles props applied correctly
- [ ] Special rendering conditions documented in JSDoc
- [ ] Tests added for static classNames (web only) - see Step 4.4
- [ ] Ran `yarn nx run docs:docgen` to regenerate styles data
- [ ] Documentation updated (see `/component-docs` command)
- [ ] Updated this file's "Approved Selector Names" table if new selectors were added
