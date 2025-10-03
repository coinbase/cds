import React, { forwardRef, memo, useMemo, useRef } from 'react';
import { Defs, G, LinearGradient, Path, Stop, Svg } from 'react-native-svg';
import { getAccessibleForegroundGradient } from '@coinbase/cds-common/color/getAccessibleForegroundGradient';
import { borderWidth } from '@coinbase/cds-common/tokens/sparkline';
import { getAccessibleColor } from '@coinbase/cds-common/utils/getAccessibleColor';
import { getSparklineTransform } from '@coinbase/cds-common/visualizations/getSparklineTransform';
import { useTheme } from '@coinbase/cds-mobile/hooks/useTheme';
import { generateRandomId } from '@coinbase/cds-utils';

import { generateSparklineAreaWithId } from './generateSparklineWithId';
import type { SparklineBaseProps } from './Sparkline';
import { SparklineAreaPattern } from './SparklineAreaPattern';

/**
 * @deprecated Use LineChart instead.
 */
export const SparklineGradient = memo(
  forwardRef<Path | null, SparklineBaseProps>(
    ({ background, color, path, height, width, yAxisScalingFactor, children }, ref) => {
      const theme = useTheme();
      const patternId = useRef<string>(generateRandomId());
      const translateProps = getSparklineTransform(width, height, yAxisScalingFactor);
      const gradient = getAccessibleForegroundGradient({
        background: background ?? theme.color.bg,
        color,
        colorScheme: theme.activeColorScheme,
        usage: 'graphic',
      });
      const areaColor =
        color !== 'auto'
          ? color
          : getAccessibleColor({
              background: background ?? theme.color.bg,
              foreground: 'auto',
              usage: 'graphic',
            });

      const hasChildren = !!children;
      const linearGradient = useMemo(() => {
        return (
          <Defs>
            <LinearGradient id="gradient" x1="0%" x2="100%" y1="0%" y2="0%">
              {gradient.map((item, i) => (
                <Stop key={`${i}_${item}`} offset={item.offset} stopColor={item.color} />
              ))}
            </LinearGradient>
            {hasChildren && <SparklineAreaPattern color={areaColor} id={patternId.current} />}
          </Defs>
        );
      }, [areaColor, hasChildren, gradient]);

      return (
        <Svg fill="none" height={height} width={width}>
          {linearGradient}
          <G {...translateProps}>
            <Path
              ref={ref}
              d={path}
              stroke="url(#gradient)"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={borderWidth}
            />
            {generateSparklineAreaWithId(patternId.current, children)}
          </G>
        </Svg>
      );
    },
  ),
);

SparklineGradient.displayName = 'SparklineGradient';
