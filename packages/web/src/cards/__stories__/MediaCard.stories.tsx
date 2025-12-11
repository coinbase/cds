import React, { useRef } from 'react';
import { assets, ethBackground } from '@coinbase/cds-common/internal/data/assets';

import { VStack } from '../../layout/VStack';
import { RemoteImage } from '../../media/RemoteImage';
import { TextHeadline, TextLabel2, TextTitle3 } from '../../typography';
import { CardThumbnail } from '../CardThumbnail';
import { MediaCard } from '../MediaCard';

const exampleProps = {
  title: 'Title',
  subtitle: 'Subtitle',
  description: 'Description',
  width: 320,
} as const;

const exampleThumbnail = <CardThumbnail alt="Ethereum" aria-hidden="true" src={ethBackground} />;

const exampleMedia = (
  <RemoteImage
    alt="Media"
    aria-hidden="true"
    height="100%"
    resizeMode="cover"
    shape="rectangle"
    src={ethBackground}
    width="100%"
  />
);

export const Default = (): JSX.Element => {
  return (
    <VStack>
      <MediaCard {...exampleProps} />
    </VStack>
  );
};

export const WithAnchorRef = (): JSX.Element => {
  const ref = useRef<HTMLAnchorElement>(null);
  return (
    <VStack>
      <MediaCard
        ref={ref}
        actionable
        as="a"
        href="https://www.google.com"
        target="_blank"
        {...exampleProps}
      />
    </VStack>
  );
};

export const WithButtonRef = (): JSX.Element => {
  const ref = useRef<HTMLButtonElement>(null);
  return (
    <VStack>
      <MediaCard
        ref={ref}
        actionable
        as="button"
        onClick={() => alert('Card clicked!')}
        {...exampleProps}
      />
    </VStack>
  );
};

export const WithArticleRef = (): JSX.Element => {
  const ref = useRef<HTMLElement>(null);
  return (
    <VStack>
      <MediaCard ref={ref} as="article" {...exampleProps} />
    </VStack>
  );
};

export const WithThumbnail = (): JSX.Element => {
  return (
    <VStack>
      <MediaCard {...exampleProps} thumbnail={exampleThumbnail} />
    </VStack>
  );
};

export const WithMedia = (): JSX.Element => {
  const ref = useRef<HTMLAnchorElement>(null);
  return (
    <VStack>
      <MediaCard ref={ref} actionable as="article" {...exampleProps} media={exampleMedia} />
    </VStack>
  );
};

export const WithThumbnailAndMedia = (): JSX.Element => {
  return (
    <VStack>
      <MediaCard {...exampleProps} media={exampleMedia} thumbnail={exampleThumbnail} />
    </VStack>
  );
};

export const WithTag = (): JSX.Element => {
  return (
    <VStack>
      <MediaCard {...exampleProps} tag="Tag" />
    </VStack>
  );
};

export const Complete = (): JSX.Element => {
  return (
    <VStack>
      <MediaCard {...exampleProps} media={exampleMedia} tag="Tag" thumbnail={exampleThumbnail} />
    </VStack>
  );
};

export const WithPictogramMedia = (): JSX.Element => {
  return (
    <VStack>
      <MediaCard {...exampleProps} media={exampleMedia} thumbnail={exampleThumbnail} />
    </VStack>
  );
};

export const LongText = (): JSX.Element => {
  const ref = useRef<HTMLButtonElement>(null);
  return (
    <VStack>
      <MediaCard
        ref={ref}
        actionable
        as="button"
        description="This is a very long description text that demonstrates how the card handles longer content"
        media={exampleMedia}
        subtitle="This is a very long subtitle text that will get truncated"
        thumbnail={exampleThumbnail}
        title="This is a very long title text that will get truncated"
        width={320}
      />
    </VStack>
  );
};

export const CustomOverrides = (): JSX.Element => {
  return (
    <VStack>
      <MediaCard
        {...exampleProps}
        media={exampleMedia}
        overrides={{
          title: { color: 'fgPositive' },
          subtitle: { font: 'label1' },
          description: { color: 'fgMuted' },
          tag: { colorScheme: 'blue' },
        }}
        tag="Custom Tag"
        thumbnail={exampleThumbnail}
      />
    </VStack>
  );
};

export const WithLayoutOverrides = (): JSX.Element => {
  return (
    <VStack>
      <MediaCard
        {...exampleProps}
        media={exampleMedia}
        overrides={{
          layoutContainer: { gap: 3 },
          contentContainer: { padding: 3, gap: 2 },
          textContainer: { gap: 1 },
          headerContainer: { gap: 1 },
          title: { color: 'fg', font: 'headline' },
          subtitle: { color: 'fgMuted', font: 'label1' },
          description: { color: 'fgMuted', font: 'body' },
          mediaContainer: { borderRadius: 300 },
          tag: { colorScheme: 'green' },
        }}
        tag="New"
        thumbnail={exampleThumbnail}
      />
    </VStack>
  );
};

export const CustomContent = (): JSX.Element => {
  return (
    <VStack>
      <MediaCard
        description={
          <TextLabel2 as="p">
            Custom description with <strong>bold text</strong> and <em>italic text</em>
          </TextLabel2>
        }
        media={exampleMedia}
        subtitle={
          <TextHeadline as="p" color="fgPositive">
            Custom Subtitle
          </TextHeadline>
        }
        thumbnail={exampleThumbnail}
        title={<TextTitle3 as="p">Custom Title</TextTitle3>}
        width={320}
      />
    </VStack>
  );
};

export const WithoutMedia = (): JSX.Element => {
  return (
    <VStack>
      <MediaCard {...exampleProps} thumbnail={exampleThumbnail} />
    </VStack>
  );
};

export const InteractiveWithHref = (): JSX.Element => {
  const ref = useRef<HTMLAnchorElement>(null);
  return (
    <VStack>
      <MediaCard
        ref={ref}
        actionable
        as="a"
        description="Clickable card with href"
        href="https://www.google.com"
        media={exampleMedia}
        subtitle="Interactive"
        tag="Link"
        thumbnail={exampleThumbnail}
        title="Interactive Card"
        width={320}
      />
    </VStack>
  );
};

export const InteractiveWithOnClick = (): JSX.Element => {
  const ref = useRef<HTMLButtonElement>(null);
  return (
    <VStack>
      <MediaCard
        ref={ref}
        actionable
        as="button"
        description="Clickable card with onClick handler"
        media={exampleMedia}
        onClick={() => alert('Card clicked!')}
        subtitle="Button"
        tag="Action"
        thumbnail={exampleThumbnail}
        title="Interactive Card"
        width={320}
      />
    </VStack>
  );
};

export const NonInteractiveExplicit = (): JSX.Element => {
  return (
    <VStack>
      <MediaCard
        {...exampleProps}
        actionable={false}
        media={exampleMedia}
        thumbnail={exampleThumbnail}
      />
    </VStack>
  );
};

export const MultipleCards = (): JSX.Element => {
  const ref = useRef<HTMLAnchorElement>(null);
  const ref2 = useRef<HTMLButtonElement>(null);
  return (
    <VStack gap={2}>
      <MediaCard as="article" {...exampleProps} media={exampleMedia} thumbnail={exampleThumbnail} />
      <MediaCard
        ref={ref}
        actionable
        as="a"
        description="Another card with different content"
        href="https://www.google.com"
        media={exampleMedia}
        subtitle="BTC"
        tag="Hot"
        thumbnail={<CardThumbnail alt="Bitcoin" aria-hidden="true" src={assets.btc.imageUrl} />}
        title="Bitcoin"
        width={320}
      />
      <MediaCard
        ref={ref2}
        actionable
        as="button"
        description="Card with onClick handler"
        onClick={() => console.log('clicked')}
        subtitle="ETH"
        thumbnail={exampleThumbnail}
        title="Ethereum"
        width={320}
      />
    </VStack>
  );
};

export default {
  title: 'Components/Cards/MediaCard',
  component: MediaCard,
};
