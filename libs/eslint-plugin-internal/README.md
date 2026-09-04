# eslint-plugin-internal

This is a custom EsLint plugin for use within this repo only; it is not published.

For simplicity there is no build process since the repo root depends on this lib for its lint task. Otherwise, that vital task would be blocked while this project builds.

The plugin encapsulates the following rules:

## deprecated-jsdoc-has-removal-version

Enforces that every JSDoc `@deprecated` tag meets two requirements:

1. The `@deprecated` text ends with the standard prose: `This will be removed in a future major release.`
2. The same JSDoc block includes a `@deprecationExpectedRemoval vX[.Y.Z]` tag specifying the planned removal version.

Together these rules:

1. ensure consumers see a consistent removal notice in their IDE tooltips
2. gives us a way to track and be held accountable for older deprecations

**Invalid** — missing both:

```ts
/** @deprecated Use React.useState instead. */
function useToggler() {}
```

**Invalid** — prose present but tag missing:

```ts
/**
 * @deprecated Use React.useState instead. This will be removed in a future major release.
 */
function useToggler() {}
```

**Invalid** — tag present but prose missing or not at end of `@deprecated` text:

```ts
/**
 * @deprecated Use React.useState instead.
 * @deprecationExpectedRemoval v7
 */
function useToggler() {}
```

**Valid:**

```ts
/**
 * @deprecated Use React.useState instead. This will be removed in a future major release.
 * @deprecationExpectedRemoval v7.0.0
 */
function useToggler() {}
```

The rule catches deprecation markers on the same node types as `no-deprecated-jsdoc`:

- Function declarations
- Variable/const declarations
- Type alias declarations (including properties within object types)
- Interface declarations (including properties)
- Class declarations (including members)
- Export declarations

## no-cds-barrel-imports

Disallows importing from any barrel (`index.*`) file within CDS package source. A barrel re-exports from many modules in one shot, which forces bundlers to load and tree-shake the entire group even when the consumer only needs one export — slowing downstream builds.

The rule catches two distinct patterns:

**Relative barrel imports** (primary case — inside CDS packages): a relative specifier that resolves on disk to an `index.*` file.

```ts
// packages/mobile/src/overlays/Toast.tsx
import { Button } from '../buttons'; // resolves to ../buttons/index.ts — flagged
import { Box } from '../layout'; // resolves to ../layout/index.ts  — flagged
```

**External package barrel imports**: an import from a `@coinbase/cds-*` package entry point that the consuming workspace's `package.json` declares as a dependency and that resolves to a barrel.

```ts
import { useTheme } from '@coinbase/cds-common'; // root barrel — flagged
import { AvatarShape } from '@coinbase/cds-common/types'; // subpath barrel — flagged
```

Both patterns are covered for all import/export syntaxes:

- `import` / `import type` declarations
- Side-effect `import '...'`
- Dynamic `import('...')`
- `require('...')`
- `export { ... } from '...'` / `export * from '...'`

### Autofix

The rule is **auto-fixable** for named and default `import` / `export { … } from` statements that target an **external package barrel** (`@coinbase/cds-*`). When applied, the rule resolves each imported name to the leaf module that actually declares it and rewrites the statement to import directly from that subpath. Because one barrel import can pull names from many leaf modules, it is split into as many import statements as there are distinct destination modules:

```ts
// Before
import { getWidthInEm, join, useToggler } from '@coinbase/cds-common';

// After (yarn nx run <project>:lint --fix)
import { getWidthInEm } from '@coinbase/cds-common/utils/getWidthInEm';
import { join } from '@coinbase/cds-common/utils/join';
import { useToggler } from '@coinbase/cds-common/hooks/useToggler';
```

Aliases (`a as b`), whole-statement `import type`, and per-specifier `type` modifiers are all preserved. Resolution is **all-or-nothing per statement**: if any imported name can't be traced to a leaf module (e.g. a name from another package, a namespace import, or an unknown export), the statement is flagged but left unfixed so the autofix never produces a broken import. Side-effect imports, `export *`, dynamic `import()`, and `require()` are flagged but not auto-fixable.

**Relative barrel imports are not auto-fixable** — the correct replacement depends on which specific export from the barrel a file needs, and that intent can't be recovered mechanically. Fix these by hand by changing the specifier to point directly at the leaf file (e.g. `'../buttons/Button'` instead of `'../buttons'`).

To trace names to leaves, the rule resolves the barrel via the package's `exports` map and follows its `export … from` / `export *` graph down to the declaring file. Source files (`src/`) are always preferred over compiled output (`esm/`, `dts/`) so that TypeScript `type`-only exports — which are erased from compiled JS — remain traceable.

### Discovery

**Relative barrels** are detected by resolving the specifier on disk at lint time: if the resolved path matches `index.*`, it's a barrel.

**External package barrels** are detected dynamically. For each file being linted, the rule walks up to the nearest `package.json`, collects all `@coinbase/cds-*` dependencies, and reads each package's `exports` map to find barrel entries.

A package is subject to the external-barrel check only if it declares at least one **subpath** barrel in `exports` (e.g. `"./buttons"` → `./esm/buttons/index.js`). Packages that expose only a root `.` barrel — such as `@coinbase/cds-icons` — are **not** subject to the rule. Wildcard `./*` exports are not themselves barrels and are not blocked, so leaf-module imports like `@coinbase/cds-web/buttons/Button` remain valid.

All resolved data is cached per ESLint process so repeated lint invocations across a workspace do not redo file I/O.

### Scope

In `eslint.config.mjs` the rule is scoped to the **published source** of the three platform packages: `packages/web/src`, `packages/mobile/src`, and `packages/common/src`. Files that aren't shipped in the package build are excluded: stories (`*.stories.*`, `__stories__/`), Figma Code Connect (`*.figma.*`, `__figma__/`), tests (`*.test.*`, `*.spec.*`, `__tests__/`), mocks, and fixtures.

**Invalid:**

```ts
// Relative barrel (resolves to ../buttons/index.ts)
import { Button } from '../buttons';

// External root barrel
import { useTheme } from '@coinbase/cds-common';

// External subpath barrel (declared in @coinbase/cds-common/package.json#exports as "./types")
import { AvatarShape } from '@coinbase/cds-common/types';

// Re-export from a barrel
export * from '@coinbase/cds-common/types';
```

**Valid:**

```ts
// Relative import that resolves directly to a leaf file
import { Button } from '../buttons/Button';

// External deep subpath that doesn't match any declared barrel export
import { ThemeProvider } from '@coinbase/cds-common/theme/ThemeProvider';

// CDS packages without subpath barrels are not subject to the external check
import { someIcon } from '@coinbase/cds-icons';
```

## no-deprecated-jsdoc

Detects JSDoc comments containing `@deprecated` tags. This rule helps identify deprecated code that should be migrated or removed in later, breaking version releases.

The rule catches deprecation markers on:

- Function declarations
- Variable/const declarations
- Type alias declarations (including properties within object types)
- Interface declarations (including properties)
- Class declarations (including members)
- Export declarations

## no-object-rest-spread-in-worklet

Disallows object rest/spread syntax inside functions marked with the Reanimated `'worklet'` directive.

This prevents crashes where transpiled helper functions (such as Babel's `_objectWithoutPropertiesLoose`) are called on the UI thread as non-worklet functions.

Examples this rule flags inside worklets:

- `const { delay, ...config } = transition`
- `const next = { ...config, duration: 200 }`

Recommended pattern inside worklets:

- Read fields directly (for example, `const delayMs = transition.delay`)
- Pass existing objects directly when safe, rather than reconstructing with spread

## no-style-prop-css-overrides

Flags a JSX element that **both** wears a Linaria `css` class setting a CSS property at its top level **and** can be given the cds-web **style prop** that owns that property — as an explicit attribute or forwarded through a `{...spread}`. Scoped to `packages/web/src` — cds-web is the only package with this styling architecture.

cds-web style props compile to **single-class** Linaria rules (the value is injected as an inline CSS variable, but the declaration that consumes it lives in a class), which keeps them consumer-overridable. A component's own `css` class sets the same property at the **same specificity** but is emitted **later** in the stylesheet, so it wins the CSS source-order tiebreaker and silently overrides the value passed via the style prop. This is the class of bug fixed in CDS-2118 (`Button` `height`/`width` props not applying).

The rule keys off **co-location**: it only reports when the element carrying the `css` class can also be given the matching style prop — the precise shape of a silent-override bug. A style prop reaches an element either as an explicit attribute (pure AST) or via a `{...spread}` whose **type** carries it (type-aware). Hard-coding a property a component never exposes or forwards is allowed. It resolves `className` through `cx`/`cn`/`clsx`/`classnames`, inline `css`, and logical/conditional/array expressions, and compares `padding`/`margin` shorthands and longhands per physical side. Declarations nested in selectors/pseudo-states/at-rules and `css` not imported from `@linaria/core` are ignored. Because of the spread analysis the rule is type-aware and its config block enables `projectService`.

See [`src/no-style-prop-css-overrides/README.md`](./src/no-style-prop-css-overrides/README.md) for the full rationale, the cascade mechanics, the spread analysis, and remediation guidance.

**Invalid:**

```tsx
import { css, cx } from '@linaria/core';

const baseCss = css`
  height: fit-content;
`;

// `height` is set by the css class AND passed as a style prop to the same element
const Button = ({ height }: ButtonProps) => <Pressable className={cx(baseCss)} height={height} />;
```

**Valid:**

```tsx
import { css, cx } from '@linaria/core';

const baseCss = css`
  display: inline-flex; // never exposed as a `display` prop on this element
`;

// no `display` prop passed here, so the css class isn't overriding anything
const Button = (props: ButtonProps) => <Pressable className={cx(baseCss)} background="bgPrimary" />;
```

## safely-spread-props

This rule checks that React component `...spread` props do not contain properties that the receiving component does not expect.
CDS components often compose together type interfaces from many other components. In some of those cases the component with the majority of the props usually receives its props with a `...spread`.
We have encountered situations where developers accidentally forgot to destructure a prop intended for a different element and it ended up passed to the wrong component via spread props.

At this time this rule is intended to only be used within this repo in the cds-web and cds-mobile packages. However, after a trial period we may consider opening it up to a wider audience.

## spread-props-last

Requires JSX spread props that come from a component's own `props` parameter to appear after all explicit JSX props in an element.

This helps avoid accidental prop overrides and keeps prop ordering predictable:

- Good: `<Button variant="primary" disabled {...props} />`
- Bad: `<Button {...props} variant="primary" disabled />`
- Supports autofix by moving the relevant spread props to the end of the JSX attributes.

## example-screen-default

Ensures every Storybook file default-exports a component whose rendered output is rooted in `ExampleScreen`. This keeps documentation consistent and aligns with the patterns showcased in the mobile package.

## example-screen-contains-example

Validates that any `ExampleScreen` Storybook story ultimately renders at least one `<Example>` component. The rule looks through components defined in the same file to make sure examples exist even when they are encapsulated in helper components.

## figma-connect-imports-required

Ensures that `figma.connect()` calls have a non-empty `imports` array. This rule validates that:

- The `imports` property exists in the config object
- The `imports` property is an array
- The `imports` array contains at least one import statement

## figma-connect-imports-package-match

Ensures that import paths in `figma.connect()` calls match the package context of the file. This rule validates that imports come from the same package as the file containing the `figma.connect()` call. Shared packages like `@coinbase/cds-common` are allowed from any context.

## no-typescript-in-jsx-codeblock

An ESLint _processor_ (not a traditional rule) for MDX files that detects fenced code blocks marked as ` ```jsx ` which contain TypeScript syntax. These blocks should either use `tsx` as the language tag or have the TypeScript annotations removed.

Because MDX files cannot be parsed by standard JavaScript/TypeScript parsers, this is implemented as a processor that scans raw MDX text for code fence patterns and injects lint messages in postprocess. It supports autofix, replacing `jsx` with `tsx` in the language tag.

TypeScript patterns detected include:

- Type alias and interface declarations
- Parameter type annotations (destructured and non-destructured)
- Variable type annotations
- Return type annotations on arrow functions
- Generic type arguments
