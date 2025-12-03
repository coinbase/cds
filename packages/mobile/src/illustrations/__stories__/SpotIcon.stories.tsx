import React from 'react';
import type { SpotIconDimension } from '@coinbase/cds-common';
import type { ColorScheme } from '@coinbase/cds-common/core/theme';
import {
  illustrationDimensions,
  illustrationSizes,
} from '@coinbase/cds-common/tokens/illustrations';
import spotIconVersionMap from '@coinbase/cds-illustrations/__generated__/spotIcon/data/versionMap';

import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { HStack, VStack } from '../../layout';
import { ThemeProvider } from '../../system/ThemeProvider';
import { defaultTheme } from '../../themes/defaultTheme';
import { Text } from '../../typography/Text';
import type { SpotIconName } from '../index';
import { SpotIcon } from '../index';

const COLOR_SCHEMES: ColorScheme[] = ['light', 'dark'];
const ITEMS_PER_EXAMPLE = 20;
const SPOT_ICON_SCALE = 1;
const spotIconDimensionKey = illustrationDimensions.spotIcon[0];
const [spotIconWidth, spotIconHeight] = illustrationSizes[spotIconDimensionKey];
const SPOT_ICON_DIMENSION = `${spotIconWidth}x${spotIconHeight}` as SpotIconDimension;
const PREVIEW_WIDTH = spotIconWidth * SPOT_ICON_SCALE;

const spotIconNames = Object.keys(spotIconVersionMap) as SpotIconName[];
const spotIconGroups: SpotIconName[][] = [];

for (let i = 0; i < spotIconNames.length; i += ITEMS_PER_EXAMPLE) {
  spotIconGroups.push(spotIconNames.slice(i, i + ITEMS_PER_EXAMPLE));
}

type SpotIconPreviewProps = {
  name: SpotIconName;
};

const SpotIconPreview = ({ name }: SpotIconPreviewProps) => (
  <VStack gap={0} style={{ width: PREVIEW_WIDTH * COLOR_SCHEMES.length }}>
    <Text ellipsize="tail" font="legal" numberOfLines={1}>
      {name}
    </Text>
    <HStack gap={0}>
      {COLOR_SCHEMES.map((scheme) => (
        <ThemeProvider key={`${name}-${scheme}`} activeColorScheme={scheme} theme={defaultTheme}>
          <VStack background="bg" overflow="hidden" width={PREVIEW_WIDTH}>
            <SpotIcon
              dimension={SPOT_ICON_DIMENSION}
              name={name}
              scaleMultiplier={SPOT_ICON_SCALE}
            />
          </VStack>
        </ThemeProvider>
      ))}
    </HStack>
  </VStack>
);

const SpotIconStory = () => {
  return (
    <ExampleScreen>
      {spotIconGroups.map((group, index, arr) => (
        <Example key={`spot-icon-${index}`} title={`Spot Icons ${index + 1} of ${arr.length}`}>
          <HStack flexWrap="wrap" gap={1}>
            {group.map((name) => (
              <SpotIconPreview key={name} name={name} />
            ))}
          </HStack>
        </Example>
      ))}
    </ExampleScreen>
  );
};

export default SpotIconStory;
