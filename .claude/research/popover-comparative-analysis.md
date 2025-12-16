# Popover & Floating Menu Implementation: Comparative Analysis

**Research Question:** How do other component libraries implement popover or floating menu components? Do they use third-party libraries?

**Libraries Analyzed:** Material UI, Base UI, Radix Primitives, Mantine, Ant Design

---

## Executive Summary

All five major component libraries surveyed rely on third-party positioning libraries rather than implementing custom positioning logic. The industry has converged on two main solutions:

1. **Floating UI** (modern, 4/5 libraries) - Used by Base UI, Radix Primitives, Mantine, and for some components in Material UI
2. **RC Components** (legacy, 1/5 libraries) - Used by Ant Design via `@rc-component/trigger`
3. **Popper.js** (legacy, 1/5 libraries) - Used by Material UI for some components, now being superseded by Floating UI

### Key Patterns Across All Libraries

- **Third-party positioning is universal** - No library implements full positioning logic from scratch
- **Compound component pattern dominates** - All use variations of `<Component.Target>` and `<Component.Content>`
- **Separation of concerns** - Positioning, interactions, focus management, and animations are handled separately
- **Accessibility is built-in** - ARIA attributes, keyboard navigation, and focus trapping are standard features
- **CSS custom properties for sizing** - All expose dimensions via CSS variables for flexible styling

---

## System-by-System Breakdown

### Material UI

**Positioning Strategy:** Dual approach
- Custom positioning logic for Popover (origin-based alignment)
- Popper.js (`@popperjs/core` v2.11.8) for Tooltip and Popper components

**Architecture:**
- **Modal-based components** (Popover, Menu): Built on Modal with FocusTrap, Backdrop, Portal
- **Non-modal components** (Tooltip): Lightweight Popper-based positioning

**Key Dependencies:**
- `@popperjs/core`: ^2.11.8
- `react-transition-group`: ^4.4.5

**Strengths:**
- Comprehensive Modal Manager for stacking, scroll lock, and ARIA management
- Slot architecture for extensive customization
- Full RTL support
- Virtual element support for cursor following

**Trade-offs:**
- Two different positioning systems add complexity
- Custom Popover positioning lacks advanced collision detection

---

### Base UI

**Positioning Strategy:** Hybrid approach
- `@floating-ui/react-dom` (v2.1.6) for positioning calculations only
- **Internal fork** of all Floating UI interaction hooks

**Architecture:**
- Maintains custom implementations of `useFloating`, `useDismiss`, `useHover`, `useClick`, etc.
- Compound components with strict separation (Root, Trigger, Portal, Positioner, Popup, Arrow)
- Custom `ReactStore` pattern with selectors for state management

**Key Dependencies:**
- `@floating-ui/react-dom`: ^2.1.6
- `tabbable`: ^6.3.0

**Strengths:**
- Complete control over interaction behavior
- Safe polygon algorithm for hover menus
- Multi-trigger support with payload system
- Sophisticated focus management with `FloatingFocusManager`

**Trade-offs:**
- Fork maintenance burden
- Increased complexity with many interconnected concepts
- Larger bundle size from duplicated interaction logic

---

### Radix Primitives

**Positioning Strategy:** Pure Floating UI
- `@floating-ui/react-dom` wrapped in `@radix-ui/react-popper`
- Minimal dependencies beyond positioning

**Architecture:**
- Layered primitives: Popper (positioning) + DismissableLayer + FocusScope + Presence + Portal
- Context scope system for nested components
- Composable primitive approach

**Key Dependencies:**
- `@floating-ui/react-dom`: ^2.0.0
- `aria-hidden`: ^1.2.4
- `react-remove-scroll`: ^2.6.3

**Strengths:**
- Cleanest separation of concerns
- Presence component for animation-aware mounting
- Grace area algorithm using convex hull for hover transitions
- Minimal, focused dependencies

**Trade-offs:**
- Verbose JSX with many primitives
- No built-in transitions (user must provide CSS)
- Learning curve for composable architecture

---

### Mantine

**Positioning Strategy:** Full Floating UI integration
- `@floating-ui/react` (v0.27.16) with all interaction hooks
- Popover as foundational primitive

**Architecture:**
- Clear inheritance: Popover (base) → Menu/HoverCard (specialized)
- Tooltip diverges and uses Floating UI hooks directly
- Compound component pattern with Context sharing

**Key Dependencies:**
- `@floating-ui/react`: ^0.27.16
- `react-remove-scroll`: ^2.7.1

**Strengths:**
- Unified foundation through Popover base component
- Direct access to all Floating UI middlewares
- Excellent grouping support (TooltipGroup, HoverCardGroup)
- keepMounted optimization for performance

**Trade-offs:**
- Tooltip API inconsistency (doesn't extend Popover)
- Portal-first approach can complicate styling
- ~12KB bundle size from `@floating-ui/react`

---

### Ant Design

**Positioning Strategy:** RC Components ecosystem
- `@rc-component/trigger` (v3.7.1) as positioning engine
- "Points" alignment system (e.g., `['bc', 'tc']`)

**Architecture:**
- Tooltip is base, Popover extends it
- Dropdown uses parallel `@rc-component/dropdown`
- Context-based z-index management

**Key Dependencies:**
- `@rc-component/tooltip`: ~1.4.0
- `@rc-component/dropdown`: ~1.0.2
- `@rc-component/trigger`: ^3.7.1

**Strengths:**
- Sophisticated z-index management for nested popovers
- 12 comprehensive placement options
- Smart auto-adjustment (flip/shift)
- ConfigProvider for global defaults

**Trade-offs:**
- Multiple RC packages increase bundle size
- Keyboard accessibility requires opt-in
- Complex abstraction layers make debugging difficult
- Legacy positioning approach compared to Floating UI

---

## Comparative Analysis

### Positioning Libraries

| Library | Primary Positioning | Version/Type | Notes |
|---------|-------------------|--------------|-------|
| Material UI | Popper.js + Custom | @popperjs/core v2.11.8 | Dual strategy |
| Base UI | Floating UI (fork) | @floating-ui/react-dom v2.1.6 | Positioning only |
| Radix | Floating UI | @floating-ui/react-dom v2.0.0 | Pure delegation |
| Mantine | Floating UI | @floating-ui/react v0.27.16 | Full integration |
| Ant Design | RC Components | @rc-component/trigger v3.7.1 | Legacy approach |

**Winner:** **Floating UI** is the clear industry standard for modern implementations.

### Component Architecture Patterns

| Pattern | Material UI | Base UI | Radix | Mantine | Ant Design |
|---------|------------|---------|-------|---------|-----------|
| Compound Components | ✅ (Slots) | ✅ | ✅ | ✅ | ✅ |
| Context Sharing | ✅ | ✅ (Store) | ✅ (Scoped) | ✅ | ✅ |
| Modal/Non-Modal Split | ✅ | ✅ | ✅ | ❌ | ❌ |
| Animation Support | react-transition-group | State-based | Presence | Transition | @rc-motion |
| CSS Variables | ❌ | ✅ | ✅ | ❌ | ✅ |

### Accessibility Features

| Feature | Material UI | Base UI | Radix | Mantine | Ant Design |
|---------|------------|---------|-------|---------|-----------|
| Focus Trapping | ✅ (FocusTrap) | ✅ (FloatingFocusManager) | ✅ (FocusScope) | ✅ (FocusTrap) | ❌ (Manual) |
| Keyboard Navigation | ✅ (MenuList) | ✅ (useListNavigation) | ✅ (RovingFocus) | ✅ (Menu) | ⚠️ (Opt-in) |
| ARIA Attributes | ✅ Auto | ✅ Auto | ✅ Auto | ✅ Auto | ⚠️ Configurable |
| Escape Key | ✅ | ✅ | ✅ | ✅ | ✅ |
| Click Outside | ✅ | ✅ (useDismiss) | ✅ (DismissableLayer) | ✅ | ✅ |

**Leaders:** Radix and Base UI have the most comprehensive accessibility implementations.

### Hover Menu Features

| Feature | Material UI | Base UI | Radix | Mantine | Ant Design |
|---------|------------|---------|-------|---------|-----------|
| Safe Polygon | ❌ | ✅ | ✅ (Grace Area) | ✅ (via Floating UI) | ❌ |
| Hover Delays | ⚠️ Basic | ✅ FloatingDelayGroup | ✅ TooltipProvider | ✅ DelayGroup | ✅ |
| Submenu Support | ✅ | ✅ | ✅ | ✅ | ✅ |
| Intent Detection | ❌ | ✅ | ✅ | ❌ | ❌ |

**Leaders:** Base UI and Radix have the most sophisticated hover interaction handling.

### Bundle Size Impact

| Library | Positioning Library Size | Additional Dependencies | Total Impact |
|---------|-------------------------|------------------------|--------------|
| Material UI | ~3KB (Popper.js) | react-transition-group (~6KB) | ~9KB |
| Base UI | ~3KB (react-dom only) | Forked interactions (~8KB) | ~11KB |
| Radix | ~3KB (react-dom only) | aria-hidden + remove-scroll (~4KB) | ~7KB |
| Mantine | ~12KB (full @floating-ui/react) | react-remove-scroll (~3KB) | ~15KB |
| Ant Design | ~8KB (RC components) | @rc-motion (~4KB) | ~12KB |

**Winner:** **Radix Primitives** has the smallest footprint at ~7KB.

---

## Key Insights & Patterns

### 1. Floating UI Has Won

**Evidence:**
- 4 out of 5 libraries use Floating UI in some form
- Popper.js is being phased out (Material UI still migrating)
- Even Base UI uses Floating UI for positioning core, just forks interactions

**Why Floating UI:**
- Framework-agnostic core
- Middleware-based architecture (offset, flip, shift, size, arrow, hide)
- Active maintenance and modern API
- Virtual element support
- Smaller bundle size than Popper.js

### 2. Two Approaches to Interaction Handling

**Approach A: Use Floating UI Interaction Hooks** (Mantine, Radix via wrapper)
- Pros: Maintained by Floating UI team, comprehensive, well-tested
- Cons: Less control, ~8KB additional bundle size

**Approach B: Fork/Custom Interactions** (Base UI, Material UI)
- Pros: Full control, can integrate with existing patterns
- Cons: Maintenance burden, potential drift from upstream improvements

### 3. Compound Components Are Universal

All libraries use a variant of:
```tsx
<Component.Root>
  <Component.Target>Trigger</Component.Target>
  <Component.Content>Popup</Component.Content>
</Component.Root>
```

**Benefits:**
- Clear API with explicit relationships
- Type safety through namespace
- Flexibility in composition

### 4. CSS Custom Properties for Sizing

Best practice from Base UI, Radix, Ant Design:

```css
--available-width: /* viewport-constrained max width */
--available-height: /* viewport-constrained max height */
--anchor-width: /* reference element width */
--anchor-height: /* reference element height */
--transform-origin: /* for animations */
```

**Use Cases:**
- Match content width to trigger width
- Constrain content to available space
- Set transform origin for scale animations

### 5. Modal vs Non-Modal Is Important

Material UI, Base UI, and Radix all distinguish between:

**Modal Behavior:**
- Focus trapping
- Backdrop (visible or invisible)
- Disables pointer events outside
- Uses aria-hidden on siblings

**Non-Modal Behavior:**
- No focus trapping
- Can interact with rest of page
- Lighter weight

**Insight:** This distinction should be explicit in the API, not implicit based on component type.

### 6. Animation Support Varies Widely

| Approach | Libraries | How It Works |
|----------|-----------|--------------|
| State-based | Base UI, Radix | Expose `transitionStatus` states, user provides CSS |
| Integrated | Material UI, Ant Design | Built-in animation library |
| Hybrid | Mantine | Optional Transition component |

**Trend:** Moving toward state-based approach for flexibility and bundle size.

### 7. Safe Polygon for Hover Menus

Base UI and Radix implement sophisticated algorithms to prevent accidental menu closure:

```
User's cursor can move from trigger → through space → to submenu
without the menu closing, by detecting cursor intent via:
- Polygon from cursor to target content
- Cursor speed/direction analysis
- Grace areas with delay buffers
```

**Insight:** This is essential for good UX with hover-based nested menus.

---

## Recommendations for CDS

### 1. Use Floating UI as Positioning Engine ⭐⭐⭐

**Recommendation:** Adopt `@floating-ui/react-dom` for positioning, similar to Radix and Base UI.

**Rationale:**
- Industry standard with active development
- Smaller than alternatives
- Framework-agnostic core enables React Native strategy
- Middleware system is extensible

**Implementation:**
```typescript
import { useFloating, offset, flip, shift, arrow, size } from '@floating-ui/react-dom';
```

### 2. Build Custom Interaction Layer ⭐⭐

**Recommendation:** Implement custom interaction hooks rather than using `@floating-ui/react`.

**Rationale:**
- Full control over touch handling for mobile
- Can integrate with CDS's existing design tokens and theming
- Avoids ~8KB bundle size of full Floating UI React
- Enables platform-specific behavior (web vs React Native)

**Reference:** Follow Base UI's pattern of internal hooks wrapping Floating UI positioning.

### 3. Compound Component Pattern ⭐⭐⭐

**Recommendation:** Adopt compound components with clear namespacing.

**API Design:**
```tsx
<Popover.Root>
  <Popover.Trigger>Open</Popover.Trigger>
  <Popover.Content>
    <Popover.Arrow />
    Content here
  </Popover.Content>
</Popover.Root>
```

**Benefits:**
- Type safety through TypeScript namespaces
- Explicit relationships
- Flexible composition

### 4. Expose CSS Custom Properties ⭐⭐

**Recommendation:** Expose positioning and sizing data via CSS variables.

**Variables to Include:**
```css
--cds-popover-available-width
--cds-popover-available-height
--cds-popover-anchor-width
--cds-popover-anchor-height
--cds-popover-transform-origin
```

**Use Cases:**
- Enable `width="target"` to match trigger width
- Constrain content height to viewport
- Animate from correct transform origin

### 5. Implement Safe Polygon for Hover ⭐⭐⭐

**Recommendation:** Implement grace area algorithm for hover-based menus.

**Why Critical:**
- Users expect to be able to move cursor to submenus without closing
- Prevents frustrating UX where menus close accidentally
- Industry standard in Radix and Base UI

**Algorithm:**
- Create polygon from cursor exit point to target submenu
- Use point-in-polygon test with ray casting
- Consider cursor velocity for intent detection

### 6. Modal and Non-Modal Modes ⭐⭐

**Recommendation:** Explicitly support both modal and non-modal floating elements.

**API Design:**
```tsx
<Popover modal="trap-focus">  {/* Modal with focus trap */}
<Popover modal={false}>       {/* Non-modal, can interact outside */}
<Tooltip>                     {/* Always non-modal */}
```

**Modal Features:**
- Focus trapping with FocusTrap component
- Optional backdrop (visible or invisible)
- aria-hidden on siblings
- Prevent background scroll

### 7. Layered Primitive Architecture ⭐

**Recommendation:** Follow Radix's pattern of composable primitives.

**Primitives Needed:**
- **Positioning** - Floating UI wrapper
- **Portal** - Render in document body
- **DismissableLayer** - Outside click/escape handling
- **FocusScope** - Focus trapping
- **Presence** - Animation-aware mounting

**Benefits:**
- Each primitive has single responsibility
- Can be composed for different use cases
- Easier to test and maintain

### 8. Platform-Specific Implementations ⭐⭐⭐

**Recommendation:** Separate web and mobile implementations sharing common logic.

**Structure:**
```
packages/common/
  src/floating/
    types.ts          # Shared types
    store.ts          # State management
    interactions.ts   # Platform-agnostic logic

packages/web/
  src/floating/
    positioning.ts    # Floating UI integration
    Popover.tsx       # Web implementation

packages/mobile/
  src/floating/
    positioning.ts    # React Native positioning
    Popover.tsx       # Mobile implementation
```

**Rationale:**
- React Native doesn't have DOM, needs different positioning
- Mobile requires different touch interactions
- Can share state management and accessibility logic

### 9. Accessibility by Default ⭐⭐⭐

**Recommendation:** Make keyboard accessibility and ARIA attributes enabled by default.

**Requirements:**
- Focus trapping for modal popovers
- Keyboard navigation (Arrow keys, Home, End, Escape)
- Type-ahead search for menus
- Proper ARIA roles and attributes
- Focus return on close

**Anti-pattern:** Requiring opt-in for accessibility (looking at you, Ant Design).

### 10. Z-Index Management System ⭐⭐

**Recommendation:** Implement context-based z-index management like Ant Design.

**System Design:**
```typescript
const [zIndex, contextZIndex] = useZIndex('Popover', props.zIndex);

return (
  <ZIndexContext.Provider value={contextZIndex}>
    <FloatingElement style={{ zIndex }}>
      {children}
    </FloatingElement>
  </ZIndexContext.Provider>
);
```

**Benefits:**
- Prevents z-index conflicts
- Nested popovers automatically stack correctly
- Can override when needed

---

## Implementation Priorities

### Phase 1: Foundation (Must-Have)
1. ✅ Integrate Floating UI for positioning
2. ✅ Implement compound component pattern
3. ✅ Build basic interaction hooks (hover, click, focus, dismiss)
4. ✅ Add ARIA attributes and keyboard support
5. ✅ Implement Portal rendering

### Phase 2: Core Features (Should-Have)
6. ✅ Add modal/non-modal modes
7. ✅ Implement focus trapping
8. ✅ Build safe polygon for hover menus
9. ✅ Add CSS custom properties
10. ✅ Create DismissableLayer primitive

### Phase 3: Polish (Nice-to-Have)
11. ⚠️ Animation/transition support
12. ⚠️ Z-index management system
13. ⚠️ Delay groups for tooltips
14. ⚠️ Virtual element support
15. ⚠️ Multi-trigger support

### Phase 4: Platform-Specific (Future)
16. 🔄 React Native positioning implementation
17. 🔄 Platform-specific touch handling
18. 🔄 Mobile-optimized interactions

---

## Architectural Decision: Which Model to Follow?

### Option A: Radix-Inspired Primitives ⭐⭐⭐

**Model:** Composable primitives with Floating UI positioning

**Pros:**
- Smallest bundle size
- Maximum flexibility
- Clean separation of concerns
- Industry-proven architecture

**Cons:**
- More verbose API
- Steeper learning curve
- Need to build animation system

**Best for:** Headless/unstyled components, maximum customization

### Option B: Mantine-Inspired Foundation ⭐⭐

**Model:** Popover base component with specialized wrappers

**Pros:**
- Unified API surface
- Easier to use
- Built-in styling/theming integration

**Cons:**
- Larger bundle (includes full Floating UI React)
- Less flexible composition
- More opinionated

**Best for:** Complete design system with theming

### Option C: Hybrid Approach (Recommended) ⭐⭐⭐

**Model:** Base UI's approach - Floating UI positioning + custom interactions

**Pros:**
- Balance of bundle size and features
- Full control over interactions
- Can optimize for CDS patterns
- Enables platform-specific implementations

**Cons:**
- Maintenance of interaction layer
- More initial implementation work

**Implementation:**
```typescript
// Use Floating UI for positioning only
import { useFloating } from '@floating-ui/react-dom';

// Build custom interaction hooks
export function usePopoverInteractions() {
  const hover = usePopoverHover();
  const click = usePopoverClick();
  const dismiss = usePopoverDismiss();
  const focus = usePopoverFocus();

  return mergeInteractions([hover, click, dismiss, focus]);
}
```

---

## Technical Specifications

### Recommended Middleware Stack

```typescript
const middleware = [
  offset(8),                    // Gap between trigger and content
  flip(),                       // Flip to opposite side on collision
  shift({ padding: 8 }),        // Shift along axis to stay in viewport
  size({                        // Constrain size and expose CSS vars
    apply({ availableWidth, availableHeight, elements }) {
      Object.assign(elements.floating.style, {
        '--cds-popover-available-width': `${availableWidth}px`,
        '--cds-popover-available-height': `${availableHeight}px`,
      });
    },
  }),
  arrow({ element: arrowRef }), // Position arrow element
  hide(),                       // Detect when reference is hidden
];
```

### Recommended Component Structure

```
Popover/
  ├── Root.tsx                 # Context provider, state management
  ├── Trigger.tsx              # Reference element
  ├── Content.tsx              # Floating element
  ├── Arrow.tsx                # Optional arrow
  ├── Portal.tsx               # Portal wrapper
  ├── hooks/
  │   ├── usePopover.ts        # Main hook
  │   ├── usePopoverHover.ts   # Hover interaction
  │   ├── usePopoverClick.ts   # Click interaction
  │   ├── usePopoverDismiss.ts # Outside click/escape
  │   └── usePopoverFocus.ts   # Focus interaction
  ├── primitives/
  │   ├── DismissableLayer.tsx # Outside interaction handling
  │   ├── FocusTrap.tsx        # Focus management
  │   └── Presence.tsx         # Animation support
  └── utils/
      ├── safePolygon.ts       # Grace area algorithm
      └── positioning.ts       # Floating UI wrapper
```

---

## Conclusion

The component library landscape shows clear convergence on **Floating UI** for positioning, **compound components** for API design, and **built-in accessibility** as table stakes. The choice between following Radix's minimalist primitives approach or Mantine's integrated foundation depends on CDS's philosophy, but a **hybrid approach** borrowing from Base UI offers the best balance of bundle size, flexibility, and control.

**Critical Success Factors:**
1. Use Floating UI for positioning (industry standard)
2. Implement safe polygon for hover menus (UX essential)
3. Make accessibility default, not opt-in (ethical imperative)
4. Plan for React Native from the start (platform strategy)
5. Keep bundle size minimal (performance priority)

**Next Steps:**
1. Decide on architectural approach (Radix-like vs Mantine-like vs Hybrid)
2. Prototype basic Popover with Floating UI integration
3. Implement core interaction hooks
4. Build accessibility features (focus trap, keyboard nav)
5. Add safe polygon for hover behavior
6. Create animation/transition system
7. Develop React Native positioning strategy

---

## Additional Resources

### Documentation
- [Floating UI Documentation](https://floating-ui.com/)
- [Radix Primitives Architecture](https://www.radix-ui.com/primitives/docs/overview/introduction)
- [Base UI Documentation](https://base-ui.com/)
- [Material UI Popover API](https://mui.com/material-ui/react-popover/)
- [Mantine Popover Hooks](https://mantine.dev/core/popover/)
- [Ant Design Component Overview](https://ant.design/components/overview)

### Source Code Repositories
- [Radix Primitives - Popper](https://github.com/radix-ui/primitives/tree/main/packages/react/popper)
- [Base UI - Popover](https://github.com/mui/base-ui/tree/master/packages/react/src/popover)
- [Mantine - Floating Components](https://github.com/mantinedev/mantine/tree/master/packages/@mantine/core/src/components/Popover)
- [Material UI - Popover](https://github.com/mui/material-ui/tree/master/packages/mui-material/src/Popover)
- [Ant Design - Tooltip/Popover](https://github.com/ant-design/ant-design/tree/master/components/tooltip)

### Community Resources
- [WAI-ARIA Authoring Practices - Tooltips](https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/)
- [WAI-ARIA Authoring Practices - Menus](https://www.w3.org/WAI/ARIA/apg/patterns/menubar/)
- [Point in Polygon Algorithm](https://en.wikipedia.org/wiki/Point_in_polygon)
- [Convex Hull Algorithm](https://en.wikipedia.org/wiki/Convex_hull_algorithms)
