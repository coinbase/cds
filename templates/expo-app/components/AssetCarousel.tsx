import React from 'react';

import { useTheme } from '@coinbase/cds-mobile';
import { Carousel, CarouselItem } from '@coinbase/cds-mobile/carousel';
import { MediaCard } from '@coinbase/cds-mobile/cards';
import { RemoteImage } from '@coinbase/cds-mobile/media';
import { Text } from '@coinbase/cds-mobile/typography';
import { assets } from '@coinbase/cds-common/internal/data/assets';

const assetList = Object.values(assets);

export function AssetCarousel() {
  const theme = useTheme();
  const horizontalPadding = theme.space[2];
  const horizontalGap = theme.space[2];

  return (
    <Carousel
      loop
      paginationVariant="dot"
      title="Explore Assets"
      snapMode="item"
      styles={{
        root: { paddingHorizontal: horizontalPadding },
        carousel: { gap: horizontalGap },
      }}
    >
      {assetList.map((asset) => (
        <CarouselItem key={asset.symbol} id={asset.symbol} accessibilityLabel={asset.name}>
          <MediaCard
            renderAsPressable
            accessibilityLabel={`View ${asset.name} details`}
            thumbnail={
              <RemoteImage
                accessibilityLabel={asset.name}
                shape="circle"
                size="l"
                source={asset.imageUrl}
              />
            }
            title={asset.symbol}
            subtitle={asset.name}
            description={
              <Text font="label2" color="fgPositive" numberOfLines={1}>
                Explore
              </Text>
            }
            onPress={() => {}}
          />
        </CarouselItem>
      ))}
    </Carousel>
  );
}
