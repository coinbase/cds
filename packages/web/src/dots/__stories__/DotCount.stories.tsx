import React, { useEffect, useState } from 'react';
import { css } from '@linaria/core';

import { useTheme } from '../../hooks/useTheme';
import { Icon } from '../../icons/Icon';
import { Box, HStack, VStack } from '../../layout';
import { Avatar } from '../../media/Avatar';
import { Pressable } from '../../system/Pressable';
import { Text } from '../../typography/Text';
import { DotCount } from '..';

export default {
  title: 'Components/Dots/DotCount',
  component: DotCount,
};

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

const DotCountDynamic = () => {
  const [count, setCount] = useState<number>(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => (prev === 0 ? Math.floor(Math.random() * 99) : 0));
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);
  return (
    <Box alignItems="flex-start" minHeight={100} padding={1}>
      <DotCount count={count}>
        <Icon active name="airdrop" size="m" />
      </DotCount>
    </Box>
  );
};

const DotCountVariant = () => {
  return (
    <VStack key="DotCount-variant-negative" alignItems="flex-start" gap={1}>
      <DotCount count={30} variant="negative" />
    </VStack>
  );
};

const DotCountOverlap = () => {
  return (
    <>
      <DotCount count={1} overlap="circular" pin="top-end" variant="negative">
        <Avatar alt="Sneezy" shape="circle" size="l" />
      </DotCount>
      <DotCount count={30} overlap="circular" pin="top-end" variant="negative">
        <Avatar alt="Sneezy" shape="circle" size="xl" />
      </DotCount>
      <DotCount count={100} overlap="circular" pin="top-end" variant="negative">
        <Avatar alt="Sneezy" shape="circle" size="xxl" />
      </DotCount>
      <DotCount count={99} overlap="circular" pin="top-end" variant="negative">
        <Avatar alt="Sneezy" shape="circle" size="xxxl" />
      </DotCount>
    </>
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
      <Text as="p" display="block" font="label1">
        top-end
      </Text>
      <DotCount count={30} pin="top-end">
        <Avatar alt="Sneezy" shape="square" size="xl" />
      </DotCount>
      <DotCount count={30} pin="top-end">
        <Avatar alt="Sneezy" shape="square" size="l" />
      </DotCount>
      <DotCount count={1} pin="top-end">
        <Icon name="calendar" size="m" />
      </DotCount>
      <DotCount count={0} pin="top-end">
        <Text as="p" display="block" font="label1">
          Count = 0. Dot should not show up
        </Text>
        <Icon name="calendar" size="m" />
      </DotCount>
    </VStack>
  );
};

/**
 * This is test that when the Dot is placed next to other
 * items, the position of the pinning is still correct
 */
const DotCountComplex = () => {
  return (
    <HStack gap={2}>
      <DotCount count={2} overlap="circular" pin="top-end">
        <Avatar alt="Sneezy" shape="circle" size="xxxl" />
      </DotCount>
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

const dotCountContainerCss = css`
  border-radius: 4px;
`;

const DotCountStyle = () => {
  const theme = useTheme();
  return (
    <VStack key="DotCount-style" alignItems="flex-start" gap={1}>
      <DotCount
        classNames={{
          container: dotCountContainerCss,
        }}
        count={30}
        styles={{
          container: { backgroundColor: theme.color.bgPositive, borderColor: theme.color.fg },
        }}
      />
    </VStack>
  );
};

export const AllDotCount = () => {
  return (
    <VStack gap={2}>
      <DotCountBasic />
      <DotCountDynamic />
      <DotCountVariant />
      <DotCountOverlap />
      <DotCountPlacements />
      <DotCountComplex />
      <DotCountStyle />
    </VStack>
  );
};

export const DotCountPressable = () => {
  return (
    <HStack gap={4}>
      {[1, 10, 20, 50, 100].map((count: number) => {
        return (
          <Pressable noScaleOnPress background="transparent" onClick={() => console.log('pressed')}>
            <Box
              accessibilityLabel="test"
              position="relative"
              tabIndex={0}
              testID="notification-bell-container"
            >
              <DotCount
                count={count}
                overlap="circular"
                pin="top-end"
                testID="notification-bell-badge"
              >
                <Icon active color="fg" name="bell" size="s" testID="notification-bell-icon" />
              </DotCount>
            </Box>
          </Pressable>
        );
      })}
    </HStack>
  );
};
