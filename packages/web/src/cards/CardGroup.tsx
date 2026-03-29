import React, { forwardRef, memo } from 'react';

import { Divider } from '../layout/Divider';
import type { GroupProps, RenderGroupItem } from '../layout/Group';
import { Group } from '../layout/Group';

export type CardGroupBaseProps = Omit<GroupProps, 'horizontal'>;
export type CardGroupProps = CardGroupBaseProps;
export type CardGroupRenderItem = RenderGroupItem;

export const CardGroup = memo(
  forwardRef<HTMLDivElement, CardGroupProps>(function CardGroup(
    { accessibilityLabel, children, direction = 'vertical', divider = Divider, ...props },
    ref,
  ) {
    return (
      <Group
        ref={ref}
        accessibilityLabel={accessibilityLabel}
        direction={direction}
        divider={divider}
        {...props}
      >
        {children}
      </Group>
    );
  }),
);

CardGroup.displayName = 'CardGroup';
