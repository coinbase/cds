import React from 'react';
import type { HeroSquareDimension } from '@coinbase/cds-common';
import type { ColorScheme } from '@coinbase/cds-common/core/theme';
import {
  illustrationDimensions,
  illustrationSizes,
} from '@coinbase/cds-common/tokens/illustrations';
import heroSquareVersionMap from '@coinbase/cds-illustrations/__generated__/heroSquare/data/versionMap';

import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { HStack, VStack } from '../../layout';
import { ThemeProvider } from '../../system/ThemeProvider';
import { defaultTheme } from '../../themes/defaultTheme';
import { Text } from '../../typography/Text';
import type { HeroSquareName } from '../index';
import { HeroSquare } from '../index';

const COLOR_SCHEMES: ColorScheme[] = ['light', 'dark'];
const ITEMS_PER_EXAMPLE = 8;
const HERO_SQUARE_SCALE = 0.24;
const heroSquareDimensionKey = illustrationDimensions.heroSquare[0];
const [heroSquareWidth, heroSquareHeight] = illustrationSizes[heroSquareDimensionKey];
const HERO_SQUARE_DIMENSION = `${heroSquareWidth}x${heroSquareHeight}` as HeroSquareDimension;
const PREVIEW_WIDTH = heroSquareWidth * HERO_SQUARE_SCALE;

const heroSquareNames = Object.keys(heroSquareVersionMap) as HeroSquareName[];
const heroSquareGroups: HeroSquareName[][] = [];

for (let i = 0; i < heroSquareNames.length; i += ITEMS_PER_EXAMPLE) {
  heroSquareGroups.push(heroSquareNames.slice(i, i + ITEMS_PER_EXAMPLE));
}

type HeroSquarePreviewProps = {
  name: HeroSquareName;
};

const HeroSquarePreview = ({ name }: HeroSquarePreviewProps) => (
  <VStack gap={0} style={{ width: PREVIEW_WIDTH * COLOR_SCHEMES.length }}>
    <Text ellipsize="tail" font="legal" numberOfLines={1}>
      {name}
    </Text>
    <HStack gap={0}>
      {COLOR_SCHEMES.map((scheme) => (
        <ThemeProvider key={`${name}-${scheme}`} activeColorScheme={scheme} theme={defaultTheme}>
          <VStack background="bg" overflow="hidden" width={PREVIEW_WIDTH}>
            <HeroSquare
              dimension={HERO_SQUARE_DIMENSION}
              name={name}
              scaleMultiplier={HERO_SQUARE_SCALE}
            />
          </VStack>
        </ThemeProvider>
      ))}
    </HStack>
  </VStack>
);

const HeroSquareStory = () => {
  return (
    <ExampleScreen>
      {heroSquareGroups.map((group, index, arr) => (
        <Example key={`hero-square-${index}`} title={`Hero Squares ${index + 1} of ${arr.length}`}>
          <HStack flexWrap="wrap" gap={1}>
            {group.map((name) => (
              <HeroSquarePreview key={name} name={name} />
            ))}
          </HStack>
        </Example>
      ))}
    </ExampleScreen>
  );
};

export default HeroSquareStory;
