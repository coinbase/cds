# CDS Web Package Guidelines

Web-specific patterns for `@coinbase/cds-web`.

## Styling with Linaria

Use Linaria for zero-runtime CSS. **Always use CDS theme CSS variables** for colors, spacing, typography, and other design tokens:

```tsx
import { css } from '@linaria/core';

const containerCss = css`
  /* Spacing tokens */
  padding: var(--space-2);
  gap: var(--space-1);

  /* Color tokens */
  background: var(--color-bgPrimary);
  color: var(--color-fgPrimary);
  border: 1px solid var(--color-line);

  /* Border radius tokens */
  border-radius: var(--borderRadius-400);

  /* Typography tokens */
  font-size: var(--fontSize-body);

  &:hover {
    background: var(--color-bgPrimaryHover);
  }
`;

// Compose with cx utility
<div className={cx(containerCss, className)} style={style} />;
```

**IMPORTANT:** Using CSS variables ensures components respond correctly to theme changes (light/dark mode, brand themes).

### Overriding styles

Web components should expose a `className`, `classNames`, `style` and `styles` object props for styling. `classNames` and `styles` can be used for granular overrides on child elements within the component.

**Example:**

```tsx
type ComponentProps = ComponentBaseProps & {
  className?: string;
  style?: React.CSSProperties;
  styles?: { root?: React.CSSProperties; label?: React.CSSProperties };
  classNames?: { root?: string; label?: string };
};
```

- `className` and `style` should always be applied to the root element of the component.
- `classNames`/`styles` should always be in the `*Props` type object, NEVER `*BaseProps`
- While merging root styles give priority to `styles.[ELEMENT_NAME]` over the `style` prop
- While merging classNames give priority to `classNames.[ELEMENT_NAME]` over the `className` prop
- When using the Compound Components pattern (like Stepper or Carousel) the names of the classNames/styles keys should line up with the name of the subcomponents.

## Animation

Use Framer Motion for complex animations:

```tsx
import { m as motion, AnimatePresence } from 'framer-motion';

<AnimatePresence>
  {visible && (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
    />
  )}
</AnimatePresence>;
```

For simple transitions, prefer CSS transitions in Linaria.

## Accessibility

Use ARIA attributes:

```tsx
<div role="group" aria-roledescription="carousel" aria-live="polite">
  <button aria-pressed={isActive} tabIndex={isVisible ? 0 : -1} />
</div>
```

Implement keyboard navigation (Arrow keys, Home, End) for interactive components.

## Web-Specific Props

- `className?: string` - CSS class always applied to root element
- `style?: React.CSSProperties` - inline styles always applied to root elemenet
- Polymorphic `as` prop for element type (where applicable e.g. see Box)

## Reference Components

- **Carousel**: compound components, imperative handle, context pattern
- **Select** (alpha/): generics, controlled/uncontrolled
- **RollingNumber**: animation config, measurement patterns
