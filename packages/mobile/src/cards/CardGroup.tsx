import React, { forwardRef, memo } from 'react';
import type { View } from 'react-native';
import { gutter } from '@coinbase/cds-common/tokens/sizing';

import { Divider } from '../layout/Divider';
import type { GroupProps, RenderGroupItem } from '../layout/Group';
import { Group } from '../layout/Group';

export type CardGroupBaseProps = GroupProps;
export type CardGroupProps = CardGroupBaseProps;
export type CardGroupRenderItem = RenderGroupItem;

export const CardGroup = memo(
  forwardRef<View, CardGroupProps>(function CardGroup(
    {
      accessibilityLabel,
      accessibilityHint = accessibilityLabel,
      children,
      direction = 'vertical',
      divider = Divider,
      marginX = direction === 'horizontal' ? 0 : (-gutter as -3),
      ...props
    },
    ref,
  ) {
    return (
      <Group
        ref={ref}
        accessibilityHint={accessibilityHint}
        accessibilityLabel={accessibilityLabel}
        direction={direction}
        divider={divider}
        marginX={marginX}
        {...props}
      >
        {children}
      </Group>
    );
  }),
);

CardGroup.displayName = 'CardGroup';
