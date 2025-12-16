# Material UI: Button Accessibility

## Executive Summary

Material UI implements a comprehensive accessibility strategy for its Button component through a foundational `ButtonBase` component that handles semantic HTML, ARIA attributes, keyboard navigation, and focus management. The library follows the WAI-ARIA Button Pattern and provides robust support for screen readers, keyboard users, and custom interactive elements.

## Overview

Material UI's button accessibility architecture centers on `ButtonBase`, a lower-level component that all button variants (Button, IconButton, ToggleButton, ListItemButton, etc.) extend. This approach ensures consistent accessibility behavior across the entire button family while allowing each variant to add specialized functionality.

## Key Findings

### 1. Component Architecture

The button components follow a layered architecture:

```
ButtonBase (core accessibility + interactions)
    |
    +-- Button (standard button with variants)
    +-- IconButton (icon-only button)
    +-- ToggleButton (toggle/pressed state button)
    +-- ListItemButton (list interaction)
    +-- Other button variants...
```

**Source**: `/packages/mui-material/src/ButtonBase/ButtonBase.js`

### 2. Semantic HTML and ARIA Attributes

#### Native Button Elements

When using the default `<button>` element, ButtonBase:
- Sets `type="button"` by default to prevent unintended form submission
- Uses the native `disabled` attribute rather than `aria-disabled`
- Does not add redundant `role="button"` since native buttons have implicit role

```javascript
// From ButtonBase.js
if (ComponentProp === 'button') {
  const hasFormAttributes = !!other.formAction;
  buttonProps.type = type === undefined && !hasFormAttributes ? 'button' : type;
  buttonProps.disabled = disabled;
}
```

#### Non-Native Button Elements

When rendering as non-button elements (span, div, custom components):

```javascript
// From ButtonBase.js
if (!other.href && !other.to) {
  buttonProps.role = 'button';
}
if (disabled) {
  buttonProps['aria-disabled'] = disabled;
}
```

Key behaviors:
- Adds `role="button"` for non-native elements without href
- Uses `aria-disabled` instead of native `disabled` for non-button elements
- Does NOT add role when element has `href` or `to` (it's a link)

#### ToggleButton Accessibility

ToggleButton adds `aria-pressed` for toggle state:

```javascript
// From ToggleButton.js
<ToggleButtonRoot
  aria-pressed={selected}
  // ...
>
```

### 3. Keyboard Navigation and Focus Management

#### Focus Visible Detection

Material UI implements sophisticated focus-visible detection through two utilities:

**`isFocusVisible`** - Simple check using CSS `:focus-visible`:

```typescript
// From packages/mui-utils/src/isFocusVisible/isFocusVisible.ts
export default function isFocusVisible(element: Element): boolean {
  try {
    return element.matches(':focus-visible');
  } catch (error) {
    // Fallback for browsers without :focus-visible support
  }
  return false;
}
```

**`useIsFocusVisible`** hook - Full polyfill with keyboard/pointer detection:

```typescript
// From packages/mui-utils/src/useIsFocusVisible/useIsFocusVisible.ts
// Tracks keyboard modality state
let hadKeyboardEvent = true;

function handleKeyDown(event: KeyboardEvent) {
  if (event.metaKey || event.altKey || event.ctrlKey) {
    return;
  }
  hadKeyboardEvent = true;
}

function handlePointerDown() {
  hadKeyboardEvent = false;
}
```

The hook distinguishes between:
- Keyboard focus (Tab key) - shows focus ring
- Pointer focus (mouse/touch) - no focus ring
- Input elements that always show focus (text fields, etc.)

#### Keyboard Event Handling

ButtonBase handles keyboard interactions for non-native button elements:

```javascript
// From ButtonBase.js
const handleKeyDown = useEventCallback((event) => {
  // Keyboard accessibility for non interactive elements
  if (
    event.target === event.currentTarget &&
    isNonNativeButton() &&
    event.key === 'Enter' &&
    !disabled
  ) {
    event.preventDefault();
    if (onClick) {
      onClick(event);
    }
  }
});

const handleKeyUp = useEventCallback((event) => {
  // Keyboard accessibility for non interactive elements
  if (
    onClick &&
    event.target === event.currentTarget &&
    isNonNativeButton() &&
    event.key === ' ' &&
    !event.defaultPrevented
  ) {
    onClick(event);
  }
});
```

Key behaviors:
- **Enter key**: Triggers click on keydown (for non-native buttons)
- **Space key**: Triggers click on keyup (matches native button behavior)
- Only triggers on the button itself (not bubbled events from children)
- Respects `disabled` state

#### TabIndex Management

```javascript
// From ButtonBase.js
tabIndex={disabled ? -1 : tabIndex}
```

Disabled buttons receive `tabIndex: -1` to remove them from the tab order.

### 4. Focus Ripple System

Material UI provides visual focus feedback through its ripple system:

```javascript
// From ButtonBase.js
React.useEffect(() => {
  if (focusVisible && focusRipple && !disableRipple) {
    ripple.pulsate();
  }
}, [disableRipple, focusRipple, focusVisible, ripple]);
```

The `focusVisible` state is tracked and triggers:
- A pulsating ripple effect for keyboard focus
- Application of `.Mui-focusVisible` class for custom styling

**Warning in documentation**:
> Without a ripple there is no styling for :focus-visible by default. Be sure to highlight the element by applying separate styles with the `.Mui-focusVisible` class.

### 5. Programmatic Focus Control

ButtonBase exposes an imperative handle for programmatic focus management:

```javascript
// From ButtonBase.js
React.useImperativeHandle(
  action,
  () => ({
    focusVisible: () => {
      setFocusVisible(true);
      buttonRef.current.focus();
    },
  }),
  [],
);
```

Usage:
```jsx
const buttonRef = React.useRef(null);

// Later...
buttonRef.current.focusVisible(); // Focus with visible ring
```

### 6. Loading State Accessibility

When buttons are in a loading state, Material UI ensures accessibility:

```javascript
// From Button.js
const loadingIndicator = loadingIndicatorProp ?? (
  <CircularProgress aria-labelledby={loadingId} color="inherit" size={16} />
);

// The button gets an ID that the progress indicator references
<ButtonRoot
  id={loading ? loadingId : idProp}
  disabled={disabled || loading}
  // ...
>
```

The loading indicator:
- Is labeled by the button text via `aria-labelledby`
- Button is disabled during loading
- Contains an element with `role="progressbar"`

### 7. Link/Button Hybrid Handling

ButtonBase intelligently handles buttons that can become links:

```javascript
// From ButtonBase.js
let ComponentProp = component;

if (ComponentProp === 'button' && (other.href || other.to)) {
  ComponentProp = LinkComponent;
}
```

When `href` is provided:
- Automatically renders as `<a>` element
- Does not add `role="button"` (links have their own semantics)
- Does not add `type` attribute (not valid on anchors)

## Technical Implementation Details

### Focus Visible State Machine

The focus-visible detection follows a state machine based on the WICG focus-visible polyfill:

1. **Initial state**: `hadKeyboardEvent = true`
2. **On keydown** (non-modifier): `hadKeyboardEvent = true`
3. **On mousedown/pointerdown/touchstart**: `hadKeyboardEvent = false`
4. **On focus event**: Check `:focus-visible` or use `hadKeyboardEvent` fallback
5. **On blur**: Track `hadFocusVisibleRecently` for tab switching

### CSS Reset for Accessibility

ButtonBase includes CSS reset styles that preserve accessibility:

```javascript
// From ButtonBase.js
const ButtonBaseRoot = styled('button')({
  // We disable the focus ring for mouse, touch and keyboard users.
  outline: 0,
  // But provide focus styling through .Mui-focusVisible class

  // Remove Firefox dotted outline
  '&::-moz-focus-inner': {
    borderStyle: 'none',
  },

  // Disable pointer events on disabled buttons
  [`&.${buttonBaseClasses.disabled}`]: {
    pointerEvents: 'none',
    cursor: 'default',
  },
});
```

### Test Coverage for Accessibility

The test suite includes specific accessibility tests:

```javascript
// From ButtonBase.test.js
it('should change the button component and add accessibility requirements', () => {
  render(<ButtonBase component="span" role="checkbox" aria-checked={false} />);
  const checkbox = screen.getByRole('checkbox');
  expect(checkbox).to.have.property('nodeName', 'SPAN');
  expect(checkbox).attribute('tabIndex').to.equal('0');
});

it('should not use aria-disabled with button host', () => {
  render(<ButtonBase disabled>Hello</ButtonBase>);
  const button = screen.getByRole('button');
  expect(button).to.have.attribute('disabled');
  expect(button).not.to.have.attribute('aria-disabled');
});

it('should use aria-disabled for other components', () => {
  render(<ButtonBase component="span" disabled>Hello</ButtonBase>);
  const button = screen.getByRole('button');
  expect(button).not.to.have.attribute('disabled');
  expect(button).to.have.attribute('aria-disabled', 'true');
});
```

## Code Examples

### Basic Accessible Button

```jsx
import Button from '@mui/material/Button';

// Semantic button with proper accessibility
<Button onClick={handleClick}>
  Click me
</Button>
```

### Icon Button with Label

```jsx
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

// Icon buttons MUST have aria-label
<IconButton aria-label="delete" onClick={handleDelete}>
  <DeleteIcon />
</IconButton>
```

### Toggle Button with Pressed State

```jsx
import ToggleButton from '@mui/material/ToggleButton';

// aria-pressed is automatically managed
<ToggleButton
  value="check"
  selected={selected}
  onChange={() => setSelected(!selected)}
>
  <CheckIcon />
</ToggleButton>
```

### Button with Loading State

```jsx
import Button from '@mui/material/Button';

// Accessible loading state
<Button loading>
  Submit  {/* This text labels the progress indicator */}
</Button>
```

### Custom Component as Button

```jsx
import ButtonBase from '@mui/material/ButtonBase';

// role="button" and keyboard support added automatically
<ButtonBase component="div" onClick={handleClick}>
  Custom interactive element
</ButtonBase>
```

## Strengths

- **Semantic HTML first**: Uses native `<button>` elements by default, only adding ARIA when necessary
- **Comprehensive keyboard support**: Full Enter/Space key handling for non-native elements
- **Focus-visible polyfill**: Sophisticated detection that works across browsers
- **Consistent inheritance**: All button variants share accessibility from ButtonBase
- **Loading state accessibility**: Progress indicators are properly labeled
- **Flexible customization**: Allows custom elements while maintaining accessibility
- **Thorough test coverage**: Extensive accessibility-focused tests

## Considerations & Trade-offs

- **Ripple dependency for focus**: Disabling ripples removes default focus styling (requires manual `.Mui-focusVisible` styles)
- **Pointer-events on disabled**: Uses `pointer-events: none` which prevents tooltips on disabled buttons without workarounds
- **aria-disabled vs disabled**: Different attributes used based on element type, which could be confusing
- **No built-in ARIA live regions**: Loading state changes are not announced via live regions

## Relevance to CDS

Material UI's button accessibility implementation provides several patterns relevant to CDS:

1. **ButtonBase Pattern**: Consider a base component that centralizes accessibility logic for all button variants

2. **Focus-Visible Handling**: The `isFocusVisible` utility and keyboard/pointer modality tracking could be adopted or adapted

3. **ARIA Attribute Strategy**:
   - Use native `disabled` for `<button>` elements
   - Use `aria-disabled` for custom elements
   - Add `role="button"` only when necessary

4. **Keyboard Navigation**: The Enter (keydown) and Space (keyup) handling pattern for non-native elements

5. **Imperative Focus API**: Exposing `focusVisible()` method for programmatic focus management

6. **Loading State Pattern**: Labeling progress indicators with button text via `aria-labelledby`

7. **Test Patterns**: The accessibility-focused test cases could inform CDS testing strategy

## References

- Source Code: `/packages/mui-material/src/ButtonBase/ButtonBase.js`
- Source Code: `/packages/mui-material/src/Button/Button.js`
- Source Code: `/packages/mui-utils/src/isFocusVisible/isFocusVisible.ts`
- Source Code: `/packages/mui-utils/src/useIsFocusVisible/useIsFocusVisible.ts`
- Tests: `/packages/mui-material/src/ButtonBase/ButtonBase.test.js`
- Tests: `/packages/mui-material/src/Button/Button.test.js`
- Documentation: [MUI Button](https://mui.com/material-ui/react-button/)
- WAI-ARIA Pattern: [Button Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/button/)
- WICG Focus-Visible: [focus-visible polyfill](https://github.com/WICG/focus-visible)
