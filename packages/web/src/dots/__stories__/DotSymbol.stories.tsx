import { assets } from '@coinbase/cds-common/internal/data/assets';
import { avatarSizes } from '@coinbase/cds-common/internal/data/avatars';
import { iconSizes } from '@coinbase/cds-common/internal/data/iconData';
import { avatarDotSizeMap, avatarIconSizeMap } from '@coinbase/cds-common/tokens/dot';

import { Icon } from '../../icons/Icon';
import { HStack, VStack } from '../../layout';
import { Avatar } from '../../media/Avatar';
import { Text } from '../../typography/Text';
import { ProgressCircle } from '../../visualizations/ProgressCircle';
import { DotSymbol } from '..';

export default {
  title: 'Components/Dots/DotSymbol',
  component: DotSymbol,
};

const PIN_DIRECTIONS = ['top-start', 'top-end', 'bottom-start', 'bottom-end'] as const;
const SIZES = ['s', 'm', 'l'] as const;

// Direct implementation of components that were in dotBuilder
const DotSymbolPlacements = () => {
  return (
    <>
      {PIN_DIRECTIONS.map((pinDirection) => (
        <VStack
          key={`dotsymbol-placement-${pinDirection}`}
          alignItems="flex-start"
          gap={4}
          padding={1}
          paddingBottom={4}
        >
          <Text as="p" display="block" font="label1">
            {pinDirection}
          </Text>
          <DotSymbol pin={pinDirection} size="m" source={assets.eth.imageUrl}>
            <Avatar alt="Sneezy" shape="square" size="xxxl" />
          </DotSymbol>
          <DotSymbol pin={pinDirection} size="m" source={assets.eth.imageUrl}>
            <Avatar alt="Sneezy" shape="square" size="xl" />
          </DotSymbol>
          <DotSymbol pin={pinDirection} size="m" source={assets.eth.imageUrl}>
            <Icon active name="airdrop" size="l" />
          </DotSymbol>
        </VStack>
      ))}
    </>
  );
};

const DotSymbolSizes = () => {
  return (
    <>
      {SIZES.map((size) => (
        <VStack key={`dotsymbol-size-${size}`} alignItems="flex-start" gap={1}>
          <DotSymbol size={size} source={assets.eth.imageUrl} />
        </VStack>
      ))}
    </>
  );
};

const DotSymbolIcon = () => {
  return (
    <>
      {PIN_DIRECTIONS.map((pinDirection) =>
        avatarSizes.map((avatarSize) => (
          <VStack
            key={`dotsymbol-icons-${pinDirection}-${avatarSize}`}
            alignItems="flex-start"
            gap={4}
            padding={1}
            paddingBottom={4}
          >
            <Text as="p" display="block" font="label1">
              Pin Direction: {pinDirection} Avatar Size: {avatarSize} Icon Size:{' '}
              {avatarIconSizeMap[avatarSize]}
            </Text>
            <DotSymbol
              active
              iconName="safe"
              overlap="circular"
              pin={pinDirection}
              size={avatarIconSizeMap[avatarSize]}
            >
              <Avatar alt="Ethereum asset logo" size={avatarSize} src={assets.eth.imageUrl} />
            </DotSymbol>
          </VStack>
        )),
      )}
    </>
  );
};

const DotSymbolOverlap = () => {
  return (
    <>
      {PIN_DIRECTIONS.map((pinDirection) =>
        iconSizes.map((size) => (
          <VStack
            key={`dotsymbol-overlap-${size}-${pinDirection}`}
            alignItems="flex-start"
            gap={4}
            padding={1}
            paddingBottom={4}
          >
            <Text as="p" display="block" font="label1">
              {pinDirection}, dot-size: {size}
            </Text>
            <DotSymbol
              overlap="circular"
              pin={pinDirection}
              size={size}
              source={assets.ada.imageUrl}
            >
              <Avatar alt="Sneezy" size="xxxl" src={assets.eth.imageUrl} />
            </DotSymbol>
          </VStack>
        )),
      )}
    </>
  );
};

/**
 * This is test that when the Dot is placed next to other
 * items, the position of the pinning is still correct
 */
const DotSymbolComplex = () => {
  return (
    <HStack gap={2}>
      <DotSymbol
        overlap="circular"
        pin="bottom-end"
        size={avatarDotSizeMap.xxxl}
        source={assets.polygon.imageUrl}
      >
        <Avatar alt="Sneezy" shape="square" size="xxl" />
      </DotSymbol>
      <VStack>
        <Text as="p" display="block" font="label1">
          Hello Hello
        </Text>
        <Text as="p" display="block" font="label1">
          Hello Hello
        </Text>
        <Text as="p" display="block" font="label1">
          Hello Hello
        </Text>
        <Text as="p" display="block" font="label1">
          Hello Hello
        </Text>
        <Text as="p" display="block" font="label1">
          Hello Hello
        </Text>
        <Text as="p" display="block" font="label1">
          Hello Hello
        </Text>
      </VStack>
    </HStack>
  );
};

export const AllDotSymbol = () => {
  return (
    <VStack gap={2}>
      <DotSymbolPlacements />
      <DotSymbolSizes />
      <DotSymbolIcon />
      <DotSymbolOverlap />
      <DotSymbolComplex />
    </VStack>
  );
};

export const CustomSymbol = () => {
  return (
    <DotSymbol
      pin="bottom-end"
      symbol={<ProgressCircle indeterminate accessibilityLabel="Loading" size={10} />}
    >
      <Icon active name="airdrop" size="l" />
    </DotSymbol>
  );
};
