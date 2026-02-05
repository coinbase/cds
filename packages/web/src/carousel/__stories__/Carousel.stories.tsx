import React, { memo } from 'react';
import { assets, coinbaseOneLogo } from '@coinbase/cds-common/internal/data/assets';
import { css } from '@linaria/core';

import { Button } from '../../buttons/Button';
import { IconButton } from '../../buttons/IconButton';
import { ContainedAssetCard, NudgeCard, UpsellCard } from '../../cards';
import { Box, HStack, VStack } from '../../layout';
import { RemoteImage } from '../../media';
import { Pressable } from '../../system/Pressable';
import { Link, Text } from '../../typography';
import { Carousel } from '../Carousel';
import { CarouselItem } from '../CarouselItem';
import { DefaultCarouselNavigation } from '../DefaultCarouselNavigation';
import {
  DefaultCarouselPagination,
  type DefaultCarouselPaginationProps,
} from '../DefaultCarouselPagination';

export default {
  title: 'Components/Carousel',
  component: Carousel,
};

const SampleCard = ({ text }: { text: string }) => (
  <Box
    alignItems="center"
    borderRadius={200}
    height="12rem"
    justifyContent="center"
    style={{
      background: 'rgb(var(--blue0))',
      border: '1px dashed rgb(var(--blue20))',
    }}
    width="100%"
  >
    <Text as="p" color="fgPrimary" font="label1">
      {text}
    </Text>
  </Box>
);

const SampleUpsellCard = ({ isVisible }: { isVisible?: boolean }) => (
  <UpsellCard
    action={
      <Button
        compact
        flush="start"
        numberOfLines={1}
        onClick={() => console.log('pressed')}
        tabIndex={isVisible ? undefined : -1}
        variant="secondary"
      >
        Buy Bitcoin now
      </Button>
    }
    description="Check out the most popular assets"
    media={<img alt="" draggable={false} src={coinbaseOneLogo as string} width={120} />}
    title="Headline"
    width="100%"
  />
);

const sampleItems = [
  <SampleCard key="1" text="Slide 1" />,
  <SampleCard key="2" text="Slide 2" />,
  <SampleCard key="3" text="Slide 3" />,
  <SampleCard key="4" text="Slide 4" />,
  <SampleCard key="5" text="Slide 5" />,
  <SampleCard key="6" text="Slide 6" />,
  <SampleCard key="7" text="Slide 7" />,
  <SampleCard key="8" text="Slide 8" />,
  <SampleCard key="9" text="Slide 9" />,
  <SampleCard key="10" text="Slide 10" />,
  /*<SampleCard key="11" text="Slide 11" />,
  <SampleCard key="12" text="Slide 12" />,
  <SampleCard key="13" text="Slide 13" />,
  <SampleCard key="14" text="Slide 14" />,
  <SampleCard key="15" text="Slide 15" />,
  <SampleCard key="16" text="Slide 16" />,
  <SampleCard key="17" text="Slide 17" />,
  <SampleCard key="18" text="Slide 18" />,
  <SampleCard key="19" text="Slide 19" />,
  <SampleCard key="20" text="Slide 20" />,
  <SampleCard key="21" text="Slide 21" />,
  <SampleCard key="22" text="Slide 22" />,
  <SampleCard key="23" text="Slide 23" />,
  <SampleCard key="24" text="Slide 24" />,
  <SampleCard key="25" text="Slide 25" />,
  <SampleCard key="26" text="Slide 26" />,
  <SampleCard key="27" text="Slide 27" />,
  <SampleCard key="28" text="Slide 28" />,
  <SampleCard key="29" text="Slide 29" />,
  <SampleCard key="30" text="Slide 30" />,*/
];

const gapOnlyStyles = {
  carousel: {
    gap: 'var(--space-2)',
  },
};

const overflowStyles = {
  ...gapOnlyStyles,
  root: {
    paddingInline: 'var(--space-3)',
  },
};

const NegativeMargin = ({ children }: { children: React.ReactNode }) => (
  <Box marginX={-2}>{children}</Box>
);

const SeeAllComponent = () => (
  <Text font="headline" paddingEnd={2}>
    <Link openInNewWindow href="https://coinbase.com/">
      See all
    </Link>
  </Text>
);

const SquareAssetCard = ({
  imageUrl,
  name,
  isVisible,
  colorVisibility,
  onClick,
}: {
  imageUrl: string;
  name: string;
  isVisible?: boolean;
  colorVisibility?: boolean;
  onClick?: () => void;
}) => (
  <ContainedAssetCard
    description={
      <Text as="p" color="fgPositive" font="label2" numberOfLines={2}>
        &#x2197;6.37%
      </Text>
    }
    header={<RemoteImage draggable={false} height="32px" source={imageUrl} width="32px" />}
    onClick={onClick}
    style={
      colorVisibility
        ? { backgroundColor: isVisible ? 'var(--color-fgPositive)' : 'var(--color-fgNegative)' }
        : undefined
    }
    subtitle={name}
    tabIndex={isVisible ? undefined : -1}
    title="$0.87"
  />
);

const BasicExamples = () => (
  <VStack gap={4}>
    <NegativeMargin>
      <Carousel paginationVariant="dot" styles={overflowStyles} title="Snap Page">
        {sampleItems.map((item, index) => (
          <CarouselItem
            key={`spaced-${index}`}
            id={`spaced-${index}`}
            width="calc((100% - 2 * var(--space-2)) / 3)"
          >
            {item}
          </CarouselItem>
        ))}
      </Carousel>
    </NegativeMargin>
    <NegativeMargin>
      <Carousel
        drag="snap"
        paginationVariant="dot"
        snapMode="item"
        styles={overflowStyles}
        title="Snap Item"
      >
        {sampleItems.map((item, index) => (
          <CarouselItem
            key={`snap-${index}`}
            id={`snap-${index}`}
            width="calc((100% - 2 * var(--space-2)) / 3)"
          >
            {item}
          </CarouselItem>
        ))}
      </Carousel>
    </NegativeMargin>
    <NegativeMargin>
      <Carousel
        loop
        NavigationComponent={SeeAllComponent}
        drag="free"
        paginationVariant="dot"
        snapMode="item"
        styles={overflowStyles}
        title="Square Items Carousel"
      >
        {Object.values(assets).map((asset) => (
          <CarouselItem key={asset.symbol} accessibilityLabel={asset.name} id={asset.symbol}>
            {({ isVisible }) => (
              <SquareAssetCard
                imageUrl={asset.imageUrl}
                isVisible={isVisible}
                name={asset.symbol}
                onClick={() => console.log(`${asset.symbol} clicked`)}
              />
            )}
          </CarouselItem>
        ))}
      </Carousel>
    </NegativeMargin>
    <Carousel
      drag="snap"
      paginationVariant="dot"
      snapMode="page"
      styles={gapOnlyStyles}
      title={
        <Text as="h3" font="title2">
          Full Width Cards
        </Text>
      }
    >
      <CarouselItem id="upsell-1" width="100%">
        {({ isVisible }) => <SampleUpsellCard isVisible={isVisible} />}
      </CarouselItem>
      <CarouselItem id="upsell-2" width="100%">
        {({ isVisible }) => <SampleUpsellCard isVisible={isVisible} />}
      </CarouselItem>
      <CarouselItem id="upsell-3" width="100%">
        {({ isVisible }) => <SampleUpsellCard isVisible={isVisible} />}
      </CarouselItem>
      <CarouselItem id="upsell-4" width="100%">
        {({ isVisible }) => <SampleUpsellCard isVisible={isVisible} />}
      </CarouselItem>
      <CarouselItem id="upsell-5" width="100%">
        {({ isVisible }) => <SampleUpsellCard isVisible={isVisible} />}
      </CarouselItem>
    </Carousel>
    <Carousel
      drag="none"
      paginationVariant="dot"
      styles={gapOnlyStyles}
      title="Navigation Only (No Drag)"
    >
      {sampleItems.slice(0, 4).map((item, index) => (
        <CarouselItem key={`nav-only-${index}`} id={`nav-only-${index}`} width="100%">
          {item}
        </CarouselItem>
      ))}
    </Carousel>
    <Carousel
      hideNavigation
      hidePagination
      styles={gapOnlyStyles}
      title="Drag Only (No Navigation or Pagination)"
    >
      {sampleItems.slice(0, 4).map((item, index) => (
        <CarouselItem key={`drag-only-${index}`} id={`drag-only-${index}`} width="100%">
          {item}
        </CarouselItem>
      ))}
    </Carousel>
  </VStack>
);

const CustomComponentsExample = () => {
  const CustomPaginationComponent = ({ totalPages, activePageIndex, onClickPage, style }: any) => {
    const canGoPrevious = activePageIndex > 0;
    const canGoNext = activePageIndex < totalPages - 1;
    const dotCss = {
      width: 'var(--space-2)',
      height: 'var(--space-2)',
      borderRadius: 'var(--borderRadius-1000)',
    } as const;

    const onPrevious = () => {
      onClickPage(activePageIndex - 1);
    };

    const onNext = () => {
      onClickPage(activePageIndex + 1);
    };

    return (
      <HStack justifyContent="space-between" paddingY={0.5} style={style}>
        <HStack gap={1}>
          <IconButton
            accessibilityLabel="Previous"
            disabled={!canGoPrevious}
            name="caretLeft"
            onClick={onPrevious}
            variant="foregroundMuted"
          />
          <IconButton
            accessibilityLabel="Next"
            disabled={!canGoNext}
            name="caretRight"
            onClick={onNext}
            variant="foregroundMuted"
          />
        </HStack>
        <HStack alignItems="center" gap={1}>
          {Array.from({ length: totalPages }, (_, index) => (
            <Pressable
              key={index}
              accessibilityLabel={`Go to page ${index + 1}`}
              background={index === activePageIndex ? 'bgPrimary' : 'bgSecondary'}
              borderColor={index === activePageIndex ? 'fgPrimary' : 'bgLine'}
              data-testid={`carousel-page-${index}`}
              onClick={() => onClickPage(index)}
              style={dotCss}
            />
          ))}
        </HStack>
      </HStack>
    );
  };

  const ActionButton = ({
    isVisible,
    children,
  }: {
    isVisible: boolean;
    children: React.ReactNode;
  }) => (
    <Pressable
      background="transparent"
      borderRadius={500}
      onClick={() => console.log('Action pressed')}
      paddingY={1}
      tabIndex={isVisible ? undefined : -1}
    >
      <Text color="fgPrimary" font="headline" numberOfLines={1}>
        {children}
      </Text>
    </Pressable>
  );

  return (
    <NegativeMargin>
      <Carousel
        NavigationComponent={SeeAllComponent}
        PaginationComponent={CustomPaginationComponent}
        styles={overflowStyles}
        title="Learn more"
      >
        <CarouselItem id="earn-more-crypto" width="100%">
          {({ isVisible }) => (
            <NudgeCard
              action={<ActionButton isVisible={isVisible}>Start earning</ActionButton>}
              description="You've got unstaked crypto. Stake it now to earn more."
              minWidth="0"
              pictogram="key"
              title="Earn more crypto"
              width="100%"
            />
          )}
        </CarouselItem>
        <CarouselItem id="secure-your-account" width="100%">
          {({ isVisible }) => (
            <NudgeCard
              action={<ActionButton isVisible={isVisible}>Enable 2FA</ActionButton>}
              description="Add two-factor authentication for enhanced security."
              minWidth="0"
              pictogram="shield"
              title="Secure your account"
              width="100%"
            />
          )}
        </CarouselItem>
        <CarouselItem id="complete-your-profile" width="100%">
          {({ isVisible }) => (
            <NudgeCard
              action={<ActionButton isVisible={isVisible}>Update profile</ActionButton>}
              description="Add more details to personalize your experience."
              minWidth="0"
              pictogram="accountsNavigation"
              title="Complete your profile"
              width="100%"
            />
          )}
        </CarouselItem>
      </Carousel>
    </NegativeMargin>
  );
};

const CustomStylesExample = () => {
  const ActionButton = ({
    isVisible,
    children,
  }: {
    isVisible: boolean;
    children: React.ReactNode;
  }) => (
    <Pressable
      background="transparent"
      borderRadius={500}
      onClick={() => console.log('Action pressed')}
      paddingY={1}
      tabIndex={isVisible ? undefined : -1}
    >
      <Text color="fgPrimary" font="headline" numberOfLines={1}>
        {children}
      </Text>
    </Pressable>
  );

  return (
    <NegativeMargin>
      <Carousel
        NavigationComponent={(props) => (
          <DefaultCarouselNavigation
            {...props}
            styles={{
              previousButton: {
                position: 'absolute',
                bottom: 'var(--space-8)',
                left: 'var(--space-0_5)',
                zIndex: 1,
              },
              nextButton: {
                position: 'absolute',
                bottom: 'var(--space-8)',
                right: 'var(--space-0_5)',
                zIndex: 1,
              },
            }}
            variant="foregroundMuted"
          />
        )}
        styles={{
          root: { position: 'relative', paddingInline: 'var(--space-6)' },
          carousel: { gap: 'var(--space-6)' },
        }}
        title="Custom Navigation Positioning"
      >
        <CarouselItem id="earn-more-crypto" width="100%">
          {({ isVisible }) => (
            <NudgeCard
              action={<ActionButton isVisible={isVisible}>Start earning</ActionButton>}
              description="You've got unstaked crypto. Stake it now to earn more."
              minWidth="0"
              pictogram="key"
              title="Earn more crypto"
              width="100%"
            />
          )}
        </CarouselItem>
        <CarouselItem id="secure-your-account" width="100%">
          {({ isVisible }) => (
            <NudgeCard
              action={<ActionButton isVisible={isVisible}>Enable 2FA</ActionButton>}
              description="Add two-factor authentication for enhanced security."
              minWidth="0"
              pictogram="shield"
              title="Secure your account"
              width="100%"
            />
          )}
        </CarouselItem>
        <CarouselItem id="complete-your-profile" width="100%">
          {({ isVisible }) => (
            <NudgeCard
              action={<ActionButton isVisible={isVisible}>Update profile</ActionButton>}
              description="Add more details to personalize your experience."
              minWidth="0"
              pictogram="accountsNavigation"
              title="Complete your profile"
              width="100%"
            />
          )}
        </CarouselItem>
      </Carousel>
    </NegativeMargin>
  );
};

const dotCss = css`
  /* stylelint-disable-next-line plugin/no-low-performance-animation-properties */
  transition: all 0.3s ease;
  width: var(--space-1);
  height: var(--space-1);
  &[data-active='true'] {
    width: var(--space-3);
  }
`;

const AnimatedPaginationExample = () => {
  const ActionButton = ({
    isVisible,
    children,
  }: {
    isVisible: boolean;
    children: React.ReactNode;
  }) => (
    <Pressable
      background="transparent"
      borderRadius={500}
      onClick={() => console.log('Action pressed')}
      paddingY={1}
      tabIndex={isVisible ? undefined : -1}
    >
      <Text color="fgPrimary" font="headline" numberOfLines={1}>
        {children}
      </Text>
    </Pressable>
  );

  const AnimatedPagination = memo(({ classNames, ...props }: DefaultCarouselPaginationProps) => {
    return (
      <DefaultCarouselPagination
        classNames={{
          ...classNames,
          dot: dotCss,
        }}
        {...props}
      />
    );
  });

  return (
    <NegativeMargin>
      <Carousel
        PaginationComponent={AnimatedPagination}
        drag="snap"
        snapMode="page"
        styles={overflowStyles}
        title="Animated Pagination"
      >
        <CarouselItem id="slide-1" width="100%">
          {({ isVisible }) => (
            <NudgeCard
              action={<ActionButton isVisible={isVisible}>Get started</ActionButton>}
              description="Experience smooth transitions as you navigate through content."
              minWidth="0"
              pictogram="key"
              title="Smooth Animations"
              width="100%"
            />
          )}
        </CarouselItem>
        <CarouselItem id="slide-2" width="100%">
          {({ isVisible }) => (
            <NudgeCard
              action={<ActionButton isVisible={isVisible}>Learn more</ActionButton>}
              description="Active pages expand to pills while inactive ones remain as circles."
              minWidth="0"
              pictogram="shield"
              title="Dynamic Sizing"
              width="100%"
            />
          )}
        </CarouselItem>
        <CarouselItem id="slide-3" width="100%">
          {({ isVisible }) => (
            <NudgeCard
              action={<ActionButton isVisible={isVisible}>Explore</ActionButton>}
              description="Beautiful visual feedback that enhances user experience."
              minWidth="0"
              pictogram="accountsNavigation"
              title="Enhanced UX"
              width="100%"
            />
          )}
        </CarouselItem>
      </Carousel>
    </NegativeMargin>
  );
};

const AutoplayExample = () => (
  <NegativeMargin>
    <Carousel
      autoplay
      loop
      paginationVariant="dot"
      styles={overflowStyles}
      title="Autoplay Carousel"
    >
      {Object.values(assets).map((asset) => (
        <CarouselItem key={asset.symbol} accessibilityLabel={asset.name} id={asset.symbol}>
          {({ isVisible }) => (
            <SquareAssetCard
              imageUrl={asset.imageUrl}
              isVisible={isVisible}
              name={asset.symbol}
              onClick={() => console.log(`${asset.symbol} clicked`)}
            />
          )}
        </CarouselItem>
      ))}
    </Carousel>
  </NegativeMargin>
);

const LoopingExamples = () => (
  <VStack gap={4}>
    <NegativeMargin>
      <Carousel
        loop
        paginationVariant="dot"
        snapMode="page"
        styles={overflowStyles}
        title="Looping - Snap Page"
      >
        {sampleItems.map((item, index) => (
          <CarouselItem
            key={`loop-page-${index}`}
            id={`loop-page-${index}`}
            width="calc((100% - 2 * var(--space-2)) / 3)"
          >
            {item}
          </CarouselItem>
        ))}
      </Carousel>
    </NegativeMargin>
    <NegativeMargin>
      <Carousel
        autoplay
        loop
        drag="snap"
        paginationVariant="dot"
        snapMode="item"
        styles={overflowStyles}
        title="Looping with Autoplay - Snap Item"
      >
        {sampleItems.map((item, index) => (
          <CarouselItem
            key={`loop-item-${index}`}
            id={`loop-item-${index}`}
            width="calc((100% - 2 * var(--space-2)) / 3)"
          >
            {item}
          </CarouselItem>
        ))}
      </Carousel>
    </NegativeMargin>
    <NegativeMargin>
      <Carousel
        loop
        drag="free"
        paginationVariant="dot"
        snapMode="item"
        styles={overflowStyles}
        title="Looping - Free Drag"
      >
        {Object.values(assets).map((asset) => (
          <CarouselItem key={asset.symbol} accessibilityLabel={asset.name} id={asset.symbol}>
            {({ isVisible }) => (
              <SquareAssetCard
                imageUrl={asset.imageUrl}
                isVisible={isVisible}
                name={asset.symbol}
                onClick={() => console.log(`${asset.symbol} clicked`)}
              />
            )}
          </CarouselItem>
        ))}
      </Carousel>
    </NegativeMargin>
    <NegativeMargin>
      <Carousel
        loop
        drag="free"
        snapMode="item"
        styles={overflowStyles}
        title="Looping - Free Drag is visible (visreg)"
      >
        {Object.values(assets).map((asset) => (
          <CarouselItem key={asset.symbol} accessibilityLabel={asset.name} id={asset.symbol}>
            {({ isVisible }) => (
              <SquareAssetCard
                colorVisibility
                imageUrl={asset.imageUrl}
                isVisible={isVisible}
                name={asset.symbol}
                onClick={() => console.log(`${asset.symbol} clicked`)}
              />
            )}
          </CarouselItem>
        ))}
      </Carousel>
    </NegativeMargin>
  </VStack>
);

export const All = () => (
  <VStack gap={2}>
    <BasicExamples />
    <CustomComponentsExample />
    <CustomStylesExample />
    <AnimatedPaginationExample />
    <LoopingExamples />
    <AutoplayExample />
  </VStack>
);
