# no-style-prop-css-overrides

Flags JSX elements that **both** (a) receive a Linaria `css` class which sets a CSS property at its top level **and** (b) can be given the cds-web **style prop** that owns that same property — either as an explicit attribute or forwarded through a `{...spread}`. In that situation the `css` class silently overrides the style prop, so the prop value is ignored. Scoped to `packages/web/src` — cds-web is the only package with this styling architecture.

## Why this rule exists

cds-web exposes a public "style prop" API (`height`, `width`, `padding`, `background`, `color`, …). Internally those props are turned into styles by `getStyles` in `packages/web/src/styles/styleProps.ts`:

- **Dynamic props** (`width`, `height`, `top`, `opacity`, the grid/flex sizing props, …) are written as an inline CSS variable (e.g. `--height`) and a Linaria class consumes it: `height: var(--height)`.
- **Static/themed props** (`color`, `background`, `padding`, `gap`, `border*`, `font*`, …) add a prebuilt Linaria class from `packages/web/src/styles/responsive/base.ts`.

The important detail: the declaration that actually sets the property lives in a **single-class** Linaria rule, _not_ in the element's inline `style`. That is deliberate — it keeps the prop **overridable** by consumers. (If the value were set inline via `style={{ height }}`, nothing could override it.)

The cost of that design is that the public style-prop API and any CSS a component writes for the **same** property compete in the **same specificity tier** (one class vs. one class). When specificity ties, the CSS cascade falls back to **source order**: whichever rule appears later in the compiled stylesheet wins.

A component's own `css` block is virtually always emitted **after** the base style-prop classes (import/evaluation order is load-bearing — see the warning at the top of `styleProps.ts`: _"Import order determines CSS cascade order … Do not change the order of these imports or everything will break."_). So when a component hard-codes, say, `height` in a `css` class **and applies that class to an element it also passes a `height` prop to**, the `css` class **silently beats** the prop. The prop appears to do nothing.

This is exactly the bug fixed in **CDS-2118** (`Button` `height`/`width` props not applying).

### Why co-location (not "any owned property")

Hard-coding an owned property in a `css` block is only a problem when that property can actually _reach the same element as a style prop_. Plenty of components legitimately hard-code properties they never expose. Flagging every owned property would be noise.

So the rule keys off **co-location**: it only reports when the element wearing the `css` class can _also be given the matching style prop_. A style prop "reaches" an element in two ways:

1. **As an explicit JSX attribute** — `<Pressable height={height} />`.
2. **Through a spread** — `<Pressable {...props} />`, where `props` carries a style prop the component accepts but didn't destructure out.

The first is pure AST. The second is **type-aware**: the rule resolves the TypeScript type of each `{...spread}` argument and treats any property whose name is a cds-web style prop as able to land on the element. This catches the spread-forwarding footgun (a consumer passes `height`, it flows through `{...props}`, and a `css` class silently overrides it) while staying precise: a property the spread's type doesn't actually contain — e.g. one the component destructured out — is not flagged.

Because the rule needs type information for the spread analysis, its config block enables `projectService` (see [Scope](#scope)). typescript-eslint [recommends against rules that silently change behavior based on whether type info is present](https://typescript-eslint.io/developers/custom-rules#conditional-type-information), so the rule requires it rather than degrading.

## What it flags

**1. An explicit style-prop attribute** on an element wearing a `css` class (imported from `@linaria/core`) that sets the owning property:

```tsx
import { css, cx } from '@linaria/core';

const baseCss = css`
  height: fit-content;
`;

// ❌ Flagged — `height` is set by the css class AND passed explicitly to the same element
const Button = ({ height }: ButtonProps) => <Pressable className={cx(baseCss)} height={height} />;
```

**2. A style prop forwarded through a spread**, when the spread argument's type carries it:

```tsx
// ❌ Flagged — `height` is a ButtonProps style prop, not destructured out, so it reaches
//    Pressable via {...props} and `baseCss`'s `height` silently overrides it.
const Button = ({ background, ...props }: ButtonProps) => (
  <Pressable className={cx(baseCss)} background={background} {...props} />
);
```

`className` is resolved through identifiers, inline `css` templates, `cx`/`cn`/`clsx`/`classnames` calls, and logical/conditional/array/template expressions, so conditionally-applied classes are covered:

```tsx
// ❌ Flagged — when `mono` is truthy, `monoCss` (`font-family: …`) clobbers the `fontFamily` prop
<Box className={cx(baseCss, mono && monoCss)} fontFamily={fontFamily} />
```

`padding`/`margin` shorthands and longhands are compared per physical side, so a css `padding-top` conflicts with a `padding`, `paddingY`, or `paddingTop` prop on the same element. When a prop is both explicit and present in a spread type, only the explicit attribute is reported (it's the more actionable location).

## What it allows

- **A `css` class that sets a property the element can't be given as a prop.** If a property is neither an explicit attribute nor present in any spread's type, it's not flagged — a component hard-coding `display`/`position` it never exposes (and doesn't forward) is fine.
- **A prop destructured out of the spread.** Once `height` is pulled out of `{...rest}`, the spread's type no longer contains it, so it isn't flagged via the spread.
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

- If the property genuinely must be enforced and should _not_ be consumer-overridable, destructure the corresponding style prop out of the spread (so it can't reach the element) and/or don't pass it explicitly, and move the declaration into a nested selector if appropriate.

## Escape hatch

If you have a legitimate co-located use that the rule can't model, disable it for that line — on the explicit attribute or on the spread, whichever is reported:

```tsx
// eslint-disable-next-line internal/no-style-prop-css-overrides
{...props}
```

## Known limitations

- **Cross-file `css` blocks aren't resolved.** Only `css` blocks defined in the same module as the JSX usage are inspected.
- **Spread analysis is only as precise as the type.** A spread argument typed as `any` (or an untyped object) contributes no style props, so a forwarded prop on an untyped value won't be flagged.

## Scope

Configured in `eslint.config.mjs` for `packages/web/src/**/*.{ts,tsx}`, excluding the style system itself (`packages/web/src/styles/**`, which legitimately implements these properties) plus stories, tests, mocks, fixtures, and Figma Code Connect files.

Because the spread analysis needs type information, that config block enables `parserOptions.projectService` for the in-scope files. This is the one place the web lint runs type-aware; it adds a TypeScript program build to linting those files.
