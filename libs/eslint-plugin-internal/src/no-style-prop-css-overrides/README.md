# no-style-prop-css-overrides

Disallows setting, inside a Linaria `css` block, any CSS property that a cds-web **style prop** already owns (e.g. `height`, `width`, `padding-top`, `background-color`, `display`). Scoped to `packages/web/src` — cds-web is the only package with this styling architecture.

## Why this rule exists

cds-web exposes a public "style prop" API (`height`, `width`, `padding`, `background`, `color`, …). Internally those props are turned into styles by `getStyles` in `packages/web/src/styles/styleProps.ts`:

- **Dynamic props** (`width`, `height`, `top`, `opacity`, the grid/flex sizing props, …) are written as an inline CSS variable (e.g. `--height`) and a Linaria class consumes it: `height: var(--height)`.
- **Static/themed props** (`color`, `background`, `padding`, `gap`, `border*`, `font*`, …) add a prebuilt Linaria class from `packages/web/src/styles/responsive/base.ts`.

The important detail: the declaration that actually sets the property lives in a **single-class** Linaria rule, _not_ in the element's inline `style`. That is deliberate — it keeps the prop **overridable** by consumers. (If the value were set inline via `style={{ height }}`, nothing could override it.)

The cost of that design is that the public style-prop API and any CSS a component writes for the **same** property compete in the **same specificity tier** (one class vs. one class). When specificity ties, the CSS cascade falls back to **source order**: whichever rule appears later in the compiled stylesheet wins.

A component's own `css` block is virtually always emitted **after** the base style-prop classes (import/evaluation order is load-bearing — see the warning at the top of `styleProps.ts`: _"Import order determines CSS cascade order … Do not change the order of these imports or everything will break."_). So a component that hard-codes, say, `height` in its `css` block **silently beats** the consumer's `height` prop. The prop appears to do nothing.

This is exactly the bug fixed in **CDS-2118** (`Button` `height`/`width` props not applying).

### The rule, stated precisely

> A component should never style a property through its own CSS class when that property is also part of the public style-prop contract. Set the default through the prop pipeline instead (e.g. a default prop value flowing through `getStyles`), so there is a single source of truth and an explicit consumer value wins predictably.

The worst outcome — and what this rule prevents — is **exposing a prop that silently no-ops**. A component should either honor the prop (route the default through the prop) or not advertise it.

## What it flags

Only **top-level** declarations of owned properties inside a `css` tagged template imported from `@linaria/core`:

```ts
import { css } from '@linaria/core';

// ❌ Flagged — these properties are owned by the height/width/background/padding style props
const buttonClass = css`
  height: 40px;
  width: 100%;
  background-color: var(--color-bgPrimary);
  padding-top: 8px;
`;
```

## What it allows

- **Properties no style prop owns** (`cursor`, `transition`, `text-overflow`, `white-space`, `outline`, gradients via the `background` shorthand, …).
- **Declarations nested inside selectors, pseudo-states, or at-rules** — these live at brace depth ≥ 1 and cannot be expressed via static style props anyway:

```ts
// ✅ Allowed — pseudo-state and media query styling can't be done via style props
const klass = css`
  cursor: pointer;
  &:hover {
    background-color: var(--color-bgPrimaryHover);
  }
  @media (min-width: 768px) {
    height: 40px;
  }
`;
```

- **Multi-value `padding` / `margin` shorthands** (`padding: 4px 8px`) — the single-token `padding`/`margin` style props can't express them.
- **`css` not imported from `@linaria/core`.**

## How to fix a violation

- Apply the value through the matching style prop, defaulting it in the component so explicit consumer values still win:

```tsx
// Instead of `height: 40px` in a css block:
const Button = ({ height = 40, ...props }: ButtonProps) => <Pressable height={height} {...props} />;
```

- If the property genuinely must be enforced and should _not_ be consumer-overridable, don't expose the corresponding style prop (or document the constraint), and move the declaration into a nested selector if appropriate.

## Escape hatch

If you have a legitimate top-level use that the rule can't model, disable it for that line:

```ts
// eslint-disable-next-line internal/no-style-prop-css-overrides
height: 40px;
```

## Scope

Configured in `eslint.config.mjs` for `packages/web/src/**`, excluding the style system itself (`packages/web/src/styles/**`, which legitimately implements these properties) plus stories, tests, mocks, fixtures, and Figma Code Connect files.
