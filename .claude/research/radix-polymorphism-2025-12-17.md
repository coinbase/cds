# Radix Primitives: Polymorphism Implementation

## Executive Summary

Radix Primitives implements polymorphism through an `asChild` prop pattern powered by a `Slot` component that merges props onto child elements. This approach allows any Radix component to be rendered as a different element while preserving all behaviors, accessibility attributes, and event handlers. The implementation is type-safe, composable, and designed to work seamlessly with React's component model.

## Overview

Radix's polymorphism system is a carefully designed pattern that enables developers to swap the underlying DOM element of any component without losing functionality. Rather than using the traditional `as` prop pattern (which re-renders the entire component), Radix uses a slot-based approach that clones and merges props onto child elements.

The system consists of three core pieces:
1. **Primitive** - Base components that wrap HTML elements and support `asChild`
2. **Slot** - A utility component that merges its props onto its immediate child
3. **Slottable** - A wrapper for children when components need to render additional content alongside the slotted child

## Key Findings

### Which Components Support Polymorphism

**All Radix Primitive components support polymorphism** through the `asChild` prop. This includes:

- Interactive components: `Dialog.Trigger`, `Dropdown.Trigger`, `Tooltip.Trigger`, `Accordion.Trigger`, etc.
- Container components: `Dialog.Content`, `Popover.Content`, `Select.Content`, etc.
- Utility components: `Portal`, `FocusScope`, `DismissableLayer`, etc.
- Simple components: `Label`, `Separator`, `VisuallyHidden`, etc.

The polymorphism is inherited automatically because all components are built on top of the `Primitive` components (`Primitive.button`, `Primitive.div`, `Primitive.span`, etc.), which have `asChild` support baked in.

### The asChild API Pattern

The `asChild` prop is a boolean that, when set to `true`, tells the component to render its child element instead of its default element while transferring all props and behaviors to that child.

```tsx
// Default behavior - renders a button
<Dialog.Trigger>Open Dialog</Dialog.Trigger>
// Renders: <button>Open Dialog</button>

// With asChild - renders the child element (an anchor)
<Dialog.Trigger asChild>
  <a href="/dialog">Open Dialog</a>
</Dialog.Trigger>
// Renders: <a href="/dialog" aria-haspopup="dialog" aria-expanded="false">Open Dialog</a>
```

### How Primitive Components Work

The `Primitive` object is a collection of forwarded ref components for common HTML elements. Each component conditionally renders either the native element or a `Slot`:

```typescript
// From packages/react/primitive/src/primitive.tsx

const NODES = [
  'a', 'button', 'div', 'form', 'h2', 'h3', 'img', 'input',
  'label', 'li', 'nav', 'ol', 'p', 'select', 'span', 'svg', 'ul',
] as const;

type PrimitivePropsWithRef<E extends React.ElementType> =
  React.ComponentPropsWithRef<E> & {
    asChild?: boolean;
  };

const Primitive = NODES.reduce((primitive, node) => {
  const Slot = createSlot(`Primitive.${node}`);
  const Node = React.forwardRef((props: PrimitivePropsWithRef<typeof node>, forwardedRef: any) => {
    const { asChild, ...primitiveProps } = props;
    const Comp: any = asChild ? Slot : node;
    return <Comp {...primitiveProps} ref={forwardedRef} />;
  });
  Node.displayName = `Primitive.${node}`;
  return { ...primitive, [node]: Node };
}, {} as Primitives);
```

### The Slot Implementation

The `Slot` component is the heart of Radix's polymorphism. It:

1. Takes its props and merges them onto its single child element
2. Composes refs from both the Slot and the child
3. Merges event handlers (child handlers take precedence)
4. Merges styles and classNames
5. Supports React.lazy components via the `use` hook

```typescript
// From packages/react/slot/src/slot.tsx

function createSlotClone(ownerName: string) {
  const SlotClone = React.forwardRef<any, SlotCloneProps>((props, forwardedRef) => {
    let { children, ...slotProps } = props;

    // Handle React.lazy components
    if (isLazyComponent(children) && typeof use === 'function') {
      children = use(children._payload);
    }

    if (React.isValidElement(children)) {
      const childrenRef = getElementRef(children);
      const props = mergeProps(slotProps, children.props as AnyProps);

      // Compose refs from both slot and child
      if (children.type !== React.Fragment) {
        props.ref = forwardedRef ? composeRefs(forwardedRef, childrenRef) : childrenRef;
      }
      return React.cloneElement(children, props);
    }

    return React.Children.count(children) > 1 ? React.Children.only(null) : null;
  });
  return SlotClone;
}
```

### Props Merging Strategy

The `mergeProps` function implements smart merging with specific rules:

```typescript
function mergeProps(slotProps: AnyProps, childProps: AnyProps) {
  const overrideProps = { ...childProps };

  for (const propName in childProps) {
    const slotPropValue = slotProps[propName];
    const childPropValue = childProps[propName];

    const isHandler = /^on[A-Z]/.test(propName);
    if (isHandler) {
      // Compose event handlers - child runs first
      if (slotPropValue && childPropValue) {
        overrideProps[propName] = (...args: unknown[]) => {
          const result = childPropValue(...args);
          slotPropValue(...args);
          return result;
        };
      } else if (slotPropValue) {
        overrideProps[propName] = slotPropValue;
      }
    }
    else if (propName === 'style') {
      // Merge styles - child styles override slot styles
      overrideProps[propName] = { ...slotPropValue, ...childPropValue };
    }
    else if (propName === 'className') {
      // Concatenate classNames
      overrideProps[propName] = [slotPropValue, childPropValue].filter(Boolean).join(' ');
    }
  }

  return { ...slotProps, ...overrideProps };
}
```

Key merging behaviors:
- **Event handlers (`on*`)**: Both handlers are called, with the child's handler executing first
- **`style`**: Objects are merged, with child styles taking precedence
- **`className`**: Strings are concatenated with a space
- **Other props**: Child props override slot props

### The Slottable Pattern for Complex Components

When a component needs to render additional content alongside the slotted child (like icons in a button), the `Slottable` component marks where the children should be placed:

```tsx
// Example from test file showing the pattern
const Button = React.forwardRef<
  React.ComponentRef<'button'>,
  React.ComponentProps<'button'> & {
    asChild?: boolean;
    iconLeft?: React.ReactNode;
    iconRight?: React.ReactNode;
  }
>(({ children, asChild = false, iconLeft, iconRight, ...props }, forwardedRef) => {
  const Comp = asChild ? Slot : 'button';
  return (
    <Comp {...props} ref={forwardedRef}>
      {iconLeft}
      <Slottable>{children}</Slottable>
      {iconRight}
    </Comp>
  );
});

// Usage without asChild - renders button with icons
<Button iconLeft={<Icon />} iconRight={<Arrow />}>
  Click me
</Button>
// Renders: <button><Icon />Click me<Arrow /></button>

// Usage with asChild - renders anchor with icons
<Button iconLeft={<Icon />} iconRight={<Arrow />} asChild>
  <a href="/page">Click me</a>
</Button>
// Renders: <a href="/page"><Icon />Click me<Arrow /></a>
```

### Ref Composition

Radix provides utilities for composing multiple refs together, essential for the slot pattern:

```typescript
// From packages/react/compose-refs/src/compose-refs.tsx

function composeRefs<T>(...refs: PossibleRef<T>[]): React.RefCallback<T> {
  return (node) => {
    let hasCleanup = false;
    const cleanups = refs.map((ref) => {
      const cleanup = setRef(ref, node);
      if (!hasCleanup && typeof cleanup == 'function') {
        hasCleanup = true;
      }
      return cleanup;
    });

    // Support React 19 ref cleanup functions
    if (hasCleanup) {
      return () => {
        for (let i = 0; i < cleanups.length; i++) {
          const cleanup = cleanups[i];
          if (typeof cleanup == 'function') {
            cleanup();
          } else {
            setRef(refs[i], null);
          }
        }
      };
    }
  };
}

// Hook version for use in components
function useComposedRefs<T>(...refs: PossibleRef<T>[]): React.RefCallback<T> {
  return React.useCallback(composeRefs(...refs), refs);
}
```

## Technical Implementation Details

### React Version Compatibility

The implementation handles differences between React 18 and React 19:

```typescript
// Handle ref access differences between React versions
function getElementRef(element: React.ReactElement) {
  // React <=18 in DEV
  let getter = Object.getOwnPropertyDescriptor(element.props, 'ref')?.get;
  let mayWarn = getter && 'isReactWarning' in getter && getter.isReactWarning;
  if (mayWarn) {
    return (element as any).ref;
  }

  // React 19 in DEV
  getter = Object.getOwnPropertyDescriptor(element, 'ref')?.get;
  mayWarn = getter && 'isReactWarning' in getter && getter.isReactWarning;
  if (mayWarn) {
    return (element.props as { ref?: React.Ref<unknown> }).ref;
  }

  // Not DEV
  return (element.props as { ref?: React.Ref<unknown> }).ref || (element as any).ref;
}
```

### Lazy Component Support

Slot supports React.lazy components using the React 19 `use` hook:

```typescript
const use: typeof React.use | undefined = (React as any)[' use '.trim().toString()];

const Slot = React.forwardRef<HTMLElement, SlotProps>((props, forwardedRef) => {
  let { children, ...slotProps } = props;

  // Unwrap lazy components
  if (isLazyComponent(children) && typeof use === 'function') {
    children = use(children._payload);
  }
  // ... rest of implementation
});
```

### Real-World Component Usage

Here is how Dialog uses the pattern internally:

```typescript
// From packages/react/dialog/src/dialog.tsx

const DialogTrigger = React.forwardRef<DialogTriggerElement, DialogTriggerProps>(
  (props, forwardedRef) => {
    const { __scopeDialog, ...triggerProps } = props;
    const context = useDialogContext(TRIGGER_NAME, __scopeDialog);
    const composedTriggerRef = useComposedRefs(forwardedRef, context.triggerRef);

    return (
      <Primitive.button
        type="button"
        aria-haspopup="dialog"
        aria-expanded={context.open}
        aria-controls={context.contentId}
        data-state={getState(context.open)}
        {...triggerProps}
        ref={composedTriggerRef}
        onClick={composeEventHandlers(props.onClick, context.onOpenToggle)}
      />
    );
  },
);
```

Users can then customize the trigger element:

```tsx
// Use as a button (default)
<Dialog.Trigger>Open</Dialog.Trigger>

// Use as a link
<Dialog.Trigger asChild>
  <a href="#">Open</a>
</Dialog.Trigger>

// Use as a custom component
<Dialog.Trigger asChild>
  <MyCustomButton variant="primary">Open</MyCustomButton>
</Dialog.Trigger>
```

## Code Examples

### Basic asChild Usage

```tsx
import * as Dialog from '@radix-ui/react-dialog';

// Render trigger as an anchor
function LinkTrigger() {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <a href="/modal" onClick={(e) => e.preventDefault()}>
          Open Modal
        </a>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay />
        <Dialog.Content>
          <Dialog.Title>Modal Title</Dialog.Title>
          <Dialog.Close asChild>
            <button>Close</button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
```

### Building a Polymorphic Component

```tsx
import { Slot, Slottable } from '@radix-ui/react-slot';

interface ButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  asChild?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ asChild, leftIcon, rightIcon, children, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';

    return (
      <Comp ref={ref} {...props}>
        {leftIcon}
        <Slottable>{children}</Slottable>
        {rightIcon}
      </Comp>
    );
  }
);

// Usage
<Button leftIcon={<Icon />} asChild>
  <a href="/page">Link Button</a>
</Button>
```

### Nested Polymorphism

```tsx
import * as Tooltip from '@radix-ui/react-tooltip';
import * as Dialog from '@radix-ui/react-dialog';

// Compose multiple primitives
function TooltippedDialogTrigger() {
  return (
    <Dialog.Root>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <Dialog.Trigger asChild>
            <button>Open Dialog (hover for tooltip)</button>
          </Dialog.Trigger>
        </Tooltip.Trigger>
        <Tooltip.Content>Click to open dialog</Tooltip.Content>
      </Tooltip.Root>
      <Dialog.Content>...</Dialog.Content>
    </Dialog.Root>
  );
}
```

## TypeScript Typing Strategy

### Primitive Type Definitions

```typescript
type Primitives = {
  [E in (typeof NODES)[number]]: PrimitiveForwardRefComponent<E>
};

type PrimitivePropsWithRef<E extends React.ElementType> =
  React.ComponentPropsWithRef<E> & {
    asChild?: boolean;
  };

interface PrimitiveForwardRefComponent<E extends React.ElementType>
  extends React.ForwardRefExoticComponent<PrimitivePropsWithRef<E>> {}
```

### Component Props Pattern

Radix components define their element types and props interfaces consistently:

```typescript
// Element type references the underlying Primitive
type DialogTriggerElement = React.ComponentRef<typeof Primitive.button>;

// Props extend the Primitive's props
type PrimitiveButtonProps = React.ComponentPropsWithoutRef<typeof Primitive.button>;
interface DialogTriggerProps extends PrimitiveButtonProps {}
```

This pattern means:
- Components automatically inherit `asChild` from `Primitive`
- All valid HTML attributes are accepted
- Ref types are correctly inferred

### Slot Type Definitions

```typescript
interface SlotProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
}

interface SlotCloneProps {
  children: React.ReactNode;
}

interface SlottableProps {
  children: React.ReactNode;
}
```

## Strengths

- **Clean API**: The `asChild` prop is intuitive and self-documenting. Developers immediately understand they are replacing the child element.

- **Full Behavior Preservation**: All event handlers, ARIA attributes, data attributes, and refs are properly transferred to the custom element.

- **Composable**: Multiple Radix components can be nested with `asChild` to create complex compositions while maintaining all behaviors.

- **Type Safety**: TypeScript support is excellent. Components inherit proper typing from their underlying Primitive elements.

- **No Re-render Overhead**: Unlike the `as` prop pattern which creates new component types, `asChild` simply clones the existing child.

- **Semantic HTML**: Developers can use the correct semantic elements (`<a>` for links, `<button>` for actions) while getting all Radix functionality.

- **React 19 Ready**: The implementation already supports React 19 features like ref cleanup functions and handles version differences gracefully.

## Considerations & Trade-offs

- **Single Child Requirement**: `Slot` requires exactly one child element. Multiple children or non-element children will throw an error.

- **Child Must Accept Props**: The child element must be able to receive the merged props. Primitive HTML elements and properly forwarded components work; components that do not spread props will break.

- **Event Handler Order**: Child event handlers run first. While this enables `event.preventDefault()` checks, it requires understanding the execution order.

- **No Element Type Inference**: Unlike the `as` prop pattern, TypeScript cannot infer the final element type when using `asChild`. The types remain based on the default element.

- **Bundle Size**: The `@radix-ui/react-slot` package adds approximately 1.4kB to the bundle, though this is shared across all Radix components.

- **Slottable Complexity**: For components with additional content (icons, badges), the `Slottable` pattern adds complexity that developers must understand.

## Relevance to the Coinbase Design System

The Radix `asChild` pattern offers several benefits that could enhance the Coinbase Design System:

1. **Accessibility Preservation**: Components like buttons and links would automatically maintain their accessibility attributes when rendered as different elements.

2. **Semantic Flexibility**: Developers could use CDS components with correct semantic elements (e.g., render a Button component as an `<a>` tag for navigation).

3. **Composability**: CDS components could be composed together more easily, enabling patterns like tooltipped buttons or dialog triggers without wrapper elements.

4. **Reduced API Surface**: Instead of supporting both `as` and `component` props with complex type gymnastics, a single `asChild` prop provides clear semantics.

5. **Third-Party Integration**: Components could seamlessly integrate with routing libraries (e.g., Next.js Link, React Router Link) without special handling.

**Implementation Considerations**:
- Would require adopting or implementing the Slot component pattern
- Existing components using `as` prop would need migration path
- Documentation would need to clearly explain the pattern
- Testing would need to verify prop merging behavior

## References

- Source Code: `/Users/erichkuerschner/workspace/cds-public/temp/repo-cache/primitives/packages/react/slot/src/slot.tsx`
- Primitive Implementation: `/Users/erichkuerschner/workspace/cds-public/temp/repo-cache/primitives/packages/react/primitive/src/primitive.tsx`
- Compose Refs Utility: `/Users/erichkuerschner/workspace/cds-public/temp/repo-cache/primitives/packages/react/compose-refs/src/compose-refs.tsx`
- Radix Slot Documentation: https://www.radix-ui.com/primitives/docs/utilities/slot
- Repository: https://github.com/radix-ui/primitives (branch: main)
