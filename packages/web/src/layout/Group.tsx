import React, { forwardRef, memo, useMemo } from 'react';
import type { ThemeVars } from '@coinbase/cds-common/core/theme';

import { flattenAndJoinNodes } from '../utils/flattenAndJoinNodes';

import { Box, type BoxDefaultElement, type BoxProps } from './Box';
import { Spacer } from './Spacer';

export type GroupDirection = 'horizontal' | 'vertical';

export type GroupBaseProps<BoxProps> = Omit<BoxProps, 'gap'> & {
  /** Accessibility label describing the group of items. */
  accessibilityLabel?: string;
  /** Items to render in a group. */
  children?: React.ReactNode;
  /** Direction a group of components should flow.
   * @default vertical
   */
  direction?: GroupDirection;
  /** Divider Component to include between each item in a group. */
  divider?: React.ComponentType<React.PropsWithChildren<unknown>> | null;
  /** Gap to insert between siblings. */
  gap?: ThemeVars.Space;
  /** Control the layout of each item in a group.
   * @default Box component for given platform
   * @example
   * ```
   * renderItem={({item, Wrapper, index}) => {
   *  return <Wrapper borderedTop={index === 0}>{item}</Wrapper>
   * }}
   * ```
   */
  renderItem?: (info: {
    Wrapper: React.ComponentType<React.PropsWithChildren<BoxProps>>;
    item: React.ReactChild;
    index: number;
    isFirst: boolean;
    isLast: boolean;
  }) => React.ReactChild;
};

export type RenderGroupItem = GroupBaseProps<BoxProps<BoxDefaultElement>>['renderItem'];
export type GroupProps = GroupBaseProps<BoxProps<BoxDefaultElement>>;

const ItemWrapper: React.FC<React.PropsWithChildren<BoxProps<BoxDefaultElement>>> = memo(
  ({ display = 'contents', ...props }) => <Box display={display} {...props} />,
);

const fallbackRenderItem: RenderGroupItem = ({
  item,
  index,
}: {
  item: React.ReactChild;
  index: number;
}) => {
  return <ItemWrapper key={index}>{item}</ItemWrapper>;
};

/**
 * @deprecated Use `Box`, `HStack` or `VStack` instead. This will be removed in a future major release.
 * @deprecationExpectedRemoval v8
 * @danger Make sure to add a `key` prop to each item.
 */
export const Group = memo(
  forwardRef<HTMLDivElement, GroupProps>(
    (
      {
        children,
        direction = 'vertical',
        divider,
        gap,
        renderItem = fallbackRenderItem,
        role = 'group',
        ...boxProps
      },
      ref,
    ) => {
      // TODO: Remove once `horizontal` is sunset in Q2.
      const contents = useMemo(
        () =>
          flattenAndJoinNodes({
            children,
            gap,
            divider,
            renderItem,
            direction,
            Spacer,
            ItemWrapper,
          }),
        [children, direction, divider, gap, renderItem],
      );

      return (
        <Box
          ref={ref}
          alignItems="stretch"
          flexDirection={direction === 'horizontal' ? 'row' : 'column'}
          flexWrap="nowrap"
          role={role}
          {...boxProps}
        >
          {contents}
        </Box>
      );
    },
  ),
);

Group.displayName = 'Group';
