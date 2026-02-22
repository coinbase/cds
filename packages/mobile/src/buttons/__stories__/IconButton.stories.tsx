import React from 'react';
import type { GestureResponderEvent } from 'react-native';
import { names } from '@coinbase/cds-icons/names';

import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { HStack } from '../../layout';
import { Box } from '../../layout/Box';
import { Text } from '../../typography/Text';
import { IconButton, type IconButtonProps } from '../IconButton';

function onPress(event: GestureResponderEvent) {
  console.log('Pressed', event.type || 'GestureResponderEvent');
}

const iconName = 'arrowsHorizontal';
const accessibilityLabel = 'Horizontal arrows';

const variants = [
  {
    component: (props?: Partial<IconButtonProps>) => (
      <IconButton name={iconName} variant="primary" {...props} />
    ),
    title: <Text font="body">Primary</Text>,
  },
  {
    component: (props?: Partial<IconButtonProps>) => (
      <IconButton transparent name={iconName} variant="primary" {...props} />
    ),
    title: <Text font="body">Primary transparent</Text>,
  },
  {
    component: (props?: Partial<IconButtonProps>) => (
      <IconButton name={iconName} variant="secondary" {...props} />
    ),
    title: <Text font="body">Secondary</Text>,
  },
  {
    component: (props?: Partial<IconButtonProps>) => (
      <IconButton transparent name={iconName} variant="secondary" {...props} />
    ),
    title: <Text font="body">Secondary transparent</Text>,
  },
  {
    component: (props?: Partial<IconButtonProps>) => (
      <IconButton
        name={iconName}
        style={{ padding: 10, borderRadius: 15, transform: 'scale(0.5)' }}
        {...props}
      />
    ),
    title: <Text font="body">Custom style</Text>,
  },
  {
    component: (props?: Partial<IconButtonProps>) => (
      <IconButton flush="start" name={iconName} variant="primary" {...props} />
    ),
    title: 'Primary flush start',
  },
  {
    component: (props?: Partial<IconButtonProps>) => (
      <IconButton flush="end" name={iconName} variant="primary" {...props} />
    ),
    title: 'Primary flush end',
  },
];

const IconButtonScreen = () => {
  return (
    <ExampleScreen>
      <Example inline title="Default">
        <IconButton accessibilityLabel={accessibilityLabel} name={iconName} onPress={onPress} />
      </Example>

      <Example inline title="States">
        <Box alignItems="center" flexDirection="row" justifyContent="space-between" width={350}>
          <IconButton
            disabled
            accessibilityLabel={accessibilityLabel}
            name={iconName}
            variant="primary"
          />
          <Text font="body">Disabled primary</Text>
        </Box>

        <Box alignItems="center" flexDirection="row" justifyContent="space-between" width={350}>
          <IconButton disabled accessibilityLabel={accessibilityLabel} name={iconName} />
          <Text font="body">Disabled secondary</Text>
        </Box>
      </Example>

      <Example inline title="Variants">
        {variants.map((variant, index) => {
          return (
            <Box
              key={index}
              alignItems="center"
              flexDirection="row"
              justifyContent="space-between"
              width={350}
            >
              {variant.component({ accessibilityLabel })}
              {variant.title}
            </Box>
          );
        })}
      </Example>
      <Example title="All">
        {names.map((name) => {
          return (
            <HStack key={`icon-wrapper-${name}`} flexWrap="wrap" gap={2}>
              <IconButton accessibilityLabel={accessibilityLabel} name={name} variant="primary" />
              <IconButton accessibilityLabel={accessibilityLabel} name={name} variant="secondary" />
              <IconButton accessibilityLabel={accessibilityLabel} name={name} />
            </HStack>
          );
        })}
      </Example>
      <Example inline title="Variants Loading">
        {variants.map((variant, index) => {
          return (
            <Box
              key={index}
              alignItems="center"
              flexDirection="row"
              justifyContent="space-between"
              width={350}
            >
              {variant.component({ accessibilityLabel, loading: true })}
              {variant.title}
            </Box>
          );
        })}
      </Example>
    </ExampleScreen>
  );
};

export default IconButtonScreen;
