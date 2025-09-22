import React, { forwardRef, memo, useMemo } from 'react';
import type { TourStepArrowComponentProps } from '@cbhq/cds-common/tour/useTour';

import { Box } from '../layout/Box';

export const DefaultTourStepArrow = memo(
  forwardRef<HTMLDivElement, TourStepArrowComponentProps>(
    ({ placement, arrow, style }, ref: React.ForwardedRef<HTMLDivElement>) => {
      const width = 24;
      const height = 24;
      const hideArrow = (arrow?.centerOffset ?? 0) > 0;
      const arrowStyles: React.CSSProperties = useMemo(() => {
        const arrowStyle: React.CSSProperties = {
          position: 'absolute',
          transform: 'rotate(45deg)',
          opacity: hideArrow ? 0 : undefined,
        };
        if (arrow?.x) arrowStyle.left = arrow.x;
        if (arrow?.y) arrowStyle.top = arrow.y;
        if (placement.includes('top')) arrowStyle.bottom = 0.5 * -height;
        if (placement.includes('bottom')) arrowStyle.top = 0.5 * -height;
        if (placement.includes('left')) arrowStyle.right = 0.5 * -width;
        if (placement.includes('right')) arrowStyle.left = 0.5 * -width;
        return { ...arrowStyle, ...style };
      }, [arrow, placement, style, width, height, hideArrow]);
      return (
        <Box
          ref={ref}
          background="bgInverse"
          height={height}
          style={arrowStyles}
          testID="tour-step-arrow"
          width={width}
          zIndex={-1}
        />
      );
    },
  ),
);
