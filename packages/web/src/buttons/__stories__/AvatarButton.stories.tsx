import React from 'react';
import { getAvatarFallbackColor } from '@coinbase/cds-common/media/getAvatarFallbackColor';

import { HStack } from '../../layout/HStack';
import { VStack } from '../../layout/VStack';
import { Text } from '../../typography/Text';
import {
  AvatarButton,
  type AvatarButtonDefaultElement,
  type AvatarButtonProps,
} from '../AvatarButton';

const avatarImageUrl =
  'https://avatars.slack-edge.com/2019-12-09/865473396980_e8c83b072b452e4d03f7_192.jpg';
const names = ['Sneezy', 'Happy', 'Sleepy', 'Doc', 'Bashful', 'Grumpy', 'Dopey', 'Lilo', 'Stitch'];

const FallbackColoredBase = (
  props: Pick<
    AvatarButtonProps<AvatarButtonDefaultElement>,
    'shape' | 'loading' | 'compact' | 'selected'
  >,
) => {
  return (
    <HStack alignItems="center" flexWrap="wrap" gap={2}>
      {names.map((name, idx) => {
        const avatarFallbackColor = getAvatarFallbackColor(name);
        return (
          <AvatarButton
            key={name}
            alt=""
            colorScheme={idx === 0 ? 'blue' : avatarFallbackColor}
            name={name}
            {...props}
          />
        );
      })}
    </HStack>
  );
};

function handlePress(e: React.MouseEvent) {
  console.log(`pressed ${e.target}`);
}

export default {
  component: AvatarButton,
  title: 'Components/Buttons/AvatarButton',
};

export const Default = () => {
  return (
    <>
      <VStack gap={2}>
        <Text as="h3" display="block" font="headline">
          Default
        </Text>
        <HStack alignItems="center" gap={2}>
          <AvatarButton alt="Sneezy" onClick={handlePress} src={avatarImageUrl} />
          <AvatarButton compact alt="Sneezy" as="a" href="/" src={avatarImageUrl} />
        </HStack>
        <HStack alignItems="center" gap={2}>
          <AvatarButton alt="Sneezy" onClick={handlePress} />
          <AvatarButton compact alt="Sneezy" as="a" href="/" />
        </HStack>
      </VStack>
      <VStack gap={2} paddingTop={4}>
        <Text as="h3" display="block" font="headline">
          Loading
        </Text>
        <HStack alignItems="center" gap={2}>
          <AvatarButton
            loading
            accessibilityLabel="Sneezy Button"
            alt="Sneezy"
            onClick={handlePress}
            src={avatarImageUrl}
          />
          <AvatarButton
            compact
            loading
            accessibilityLabel="Sneezy Button"
            alt="Sneezy"
            as="a"
            href="/"
            src={avatarImageUrl}
          />
        </HStack>
        <HStack alignItems="center" gap={2}>
          <AvatarButton
            loading
            accessibilityLabel="Sneezy Button"
            alt="Sneezy"
            onClick={handlePress}
          />
          <AvatarButton
            compact
            loading
            accessibilityLabel="Sneezy Button"
            alt="Sneezy"
            as="a"
            href="/"
          />
        </HStack>
      </VStack>
      <VStack gap={2} paddingTop={4}>
        <Text as="h3" display="block" font="headline">
          Colored Fallback
        </Text>
        <FallbackColoredBase />
      </VStack>
      <VStack gap={2} paddingTop={4}>
        <Text as="h3" display="block" font="headline">
          Colored Fallback Loading
        </Text>
        <FallbackColoredBase loading />
      </VStack>
      <VStack gap={2} paddingTop={4}>
        <Text as="h3" display="block" font="headline">
          Colored Fallback Compact
        </Text>
        <FallbackColoredBase compact />
      </VStack>
      <VStack gap={2} paddingTop={4}>
        <Text as="h3" display="block" font="headline">
          Colored Fallback Compact Loading
        </Text>
        <FallbackColoredBase compact loading />
      </VStack>
      <VStack gap={2} paddingTop={4}>
        <Text as="h3" display="block" font="headline">
          Colored Fallback Selected
        </Text>
        <FallbackColoredBase selected />
      </VStack>
      <VStack gap={2} paddingTop={4}>
        <Text as="h3" display="block" font="headline">
          Colored Fallback Square
        </Text>
        <FallbackColoredBase shape="square" />
      </VStack>
      <VStack gap={2} paddingTop={4}>
        <Text as="h3" display="block" font="headline">
          Square Selected
        </Text>
        <FallbackColoredBase selected shape="square" />
      </VStack>
    </>
  );
};
