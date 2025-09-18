# safely-spread-props

This ESLint rule prevents spreading props onto React components when those props include properties that don't belong to the component.

## Why Use This Rule

In React applications, it's common to pass props from parent to child components. Sometimes developers use the spread operator to pass all props:

```jsx
<ChildComponent {...props} />
```

While convenient, this pattern can lead to problems:

1. If the parent component composes props from several other components, it can be easy to unknowingly pass props intended for another child onto the target of the spread.
2. It makes the target component's API less explicit and harder to understand

This rule enforces a more explicit approach to prop passing by ensuring that only valid props are spread to components.

## How It Works

This rule uses TypeScript's type system to:

1. Determine the allowed props for a component based on its type definition
2. Check the type of the object being spread onto the component
3. Compare the two to find any props that are being spread but aren't part of the component's interface
4. Report errors when invalid props are detected

## Examples

### ❌ Invalid

```tsx
// Props with extra properties that don't belong to Button
interface PageProps {
  title: string;
  onClose: () => void;
  color: string;
  size: 'small' | 'medium' | 'large';
}

// Button only accepts color and size
interface ButtonProps {
  color: string;
  size: 'small' | 'medium' | 'large';
}

const Button = (props: ButtonProps) => {
  // ...
};

function Page(props: PageProps) {
  // ❌ Error: Spreading props includes properties that don't belong on Button: title, onClose
  return <Button {...props} />;
}
```

### ✅ Valid

```tsx
// Props with extra properties that don't belong to Button
interface PageProps {
  title: string;
  onClose: () => void;
  color: string;
  size: 'small' | 'medium' | 'large';
}

// Button only accepts color and size
interface ButtonProps {
  color: string;
  size: 'small' | 'medium' | 'large';
}

const Button = (props: ButtonProps) => {
  // ...
};

function Page(props: PageProps) {
  // ✅ Valid: Explicitly destructure only the props that Button accepts
  const { color, size } = props;
  return <Button color={color} size={size} />;

  // ✅ Alternative valid approach: Use a typed object
  const buttonProps: ButtonProps = { color: props.color, size: props.size };
  return <Button {...buttonProps} />;
}
```

## Configuration

This rule has no additional configuration options.

## Requirements

This rule requires type information to work correctly. You need to ensure:

1. You're using `@typescript-eslint/parser` as your parser
2. You've enabled type-aware linting by setting `parserOptions.project` or `parserOptions.projectService` in your ESLint configuration

Example configuration:

```js
// eslint.config.js
import { ESLintUtils } from '@typescript-eslint/utils';
import safelySpreadProps from 'your-plugin/rules/safely-spread-props';

export default [
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: '@typescript-eslint/parser',
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      'your-plugin/safely-spread-props': 'error',
    },
  },
];
```

## Troubleshooting

If the rule isn't working as expected:

1. Verify you have type-aware linting enabled
2. Make sure your component prop types are properly defined
3. Check that the rule can find the component's prop type (it tries several strategies)

## When to Disable

You might want to disable this rule for a specific line if:

- You're using a higher-order component pattern where prop spreading is intentional
- You're certain that the extra props won't cause issues
- You're explicitly filtering props before spreading them

```jsx
// eslint-disable-next-line your-plugin/safely-spread-props
<Component {...filteredProps} />
```
