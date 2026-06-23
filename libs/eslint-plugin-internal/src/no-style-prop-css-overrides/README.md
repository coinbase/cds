# no-style-prop-css-overrides

Flags JSX elements that **both** (a) receive a Linaria `css` class which sets a CSS property at its top level **and** (b) are passed the cds-web **style prop** that owns that same property. In that situation the `css` class silently overrides the style prop, so the prop value is ignored. Scoped to `packages/web/src` — cds-web is the only package with this styling architecture.

## Why this rule exists

cds-web exposes a public "style prop" API (`height`, `width`, `padding`, `background`, `color`, …). Internally those props are turned into styles by `getStyles` in `packages/web/src/styles/styleProps.ts`:

- **Dynamic props** (`width`, `height`, `top`, `opacity`, the grid/flex sizing props, …) are written as an inline CSS variable (e.g. `--height`) and a Linaria class consumes it: `height: var(--height)`.
- **Static/themed props** (`color`, `background`, `padding`, `gap`, `border*`, `font*`, …) add a prebuilt Linaria class from `packages/web/src/styles/responsive/base.ts`.

The important detail: the declaration that actually sets the property lives in a **single-class** Linaria rule, _not_ in the element's inline `style`. That is deliberate — it keeps the prop **overridable** by consumers. (If the value were set inline via `style={{ height }}`, nothing could override it.)

The cost of that design is that the public style-prop API and any CSS a component writes for the **same** property compete in the **same specificity tier** (one class vs. one class). When specificity ties, the CSS cascade falls back to **source order**: whichever rule appears later in the compiled stylesheet wins.

A component's own `css` block is virtually always emitted **after** the base style-prop classes (import/evaluation order is load-bearing — see the warning at the top of `styleProps.ts`: _"Import order determines CSS cascade order … Do not change the order of these imports or everything will break."_). So when a component hard-codes, say, `height` in a `css` class **and applies that class to an element it also passes a `height` prop to**, the `css` class **silently beats** the prop. The prop appears to do nothing.

This is exactly the bug fixed in **CDS-2118** (`Button` `height`/`width` props not applying).

### Why co-location (not "any owned property")

Hard-coding an owned property in a `css` block is only a problem when that property can actually be _set by a prop on the same element_. Plenty of components legitimately hard-code properties they never expose — e.g. `Button`'s base class sets `display: inline-flex` / `text-align: center` for layout, and never accepts `display`/`textAlign` props on that element. Flagging those would be noise.

So the rule keys off **co-location**: it only reports when the element wearing the `css` class is _also explicitly passed the matching style prop_. That is the precise shape of a silent-override bug, and it mirrors the algorithm of "look at the props on the JSX element, and the properties in the css class applied to it, and flag the overlap."

> **Why this is AST-based, not type-checker-based.** The repo lints with `tseslint.configs.recommended` (no `parserOptions.project`/`projectService`), so type information isn't available in the web lint and enabling it package-wide is a deliberate perf/scope tradeoff the repo has avoided. More importantly, type info would _hurt_ precision here: matching against the type of a `{...props}` spread would surface style props a component extends but never intends to expose (cds primitives extend the full `StyleProps` type), re-introducing the very false positives co-location removes. typescript-eslint also [advises against rules that silently change behavior based on whether type info is present](https://typescript-eslint.io/developers/custom-rules#conditional-type-information). Explicit JSX attributes are the high-signal, type-free indicator of intent.

## What it flags

An element that wears a `css` class (imported from `@linaria/core`) setting a property **and** is passed the owning style prop:

```tsx
import { css, cx } from '@linaria/core';

const baseCss = css`
  height: fit-content;
`;

// ❌ Flagged — `height` is set by the css class AND passed as a style prop to the same element
const Button = ({ height }: ButtonProps) => <Pressable className={cx(baseCss)} height={height} />;
```

It resolves the `className` value through identifiers, inline `css` templates, `cx`/`cn`/`clsx`/`classnames` calls, and logical/conditional/array/template expressions, so conditionally-applied classes are covered:

```tsx
// ❌ Flagged — when `mono` is truthy, `monoCss` (`font-family: …`) clobbers the `fontFamily` prop
<Box className={cx(baseCss, mono && monoCss)} fontFamily={fontFamily} />
```

`padding`/`margin` shorthands and longhands are compared per physical side, so a css `padding-top` conflicts with a `padding`, `paddingY`, or `paddingTop` prop on the same element.

## What it allows

- **A `css` class that sets a property the element is _not_ passed as a prop.** A component hard-coding `display`/`position`/`text-align` it never exposes is fine.
- **A style prop on an element whose css class doesn't touch that property** — no overlap, no report.
- **Declarations nested inside selectors, pseudo-states, or at-rules** (`&:hover`, `@media`, descendant selectors) — they live at brace depth ≥ 1, can't be expressed via style props, and don't participate in the single-class source-order tie.
- **`css` not imported from `@linaria/core`.**

## How to fix a violation

- Apply the value through the matching style prop, defaulting it in the component so explicit consumer values still win:

```tsx
// Instead of `height: fit-content` in baseCss + height={height}:
const Button = ({ height = 'fit-content', ...props }: ButtonProps) => (
  <Pressable height={height} {...props} />
);
```

- If the property genuinely must be enforced and should _not_ be consumer-overridable, don't pass the corresponding style prop to that element (or don't expose it), and move the declaration into a nested selector if appropriate.

## Escape hatch

If you have a legitimate co-located use that the rule can't model, disable it for that line:

```tsx
// eslint-disable-next-line internal/no-style-prop-css-overrides
height = { height };
```

## Known limitations

- **Spread-only forwarding isn't matched.** A property forwarded purely via `{...props}` (with no explicit `height={…}` attribute) won't be flagged. This is an intentional precision/recall tradeoff (see "Why this is AST-based" above).
- **Cross-file `css` blocks aren't resolved.** Only `css` blocks defined in the same module as the JSX usage are inspected.

## Scope

Configured in `eslint.config.mjs` for `packages/web/src/**`, excluding the style system itself (`packages/web/src/styles/**`, which legitimately implements these properties) plus stories, tests, mocks, fixtures, and Figma Code Connect files.
