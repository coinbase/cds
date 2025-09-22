import React, { memo, useCallback } from 'react';
import { Dimensions, FlatList } from 'react-native';
import type {
  HeroSquareDimension,
  IllustrationVariant,
  PictogramDimension,
  SpotIconDimension,
} from '@cbhq/cds-common';
import type { ColorScheme } from '@cbhq/cds-common/core/theme';
import {
  illustrationDimensions,
  illustrationSizes,
} from '@cbhq/cds-common/tokens/illustrations';
import heroSquareVersionMap from '@cbhq/cds-illustrations/__generated__/heroSquare/data/versionMap';
import pictogramVersionMap from '@cbhq/cds-illustrations/__generated__/pictogram/data/versionMap';
import spotIconVersionMap from '@cbhq/cds-illustrations/__generated__/spotIcon/data/versionMap';
import spotRectangleVersionMap from '@cbhq/cds-illustrations/__generated__/spotRectangle/data/versionMap';
import spotSquareVersionMap from '@cbhq/cds-illustrations/__generated__/spotSquare/data/versionMap';

import { Divider, VStack } from '../../layout';
import { ThemeProvider } from '../../system/ThemeProvider';
import { defaultTheme } from '../../themes/defaultTheme';
import { Text } from '../../typography/Text';
import type { IllustrationNamesMap } from '../createIllustration';
import type {
  HeroSquareName,
  PictogramName,
  SpotIconName,
  SpotRectangleName,
  SpotSquareName,
} from '../index';
import { HeroSquare, Pictogram, SpotIcon, SpotRectangle, SpotSquare } from '../index';

function keys<T>(obj: { [key in keyof T]: T[key] }) {
  return Object.keys(obj) as unknown as Extract<keyof T, string>[];
}

const images = {
  heroSquare: keys(heroSquareVersionMap),
  pictogram: keys(pictogramVersionMap),
  spotRectangle: keys(spotRectangleVersionMap),
  spotSquare: keys(spotSquareVersionMap),
  spotIcon: keys(spotIconVersionMap),
};

export function getIllustrationSheet<Type extends IllustrationVariant>(type: Type) {
  /** Constants */
  const FLAT_LIST_STYLE = { width: '100%' } as const;
  const FLAT_LIST_CONTAINER_STYLE = {
    marginLeft: 24,
    paddingBottom: 24,
    alignContent: 'flex-start',
  } as const;
  const SCREEN_WIDTH = Dimensions.get('window').width - FLAT_LIST_CONTAINER_STYLE.marginLeft * 2;

  const SIZES = {
    pictogram: {
      height: illustrationSizes[illustrationDimensions.pictogram[0]][1],
      width: illustrationSizes[illustrationDimensions.pictogram[0]][0],
      scaleMultiplier: 1,
    },
    spotSquare: {
      height: illustrationSizes[illustrationDimensions.spotSquare[0]][1],
      width: illustrationSizes[illustrationDimensions.spotSquare[0]][0],
      scaleMultiplier: 0.4,
    },
    spotRectangle: {
      height: illustrationSizes[illustrationDimensions.spotRectangle[0]][1],
      width: illustrationSizes[illustrationDimensions.spotRectangle[0]][0],
      scaleMultiplier: 0.3,
    },
    heroSquare: {
      height: illustrationSizes[illustrationDimensions.heroSquare[0]][1],
      width: illustrationSizes[illustrationDimensions.heroSquare[0]][0],
      scaleMultiplier: 0.24,
    },
    spotIcon: {
      height: illustrationSizes[illustrationDimensions.spotIcon[0]][1],
      width: illustrationSizes[illustrationDimensions.spotIcon[0]][0],
      scaleMultiplier: 1,
    },
  };
  const ITEM_COLUMNS = Math.floor(SCREEN_WIDTH / (SIZES[type].width * SIZES[type].scaleMultiplier));

  type IllustrationName = IllustrationNamesMap[Type];

  const names = images[type] as IllustrationName[];
  type DataItem = { name: IllustrationName; colorScheme: ColorScheme };

  const data: DataItem[] = [];

  names.forEach((name) => {
    data.push({
      name,
      colorScheme: 'light' as const,
    });
    data.push({
      name,
      colorScheme: 'dark' as const,
    });
  });

  const ListFooterComponent = memo(function ListFooterComponent() {
    // TODO: pull from ui-mobile-playground/helpers/constants via scrollViewEnd constant
    return <Divider testID="mobile-playground-scrollview-end" />;
  });

  const renderItem = ({ item }: { item: DataItem }) => {
    const dim = `${SIZES[type].width}x${SIZES[type].height}` as const;

    return (
      <ThemeProvider activeColorScheme={item.colorScheme} theme={defaultTheme}>
        <VStack
          background="bg"
          overflow="hidden"
          width={SIZES[type].width * SIZES[type].scaleMultiplier}
        >
          {type === 'heroSquare' && (
            // render a 48x48 thumbnail
            <HeroSquare
              dimension={dim as HeroSquareDimension}
              name={item.name as HeroSquareName}
              scaleMultiplier={SIZES.heroSquare.scaleMultiplier}
            />
          )}
          {type === 'spotSquare' && (
            // render a 48x48 thumbnail
            <SpotSquare
              name={item.name as SpotSquareName}
              scaleMultiplier={SIZES.spotSquare.scaleMultiplier}
            />
          )}

          {type === 'spotRectangle' && (
            // render a 72x36 thumbnail
            <SpotRectangle
              name={item.name as SpotRectangleName}
              scaleMultiplier={SIZES.spotRectangle.scaleMultiplier}
            />
          )}
          {type === 'pictogram' && (
            <Pictogram
              dimension={dim as PictogramDimension}
              name={item.name as PictogramName}
              scaleMultiplier={SIZES.pictogram.scaleMultiplier}
            />
          )}
          {type === 'spotIcon' && (
            <SpotIcon
              dimension={dim as SpotIconDimension}
              name={item.name as SpotIconName}
              scaleMultiplier={SIZES.spotIcon.scaleMultiplier}
            />
          )}

          <Text ellipsize="tail" font="legal">
            {item.name}
          </Text>
        </VStack>
      </ThemeProvider>
    );
  };

  const IllustrationSheet = memo(function IllustrationSheet() {
    const getItemLayout = useCallback(function getItemLayout(
      _data: ArrayLike<DataItem> | null | undefined,
      index: number,
    ) {
      return {
        length: SIZES[type].height * SIZES[type].scaleMultiplier,
        offset: SIZES[type].height * SIZES[type].scaleMultiplier * index,
        index,
      };
    }, []);

    const keyExtractor = useCallback(function keyExtractor(item: DataItem) {
      return `${type}-${item.name}-${item.colorScheme}`;
    }, []);

    return (
      <VStack
        // TODO: pull from ui-mobile-playground/helpers/constants via screen constant
        alignItems="center"
        background="bg"
        flexGrow={1}
        justifyContent="center"
        testID="mobile-playground-screen"
      >
        <FlatList
          ListFooterComponent={ListFooterComponent}
          contentContainerStyle={FLAT_LIST_CONTAINER_STYLE}
          data={data}
          getItemLayout={getItemLayout}
          keyExtractor={keyExtractor}
          numColumns={ITEM_COLUMNS}
          renderItem={renderItem}
          style={FLAT_LIST_STYLE}
          // TODO: pull from ui-mobile-playground/helpers/constants via scrollView constant
          testID="mobile-playground-scrollview"
        />
      </VStack>
    );
  });

  return IllustrationSheet;
}
