import React from 'react';
import type { ElevationLevels } from '@coinbase/cds-common';

import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { useTheme } from '../../hooks/useTheme';
import { Box, HStack, VStack } from '../../layout';
import { defaultTheme } from '../../themes/defaultTheme';
import { Text } from '../../typography/Text';
import { ThemeProvider } from '../ThemeProvider';

const Palette = ({ elevation }: { elevation?: ElevationLevels }) => {
  const theme = useTheme();

  return (
    <HStack background="bg" flexWrap="wrap">
      {Object.entries(theme.color).map(([name, value]) => {
        return (
          <Box
            key={name}
            alignItems="center"
            height={100}
            justifyContent="center"
            style={{ backgroundColor: theme.color[name as keyof typeof theme.color] }}
            width="50%"
          >
            <VStack background="bg">
              <Text align="center" font="caption">
                {name}
              </Text>
              <Text align="center" font="caption">
                {value}
              </Text>
              {!!elevation && (
                <Text align="center" font="caption">
                  Elevation: {elevation}
                </Text>
              )}
            </VStack>
          </Box>
        );
      })}
    </HStack>
  );
};

const PaletteScreen = () => {
  return (
    <ExampleScreen>
      <Example title="Light Palette">
        <Palette />
      </Example>
      <Example title="Dark Palette">
        <ThemeProvider activeColorScheme="dark" theme={defaultTheme}>
          <Palette />
        </ThemeProvider>
      </Example>
      <Example title="Light Palette Elevation 1">
        <Box elevation={1}>
          <Palette elevation={1} />
        </Box>
      </Example>
      <Example title="Dark Palette Elevation 1">
        <ThemeProvider activeColorScheme="dark" theme={defaultTheme}>
          <Box elevation={1}>
            <Palette elevation={1} />
          </Box>
        </ThemeProvider>
      </Example>
      <Example title="Light Palette Elevation 2">
        <Box elevation={2}>
          <Palette elevation={2} />
        </Box>
      </Example>
      <Example title="Dark Palette Elevation 2">
        <ThemeProvider activeColorScheme="dark" theme={defaultTheme}>
          <Box elevation={2}>
            <Palette elevation={2} />
          </Box>
        </ThemeProvider>
      </Example>
    </ExampleScreen>
  );
};

export default PaletteScreen;
