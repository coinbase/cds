# Mantine: Popover and Floating Menu Components

## Executive Summary

Mantine implements its floating UI components (Popover, Menu, Tooltip, HoverCard) using a layered architecture where Popover serves as the foundational primitive. All components leverage `@floating-ui/react` for positioning logic, with Mantine providing a consistent API layer, accessibility handling, and animation system on top.

## Overview

Mantine's floating components follow a compound component pattern with a clear inheritance hierarchy. The Popover component is the base layer that handles positioning, portaling, transitions, and core functionality. Higher-level components like Menu, Tooltip, and HoverCard wrap Popover and add specialized behavior for their use cases.

## Key Findings

### 1. Architectural Hierarchy

Mantine's floating components form a clear dependency chain:

```
Popover (base primitive)
   |
   +-- Menu (extends Popover, adds keyboard navigation)
   |     +-- MenuSub (nested menus using Popover internally)
   |
   +-- HoverCard (extends Popover, adds hover-based opening)
   |
   +-- Tooltip (independent, uses floating-ui directly)
```

**Popover** is the foundational component that all others build upon. It handles:
- Floating positioning via `@floating-ui/react`
- Portal rendering
- Transitions and animations
- Arrow positioning
- Click outside detection
- Escape key handling
- Focus trapping

### 2. Third-Party Dependencies

Mantine relies on `@floating-ui/react` (version ^0.27.16) as its sole positioning library. From `package.json`:

```json
{
  "dependencies": {
    "@floating-ui/react": "^0.27.16",
    "clsx": "^2.1.1",
    "react-remove-scroll": "^2.7.1"
    // ... other non-floating dependencies
  }
}
```

The library uses various floating-ui hooks and middlewares:
- `useFloating` - Core positioning hook
- `autoUpdate` - Automatic position updates on scroll/resize
- `offset`, `flip`, `shift`, `arrow`, `inline`, `size`, `hide` - Positioning middlewares
- `useHover`, `useFocus`, `useDismiss`, `useRole`, `useInteractions` - Interaction hooks
- `useDelayGroup`, `FloatingDelayGroup` - Tooltip grouping

### 3. Popover Implementation Details

#### Core Hook: `usePopover`

The `usePopover` hook encapsulates all floating logic:

```typescript
export function usePopover(options: UsePopoverOptions) {
  const floating: UseFloatingReturn<Element> = useFloating({
    strategy: options.strategy,
    placement: options.preventPositionChangeWhenVisible
      ? options.positionRef.current
      : options.position,
    middleware: getPopoverMiddlewares(options, () => floating, env),
    whileElementsMounted: !options.keepMounted ? autoUpdate : undefined,
  });

  // ... state management and callbacks
}
```

#### Middleware Configuration

Middlewares are configurable via props with sensible defaults:

```typescript
function getPopoverMiddlewares(options, getFloating, env) {
  const middlewares: Middleware[] = [offset(options.offset), hide()];

  if (middlewaresOptions.shift) {
    middlewares.push(shift({ limiter: limitShift(), padding: 5, ...options }));
  }

  if (middlewaresOptions.flip) {
    middlewares.push(flip(options));
  }

  if (middlewaresOptions.inline) {
    middlewares.push(inline(options));
  }

  middlewares.push(arrow({ element: options.arrowRef, padding: options.arrowOffset }));

  if (middlewaresOptions.size || options.width === 'target') {
    middlewares.push(size({ /* ... */ }));
  }

  return middlewares;
}
```

#### Compound Component Pattern

Popover uses React Context to share state between Target and Dropdown:

```typescript
export function Popover(_props: PopoverProps) {
  // ... setup

  return (
    <PopoverContextProvider
      value={{
        opened: popover.opened,
        x: popover.floating.x,
        y: popover.floating.y,
        placement: popover.floating.placement,
        reference, // ref callback for target
        floating,  // ref callback for dropdown
        // ... many other values
      }}
    >
      {children}
    </PopoverContextProvider>
  );
}

Popover.Target = PopoverTarget;
Popover.Dropdown = PopoverDropdown;
```

### 4. Menu Component Architecture

Menu wraps Popover and adds:
- Keyboard navigation with arrow keys
- Multiple trigger modes: `click`, `hover`, `click-hover`
- Menu item focus management
- Submenu support via `MenuSub`

```typescript
export function Menu(_props: MenuProps) {
  const { openDropdown, closeDropdown } = useDelayedHover({ open, close, closeDelay, openDelay });

  return (
    <MenuContextProvider
      value={{
        toggleDropdown,
        getItemIndex,
        closeOnItemClick,
        loop,
        trigger,
        // ...
      }}
    >
      <Popover
        opened={_opened}
        trapFocus={keepMounted ? false : trapFocus}
        __staticSelector="Menu"
        // ...
      >
        {children}
      </Popover>
    </MenuContextProvider>
  );
}
```

#### Keyboard Navigation

Menu items use a scoped keydown handler for arrow key navigation:

```typescript
<UnstyledButton
  onKeyDown={createScopedKeydownHandler({
    siblingSelector: '[data-menu-item]:not([data-disabled])',
    parentSelector: '[data-menu-dropdown]',
    activateOnFocus: false,
    loop: ctx.loop,
    dir,
    orientation: 'vertical',
  })}
  // ...
/>
```

#### Submenu Support

`MenuSub` creates nested Popovers that maintain context linkage:

```typescript
export function MenuSub(_props: MenuSubProps) {
  const [opened, { open, close }] = useDisclosure(false);
  const ctx = useSubMenuContext();

  return (
    <SubMenuProvider
      value={{
        opened,
        close: closeDropdown,
        open: openDropdown,
        focusFirstItem,
        focusParentItem,
        parentContext: ctx, // Links to parent submenu context
      }}
    >
      <Popover opened={opened} withinPortal={false} withArrow={false}>
        {children}
      </Popover>
    </SubMenuProvider>
  );
}
```

### 5. Tooltip Component

Tooltip takes a different approach than Menu/HoverCard. Instead of wrapping Popover, it directly uses `@floating-ui/react` hooks:

```typescript
export function useTooltip(settings: UseTooltip) {
  const { getReferenceProps, getFloatingProps } = useInteractions([
    useHover(context, {
      enabled: settings.events?.hover,
      delay: withinGroup ? groupDelay : { open: settings.openDelay, close: settings.closeDelay },
      mouseOnly: !settings.events?.touch,
    }),
    useFocus(context, { enabled: settings.events?.focus, visibleOnly: true }),
    useRole(context, { role: 'tooltip' }),
    useDismiss(context, { enabled: typeof settings.opened === 'undefined' }),
  ]);
  // ...
}
```

#### Tooltip Grouping

Tooltips support grouping for reduced delays when moving between items:

```typescript
export function TooltipGroup(props: TooltipGroupProps) {
  return (
    <TooltipGroupProvider value>
      <FloatingDelayGroup delay={{ open: openDelay, close: closeDelay }}>
        {children}
      </FloatingDelayGroup>
    </TooltipGroupProvider>
  );
}
```

#### Floating Tooltip Variant

`Tooltip.Floating` follows the mouse cursor instead of anchoring to an element:

```typescript
const handleMouseMove = useCallback(
  ({ clientX, clientY }) => {
    refs.setPositionReference({
      getBoundingClientRect() {
        return {
          x: clientX,
          y: clientY,
          left: clientX + horizontalOffset,
          top: clientY + verticalOffset,
          // ...
        };
      },
    });
  },
  [elements.reference]
);
```

### 6. HoverCard Component

HoverCard is simpler than Menu - it wraps Popover with hover-based open/close:

```typescript
export function useHoverCard(settings: UseHoverCard) {
  const { getReferenceProps, getFloatingProps } = useInteractions([
    useHover(context, {
      enabled: true,
      delay: withinGroup ? groupDelay : { open: settings.openDelay, close: settings.closeDelay },
    }),
    useRole(context, { role: 'dialog' }),
    useDismiss(context, { enabled: withinGroup }),
  ]);
  // ...
}
```

### 7. Accessibility Implementation

#### ARIA Attributes

Popover handles accessibility through `withRoles` prop:

```typescript
const accessibleProps = ctx.withRoles
  ? {
      'aria-labelledby': ctx.getTargetId(),
      id: ctx.getDropdownId(),
      role: 'dialog',
      tabIndex: -1,
    }
  : {};
```

Menu items have proper menu semantics:

```typescript
<UnstyledButton
  role="menuitem"
  tabIndex={ctx.menuItemTabIndex}
  data-menu-item
  data-disabled={disabled || undefined}
  // ...
/>
```

#### Focus Management

Focus trapping uses the `FocusTrap` component:

```typescript
<FocusTrap active={ctx.trapFocus && ctx.opened} innerRef={mergedRef}>
  <Box {...accessibleProps} {...dropdownProps}>
    {children}
  </Box>
</FocusTrap>
```

Focus return is handled via `useFocusReturn` hook:

```typescript
const returnFocus = useFocusReturn({
  opened: ctx.opened,
  shouldReturnFocus: ctx.returnFocus,
});
```

#### Escape Key Handling

A reusable `closeOnEscape` utility:

```typescript
export function closeOnEscape(callback, options = { active: true }) {
  if (typeof callback !== 'function' || !options.active) {
    return options.onKeyDown || noop;
  }

  return (event: React.KeyboardEvent<any>) => {
    if (event.key === 'Escape') {
      callback(event);
      options.onTrigger?.();
    }
  };
}
```

### 8. Positioning and Arrow System

#### RTL Support

Position flipping for RTL layouts:

```typescript
export function getFloatingPosition(dir: 'rtl' | 'ltr', position: FloatingPosition) {
  if (dir === 'rtl' && (position.includes('right') || position.includes('left'))) {
    const [side, placement] = position.split('-');
    const flippedPosition = side === 'right' ? 'left' : 'right';
    return placement === undefined ? flippedPosition : `${flippedPosition}-${placement}`;
  }
  return position;
}
```

#### Arrow Component

The `FloatingArrow` component handles complex arrow positioning:

```typescript
export function getArrowPositionStyles({
  position,
  arrowSize,
  arrowOffset,
  arrowRadius,
  arrowPosition,
  arrowX,
  arrowY,
  dir,
}) {
  const [side, placement = 'center'] = position.split('-');
  const baseStyles = {
    width: arrowSize,
    height: arrowSize,
    transform: 'rotate(45deg)',
    position: 'absolute',
    [radiusByFloatingSide[side]]: arrowRadius,
  };

  // Position based on side (top, right, bottom, left)
  // with clip-path for proper triangular appearance
}
```

### 9. Transition System

Mantine uses a custom `Transition` component for animations:

```typescript
export function Transition({
  mounted,
  duration = 250,
  transition = 'fade',
  keepMounted,
  children,
  // ...
}) {
  const { transitionStatus } = useTransition({ mounted, duration, /* ... */ });

  return transitionStatus === 'exited' ? (
    keepMounted ? children({ display: 'none' }) : null
  ) : (
    children(getTransitionStyles({ transition, duration, state: transitionStatus }))
  );
}
```

The `keepMounted` prop allows keeping elements in the DOM when hidden (useful for SEO and initial load performance).

## Code Examples

### Basic Popover Usage

```tsx
import { Popover, Button, Text } from '@mantine/core';

function Demo() {
  return (
    <Popover width={200} position="bottom" withArrow shadow="md">
      <Popover.Target>
        <Button>Toggle popover</Button>
      </Popover.Target>
      <Popover.Dropdown>
        <Text size="sm">Content here</Text>
      </Popover.Dropdown>
    </Popover>
  );
}
```

### Menu with Submenus

```tsx
import { Menu, Button } from '@mantine/core';

function Demo() {
  return (
    <Menu trigger="hover" openDelay={100} closeDelay={400}>
      <Menu.Target>
        <Button>Toggle menu</Button>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item>Item 1</Menu.Item>
        <Menu.Sub position="right-start">
          <Menu.Sub.Target>
            <Menu.Sub.Item>Submenu</Menu.Sub.Item>
          </Menu.Sub.Target>
          <Menu.Sub.Dropdown>
            <Menu.Sub.Item>Sub item 1</Menu.Sub.Item>
          </Menu.Sub.Dropdown>
        </Menu.Sub>
      </Menu.Dropdown>
    </Menu>
  );
}
```

### Controlled Tooltip

```tsx
import { Tooltip, Button } from '@mantine/core';

function Demo() {
  const [opened, setOpened] = useState(false);

  return (
    <Tooltip
      label="Tooltip content"
      opened={opened}
      events={{ hover: true, focus: true, touch: true }}
    >
      <Button onMouseEnter={() => setOpened(true)} onMouseLeave={() => setOpened(false)}>
        Hover me
      </Button>
    </Tooltip>
  );
}
```

### Custom Middlewares

```tsx
<Popover
  middlewares={{
    flip: { fallbackAxisSideDirection: 'start' },
    shift: { padding: 20 },
    size: {
      apply({ availableHeight }) {
        // Custom sizing logic
      }
    }
  }}
>
  {/* ... */}
</Popover>
```

## Strengths

- **Unified Foundation**: Popover as the base component ensures consistent behavior across all floating components
- **Full `@floating-ui/react` Integration**: Direct access to all positioning middlewares with sensible defaults
- **Excellent Accessibility**: Built-in ARIA attributes, focus trapping, keyboard navigation, and screen reader support
- **Flexible Trigger Modes**: Support for click, hover, and click-hover triggers with configurable delays
- **Compound Component Pattern**: Clean, declarative API with good separation of concerns
- **RTL Support**: Automatic position flipping for right-to-left layouts
- **Animation System**: Integrated transition system with keepMounted option for performance optimization
- **Submenu Support**: Full nested menu support with proper focus management
- **Grouping**: Tooltip and HoverCard grouping for reduced delays when moving between items
- **Controlled/Uncontrolled**: All components support both controlled and uncontrolled modes

## Considerations & Trade-offs

- **Bundle Size**: `@floating-ui/react` adds ~12KB to the bundle (minified + gzipped)
- **Complexity**: The layered architecture adds complexity when debugging positioning issues
- **Tooltip Divergence**: Tooltip doesn't use Popover internally, leading to some API inconsistencies
- **Portal-First**: Components render in a portal by default, which can complicate styling in certain scenarios
- **Test Environment Handling**: Special handling needed for test environments (disables transitions, hides some behaviors)
- **Deprecated APIs**: Some props like `positionDependencies` are scheduled for removal, indicating ongoing API evolution

## Relevance to CDS

Key patterns and decisions from Mantine that could inform CDS floating component design:

1. **Use `@floating-ui/react` as the positioning engine** - It's the industry standard with excellent browser support and comprehensive functionality

2. **Build a base Popover primitive** - Having a foundational component that handles positioning, portaling, and transitions reduces duplication and ensures consistency

3. **Compound component pattern** - The `<Popover.Target>` and `<Popover.Dropdown>` pattern provides a clean, readable API

4. **Configurable middlewares** - Exposing floating-ui middlewares as typed props gives power users flexibility while maintaining good defaults

5. **Separate concerns for specialized components** - Menu adds keyboard navigation, Tooltip uses different interaction hooks, HoverCard focuses on hover behavior

6. **Focus management utilities** - Dedicated hooks for focus trapping and focus return are essential for accessibility

7. **RTL-aware positioning** - Position flipping should be automatic based on direction context

8. **Animation abstraction** - A Transition component can encapsulate enter/exit animations consistently

9. **keepMounted optimization** - Option to keep content in DOM for performance or SEO when appropriate

10. **Grouping support** - TooltipGroup/HoverCardGroup patterns reduce jarring delays when moving between multiple floating elements

## References

- Source Code: [Mantine Popover](https://github.com/mantinedev/mantine/tree/master/packages/@mantine/core/src/components/Popover)
- Source Code: [Mantine Menu](https://github.com/mantinedev/mantine/tree/master/packages/@mantine/core/src/components/Menu)
- Source Code: [Mantine Tooltip](https://github.com/mantinedev/mantine/tree/master/packages/@mantine/core/src/components/Tooltip)
- Source Code: [Mantine HoverCard](https://github.com/mantinedev/mantine/tree/master/packages/@mantine/core/src/components/HoverCard)
- Source Code: [Mantine Floating Utils](https://github.com/mantinedev/mantine/tree/master/packages/@mantine/core/src/utils/Floating)
- Documentation: [Mantine Popover Docs](https://mantine.dev/core/popover/)
- Documentation: [Mantine Menu Docs](https://mantine.dev/core/menu/)
- Floating UI: [Floating UI React Docs](https://floating-ui.com/docs/react)
