# Component Documentation

Create or update documentation for a CDS component on the docsite (apps/docs/).

**Usage:** `/component-docs <ComponentName> [additional context]`

Examples:

- `/component-docs Button`
- `/component-docs LineChart add examples for real-time data updates`
- `/component-docs Avatar needs accessibility improvements`

If no component name is provided, ask the user which component they want to document.

## Step 1: Check for Existing Documentation

First, check if documentation already exists for this component:

```bash
apps/docs/docs/components/*/[ComponentName]/
```

- **If docs exist**: Review the existing documentation and identify what needs to be added, updated, or improved. Consider the user's additional context if provided.
- **If docs don't exist**: Follow the full workflow below to create new documentation.

For updates, focus on the specific areas that need improvement rather than rewriting everything.

### Reference Components

When creating or updating docs, reference these well-documented components to understand the documentation style and patterns:

- **LineChart** (`apps/docs/docs/components/graphs/LineChart/`) - Comprehensive example with many composed examples
- **Button** (`apps/docs/docs/components/buttons/Button/`) - Good basic component documentation
- **IconButton** (`apps/docs/docs/components/buttons/IconButton/`) - Simple component with clear examples
- **Sidebar** (`apps/docs/docs/components/navigation/Sidebar/`) - Complex component with multiple sub-components

Review these before writing to ensure consistency in style, structure, and depth.

### Reference Files

When writing examples, reference these files for valid values:

- **Icon names** (`packages/icons/src/IconName.ts`) - All valid icon names (e.g., `'checkmark'`, `'close'`, `'warning'`)
- **Design tokens** - Follow `.cursor/rules/react-component-development.mdc` for valid CDS design token values (Color, Space, BorderRadius, Font, etc.)

## Step 2: Research Phase (for new docs or major updates)

Before writing documentation, research how other popular component libraries document the same (or similar) component. Use web search to find documentation for the component in:

- **Material UI** (mui.com)
- **Radix UI** (radix-ui.com)
- **Mantine** (mantine.dev)
- **Ant Design** (ant.design)
- **Base UI** (base-ui.com)

Look for:

- What examples they provide and how they're organized
- Common use cases they demonstrate
- Edge cases or patterns worth highlighting
- Accessibility guidance they include
- How they explain complex features

Use these insights to inform your documentation structure and examples.

## Step 3: Check Component Availability

Verify where the component exists:

```bash
packages/web/src/[source-category]/[ComponentName].tsx    # for web
packages/mobile/src/[source-category]/[ComponentName].tsx # for mobile
```

Also check visualization packages if applicable:

- `packages/web-visualization/src/...`
- `packages/mobile-visualization/src/...`

Also check for Storybook stories (`packages/*/src/**/__stories__/[ComponentName].stories.tsx`). If one exists, add the `storybook` field to webMetadata.json.

### Check for Styles

Check if the component supports the `styles` and/or `classNames` props by looking at its type definitions. Components with these props should have a styles tab in the documentation. Look for:

- `styles?: { ... }` prop with named style selectors
- `classNames?: { ... }` prop with named class selectors

If the component has these props, the docgen will generate styles data that can be used for the styles doc.

## Step 4: Required Setup Steps (for new docs only)

Before creating the component documentation, complete these setup steps:

### 4.1 Add to ReactLiveScope

In `apps/docs/src/components/page/ReactLiveScope.ts`, add the component imports and add them to the scope:

```ts
// Add imports
import { ComponentName } from '@coinbase/cds-web';

// Add to scope object
const ReactLiveScope = {
  // ... existing scope
  ComponentName,
};
```

There is a chance that the component has already been imported.

### 4.2 Update sidebars.ts

In `apps/docs/sidebars.ts`, add the component to its category section:

```ts
module.exports = {
  docs: [
    // ... other sections
    {
      type: 'category',
      label: 'Category', // e.g., 'Buttons', 'Layout', etc.
      items: [
        // ... other components
        'components/category/ComponentName/index',
      ],
    },
  ],
};
```

### 4.3 Update docgen.config.js

In `apps/docs/docgen.config.js`, add the component paths to generate props data:

```js
module.exports = {
  web: {
    // ... other configs
    category: {
      // e.g., 'buttons', 'layout', etc.
      ComponentName: {
        source: 'packages/web/src/category/ComponentName.tsx',
      },
    },
  },
  // If component has a mobile version
  mobile: {
    // ... other configs
    category: {
      ComponentName: {
        source: 'packages/mobile/src/category/ComponentName.tsx',
      },
    },
  },
};
```

## Step 5: Create Directory Structure (for new docs only)

Create the documentation directory and files based on component availability:

```bash
apps/docs/docs/components/[docs-category]/[ComponentName]/
├── index.mdx                 # Required for all components
├── webMetadata.json         # If web version exists
├── _webExamples.mdx        # If web version exists
├── _webPropsTable.mdx      # If web version exists
├── _webStyles.mdx          # If web version has styles/classNames API
├── mobileMetadata.json     # If mobile version exists
├── _mobileExamples.mdx    # If mobile version exists
├── _mobilePropsTable.mdx  # If mobile version exists
└── _mobileStyles.mdx      # If mobile version has styles/classNames API
```

## File Templates

### Metadata Files

#### webMetadata.json

```json
{
  "import": "import { ComponentName } from '@coinbase/cds-web/[source-category]/[ComponentName]'",
  "source": "https://github.com/coinbase/cds/blob/master/packages/web/src/[source-category]/[ComponentName].tsx",
  "description": "[Component description]",
  "figma": "[figma link]",
  "storybook": "[storybook link]",
  "relatedComponents": [
    { "label": "[componentName]", "url": "/components/[category]/[componentName]" }
  ],
  "dependencies": [{ "name": "[peer-dependency-name]", "version": "[version-range]" }]
}
```

**Notes:**

- `description` should be the full component description - what the component is and when to use it (e.g., "A non-intrusive notification component that temporarily displays brief messages at the bottom of the screen.")
- `figma` and `storybook` fields are optional - only add if provided (check for story files in `packages/web/src/**/__stories__/`)
- `dependencies` is optional - only include if the component imports from external packages that are peer dependencies. To determine:
  1. Check the component's source file for imports from external packages (e.g., `framer-motion`)
  2. Cross-reference those imports with `peerDependencies` in `packages/web/package.json`
  3. Use the exact version range from `peerDependencies` in the package.json file
- `relatedComponents` should link to components commonly used together

#### mobileMetadata.json

```json
{
  "import": "import { ComponentName } from '@coinbase/cds-mobile/[source-category]/[ComponentName]'",
  "source": "https://github.com/coinbase/cds/blob/master/packages/mobile/src/[source-category]/[ComponentName].tsx",
  "description": "[Component description]",
  "figma": "[figma link]",
  "relatedComponents": [
    { "label": "[componentName]", "url": "/components/[category]/[componentName]" }
  ],
  "dependencies": [{ "name": "[peer-dependency-name]", "version": "[version-range]" }]
}
```

**Notes:**

- `figma` is optional - only add if provided
- `dependencies` is optional - only include if the component imports from external packages that are peer dependencies. To determine:
  1. Check the component's source file for imports from external packages (e.g., `@shopify/react-native-skia`, `react-native-reanimated`, `react-native-gesture-handler`)
  2. Cross-reference those imports with `peerDependencies` in `packages/mobile/package.json`
  3. Use the exact version range from `peerDependencies` in the package.json file

### Props Tables

#### \_webPropsTable.mdx

```mdx
import ComponentPropsTable from '@site/src/components/page/ComponentPropsTable';
import webPropsData from ':docgen/web/[source-category]/[ComponentName]/data';
import { sharedParentTypes } from ':docgen/_types/sharedParentTypes';
import { sharedTypeAliases } from ':docgen/_types/sharedTypeAliases';

<ComponentPropsTable
  props={webPropsData}
  sharedTypeAliases={sharedTypeAliases}
  sharedParentTypes={sharedParentTypes}
/>
```

#### \_mobilePropsTable.mdx

```mdx
import ComponentPropsTable from '@site/src/components/page/ComponentPropsTable';
import mobilePropsData from ':docgen/mobile/[source-category]/[ComponentName]/data';
import { sharedParentTypes } from ':docgen/_types/sharedParentTypes';
import { sharedTypeAliases } from ':docgen/_types/sharedTypeAliases';

<ComponentPropsTable
  props={mobilePropsData}
  sharedTypeAliases={sharedTypeAliases}
  sharedParentTypes={sharedParentTypes}
/>
```

### Styles Doc

Styles doc showcases the `styles` and `classNames` API for components that support custom styling of internal elements. Only create these files if the component has a styles/classNames API.

#### \_webStyles.mdx (with Explorer)

For web components, always include both the selectors table AND the interactive StylesExplorer. The StylesExplorer lets users hover or click on selectors to highlight the corresponding elements in a live example:

```mdx
import { ComponentStylesTable } from '@site/src/components/page/ComponentStylesTable';
import { StylesExplorer } from '@site/src/components/page/StylesExplorer';
import { [ComponentName] } from '@coinbase/cds-web/[source-category]/[ComponentName]';

import webStylesData from ':docgen/web/[source-category]/[ComponentName]/styles-data';

## Explorer

<StylesExplorer selectors={webStylesData.selectors}>
  {(classNames) => (
    <[ComponentName] {...exampleProps} classNames={classNames} />
  )}
</StylesExplorer>

## Selectors

<ComponentStylesTable componentName="[ComponentName]" styles={webStylesData} />
```

If the component requires state management, bundle everything into a single exported example component.

```mdx
import { useState } from 'react';
import { ComponentStylesTable } from '@site/src/components/page/ComponentStylesTable';
import { StylesExplorer } from '@site/src/components/page/StylesExplorer';
import { Select } from '@coinbase/cds-web/alpha/select';

import webStylesData from ':docgen/web/alpha/select/Select/styles-data';

export const SelectExample = ({ classNames }) => {
  const [value, setValue] = useState('1');
  const options = [
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
    { value: '3', label: 'Option 3' },
  ];
  return (
    <Select
      classNames={classNames}
      label="Choose an option"
      value={value}
      onChange={setValue}
      options={options}
      placeholder="Select an option"
      style={{ width: '100%' }}
    />
  );
};

## Explorer

<StylesExplorer selectors={webStylesData.selectors}>
  {(classNames) => <SelectExample classNames={classNames} />}
</StylesExplorer>

## Selectors

<ComponentStylesTable componentName="Select" styles={webStylesData} />
```

**Notes:**

- For components with multiple variants (e.g., horizontal/vertical), add multiple explorer sections with h3 headings
- The `StylesExplorer` passes `classNames` to highlight selected elements

**Creating Comprehensive Explorer Examples:**

The explorer example should be designed to showcase **all available selectors**. Review the component's `classNames` type to identify all selectors, then configure your example to render the elements that use each selector:

- **Check conditional rendering**: Some selectors only appear with certain props (e.g., Stepper's `header` only renders in horizontal mode)
- **Include nested structures**: If the component has nested elements like `subSteps`, include them to showcase selectors like `substepContainer`
- **Add optional content**: Include props like `title` if the component has a `title` selector
- **Use realistic data**: Provide enough items/steps to demonstrate the full component structure

Example for a component with conditional selectors:

```mdx
{/* Steps with subSteps to showcase all selectors including substepContainer */}
export const steps = [
{ id: '1', label: 'Step 1' },
{
id: '2',
label: 'Step 2',
subSteps: [
{ id: '2a', label: 'Sub-step A' },
{ id: '2b', label: 'Sub-step B' },
],
},
{ id: '3', label: 'Step 3' },
];
```

#### \_mobileStyles.mdx (Selectors Only)

For mobile components, only include the selectors table (no interactive explorer):

```mdx
import { ComponentStylesTable } from '@site/src/components/page/ComponentStylesTable';

import mobileStylesData from ':docgen/mobile/[source-category]/[ComponentName]/styles-data';

## Selectors

<ComponentStylesTable componentName="[ComponentName]" styles={mobileStylesData} />
```

### Main Documentation (index.mdx)

#### For Web-Only Components

```mdx
---
id: [component-id]
title: [ComponentName]
platform_switcher_options: { web: true, mobile: false }
hide_title: true
---

import { VStack } from '@coinbase/cds-web/layout';
import { ComponentHeader } from '@site/src/components/page/ComponentHeader';
import { ComponentTabsContainer } from '@site/src/components/page/ComponentTabsContainer';

import webPropsToc from ':docgen/web/[source-category]/[ComponentName]/toc-props';
import WebPropsTable from './_webPropsTable.mdx';
// If component has styles API, add this import:
import WebStyles, { toc as webStylesToc } from './_webStyles.mdx';
import WebExamples, { toc as webExamplesToc } from './_webExamples.mdx';
import webMetadata from './webMetadata.json';

<VStack gap={5}>
  <ComponentHeader title="[ComponentName]" webMetadata={webMetadata} />
  <ComponentTabsContainer
    webExamples={<WebExamples />}
    webExamplesToc={webExamplesToc}
    webPropsTable={<WebPropsTable />}
    webPropsToc={webPropsToc}
    // If component has styles API, add these props:
    webStylesTable={<WebStyles />}
    webStylesToc={webStylesToc}
  />
</VStack>
```

#### For Mobile-Only Components

```mdx
---
id: [component-id]
title: [ComponentName]
platform_switcher_options: { web: false, mobile: true }
hide_title: true
---

import { VStack } from '@coinbase/cds-web/layout';
import { ComponentHeader } from '@site/src/components/page/ComponentHeader';
import { ComponentTabsContainer } from '@site/src/components/page/ComponentTabsContainer';

import mobilePropsToc from ':docgen/mobile/[source-category]/[ComponentName]/toc-props';
import MobilePropsTable from './_mobilePropsTable.mdx';
// If component has styles API, add this import:
import MobileStyles, { toc as mobileStylesToc } from './_mobileStyles.mdx';
import MobileExamples, { toc as mobileExamplesToc } from './_mobileExamples.mdx';
import mobileMetadata from './mobileMetadata.json';

<VStack gap={5}>
  <ComponentHeader title="[ComponentName]" mobileMetadata={mobileMetadata} />
  <ComponentTabsContainer
    mobileExamples={<MobileExamples />}
    mobileExamplesToc={mobileExamplesToc}
    mobilePropsTable={<MobilePropsTable />}
    mobilePropsToc={mobilePropsToc}
    // If component has styles API, add these props:
    mobileStylesTable={<MobileStyles />}
    mobileStylesToc={mobileStylesToc}
  />
</VStack>
```

#### For Cross-Platform Components

```mdx
---
id: [component-id]
title: [ComponentName]
platform_switcher_options: { web: true, mobile: true }
hide_title: true
---

import { VStack } from '@coinbase/cds-web/layout';
import { ComponentHeader } from '@site/src/components/page/ComponentHeader';
import { ComponentTabsContainer } from '@site/src/components/page/ComponentTabsContainer';

import webPropsToc from ':docgen/web/[source-category]/[ComponentName]/toc-props';
import mobilePropsToc from ':docgen/mobile/[source-category]/[ComponentName]/toc-props';
import WebPropsTable from './_webPropsTable.mdx';
import MobilePropsTable from './_mobilePropsTable.mdx';
// If component has styles API, add these imports:
import WebStyles, { toc as webStylesToc } from './_webStyles.mdx';
import MobileStyles, { toc as mobileStylesToc } from './_mobileStyles.mdx';
import WebExamples, { toc as webExamplesToc } from './_webExamples.mdx';
import MobileExamples, { toc as mobileExamplesToc } from './_mobileExamples.mdx';
import webMetadata from './webMetadata.json';
import mobileMetadata from './mobileMetadata.json';

<VStack gap={5}>
  <ComponentHeader
    title="[ComponentName]"
    webMetadata={webMetadata}
    mobileMetadata={mobileMetadata}
  />
  <ComponentTabsContainer
    mobileExamples={<MobileExamples />}
    mobileExamplesToc={mobileExamplesToc}
    mobilePropsTable={<MobilePropsTable />}
    mobilePropsToc={mobilePropsToc}
    // If component has styles API, add these props:
    mobileStylesTable={<MobileStyles />}
    mobileStylesToc={mobileStylesToc}
    webExamples={<WebExamples />}
    webExamplesToc={webExamplesToc}
    webPropsTable={<WebPropsTable />}
    webPropsToc={webPropsToc}
    // If component has styles API, add these props:
    webStylesTable={<WebStyles />}
    webStylesToc={webStylesToc}
  />
</VStack>
```

### Examples

#### Example Structure Guidelines

Examples should follow this recommended structure:

1. **Brief intro** - A short functional note (NOT the full description - that goes in metadata). Mention what the component uses/wraps or key dependencies.
2. **Basics** - Simplest usage explaining how to use the core API
3. **Feature sections** - Group related functionality by topic (e.g., Styling with Color/Sizing subsections)
4. **Accessibility** - How to make the component accessible

**Important:** Do NOT repeat the full component description from metadata in the examples. The examples should focus on _how_ to use the component, not _what_ it is.

#### \_webExamples.mdx (Live Examples)

Web examples use `jsx live` blocks which render interactively in the browser. For short, incomplete code snippets that are meant to illustrate a concept rather than be runnable, you may use plain `jsx` blocks instead.

````mdx
[ComponentName] uses [dependency/wrapper] to [brief functional note]. [Any key setup requirement in one sentence].

## Basics

[Explain how to use the component's core API - e.g., "Call `toast.show()` with a message string to display a toast."]

```jsx live
<[ComponentName]
  requiredProp="value"
/>
```

## [Feature Category]

[Brief explanation of this feature category]

### [Specific Feature]

```jsx live
<[ComponentName]
  featureProp="value"
/>
```

## Styling

### Color

[Show color customization options]

```jsx live
<[ComponentName] color="fgPrimary" />
```

### Sizing

[Show sizing options]

```jsx live
<[ComponentName] size="large" />
```

## Accessibility

Use `accessibilityLabel` to provide context for screen readers. When [specific scenario], also consider [accessibility guidance].

```jsx live
<[ComponentName]
  accessibilityLabel="Descriptive label for screen readers"
  requiredProp="value"
/>
```
````

#### \_mobileExamples.mdx (Static Examples)

Mobile examples use static `jsx` blocks only. **Do not use `jsx live`** - React Native cannot run in the browser.

````mdx
[ComponentName] uses [dependency/wrapper] to [brief functional note]. [Any mobile-specific behavior in one sentence, e.g., "On mobile, toasts can be swiped away."]

## Basics

[Explain how to use the component's core API - e.g., "Call `toast.show()` with a message string to display a toast."]

```jsx
<[ComponentName]
  requiredProp="value"
/>
```

## [Feature Category]

[Brief explanation of this feature category]

### [Specific Feature]

```jsx
<[ComponentName]
  featureProp="value"
/>
```

## Styling

### Color

[Show color customization options]

```jsx
<[ComponentName] color="fgPrimary" />
```

### Sizing

[Show sizing options]

```jsx
<[ComponentName] size="large" />
```

## Accessibility

Use `accessibilityLabel` to provide context for screen readers.

```jsx
<[ComponentName]
  accessibilityLabel="Descriptive label for screen readers"
  requiredProp="value"
/>
```
````

## Best Practices for Examples

### Code Quality

- **Use named functions** for complex examples that need state or effects
- **Memoize with `useMemo`** for expensive computations or computed styles
- **Memoize with `useCallback`** for event handlers passed as props
- **Include accessibility labels** in interactive examples
- **Format values for display** using `Intl.NumberFormat`, `Intl.DateTimeFormat`, etc.
- **Ensure live examples are responsive** - The doc site can be viewed on mobile viewports, so examples should render well at narrow widths (e.g., add `flexWrap="wrap"` to HStacks with multiple items)

### Documentation Quality

- **Start with introductory prose** explaining what the component does before any code
- **Progress from simple to complex** - basic examples first, advanced examples last
- **Cross-reference related components** using markdown links: `[ComponentName](/components/category/ComponentName)`
- **Explain the "why"** not just the "how" - help users understand when to use each feature
- **Show edge cases** like empty states, loading states, error states, missing data

### Common Sections to Consider

Depending on the component, consider including these sections:

- **Setup** - Prerequisites or providers needed (especially for mobile)
- **Basics** - Core API usage
- **Feature-specific sections** - Group related functionality (e.g., if the component works with other components, show that integration)
- **Styling** - Color, Sizing, and other customization options as subsections
- **Accessibility** - Screen reader support, keyboard navigation, etc.
- **Composed Examples** - Used for complex components where showing real-world patterns that combine multiple features into new component compositions adds significant value.

## Final Checklist

Before completing, verify:

- [ ] Researched similar components in other libraries for inspiration
- [ ] Verified component existence in web/mobile
- [ ] Created only necessary platform-specific files
- [ ] Set correct `platform_switcher_options`
- [ ] Metadata files have correct package imports
- [ ] Added `dependencies` field if component has peer dependencies
- [ ] Props tables import from correct package with correct variable names
- [ ] Styles files created if component has styles/classNames API
- [ ] StylesExplorer is used in web styles (if present) and includes working example with appropriate props
- [ ] Examples start with introductory prose
- [ ] Examples include accessibility guidance
- [ ] Examples progress from basic to advanced
- [ ] Web examples use `jsx live` (or `jsx` for short snippets); mobile examples use `jsx` only (no `live`)
- [ ] ComponentTabsContainer includes only existing platform props
- [ ] All imports use correct source categories
- [ ] Component description is clear and helpful
- [ ] Added storybook/figma links if story files exist or links are provided
- [ ] Design token values are valid (reference `.cursor/rules/react-component-development.mdc`)

## Additional Notes

1. Source category might differ from docs category
2. Add storybook and figma links to metadata if provided
3. Ensure all examples work and have proper code snippets
4. Include accessibility section with specific examples
5. Test all examples and props tables render correctly
6. For visualization components, use paths like `web-visualization` or `mobile-visualization` instead of `web` or `mobile`
