import React from 'react';
import { assets } from '@coinbase/cds-common/internal/data/assets';
import { avatarSizes } from '@coinbase/cds-common/internal/data/avatars';
import { iconSizes } from '@coinbase/cds-common/internal/data/iconData';
import { avatarDotSizeMap, avatarIconSizeMap } from '@coinbase/cds-common/tokens/dot';

import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { useTheme } from '../../hooks/useTheme';
import { Icon } from '../../icons/Icon';
import { Box } from '../../layout/Box';
import { HStack } from '../../layout/HStack';
import { VStack } from '../../layout/VStack';
import { Avatar } from '../../media/Avatar';
import { Text } from '../../typography/Text';
import { DotCount } from '../DotCount';
import { DotStatusColor } from '../DotStatusColor';
import { DotSymbol } from '../DotSymbol';

const VARIANTS = ['positive', 'negative', 'primary', 'foregroundMuted', 'warning'] as const;
const PIN_DIRECTIONS = ['top-start', 'top-end', 'bottom-start', 'bottom-end'] as const;
const SIZES = ['s', 'm', 'l'] as const;

const DotCountBasic = () => {
  const counts = [1, 100, 30, 2, 0, 99];
  return (
    <>
      {counts.map((count) => (
        <Box key={`DotCount-${count}`} alignItems="flex-start" padding={1}>
          <DotCount count={count} />
        </Box>
      ))}
      <Box alignItems="flex-start" padding={1}>
        <DotCount count={11} max={9} />
      </Box>
    </>
  );
};

const DotCountVariant = () => {
  return (
    <VStack key="DotCount-variant-negative" alignItems="flex-start" gap={1}>
      <DotCount count={30} variant="negative" />
    </VStack>
  );
};

const DotCountPlacements = () => {
  return (
    <VStack
      key="DotCount-placement-top-end"
      alignItems="flex-start"
      gap={4}
      padding={1}
      paddingBottom={4}
    >
      <Text font="label1">top-end</Text>
      <DotCount count={30} pin="top-end">
        <Avatar shape="square" size="xl" />
      </DotCount>
      <DotCount count={30} pin="top-end">
        <Avatar shape="square" size="l" />
      </DotCount>
      <DotCount count={1} pin="top-end">
        <Icon name="calendar" size="m" />
      </DotCount>
      <DotCount count={0} pin="top-end">
        <Text font="label1">Count = 0. Dot should not show up</Text>
        <Icon name="calendar" size="m" />
      </DotCount>
    </VStack>
  );
};

const DotCountOverlap = () => {
  return (
    <>
      <DotCount count={1} overlap="circular" pin="top-end" variant="negative">
        <Avatar shape="circle" size="l" />
      </DotCount>
      <DotCount count={30} overlap="circular" pin="top-end" variant="negative">
        <Avatar shape="circle" size="xl" />
      </DotCount>
      <DotCount count={100} overlap="circular" pin="top-end" variant="negative">
        <Avatar shape="circle" size="xxl" />
      </DotCount>
      <DotCount count={99} overlap="circular" pin="top-end" variant="negative">
        <Avatar shape="circle" size="xxxl" />
      </DotCount>
    </>
  );
};

const DotCountComplex = () => {
  return (
    <HStack gap={2}>
      <DotCount count={2} overlap="circular" pin="top-end">
        <Avatar shape="circle" size="xxxl" />
      </DotCount>
      <VStack>
        <Text font="label1">Hello Hello</Text>
        <Text font="label1">Hello Hello</Text>
        <Text font="label1">Hello Hello</Text>
        <Text font="label1">Hello Hello</Text>
        <Text font="label1">Hello Hello</Text>
        <Text font="label1">Hello Hello</Text>
      </VStack>
    </HStack>
  );
};

const DotCountStyle = () => {
  const theme = useTheme();
  return (
    <DotCount
      count={30}
      styles={{
        container: {
          borderRadius: 4,
          backgroundColor: theme.color.bgPositive,
          borderColor: theme.color.fg,
        },
      }}
    />
  );
};

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
          <Text font="label1">{pinDirection}</Text>
          <DotStatusColor pin={pinDirection} variant="positive">
            <Avatar shape="square" size="l" />
          </DotStatusColor>
          <DotStatusColor pin={pinDirection} variant="positive">
            <Avatar shape="square" size="xxl" />
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
            <Text font="label1">
              {pinDirection}, avatarSize: {avatarSize}
            </Text>
            <DotStatusColor overlap="circular" pin={pinDirection} variant="positive">
              <Avatar shape="circle" size={avatarSize} />
            </DotStatusColor>
          </VStack>
        )),
      )}
    </>
  );
};

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
          <Text font="label1">{pinDirection}</Text>
          <DotSymbol pin={pinDirection} size="m" source={assets.eth.imageUrl}>
            <Avatar shape="square" size="xxxl" />
          </DotSymbol>
          <DotSymbol pin={pinDirection} size="m" source={assets.eth.imageUrl}>
            <Avatar shape="square" size="xl" />
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
            <Text font="label1">
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
              <Avatar size={avatarSize} src={assets.eth.imageUrl} />
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
            <Text font="label1">
              {pinDirection}, dot-size: {size}
            </Text>
            <DotSymbol
              overlap="circular"
              pin={pinDirection}
              size={size}
              source={assets.ada?.imageUrl || assets.btc.imageUrl}
            >
              <Avatar size="xxxl" src={assets.eth.imageUrl} />
            </DotSymbol>
          </VStack>
        )),
      )}
    </>
  );
};

const DotSymbolComplex = () => {
  return (
    <HStack gap={2}>
      <DotSymbol
        overlap="circular"
        pin="bottom-end"
        size={avatarDotSizeMap.xxxl}
        source={assets.polygon?.imageUrl || assets.btc.imageUrl}
      >
        <Avatar shape="square" size="xxl" />
      </DotSymbol>
      <VStack>
        <Text font="label1">Hello Hello</Text>
        <Text font="label1">Hello Hello</Text>
        <Text font="label1">Hello Hello</Text>
        <Text font="label1">Hello Hello</Text>
        <Text font="label1">Hello Hello</Text>
        <Text font="label1">Hello Hello</Text>
      </VStack>
    </HStack>
  );
};

const DotScreen = () => {
  return (
    <ExampleScreen>
      <Example inline title="DotCount Basic">
        <DotCountBasic />
      </Example>
      <Example inline title="DotCount Placements">
        <DotCountPlacements />
      </Example>
      <Example inline title="DotCount Variant">
        <DotCountVariant />
      </Example>
      <Example inline title="DotCount Overlap">
        <DotCountOverlap />
      </Example>
      <Example inline title="DotCount Complex">
        <DotCountComplex />
      </Example>
      <Example inline title="DotCount Style">
        <DotCountStyle />
      </Example>
      <Example inline title="DotStatusColor Basic">
        <DotStatusColorBasic />
      </Example>
      <Example inline title="DotStatusColor Variant">
        <DotStatusColorVariant />
      </Example>
      <Example inline title="DotStatusColor Sizes">
        <DotStatusColorSizes />
      </Example>
      <Example inline title="DotStatusColor Placements">
        <DotStatusColorPlacements />
      </Example>
      <Example inline title="DotStatusColor Overlap">
        <DotStatusColorOverlap />
      </Example>
      <Example inline title="DotSymbol Basic">
        <DotSymbol source={{ uri: assets.btc.imageUrl }} />
      </Example>
      <Example inline title="DotSymbol Sizes">
        <DotSymbolSizes />
      </Example>
      <Example inline title="DotSymbol Placements">
        <DotSymbolPlacements />
      </Example>
      <Example inline title="DotSymbol Icons">
        <DotSymbolIcon />
      </Example>
      <Example inline title="DotSymbol Overlap">
        <DotSymbolOverlap />
      </Example>
      <Example inline title="DotSymbol Complex">
        <DotSymbolComplex />
      </Example>
    </ExampleScreen>
  );
};

export default DotScreen;
