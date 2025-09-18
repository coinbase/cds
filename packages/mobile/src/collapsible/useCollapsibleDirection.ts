import type { CollapsibleProps } from './Collapsible';

export type UseCollapsibleDirectionReturn = ReturnType<typeof useCollapsibleDirection>;

export const useCollapsibleDirection = ({
  direction,
  maxHeight,
  maxWidth,
  contentWidth,
  contentHeight,
}: Pick<CollapsibleProps, 'direction' | 'maxHeight' | 'maxWidth'> & {
  contentWidth: number;
  contentHeight: number;
}) => {
  if (direction === 'vertical') {
    return {
      shouldEnableScroll: maxHeight ? contentHeight > maxHeight : false,
      animateTo: maxHeight ?? contentHeight,
      animateProperty: 'maxHeight',
      horizontal: false,
    };
  }

  return {
    shouldEnableScroll: maxWidth ? contentWidth > maxWidth : false,
    animateTo: maxWidth ?? contentWidth,
    animateProperty: 'maxWidth',
    horizontal: true,
  };
};
