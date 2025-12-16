# Base UI: Popover and Floating Menu Component Implementation

## Executive Summary

Base UI implements floating components (Popover, Menu, Tooltip, Select, etc.) using a forked and heavily customized version of Floating UI's interaction hooks combined with `@floating-ui/react-dom` for positioning. The architecture is built around compound components, a custom store pattern for state management, and a comprehensive set of interaction hooks that handle accessibility, keyboard navigation, and edge cases.

## Overview

Base UI (formerly part of MUI) is a headless component library that provides unstyled, accessible React components. For floating elements, Base UI takes a unique approach: rather than using `@floating-ui/react` as a dependency, they have internalized and extensively modified the interaction layer while still relying on `@floating-ui/react-dom` for the core positioning calculations.

### Third-Party Dependencies

From `package.json`:
```json
{
  "@floating-ui/react-dom": "^2.1.6",
  "@floating-ui/utils": "^0.2.10",
  "tabbable": "^6.3.0"
}
```

Key observations:
- Uses `@floating-ui/react-dom` for positioning calculations only
- Does NOT use `@floating-ui/react` (the full React package with interactions)
- Uses `tabbable` for focus management
- All interaction hooks are custom implementations in `floating-ui-react/` directory

## Key Findings

### 1. Internal Floating UI Fork

Base UI maintains its own implementation of Floating UI's interaction layer in `packages/react/src/floating-ui-react/`. This includes:

**Hooks:**
- `useFloating` - Wraps `@floating-ui/react-dom`'s positioning with extended context
- `useFloatingRootContext` - Creates the root context/store for floating state
- `useSyncedFloatingRootContext` - Syncs popup store with floating context
- `useDismiss` - Handles outside press, escape key, scroll dismissal
- `useHover` - Mouse enter/leave with delay and safe polygon support
- `useClick` - Click-to-toggle behavior
- `useFocus` - Focus-based opening/closing
- `useInteractions` - Merges multiple interaction hooks' props
- `useListNavigation` - Arrow key navigation through items
- `useTypeahead` - Type-to-search functionality
- `useRole` - ARIA role management
- `useClientPoint` - Cursor tracking for tooltips

**Components:**
- `FloatingTree` - Context for nested floating elements
- `FloatingNode` - Registers nodes in the tree
- `FloatingFocusManager` - Comprehensive focus management
- `FloatingPortal` - Portal rendering with focus guards
- `FloatingDelayGroup` - Shared delay for tooltip groups

### 2. Compound Component Architecture

Each floating component follows a strict compound pattern:

```tsx
// Popover exports
<Popover.Root>         // State management, interactions setup
  <Popover.Trigger>    // Button that opens the popover
  <Popover.Portal>     // Renders children in a portal
    <Popover.Positioner>  // Positioning wrapper
      <Popover.Popup>     // The actual popup content container
        <Popover.Arrow>   // Optional arrow element
        <Popover.Title>   // Accessible title
        <Popover.Description> // Accessible description
        <Popover.Close>   // Close button
      </Popover.Popup>
    </Popover.Positioner>
  </Popover.Portal>
</Popover.Root>
```

### 3. Custom Store Pattern

Base UI uses a custom `ReactStore` class for state management:

```typescript
export class PopoverStore<Payload> extends ReactStore<
  Readonly<State<Payload>>,
  Context,
  Selectors
> {
  constructor(initialState?: Partial<State<Payload>>) {
    // Initialize state and context
  }

  setOpen = (
    nextOpen: boolean,
    eventDetails: Omit<PopoverRoot.ChangeEventDetails, 'preventUnmountOnClose'>,
  ) => {
    // Handle open/close with event details
  };

  public static useStore<Payload>(
    externalStore: PopoverStore<Payload> | undefined,
    initialState: Partial<State<Payload>>,
  ) {
    // Hook for consuming the store
  }
}
```

Key features:
- Uses `reselect` for memoized selectors
- `useState` method for subscribing to specific state slices
- `useSyncedValues` for updating multiple values at once
- `useControlledProp` for controlled/uncontrolled prop handling
- `useContextCallback` for callback registration

### 4. Positioning System

The core positioning is handled by `useAnchorPositioning`:

```typescript
export function useAnchorPositioning(
  params: useAnchorPositioning.Parameters,
): useAnchorPositioning.ReturnValue {
  // Uses @floating-ui/react-dom middleware:
  const middleware: UseFloatingOptions['middleware'] = [
    offset(/* ... */),
    flip({/* ... */}),      // Collision avoidance
    shift({/* ... */}),     // Keep in viewport
    size({/* ... */}),      // Set CSS custom properties
    arrow(/* ... */),       // Arrow positioning
    hide,                   // Hide when anchor is hidden
    adaptiveOrigin,         // Transform origin calculation
  ];

  const {
    refs, x, y, placement, middlewareData, update, context, isPositioned
  } = useFloating({
    rootContext: floatingRootContext,
    placement,
    middleware,
    strategy: positionMethod, // 'absolute' | 'fixed'
    whileElementsMounted: keepMounted ? undefined : autoUpdate,
  });
}
```

CSS Custom Properties exposed:
```css
--available-width: /* max width before collision */
--available-height: /* max height before collision */
--anchor-width: /* reference element width */
--anchor-height: /* reference element height */
--transform-origin: /* for animations */
```

### 5. Safe Polygon Algorithm

For hover-based menus, Base UI implements `safePolygon`:

```typescript
export function safePolygon(options: SafePolygonOptions = {}) {
  const { buffer = 0.5, blockPointerEvents = false, requireIntent = true } = options;

  return function handler(context) {
    return function onMouseMove(event: MouseEvent) {
      // Creates a polygon from cursor to floating element
      // Allows user to traverse to submenu without closing
      // Uses point-in-polygon algorithm for collision detection
      // Considers cursor speed for intent detection
    };
  };
}
```

### 6. Focus Management

`FloatingFocusManager` handles complex focus scenarios:

```typescript
<FloatingFocusManager
  context={floatingContext}
  openInteractionType={openMethod}  // 'mouse' | 'touch' | 'keyboard'
  modal={modal === 'trap-focus'}
  disabled={!mounted || openReason === REASONS.triggerHover}
  initialFocus={resolvedInitialFocus}
  returnFocus={finalFocus}
  restoreFocus="popup"
  closeOnFocusOut={closeOnFocusOut}
>
  {children}
</FloatingFocusManager>
```

Features:
- Modal and non-modal focus trapping
- Configurable initial focus target
- Return focus on close
- Focus restoration on element removal
- Focus guards for portal boundaries
- Uses `tabbable` library for tabbable element detection

### 7. Dismissal Handling

The `useDismiss` hook handles multiple dismissal scenarios:

```typescript
export function useDismiss(
  context: FloatingRootContext | FloatingContext,
  props: UseDismissProps = {},
): ElementProps {
  const {
    escapeKey = true,            // Close on Escape
    outsidePress = true,         // Close on click outside
    outsidePressEvent = 'sloppy', // 'intentional' | 'sloppy'
    referencePress = false,       // Close when reference pressed
    ancestorScroll = false,       // Close on scroll
    bubbles,                      // Control event bubbling in nested floats
  } = props;
}
```

Touch handling is particularly sophisticated:
- Distinguishes between "sloppy" (quick tap) and "intentional" (deliberate) presses
- Handles touchmove for scroll detection
- Prevents accidental dismissal on mobile

## Technical Implementation Details

### Component Communication

Components communicate through:
1. **Context** - `PopoverRootContext`, `PopoverPositionerContext`
2. **Store** - Centralized `PopoverStore` with selectors
3. **Events** - Internal event emitter for floating tree communication

### RTL Support

Built-in RTL support with logical sides:

```typescript
type Side = 'top' | 'bottom' | 'left' | 'right' | 'inline-end' | 'inline-start';
```

Logical sides (`inline-start`, `inline-end`) are converted based on direction context.

### Animation Support

State-based animation through:
- `transitionStatus`: `'starting'` | `'open'` | `'ending'` | `'closed'`
- `instantType`: Controls when animations should be skipped
- CSS data attributes: `data-open`, `data-closed`, `data-starting`, `data-ending`

### Multiple Triggers

Popover supports multiple triggers via handles:

```tsx
const handle = Popover.createHandle();

<Popover.Root handle={handle}>
  <Popover.Trigger handle={handle} id="trigger-1" payload={{ item: 1 }}>
    Trigger 1
  </Popover.Trigger>
  <Popover.Trigger handle={handle} id="trigger-2" payload={{ item: 2 }}>
    Trigger 2
  </Popover.Trigger>
  <Popover.Popup>
    {({ payload }) => <div>{payload.item}</div>}
  </Popover.Popup>
</Popover.Root>
```

### Nested Floating Elements

`FloatingTree` enables nested menus and popovers:

```typescript
export function FloatingTree(props: FloatingTreeProps): React.JSX.Element {
  const { children, externalTree } = props;
  const tree = useRefWithInit(() => externalTree ?? new FloatingTreeStore()).current;
  return <FloatingTreeContext.Provider value={tree}>{children}</FloatingTreeContext.Provider>;
}

export function useFloatingParentNodeId(): string | null {
  return React.useContext(FloatingNodeContext)?.id || null;
}
```

## Code Examples

### Basic Popover Usage

```tsx
import { Popover } from '@base-ui/react/popover';

function MyPopover() {
  return (
    <Popover.Root>
      <Popover.Trigger>Open Popover</Popover.Trigger>
      <Popover.Portal>
        <Popover.Positioner side="bottom" align="start" sideOffset={8}>
          <Popover.Popup>
            <Popover.Arrow />
            <Popover.Title>Popover Title</Popover.Title>
            <Popover.Description>
              This is the popover content.
            </Popover.Description>
            <Popover.Close>Close</Popover.Close>
          </Popover.Popup>
        </Popover.Positioner>
      </Popover.Portal>
    </Popover.Root>
  );
}
```

### Menu with Submenus

```tsx
import { Menu } from '@base-ui/react/menu';

function MyMenu() {
  return (
    <Menu.Root>
      <Menu.Trigger>Open Menu</Menu.Trigger>
      <Menu.Portal>
        <Menu.Positioner>
          <Menu.Popup>
            <Menu.Item>Item 1</Menu.Item>
            <Menu.Item>Item 2</Menu.Item>
            <Menu.SubmenuRoot>
              <Menu.SubmenuTrigger>Submenu</Menu.SubmenuTrigger>
              <Menu.Portal>
                <Menu.Positioner>
                  <Menu.Popup>
                    <Menu.Item>Sub Item 1</Menu.Item>
                    <Menu.Item>Sub Item 2</Menu.Item>
                  </Menu.Popup>
                </Menu.Positioner>
              </Menu.Portal>
            </Menu.SubmenuRoot>
          </Menu.Popup>
        </Menu.Positioner>
      </Menu.Portal>
    </Menu.Root>
  );
}
```

### Tooltip with Delay Group

```tsx
import { Tooltip, TooltipProvider } from '@base-ui/react/tooltip';

function MyTooltips() {
  return (
    <TooltipProvider delay={300} closeDelay={0} timeout={400}>
      <Tooltip.Root>
        <Tooltip.Trigger>Hover me</Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Positioner>
            <Tooltip.Popup>
              <Tooltip.Arrow />
              Tooltip content
            </Tooltip.Popup>
          </Tooltip.Positioner>
        </Tooltip.Portal>
      </Tooltip.Root>
      {/* More tooltips share the delay */}
    </TooltipProvider>
  );
}
```

## Strengths

1. **Complete Accessibility** - Full ARIA support, keyboard navigation, focus management, screen reader compatibility

2. **Headless/Unstyled** - No styling opinions; maximum flexibility for consumers

3. **Sophisticated Interaction Handling** - Touch, mouse, keyboard all handled with edge cases considered

4. **Nested Element Support** - FloatingTree architecture enables arbitrarily nested floating elements

5. **Animation Integration** - State-based transition status enables CSS or JS animations

6. **RTL Support** - Built-in logical side handling

7. **Multiple Trigger Support** - Unique handle system allows multiple triggers per floating element

8. **Fine-Grained Control** - Granular props for every behavior (modal modes, dismissal behavior, focus handling)

9. **Performance Optimized** - Selector-based store prevents unnecessary re-renders

10. **Type Safety** - Comprehensive TypeScript types and namespaced exports

## Considerations & Trade-offs

1. **Internal Fork Maintenance** - Maintaining a fork of Floating UI interactions requires ongoing synchronization effort

2. **Complexity** - The compound component pattern with many subcomponents increases API surface area

3. **Bundle Size** - Full fork of interaction logic adds to bundle size vs. using official package

4. **Learning Curve** - Many interconnected concepts (stores, contexts, hooks) to understand

5. **Portal Requirement** - Most use cases require portal rendering which adds DOM complexity

6. **No Built-in Animations** - Must implement animations yourself (flexibility but more work)

7. **CSS Custom Properties** - Relies on CSS variable support for size constraints

## Relevance to CDS

### Applicable Patterns

1. **Compound Component Architecture** - CDS could adopt similar patterns for complex components, separating concerns into discrete subcomponents

2. **Store Pattern** - The ReactStore approach with selectors could help manage complex component state without prop drilling

3. **Interaction Hook Composition** - `useInteractions` pattern for merging event handlers from multiple sources

4. **Event Detail System** - Rich event details with `reason` and `trigger` information enables better debugging and control

5. **Modal Modes** - The `modal: boolean | 'trap-focus'` pattern provides flexible modal behavior options

6. **Multiple Trigger Support** - Handle system could enable advanced use cases like context menus or shared popover content

### Key Takeaways for CDS Implementation

1. **Use `@floating-ui/react-dom` for positioning** - This is the stable, well-maintained positioning layer

2. **Build custom interaction layer** - This allows full control over touch handling, accessibility, and integration with existing patterns

3. **Consider FloatingTree pattern** - Essential for nested dropdown menus and context menus

4. **Implement safe polygon** - Required for hover-based menu navigation

5. **Use CSS custom properties** - `--available-height`, `--anchor-width` etc. enable flexible sizing

6. **Handle touch separately** - Mobile requires different timing, dismissal, and focus behavior

## References

- **Source Code**: `/Users/erichkuerschner/workspace/cds-public/.claude/research/cache/base-ui/packages/react/src/`
- **Documentation**: https://base-ui.com/react/components/popover
- **LLMs.txt**: https://base-ui.com/llms.txt
- **Repository**: https://github.com/mui/base-ui
- **Floating UI**: https://floating-ui.com/
