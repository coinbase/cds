import React from 'react';
import { getAvatarFallbackColor } from '@coinbase/cds-common/media/getAvatarFallbackColor';
import { colorSchemeMap } from '@coinbase/cds-common/tokens/avatar';
import type { AvatarFallbackColor } from '@coinbase/cds-common/types';
import type { AvatarSize } from '@coinbase/cds-common/types/AvatarSize';

import { HStack } from '../../layout/HStack';
import { VStack } from '../../layout/VStack';
import { Text } from '../../typography/Text';
import { Avatar, type AvatarProps } from '../Avatar';

const avatarImageUrl =
  'https://avatars.slack-edge.com/2019-12-09/865473396980_e8c83b072b452e4d03f7_192.jpg';

export default {
  component: Avatar,
  title: 'Components/Avatar',
};

const sizes: AvatarSize[] = ['s', 'm', 'l', 'xl', 'xxl', 'xxxl'];
const names = ['Sneezy', 'Happy', 'Sleepy', 'Doc', 'Bashful', 'Grumpy', 'Dopey', 'Lilo', 'Stitch'];

export const Normal = () => {
  return (
    <div>
      <VStack gap={2}>
        <Text as="h3" display="block" font="headline">
          Default
        </Text>
        <HStack alignItems="center" gap={2}>
          {sizes.map((size, i) => (
            <Avatar key={i} alt="" size={size} src={avatarImageUrl} />
          ))}
        </HStack>
        <HStack alignItems="center" gap={2}>
          {sizes.map((size, i) => (
            <Avatar key={i} alt="" shape="square" size={size} src={avatarImageUrl} />
          ))}
        </HStack>
        <HStack alignItems="center" gap={2}>
          {sizes.map((size, i) => (
            <Avatar key={i} alt="" shape="hexagon" size={size} src={avatarImageUrl} />
          ))}
        </HStack>
      </VStack>
      <VStack gap={2} paddingTop={2}>
        <Text as="h3" display="block" font="headline">
          With borderColor prop
        </Text>
        <HStack alignItems="center" gap={2}>
          {sizes.map((size, i) => (
            <Avatar key={i} alt="" borderColor="bgPositive" size={size} src={avatarImageUrl} />
          ))}
        </HStack>
        <HStack alignItems="center" gap={2}>
          {sizes.map((size, i) => (
            <Avatar
              key={i}
              alt=""
              borderColor="bgPositive"
              shape="square"
              size={size}
              src={avatarImageUrl}
            />
          ))}
        </HStack>
        <HStack alignItems="center" gap={2}>
          {sizes.map((size, i) => (
            <Avatar
              key={i}
              alt=""
              borderColor="bgPositive"
              shape="hexagon"
              size={size}
              src={avatarImageUrl}
            />
          ))}
        </HStack>
      </VStack>
      <VStack gap={2} paddingTop={2}>
        <Text as="h3" display="block" font="headline">
          With Selected prop
        </Text>
        <HStack alignItems="center" gap={2}>
          {sizes.map((size, i) => (
            <Avatar key={i} selected alt="" size={size} src={avatarImageUrl} />
          ))}
        </HStack>
        <HStack alignItems="center" gap={2}>
          {sizes.map((size, i) => (
            <Avatar key={i} selected alt="" shape="square" size={size} src={avatarImageUrl} />
          ))}
        </HStack>
        <HStack alignItems="center" gap={2}>
          {sizes.map((size, i) => (
            <Avatar key={i} selected alt="" shape="hexagon" size={size} src={avatarImageUrl} />
          ))}
        </HStack>
      </VStack>
    </div>
  );
};

export const FallbackImage = () => {
  return (
    <div>
      <VStack gap={2}>
        <Text as="h3" display="block" font="headline">
          Default
        </Text>
        <HStack alignItems="baseline" gap={2}>
          {sizes.map((size, i) => (
            <Avatar key={i} alt="" size={size} />
          ))}
        </HStack>
        <HStack alignItems="baseline" gap={2}>
          {sizes.map((size, i) => (
            <Avatar key={i} alt="" name="Alice" shape="square" size={size} />
          ))}
        </HStack>
        <HStack alignItems="baseline" gap={2}>
          {sizes.map((size, i) => (
            <Avatar key={i} alt="" shape="hexagon" size={size} />
          ))}
        </HStack>
      </VStack>
      <VStack gap={2} paddingTop={2}>
        <Text as="h3" display="block" font="headline">
          With borderColor prop
        </Text>
        <HStack alignItems="center" gap={2}>
          {sizes.map((size, i) => (
            <Avatar key={i} alt="" borderColor="bgPositive" size={size} />
          ))}
        </HStack>
        <HStack alignItems="center" gap={2}>
          {sizes.map((size, i) => (
            <Avatar key={i} alt="" borderColor="bgPositive" shape="square" size={size} />
          ))}
        </HStack>
        <HStack alignItems="center" gap={2}>
          {sizes.map((size, i) => (
            <Avatar key={i} alt="" borderColor="bgPositive" shape="hexagon" size={size} />
          ))}
        </HStack>
      </VStack>
      <VStack gap={2} paddingTop={2}>
        <Text as="h3" display="block" font="headline">
          With Selected prop
        </Text>
        <HStack alignItems="center" gap={2}>
          {sizes.map((size, i) => (
            <Avatar key={i} selected alt="" size={size} />
          ))}
        </HStack>
        <HStack alignItems="center" gap={2}>
          {sizes.map((size, i) => (
            <Avatar key={i} selected alt="" shape="square" size={size} />
          ))}
        </HStack>
        <HStack alignItems="center" gap={2}>
          {sizes.map((size, i) => (
            <Avatar key={i} selected alt="" shape="hexagon" size={size} />
          ))}
        </HStack>
      </VStack>
    </div>
  );
};

const colorSchemes = Object.keys(colorSchemeMap) as AvatarFallbackColor[];

export const ColorSchemes = () => {
  return (
    <HStack alignItems="center" flexWrap="wrap" gap={2}>
      {colorSchemes.map((colorScheme) => (
        <Avatar key={colorScheme} colorScheme={colorScheme} name={colorScheme} size="l" />
      ))}
    </HStack>
  );
};

export const FallbackColored = () => {
  return (
    <HStack alignItems="center" flexWrap="wrap" gap={2}>
      {names.map((name) => {
        const avatarFallbackColor = getAvatarFallbackColor(name);
        return <Avatar key={name} alt="" colorScheme={avatarFallbackColor} name={name} />;
      })}
    </HStack>
  );
};
