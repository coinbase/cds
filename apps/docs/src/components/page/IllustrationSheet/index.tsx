import React, { useCallback, useState } from 'react';
import type {
  HeroSquareDimension,
  IllustrationVariant,
  PictogramDimension,
  SpotIconDimension,
} from '@coinbase/cds-common';
import type { TabValue } from '@coinbase/cds-common/tabs/useTabs';
import {
  illustrationDimensionDefaults,
  illustrationDimensions,
} from '@coinbase/cds-common/tokens/illustrations';
import heroSquareDescriptionMap from '@coinbase/cds-illustrations/__generated__/heroSquare/data/descriptionMap';
import heroSquareNames from '@coinbase/cds-illustrations/__generated__/heroSquare/data/names';
import pictogramDescriptionMap from '@coinbase/cds-illustrations/__generated__/pictogram/data/descriptionMap';
import pictogramNames from '@coinbase/cds-illustrations/__generated__/pictogram/data/names';
import spotIconDescriptionMap from '@coinbase/cds-illustrations/__generated__/spotIcon/data/descriptionMap';
import spotIconNames from '@coinbase/cds-illustrations/__generated__/spotIcon/data/names';
import spotRectangleDescriptionMap from '@coinbase/cds-illustrations/__generated__/spotRectangle/data/descriptionMap';
import spotRectangleNames from '@coinbase/cds-illustrations/__generated__/spotRectangle/data/names';
import spotSquareDescriptionMap from '@coinbase/cds-illustrations/__generated__/spotSquare/data/descriptionMap';
import spotSquareNames from '@coinbase/cds-illustrations/__generated__/spotSquare/data/names';
import { SearchInput } from '@coinbase/cds-web/controls/SearchInput';
import { Select } from '@coinbase/cds-web/controls/Select';
import { SelectOption } from '@coinbase/cds-web/controls/SelectOption';
import type {
  HeroSquareName,
  PictogramName,
  SpotIconName,
  SpotRectangleName,
  SpotSquareName,
} from '@coinbase/cds-web/illustrations';
import {
  HeroSquare,
  Pictogram,
  SpotIcon,
  SpotRectangle,
  SpotSquare,
} from '@coinbase/cds-web/illustrations';
import { Box, Grid, VStack } from '@coinbase/cds-web/layout';
import { useToast } from '@coinbase/cds-web/overlays/useToast';
import { Pressable } from '@coinbase/cds-web/system';
import { Text } from '@coinbase/cds-web/typography';
import throttle from 'lodash/throttle';

import { SheetTabs } from '../SheetTabs';

import styles from './styles.module.css';

const variantToNamesMap = {
  heroSquare: heroSquareNames,
  spotRectangle: spotRectangleNames,
  spotSquare: spotSquareNames,
  pictogram: pictogramNames,
  spotIcon: spotIconNames,
};

const descriptionMap = {
  heroSquare: heroSquareDescriptionMap,
  spotRectangle: spotRectangleDescriptionMap,
  spotSquare: spotSquareDescriptionMap,
  pictogram: pictogramDescriptionMap,
  spotIcon: spotIconDescriptionMap,
};

/**
 * If the query is the description of an illustration, we need
 * to find the name of the illustration that has the description
 * of the query.
 * @param query - the user search term
 * @param name - the name of the illustration that is being matched with
 * @returns returns true if query is a description of this illustration
 */
const queryHasMatchingDescription = (type: IllustrationVariant, query: string, name: string) => {
  const descriptionMapForType = descriptionMap[type];
  if (query === '') return true;

  if (query in descriptionMapForType) {
    return descriptionMapForType[query].includes(name);
  }

  return false;
};

/**
 * Determines whether the query is a subset of the name.
 * i.e If the name is contract, and query is con, this would return
 * true.
 * @param query - the user search term
 * @param name - the name of the illustration that is being matched with
 * @returns true if query is a subset of name of this illustration
 */
const queryIsSubsetOfName = (query: string, name: string) => {
  if (query === '') return true;

  const queryRe = new RegExp(query.trim().toLowerCase(), 'gi');

  return queryRe.test(name);
};

export const getOverflowTextStyles = (expanded: boolean) =>
  expanded ? styles.overflow : styles.truncated;

const IllustrationTile = ({
  name,
  variant,
  width,
  dimension,
  idx,
}: {
  name: string;
  variant: IllustrationVariant;
  width: number;
  dimension: string;
  idx: number;
}) => {
  const [shouldOverflow, setShouldOverflow] = useState(false);
  const overflowStyles = getOverflowTextStyles(shouldOverflow);
  const widthString = `${width}px`;
  const heightString = `${width + 20}px`;
  const zIndex = variantToNamesMap[variant].length - idx + 2;
  const toast = useToast();

  const handleCopyToClipboard = useCallback(() => {
    if (navigator) {
      void navigator.clipboard.writeText(name).then(() => {
        toast.show('Copied to clipboard');
      });
    }
  }, [name, toast]);

  return (
    <Pressable
      background="transparent"
      className={styles.tile}
      height={heightString}
      onClick={handleCopyToClipboard}
      width={widthString}
    >
      <VStack
        key={name}
        alignItems="center"
        background="bg"
        height={heightString}
        left={0}
        onMouseEnter={() => setShouldOverflow(true)}
        onMouseLeave={() => setShouldOverflow(false)}
        position="absolute"
        top={0}
        width={widthString}
        zIndex={zIndex}
      >
        {variant === 'heroSquare' && (
          <HeroSquare dimension={dimension as HeroSquareDimension} name={name as HeroSquareName} />
        )}
        {variant === 'spotSquare' && <SpotSquare name={name as SpotSquareName} />}
        {variant === 'spotRectangle' && <SpotRectangle name={name as SpotRectangleName} />}
        {variant === 'pictogram' && (
          <Pictogram dimension={dimension as PictogramDimension} name={name as PictogramName} />
        )}
        {variant === 'spotIcon' && (
          <SpotIcon dimension={dimension as SpotIconDimension} name={name as SpotIconName} />
        )}

        <Text as="p" className={overflowStyles} font="legal" textAlign="center">
          {name}
        </Text>
      </VStack>
    </Pressable>
  );
};

export const IllustrationSheet = ({ variant }: { variant: IllustrationVariant }) => {
  const [query, setQuery] = useState('');
  const names = variantToNamesMap[variant];
  const dimensions = illustrationDimensions[variant];
  const defaultValue = illustrationDimensionDefaults[variant];
  const [activeTab, setActiveTab] = useState<TabValue | null>({
    id: defaultValue,
    label: defaultValue,
  });

  const searchOnChange = throttle((text: string) => {
    setQuery(text);
  }, 1000);

  const tabs = dimensions.map((dimension) => ({
    id: dimension,
    label: dimension,
  }));

  const handleTabChange = useCallback((tab: TabValue | null) => {
    setActiveTab(tab);
  }, []);

  return (
    <VStack background="bgAlternate" gap={2}>
      <SearchInput
        compact
        accessibilityLabel="Filter illustrations by name"
        clearIconAccessibilityLabel="Clear search"
        onChangeText={searchOnChange}
        placeholder="Search by name or description"
        startIconAccessibilityLabel="Search"
        type="text"
        value={query}
      />
      <VStack gap={2}>
        <Box gap={1} paddingStart={2}>
          <Text color="fgMuted" font="body">
            dimension prop:
          </Text>
          <SheetTabs
            accessibilityLabel="Select illustration dimension"
            activeTab={activeTab}
            onChange={handleTabChange}
            tabs={tabs}
          />
        </Box>

        {dimensions.map((dimension) => {
          const width = parseInt(dimension.split('x')[0]);
          const filteredNames = names.filter(
            (name) =>
              queryHasMatchingDescription(variant, query, name) || queryIsSubsetOfName(query, name),
          );

          return (
            <Box
              key={dimension}
              background="bg"
              borderRadius={500}
              display={activeTab?.id === dimension ? 'block' : 'none'}
              padding={2}
            >
              {filteredNames.length > 0 ? (
                <Grid columnMin={`${width}px`} gap={2} maxHeight={560} overflow="scroll">
                  {filteredNames.map((filteredName, idx) => (
                    <IllustrationTile
                      key={filteredName}
                      dimension={dimension}
                      idx={idx}
                      name={filteredName}
                      variant={variant}
                      width={width}
                    />
                  ))}
                </Grid>
              ) : (
                <VStack alignItems="center" paddingY={4}>
                  <Text color="fg" font="legal">
                    No results found
                  </Text>
                </VStack>
              )}
            </Box>
          );
        })}
      </VStack>
    </VStack>
  );
};
