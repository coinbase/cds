# Radix Primitives: Popover and Floating Component Implementation

## Executive Summary

Radix Primitives implements floating elements through a layered architecture that separates positioning (via Floating UI), interaction behaviors (via DismissableLayer, FocusScope), and visibility management (via Presence, Portal). This approach enables exceptional accessibility, composability, and animation support while maintaining a clean separation of concerns.

## Overview

Radix Primitives is a low-level, unstyled component library focused on accessibility and developer experience. Their floating components (Popover, DropdownMenu, Tooltip, HoverCard, Select, etc.) share a common foundation built on the `@radix-ui/react-popper` package, which wraps Floating UI with React-specific abstractions.

## Key Findings

### 1. Core Positioning Architecture

Radix uses **Floating UI** (`@floating-ui/react-dom`) as the sole third-party positioning library. The `@radix-ui/react-popper` package wraps Floating UI and provides a consistent API for all floating components.

**Popper Component Structure:**

```tsx
// packages/react/popper/src/popper.tsx
import {
  useFloating,
  autoUpdate,
  offset,
  shift,
  limitShift,
  hide,
  arrow as floatingUIarrow,
  flip,
  size,
} from '@floating-ui/react-dom';
```

The Popper primitive exposes four key sub-components:
- `Popper` (Root) - Context provider holding anchor reference
- `PopperAnchor` - Element the content positions relative to
- `PopperContent` - The floating element itself
- `PopperArrow` - Optional arrow pointing to anchor

**Positioning Configuration:**

```tsx
const { refs, floatingStyles, placement, isPositioned, middlewareData } = useFloating({
  strategy: 'fixed', // Default for avoiding focus scroll issues
  placement: desiredPlacement,
  whileElementsMounted: (...args) => {
    const cleanup = autoUpdate(...args, {
      animationFrame: updatePositionStrategy === 'always',
    });
    return cleanup;
  },
  elements: {
    reference: context.anchor,
  },
  middleware: [
    offset({ mainAxis: sideOffset + arrowHeight, alignmentAxis: alignOffset }),
    avoidCollisions && shift({
      mainAxis: true,
      crossAxis: false,
      limiter: sticky === 'partial' ? limitShift() : undefined,
      ...detectOverflowOptions,
    }),
    avoidCollisions && flip({ ...detectOverflowOptions }),
    size({
      ...detectOverflowOptions,
      apply: ({ elements, rects, availableWidth, availableHeight }) => {
        const { width: anchorWidth, height: anchorHeight } = rects.reference;
        const contentStyle = elements.floating.style;
        contentStyle.setProperty('--radix-popper-available-width', `${availableWidth}px`);
        contentStyle.setProperty('--radix-popper-available-height', `${availableHeight}px`);
        contentStyle.setProperty('--radix-popper-anchor-width', `${anchorWidth}px`);
        contentStyle.setProperty('--radix-popper-anchor-height', `${anchorHeight}px`);
      },
    }),
    arrow && floatingUIarrow({ element: arrow, padding: arrowPadding }),
    transformOrigin({ arrowWidth, arrowHeight }),
    hideWhenDetached && hide({ strategy: 'referenceHidden', ...detectOverflowOptions }),
  ],
});
```

### 2. Third-Party Dependencies

The floating component ecosystem uses minimal external dependencies:

| Package | Purpose | Version |
|---------|---------|---------|
| `@floating-ui/react-dom` | Positioning calculations | ^2.0.0 |
| `aria-hidden` | Hide non-modal content from ARIA | ^1.2.4 |
| `react-remove-scroll` | Prevent background scroll | ^2.6.3 |

**No dependencies on:**
- Popper.js (uses Floating UI, its successor)
- Framer Motion or any animation library
- CSS-in-JS libraries

### 3. Composable Primitive Architecture

Each floating component follows a consistent pattern of composing lower-level primitives:

```
DropdownMenu
    ├── Menu (shared menu logic)
    │   ├── Popper (positioning)
    │   │   └── Floating UI
    │   ├── DismissableLayer (click/focus outside handling)
    │   ├── FocusScope (focus trapping)
    │   ├── RovingFocusGroup (keyboard navigation)
    │   └── Portal (DOM placement)
    └── Collection (item management)

Popover
    ├── Popper (positioning)
    ├── DismissableLayer
    ├── FocusScope
    ├── Portal
    └── Presence (animation support)

Tooltip
    ├── Popper (positioning)
    ├── DismissableLayer
    └── TooltipProvider (delay/skip management)
```

### 4. Context Scope System

Radix implements a sophisticated context scoping system that enables component composition without context conflicts:

```tsx
const [createPopoverContext, createPopoverScope] = createContextScope(POPOVER_NAME, [
  createPopperScope,
]);
const usePopperScope = createPopperScope();
```

This allows multiple instances of the same component type to be nested without interference and enables components to properly inherit parent scopes.

### 5. Interaction Handling

#### DismissableLayer

Manages outside interactions with support for stacked layers:

```tsx
// Key features:
// - Tracks multiple layers in a Set
// - Only highest layer handles escape key
// - Supports disabling pointer events outside
// - Touch device handling with click delay
// - Branch support for nested non-dismissing content

const DismissableLayerContext = React.createContext({
  layers: new Set<DismissableLayerElement>(),
  layersWithOutsidePointerEventsDisabled: new Set<DismissableLayerElement>(),
  branches: new Set<DismissableLayerBranchElement>(),
});
```

#### Focus Management

```tsx
// FocusScope provides:
// - Focus trapping with loop option
// - Auto-focus on mount/unmount
// - Focus guards to prevent tabbing out of portalled content

<FocusScope
  asChild
  loop
  trapped={trapFocus}
  onMountAutoFocus={onOpenAutoFocus}
  onUnmountAutoFocus={onCloseAutoFocus}
>
```

### 6. Animation Support via Presence

The `Presence` component enables CSS animations for enter/exit:

```tsx
function usePresence(present: boolean) {
  const [state, send] = useStateMachine(initialState, {
    mounted: {
      UNMOUNT: 'unmounted',
      ANIMATION_OUT: 'unmountSuspended',
    },
    unmountSuspended: {
      MOUNT: 'mounted',
      ANIMATION_END: 'unmounted',
    },
    unmounted: {
      MOUNT: 'mounted',
    },
  });
  // Listens for animationend to delay unmount
}
```

This allows content to animate out before being removed from the DOM.

### 7. Modal vs Non-Modal Behavior

Components like Popover and Menu support both modal and non-modal modes:

**Modal Mode:**
- Traps focus within content
- Disables pointer events outside
- Uses `aria-hidden` on other content
- Prevents background scroll

**Non-Modal Mode:**
- No focus trapping
- Pointer events work normally outside
- Clicking outside closes but allows interaction

```tsx
const PopoverContent = React.forwardRef<PopoverContentTypeElement, PopoverContentProps>(
  (props, forwardedRef) => {
    // ...
    return (
      <Presence present={forceMount || context.open}>
        {context.modal ? (
          <PopoverContentModal {...contentProps} ref={forwardedRef} />
        ) : (
          <PopoverContentNonModal {...contentProps} ref={forwardedRef} />
        )}
      </Presence>
    );
  },
);
```

### 8. Tooltip-Specific Patterns

#### Provider-Level Coordination

Tooltips use a provider to coordinate multiple tooltip instances:

```tsx
interface TooltipProviderProps {
  delayDuration?: number;      // Default: 700ms
  skipDelayDuration?: number;  // Default: 300ms - time to skip delay between tooltips
  disableHoverableContent?: boolean;
}
```

#### Grace Area for Hoverable Content

Tooltips implement a convex hull algorithm to create "grace areas" allowing users to move their cursor from trigger to content:

```tsx
// Creates a polygon from exit point to target content
const graceArea = getHull([...paddedExitPoints, ...hoverTargetPoints]);

// Check if pointer is within grace area
function isPointInPolygon(point: Point, polygon: Polygon) {
  // Ray casting algorithm
}
```

### 9. Menu Submenu Handling

Submenus implement sophisticated pointer tracking to prevent accidental closure:

```tsx
const isPointerMovingToSubmenu = React.useCallback((event: React.PointerEvent) => {
  const isMovingTowards = pointerDirRef.current === pointerGraceIntentRef.current?.side;
  return isMovingTowards && isPointerInGraceArea(event, pointerGraceIntentRef.current?.area);
}, []);
```

Key features:
- 100ms delay before opening submenus on hover
- Grace polygon from trigger to content
- Direction-aware keyboard navigation (RTL support)
- Typeahead search across menu items

### 10. CSS Custom Properties API

All floating components expose CSS custom properties for styling:

```tsx
style={{
  '--radix-popover-content-transform-origin': 'var(--radix-popper-transform-origin)',
  '--radix-popover-content-available-width': 'var(--radix-popper-available-width)',
  '--radix-popover-content-available-height': 'var(--radix-popper-available-height)',
  '--radix-popover-trigger-width': 'var(--radix-popper-anchor-width)',
  '--radix-popover-trigger-height': 'var(--radix-popper-anchor-height)',
}}
```

This enables:
- Matching content width to trigger width
- Constraining content to available viewport space
- Setting transform origin for animations

## Technical Implementation Details

### Virtual Anchor Support

Popper supports virtual references for positioning relative to arbitrary points (e.g., cursor position):

```tsx
interface PopperAnchorProps extends PrimitiveDivProps {
  virtualRef?: React.RefObject<Measurable>;
}

// If virtualRef is provided, don't render a DOM element
return virtualRef ? null : <Primitive.div {...anchorProps} ref={composedRefs} />;
```

### Portal Implementation

Simple React portal wrapper with SSR safety:

```tsx
const Portal = React.forwardRef<PortalElement, PortalProps>((props, forwardedRef) => {
  const { container: containerProp, ...portalProps } = props;
  const [mounted, setMounted] = React.useState(false);
  useLayoutEffect(() => setMounted(true), []);
  const container = containerProp || (mounted && globalThis?.document?.body);
  return container
    ? ReactDOM.createPortal(<Primitive.div {...portalProps} ref={forwardedRef} />, container)
    : null;
});
```

### Controllable State Pattern

All components use a consistent controllable state hook:

```tsx
const [open, setOpen] = useControllableState({
  prop: openProp,
  defaultProp: defaultOpen ?? false,
  onChange: onOpenChange,
  caller: POPOVER_NAME,
});
```

## Code Examples

### Basic Popover Usage

```tsx
import * as Popover from '@radix-ui/react-popover';

function Example() {
  return (
    <Popover.Root>
      <Popover.Trigger>Open</Popover.Trigger>
      <Popover.Portal>
        <Popover.Content sideOffset={5}>
          <p>Content</p>
          <Popover.Arrow />
          <Popover.Close>Close</Popover.Close>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
```

### Dropdown Menu with Submenus

```tsx
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

function Example() {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>Options</DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content>
          <DropdownMenu.Item>Action 1</DropdownMenu.Item>
          <DropdownMenu.Sub>
            <DropdownMenu.SubTrigger>More</DropdownMenu.SubTrigger>
            <DropdownMenu.Portal>
              <DropdownMenu.SubContent>
                <DropdownMenu.Item>Sub Action</DropdownMenu.Item>
              </DropdownMenu.SubContent>
            </DropdownMenu.Portal>
          </DropdownMenu.Sub>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
```

### Custom Positioned Content

```tsx
<Popover.Content
  side="top"
  sideOffset={10}
  align="start"
  alignOffset={-5}
  avoidCollisions={true}
  collisionBoundary={containerRef.current}
  collisionPadding={16}
  sticky="partial"
  hideWhenDetached={true}
>
```

## Strengths

- **Composability**: Each primitive serves a single purpose and composes cleanly with others
- **Accessibility First**: ARIA attributes, focus management, and keyboard navigation are built-in
- **Animation Support**: Presence component enables CSS-based enter/exit animations without runtime overhead
- **Zero Styling**: No CSS shipped, complete styling freedom
- **TypeScript**: Comprehensive type definitions with strict typing
- **SSR Safe**: Proper handling of server-side rendering edge cases
- **Minimal Dependencies**: Only Floating UI plus two small accessibility utilities
- **RTL Support**: Full right-to-left text direction support
- **Touch Device Handling**: Proper delays and cancellation for touch interactions

## Considerations & Trade-offs

- **Bundle Size**: Each component requires multiple primitive packages (DismissableLayer, FocusScope, Presence, etc.)
- **Learning Curve**: The composable architecture requires understanding multiple primitives
- **No Built-in Transitions**: Animation requires user-provided CSS or integration with animation libraries
- **Context Scope Complexity**: The scoping system, while powerful, adds abstraction overhead
- **Verbose JSX**: Full control means more boilerplate compared to higher-level libraries
- **Limited Positioning Options**: Delegates entirely to Floating UI; no custom positioning algorithms

## Relevance to CDS

### Applicable Patterns

1. **Layered Architecture**: The separation of positioning, interaction, focus, and visibility concerns could inform CDS's floating component design

2. **CSS Custom Properties**: Exposing sizing/positioning data via CSS variables enables flexible styling without JavaScript

3. **Grace Area Algorithm**: The convex hull approach for hover transitions provides excellent UX for menu/tooltip interactions

4. **Presence Pattern**: Animation-aware mounting/unmounting could improve CDS component animations

5. **Modal/Non-Modal Split**: Clear separation enables different behaviors without complex prop combinations

### Potential Adoptions

- **Floating UI Migration**: If not already using Floating UI, it's the clear industry standard
- **DismissableLayer Pattern**: The stacked layer management is robust and well-tested
- **Context Scope System**: Could enable better component composition in CDS
- **CSS Variable API**: Standardizing `--cds-*` properties for floating content dimensions

### Differences to Consider

- CDS may need pre-built styled components rather than unstyled primitives
- React Native support would require different positioning strategies
- CDS theming system may require different integration points

## References

- [Radix Primitives Source Code](https://github.com/radix-ui/primitives)
- [Floating UI Documentation](https://floating-ui.com/)
- [Radix Popover Documentation](https://www.radix-ui.com/primitives/docs/components/popover)
- [Radix Architecture Guide](https://www.radix-ui.com/primitives/docs/overview/introduction)
- Package: `@radix-ui/react-popper` v1.2.8
- Package: `@radix-ui/react-popover` v1.1.15
