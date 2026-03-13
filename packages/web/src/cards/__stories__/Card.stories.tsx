import React, { useCallback, useMemo, useState } from 'react';
import { announcementCards } from '@coinbase/cds-common/internal/data/announcementCards';
import { avatars } from '@coinbase/cds-common/internal/data/avatars';
import { dataCards } from '@coinbase/cds-common/internal/data/dataCards';
import { featureEntryCards } from '@coinbase/cds-common/internal/data/featureEntryCards';
import { feedImages } from '@coinbase/cds-common/internal/data/feedImages';
import { loremIpsum } from '@coinbase/cds-common/internal/data/loremIpsum';
import { baseConfig, storyBuilder } from '@coinbase/cds-common/internal/utils/storyBuilder';

import { Button } from '../../buttons';
import { Box, VStack } from '../../layout';
import { LoremIpsum } from '../../layout/__stories__/LoremIpsum';
import type { AnnouncementCardProps } from '../AnnouncementCard';
import { AnnouncementCard as AnnouncementCardComponent } from '../AnnouncementCard';
import { Card } from '../Card';
import { CardGroup } from '../CardGroup';
import { DataCard as DataCardComponent } from '../DataCard';
import { FeatureEntryCard as FeatureEntryCardComponent } from '../FeatureEntryCard';
import type { FeedCardProps } from '../FeedCard';
import { FeedCard as FeedCardComponent } from '../FeedCard';
import type { LikeButtonBaseProps } from '../LikeButton';

const cardParameters = {
  /**
   * TODO: Remove this percy skip
   */
  percy: { skip: true },
  wrapper: CardGroup,
  wrapperProps: { background: 'bg', borderedBottom: true },
} as const;
const builder = storyBuilder({ parameters: cardParameters });

/* -------------------------------------------------------------------------- */
/*                             Announcement Cards                             */
/* -------------------------------------------------------------------------- */
const announcementCardBuilder = builder(AnnouncementCardComponent);

export const AnnouncementCard = announcementCardBuilder.build(
  announcementCards[0] as AnnouncementCardProps,
);
export const AnnouncementCards = announcementCardBuilder.buildSheet(
  announcementCards as AnnouncementCardProps[],
);

/* -------------------------------------------------------------------------- */
/*                             FeatureEntry Cards                             */
/* -------------------------------------------------------------------------- */
const featureEntryCardBuilder = builder(FeatureEntryCardComponent);

export const FeatureEntryCard = featureEntryCardBuilder.build(featureEntryCards[0]);
export const FeatureEntryCards = featureEntryCardBuilder.buildSheet(featureEntryCards);

/* -------------------------------------------------------------------------- */
/*                                 Feed Cards                                 */
/* -------------------------------------------------------------------------- */
const likeCounter = ({ count: countProp = 0, liked: likedProp }: LikeButtonBaseProps) => {
  return function useLikeButtonProps() {
    const [count, setCount] = useState(countProp);
    const [liked, setLiked] = useState(likedProp);
    const handleOnClick = useCallback(() => {
      if (liked) {
        setCount((prev) => prev - 1);
        setLiked(false);
      } else {
        setCount((prev) => prev + 1);
        setLiked(true);
      }
    }, [liked]);

    return useMemo(
      () => ({
        liked,
        count,
        onClick: handleOnClick,
        accessibilityLabel: `${count} likes, ${liked ? 'unlike' : 'like'}`,
      }),
      [liked, count, handleOnClick],
    );
  };
};

const defaultProps = {
  avatar: avatars[0],
  author: 'Author Name',
  metadata: 'News • Dec 18',
  title: 'Title',
  description: loremIpsum,
  image: feedImages[0],
  headerAction: {
    name: 'more',
    onClick: () => console.log('clicked'),
  },
  like: likeCounter({
    liked: false,
    count: 10,
  }),
  share: {},
  cta: {
    children: 'View ETH',
  },
} as const;

const feedCards = [
  {
    ...defaultProps,
    key: 'card1',
    title: 'Russia Values Local Crypto at $200 Billion as Rules Near',
  } as const,
  {
    ...defaultProps,
    key: 'card2',
    avatar: avatars[1],
    image: feedImages[1],
    title: 'Reddit co-founder raises $500 million fund for crypto startups: report',
    description:
      '776 Management, the VC firm owned by Reddit co-founder Alexis Ohanian, has raised $500 million for two new funds primarily focused on...',
    like: likeCounter({
      liked: true,
      count: 3,
    }),
    comment: {},
  } as const,
];

export const FeedCard = ({ ...props }: FeedCardProps) => {
  return (
    <FeedCardComponent
      background="bg"
      {...feedCards[0]}
      like={feedCards[0].like() as LikeButtonBaseProps}
      maxWidth={800}
      {...props}
    />
  );
};

FeedCard.bind({});
FeedCard.args = baseConfig.args;
FeedCard.argTypes = baseConfig.argTypes;
FeedCard.parameters = {
  ...baseConfig.parameters,
  ...cardParameters,
};

export const FeedCards = () => {
  return (
    <CardGroup>
      {feedCards.map(({ like: getLikeProps, ...item }) => (
        <FeedCardComponent {...item} like={getLikeProps()} maxWidth={800} />
      ))}
    </CardGroup>
  );
};

FeedCards.bind({});
FeedCards.args = FeedCard.args;
FeedCards.parameters = FeedCard.parameters;
FeedCards.argTypes = FeedCard.argTypes;

// below is copied from cardBuilder.tsx
const sharedWrapperProps = {
  position: 'relative',
  width: '100%',
} as const;

const sharedProps = { padding: 2 } as const;
const sharedPressProps = { onClick: () => {}, ...sharedProps } as const;
const pinnedSharedProps = { ...sharedProps, elevation: 2 } as const;
const pinnedSharedWrapperProps = {
  ...sharedWrapperProps,
  height: 250,
} as const;

const PressableCards = () => (
  <VStack gap={2} {...sharedWrapperProps}>
    <Card {...sharedPressProps} elevation={0}>
      <LoremIpsum title="Elevation 0" />
    </Card>
    <Card {...sharedPressProps} elevation={1}>
      <LoremIpsum title="Elevation 1" />
    </Card>
    <Card {...sharedPressProps} elevation={2}>
      <LoremIpsum title="Elevation 2" />
    </Card>
    <Card {...sharedPressProps} elevation={2} width="50%">
      <LoremIpsum title="Half width" />
    </Card>
    <Card {...sharedPressProps} elevation={2} size="medium">
      <LoremIpsum title="Medium size" />
    </Card>
    <Card {...sharedPressProps} borderRadius={400} elevation={1}>
      <LoremIpsum title="With Border Radius" />
    </Card>
  </VStack>
);

const PressableColoredCards = () => (
  <VStack gap={2} {...sharedWrapperProps}>
    <Card {...sharedPressProps} background="bgPrimary">
      <LoremIpsum color="fgInverse" title="Primary" />
    </Card>

    <Card {...sharedPressProps} background="bgPositive">
      <LoremIpsum color="fgInverse" title="Positive" />
    </Card>

    <Card {...sharedPressProps} background="bgNegative">
      <LoremIpsum color="fgInverse" title="Negative" />
    </Card>
  </VStack>
);

const NonClickableCards = () => (
  <VStack gap={2} {...sharedWrapperProps}>
    <Card {...sharedProps} elevation={1}>
      <LoremIpsum title="Elevation 1" />
      <Button variant="secondary">Secondary button</Button>
    </Card>

    <Card {...sharedProps} elevation={2}>
      <LoremIpsum title="Elevation 2" />
      <Button variant="secondary">Secondary button</Button>
    </Card>
  </VStack>
);

const NonClickableColoredCards = () => (
  <VStack gap={2} {...sharedWrapperProps}>
    <Card {...sharedProps} background="bgPrimary">
      <LoremIpsum color="fgInverse" title="Primary" />
    </Card>

    <Card {...sharedProps} background="bgPositive">
      <LoremIpsum color="fgInverse" title="Positive" />
    </Card>

    <Card {...sharedProps} background="bgNegative">
      <LoremIpsum color="fgInverse" title="Negative" />
    </Card>
  </VStack>
);

const PinnedTopCard = () => (
  <Box {...pinnedSharedWrapperProps} background="bgAlternate">
    <Card {...pinnedSharedProps} pin="top">
      <LoremIpsum concise title="Top" />
    </Card>
  </Box>
);

const PinnedRightCard = () => (
  <Box {...pinnedSharedWrapperProps} background="bgAlternate">
    <Card {...pinnedSharedProps} pin="right">
      <LoremIpsum concise title="Right" />
    </Card>
  </Box>
);

const PinnedBottomCard = () => (
  <Box {...pinnedSharedWrapperProps} background="bgAlternate">
    <Card {...pinnedSharedProps} pin="bottom">
      <LoremIpsum concise title="Bottom" />
    </Card>
  </Box>
);

const PinnedLeftCard = () => (
  <Box {...pinnedSharedWrapperProps} background="bgAlternate">
    <Card {...pinnedSharedProps} pin="left">
      <LoremIpsum concise title="Left" />
    </Card>
  </Box>
);

export {
  NonClickableCards,
  NonClickableColoredCards,
  PinnedBottomCard,
  PinnedLeftCard,
  PinnedRightCard,
  PinnedTopCard,
  PressableCards,
  PressableColoredCards,
};

export default {
  title: 'Components/Cards',
  component: FeedCard,
};
