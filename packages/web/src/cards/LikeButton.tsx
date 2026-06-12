import { memo, useMemo } from 'react';
import type { SharedAccessibilityProps } from '@coinbase/cds-common/types/SharedAccessibilityProps';
import type { SharedProps } from '@coinbase/cds-common/types/SharedProps';
import { getButtonSpacingProps } from '@coinbase/cds-common/utils/getButtonSpacingProps';

import { useComponentConfig } from '../hooks/useComponentConfig';
import { useTheme } from '../hooks/useTheme';
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
    /** Use the compact variant. */
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
  const {
    count = 0,
    compact = true,
    flush,
    liked = false,
    padding = compact ? 1.5 : 2, // mirror IconButton's padding
    ...props
  } = mergedProps;
  const theme = useTheme();
  const iconSize = compact ? 's' : 'm';

  const { marginStart, marginEnd } = getButtonSpacingProps({ compact, flush });

  // override default line height to match the height of the sibling icon
  const countTextStyle = useMemo(
    () => ({ lineHeight: `${theme.iconSize[iconSize]}px` }),
    [theme.iconSize, iconSize],
  );

  return (
    <Pressable background="transparent" padding={padding} {...props}>
      <HStack
        alignItems="center"
        flexShrink={0}
        flexWrap="nowrap"
        gap={1}
        justifyContent="flex-start"
        marginEnd={marginEnd}
        marginStart={marginStart}
      >
        <Icon active={liked} color={liked ? 'fgNegative' : 'fg'} name="heart" size={iconSize} />
        {count > 0 ? (
          <Text mono as="p" display="block" font="label1" style={countTextStyle}>
            {count}
          </Text>
        ) : null}
      </HStack>
    </Pressable>
  );
});

LikeButton.displayName = 'LikeButton';
