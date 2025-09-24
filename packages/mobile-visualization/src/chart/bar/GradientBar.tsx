import React, { memo, useRef } from 'react';
import { Defs, LinearGradient, Path, Stop } from 'react-native-svg';
import type { SharedProps } from '@coinbase/cds-common';
import { useTheme } from '@coinbase/cds-mobile/hooks/useTheme';
import { generateRandomId } from '@coinbase/cds-utils';

import type { BarComponentProps } from './Bar';

export type GradientBarProps = SharedProps &
  BarComponentProps & {
    /**
     * The fill color of the bar.
     * @default theme.color.fgPrimary
     */
    fill?: string;
    /**
     * The color at the start of the gradient.
     * @default fill color
     */
    startColor?: string;
    /**
     * The color at the end of the gradient.
     * @default fill color
     */
    endColor?: string;
    /**
     * The opacity at the start of the gradient.
     * @default fillOpacity
     */
    startOpacity?: number;
    /**
     * The opacity at the end of the gradient.
     * @default 0.2 * fillOpacity
     */
    endOpacity?: number;
  };

/**
 * A bar component with gradient fill.
 */
export const GradientBar = memo<GradientBarProps>(
  ({
    d,
    fill,
    fillOpacity = 1,
    stroke,
    strokeWidth,
    startColor,
    endColor,
    startOpacity,
    endOpacity,
    x = 0,
    y = 0,
    width = 0,
    height = 0,
    yOrigin,
    ...props
  }) => {
    const theme = useTheme();
    const gradientId = useRef(generateRandomId()).current;
    const effectiveFill = fill ?? theme.color.fgPrimary;
    const gradientFill = `url(#${gradientId})`;

    return (
      <>
        <Defs>
          <LinearGradient id={gradientId} x1="0%" x2="0%" y1="0%" y2="100%">
            <Stop
              offset="0%"
              stopColor={startColor ?? effectiveFill}
              stopOpacity={startOpacity ?? fillOpacity}
            />
            <Stop
              offset="100%"
              stopColor={endColor ?? effectiveFill}
              stopOpacity={endOpacity ?? 0}
            />
          </LinearGradient>
        </Defs>
        <Path d={d} fill={gradientFill} stroke={stroke} strokeWidth={strokeWidth} {...props} />
      </>
    );
  },
);
