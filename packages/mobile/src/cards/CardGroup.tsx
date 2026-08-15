import React, { memo } from 'react';
import type { View } from 'react-native';
import { gutter } from '@coinbase/cds-common/tokens/sizing';

import { Divider } from '../layout/Divider';
import type { GroupProps, RenderGroupItem } from '../layout/Group';
import { Group } from '../layout/Group';

/**
 * @deprecated Use `Box`, `HStack` or `VStack` instead. This will be removed in a future major release.
 * @deprecationExpectedRemoval v10
 */
export type CardGroupBaseProps = GroupProps;
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
export const CardGroup = memo(function CardGroup({
  ref,
  accessibilityLabel,
  accessibilityHint = accessibilityLabel,
  children,
  direction = 'vertical',
  divider = Divider,
  marginX = direction === 'horizontal' ? 0 : (-gutter as -3),
  ...props
}: CardGroupProps & {
  ref?: React.Ref<View>;
}) {
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
});

CardGroup.displayName = 'CardGroup';
