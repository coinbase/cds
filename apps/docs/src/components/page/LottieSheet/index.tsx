import { useCallback, useState } from 'react';
import * as lottieAnimations from '@cbhq/cds-lottie-files';
import { Lottie } from '@cbhq/cds-web/animation';
import { SearchInput } from '@cbhq/cds-web/controls';
import { Box, Grid, VStack } from '@cbhq/cds-web/layout';
import { useToast } from '@cbhq/cds-web/overlays/useToast';
import { Pressable } from '@cbhq/cds-web/system';
import { Text } from '@cbhq/cds-web/typography';
import { sortByAlphabet } from '@site/src/utils/sortByAlphabet';
import { throttle } from 'lodash';

// Get all lottie animation names and sort them alphabetically
const animationEntries = Object.entries(lottieAnimations).filter(
  ([, value]) => typeof value === 'object' && value !== null && 'nm' in value,
);
const animationNames = animationEntries.map(([name]) => name).sort(sortByAlphabet);

const queryMatchesName = (query: string, name: string) => {
  const queryRe = new RegExp(query.trim().toLowerCase(), 'gi');
  return name.match(queryRe) !== null;
};

const LottieTile = ({ name }: { name: string }) => {
  const toast = useToast();
  const animationSource = lottieAnimations[name as keyof typeof lottieAnimations];

  const handleLottiePress = useCallback(() => {
    if (navigator) {
      void navigator.clipboard.writeText(name).then(() => {
        toast.show('Copied to clipboard');
      });
    }
  }, [name, toast]);

  return (
    <Pressable
      accessibilityLabel={`Copy ${name} animation name to clipboard`}
      background="bg"
      borderRadius={400}
      onClick={handleLottiePress}
      width="100%"
    >
      <VStack alignItems="center" gap={2} justifyContent="center" padding={1} width="100%">
        <Lottie autoplay loop height={200} source={animationSource} width={200} />
        <Text as="p" display="block" font="label2" textAlign="center">
          {name}
        </Text>
      </VStack>
    </Pressable>
  );
};

export const LottieSheet = () => {
  const [query, setQuery] = useState('');

  const searchOnChange = throttle((text: string) => {
    setQuery(text);
  }, 1000);

  const filteredNames = animationNames.filter((name) => queryMatchesName(query, name));
  const hasResults = filteredNames.length > 0;

  return (
    <Box background="bgAlternate" borderRadius={500} flexDirection="column" gap={2} padding={4}>
      <Box flexWrap="wrap">
        <SearchInput
          compact
          accessibilityLabel="Filter Lottie animations by name"
          onChangeText={searchOnChange}
          placeholder="Animation name"
          type="text"
          value={query}
        />
      </Box>

      <Box background="bg" borderRadius={500} padding={1}>
        {hasResults ? (
          <Grid
            columnMin="216px"
            gap={1}
            maxHeight={600}
            padding={1}
            style={{
              overflow: 'hidden',
              overflowY: 'auto',
            }}
            width="100%"
          >
            {filteredNames.map((name) => (
              <LottieTile key={name} name={name} />
            ))}
          </Grid>
        ) : (
          <Box alignItems="center" display="flex" justifyContent="center" padding={4} width="100%">
            <Text color="fg" font="legal">
              No results found
            </Text>
          </Box>
        )}
      </Box>
    </Box>
  );
};
