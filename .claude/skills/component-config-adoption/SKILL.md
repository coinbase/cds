---
name: component-config-adoption
description: Add ComponentConfigProvider support to CDS web and mobile components. Use this whenever a user asks to wire a component into provider-level component config defaults, use useComponentConfig, or update ComponentConfig entries.
---

# Component Config Adoption

Adopt the component config system for a specific CDS component on web and/or mobile.

## When To Use

Use this skill when the request includes any of the following:

- "add component config support"
- "wire this component to `useComponentConfig`"
- "make this component configurable from `ComponentConfigProvider`"
- "add component key to `ComponentConfig`"
- "port config adoption from another component"

Always use this skill if a component should read default props from `ComponentConfigProvider`.

## Inputs To Confirm

Before coding, identify:

1. Component name (for example `Button`, `Tag`, `DatePicker`)
2. Platform (`web`, `mobile`, or both)
3. Target prop type to register in `ComponentConfig` (for initial rollout, use `*BaseProps`)
4. Whether style merge behavior is needed in provider stories/tests

## Implementation Steps

### 1) Register Component In Config Types

Add imports and `ComponentConfig` entries in:

- `packages/web/src/core/componentConfig.ts`
- `packages/mobile/src/core/componentConfig.ts`

For the current baseline setup, keep this map intentionally small (`Button` only on web/mobile) for easier validation.

Pattern:

```ts
import type { MyComponentBaseProps } from '../category/MyComponent';

export type ComponentConfig = {
  MyComponent?: ConfigResolver<MyComponentBaseProps>;
};
```

Notes:

- Use `ConfigResolver<...>` so both static object config and functional config are supported.
- Use `*BaseProps` for resolver typing to avoid platform specific and polymorphic type issues.

### 2) Adopt `useComponentConfig` In Component

Use `useComponentConfig` early in the component implementation, before final prop destructuring logic.

Naming convention (always follow this):

- input parameter name: `_props`
- merged variable name: `mergedProps`
- destructure pattern: `const { A, B, C, ...props } = mergedProps`
- avoid destructuring directly from `_props` once config support is added

Web template:

```tsx
import { useComponentConfig } from '../hooks/useComponentConfig';

export const MyComponent = memo((_props: MyComponentProps) => {
  const mergedProps = useComponentConfig('MyComponent', _props);
  const {
    // destructure from mergedProps
    className,
    style,
    ...props
  } = mergedProps;

  return (
    <Box className={className} style={style} {...props}>
      {/* content */}
    </Box>
  );
});
```

Mobile template:

```tsx
import { useComponentConfig } from '../hooks/useComponentConfig';

export const MyComponent = memo((_props: MyComponentProps) => {
  const mergedProps = useComponentConfig('MyComponent', _props);
  const {
    // destructure from mergedProps
    style,
    ...props
  } = mergedProps;

  return (
    <Pressable style={style} {...props}>
      {/* content */}
    </Pressable>
  );
});
```

### 3) Normalize Component Declaration Style

When touching a CDS component file for config adoption, convert legacy function declarations to arrow-function style if practical in the same change.

Preferred pattern:

```tsx
export const MyComponent = memo((_props: MyComponentProps) => {
  // ...
});
```

For polymorphic or `forwardRef` components, keep the existing type safety, but still prefer arrow-form internals:

```tsx
export const MyComponent = memo(
  forwardRef<SomeRef, SomeProps>((_props, ref) => {
    // ...
  }),
);
```

Do not force conversion when it creates risky generic/ref churn; preserve correctness over style churn.

### 4) Keep Existing Prop Precedence Rules

Do not change component-level precedence accidentally:

- Provider config is defaults.
- Local component props must still win.
- Provider merge flags only affect style-like props:
  - web: `mergeClassNameAndStyle`
  - mobile: `mergeStyleProps`

### 4.1) Scope of Component Theming

Component config is for **prop-level theming defaults** only:

- Good use: default visual/styling props (for example `padding`, `color`, `font`, `borderRadius`)
- Good use: design-token-level defaults that are safe to override locally
- Avoid: changing behavioral logic, control flow, semantics, or component architecture
- Avoid: using config to introduce opinionated implementation changes (for example altering how `HStack` layout logic works)

Type config resolvers with `*BaseProps` (not platform-specific `*Props`) so defaults stay stable and platform-safe.

### 5) Add Or Update Tests

Add focused tests for the adopted component:

- confirms provider defaults apply
- confirms local props override provider defaults
- confirms functional resolver behavior (if relevant)
- if config map is intentionally minimal, avoid tests that reference unregistered component keys

Where possible, follow the existing `ComponentConfigProvider` test style:

- web: `packages/web/src/system/__tests__/ComponentConfigProvider.test.tsx`
- mobile: `packages/mobile/src/system/__tests__/ComponentConfigProvider.test.tsx`

### 6) Add Story Coverage

Add story examples that demonstrate:

- static config defaults
- local override behavior
- nested provider isolated-scope behavior
- keep examples aligned with currently registered keys (Button-only when using baseline setup)

Preferred locations:

- `packages/web/src/system/__stories__/ComponentConfigProvider.stories.tsx`
- `packages/mobile/src/system/__stories__/ComponentConfigProvider.stories.tsx`

## Quick Checklist

- [ ] `ComponentConfig` contains the new component key(s)
- [ ] Component imports `useComponentConfig`
- [ ] Component calls `useComponentConfig('ComponentName', _props)`
- [ ] Component parameter is named `_props`
- [ ] Props are destructured from `mergedProps` into `...props`
- [ ] Destructuring is performed from merged props
- [ ] Component declaration uses arrow-function style where safe
- [ ] Existing behavior still passes tests
- [ ] Story examples cover static + override + nested isolated scopes
- [ ] Exports remain intact for any new public APIs

## Common Pitfalls

- Forgetting to register the component in `ComponentConfig` causes type errors or prevents config usage.
- Calling `useComponentConfig` after deriving props can bypass expected defaults.
- Using unregistered config keys in tests/stories leads to noisy failures during initial rollout.
- Using `*Props` for polymorphic components can over-narrow resolver typing (for example default `'button'` on web).
- Accidentally changing `memo` / `forwardRef` wrappers during adoption.
