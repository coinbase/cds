import React from 'react';
import { type ThemeVars } from '@coinbase/cds-common/core/theme';
import { getAccessibleColor } from '@coinbase/cds-common/utils/getAccessibleColor';

import { useTheme } from '../../hooks/useTheme';
import { Box, Grid, VStack } from '../../layout';
import { Text } from '../../typography/Text';
import { Pressable } from '../Pressable';

export default {
  title: 'Components/Pressable',
  component: Pressable,
};

const Default = () => {
  return (
    <VStack gap={2}>
      <Box>
        <Pressable as="button" background="bg">
          Pressable
        </Pressable>
      </Box>
      <Box>
        <Pressable noScaleOnPress as="button" background="bg">
          Without scaling
        </Pressable>
      </Box>
      <Box>
        <Pressable disabled as="button" background="bg">
          Pressable
        </Pressable>
      </Box>
      <Box>
        <Pressable disabled noScaleOnPress as="button" background="bg">
          Without scaling
        </Pressable>
      </Box>
      <Box>
        <Pressable block as="button" background="bgPrimary">
          <Text as="p" color="fgInverse" display="block" font="body">
            Pressable full-width
          </Text>
        </Pressable>
      </Box>
      <Box>
        <Pressable loading as="button" background="bgPrimary">
          <Text as="p" color="fgInverse" display="block" font="body">
            loading
          </Text>
        </Pressable>
      </Box>
    </VStack>
  );
};

const Transparent = () => {
  return (
    <Grid columnMin={200} gap={2}>
      <Pressable as="button" background="transparent">
        <Text as="p" display="block" font="body" padding={1}>
          transparent
        </Text>
      </Pressable>
      <Pressable transparentWhileInactive as="button" background="bgPrimary">
        <Text as="p" color="fgInverse" display="block" font="body" padding={1}>
          transparentWhileInactive
        </Text>
      </Pressable>
      <Pressable disabled as="button" background="transparent">
        <Text as="p" display="block" font="body" padding={1}>
          transparent
        </Text>
      </Pressable>
      <Pressable disabled transparentWhileInactive as="button" background="bgPrimary">
        <Text as="p" color="fgInverse" display="block" font="body" padding={1}>
          transparentWhileInactive
        </Text>
      </Pressable>
    </Grid>
  );
};

const Borders = () => {
  return (
    <Grid columnMin={200} gap={2}>
      <Pressable as="button" background="transparent" borderColor="bgPositive">
        <Text as="p" display="block" font="body" padding={1}>
          transparent with borders
        </Text>
      </Pressable>
      <Pressable
        transparentWhileInactive
        as="button"
        background="bgPrimary"
        borderColor="bgPositive"
      >
        <Text as="p" display="block" font="body" padding={1}>
          transparentWhileInactive with borders
        </Text>
      </Pressable>
      <Pressable disabled as="button" background="transparent" borderColor="bgPositive">
        <Text as="p" display="block" font="body" padding={1}>
          transparent with borders
        </Text>
      </Pressable>
      <Pressable
        disabled
        transparentWhileInactive
        as="button"
        background="bgPrimary"
        borderColor="bgPositive"
      >
        <Text as="p" display="block" font="body" padding={1}>
          transparentWhileInactive with borders
        </Text>
      </Pressable>
      <Pressable as="button" background="bg" borderColor="bgPrimary" borderRadius={100}>
        <Text as="p" display="block" font="body" padding={1}>
          primary + compact
        </Text>
      </Pressable>
      <Pressable as="button" background="bgAlternate" borderColor="bgNegative">
        <Text as="p" display="block" font="body" padding={1}>
          negative
        </Text>
      </Pressable>
      <Pressable as="button" background="bgPrimary" borderColor="bgPositive" borderRadius={200}>
        <Text as="p" color="fgInverse" display="block" font="body" padding={1}>
          positive + standard
        </Text>
      </Pressable>
      <Pressable as="button" background="bgSecondary" borderColor="bgLineHeavy" borderRadius={200}>
        <Text as="p" color="fg" display="block" font="body" padding={1}>
          bgLineHeavy + tooltip
        </Text>
      </Pressable>
      <Pressable as="button" background="bgPositive" borderColor="bgLine" borderRadius={400}>
        <Text as="p" color="fgInverse" display="block" font="body" padding={1}>
          line + pill
        </Text>
      </Pressable>
      <Pressable
        as="button"
        background="bgNegative"
        borderColor="bgPrimaryWash"
        borderRadius={1000}
      >
        <Text as="p" color="fgInverse" display="block" font="body" padding={1}>
          primaryWash + round
        </Text>
      </Pressable>
    </Grid>
  );
};

export const Variations = () => {
  return (
    <VStack gap={3}>
      <Default />
      <Transparent />
      <Borders />
    </VStack>
  );
};

export const ThemeColors = () => {
  const theme = useTheme();
  return (
    <VStack gap={2}>
      {Object.entries(theme.color).map(([color, value]) => {
        let textColor = getAccessibleColor({ background: value });
        if (color === 'currentColor') textColor = '#ffffff';
        return (
          <Pressable
            key={color}
            as="button"
            background={color as ThemeVars.Color}
            borderColor="bgLine"
            borderWidth={100}
          >
            <Text as="p" dangerouslySetColor={textColor} display="block" font="body" padding={1}>
              {color}
            </Text>
          </Pressable>
        );
      })}
    </VStack>
  );
};

ThemeColors.parameters = {
  a11y: {
    options: {
      rules: {
        'color-contrast': { enabled: false },
      },
    },
  },
};
export const ThemeColorsWithDisabled = () => {
  const theme = useTheme();
  return (
    <VStack gap={2}>
      {Object.entries(theme.color).map(([color, value]) => {
        let textColor = getAccessibleColor({ background: value });
        if (color === 'currentColor') textColor = '#ffffff';
        return (
          <Pressable
            key={color}
            disabled
            as="button"
            background={color as ThemeVars.Color}
            borderColor="bgLine"
            borderWidth={100}
          >
            <Text as="p" dangerouslySetColor={textColor} display="block" font="body" padding={1}>
              {color}
            </Text>
          </Pressable>
        );
      })}
    </VStack>
  );
};
