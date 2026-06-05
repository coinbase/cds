# Customizing styles

Prefer using CDS Design Tokens as values over hardcoded values. Examples:

- On web, prefer `marginTop: 'var(--space-0_5)'` over `marginTop: '4px'`.
- On web, prefer `borderRadius: 'var(--borderRadius-200)'` over `borderRadius: '8px'`.
- On mobile, prefer `marginTop: theme.space[0.5]` over `marginTop: 4`.
- On mobile, prefer `borderRadius: theme.borderRadius[200]` over `borderRadius: 8`.
- Prefer `<Box background="bgAlternate" padding={2} />` over a custom wrapper with hardcoded CSS.

### `style` on `Select`

```tsx
import { memo, useState } from 'react';
import { Select } from '@coinbase/cds-web/alpha/select'; // or '@coinbase/cds-mobile/alpha/select'
import { VStack } from '@coinbase/cds-web/layout'; // or '@coinbase/cds-mobile/layout'

const selectOptions = [
  { value: 'option1', label: 'Option 1', description: 'Description' },
  { value: 'option2', label: 'Option 2', description: 'Description' },
  { value: 'option3', label: 'Option 3', description: 'Description' },
];

export const SelectExample = memo(() => {
  const [selectValue, setSelectValue] = useState<string | null>(null);

  return (
    <VStack>
      <Select
        compact
        label="Label"
        labelVariant="inside"
        onChange={setSelectValue}
        options={selectOptions}
        placeholder="Select an option"
        style={{ flexGrow: 1 }}
        value={selectValue}
      />
      <Select
        label="Label"
        onChange={setSelectValue}
        options={selectOptions}
        placeholder="Select an option"
        style={{ flexGrow: 1 }}
        value={selectValue}
      />
    </VStack>
  );
});
```

### `styles` on `Select`

```tsx
import { useState } from 'react';
import { Select } from '@coinbase/cds-web/alpha/select'; // or '@coinbase/cds-mobile/alpha/select'

function CustomStylesExample() {
  const [value, setValue] = useState('1');
  const options = [
    { value: null, label: 'Remove selection' },
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
    { value: '3', label: 'Option 3' },
    { value: '4', label: 'Option 4' },
  ];

  return (
    <Select
      label="Single select - styles"
      onChange={setValue}
      options={options}
      styles={{
        control: {
          padding: '20px',
          backgroundColor: 'lightgray',
        },
        controlBlendStyles: {
          background: 'coral',
          hoveredBackground: 'crimson',
          pressedBackground: 'red',
        },
        optionBlendStyles: {
          background: 'lightblue',
          hoveredBackground: 'blue',
        },
        dropdown: {
          padding: '20px',
          backgroundColor: 'pink',
        },
      }}
      value={value}
    />
  );
}
```

### `styles` on `ContentCell`

```tsx
import { ContentCell } from '@coinbase/cds-web/cells'; // or '@coinbase/cds-mobile/cells'
import { Avatar } from '@coinbase/cds-web/media'; // or '@coinbase/cds-mobile/media'

<ContentCell
  spacingVariant="condensed"
  title="Profile Information"
  subtitle="Active Status"
  media={<Avatar alt="Sneezy" name="Sneezy" size="m" colorScheme="blue" />}
  accessory="disclosure"
  description="This example demonstrates the use of media (avatar) and an accessory indicator."
  styles={{
    media: {
      paddingTop: 'var(--space-0_5)',
    },
  }}
/>;
```

### Web-only `classNames` plus `styles`

`classNames` is a web pattern. On mobile, use `styles` only.

```tsx
import { css } from '@linaria/core';
import { DotCount } from '@coinbase/cds-web/dots';
import { VStack } from '@coinbase/cds-web/layout';
import { useTheme } from '@coinbase/cds-web';

const dotCountContainerCss = css`
  border-radius: 4px;
`;

function DotCountStyle() {
  const theme = useTheme();

  return (
    <VStack alignItems="flex-start" gap={1}>
      <DotCount
        classNames={{
          container: dotCountContainerCss,
        }}
        count={30}
        styles={{
          container: {
            backgroundColor: theme.color.bgPositive,
            borderColor: theme.color.fg,
          },
        }}
      />
    </VStack>
  );
}
```

### `styles` on layout containers

```tsx
import { Carousel } from '@coinbase/cds-web/carousel'; // or '@coinbase/cds-mobile/carousel'

<Carousel styles={{ carousel: { gap: 16 } }}>{/* carousel items */}</Carousel>;
```

## Notes

- Use the same component patterns across web and mobile when you can, and swap the import paths.
- Web components often support `className` and `classNames`; mobile customization is usually `style` or `styles`.
- `styles` is usually slot-based, so use the documented keys like `control`, `dropdown`, `media`, or `container`.
- If layout props can solve it, prefer those over custom styling. Save `style` and `styles` for exceptions.
