import React, { memo } from 'react';
import type { IllustrationVariant } from '@coinbase/cds-common';
import type { ColorScheme } from '@coinbase/cds-common/core/theme';
import {
  illustrationDimensions,
  illustrationSizes,
} from '@coinbase/cds-common/tokens/illustrations';
import heroSquareVersionMap from '@coinbase/cds-illustrations/__generated__/heroSquare/data/versionMap';
import pictogramVersionMap from '@coinbase/cds-illustrations/__generated__/pictogram/data/versionMap';
import spotIconVersionMap from '@coinbase/cds-illustrations/__generated__/spotIcon/data/versionMap';
import spotRectangleVersionMap from '@coinbase/cds-illustrations/__generated__/spotRectangle/data/versionMap';
import spotSquareVersionMap from '@coinbase/cds-illustrations/__generated__/spotSquare/data/versionMap';

import { HStack, VStack } from '../../layout';
import { ThemeProvider } from '../../system/ThemeProvider';
import { defaultTheme } from '../../themes/defaultTheme';
import { Text } from '../../typography/Text';
import type { IllustrationNamesMap } from '../createIllustration';

type TypeMap = {
  [K in IllustrationVariant]: {
    versionMap: Record<IllustrationNamesMap[K], number>;
    sizes: {
      height: number;
      width: number;
      scaleMultiplier: number;
    };
  };
};

const typeMap: TypeMap = {
  heroSquare: {
    versionMap: heroSquareVersionMap,
    sizes: {
      // render a 72x72 thumbnail
      height: illustrationSizes[illustrationDimensions.heroSquare[0]][1],
      width: illustrationSizes[illustrationDimensions.heroSquare[0]][0],
      scaleMultiplier: 0.3,
    },
  },
  pictogram: {
    versionMap: pictogramVersionMap,
    sizes: {
      // render a 72x72 thumbnail
      height: illustrationSizes[illustrationDimensions.pictogram[0]][1],
      width: illustrationSizes[illustrationDimensions.pictogram[0]][0],
      scaleMultiplier: 1.5,
    },
  },
  spotIcon: {
    versionMap: spotIconVersionMap,
    sizes: {
      // render a 72x72 thumbnail
      height: illustrationSizes[illustrationDimensions.spotIcon[0]][1],
      width: illustrationSizes[illustrationDimensions.spotIcon[0]][0],
      scaleMultiplier: 2.25,
    },
  },
  spotRectangle: {
    versionMap: spotRectangleVersionMap,
    sizes: {
      // render a 144x72 thumbnail
      height: illustrationSizes[illustrationDimensions.spotRectangle[0]][1],
      width: illustrationSizes[illustrationDimensions.spotRectangle[0]][0],
      scaleMultiplier: 0.6,
    },
  },
  spotSquare: {
    versionMap: spotSquareVersionMap,
    sizes: {
      // render a 72x72 thumbnail
      height: illustrationSizes[illustrationDimensions.spotSquare[0]][1],
      width: illustrationSizes[illustrationDimensions.spotSquare[0]][0],
      scaleMultiplier: 0.75,
    },
  },
};

type IllustrationSheetProps<Type> = {
  type: Type;
  startIndex?: number;
  endIndex?: number;
};

export function getIllustrationSheet<Type extends IllustrationVariant>({
  type,
  startIndex,
  endIndex,
}: IllustrationSheetProps<Type>) {
  type IllustrationName = IllustrationNamesMap[Type];
  type DataItem = { name: IllustrationName; activeColorScheme: ColorScheme };
  type LocalIllustrationProps = {
    activeColorScheme: ColorScheme;
    name: IllustrationName;
    version: number;
  };

  const { versionMap, sizes } = typeMap[type];
  const width = sizes.width * sizes.scaleMultiplier;
  const height = sizes.height * sizes.scaleMultiplier;

  const data = (Object.keys(versionMap) as IllustrationName[])
    .slice(startIndex, endIndex)
    .reduce(
      (acc: DataItem[], name) => [
        ...acc,
        { name, activeColorScheme: 'light' as const },
        { name, activeColorScheme: 'dark' as const },
      ],
      [],
    );

  const LocalIllustration = memo(function LocalIllustration({
    activeColorScheme,
    name,
    version,
  }: LocalIllustrationProps) {
    const svgPath = `@coinbase/cds-illustrations/__generated__/${type}/svg/${activeColorScheme}/${name}-${version}.svg`;

    return <img alt={name} height={height} src={svgPath} width={width} />;
  });

  const renderItem = ({ name, activeColorScheme }: DataItem) => {
    return (
      <ThemeProvider
        key={`${name}-${activeColorScheme}`}
        activeColorScheme={activeColorScheme}
        theme={defaultTheme}
      >
        <VStack
          alignItems="flex-start"
          background="bg"
          gap={1}
          height={height + 24}
          overflow="hidden"
          width={width}
        >
          <LocalIllustration
            activeColorScheme={activeColorScheme}
            name={name}
            version={versionMap[name]}
          />
          <Text noWrap as="p" display="block" font="legal">
            {name}
          </Text>
        </VStack>
      </ThemeProvider>
    );
  };

  const IllustrationSheet = memo(function IllustrationSheet() {
    return (
      <HStack
        alignItems="flex-start"
        flexWrap="wrap"
        gap={2}
        justifyContent="flex-start"
        paddingY={1}
      >
        {data.map(renderItem)}
      </HStack>
    );
  });

  return () => <IllustrationSheet />;
}
