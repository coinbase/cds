import { memo, useRef } from 'react';
import { Defs, LinearGradient, Stop } from 'react-native-svg';
import type { SharedProps } from '@coinbase/cds-common/types';
import { useTheme } from '@coinbase/cds-mobile/hooks/useTheme';
import { generateRandomId } from '@coinbase/cds-utils';

import { useCartesianChartContext } from '../ChartProvider';
import { Path, type PathProps } from '../Path';

export type GradientLineProps = SharedProps &
  Omit<PathProps, 'stroke' | 'strokeOpacity' | 'strokeWidth'> & {
    /**
     * The color of the line.
     * @default theme.color.bgLine
     */
    stroke?: string;
    /**
     * Opacity of the line.
     * @default 1
     */
    strokeOpacity?: number;
    /**
     * Path stroke width
     * @default 2
     */
    strokeWidth?: number;
    /**
     * The color of the start of the gradient.
     * @default stroke or theme.color.bgLine
     */
    startColor?: string;
    /**
     * The color of the end of the gradient.
     * @default stroke or theme.color.bgLine
     */
    endColor?: string;
    /**
     * Opacity of the start color.
     * @default strokeOpacity
     */
    startOpacity?: number;
    /**
     * Opacity of the end color.
     * @default strokeOpacity
     */
    endOpacity?: number;
  };

/**
 * A gradient line component which uses path element.
 * todo: should we rely on getAccessibleForegroundGradient or just use the startColor and endColor props?
 */
export const GradientLine = memo<GradientLineProps>(
  ({
    fill = 'none',
    stroke,
    startColor,
    endColor,
    strokeOpacity = 1,
    startOpacity = strokeOpacity,
    endOpacity = strokeOpacity,
    strokeLinecap = 'round',
    strokeLinejoin = 'round',
    strokeWidth = 2,
    animate,
    ...props
  }) => {
    const context = useCartesianChartContext();
    const theme = useTheme();
    const patternIdRef = useRef<string>(generateRandomId());

    const shouldAnimate = animate ?? context.animate;

    return (
      <>
        <Defs>
          <LinearGradient id={patternIdRef.current} x1="0%" x2="0%" y1="0%" y2="100%">
            <Stop
              offset="0%"
              stopColor={startColor ?? stroke ?? theme.color.bgLine}
              stopOpacity={startOpacity}
            />
            <Stop
              offset="100%"
              stopColor={endColor ?? stroke ?? theme.color.bgLine}
              stopOpacity={endOpacity}
            />
          </LinearGradient>
        </Defs>
        <Path
          animate={shouldAnimate}
          clipOffset={strokeWidth}
          fill={fill}
          stroke={`url(#${patternIdRef.current})`}
          strokeLinecap={strokeLinecap}
          strokeLinejoin={strokeLinejoin}
          strokeOpacity={strokeOpacity}
          strokeWidth={strokeWidth}
          {...props}
        />
      </>
    );
  },
);
