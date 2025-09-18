---
id: polymorphic-components
title: Polymorphic Components
---

# Polymorphic Components

CDS introduces polymorphic components to provide maximum flexibility while maintaining consistent styling and accessibility. Polymorphic components allow you to specify the underlying HTML element or React Native view that a component renders, making it easy to tailor components to specific use cases without losing the benefits of CDS.

## What Are Polymorphic Components?

Polymorphic components are components that support an `as` prop, enabling them to dynamically render as different elements or components. For example, a `Box` component can render as a `div`, `section`, or any other valid HTML tag on the web, or as a `View` or `Text` in React Native.

This approach gives developers the power to:

- Reuse components in different contexts without rewriting styles.
- Customize semantics for accessibility or structural needs.
- Maintain consistency across the application.

## Key Features

- **Flexibility**: Dynamically choose the rendered element using the `as` prop.
- **Type Safety**: CDS components automatically infer props based on the specified element, ensuring proper type checking.
- **Style Inheritance**: Polymorphic components retain their `StyleProps` and other styling capabilities regardless of the rendered element.

## Usage

### Web Example

```tsx
import React from 'react';
import { Box } from '@cbhq/cds-web';

const Example = () => (
  <Box as="section" padding={4} background="bgPrimary">
    <h1>Section Title</h1>
    <p>Content inside a section rendered by a polymorphic Box component.</p>
  </Box>
);
```

In this example, the `Box` component renders as a `<section>` element with additional styling applied through the `StyleProps` API.

### React Native Example

```tsx
import React from 'react';
import { Box } from '@cbhq/cds-mobile';

const Example = () => (
  <Box as={Text} padding={4} style={{ fontSize: 18 }}>
    This is a Box rendering as a Text component in React Native.
  </Box>
);
```

In React Native, the `Box` component can render as a `Text` or any other React Native component, while still supporting CDS styles.

## Type Safety

CDS polymorphic components are type-safe. When you specify the `as` prop, the component’s props are inferred based on the rendered element.

### Example

```tsx
<Box as="a" href="https://www.coinbase.com" color="fgPrimary">
  Visit Coinbase
</Box>
```

In this example:

- The `href` prop is required because the `Box` is rendering as an anchor (`<a>`).
- The TypeScript compiler will show an error if you try to use a prop that doesn’t apply to the specified element.

## Common Use Cases

### Accessibility

Polymorphic components make it easy to define semantic HTML for better accessibility.

```tsx
<Box as="header" role="banner">
  <h1>Site Header</h1>
</Box>
```

### Styling Flexibility

Reusing a single component, like `Box`, for various elements simplifies styling while maintaining a consistent design language.

```tsx
<Box as="button" padding={2} background="bgPrimary" borderRadius={200}>
  Click Me
</Box>
```

### Customizing Native Components

In React Native, polymorphic components can wrap native views or third-party components seamlessly.

```tsx
import { Pressable } from 'react-native';

<Box as={Pressable} onClick={() => console.log('Pressed')} padding={4}>
  Press Me
</Box>;
```

## Best Practices

- **Choose the Correct Element**: Use semantic HTML for web applications to improve accessibility and SEO.
- **Leverage Type Safety**: Let TypeScript guide you when using the `as` prop to avoid invalid props for the specified element.
- **Combine with StyleProps**: Apply CDS `StyleProps` to maintain consistent styling, even when using custom elements.

## Limitations

- The `as` prop does not work with components that do not forward refs or support custom props.
- Be cautious when overriding default styles, as it may lead to inconsistent design if not handled properly.

## Next Steps

- [Styling](#): Learn more about the powerful `StyleProps` API.
- [Component Library](#): Explore other flexible components in CDS.
- [API Overview](#): Understand the foundational concepts of CDS.

Polymorphic components in CDS enable flexibility and consistency, empowering you to build highly customizable and accessible applications with ease!
