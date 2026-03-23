import React from 'react';
import { Dimensions } from 'react-native';

import { useTheme } from '@coinbase/cds-mobile';
import { Carousel, CarouselItem } from '@coinbase/cds-mobile/carousel';
import { MessagingCard } from '@coinbase/cds-mobile/cards';
import { Pictogram } from '@coinbase/cds-mobile/illustrations';
import { Button } from '@coinbase/cds-mobile/buttons';

export function CardList() {
  const theme = useTheme();
  const windowWidth = Dimensions.get('window').width;
  const horizontalPadding = theme.space[2];
  const horizontalGap = theme.space[2];
  const carouselWidth = windowWidth - horizontalPadding * 2;
  const itemWidth = (carouselWidth - horizontalGap) / 1.1;

  return (
    <Carousel
      paginationVariant="dot"
      title="For you"
      styles={{
        root: { paddingHorizontal: horizontalPadding },
        carousel: { gap: horizontalGap },
      }}
    >
      <CarouselItem id="recurring-buys" width={itemWidth} accessibilityLabel="Recurring buys">
        <MessagingCard
          type="upsell"
          title="Recurring buys"
          description="Set up automatic purchases for your favorite assets on a daily, weekly, or monthly schedule."
          media={
            <Pictogram
              accessibilityLabel="Recurring purchases"
              dimension="48x48"
              name="recurringPurchases"
            />
          }
          mediaPlacement="end"
          action="Get started"
          onActionButtonPress={() => {}}
          onDismissButtonPress={() => {}}
        />
      </CarouselItem>

      <CarouselItem id="earn-rewards" width={itemWidth} accessibilityLabel="Earn rewards">
        <MessagingCard
          type="nudge"
          title="Earn rewards"
          description="Earn up to 3.29% APR on your ETH by staking it on Coinbase."
          media={<Pictogram accessibilityLabel="Wallet" dimension="48x48" name="wallet" />}
          mediaPlacement="end"
          action={
            <Button variant="secondary" compact>
              Start earning
            </Button>
          }
          onDismissButtonPress={() => {}}
        />
      </CarouselItem>

      <CarouselItem id="learn-crypto" width={itemWidth} accessibilityLabel="Learn about crypto">
        <MessagingCard
          type="upsell"
          title="Learn & earn"
          description="Watch short videos and earn free crypto while learning about blockchain."
          media={
            <Pictogram
              accessibilityLabel="Learning"
              dimension="48x48"
              name="learningRewardsProduct"
            />
          }
          mediaPlacement="end"
          action="Start learning"
          onActionButtonPress={() => {}}
          onDismissButtonPress={() => {}}
        />
      </CarouselItem>
    </Carousel>
  );
}
