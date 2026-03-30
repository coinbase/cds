import React, { memo } from 'react';

import { Avatar } from '../../../../media/Avatar';

export const AvatarExample = memo(() => {
  return (
    <>
      <Avatar accessibilityLabel="" colorScheme="red" name="Avatar" shape="circle" size="m" />
      <Avatar accessibilityLabel="" colorScheme="orange" name="Avatar" shape="circle" size="l" />
      <Avatar accessibilityLabel="" colorScheme="yellow" name="Avatar" shape="circle" size="xl" />
      <Avatar accessibilityLabel="" colorScheme="green" name="Avatar" shape="square" size="m" />
      <Avatar accessibilityLabel="" colorScheme="blue" name="Avatar" shape="square" size="l" />
      <Avatar accessibilityLabel="" colorScheme="purple" name="Avatar" shape="square" size="xl" />
    </>
  );
});
