import React from 'react';

import { VStack } from '@coinbase/cds-mobile/layout';
import { Text } from '@coinbase/cds-mobile/typography';
import { ListCell } from '@coinbase/cds-mobile/cells';
import { Avatar } from '@coinbase/cds-mobile/media';
import { assets as cdsAssets } from '@coinbase/cds-common/internal/data/assets';

const assetData = [
  {
    key: 'btc',
    name: 'Bitcoin',
    symbol: 'BTC',
    price: '$67,432.18',
    change: '+2.41%',
  },
  {
    key: 'eth',
    name: 'Ethereum',
    symbol: 'ETH',
    price: '$3,521.90',
    change: '+1.83%',
  },
  {
    key: 'ada',
    name: 'Cardano',
    symbol: 'ADA',
    price: '$0.6231',
    change: '-0.82%',
  },
] as const;

type AssetKey = keyof typeof cdsAssets;

export function AssetList() {
  return (
    <VStack gap={0}>
      <Text font="title3" style={{ paddingVertical: 8 }}>
        Your assets
      </Text>
      {assetData.map((asset) => {
        const cdsAsset = cdsAssets[asset.key as AssetKey];
        return (
          <ListCell
            key={asset.symbol}
            title={asset.name}
            subtitle={asset.symbol}
            detail={asset.price}
            subdetail={
              <Text
                font="label2"
                color={asset.change.startsWith('+') ? 'fgPositive' : 'fgNegative'}
              >
                {asset.change}
              </Text>
            }
            media={
              <Avatar src={cdsAsset?.imageUrl ?? ''} name={asset.name} size="l" shape="circle" />
            }
            accessory="arrow"
            onPress={() => {}}
          />
        );
      })}
    </VStack>
  );
}
