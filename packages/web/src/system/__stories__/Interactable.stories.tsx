import React, { useState } from 'react';
import type { ThemeVars } from '@coinbase/cds-common/core/theme';

import { Button } from '../../buttons/Button';
import { TextInput } from '../../controls';
import { useTheme } from '../../hooks/useTheme';
import { VStack } from '../../layout';
import { Text } from '../../typography';
import { getInteractableStyles, Interactable } from '../Interactable';

export default {
  title: 'Components/Interactable',
  component: Interactable,
};

export const GeneratedColorStates = () => {
  const theme = useTheme();
  const [themeColor, setThemeColor] = useState<ThemeVars.Color>('bgPrimary');
  const [customBackground, setCustomBackground] = useState('');
  const [customHoveredBackground, setCustomHoveredBackground] = useState('');
  const [customPressedBackground, setCustomPressedBackground] = useState('');
  const [customDisabledBackground, setCustomDisabledBackground] = useState('');
  const isThemeColorValid = themeColor in theme.color;
  const blendStyles = {
    background: customBackground ? customBackground : undefined,
    hoveredBackground: customHoveredBackground ? customHoveredBackground : undefined,
    pressedBackground: customPressedBackground ? customPressedBackground : undefined,
    disabledBackground: customDisabledBackground ? customDisabledBackground : undefined,
  };
  const data = isThemeColorValid
    ? getInteractableStyles({ theme, background: themeColor, blendStyles })
    : {};

  const handleReset = () => {
    setThemeColor('bgPrimary');
    setCustomBackground('');
    setCustomHoveredBackground('');
    setCustomPressedBackground('');
    setCustomDisabledBackground('');
  };
  return (
    <VStack gap={2}>
      <Button alignSelf="end" onClick={handleReset} variant="secondary">
        Reset all fields
      </Button>
      <VStack gap={0.5}>
        <Text as="label" font="label1">
          Theme background color:
        </Text>
        <TextInput
          compact
          disabled={customBackground !== ''}
          helperText={
            !isThemeColorValid
              ? 'Please enter a valid theme color token name.'
              : 'The name of the theme color token that will be used for the base background color.'
          }
          onChange={(e) => setThemeColor(e.target.value as ThemeVars.Color)}
          value={themeColor}
          variant={!isThemeColorValid ? 'negative' : undefined}
        />
      </VStack>
      <VStack gap={0.5}>
        <Text as="label" font="label1">
          Custom background color:
        </Text>
        <TextInput
          compact
          helperText="A custom color for the base background color. Accepts hex, rgba, hsl, etc. If this is set, the theme background color will not be used."
          onChange={(e) => setCustomBackground(e.target.value)}
          value={customBackground}
        />
      </VStack>
      <VStack gap={0.5}>
        <Text as="label" font="label1">
          Custom base hover color:
        </Text>
        <TextInput
          compact
          helperText={
            'A custom base color for the generated hover color. Accepts hex, rgba, hsl, etc.'
          }
          onChange={(e) => setCustomHoveredBackground(e.target.value)}
          value={customHoveredBackground}
        />
      </VStack>
      <VStack gap={0.5}>
        <Text as="label" font="label1">
          Custom base pressed color:
        </Text>
        <TextInput
          compact
          helperText={
            'A custom base color for the generated pressed color. Accepts hex, rgba, hsl, etc.'
          }
          onChange={(e) => setCustomPressedBackground(e.target.value)}
          value={customPressedBackground}
        />
      </VStack>
      <VStack gap={0.5}>
        <Text as="label" font="label1">
          Custom disabled color:
        </Text>
        <TextInput
          compact
          helperText={
            'A custom base color for the generated disabled color. Accepts hex, rgba, hsl, etc.'
          }
          onChange={(e) => setCustomDisabledBackground(e.target.value)}
          value={customDisabledBackground}
        />
      </VStack>
      <Interactable
        background={themeColor}
        blendStyles={blendStyles}
        borderRadius={300}
        padding={2}
      >
        <Text font="display1">Normal</Text>
      </Interactable>

      <Interactable
        pressed
        background={themeColor}
        blendStyles={blendStyles}
        borderRadius={300}
        padding={2}
      >
        <Text font="display1">Pressed</Text>
      </Interactable>

      <Interactable
        disabled
        background={themeColor}
        blendStyles={blendStyles}
        borderRadius={300}
        padding={2}
      >
        <Text font="display1">Disabled</Text>
      </Interactable>

      <Text background="bgAlternate" borderRadius={300} padding={2}>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </Text>
    </VStack>
  );
};
