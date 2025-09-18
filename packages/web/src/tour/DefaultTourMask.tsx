import React, { memo, useMemo } from 'react';

import type { TourMaskComponentProps } from './Tour';

export const DefaultTourMask = memo(
  ({
    activeTourStepTargetRect,
    padding = 'var(--spacing-2)',
    borderRadius = 0,
  }: TourMaskComponentProps) => {
    const paddingValue = typeof padding === 'number' ? `${padding}px` : padding;
    const maskStyle = useMemo(
      () => ({
        width: `calc(${activeTourStepTargetRect.width}px + ${paddingValue})`,
        height: `calc(${activeTourStepTargetRect.height}px + ${paddingValue})`,
        x: `calc(${activeTourStepTargetRect.x}px - (0.5 * ${paddingValue}))`,
        y: `calc(${activeTourStepTargetRect.y}px - (0.5 * ${paddingValue}))`,
      }),
      [activeTourStepTargetRect, paddingValue],
    );
    return (
      <svg height="100vh" width="100vw">
        <defs>
          <mask id="tourOverlayMask">
            <rect fill="#fff" height="100vh" width="100vw" />
            <rect rx={borderRadius} ry={borderRadius} style={maskStyle} />
          </mask>
        </defs>
        <rect
          fill="rgb(50, 53, 61, 0.33)"
          height="100%"
          mask="url(#tourOverlayMask)"
          width="100%"
        />
      </svg>
    );
  },
);
