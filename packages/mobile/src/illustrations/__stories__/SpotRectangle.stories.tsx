import React from 'react';
import type { ColorScheme } from '@coinbase/cds-common/core/theme';
import {
  illustrationDimensions,
  illustrationSizes,
} from '@coinbase/cds-common/tokens/illustrations';
import spotRectangleVersionMap from '@coinbase/cds-illustrations/__generated__/spotRectangle/data/versionMap';

import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { HStack, VStack } from '../../layout';
import { ThemeProvider } from '../../system/ThemeProvider';
import { defaultTheme } from '../../themes/defaultTheme';
import { Text } from '../../typography/Text';
import type { SpotRectangleName } from '../index';
import { SpotRectangle } from '../index';

const COLOR_SCHEMES: ColorScheme[] = ['light', 'dark'];
const ITEMS_PER_EXAMPLE = 12;
const SPOT_RECTANGLE_SCALE = 0.3;
const spotRectangleDimension = illustrationDimensions.spotRectangle[0];
const [spotRectangleWidth] = illustrationSizes[spotRectangleDimension];
const PREVIEW_WIDTH = spotRectangleWidth * SPOT_RECTANGLE_SCALE;

const spotRectangleNames = Object.keys(spotRectangleVersionMap) as SpotRectangleName[];
const spotRectangleGroups: SpotRectangleName[][] = [];

for (let i = 0; i < spotRectangleNames.length; i += ITEMS_PER_EXAMPLE) {
  spotRectangleGroups.push(spotRectangleNames.slice(i, i + ITEMS_PER_EXAMPLE));
}

type SpotRectanglePreviewProps = {
  name: SpotRectangleName;
};

const SpotRectanglePreview = ({ name }: SpotRectanglePreviewProps) => (
  <VStack gap={0} style={{ width: PREVIEW_WIDTH * COLOR_SCHEMES.length }}>
    <Text ellipsize="tail" font="legal" numberOfLines={1}>
      {name}
    </Text>
    <HStack gap={0}>
      {COLOR_SCHEMES.map((scheme) => (
        <ThemeProvider key={`${name}-${scheme}`} activeColorScheme={scheme} theme={defaultTheme}>
          <VStack background="bg" overflow="hidden" width={PREVIEW_WIDTH}>
            <SpotRectangle name={name} scaleMultiplier={SPOT_RECTANGLE_SCALE} />
          </VStack>
        </ThemeProvider>
      ))}
    </HStack>
  </VStack>
);

const SpotRectangleStory = () => {
  return (
    <ExampleScreen>
      {spotRectangleGroups.map((group, index, arr) => (
        <Example
          key={`spot-rectangles-${index}`}
          title={`Spot Rectangles ${index + 1} of ${arr.length}`}
        >
          <HStack flexWrap="wrap" gap={1}>
            {group.map((name) => (
              <SpotRectanglePreview key={name} name={name} />
            ))}
          </HStack>
        </Example>
      ))}
    </ExampleScreen>
  );
};

export default SpotRectangleStory;
