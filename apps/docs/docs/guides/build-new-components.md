---
id: build-new-components
title: Build New Components
---

# Building New Components

When building new components with the Coinbase Design System (CDS), it's important to adhere to the principles of consistency, reusability, and accessibility. This guide provides a structured approach to creating custom components that seamlessly integrate with CDS while maintaining the flexibility to address unique application requirements.

## Before You Begin

Before building a new component, consider:

1. **Reusability**: Could the new component be reused across your application or even other projects?
2. **Existing Components**: Does an existing CDS component already fulfill your requirements? Consider extending or customizing existing components before creating new ones.
3. **Design Alignment**: Ensure the new component adheres to Coinbase’s design guidelines and branding.

## Core Principles

### Consistency

Use CDS’s theming, styling, and layout primitives to ensure the new component integrates seamlessly with the rest of your application.

### Accessibility

All components must meet accessibility standards, including proper keyboard navigation, focus management, and ARIA attributes where applicable.

### Performance

Ensure components are optimized for performance, especially when handling state or rendering large datasets.

## Steps to Build a New Component

### 1. Define the Component API

Start by defining the props and API for your new component. Ensure the API:

- Is intuitive and easy to use.
- Leverages existing CDS props, such as `StyleProps` and responsive design support.
- Includes clear default values for commonly used props.

Example:

```typescript
type MyComponentProps = {
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
  onClick?: () => void;
};
```

### 2. Choose a Base Component

CDS provides flexible primitives like `Box`, `HStack`, and `VStack` that can be used as the foundation for building new components. Start with these components to leverage built-in theming and styling capabilities.

Example:

```tsx
import { Box } from '@cbhq/cds-web';

const MyComponent = ({ variant = 'primary', isDisabled, onClick }: MyComponentProps) => {
  return (
    <Box
      as="button"
      background={variant === 'primary' ? 'bgPrimary' : 'bgSecondary'}
      padding={3}
      borderRadius={200}
      disabled={isDisabled}
      onClick={onClick}
    >
      Click Me
    </Box>
  );
};
```

### 3. Use StyleProps for Customization

Enable developers to customize your component by supporting CDS `StyleProps`. This makes the component flexible and ensures it integrates well with the rest of the system.

Example:

```tsx
import { Box, StyleProps } from '@cbhq/cds-web';

type MyComponentProps = StyleProps & React.HTMLAttributes<HTMLDivElement>;

const MyComponent: React.FC<MyComponentProps> = (props) => <Box {...props} />;
```

### 4. Implement Theming

Ensure the component supports theming by using CDS theme variables. For example, use `color.textPrimary` or `space.3` instead of hardcoding values.

Example:

```tsx
const MyComponent = () => {
  return (
    <Box color="fgPrimary" background="bgSecondary" padding={4}>
      Themed Component
    </Box>
  );
};
```

### 5. Add Accessibility Features

Use ARIA attributes, keyboard navigation, and focus management to make your component accessible.

Example:

```tsx
const MyAccessibleComponent = () => (
  <Box as="button" role="button" aria-label="Submit" onClick={() => console.log('Button clicked')}>
    Submit
  </Box>
);
```

### 6. Test Your Component

Thoroughly test your component in the following areas:

- **Visual Tests**: Check theming, responsive behavior, and consistency.
- **Functional Tests**: Validate interactivity, state management, and accessibility.
- **Performance Tests**: Ensure the component performs well in various scenarios, such as large datasets.

### 7. Document Your Component

Provide clear documentation, including:

- **Usage Examples**: Show how to use the component with different props.
- **API Reference**: Document all props and their types.
- **Customization**: Highlight ways to customize the component with `StyleProps` or themes.

## Example: Custom Card Component

Here’s a complete example of a custom `Card` component:

```tsx
import React from 'react';
import { Box, Text, StyleProps } from '@cbhq/cds-web';

type CardProps = {
  title: string;
  description: string;
  styleProps?: StyleProps;
};

export const Card: React.FC<CardProps> = ({ title, description, styleProps }) => {
  return (
    <Box borderRadius={200} background="bgPrimary" padding={4} {...styleProps}>
      <Text as="h2" fontSize="headline">
        {title}
      </Text>
      <Text>{description}</Text>
    </Box>
  );
};
```

## Best Practices

- **Reuse CDS Primitives**: Start with `Box`, `HStack`, or `VStack` to save development time.
- **Follow Design Guidelines**: Ensure your component aligns with Coinbase’s design principles.
- **Test Accessibility**: Use tools like Axe or Lighthouse to validate accessibility.
- **Document Clearly**: Make it easy for other developers to understand and use your component.

## Next Steps

- [Component Library](/components/layout/Accordion/): Explore the full set of CDS components.
- [Styling](/getting-started/styling): Learn how to use `StyleProps` and responsive design.
- [Theming](/getting-started/theming): Understand how to integrate theme variables into your components.

By following these guidelines, you can build robust, reusable components that integrate seamlessly with the Coinbase Design System!
