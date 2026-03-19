import React, { memo } from 'react';
import { interactableHeight } from '@coinbase/cds-common/tokens/interactableHeight';
import type { SharedAccessibilityProps, SharedProps } from '@coinbase/cds-common/types';
import { getButtonSpacingProps } from '@coinbase/cds-common/utils/getButtonSpacingProps';

import { useComponentConfig } from '../hooks/useComponentConfig';
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

export const LikeButton = memo(function LikeButton(_props: LikeButtonProps) {
  const mergedProps = useComponentConfig('LikeButton', _props);
  const { count = 0, compact = true, flush, liked = false, ...props } = mergedProps;
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
