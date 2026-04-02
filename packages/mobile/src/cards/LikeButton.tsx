import React, { memo, useCallback, useMemo, useRef } from 'react';
import { Animated } from 'react-native';
import type { GestureResponderEvent } from 'react-native';
import {
  activeScale,
  inactiveScale,
  scaleInConfig,
  scaleOutConfig,
} from '@coinbase/cds-common/animation/likeButton';
import { interactableHeight } from '@coinbase/cds-common/tokens/interactableHeight';
import type { SharedAccessibilityProps, SharedProps } from '@coinbase/cds-common/types';
import { getButtonSpacingProps } from '@coinbase/cds-common/utils/getButtonSpacingProps';

import { convertMotionConfig } from '../animation/convertMotionConfig';
import { useComponentConfig } from '../hooks/useComponentConfig';
import { TextIcon } from '../icons/TextIcon';
import { HStack } from '../layout/HStack';
import type { PressableProps } from '../system/Pressable';
import { Pressable } from '../system/Pressable';
import { Text } from '../typography/Text';

export type LikeButtonBaseProps = Pick<
  SharedAccessibilityProps,
  'accessibilityLabel' | 'accessibilityHint'
> &
  SharedProps & {
    liked?: boolean;
    count?: number;
    /** Reduce the inner padding within the button itself. */
    compact?: boolean;
    /** Ensure the button aligns flush on the left or right.
     * This prop will translate the entire button left/right,
     * so take care to ensure it is not overflowing awkwardly
     */
    flush?: 'start' | 'end';
  };

export type LikeButtonProps = LikeButtonBaseProps & PressableProps;

const scaleIn = convertMotionConfig(scaleInConfig);
const scaleOut = convertMotionConfig(scaleOutConfig);

export const LikeButton = memo(function LikeButton(_props: LikeButtonProps) {
  const mergedProps = useComponentConfig('LikeButton', _props);
  const {
    count = 0,
    compact = true,
    flush,
    liked = false,
    onPress,
    accessibilityHint,
    accessibilityLabel = 'Like',
    borderRadius = compact ? 700 : 900,
    ...props
  } = mergedProps;
  const iconScale = useRef(new Animated.Value(1));
  const iconSize = compact ? 's' : 'm';
  const size = interactableHeight[compact ? 'compact' : 'regular'];

  const { marginStart, marginEnd } = getButtonSpacingProps({ compact, flush });

  const handleOnPress = useCallback(
    (e: GestureResponderEvent) => {
      onPress?.(e);
      if (!liked) {
        const scaleInAnimation = Animated.timing(iconScale.current, scaleIn);
        const scaleOutAnimation = Animated.timing(iconScale.current, scaleOut);
        Animated.sequence([scaleInAnimation, scaleOutAnimation]).start();
      }
    },
    [liked, onPress],
  );

  const iconStyles = useMemo(
    () => ({
      opacity: iconScale.current.interpolate({
        inputRange: [inactiveScale, activeScale],
        outputRange: [1, 0.8],
      }),
      transform: [{ scale: iconScale.current }],
    }),
    [],
  );

  return (
    <Pressable
      accessibilityHint={accessibilityHint}
      accessibilityLabel={accessibilityLabel}
      background="transparent"
      borderRadius={borderRadius}
      feedback="light"
      marginEnd={marginEnd}
      marginStart={marginStart}
      onPress={handleOnPress}
      {...props}
    >
      <HStack
        alignItems="center"
        flexShrink={0}
        flexWrap="nowrap"
        gap={1}
        justifyContent="flex-start"
        minHeight={size}
        minWidth={size}
      >
        <TextIcon
          animated
          active={liked}
          color={liked ? 'fgNegative' : 'fg'}
          name="heart"
          size={iconSize}
          style={iconStyles}
        />
        {count > 0 ? (
          <Text mono font="label1">
            {count}
          </Text>
        ) : null}
      </HStack>
    </Pressable>
  );
});

LikeButton.displayName = 'LikeButton';
