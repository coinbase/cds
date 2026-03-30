import React, { forwardRef, memo } from 'react';

import { Divider } from '../layout/Divider';
import type { GroupProps, RenderGroupItem } from '../layout/Group';
import { Group } from '../layout/Group';

/**
 * @deprecated Use `Box`, `HStack` or `VStack` instead. This will be removed in a future major release.
 * @deprecationExpectedRemoval v10
 */
export type CardGroupBaseProps = Omit<GroupProps, 'horizontal'>;
/**
 * @deprecated Use `Box`, `HStack` or `VStack` instead. This will be removed in a future major release.
 * @deprecationExpectedRemoval v10
 */
export type CardGroupProps = CardGroupBaseProps;
export type CardGroupRenderItem = RenderGroupItem;

/**
 * @deprecated Use `Box`, `HStack` or `VStack` instead. This will be removed in a future major release.
 * @deprecationExpectedRemoval v10
 */
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
