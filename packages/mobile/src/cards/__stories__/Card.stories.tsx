import React, { useCallback, useMemo, useState } from 'react';
import { announcementCards } from '@coinbase/cds-common/internal/data/announcementCards';
import { assets } from '@coinbase/cds-common/internal/data/assets';
import { avatars } from '@coinbase/cds-common/internal/data/avatars';
import { dataCards } from '@coinbase/cds-common/internal/data/dataCards';
import { featureEntryCards } from '@coinbase/cds-common/internal/data/featureEntryCards';
import { feedImages } from '@coinbase/cds-common/internal/data/feedImages';
import { loremIpsum } from '@coinbase/cds-common/internal/data/loremIpsum';

import { Button } from '../../buttons/Button';
import type { CellSpacing } from '../../cells/Cell';
import { CellMedia } from '../../cells/CellMedia';
import { ListCell } from '../../cells/ListCell';
import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { LoremIpsum } from '../../layout/__stories__/LoremIpsum';
import { Box } from '../../layout/Box';
import { VStack } from '../../layout/VStack';
import { AnnouncementCard } from '../AnnouncementCard';
import { Card } from '../Card';
import { CardGroup } from '../CardGroup';
import { DataCard } from '../DataCard';
import { FeatureEntryCard } from '../FeatureEntryCard';
import { FeedCard } from '../FeedCard';
import type { LikeButtonBaseProps } from '../LikeButton';

const onPressConsole = () => console.log('pressed');

const likeCounter = ({ count: countProp = 0, liked: likedProp }: LikeButtonBaseProps) => {
  return function useLikeButtonProps() {
    const [count, setCount] = useState(countProp);
    const [liked, setLiked] = useState(likedProp);
    const handleOnPress = useCallback(() => {
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
        onPress: handleOnPress,
        accessibilityLabel: `${count} likes, ${liked ? 'unlike' : 'like'}`,
      }),
      [liked, count, handleOnPress],
    );
  };
};

const sharedWrapperProps = {
  position: 'relative',
  width: '100%',
} as const;

const sharedProps = { padding: 2 } as const;
const sharedPressProps = { onPress: onPressConsole, ...sharedProps } as const;
const pinnedSharedProps = { ...sharedProps, elevation: 2 } as const;
const pinnedSharedWrapperProps = {
  ...sharedWrapperProps,
  height: 250,
} as const;

const innerSpacingConfig: CellSpacing = {
  paddingX: 1,
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
    onPress: onPressConsole,
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

const ListCellCard = () => (
  <React.Fragment>
    <VStack gap={2} {...sharedWrapperProps}>
      <Card accessibilityHint="Card" accessibilityLabel="Card" elevation={1}>
        {Array.from({ length: 4 }).map((_, i) => {
          return (
            <ListCell
              key={`card-cell-${i}`}
              description="Description"
              detail="$942,103"
              detailWidth={95}
              innerSpacing={innerSpacingConfig}
              intermediary={<CellMedia name="chartLine" type="icon" />}
              media={<CellMedia source={assets.eth.imageUrl} type="image" />}
              onPress={onPressConsole}
              subdetail="-2.34%"
              title="Title"
              variant="negative"
            />
          );
        })}
      </Card>
    </VStack>
  </React.Fragment>
);

const PressableCards = () => (
  <React.Fragment>
    <VStack gap={2} {...sharedWrapperProps}>
      <Card {...sharedPressProps} accessibilityHint="Card" accessibilityLabel="Card" elevation={0}>
        <LoremIpsum title="Elevation 0" />
      </Card>
      <Card {...sharedPressProps} accessibilityHint="Card" accessibilityLabel="Card" elevation={1}>
        <LoremIpsum title="Elevation 1" />
      </Card>
      <Card {...sharedPressProps} accessibilityHint="Card" accessibilityLabel="Card" elevation={2}>
        <LoremIpsum title="Elevation 2" />
      </Card>
      <Card
        {...sharedPressProps}
        accessibilityHint="Card"
        accessibilityLabel="Card"
        elevation={2}
        width="50%"
      >
        <LoremIpsum title="Half width" />
      </Card>
      <Card
        {...sharedPressProps}
        accessibilityHint="Card"
        accessibilityLabel="Card"
        elevation={2}
        size="medium"
      >
        <LoremIpsum title="Medium size" />
      </Card>
      <Card
        {...sharedPressProps}
        accessibilityHint="Card"
        accessibilityLabel="Card"
        borderRadius={400}
        elevation={1}
      >
        <LoremIpsum title="With Border Radius" />
      </Card>
    </VStack>
  </React.Fragment>
);

const PressableColoredCards = () => (
  <React.Fragment>
    <VStack gap={2} {...sharedWrapperProps}>
      <Card
        {...sharedPressProps}
        accessibilityHint="Card"
        accessibilityLabel="Card"
        background="bgPrimary"
      >
        <LoremIpsum color="fgInverse" title="Primary" />
      </Card>

      <Card
        {...sharedPressProps}
        accessibilityHint="Card"
        accessibilityLabel="Card"
        background="bgPositive"
      >
        <LoremIpsum color="fgInverse" title="Positive" />
      </Card>

      <Card
        {...sharedPressProps}
        accessibilityHint="Card"
        accessibilityLabel="Card"
        background="bgNegative"
      >
        <LoremIpsum color="fgInverse" title="Negative" />
      </Card>
    </VStack>
  </React.Fragment>
);

const NonClickableCards = () => (
  <React.Fragment>
    <VStack gap={2} {...sharedWrapperProps}>
      <Card {...sharedProps} accessibilityHint="Card" accessibilityLabel="Card" elevation={1}>
        <LoremIpsum title="Elevation 1" />
        <Button variant="secondary">Secondary button</Button>
      </Card>

      <Card {...sharedProps} accessibilityHint="Card" accessibilityLabel="Card" elevation={2}>
        <LoremIpsum title="Elevation 2" />
        <Button variant="secondary">Secondary button</Button>
      </Card>
    </VStack>
  </React.Fragment>
);

const NonClickableColoredCards = () => (
  <React.Fragment>
    <VStack gap={2} {...sharedWrapperProps}>
      <Card
        {...sharedProps}
        accessibilityHint="Card"
        accessibilityLabel="Card"
        background="bgPrimary"
      >
        <LoremIpsum color="fgInverse" title="Primary" />
      </Card>

      <Card
        {...sharedProps}
        accessibilityHint="Card"
        accessibilityLabel="Card"
        background="bgPositive"
      >
        <LoremIpsum color="fgInverse" title="Positive" />
      </Card>

      <Card
        {...sharedProps}
        accessibilityHint="Card"
        accessibilityLabel="Card"
        background="bgNegative"
      >
        <LoremIpsum color="fgInverse" title="Negative" />
      </Card>
    </VStack>
  </React.Fragment>
);

const PinnedTopCard = () => (
  <React.Fragment>
    <Box {...pinnedSharedWrapperProps} background="bgAlternate">
      <Card {...pinnedSharedProps} accessibilityHint="Card" accessibilityLabel="Card" pin="top">
        <LoremIpsum concise title="Top" />
      </Card>
    </Box>
  </React.Fragment>
);

const PinnedRightCard = () => (
  <React.Fragment>
    <Box {...pinnedSharedWrapperProps} background="bgAlternate">
      <Card {...pinnedSharedProps} accessibilityHint="Card" accessibilityLabel="Card" pin="right">
        <LoremIpsum concise title="Right" />
      </Card>
    </Box>
  </React.Fragment>
);

const PinnedBottomCard = () => (
  <React.Fragment>
    <Box {...pinnedSharedWrapperProps} background="bgAlternate">
      <Card {...pinnedSharedProps} accessibilityHint="Card" accessibilityLabel="Card" pin="bottom">
        <LoremIpsum concise title="Bottom" />
      </Card>
    </Box>
  </React.Fragment>
);

const PinnedLeftCard = () => (
  <React.Fragment>
    <Box {...pinnedSharedWrapperProps} background="bgAlternate">
      <Card {...pinnedSharedProps} accessibilityHint="Card" accessibilityLabel="Card" pin="left">
        <LoremIpsum concise title="Left" />
      </Card>
    </Box>
  </React.Fragment>
);

const CardScreen = () => {
  return (
    <ExampleScreen>
      <Example title="Data Card">
        <CardGroup>
          {dataCards.map((item) => (
            <DataCard {...item} />
          ))}
        </CardGroup>
      </Example>
      <Example title="Feed Card">
        <CardGroup>
          {feedCards.map(({ like: getLikeProps, ...item }) => (
            <FeedCard {...item} like={getLikeProps()} />
          ))}
        </CardGroup>
      </Example>
      <Example title="Announcement Card">
        <CardGroup>
          {announcementCards.map((item) => (
            <AnnouncementCard {...item} />
          ))}
        </CardGroup>
      </Example>
      <Example title="Feature Entry Card">
        <CardGroup>
          {featureEntryCards.map((item) => (
            <FeatureEntryCard {...item} />
          ))}
        </CardGroup>
      </Example>
      <Example title="Card with ListCells">
        <ListCellCard />
      </Example>
      <Example title="Clickable Cards">
        <PressableCards />
      </Example>
      <Example title="Clickable colored Cards">
        <PressableColoredCards />
      </Example>
      <Example title="Non-clickable Cards">
        <NonClickableCards />
      </Example>
      <Example title="Non-clickable colored Cards">
        <NonClickableColoredCards />
      </Example>
      <Example title="Pinned - top">
        <PinnedTopCard />
      </Example>
      <Example title="Pinned - right">
        <PinnedRightCard />
      </Example>
      <Example title="Pinned - bottom">
        <PinnedBottomCard />
      </Example>
      <Example title="Pinned - left">
        <PinnedLeftCard />
      </Example>
    </ExampleScreen>
  );
};

export default CardScreen;
