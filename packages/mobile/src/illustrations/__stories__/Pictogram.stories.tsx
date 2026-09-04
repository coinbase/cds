import React from 'react';
import type { PictogramDimension } from '@coinbase/cds-common';
import type { ColorScheme } from '@coinbase/cds-common/core/theme';
import {
  illustrationDimensions,
  illustrationSizes,
} from '@coinbase/cds-common/tokens/illustrations';
import pictogramVersionMap from '@coinbase/cds-illustrations/__generated__/pictogram/data/versionMap';

import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { HStack, VStack } from '../../layout';
import { ThemeProvider } from '../../system/ThemeProvider';
import { defaultTheme } from '../../themes/defaultTheme';
import { Text } from '../../typography/Text';
import type { PictogramName } from '../index';
import { Pictogram } from '../index';

const COLOR_SCHEMES: ColorScheme[] = ['light', 'dark'];
const ITEMS_PER_EXAMPLE = 12;
const PICTOGRAM_SCALE = 1;
const pictogramDimensionKey = illustrationDimensions.pictogram[0];
const [pictogramWidth, pictogramHeight] = illustrationSizes[pictogramDimensionKey];
const PICTOGRAM_DIMENSION = `${pictogramWidth}x${pictogramHeight}` as PictogramDimension;
const PREVIEW_WIDTH = pictogramWidth * PICTOGRAM_SCALE;

const pictogramNames = Object.keys(pictogramVersionMap) as PictogramName[];
const pictogramGroups: PictogramName[][] = [];

for (let i = 0; i < pictogramNames.length; i += ITEMS_PER_EXAMPLE) {
  pictogramGroups.push(pictogramNames.slice(i, i + ITEMS_PER_EXAMPLE));
}

type PictogramPreviewProps = {
  name: PictogramName;
};

const PictogramPreview = ({ name }: PictogramPreviewProps) => (
  <VStack gap={0} style={{ width: PREVIEW_WIDTH * COLOR_SCHEMES.length }}>
    <Text ellipsize="tail" font="legal" numberOfLines={1}>
      {name}
    </Text>
    <HStack gap={0}>
      {COLOR_SCHEMES.map((scheme) => (
        <ThemeProvider key={`${name}-${scheme}`} activeColorScheme={scheme} theme={defaultTheme}>
          <VStack background="bg" overflow="hidden" width={PREVIEW_WIDTH}>
            <Pictogram
              dimension={PICTOGRAM_DIMENSION}
              name={name}
              scaleMultiplier={PICTOGRAM_SCALE}
            />
          </VStack>
        </ThemeProvider>
      ))}
    </HStack>
  </VStack>
);

const PictogramStory = () => {
  return (
    <ExampleScreen>
      {pictogramGroups.map((group, index, arr) => (
        <Example key={`pictogram-${index}`} title={`Pictograms ${index + 1} of ${arr.length}`}>
          <HStack flexWrap="wrap" gap={1}>
            {group.map((name) => (
              <PictogramPreview key={name} name={name} />
            ))}
          </HStack>
        </Example>
      ))}
    </ExampleScreen>
  );
};

export default PictogramStory;
