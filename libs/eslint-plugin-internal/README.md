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

### figma-connect-imports-required

Ensures that `figma.connect()` calls have a non-empty `imports` array. This rule validates that:

- The `imports` property exists in the config object
- The `imports` property is an array
- The `imports` array contains at least one import statement

### figma-connect-imports-package-match

Ensures that import paths in `figma.connect()` calls match the package context of the file. This rule validates that imports come from the same package as the file containing the `figma.connect()` call. Shared packages like `@coinbase/cds-common` are allowed from any context.
