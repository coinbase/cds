# Popover and Floating Menu Component Implementations in Open Source Libraries

## Executive Summary

This research examined how five major open source component libraries (Ant Design, Material UI, Radix UI, Mantine, and Base UI) implement popover and floating menu components. The key finding is that **all libraries use third-party positioning engines** rather than custom implementations. Floating UI (formerly Popper.js) dominates as the positioning solution of choice, with only Ant Design using a custom alternative (rc-component/trigger). All libraries implement comprehensive accessibility features including focus management, keyboard navigation, ARIA attributes, and scroll locking, though implementation approaches vary significantly.

## Overview

Popover and floating menu components are among the most complex UI primitives to implement correctly. They require sophisticated positioning algorithms, collision detection, accessibility support, focus management, and portal rendering. This research analyzed production implementations to identify common patterns, dependencies, and architectural decisions.

## Key Findings by Library

### Ant Design

**Positioning Engine:** Custom (@rc-component/trigger + @rc-component/tooltip)

Ant Design is unique in using its own positioning solution through the RC Component ecosystem rather than Floating UI. The library wraps all functionality in reusable RC components.

**Implementation Approach:**
- Popover extends Tooltip component, which wraps `@rc-component/tooltip`
- Dropdown uses `@rc-component/dropdown` with `@rc-component/trigger` for positioning
- Menu component is separate and gets composed into Dropdown
- All positioning logic delegated to `@rc-component/trigger`

**Key Dependencies:**
```json
{
  "@rc-component/tooltip": "~1.4.0",
  "@rc-component/dropdown": "~1.0.2",
  "@rc-component/trigger": "^3.7.1",
  "@rc-component/menu": "~1.2.0"
}
```

**Architecture Pattern:**
```typescript
// Popover extends Tooltip
const Popover = (props) => {
  return (
    <Tooltip
      arrow={mergedArrow}
      placement={placement}
      trigger={mergedTrigger}
      overlay={<PopoverContent />}
    >
      {children}
    </Tooltip>
  );
};
```

**Accessibility Features:**
- Keyboard navigation (ESC to close)
- Controlled and uncontrolled state patterns
- Portal rendering for z-index management
- Focus return on close
- `aria-haspopup`, `aria-expanded`, `aria-controls` attributes

**Strengths:**
- Complete ecosystem control (no external positioning dependencies)
- Consistent API across all RC components
- Battle-tested in Alibaba's enterprise applications
- Rich component composition (Popover builds on Tooltip)

**Considerations:**
- Custom positioning engine requires internal maintenance
- Less community contributions compared to Floating UI
- Tighter coupling to RC ecosystem

---

### Material UI

**Positioning Engine:** @popperjs/core (Popper.js v2)

Material UI uses Popper.js, the predecessor to Floating UI. While Floating UI is the modern successor, Material UI has deep integration with Popper.js.

**Implementation Approach:**
- Popover built on top of Modal component
- Custom positioning calculations with manual offset management
- Menu extends Popover with MenuList for items
- Modal provides overlay, portal, and focus management

**Key Dependencies:**
```json
{
  "@popperjs/core": "^2.11.8",
  "react-transition-group": "^4.4.5"
}
```

**Architecture Pattern:**
```javascript
// Popover uses Modal + custom positioning
const Popover = (props) => {
  // Custom positioning calculations
  const getAnchorOffset = () => {
    // Manual offset calculations based on anchorOrigin
  };

  return (
    <Modal open={open}>
      <Grow>
        <Paper
          style={{
            position: 'absolute',
            transformOrigin: getTransformOriginValue(transformOrigin)
          }}
        >
          {children}
        </Paper>
      </Grow>
    </Modal>
  );
};
```

**Accessibility Features:**
- Full Modal integration (backdrop, focus trap, scroll lock)
- Custom transform origin calculations for animations
- Auto-focus management
- Grow transition component for enter/exit animations
- ARIA attributes through Modal

**Strengths:**
- Deep integration with Material Design specifications
- Sophisticated animation system
- Proven at massive scale (used by thousands of applications)
- Excellent TypeScript support

**Considerations:**
- Uses older Popper.js v2 (not migrated to Floating UI yet)
- More manual positioning code compared to modern alternatives
- Tighter coupling to Material Design patterns

---

### Radix UI

**Positioning Engine:** @floating-ui/react-dom

Radix Primitives uses Floating UI for positioning and provides the most comprehensive accessibility implementation in this research.

**Implementation Approach:**
- Popover uses `@radix-ui/react-popper` (wraps Floating UI)
- Dropdown Menu uses `@radix-ui/react-menu` with same positioning engine
- Separate Modal and Non-Modal variants
- Extensive use of composition with primitive components

**Key Dependencies:**
```json
{
  "@floating-ui/react-dom": "^2.0.0",
  "@radix-ui/react-popper": "workspace:*",
  "@radix-ui/react-focus-scope": "workspace:*",
  "@radix-ui/react-focus-guards": "workspace:*",
  "@radix-ui/react-dismissable-layer": "workspace:*",
  "@radix-ui/react-portal": "workspace:*",
  "@radix-ui/react-presence": "workspace:*",
  "aria-hidden": "^1.2.4",
  "react-remove-scroll": "^2.6.3"
}
```

**Architecture Pattern:**
```typescript
// Popover with modal/non-modal variants
const Popover = (props) => {
  return (
    <PopperPrimitive.Root>
      <PopoverProvider>
        {children}
      </PopoverProvider>
    </PopperPrimitive.Root>
  );
};

const PopoverContentModal = (props) => {
  // Use hideOthers for aria-hidden
  useEffect(() => {
    const content = contentRef.current;
    if (content) return hideOthers(content);
  }, []);

  return (
    <RemoveScroll allowPinchZoom>
      <PopoverContentImpl
        trapFocus={context.open}
        disableOutsidePointerEvents
        onCloseAutoFocus={(event) => {
          event.preventDefault();
          context.triggerRef.current?.focus();
        }}
      />
    </RemoveScroll>
  );
};
```

**Accessibility Features:**
- **Most comprehensive accessibility implementation**
- Focus trap with FocusScope component
- Focus guards to prevent focus escape
- `aria-hidden` on other elements when modal (using aria-hidden library)
- Scroll locking with react-remove-scroll
- Auto-focus management with onOpenAutoFocus/onCloseAutoFocus
- Dismissable layer for outside clicks
- Presence component for animation coordination
- Roving focus for Menu keyboard navigation
- Full ARIA attributes (aria-haspopup, aria-expanded, aria-controls)

**Strengths:**
- Industry-leading accessibility
- Completely unstyled (true primitives)
- Granular composition (can use just the pieces you need)
- Modal and non-modal variants
- Excellent TypeScript support
- Active maintenance and community

**Considerations:**
- Many small packages to coordinate
- Learning curve for composition pattern
- Requires more integration work (unstyled)

---

### Mantine

**Positioning Engine:** @floating-ui/react

Mantine uses the modern Floating UI React library with custom positioning utilities.

**Implementation Approach:**
- Custom `usePopover` hook wraps Floating UI
- `FloatingPosition` utility abstracts positioning configuration
- Popover and Menu share positioning logic
- Built-in Portal and Transition components

**Key Dependencies:**
```json
{
  "@floating-ui/react": "^0.27.16",
  "react-remove-scroll": "^2.7.1"
}
```

**Architecture Pattern:**
```typescript
// Mantine uses custom positioning abstraction
const Popover = (props) => {
  const positioning = usePopover({
    position: props.position,
    offset: props.offset,
    middlewares: props.middlewares,
    // ... other positioning config
  });

  return (
    <PopoverContextProvider>
      <OptionalPortal>
        <Transition>
          <PopoverDropdown
            style={positioning.positionerStyles}
          >
            {children}
          </PopoverDropdown>
        </Transition>
      </OptionalPortal>
    </PopoverContextProvider>
  );
};
```

**Accessibility Features:**
- Click outside detection with @mantine/hooks
- Focus management
- Keyboard controls (ESC to close)
- Overlay support
- Z-index management
- Scroll locking via react-remove-scroll

**Strengths:**
- Modern Floating UI integration
- Clean abstraction over Floating UI complexity
- Excellent DX with sensible defaults
- Built-in theming system
- TypeScript-first design

**Considerations:**
- Less granular than Radix (less compositional)
- Tighter coupling to Mantine's styling system
- Fewer accessibility features than Radix

---

### Base UI

**Positioning Engine:** @floating-ui/react-dom

Base UI (from the MUI team) is the newest library in this research and represents a modern headless approach.

**Implementation Approach:**
- Direct Floating UI integration
- Component store pattern for state management
- Anchor positioning abstraction
- Adaptive origin middleware for animations

**Key Dependencies:**
```json
{
  "@floating-ui/react-dom": "^2.1.6",
  "@floating-ui/utils": "^0.2.10",
  "tabbable": "^6.3.0"
}
```

**Architecture Pattern:**
```typescript
// Base UI uses store pattern with Floating UI
const PopoverPositioner = (props) => {
  const { store } = usePopoverRootContext();
  const floatingRootContext = store.useState('floatingRootContext');

  const positioning = useAnchorPositioning({
    anchor,
    floatingRootContext,
    positionMethod,
    side,
    sideOffset,
    align,
    alignOffset,
    collisionBoundary,
    collisionPadding,
    sticky,
    collisionAvoidance,
    adaptiveOrigin, // Custom middleware
  });

  return (
    <div
      role="presentation"
      style={positioning.positionerStyles}
    >
      {children}
    </div>
  );
};
```

**Accessibility Features:**
- Store-based state management
- Focus management with tabbable library
- Collision avoidance
- Adaptive transform origin for smooth animations
- Portal rendering
- Animation coordination

**Strengths:**
- Modern architecture (newest in this research)
- Completely headless
- Leverages latest Floating UI features
- Custom adaptive origin middleware for animations
- Clean separation of concerns

**Considerations:**
- Relatively new (less battle-tested)
- Store pattern adds complexity
- Documentation still maturing

---

## Comparative Analysis

### Positioning Solutions Summary

| Library | Positioning Engine | Version/Approach |
|---------|-------------------|------------------|
| Ant Design | @rc-component/trigger | Custom RC ecosystem |
| Material UI | @popperjs/core | Popper.js v2 |
| Radix UI | @floating-ui/react-dom | Floating UI v2 |
| Mantine | @floating-ui/react | Floating UI React |
| Base UI | @floating-ui/react-dom | Floating UI v2 |

**Key Insight:** 4 out of 5 libraries use Floating UI (or its predecessor Popper.js). This indicates strong industry consensus around Floating UI as the positioning solution.

### Accessibility Feature Comparison

| Feature | Ant Design | Material UI | Radix UI | Mantine | Base UI |
|---------|-----------|-------------|----------|---------|---------|
| Focus Trap | Partial | Yes (Modal) | Yes | Yes | Yes |
| Focus Guards | No | No | Yes | No | No |
| Aria-hidden Others | No | Partial | Yes | No | No |
| Scroll Lock | No | Yes (Modal) | Yes | Yes | Partial |
| Auto Focus | Partial | Yes | Yes | Yes | Yes |
| Keyboard Nav | Yes | Yes | Yes | Yes | Yes |
| ARIA Attributes | Yes | Yes | Yes | Yes | Yes |
| Outside Click | Yes | Yes | Yes | Yes | Yes |

**Winner:** Radix UI has the most comprehensive accessibility implementation with focus guards, aria-hidden, and granular focus management.

### Common Third-Party Dependencies

**Almost Universal:**
- **Floating UI** (@floating-ui/react-dom or @floating-ui/react) - Used by 3/5 libraries
- **react-remove-scroll** - Used by 3/5 libraries for scroll locking

**Accessibility Specific:**
- **aria-hidden** - Radix UI for hiding other elements
- **tabbable** - Base UI for focus management

**Animation:**
- **react-transition-group** - Material UI

### Implementation Patterns

**Three Main Architectural Approaches:**

1. **Component Composition (Radix UI)**
   - Small, focused components that compose together
   - Maximum flexibility, steeper learning curve
   - Best accessibility

2. **Inheritance Pattern (Material UI, Ant Design)**
   - Popover extends Tooltip or Modal
   - Simpler mental model
   - Less flexible composition

3. **Hook-based Abstraction (Mantine, Base UI)**
   - Custom hooks wrap positioning logic
   - Modern React patterns
   - Good balance of flexibility and simplicity

### Focus Management Strategies

**Auto-focus on Open:**
- All libraries support auto-focus when popover opens
- Radix provides most control with `onOpenAutoFocus` callback

**Focus Return on Close:**
- All libraries return focus to trigger element
- Radix and Mantine provide callbacks to customize
- Material UI handles through Modal component

**Focus Trap:**
- Modal popovers trap focus (prevent tab outside)
- Radix uses dedicated FocusScope component
- Material UI uses Modal's built-in trap
- Mantine and Base UI implement similar patterns

### Keyboard Interaction Patterns

**Common Keyboard Shortcuts:**
- **ESC** - Close popover (all libraries)
- **Enter/Space** - Open from trigger (all libraries)
- **Tab** - Navigate through content (with or without trap)
- **Arrow Keys** - Menu navigation (Menu components)

**Radix Menu-specific:**
- ArrowDown on trigger opens menu
- Roving focus for menu items
- Type-ahead search

---

## Code Examples

### Floating UI Integration (Radix Pattern)

```typescript
// Radix wraps Floating UI in a reusable Popper primitive
import * as PopperPrimitive from '@radix-ui/react-popper';

const Popover = ({ children }) => {
  return (
    <PopperPrimitive.Root>
      {children}
    </PopperPrimitive.Root>
  );
};

const PopoverAnchor = React.forwardRef((props, ref) => {
  return <PopperPrimitive.Anchor {...props} ref={ref} />;
});

const PopoverContent = React.forwardRef((props, ref) => {
  return (
    <PopperPrimitive.Content
      side="bottom"
      align="center"
      {...props}
      ref={ref}
    />
  );
});
```

### Custom Positioning Hook (Mantine Pattern)

```typescript
// Mantine abstracts Floating UI in a custom hook
import { useFloating } from '@floating-ui/react';

function usePopover(options) {
  const {
    position,
    offset,
    middlewares,
  } = options;

  const { x, y, strategy, refs } = useFloating({
    placement: getFloatingPosition(position),
    middleware: [
      middlewares.shift && shift(),
      middlewares.flip && flip(),
      offset && offsetMiddleware(offset),
    ],
  });

  return {
    positionerStyles: {
      position: strategy,
      left: x ?? 0,
      top: y ?? 0,
    },
    refs,
  };
}
```

### Focus Management (Radix Pattern)

```typescript
// Radix comprehensive focus management
import { FocusScope } from '@radix-ui/react-focus-scope';
import { hideOthers } from 'aria-hidden';

const PopoverContentModal = (props) => {
  const contentRef = React.useRef(null);

  // Hide other elements from screen readers
  React.useEffect(() => {
    const content = contentRef.current;
    if (content) return hideOthers(content);
  }, []);

  return (
    <RemoveScroll allowPinchZoom>
      <FocusScope
        trapped={true}
        onMountAutoFocus={(event) => {
          // Focus first focusable element
          event.preventDefault();
          contentRef.current?.focus();
        }}
        onUnmountAutoFocus={(event) => {
          // Return focus to trigger
          event.preventDefault();
          triggerRef.current?.focus();
        }}
      >
        <div ref={contentRef}>
          {children}
        </div>
      </FocusScope>
    </RemoveScroll>
  );
};
```

### RC Component Pattern (Ant Design)

```typescript
// Ant Design delegates to RC components
import RcDropdown from '@rc-component/dropdown';

const Dropdown = (props) => {
  const {
    menu,
    trigger = ['hover'],
    placement = 'bottomLeft',
  } = props;

  const builtinPlacements = getPlacements({
    arrowPointAtCenter: arrow?.pointAtCenter,
    autoAdjustOverflow: true,
    offset: token.marginXXS,
  });

  return (
    <RcDropdown
      trigger={trigger}
      placement={placement}
      builtinPlacements={builtinPlacements}
      overlay={<Menu {...menu} />}
    >
      {children}
    </RcDropdown>
  );
};
```

---

## Technical Implementation Details

### Positioning Algorithm Approaches

**Floating UI (Modern Approach):**
- Collision detection with boundary checking
- Auto-flipping when space unavailable
- Shift middleware to keep in viewport
- Size middleware to constrain dimensions
- Arrow positioning middleware
- Virtual element support

**RC Component Trigger (Custom Approach):**
- Manual align configuration
- Built-in placements map
- Custom overflow adjustment
- Trigger-specific positioning logic
- Aligned with Ant Design's design requirements

### Portal Rendering Patterns

**All libraries use portals to render floating content:**

1. **Radix UI:** Dedicated `@radix-ui/react-portal` component
2. **Material UI:** Built into Modal component
3. **Mantine:** OptionalPortal component (can disable)
4. **Base UI:** Portal component in store
5. **Ant Design:** RC Portal component

**Why Portals?**
- Escape stacking context limitations
- Avoid z-index conflicts
- Enable full-screen overlays
- Simplify CSS layering

### Animation Coordination

**Key Challenge:** Coordinate positioning with enter/exit animations

**Radix Solution:**
```typescript
// Presence component coordinates with CSS animations
<Presence present={open}>
  <PopoverContent />
</Presence>
```

**Material UI Solution:**
```typescript
// TransitionGroup with Grow component
<Grow in={open} timeout={transitionDuration}>
  <Paper />
</Grow>
```

**Base UI Solution:**
```typescript
// Adaptive origin middleware adjusts transform-origin
const adaptiveOrigin = {
  name: 'adaptiveOrigin',
  fn: (state) => {
    // Calculate transform origin based on placement
    return {
      data: {
        transformOrigin: calculateOrigin(state.placement)
      }
    };
  }
};
```

---

## Relevance to CDS

### Recommendations for Coinbase Design System

**1. Use Floating UI for Positioning**
- Industry standard (4/5 libraries use it or its predecessor)
- Active maintenance and community
- Comprehensive middleware system
- Framework agnostic (works with React Native via different adapter)

**2. Prioritize Accessibility**
- Follow Radix UI's comprehensive approach
- Implement focus trap for modal variants
- Use aria-hidden for other content when modal
- Provide keyboard navigation
- Include focus guards to prevent escape

**3. Architectural Pattern Recommendation**
Based on CDS's existing patterns:
- **For Web:** Hook-based abstraction (similar to Mantine) provides good balance
- **For Mobile:** Custom implementation may be needed (React Native positioning differs)
- **For Both:** Share accessibility logic and state management

**4. Key Dependencies to Consider**
```json
{
  // Positioning
  "@floating-ui/react-dom": "latest", // Web
  "@floating-ui/react-native": "latest", // Mobile

  // Accessibility
  "react-remove-scroll": "latest", // Scroll locking
  "aria-hidden": "latest", // Hide other content
  "focus-trap-react": "latest", // Alternative to custom focus trap

  // Utilities
  "tabbable": "latest" // Find focusable elements
}
```

**5. Modal vs Non-Modal Variants**
- Provide both like Radix UI
- Modal: backdrop, focus trap, scroll lock, aria-hidden
- Non-modal: light dismiss, no trap, no backdrop

**6. Cross-Platform Considerations**
- Floating UI has React Native support
- Consider React Native specific positioning challenges
- May need platform-specific implementations
- Share accessibility patterns where possible

**7. Component Composition**
For CDS architecture:
```
Popover (base positioning + portal)
  ├─ Tooltip (hover trigger, no modal)
  ├─ Dropdown (click trigger, optional modal)
  └─ Menu (with keyboard navigation)
```

**8. Testing Considerations**
- All libraries struggle with testing floating components
- Test focus management extensively
- Test keyboard navigation
- Test positioning in different scenarios
- Test with screen readers

---

## References

### Source Code
- [Ant Design Repository](https://github.com/ant-design/ant-design)
  - `/components/popover/index.tsx`
  - `/components/dropdown/dropdown.tsx`
- [Material UI Repository](https://github.com/mui/material-ui)
  - `/packages/mui-material/src/Popover/Popover.js`
  - `/packages/mui-material/src/Menu/Menu.js`
- [Radix Primitives Repository](https://github.com/radix-ui/primitives)
  - `/packages/react/popover/src/popover.tsx`
  - `/packages/react/dropdown-menu/src/dropdown-menu.tsx`
  - `/packages/react/menu/src/menu.tsx`
- [Mantine Repository](https://github.com/mantinedev/mantine)
  - `/packages/@mantine/core/src/components/Popover/Popover.tsx`
  - `/packages/@mantine/core/src/components/Menu/Menu.tsx`
- [Base UI Repository](https://github.com/mui/base-ui)
  - `/packages/react/src/popover/positioner/PopoverPositioner.tsx`

### Documentation
- [Floating UI Documentation](https://floating-ui.com/)
- [Radix UI Popover](https://www.radix-ui.com/primitives/docs/components/popover)
- [Material UI Popover](https://mui.com/material-ui/react-popover/)
- [Mantine Popover](https://mantine.dev/core/popover/)
- [Base UI Popover](https://base-ui.com/react/components/popover)
- [Ant Design Popover](https://ant.design/components/popover/)

### Key Libraries
- [@floating-ui/react](https://www.npmjs.com/package/@floating-ui/react)
- [@floating-ui/react-dom](https://www.npmjs.com/package/@floating-ui/react-dom)
- [@popperjs/core](https://www.npmjs.com/package/@popperjs/core)
- [react-remove-scroll](https://www.npmjs.com/package/react-remove-scroll)
- [aria-hidden](https://www.npmjs.com/package/aria-hidden)
- [@rc-component/trigger](https://github.com/react-component/trigger)

### W3C Standards
- [WAI-ARIA Authoring Practices - Menu Button](https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/)
- [WAI-ARIA Authoring Practices - Dialog (Modal)](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/)
