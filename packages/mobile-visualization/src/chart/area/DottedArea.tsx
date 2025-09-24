import React, { memo, useRef } from 'react';
import { Circle, Defs, G, Pattern } from 'react-native-svg';
import { useChartContext } from '@coinbase/cds-common/visualizations/charts';
import { useSparklineAreaOpacity } from '@coinbase/cds-common/visualizations/useSparklineAreaOpacity';
import { useTheme } from '@coinbase/cds-mobile/hooks/useTheme';
import { generateRandomId } from '@coinbase/cds-utils';

import { Path, type PathProps } from '../Path';

import type { AreaComponentProps } from './Area';

export type DottedAreaProps = Omit<PathProps, 'd' | 'fill' | 'fillOpacity'> &
  AreaComponentProps & {
    /**
     * Size of the pattern unit (width and height).
     * @default 4
     */
    patternSize?: number;
    /**
     * Size of the dots within the pattern.
     * @default 1
     */
    dotSize?: number;
  };

export const DottedArea = memo<DottedAreaProps>(
  ({
    d,
    fill,
    // todo: fillOpacity, fix this opacity, default is normally 1 but we want useSparklineAreaOpacity
    patternSize = 4,
    dotSize = 1,
    clipRect,
    ...pathProps
  }) => {
    const { activeColorScheme } = useTheme();
    const patternIdRef = useRef<string>(generateRandomId());

    const defaultFillOpacity = useSparklineAreaOpacity(activeColorScheme);
    const effectiveFillOpacity = defaultFillOpacity; // fillOpacity ?? defaultFillOpacity;

    const dotCenterPosition = patternSize / 2;

    return (
      <G>
        <Defs>
          <Pattern
            height={patternSize}
            id={patternIdRef.current}
            patternUnits="userSpaceOnUse"
            width={patternSize}
            x="0"
            y="0"
          >
            <Circle
              cx={dotCenterPosition}
              cy={dotCenterPosition}
              fill={fill}
              fillOpacity={effectiveFillOpacity}
              r={dotSize}
            />
          </Pattern>
        </Defs>
        <Path clipRect={clipRect} d={d} fill={`url(#${patternIdRef.current})`} {...pathProps} />
      </G>
    );
  },
);
