import React from 'react';
import { getAvatarFallbackColor } from '@cbhq/cds-common/media/getAvatarFallbackColor';
import { colorSchemeMap } from '@cbhq/cds-common/tokens/avatar';
import type { AvatarFallbackColor } from '@cbhq/cds-common/types';

import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { HStack } from '../../layout/HStack';
import { VStack } from '../../layout/VStack';
import { Avatar } from '../Avatar';

const image = 'https://avatars.slack-edge.com/2019-12-09/865473396980_e8c83b072b452e4d03f7_192.jpg';
const names = ['Sneezy', 'Happy', 'Sleepy', 'Doc', 'Bashful', 'Grumpy', 'Dopey', 'Lilo', 'Stitch'];

const FallbackColored = () => {
  return (
    <HStack alignItems="center" flexWrap="wrap" gap={2}>
      {names.map((name, idx) => {
        const avatarFallbackColor = getAvatarFallbackColor(name);
        return (
          <Avatar
            key={name}
            accessibilityLabel=""
            colorScheme={idx === 0 ? 'blue' : avatarFallbackColor}
            name={name}
          />
        );
      })}
    </HStack>
  );
};

const colorSchemes = Object.keys(colorSchemeMap) as AvatarFallbackColor[];

const AvatarScreen = () => {
  return (
    <ExampleScreen>
      <Example title="Normal">
        <HStack alignItems="center" flexWrap="wrap" gap={2}>
          <Avatar accessibilityLabel="" src={image} />
          <Avatar accessibilityLabel="" name="Happy" shape="square" src={image} />
          <Avatar accessibilityLabel="" name="Grumpy" shape="hexagon" src={image} />
          <Avatar accessibilityLabel="" borderColor="bgPositive" name="Sleepy" src={image} />
          <Avatar accessibilityLabel="" name="Bashful" size="m" src={image} />
          <Avatar accessibilityLabel="" name="Grumpy" size="l" src={image} />
          <Avatar accessibilityLabel="" name="Grumpy" size="xl" src={image} />
          <Avatar accessibilityLabel="" name="Grumpy" size="xxl" src={image} />
          <Avatar accessibilityLabel="" name="Grumpy" size="xxxl" src={image} />
        </HStack>
      </Example>
      <Example title="Fallback Image">
        <HStack alignItems="center" flexWrap="wrap" gap={2}>
          <Avatar accessibilityLabel="" />
          <Avatar accessibilityLabel="" shape="square" />
          <Avatar accessibilityLabel="" shape="hexagon" />
          <Avatar accessibilityLabel="" borderColor="bgPositive" />
          <Avatar accessibilityLabel="" size="m" />
          <Avatar accessibilityLabel="" size="l" />
          <Avatar accessibilityLabel="" size="xl" />
          <Avatar accessibilityLabel="" size="xxl" />
          <Avatar accessibilityLabel="" size="xxxl" />
        </HStack>
      </Example>
      <Example title="Color Schemes">
        <HStack gap={2}>
          {colorSchemes.map((colorScheme) => (
            <Avatar
              key={colorScheme}
              accessibilityLabel=""
              colorScheme={colorScheme}
              name={colorScheme}
              size="l"
            />
          ))}
        </HStack>
      </Example>
      <Example title="Fallback Colored">
        <VStack gap={2}>
          <FallbackColored />
        </VStack>
      </Example>
    </ExampleScreen>
  );
};

export default AvatarScreen;
