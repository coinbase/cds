import React, { memo } from 'react';
import { interactableHeight } from '@cbhq/cds-common/tokens/interactableHeight';
import type { SharedAccessibilityProps, SharedProps } from '@cbhq/cds-common/types';
import { getButtonSpacingProps } from '@cbhq/cds-common/utils/getButtonSpacingProps';

import { Icon } from '../icons/Icon';
import { HStack } from '../layout/HStack';
import { Pressable, type PressableDefaultElement, type PressableProps } from '../system/Pressable';
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

export type LikeButtonProps = LikeButtonBaseProps & PressableProps<PressableDefaultElement>;

export const LikeButton = memo(function LikeButton({
  count = 0,
  compact = true,
  flush,
  liked = false,
  ...props
}: LikeButtonProps) {
  const iconSize = compact ? 's' : 'm';
  const size = interactableHeight[compact ? 'compact' : 'regular'];

  const { marginStart, marginEnd } = getButtonSpacingProps({ compact, flush });

  return (
    <Pressable background="transparent" {...props}>
      <HStack
        alignItems="center"
        flexShrink={0}
        flexWrap="nowrap"
        gap={1}
        justifyContent="flex-start"
        marginEnd={marginEnd}
        marginStart={marginStart}
        minHeight={size}
        minWidth={size}
      >
        <Icon active={liked} color={liked ? 'fgNegative' : 'fg'} name="heart" size={iconSize} />
        {count > 0 ? (
          <Text mono as="p" display="block" font="label1">
            {count}
          </Text>
        ) : null}
      </HStack>
    </Pressable>
  );
});

LikeButton.displayName = 'LikeButton';
