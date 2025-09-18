import React from 'react';
import flattenNodes from '@cbhq/cds-common/utils/flattenNodes';

import type { SpacerBaseProps } from '../layout';
import type { GroupBaseProps } from '../layout/Group';

type FlattenAndJoinNodesParams<BoxProps> = {
  Spacer: React.ComponentType<React.PropsWithChildren<SpacerBaseProps>>;
  ItemWrapper?: React.ComponentType<React.PropsWithChildren<BoxProps>>;
} & GroupBaseProps<BoxProps>;

export function flattenAndJoinNodes<BoxProps>({
  children,
  direction = 'vertical',
  divider,
  gap,
  renderItem,
  ItemWrapper,
  Spacer,
}: FlattenAndJoinNodesParams<BoxProps>) {
  let finalChildren: React.ReactNode[] = [];
  const itemsToJoin: React.ReactNode[] = [];
  const shouldJoin = gap !== undefined || divider !== undefined;
  const childrenAsArray = React.Children.toArray(children);
  const flattenedChildren =
    shouldJoin || childrenAsArray.length > 1 ? flattenNodes(childrenAsArray) : undefined;

  if (gap) {
    itemsToJoin.push(<Spacer {...{ [direction]: gap }} />);
  }

  if (divider) {
    const Divider = divider;
    itemsToJoin.push(<Divider />);
  }

  const childrenContents = flattenedChildren
    ? flattenedChildren.map((item, index) =>
        renderItem && ItemWrapper
          ? renderItem({
              item,
              Wrapper: ItemWrapper,
              index,
              isFirst: index === 0,
              isLast: flattenedChildren.length - 1 === index,
            })
          : item,
      )
    : childrenAsArray;

  if (shouldJoin) {
    childrenContents.forEach((item, index) => {
      // The last item doesn't include divider or spacer
      if (index === childrenContents.length - 1) {
        finalChildren = [...finalChildren, item];
      } else {
        finalChildren = [...finalChildren, item, ...itemsToJoin];
      }
    });
    return React.Children.toArray(finalChildren);
  }
  return childrenContents;
}
