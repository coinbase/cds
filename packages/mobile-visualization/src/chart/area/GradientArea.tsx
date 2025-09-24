import React, { memo, useRef } from 'react';
import { Defs, LinearGradient, Stop } from 'react-native-svg';
import { useChartContext } from '@coinbase/cds-common/visualizations/charts';
import { useTheme } from '@coinbase/cds-mobile/hooks/useTheme';
import { generateRandomId } from '@coinbase/cds-utils';

import { Path, type PathProps } from '../Path';

import type { AreaComponentProps } from './Area';

export type GradientAreaProps = Omit<PathProps, 'd' | 'fill' | 'fillOpacity'> &
  AreaComponentProps & {
    /**
     * The color of the start of the gradient.
     * @default fill or theme.color.fgPrimary
     */
    startColor?: string;
    /**
     * The color of the end of the gradient.
     * @default fill or theme.color.fgPrimary
     */
    endColor?: string;
    /**
     * Opacity of the start color.
     */
    startOpacity?: number;
    /**
     * Opacity of the end color.
     */
    endOpacity?: number;
  };

/**
 * A customizable gradient area component which uses Path.
 */
export const GradientArea = memo<GradientAreaProps>(
  ({
    d,
    fill,
    fillOpacity = 1,
    startColor,
    endColor,
    startOpacity = 0.4 * fillOpacity,
    endOpacity = 0,
    clipRect,
    ...pathProps
  }) => {
    const context = useChartContext();
    const theme = useTheme();
    const patternIdRef = useRef<string>(generateRandomId());

    const effectiveFill = fill ?? theme.color.fgPrimary;

    return (
      <>
        <Defs>
          <LinearGradient id={patternIdRef.current} x1="0%" x2="0%" y1="0%" y2="100%">
            <Stop offset="0%" stopColor={startColor ?? effectiveFill} stopOpacity={startOpacity} />
            <Stop offset="100%" stopColor={endColor ?? effectiveFill} stopOpacity={endOpacity} />
          </LinearGradient>
        </Defs>
        <Path clipRect={clipRect} d={d} fill={`url(#${patternIdRef.current})`} {...pathProps} />
      </>
    );
  },
);
