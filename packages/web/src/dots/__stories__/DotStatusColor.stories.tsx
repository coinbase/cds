import React from 'react';
import { avatarSizes } from '@coinbase/cds-common/internal/data/avatars';

import { Icon } from '../../icons/Icon';
import { VStack } from '../../layout';
import { Avatar } from '../../media/Avatar';
import { Text } from '../../typography/Text';
import { DotStatusColor } from '..';

export default {
  title: 'Components/Dots/DotStatusColor',
  component: DotStatusColor,
};

const VARIANTS = ['positive', 'negative', 'primary', 'foregroundMuted', 'warning'] as const;
const PIN_DIRECTIONS = ['top-start', 'top-end', 'bottom-start', 'bottom-end'] as const;
const SIZES = ['s', 'm', 'l'] as const;

const DotStatusColorBasic = () => {
  return <DotStatusColor variant="positive" />;
};

const DotStatusColorVariant = () => {
  return (
    <>
      {VARIANTS.map((variant) => (
        <VStack key={`DotStatusColor-variant-${variant}`} alignItems="flex-start" gap={1}>
          <DotStatusColor variant={variant} />
        </VStack>
      ))}
    </>
  );
};

const DotStatusColorSizes = () => {
  return (
    <>
      {SIZES.map((size) => (
        <VStack key={`DotStatusColor-size-${size}`} alignItems="flex-start" gap={1}>
          <DotStatusColor size={size} variant="negative" />
        </VStack>
      ))}
    </>
  );
};

const DotStatusColorPlacements = () => {
  return (
    <>
      {PIN_DIRECTIONS.map((pinDirection) => (
        <VStack
          key={`DotStatusColor-placement-${pinDirection}`}
          alignItems="flex-start"
          gap={4}
          padding={1}
          paddingBottom={4}
        >
          <Text as="p" display="block" font="label1">
            {pinDirection}
          </Text>
          <DotStatusColor pin={pinDirection} variant="positive">
            <Avatar alt="Sneezy" shape="square" size="l" />
          </DotStatusColor>
          <DotStatusColor pin={pinDirection} variant="positive">
            <Avatar alt="Sneezy" shape="square" size="xxl" />
          </DotStatusColor>
          <DotStatusColor pin={pinDirection} variant="positive">
            <Icon name="calendar" size="l" />
          </DotStatusColor>
        </VStack>
      ))}
    </>
  );
};

const DotStatusColorOverlap = () => {
  return (
    <>
      {PIN_DIRECTIONS.map((pinDirection) =>
        avatarSizes.map((avatarSize) => (
          <VStack
            key={`DotStatusColor-overlap-${pinDirection}-${avatarSize}`}
            alignItems="flex-start"
            gap={4}
            padding={1}
            paddingBottom={4}
          >
            <Text as="p" display="block" font="label1">
              {pinDirection}, avatarSize: {avatarSize}
            </Text>
            <DotStatusColor overlap="circular" pin={pinDirection} variant="positive">
              <Avatar alt="Unknown avatar circle" shape="circle" size={avatarSize} />
            </DotStatusColor>
          </VStack>
        )),
      )}
    </>
  );
};

export const AllDotStatusColor = () => {
  return (
    <VStack gap={2}>
      <DotStatusColorBasic />
      <DotStatusColorVariant />
      <DotStatusColorSizes />
      <DotStatusColorPlacements />
      <DotStatusColorOverlap />
    </VStack>
  );
};
