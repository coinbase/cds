# Update Documentation

Creates or updates documentation for a CDS component.

**Important:** Do NOT modify component source code—only documentation files.

## Arguments

- `componentName` (required): The name of the component (e.g., "Button", "TextInput")

## Workflow

### Step 1: Gather Context

1. **Find source code** in `packages/web/src/` and `packages/mobile/src/`
2. **Find existing docs** in `apps/docs/docs/components/`
3. **Research** similar components in Mantine, MUI, shadcn/ui, Ant Design, or Radix UI

### Step 2: Analyze

- Identify gaps vs. these guidelines and other libraries
- Identify what to add: missing Basics, Interaction patterns, Composed Examples
- Identify what to remove: intro paragraphs, over-documentation, unnecessary Accessibility sections

### Step 3: Generate Documentation

Create/update files following the structure and guidelines below.

### Step 4: Present Changes

For each file: show path, explain changes, provide complete updated content.

---

## Setup (new components only)

### 1. ReactLiveScope

Add to `apps/docs/src/theme/ReactLiveScope/index.tsx`:

```ts
import { ComponentName } from '@coinbase/cds-web';
// Add to scope object
```

### 2. sidebars.ts

Add to `apps/docs/sidebars.ts` in the appropriate category.

### 3. docgen.config.js

Add component paths in `apps/docs/docgen.config.js`.

---

## Directory Structure

```
apps/docs/docs/components/[category]/[ComponentName]/
├── index.mdx              # Required
├── webMetadata.json       # If web exists
├── _webExamples.mdx       # If web exists
├── _webPropsTable.mdx     # If web exists
├── mobileMetadata.json    # If mobile exists
├── _mobileExamples.mdx    # If mobile exists
└── _mobilePropsTable.mdx  # If mobile exists
```

Note: Source category (e.g., `accordion`) may differ from docs category (e.g., `layout`).

---

## File Templates

### Metadata (webMetadata.json / mobileMetadata.json)

```json
{
  "import": "import { ComponentName } from '@coinbase/cds-web/[source-category]/[ComponentName]'",
  "source": "https://github.com/coinbase/cds/blob/master/packages/web/src/[source-category]/[ComponentName].tsx",
  "description": "[One sentence: what it does, not when to use it]",
  "figma": "[link]",
  "storybook": "[link]",
  "relatedComponents": [{ "label": "Name", "url": "/components/..." }]
}
```

### Props Tables (\_webPropsTable.mdx / \_mobilePropsTable.mdx)

```mdx
import ComponentPropsTable from '@site/src/components/page/ComponentPropsTable';
import propsData from ':docgen/web/[source-category]/[ComponentName]/data';
import { sharedParentTypes } from ':docgen/_types/sharedParentTypes';
import { sharedTypeAliases } from ':docgen/_types/sharedTypeAliases';

<ComponentPropsTable
  props={propsData}
  sharedTypeAliases={sharedTypeAliases}
  sharedParentTypes={sharedParentTypes}
/>
```

### index.mdx (Cross-Platform)

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

For web-only or mobile-only, adjust `platform_switcher_options` and remove unused imports/props.

---

## Examples Guidelines

### Structure

1. **Basics** — REQUIRED, always first. Show simplest usage + common props (`subtitle`, `media`)
2. **Data / Validation** — For inputs, charts
3. **Interaction** — Controlled state. ONE example, no subheadings
4. **Accessibility** — ONLY if users must provide labels themselves
5. **Styling** — Appearance props. Use simple headers: `### Compact`, `### Disabled`
6. **Composed Examples** — Real-world patterns, always last

### Key Rules

- **No intro paragraph** — Start with `## Basics`
- **Brief text** — 1-2 sentences before code blocks
- **Link related components in Basics** — "Accordion uses [AccordionItem](/link), built on [Collapsible](/link)."
- **Web**: ` ```jsx live ` | **Mobile**: ` ```jsx `
- **Mobile uses** `onPress`, `theme.color.X` | **Web uses** `onClick`, CSS variables

### Good Example

````mdx
## Basics

`Accordion` uses [AccordionItem](/components/layout/AccordionItem/), built on [Collapsible](/components/layout/Collapsible/). Each item requires `itemKey` and `title`.

```jsx live
<Accordion>
  <AccordionItem itemKey="1" title="First" subtitle="Optional">
    Content
  </AccordionItem>
  <AccordionItem itemKey="2" title="Second">
    Content
  </AccordionItem>
</Accordion>
```

Set `defaultActiveKey` to expand an item on initial render.

## Interaction

By default, `Accordion` manages its own state. Use `activeKey` and `setActiveKey` for controlled behavior.

```jsx live
function Example() {
  const [activeKey, setActiveKey] = useState(null);
  return (
    <Accordion activeKey={activeKey} setActiveKey={setActiveKey}>
      <AccordionItem itemKey="1" title="First">
        Content
      </AccordionItem>
    </Accordion>
  );
}
```
````

### Bad Patterns

- ❌ Subheadings within Basics: `### Simple usage`, `### With subtitle`
- ❌ Multiple Interaction examples with subheadings
- ❌ Styling headers like `### With compact` instead of `### Compact`
- ❌ Accessibility section when component handles a11y automatically

---

## Phrasing

| ✅ Do                            | ❌ Don't                                      |
| -------------------------------- | --------------------------------------------- |
| Set `variant` to `"outline"`     | Set the `variant` prop to `"outline"`         |
| `size` controls dimensions       | The `size` prop controls the dimensions       |
| Renders a tooltip on hover       | This will render a tooltip when you hover     |
| Combine with `PeriodSelector`... | You can combine this with `PeriodSelector`... |

**Principles:** Drop "the" before backticked names. Drop "prop"/"component". Drop "you can", "in order to", "note that". Use active voice and present tense.

---

## Checklist

- [ ] No intro paragraph — starts with `## Basics`
- [ ] Common props shown in Basics examples
- [ ] Related components linked naturally
- [ ] Interaction: ONE example, no subheadings
- [ ] Accessibility only if users must handle it
- [ ] Styling headers are simple prop names
- [ ] Composed Examples at the bottom
- [ ] Web and mobile follow same structure
