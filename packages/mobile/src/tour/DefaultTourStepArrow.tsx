import React, { forwardRef, memo, useMemo } from 'react';
import type { StyleProp, View, ViewStyle } from 'react-native';

import { Box } from '../layout/Box';

import type { TourStepArrowComponentProps } from './Tour';

export const DefaultTourStepArrow = memo(
  forwardRef<View, TourStepArrowComponentProps>(({ placement, arrow, style }, ref) => {
    const width = 24;
    const height = 24;
    const hideArrow = (arrow?.centerOffset ?? 0) > 0;
    const arrowStyles: StyleProp<ViewStyle> = useMemo(() => {
      const arrowStyle: ViewStyle = {
        position: 'absolute',
        transform: 'rotate(45deg)',
        opacity: hideArrow ? 0 : undefined,
        zIndex: -1,
      };
      if (arrow?.x) arrowStyle.left = arrow.x;
      if (arrow?.y) arrowStyle.top = arrow.y;
      if (placement.includes('top')) arrowStyle.bottom = 0.5 * -height;
      if (placement.includes('bottom')) arrowStyle.top = 0.5 * -height;
      if (placement.includes('left')) arrowStyle.right = 0.5 * -width;
      if (placement.includes('right')) arrowStyle.left = 0.5 * -width;
      return [arrowStyle, style];
    }, [arrow, placement, style, width, height, hideArrow]);

    return (
      <Box
        ref={ref}
        background="bgInverse"
        height={24}
        style={arrowStyles}
        testID="tour-step-arrow"
        width={24}
      />
    );
  }),
);
