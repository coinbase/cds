# Type Analyzer

Developer tooling for inspecting TypeScript types and explaining where their properties come from.

The analyzer is useful for CDS component prop types that are composed from intersections, utility
types, imported aliases, and inline object literals. It returns structured data from a reusable API
and also includes a thin CLI for quick terminal inspection.

## CLI Usage

Analyze a type from a source file:

```sh
yarn nx run type-analyzer:analyze -- --file packages/mobile/src/buttons/SlideButton.tsx --type SlideButtonHandleProps
```

By default, the analyzer walks up from `--file` to find the nearest `tsconfig.json`. You can override
that when needed:

```sh
yarn nx run type-analyzer:analyze -- --file packages/mobile/src/buttons/SlideButton.tsx --type SlideButtonHandleProps --tsconfig packages/mobile/tsconfig.build.json
```

Output formats:

```sh
yarn nx run type-analyzer:analyze -- --file packages/mobile/src/buttons/SlideButton.tsx --type SlideButtonHandleProps --format text
yarn nx run type-analyzer:analyze -- --file packages/mobile/src/buttons/SlideButton.tsx --type SlideButtonHandleProps --format markdown
yarn nx run type-analyzer:analyze -- --file packages/mobile/src/buttons/SlideButton.tsx --type SlideButtonHandleProps --format json
```

Include nested origin groups:

```sh
yarn nx run type-analyzer:analyze -- --file packages/mobile/src/buttons/SlideButton.tsx --type SlideButtonHandleProps --nested
```

Nested grouping is off by default. Without `--nested`, the CLI shows only the top-level composition
buckets for the inspected type.

## Nested Origin Behavior

When `--nested` or `includeNestedOrigins: true` is enabled, the analyzer recursively expands composed
types declared in this repo so you can see where inherited properties are introduced.

Types declared in `node_modules` are treated as leaves. The analyzer lists the flattened properties
for those dependency types, but it does not recurse into dependency-internal helper types or heritage
chains. This keeps output focused on CDS-owned type composition while still showing the external
props included by dependency types.

By default, long expanded property types are displayed using the shortest readable declared type when
one is available. Opt into fully expanded TypeScript checker output when you need the complete type:

```sh
yarn nx run type-analyzer:analyze -- --file packages/mobile/src/buttons/SlideButton.tsx --type SlideButtonHandleProps --expand-types
```

## API Usage

The core API is independent from CLI formatting so other tools can use the structured result directly.

```ts
import { analyzeType } from '@cds/type-analyzer';

const result = analyzeType({
  filePath: 'packages/mobile/src/buttons/SlideButton.tsx',
  symbolName: 'SlideButtonHandleProps',
  includeNestedOrigins: true,
  expandTypes: false,
});

console.log(result.groups);
console.log(result.properties);
```

## Example Output

Given a composed type like this:

```ts
export type ComposedProps = BaseProps &
  PickedProps &
  Omit<BaseProps, 'removed'> & {
    inline?: Date;
    shared: 1 | 2;
  };
```

The text output groups flattened properties by origin:

```text
Type: ComposedProps
File: /Users/example/cds-public/libs/type-analyzer/src/__testfixtures__/basic/types.ts
TSConfig: /Users/example/cds-public/libs/type-analyzer/src/__testfixtures__/basic/tsconfig.json
Properties: 5

Groups:
BaseProps (kind=type-reference, declared=src/__testfixtures__/basic/types.ts:1:1)
  - base: string
  - removed: boolean
  - shared: 1 | 2
PickedProps (kind=type-reference, declared=src/__testfixtures__/basic/types.ts:13:1)
  - extra?: boolean | undefined
  - shared: 1 | 2
BaseProps (kind=utility, utility=Omit, declared=src/__testfixtures__/basic/types.ts:1:1)
  - base: string
  - shared: 1 | 2
inline (kind=inline)
  - inline?: Date | undefined
  - shared: 1 | 2
```

## Development

Run the analyzer tests:

```sh
yarn nx run type-analyzer:test
```

Typecheck the library:

```sh
yarn nx run type-analyzer:typecheck
```

Lint the library:

```sh
yarn nx run type-analyzer:lint
```
