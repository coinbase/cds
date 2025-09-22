import React from 'react';
import { getAccessibleColor } from '@cbhq/cds-common/utils/getAccessibleColor';

import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { useTheme } from '../../hooks/useTheme';
import { VStack } from '../../layout/VStack';
import { Text } from '../../typography/Text';

const hueNames = [
  'blue',
  'teal',
  'green',
  'orange',
  'yellow',
  'gray',
  'indigo',
  'pink',
  'purple',
  'red',
] as const;
export const hueSteps = [0, 5, 10, 15, 20, 30, 40, 50, 60, 70, 80, 90, 100] as const;

const SpectrumScreen = () => {
  const theme = useTheme();

  return (
    <ExampleScreen>
      <Example title="Default">
        {hueNames.map((hue) => {
          return (
            <VStack key={hue}>
              {hueSteps.map((step) => {
                const paletteValue = `${hue}${step}` as const;
                const background = `rgb(${theme.spectrum[paletteValue]})`;
                const foreground = getAccessibleColor({ background });
                return (
                  <VStack key={paletteValue} dangerouslySetBackground={background}>
                    <Text align="center" dangerouslySetColor={foreground} font="caption">
                      {paletteValue}
                    </Text>
                  </VStack>
                );
              })}
            </VStack>
          );
        })}
      </Example>
    </ExampleScreen>
  );
};

export default SpectrumScreen;
