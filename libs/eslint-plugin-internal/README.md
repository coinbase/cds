# eslint-plugin-internal

This is a custom EsLint plugin for use within this repo only; it is not published.

For simplicity there is no build process since the repo root depends on this lib for its lint task. Otherwise, that vital task would be blocked while this project builds.

The plugin encapsulates the following rules:

### no-deprecated-jsdoc

Detects JSDoc comments containing `@deprecated` tags. This rule helps identify deprecated code that should be migrated or removed in later, breaking version releases.

The rule catches deprecation markers on:

- Function declarations
- Variable/const declarations
- Type alias declarations (including properties within object types)
- Interface declarations (including properties)
- Class declarations (including members)
- Export declarations

### safely-spread-props

This rule checks that React component `...spread` props do not contain properties that the receiving component does not expect.
CDS components often compose together type interfaces from many other components. In some of those cases the component with the majority of the props usually receives its props with a `...spread`.
We have encounted situations where developers accidentally forgot to descture a prop intended for a different element and it ended up passed to the wrong component via the spread props.

At this time this rule is intended to only be used within this repo in the cds-web and cds-modile packages. However, after a trial period we may consider opening it up to a wider audience.

### example-screen-default

Ensures every Storybook file default-exports a component whose rendered output is rooted in `ExampleScreen`. This keeps documentation consistent and aligns with the patterns showcased in the mobile package.

### example-screen-contains-example

Validates that any `ExampleScreen` Storybook story ultimately renders at least one `<Example>` component. The rule looks through components defined in the same file to make sure examples exist even when they are encapsulated in helper components.

### figma-connect-no-semicolon

Ensures that import strings in `figma.connect()` imports arrays do not contain trailing semicolons. Code Connect parses semicolons incorrectly when they appear inside the import string, which can lead to parsing errors.

**Why this rule exists**: Figma Code Connect expects import strings in the `imports` array to be valid import statements without semicolons. Since these are string literals, any semicolon should be outside the quotes, not inside them.

**Bad**:

```typescript
figma.connect(Component, 'url', {
  imports: ["import { Button } from '@coinbase/cds-web/buttons/Button';"],
});
```

**Good**:

```typescript
figma.connect(Component, 'url', {
  imports: ["import { Button } from '@coinbase/cds-web/buttons/Button'"],
});
```

This rule includes an automatic fix that removes the trailing semicolon from import strings.
