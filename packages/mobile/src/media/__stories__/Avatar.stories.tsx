import React from 'react';
import { getAvatarFallbackColor } from '@coinbase/cds-common/media/getAvatarFallbackColor';
import { colorSchemeMap } from '@coinbase/cds-common/tokens/avatar';
import type { AvatarFallbackColor, AvatarSize } from '@coinbase/cds-common/types';

import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { HStack } from '../../layout/HStack';
import { VStack } from '../../layout/VStack';
import { Avatar } from '../Avatar';

const image = 'https://avatars.slack-edge.com/2019-12-09/865473396980_e8c83b072b452e4d03f7_192.jpg';
const names = ['Sneezy', 'Happy', 'Sleepy', 'Doc', 'Bashful', 'Grumpy', 'Dopey', 'Lilo', 'Stitch'];
const sizes: AvatarSize[] = ['s', 'm', 'l', 'xl', 'xxl', 'xxxl'];

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
      <Example title="Normal - Default">
        <VStack gap={2}>
          <HStack alignItems="baseline" flexWrap="wrap" gap={2}>
            {sizes.map((size) => (
              <Avatar key={size} accessibilityLabel="" alt="" size={size} src={image} />
            ))}
          </HStack>
          <HStack alignItems="baseline" flexWrap="wrap" gap={2}>
            {sizes.map((size) => (
              <Avatar
                key={size}
                accessibilityLabel=""
                alt=""
                shape="square"
                size={size}
                src={image}
              />
            ))}
          </HStack>
          <HStack alignItems="baseline" flexWrap="wrap" gap={2}>
            {sizes.map((size) => (
              <Avatar
                key={size}
                accessibilityLabel=""
                alt=""
                shape="hexagon"
                size={size}
                src={image}
              />
            ))}
          </HStack>
        </VStack>
      </Example>
      <Example title="Normal - With borderColor">
        <VStack gap={2}>
          <HStack alignItems="center" flexWrap="wrap" gap={2}>
            {sizes.map((size) => (
              <Avatar
                key={size}
                accessibilityLabel=""
                alt=""
                borderColor="bgPositive"
                size={size}
                src={image}
              />
            ))}
          </HStack>
          <HStack alignItems="center" flexWrap="wrap" gap={2}>
            {sizes.map((size) => (
              <Avatar
                key={size}
                accessibilityLabel=""
                alt=""
                borderColor="bgPositive"
                shape="square"
                size={size}
                src={image}
              />
            ))}
          </HStack>
        </VStack>
      </Example>
      <Example title="Fallback Image - Default">
        <VStack gap={2}>
          <HStack alignItems="baseline" flexWrap="wrap" gap={2}>
            {sizes.map((size) => (
              <Avatar key={size} accessibilityLabel="" alt="" size={size} />
            ))}
          </HStack>
          <HStack alignItems="baseline" flexWrap="wrap" gap={2}>
            {sizes.map((size) => (
              <Avatar key={size} accessibilityLabel="" alt="" shape="square" size={size} />
            ))}
          </HStack>
          <HStack alignItems="baseline" flexWrap="wrap" gap={2}>
            {sizes.map((size) => (
              <Avatar key={size} accessibilityLabel="" alt="" shape="hexagon" size={size} />
            ))}
          </HStack>
        </VStack>
      </Example>
      <Example title="Fallback - Text Only">
        <VStack gap={2}>
          <HStack alignItems="baseline" flexWrap="wrap" gap={2}>
            {sizes.map((size) => (
              <Avatar key={size} accessibilityLabel="" alt="" name="Avatar" size={size} />
            ))}
          </HStack>
          <HStack alignItems="baseline" flexWrap="wrap" gap={2}>
            {sizes.map((size) => (
              <Avatar
                key={size}
                accessibilityLabel=""
                alt=""
                name="Avatar"
                shape="square"
                size={size}
              />
            ))}
          </HStack>
          <HStack alignItems="baseline" flexWrap="wrap" gap={2}>
            {sizes.map((size) => (
              <Avatar
                key={size}
                accessibilityLabel=""
                alt=""
                name="Avatar"
                shape="hexagon"
                size={size}
              />
            ))}
          </HStack>
        </VStack>
      </Example>
      <Example title="Fallback Image - With borderColor">
        <VStack gap={2}>
          <HStack alignItems="center" flexWrap="wrap" gap={2}>
            {sizes.map((size) => (
              <Avatar
                key={size}
                accessibilityLabel=""
                alt=""
                borderColor="bgPositive"
                size={size}
              />
            ))}
          </HStack>
          <HStack alignItems="center" flexWrap="wrap" gap={2}>
            {sizes.map((size) => (
              <Avatar
                key={size}
                accessibilityLabel=""
                alt=""
                borderColor="bgPositive"
                shape="square"
                size={size}
              />
            ))}
          </HStack>
        </VStack>
      </Example>
      <Example title="Color Schemes">
        <HStack alignItems="center" flexWrap="wrap" gap={2}>
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
        <FallbackColored />
      </Example>
    </ExampleScreen>
  );
};

export default AvatarScreen;
