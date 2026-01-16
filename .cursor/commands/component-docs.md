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

- **Icon names** (`packages/icons/src/IconName.ts`) - All valid icon names for the `icon` prop (e.g., `'checkmark'`, `'close'`, `'warning'`)

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
├── mobileMetadata.json     # If mobile version exists
├── _mobileExamples.mdx    # If mobile version exists
└── _mobilePropsTable.mdx  # If mobile version exists
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
- `figma` and `storybook` fields are optional - only add if provided
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
import WebExamples, { toc as webExamplesToc } from './_webExamples.mdx';
import webMetadata from './webMetadata.json';

<VStack gap={5}>
  <ComponentHeader title="[ComponentName]" webMetadata={webMetadata} />
  <ComponentTabsContainer
    webPropsTable={<WebPropsTable />}
    webExamples={<WebExamples />}
    webExamplesToc={webExamplesToc}
    webPropsToc={webPropsToc}
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
import MobileExamples, { toc as mobileExamplesToc } from './_mobileExamples.mdx';
import mobileMetadata from './mobileMetadata.json';

<VStack gap={5}>
  <ComponentHeader title="[ComponentName]" mobileMetadata={mobileMetadata} />
  <ComponentTabsContainer
    mobilePropsTable={<MobilePropsTable />}
    mobileExamples={<MobileExamples />}
    mobileExamplesToc={mobileExamplesToc}
    mobilePropsToc={mobilePropsToc}
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
    webPropsTable={<WebPropsTable />}
    webExamples={<WebExamples />}
    mobilePropsTable={<MobilePropsTable />}
    mobileExamples={<MobileExamples />}
    webExamplesToc={webExamplesToc}
    mobileExamplesToc={mobileExamplesToc}
    webPropsToc={webPropsToc}
    mobilePropsToc={mobilePropsToc}
  />
</VStack>
```

### Examples

#### Example Structure Guidelines

Examples should follow this recommended structure:

1. **Brief intro** - A short functional note (NOT the full description - that goes in metadata). Mention what the component uses/wraps or key dependencies.
2. **Basics** - Simplest usage explaining how to use the core API
3. **Feature sections** - Group related functionality (Data, Interaction, Styling, etc.)
4. **Accessibility** - How to make the component accessible
5. **Composed Examples** - Real-world use cases combining multiple features

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

## Accessibility

Use `accessibilityLabel` to provide context for screen readers. When [specific scenario], also consider [accessibility guidance].

```jsx live
<[ComponentName]
  accessibilityLabel="Descriptive label for screen readers"
  requiredProp="value"
/>
```

## Composed Examples

### [Real-World Use Case Name]

[Brief description of what this example demonstrates]

```jsx live
function [UseCaseName]() {
  // Use hooks at the top
  const [state, setState] = useState(initialValue);

  // Memoize expensive computations
  const computedValue = useMemo(() => {
    return expensiveComputation(state);
  }, [state]);

  // Memoize callbacks passed to children
  const handleEvent = useCallback(() => {
    // handle event
  }, []);

  return (
    <[ComponentName]
      prop={computedValue}
      onEvent={handleEvent}
    />
  );
}
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

## Accessibility

Use `accessibilityLabel` to provide context for screen readers.

```jsx
<[ComponentName]
  accessibilityLabel="Descriptive label for screen readers"
  requiredProp="value"
/>
```

## Composed Examples

### [Real-World Use Case Name]

[Brief description of what this example demonstrates]

```jsx
function [UseCaseName]() {
  const [state, setState] = useState(initialValue);

  const computedValue = useMemo(() => {
    return expensiveComputation(state);
  }, [state]);

  return (
    <[ComponentName]
      prop={computedValue}
    />
  );
}
```
````

## Best Practices for Examples

### Code Quality

- **Use named functions** for complex examples that need state or effects
- **Memoize with `useMemo`** for expensive computations or computed styles
- **Memoize with `useCallback`** for event handlers passed as props
- **Include accessibility labels** in interactive examples
- **Format values for display** using `Intl.NumberFormat`, `Intl.DateTimeFormat`, etc.

### Documentation Quality

- **Start with introductory prose** explaining what the component does before any code
- **Progress from simple to complex** - basic examples first, composed examples last
- **Cross-reference related components** using markdown links: `[ComponentName](/components/category/ComponentName)`
- **Explain the "why"** not just the "how" - help users understand when to use each feature
- **Show edge cases** like empty states, loading states, error states, missing data

### Common Sections to Consider

Depending on the component, consider including these sections:

- **Setup** - Prerequisites or providers needed (especially for mobile)
- **Data** - How to pass and format data
- **Interaction** - User interaction patterns (click, hover, touch, etc.)
- **Animations** - Motion and transition options
- **Styling** - Customization and theming options
- **Sizing** - Responsive and fixed sizing options
- **Composed Examples** - Real-world use cases

## Final Checklist

Before completing, verify:

- [ ] Researched similar components in other libraries for inspiration
- [ ] Verified component existence in web/mobile
- [ ] Created only necessary platform-specific files
- [ ] Set correct `platform_switcher_options`
- [ ] Metadata files have correct package imports
- [ ] Added `dependencies` field if component has peer dependencies
- [ ] Props tables import from correct package with correct variable names
- [ ] Examples start with introductory prose
- [ ] Examples include accessibility guidance
- [ ] Examples progress from basic to composed
- [ ] Web examples use `jsx live` (or `jsx` for short snippets); mobile examples use `jsx` only (no `live`)
- [ ] ComponentTabsContainer includes only existing platform props
- [ ] All imports use correct source categories
- [ ] Component description is clear and helpful
- [ ] Added optional storybook/figma links if provided

## Additional Notes

1. Source category might differ from docs category
2. Add storybook and figma links to metadata if provided
3. Ensure all examples work and have proper code snippets
4. Include accessibility section with specific examples
5. Test all examples and props tables render correctly
6. For visualization components, use paths like `web-visualization` or `mobile-visualization` instead of `web` or `mobile`
