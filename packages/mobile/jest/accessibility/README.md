# Custom Accessibility Engine

This folder contains a custom accessibility testing engine for React Native components, replacing the unmaintained [`react-native-accessibility-engine`](https://github.com/aryella-lacerda/react-native-accessibility-engine) library.

## Background

The original `react-native-accessibility-engine` library provided a `toBeAccessible()` Jest matcher for testing React Native component accessibility. However, the library became incompatible with React 19 due to:

1. **Deprecated dependency**: The library depends on `react-test-renderer`, which is deprecated in React 19
2. **Initialization issue**: The library calls `react-test-renderer.create()` at module load time without wrapping it in `act()`, causing test failures in React 19's stricter environment
3. **Unmaintained**: The library has not been updated to address these compatibility issues

Rather than waiting for an upstream fix, we implemented our own accessibility engine that:

- Works directly with `@testing-library/react-native` test instances
- Derives types from RNTL exports instead of importing from `react-test-renderer`
- Maintains the same API (`toBeAccessible()` matcher)
- Implements all 10 original accessibility rules

## Implementation

The engine checks components against these accessibility rules:

| Rule ID                         | Description                                                  |
| ------------------------------- | ------------------------------------------------------------ |
| `pressable-role-required`       | Pressable components must have an accessibility role         |
| `pressable-accessible-required` | Pressable components must not have `accessible={false}`      |
| `pressable-label-required`      | Pressable components must have a label or text content       |
| `disabled-state-required`       | Disableable components must expose disabled state            |
| `checked-state-required`        | Checkbox components must have a checked state                |
| `adjustable-role-required`      | Slider components must have `accessibilityRole="adjustable"` |
| `adjustable-value-required`     | Slider components must have min/max/now values               |
| `link-role-required`            | Clickable text must have `accessibilityRole="link"`          |
| `link-role-misused`             | Non-clickable text should not have link role                 |
| `no-empty-text`                 | Text components must have content                            |

## Intentional Difference from Original Library

Our implementation includes one intentional improvement over the original library:

**Extended allowed roles for pressable components**

The original library's `pressable-role-required` rule only allowed these roles:

```
['button', 'link', 'imagebutton', 'radio', 'tab']
```

Our implementation adds `checkbox` and `switch`:

```
['button', 'link', 'imagebutton', 'radio', 'tab', 'checkbox', 'switch']
```

**Why this change?**

The original library's exclusion of `checkbox` appears to be an oversight. The library includes a separate `checked-state-required` rule that specifically targets components with `accessibilityRole="checkbox"`, implying that checkbox is a valid role for pressables. Without `checkbox` in the allowed roles list, a properly implemented checkbox would fail the `pressable-role-required` rule before the `checked-state-required` rule could validate its checked state.

Similarly, `switch` is a valid React Native accessibility role that semantically represents a toggle control and should be allowed on pressable components.

## File Structure

```
accessibility/
├── README.md          # This file
├── types.ts           # Type definitions derived from RNTL
├── helpers.ts         # Component type checking utilities
├── rules.ts           # Accessibility rule definitions
├── engine.ts          # Core accessibility checking logic
├── matchers.ts        # Jest matcher implementation
├── index.ts           # Module exports and Jest setup
└── __tests__/
    └── rules.test.tsx # Rule validation tests
```

## Usage

The matcher is automatically registered when Jest loads. Use it in tests like:

```tsx
import { render, screen } from '@testing-library/react-native';

it('is accessible', () => {
  render(<MyComponent testID="test" />);
  expect(screen.getByTestId('test')).toBeAccessible();
});
```

### Options

```tsx
// Check only specific rules
expect(element).toBeAccessible({
  rules: ['pressable-role-required', 'pressable-label-required'],
});

// Filter violations before assertion
expect(element).toBeAccessible({
  customViolationHandler: (violations) =>
    violations.filter((v) => !v.problem.includes('some expected issue')),
});
```
