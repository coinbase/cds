import React from 'react';
import type { ColorScheme } from '@coinbase/cds-common/core/theme';
import {
  illustrationDimensions,
  illustrationSizes,
} from '@coinbase/cds-common/tokens/illustrations';
import spotSquareVersionMap from '@coinbase/cds-illustrations/__generated__/spotSquare/data/versionMap';

import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { HStack, VStack } from '../../layout';
import { ThemeProvider } from '../../system/ThemeProvider';
import { defaultTheme } from '../../themes/defaultTheme';
import { Text } from '../../typography/Text';
import type { SpotSquareName } from '../index';
import { SpotSquare } from '../index';

const COLOR_SCHEMES: ColorScheme[] = ['light', 'dark'];
const ITEMS_PER_EXAMPLE = 16;
const SPOT_SQUARE_SCALE = 0.4;
const spotSquareDimensionKey = illustrationDimensions.spotSquare[0];
const [spotSquareWidth] = illustrationSizes[spotSquareDimensionKey];
const PREVIEW_WIDTH = spotSquareWidth * SPOT_SQUARE_SCALE;

const spotSquareNames = Object.keys(spotSquareVersionMap) as SpotSquareName[];
const spotSquareGroups: SpotSquareName[][] = [];

for (let i = 0; i < spotSquareNames.length; i += ITEMS_PER_EXAMPLE) {
  spotSquareGroups.push(spotSquareNames.slice(i, i + ITEMS_PER_EXAMPLE));
}

type SpotSquarePreviewProps = {
  name: SpotSquareName;
};

const SpotSquarePreview = ({ name }: SpotSquarePreviewProps) => (
  <VStack gap={0} style={{ width: PREVIEW_WIDTH * COLOR_SCHEMES.length }}>
    <Text ellipsize="tail" font="legal" numberOfLines={1}>
      {name}
    </Text>
    <HStack gap={0}>
      {COLOR_SCHEMES.map((scheme) => (
        <ThemeProvider key={`${name}-${scheme}`} activeColorScheme={scheme} theme={defaultTheme}>
          <VStack background="bg" overflow="hidden" width={PREVIEW_WIDTH}>
            <SpotSquare name={name} scaleMultiplier={SPOT_SQUARE_SCALE} />
          </VStack>
        </ThemeProvider>
      ))}
    </HStack>
  </VStack>
);

const SpotSquareStory = () => {
  return (
    <ExampleScreen>
      {spotSquareGroups.map((group, index, arr) => (
        <Example key={`spot-square-${index}`} title={`Spot Squares ${index + 1} of ${arr.length}`}>
          <HStack flexWrap="wrap" gap={1}>
            {group.map((name) => (
              <SpotSquarePreview key={name} name={name} />
            ))}
          </HStack>
        </Example>
      ))}
    </ExampleScreen>
  );
};

export default SpotSquareStory;
