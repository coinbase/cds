# Material UI: Popover and Floating Menu Components

## Executive Summary

Material UI implements popover and floating elements through a layered architecture where **Popover** uses custom positioning logic built on top of the Modal component for modal-style overlays, while **Tooltip** and similar components leverage **Popper.js** (`@popperjs/core`) for lightweight, non-modal floating elements. This dual approach provides flexibility: Popover offers focus trapping and backdrop support, while Popper-based components offer efficient positioning without modal semantics.

## Overview

Material UI provides several floating element components:
- **Popover**: Modal-based floating container with backdrop support
- **Menu**: Built on top of Popover with keyboard navigation
- **Tooltip**: Uses Popper for lightweight positioning
- **Popper**: Low-level wrapper around Popper.js

Each serves different use cases with varying levels of modal behavior and accessibility features.

## Key Findings

### 1. Two Positioning Strategies

Material UI uses **two distinct positioning approaches**:

#### A. Custom Positioning (Popover)

The Popover component implements its own positioning algorithm without relying on Popper.js:

```javascript
// packages/mui-material/src/Popover/Popover.js

const getPositioningStyle = React.useCallback(
  (element) => {
    const elemRect = {
      width: element.offsetWidth,
      height: element.offsetHeight,
    };

    // Get the transform origin point on the element itself
    const elemTransformOrigin = getTransformOrigin(elemRect);

    // Get the offset of the anchoring element
    const anchorOffset = getAnchorOffset();

    // Calculate element positioning
    let top = anchorOffset.top - elemTransformOrigin.vertical;
    let left = anchorOffset.left - elemTransformOrigin.horizontal;

    // Apply margin constraints to keep within viewport
    // ...
  },
  [anchorEl, anchorReference, getAnchorOffset, getTransformOrigin, marginThreshold]
);
```

This approach calculates position using:
- `anchorOrigin`: Where on the anchor element to attach
- `transformOrigin`: Where on the popover to attach
- `marginThreshold`: Minimum distance from viewport edges

#### B. Popper.js Integration (Tooltip, Popper)

For Tooltip and the Popper component, Material UI wraps `@popperjs/core`:

```typescript
// packages/mui-material/src/Popper/BasePopper.tsx

import { createPopper, Instance, Modifier, Placement, State, VirtualElement } from '@popperjs/core';

// Inside the component:
const popper = createPopper(resolvedAnchorElement, tooltipRef.current!, {
  placement: rtlPlacement,
  ...popperOptions,
  modifiers: popperModifiers,
});
```

### 2. Third-Party Dependencies

From `package.json`:

```json
{
  "dependencies": {
    "@popperjs/core": "^2.11.8",
    "react-transition-group": "^4.4.5"
  }
}
```

**Key external dependencies for floating elements:**
- **@popperjs/core**: Positioning engine for Popper/Tooltip
- **react-transition-group**: Animation support for enter/exit transitions

### 3. Component Composition Hierarchy

```
Tooltip
  |-- Popper (styled)
        |-- Portal
              |-- PopperTooltip
                    |-- @popperjs/core (createPopper)

Menu
  |-- Popover
        |-- Modal
              |-- Portal
              |-- FocusTrap
              |-- Backdrop
        |-- Grow (transition)
        |-- Paper
  |-- MenuList (keyboard navigation)
```

### 4. Modal vs Non-Modal Architecture

#### Modal-based (Popover, Menu)

The Popover extends Modal which provides:

```javascript
// packages/mui-material/src/Modal/Modal.js

<Portal ref={portalRef} container={container} disablePortal={disablePortal}>
  <RootSlot {...rootProps}>
    {!hideBackdrop && BackdropComponent ? <BackdropSlot {...backdropProps} /> : null}
    <FocusTrap
      disableEnforceFocus={disableEnforceFocus}
      disableAutoFocus={disableAutoFocus}
      disableRestoreFocus={disableRestoreFocus}
      isEnabled={isTopModal}
      open={open}
    >
      {React.cloneElement(children, childProps)}
    </FocusTrap>
  </RootSlot>
</Portal>
```

Features:
- **Portal**: Renders content at document.body level
- **FocusTrap**: Keeps focus within the modal
- **Backdrop**: Click-away support with visible or invisible backdrop
- **ModalManager**: Singleton that tracks open modals for stacking

#### Non-Modal (Tooltip)

```javascript
// packages/mui-material/src/Tooltip/Tooltip.js

<PopperSlot
  as={PopperComponentProp ?? Popper}
  placement={placement}
  anchorEl={followCursor ? virtualElement : childNode}
  popperRef={popperRef}
  open={childNode ? open : false}
  id={id}
  transition
  {...interactiveWrapperListeners}
>
```

Features:
- No focus trapping
- No backdrop
- Lightweight positioning only
- Supports virtual elements for cursor following

### 5. Focus Management

#### FocusTrap Implementation

```typescript
// packages/mui-material/src/Unstable_TrapFocus/FocusTrap.tsx

const candidatesSelector = [
  'input', 'select', 'textarea', 'a[href]', 'button',
  '[tabindex]', 'audio[controls]', 'video[controls]',
  '[contenteditable]:not([contenteditable="false"])',
].join(',');

function defaultGetTabbable(root: HTMLElement): HTMLElement[] {
  // Finds and orders all tabbable elements
  // Returns them sorted by tabIndex, then document order
}
```

The FocusTrap uses sentinel elements (invisible divs with tabIndex) at the start and end to loop focus:

```jsx
<div tabIndex={open ? 0 : -1} ref={sentinelStart} />
{React.cloneElement(children, { ref: handleRef, onFocus })}
<div tabIndex={open ? 0 : -1} ref={sentinelEnd} />
```

#### ModalManager for Stacking

```typescript
// packages/mui-material/src/Modal/ModalManager.ts

export class ModalManager {
  private containers: Container[];
  private modals: Modal[];

  isTopModal(modal: Modal): boolean {
    return this.modals.length > 0 && this.modals[this.modals.length - 1] === modal;
  }
}
```

This singleton manages:
- Scroll locking on body
- aria-hidden on sibling elements
- Modal stacking order
- Restoration of styles on close

### 6. Accessibility Implementation

#### Popover Accessibility

```typescript
// useModal.ts
const getRootProps = () => ({
  role: 'presentation',  // Container role
  onKeyDown: createHandleKeyDown(externalEventHandlers),
  ref: handleRef,
});

const getBackdropProps = () => ({
  'aria-hidden': true,  // Backdrop is decorative
  onClick: createHandleBackdropClick(externalEventHandlers),
  open,
});
```

#### Tooltip Accessibility

```javascript
// packages/mui-material/src/Tooltip/Tooltip.js

const nameOrDescProps = {};
if (describeChild) {
  nameOrDescProps.title = !open && titleIsString ? title : null;
  nameOrDescProps['aria-describedby'] = open ? id : null;
} else {
  nameOrDescProps['aria-label'] = titleIsString ? title : null;
  nameOrDescProps['aria-labelledby'] = open && !titleIsString ? id : null;
}
```

#### MenuList Keyboard Navigation

```javascript
// packages/mui-material/src/MenuList/MenuList.js

const handleKeyDown = (event) => {
  const key = event.key;

  if (key === 'ArrowDown') {
    event.preventDefault();
    moveFocus(list, currentFocus, disableListWrap, disabledItemsFocusable, nextItem);
  } else if (key === 'ArrowUp') {
    event.preventDefault();
    moveFocus(list, currentFocus, disableListWrap, disabledItemsFocusable, previousItem);
  } else if (key === 'Home') {
    moveFocus(list, null, disableListWrap, disabledItemsFocusable, nextItem);
  } else if (key === 'End') {
    moveFocus(list, null, disableListWrap, disabledItemsFocusable, previousItem);
  } else if (key.length === 1) {
    // Type-ahead search
  }
};
```

### 7. Positioning API Design

#### Popover Origin-Based Positioning

```typescript
// packages/mui-material/src/Popover/Popover.d.ts

export interface PopoverOrigin {
  vertical: 'top' | 'center' | 'bottom' | number;
  horizontal: 'left' | 'center' | 'right' | number;
}

export interface PopoverProps {
  anchorEl?: Element | (() => Element);
  anchorOrigin?: PopoverOrigin;      // Point on anchor
  transformOrigin?: PopoverOrigin;   // Point on popover
  anchorPosition?: { top: number; left: number };
  anchorReference?: 'anchorEl' | 'anchorPosition' | 'none';
}
```

This allows precise control like:
```jsx
<Popover
  anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
  transformOrigin={{ vertical: 'top', horizontal: 'center' }}
/>
```

#### Popper Placement-Based Positioning

```typescript
// packages/mui-material/src/Popper/BasePopper.types.ts

placement?: 'auto' | 'auto-start' | 'auto-end' |
  'top' | 'top-start' | 'top-end' |
  'bottom' | 'bottom-start' | 'bottom-end' |
  'left' | 'left-start' | 'left-end' |
  'right' | 'right-start' | 'right-end';

modifiers?: Modifier<any, any>[];  // Popper.js modifiers
popperOptions?: Partial<Options>;   // Full Popper.js options
```

### 8. RTL (Right-to-Left) Support

Both positioning systems handle RTL:

```javascript
// BasePopper.tsx
function flipPlacement(placement, direction) {
  if (direction === 'ltr') return placement;

  switch (placement) {
    case 'bottom-end': return 'bottom-start';
    case 'bottom-start': return 'bottom-end';
    case 'top-end': return 'top-start';
    case 'top-start': return 'top-end';
    default: return placement;
  }
}

// Menu.js
const RTL_ORIGIN = { vertical: 'top', horizontal: 'right' };
const LTR_ORIGIN = { vertical: 'top', horizontal: 'left' };
```

### 9. Transition Integration

Both systems integrate with react-transition-group:

```jsx
// Popover.js
<TransitionSlot {...transitionSlotProps} timeout={transitionDuration}>
  <PaperSlot {...paperProps}>{children}</PaperSlot>
</TransitionSlot>

// Tooltip.js
<TransitionSlot timeout={theme.transitions.duration.shorter} {...TransitionPropsInner}>
  <TooltipSlot>
    {title}
    {arrow ? <ArrowSlot /> : null}
  </TooltipSlot>
</TransitionSlot>
```

### 10. Slot Architecture

Material UI uses a consistent slot pattern for customization:

```typescript
export interface PopoverSlots {
  root: React.ElementType;       // Modal wrapper
  paper: React.ElementType;      // Content container
  transition: React.ElementType; // Animation wrapper
  backdrop: React.ElementType;   // Background overlay
}

// Usage
<Popover
  slots={{ paper: CustomPaper }}
  slotProps={{ paper: { elevation: 12 } }}
/>
```

## Technical Implementation Details

### Scroll Lock Implementation

```typescript
// ModalManager.ts
function handleContainer(containerInfo, props) {
  const restoreStyle = [];

  if (!props.disableScrollLock) {
    if (isOverflowing(container)) {
      const scrollbarSize = getScrollbarSize(ownerWindow(container));

      // Add padding to compensate for hidden scrollbar
      restoreStyle.push({
        value: container.style.paddingRight,
        property: 'padding-right',
        el: container,
      });
      container.style.paddingRight = `${getPaddingRight(container) + scrollbarSize}px`;
    }

    scrollContainer.style.overflow = 'hidden';
  }

  return () => {
    restoreStyle.forEach(({ value, el, property }) => {
      if (value) el.style.setProperty(property, value);
      else el.style.removeProperty(property);
    });
  };
}
```

### Virtual Element Support

Both Popover and Popper support virtual anchor elements:

```typescript
// Popover supports custom getBoundingClientRect
interface PopoverVirtualElement {
  getBoundingClientRect: () => DOMRect;
  nodeType: Node['ELEMENT_NODE'];
}

// Tooltip uses virtual elements for cursor following
anchorEl={
  followCursor
    ? {
        getBoundingClientRect: () => ({
          top: cursorPosition.y,
          left: cursorPosition.x,
          right: cursorPosition.x,
          bottom: cursorPosition.y,
          width: 0,
          height: 0,
        }),
      }
    : childNode
}
```

### Imperative Handle for Position Updates

```javascript
// Popover.js
React.useImperativeHandle(
  action,
  () =>
    open
      ? {
          updatePosition: () => {
            setPositioningStyles();
          },
        }
      : null,
  [open, setPositioningStyles],
);

// Usage
const popoverActions = useRef();
<Popover action={popoverActions} />
// Later: popoverActions.current.updatePosition()
```

## Code Examples

### Basic Menu Usage

```jsx
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

function BasicMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  return (
    <>
      <Button onClick={(e) => setAnchorEl(e.currentTarget)}>
        Open Menu
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem onClick={() => setAnchorEl(null)}>Profile</MenuItem>
        <MenuItem onClick={() => setAnchorEl(null)}>Settings</MenuItem>
      </Menu>
    </>
  );
}
```

### Popover with Custom Positioning

```jsx
import Popover from '@mui/material/Popover';

function PositionedPopover() {
  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      marginThreshold={16}
    >
      <Box sx={{ p: 2 }}>Popover content</Box>
    </Popover>
  );
}
```

### Interactive Tooltip

```jsx
import Tooltip from '@mui/material/Tooltip';

function InteractiveTooltip() {
  return (
    <Tooltip
      title="Interactive tooltip content"
      placement="right"
      arrow
      disableInteractive={false}
      enterDelay={100}
      leaveDelay={200}
      slotProps={{
        popper: {
          modifiers: [{
            name: 'offset',
            options: { offset: [0, 8] },
          }],
        },
      }}
    >
      <Button>Hover me</Button>
    </Tooltip>
  );
}
```

## Strengths

- **Separation of concerns**: Modal-based components (Popover/Menu) vs lightweight positioning (Tooltip/Popper) serve different needs appropriately
- **Comprehensive accessibility**: Built-in focus management, keyboard navigation, and ARIA attributes
- **Flexible positioning API**: Origin-based (Popover) and placement-based (Popper) options
- **Extensive customization**: Slot architecture allows replacing any internal component
- **RTL support**: First-class right-to-left language support
- **Virtual element support**: Enables cursor-following and custom anchor scenarios
- **Stacking management**: ModalManager handles multiple overlapping modals correctly

## Considerations & Trade-offs

- **Two positioning systems**: Having both custom positioning (Popover) and Popper.js adds complexity and potential inconsistency
- **Bundle size**: Popper.js dependency adds ~3KB gzipped
- **Popover limitations**: Custom positioning lacks Popper.js features like automatic flipping and collision detection (uses marginThreshold instead)
- **Focus trap complexity**: The FocusTrap implementation uses intervals and event listeners that may impact performance with many modals
- **Legacy API deprecation**: Transitioning from component props (TransitionComponent) to slot pattern creates migration burden

## Relevance to CDS

Several patterns from Material UI could inform CDS development:

1. **Dual positioning strategy**: Consider whether CDS needs both modal-based (with focus trapping) and non-modal floating elements
2. **Slot architecture**: The slots/slotProps pattern provides excellent customization without prop explosion
3. **ModalManager pattern**: A singleton for managing modal stacking, scroll locking, and aria-hidden siblings
4. **Origin-based positioning**: The anchorOrigin/transformOrigin API is intuitive for developers
5. **FocusTrap with sentinels**: Using invisible tab-focusable divs to loop focus is an effective pattern
6. **Virtual element support**: Enabling custom anchor positioning through getBoundingClientRect interface

## References

- Source: `/Users/erichkuerschner/workspace/cds-public/.claude/research/cache/material-ui/packages/mui-material/src/Popover/Popover.js`
- Source: `/Users/erichkuerschner/workspace/cds-public/.claude/research/cache/material-ui/packages/mui-material/src/Popper/BasePopper.tsx`
- Source: `/Users/erichkuerschner/workspace/cds-public/.claude/research/cache/material-ui/packages/mui-material/src/Menu/Menu.js`
- Source: `/Users/erichkuerschner/workspace/cds-public/.claude/research/cache/material-ui/packages/mui-material/src/Tooltip/Tooltip.js`
- Source: `/Users/erichkuerschner/workspace/cds-public/.claude/research/cache/material-ui/packages/mui-material/src/Modal/Modal.js`
- Source: `/Users/erichkuerschner/workspace/cds-public/.claude/research/cache/material-ui/packages/mui-material/src/Modal/ModalManager.ts`
- Source: `/Users/erichkuerschner/workspace/cds-public/.claude/research/cache/material-ui/packages/mui-material/src/Unstable_TrapFocus/FocusTrap.tsx`
- Source: `/Users/erichkuerschner/workspace/cds-public/.claude/research/cache/material-ui/packages/mui-material/src/MenuList/MenuList.js`
- Documentation: https://mui.com/material-ui/react-popover/
- Documentation: https://mui.com/material-ui/react-menu/
- Documentation: https://mui.com/material-ui/react-tooltip/
- Popper.js: https://popper.js.org/docs/v2/
