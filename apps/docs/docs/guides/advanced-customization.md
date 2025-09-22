---
id: advanced-customization
title: Advanced Customization
---

# Advanced Customization

CDS provides a wide range of customization options, enabling you to adapt components to fit your application's unique design and functionality requirements. This guide covers advanced techniques for extending and customizing CDS components while maintaining consistency and performance.

## Core Principles of Customization

When customizing CDS components:

1. **Use Theme Variables**: Leverage CDS’s theming system for consistent styles across your application.
2. **Prefer `StyleProps`**: Customize components using the `StyleProps` API for simplicity and responsiveness.
3. **Avoid Overriding Internals**: Minimize direct overrides of component internals to prevent breaking changes during updates.

## Customizing with Theme Variables

CDS exposes a robust set of theme variables that control colors, typography, spacing, and more. Use these variables to create a consistent look and feel across your application.

### Example: Custom Button Styles

```tsx
import { Button } from '@cbhq/cds-web';

const CustomButton = () => (
  <Button color="bgPrimary" style={{ '--color-bgPrimary': '#1E90FF' }}>
    Custom Button
  </Button>
);
```

In this example, a custom CSS variable is applied to change the button's background color.

## Using `StyleProps`

CDS components support `StyleProps`, a flexible API for applying styles directly. This method ensures styles are applied consistently and supports responsive design.

### Example: Responsive Grid Layout

```tsx
import { Grid, Box } from '@cbhq/cds-web';

const ResponsiveLayout = () => (
  <Grid templateColumns={{ base: '1fr', tablet: 'repeat(2, 1fr)' }} gap={4}>
    <Box background="bgPrimary">Item 1</Box>
    <Box background="bgPrimary">Item 2</Box>
  </Grid>
);
```

Here, `templateColumns` adjusts the grid layout based on the viewport size.

## Extending Components

Extend existing CDS components to add custom functionality or styling. Start with primitives like `Box` to maintain a consistent API.

### Example: Custom Card Component

```tsx
import React from 'react';
import { Box, Text } from '@cbhq/cds-web';

const CustomCard = ({ title, description }) => (
  <Box background="bgSecondary" borderRadius={200} padding={4}>
    <Text as="h3" fontSize="headline">
      {title}
    </Text>
    <Text>{description}</Text>
  </Box>
);

export default CustomCard;
```

## Adding Interactivity

CDS components can be paired with stateful logic to create dynamic, interactive UI elements.

### Example: Toggle Button

```tsx
import React, { useState } from 'react';
import { Button } from '@cbhq/cds-web';

const ToggleButton = () => {
  const [isActive, setIsActive] = useState(false);

  return (
    <Button
      background={isActive ? 'bgPrimary' : 'bgSecondary'}
      onClick={() => setIsActive(!isActive)}
    >
      {isActive ? 'Active' : 'Inactive'}
    </Button>
  );
};
```

This example demonstrates adding interactive state to a CDS `Button` component.

## Overriding Component Styles

For situations requiring more control, CDS components support the `className` (web) or `style` (React Native) prop.

### Example: Customizing Styles with `className`

```tsx
import { Box } from '@cbhq/cds-web';

const CustomStyledBox = () => (
  <Box className="custom-box" style={{ backgroundColor: 'lightblue', borderRadius: '12px' }} />
);
```

### Example: React Native `StyleSheet`

```tsx
import { StyleSheet, View } from 'react-native';
import { Box } from '@cbhq/cds-mobile';

const styles = StyleSheet.create({
  customBox: {
    backgroundColor: 'lightblue',
    borderRadius: 12,
  },
});

const CustomStyledBox = () => <Box as={View} style={styles.customBox} />;
```

## Custom Components with CDS Primitives

Building custom components from CDS primitives like `Box` and `Text` ensures consistent theming and styling.

### Example: Custom Badge

```tsx
import { Box, Text } from '@cbhq/cds-web';

const Badge = ({ label, color }) => (
  <Box paddingX={2} paddingY={1} background={color || 'bgPrimary'} borderRadius={100}>
    <Text color="fgInverse" fontSize="caption">
      {label}
    </Text>
  </Box>
);

export default Badge;
```

## Best Practices

- **Use `StyleProps` and Theme Variables**: Leverage the CDS API to ensure consistent styling.
- **Minimize Overrides**: Avoid inline styles and custom classes unless necessary.
- **Ensure Accessibility**: Test custom components for keyboard and screen reader compatibility.
- **Document Customizations**: Clearly document any extensions or overrides for future maintainability.

## Next Steps

- [Building New Components](#): Learn how to create reusable components with CDS.
- [Theming](#): Explore advanced theming options.
- [Styling](#): Dive deeper into the `StyleProps` API.

Harness the advanced customization capabilities of the Coinbase Design System to create tailored, consistent, and high-performing user interfaces!
