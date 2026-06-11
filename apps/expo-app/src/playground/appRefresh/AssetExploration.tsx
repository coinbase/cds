import React, { memo } from 'react';
import { ScrollView } from 'react-native';
import { Box, HStack, VStack } from '@coinbase/cds-mobile/layout';
import { Avatar } from '@coinbase/cds-mobile/media';
import { Text } from '@coinbase/cds-mobile/typography/Text';

const assetRows = [
  [
    { change: '↗ 3.25%', ticker: 'PUDGY' },
    { change: '↗ 5.11%', ticker: 'SUI' },
    { change: '↗ 1.51%', ticker: 'CQT' },
  ],
  [
    { change: '↗ 3.2%', ticker: 'TAO' },
    { change: '↗ 3.2%', ticker: 'MON' },
    { change: '↗ 3.2%', ticker: 'ZEC' },
  ],
];

const newCryptoRows = [
  [
    { metadata: '1m ago', name: 'BIPO', priceChange: '↗ 1.5%' },
    { metadata: '1h ago', name: 'Eyed Exchange', priceChange: '↗ 3.2%' },
    { metadata: '↗ 3.2%', name: 'HorseCoin', priceChange: '↗ 2.5%' },
    { metadata: '1h ago', name: 'Baby Vibing Cat Coin', priceChange: '↗ 1.5%' },
    { metadata: '2h ago', name: 'fetchr', priceChange: '↗ 2.5%' },
    { metadata: '3h ago', name: 'DIE', priceChange: '↗ 1.5%' },
  ],
  [
    { metadata: '5m ago', name: 'Brent on SOL', priceChange: '↘ 5.4%' },
    { metadata: '5m ago', name: 'Bigly', priceChange: '↗ 14.9%' },
    { metadata: '↗ 14.9%', name: 'Official Chicky Coin', priceChange: '↗ 2.5%' },
    { metadata: '1m ago', name: 'TORUS', priceChange: '↘ 8.4%' },
    { metadata: '2h ago', name: 'Clarity Protocol', priceChange: '↗ 3.2%' },
    { metadata: '5m ago', name: 'Bebe The Parrot', priceChange: '↘ 29.3%' },
    { metadata: '1h ago', name: 'Nemoclaw', priceChange: '↗ 3.2%' },
  ],
];

function AssetChip({ ticker, change }: { ticker: string; change: string }) {
  return (
    <Box
      bordered
      alignItems="center"
      background="bg"
      borderRadius={1000}
      flexDirection="row"
      gap={1}
      overflow="hidden"
      paddingEnd={2}
      paddingStart={1}
      paddingY={1}
    >
      <Avatar name={ticker} shape="circle" size="m" />
      <HStack alignItems="center" gap={0.5}>
        <Text font="label1">{ticker}</Text>
        <Text color="fgPositive" font="label2">
          {change}
        </Text>
      </HStack>
    </Box>
  );
}

function NewCryptoTile({
  name,
  priceChange,
}: {
  name: string;
  priceChange: string;
  metadata: string;
}) {
  const isPositive = priceChange.startsWith('↗');
  return (
    <Box
      bordered
      background="bg"
      borderRadius={300}
      overflow="hidden"
      paddingX={2}
      paddingY={2}
      width={130}
    >
      <VStack gap={1}>
        <Text font="headline" numberOfLines={2}>
          {name}
        </Text>
        <Text color={isPositive ? 'fgPositive' : 'fgNegative'} font="label2">
          {priceChange}
        </Text>
      </VStack>
    </Box>
  );
}

export const AssetExploration = memo(() => {
  return (
    <VStack gap={4}>
      <VStack gap={2}>
        <VStack gap={1}>
          {assetRows.map((row, i) => (
            <HStack key={i} gap={1}>
              {row.map((asset) => (
                <AssetChip key={asset.ticker} change={asset.change} ticker={asset.ticker} />
              ))}
            </HStack>
          ))}
        </VStack>
      </VStack>
      <VStack gap={2}>
        <VStack gap={1}>
          {newCryptoRows.map((row, i) => (
            <ScrollView key={i} horizontal showsHorizontalScrollIndicator={false}>
              <HStack gap={1}>
                {row.map((tile) => (
                  <NewCryptoTile
                    key={tile.name}
                    metadata={tile.metadata}
                    name={tile.name}
                    priceChange={tile.priceChange}
                  />
                ))}
              </HStack>
            </ScrollView>
          ))}
        </VStack>
      </VStack>
    </VStack>
  );
});

AssetExploration.displayName = 'AssetExploration';
