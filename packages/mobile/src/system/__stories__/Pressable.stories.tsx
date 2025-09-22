import React from 'react';
import { type ThemeVars } from '@cbhq/cds-common/core/theme';
import { getAccessibleColor } from '@cbhq/cds-common/utils/getAccessibleColor';

import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { useTheme } from '../../hooks/useTheme';
import { VStack } from '../../layout';
import { Box } from '../../layout/Box';
import { Text } from '../../typography/Text';
import { Pressable } from '../Pressable';

const PressableScreen = () => {
  const theme = useTheme();
  return (
    <ExampleScreen>
      <Example title="Pressable">
        <Box padding={1}>
          <Pressable accessibilityRole="button" background="bg">
            <Text font="body">Default background</Text>
          </Pressable>
        </Box>

        <Box background="bgOverlay" padding={1}>
          <Pressable accessibilityRole="button" background="bgAlternate">
            <Text font="body">Other background</Text>
          </Pressable>
        </Box>

        <Box padding={1}>
          <Pressable
            accessibilityRole="button"
            background="bg"
            borderColor="bgPrimary"
            borderRadius={400}
            borderWidth={100}
          >
            <Text font="body">With border</Text>
          </Pressable>
        </Box>
        <Box padding={1}>
          <Pressable
            accessibilityRole="button"
            background="bgPrimary"
            borderRadius={400}
            borderWidth={100}
          >
            <Text color="fgInverse" font="body">
              Primary
            </Text>
          </Pressable>
        </Box>
        <Box padding={1}>
          <Pressable
            loading
            accessibilityRole="button"
            background="bgPrimary"
            borderRadius={400}
            borderWidth={100}
          >
            <Text color="fgInverse" font="body">
              Primary + Loading
            </Text>
          </Pressable>
        </Box>
      </Example>

      <Example title="Pressable (opacity only)">
        <Box padding={1}>
          <Pressable accessibilityRole="button" background="transparent">
            <Text font="body">Default background</Text>
          </Pressable>
        </Box>

        <Box background="bgOverlay" padding={1}>
          <Pressable accessibilityRole="button" background="transparent">
            <Text font="body">Other background</Text>
          </Pressable>
        </Box>
      </Example>
      <Example title="Pressable transparentWhileInactive">
        <Box padding={1}>
          <Pressable transparentWhileInactive accessibilityRole="button" background="bgPrimary">
            <Text font="body">Default background</Text>
          </Pressable>
        </Box>

        <Box background="bgOverlay" padding={1}>
          <Pressable transparentWhileInactive accessibilityRole="button" background="bgPrimary">
            <Text font="body">Other background</Text>
          </Pressable>
        </Box>
      </Example>
      <Example title="Pressable variants">
        <VStack gap={2}>
          {Object.entries(theme.color).map(([color, value]) => {
            let textColor = getAccessibleColor({ background: value });
            if (color === 'currentColor')
              textColor = theme.activeColorScheme === 'dark' ? '#ffffff' : '#000000';
            return (
              <Pressable
                key={color}
                accessibilityRole="button"
                background={color as ThemeVars.Color}
              >
                <Text dangerouslySetColor={textColor} font="body" padding={1}>
                  {color}
                </Text>
              </Pressable>
            );
          })}
        </VStack>
      </Example>
      <Example title="Pressable variants with disabled">
        <VStack gap={2}>
          {Object.entries(theme.color).map(([color, value]) => {
            let textColor = getAccessibleColor({ background: value });
            if (color === 'currentColor')
              textColor = theme.activeColorScheme === 'dark' ? '#ffffff' : '#000000';
            return (
              <Pressable
                key={color}
                disabled
                accessibilityRole="button"
                background={color as ThemeVars.Color}
              >
                <Text dangerouslySetColor={textColor} font="body" padding={1}>
                  {color}
                </Text>
              </Pressable>
            );
          })}
        </VStack>
      </Example>
    </ExampleScreen>
  );
};

export default PressableScreen;
