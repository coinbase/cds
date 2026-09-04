import React, { useCallback, useState } from 'react';
import { View } from 'react-native';
import { getAvatarFallbackColor } from '@coinbase/cds-common/media/getAvatarFallbackColor';

import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { HStack } from '../../layout/HStack';
import { VStack } from '../../layout/VStack';
import { Text } from '../../typography/Text';
import type { AvatarButtonProps } from '../AvatarButton';
import { AvatarButton } from '../AvatarButton';

const avatarImageUrl =
  'https://avatars.slack-edge.com/2019-12-09/865473396980_e8c83b072b452e4d03f7_192.jpg';
const names = ['Sneezy', 'Happy', 'Sleepy', 'Doc', 'Bashful', 'Grumpy', 'Dopey', 'Lilo', 'Stitch'];

const FallbackColoredForAvatarButtonBase = (
  props: Pick<AvatarButtonProps, 'shape' | 'loading' | 'compact'>,
) => {
  return (
    <HStack alignItems="center" flexWrap="wrap" gap={2}>
      {names.map((name, idx) => {
        const avatarFallbackColor = getAvatarFallbackColor(name);
        return (
          <AvatarButton
            key={name}
            accessibilityLabel=""
            colorScheme={idx === 0 ? 'blue' : avatarFallbackColor}
            name={name}
            {...props}
          />
        );
      })}
    </HStack>
  );
};

const AvatarButtonScreen = () => {
  const [numPresses, setNumPresses] = useState(0);

  const handlePress = useCallback(() => {
    setNumPresses((num) => num + 1);
  }, [setNumPresses]);

  return (
    <ExampleScreen>
      <View>
        <Text>Number of presses: {numPresses}</Text>
      </View>
      <Example title="Normal">
        <VStack gap={2}>
          <HStack alignItems="center" flexWrap="wrap" gap={2}>
            <AvatarButton accessibilityLabel="Sneezy" onPress={handlePress} src={avatarImageUrl} />
            <AvatarButton
              compact
              accessibilityLabel="Sneezy"
              onPress={handlePress}
              src={avatarImageUrl}
            />
          </HStack>
          <HStack alignItems="center" flexWrap="wrap" gap={2}>
            <AvatarButton accessibilityLabel="Sneezy" onPress={handlePress} />
            <AvatarButton compact accessibilityLabel="Sneezy" onPress={handlePress} />
          </HStack>
        </VStack>
      </Example>

      <Example title="Loading">
        <VStack gap={2}>
          <HStack alignItems="center" flexWrap="wrap" gap={2}>
            <AvatarButton
              loading
              accessibilityLabel="Sneezy"
              onPress={handlePress}
              src={avatarImageUrl}
            />
            <AvatarButton
              compact
              loading
              accessibilityLabel="Sneezy"
              onPress={handlePress}
              src={avatarImageUrl}
            />
          </HStack>
          <HStack alignItems="center" flexWrap="wrap" gap={2}>
            <AvatarButton loading accessibilityLabel="Sneezy" onPress={handlePress} />
            <AvatarButton compact loading accessibilityLabel="Sneezy" onPress={handlePress} />
          </HStack>
        </VStack>
      </Example>
      <Example title="Colored Fallback">
        <FallbackColoredForAvatarButtonBase />
      </Example>
      <Example title="Colored Fallback Loading">
        <FallbackColoredForAvatarButtonBase loading />
      </Example>
      <Example title="Colored Fallback Compact">
        <FallbackColoredForAvatarButtonBase compact />
      </Example>
      <Example title="Colored Fallback Compact Loading">
        <FallbackColoredForAvatarButtonBase compact loading />
      </Example>
      <Example title="Colored Fallback Square">
        <FallbackColoredForAvatarButtonBase shape="square" />
      </Example>
    </ExampleScreen>
  );
};

export default AvatarButtonScreen;
