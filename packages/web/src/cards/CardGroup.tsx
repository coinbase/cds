import React, { forwardRef, memo } from 'react';

import { useComponentConfig } from '../hooks/useComponentConfig';
import { Divider } from '../layout/Divider';
import type { GroupProps, RenderGroupItem } from '../layout/Group';
import { Group } from '../layout/Group';

export type CardGroupBaseProps = Omit<GroupProps, 'horizontal'>;
export type CardGroupProps = CardGroupBaseProps;
export type CardGroupRenderItem = RenderGroupItem;

export const CardGroup = memo(
  forwardRef<HTMLDivElement, CardGroupProps>(function CardGroup(_props: CardGroupProps, ref) {
    const mergedProps = useComponentConfig('CardGroup', _props);
    const {
      accessibilityLabel,
      children,
      direction = 'vertical',
      divider = Divider,
      ...props
    } = mergedProps;
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
