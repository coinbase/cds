import React, { memo, useCallback, useEffect, useMemo, useRef } from 'react';
import { G, Path, Svg } from 'react-native-svg';
import { borderWidth } from '@coinbase/cds-common/tokens/sparkline';
import type { ChartDataPoint, ChartTimeseries } from '@coinbase/cds-common/types';
import { getAccessibleColor } from '@coinbase/cds-common/utils/getAccessibleColor';
import { getSparklineTransform } from '@coinbase/cds-common/visualizations/getSparklineTransform';
import { useTimeseriesPaths } from '@coinbase/cds-common/visualizations/useTimeseriesPaths';
import { useTheme } from '@coinbase/cds-mobile/hooks/useTheme';
import * as interpolate from 'd3-interpolate-path';
import type { Area, Line } from 'd3-shape';

import { useInterruptiblePathAnimation } from './useInterruptiblePathAnimation';

export type TimeseriesPathOnRenderParams = {
  path: string;
  area: string;
};

export type TimeseriesPathProps = {
  lineFn: Line<ChartDataPoint>;
  areaFn: Area<ChartDataPoint>;
  timeseries: ChartTimeseries;
  initialPath: string;
  onRender?: ({ path, area }: TimeseriesPathOnRenderParams) => void;
};

const TimeseriesPath = memo(
  ({ timeseries, lineFn, initialPath, onRender, areaFn }: TimeseriesPathProps) => {
    const theme = useTheme();
    const pathRef = useRef<Path | null>(null);
    const { strokeColor } = timeseries;

    const lineColor =
      strokeColor !== 'auto'
        ? strokeColor
        : getAccessibleColor({
            background: theme.color.bg,
            foreground: 'auto',
            usage: 'graphic',
          });

    const newPath = useMemo(() => lineFn(timeseries.points) as string, [lineFn, timeseries.points]);
    const newArea = useMemo(
      () => (onRender ? (areaFn(timeseries.points) as string) : null),
      [areaFn, onRender, timeseries.points],
    );

    const pathInterpolator = useMemo(
      () => interpolate.interpolatePath(initialPath, newPath),
      [initialPath, newPath],
    );

    const animationListener = useCallback(
      ({ value }: { value: number }) => {
        const val = Number(value.toFixed(4));
        // BAD: We only disabled this lint rule to enable eslint upgrade after this component was implemented. These apis should never be used.
        // Usage in this component are known making this a high risk component. Contact team for more information.

        pathRef.current?.setNativeProps({
          d: pathInterpolator(val),
        });
      },
      [pathInterpolator],
    );

    const updatePathWithoutAnimation = useCallback(() => {
      // BAD: We only disabled this lint rule to enable eslint upgrade after this component was implemented. These apis should never be used.
      // Usage in this component are known making this a high risk component. Contact team for more information.

      pathRef.current?.setNativeProps({
        d: pathInterpolator(1),
      });
    }, [pathInterpolator]);

    const playAnimation = useInterruptiblePathAnimation({
      animationListener,
      onInterrupt: updatePathWithoutAnimation,
      ignoreMinMax: true,
    });

    useEffect(() => {
      playAnimation();

      onRender?.({
        path: newPath,
        area: newArea as string,
      });
    }, [newArea, newPath, onRender, pathInterpolator, playAnimation]);

    return (
      <Path
        ref={pathRef}
        d={initialPath}
        stroke={lineColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={borderWidth}
      />
    );
  },
);

export type SparklineInteractiveTimeseriesPathsProps = {
  initialPath: string;
  data: ChartTimeseries[];
  width: number;
  height: number;
  onRender: ({ path, area }: TimeseriesPathOnRenderParams) => void;
};

export const SparklineInteractiveTimeseriesPaths = memo(
  ({ data, width, height, initialPath, onRender }: SparklineInteractiveTimeseriesPathsProps) => {
    const { lineFn, areaFn } = useTimeseriesPaths({
      data,
      width,
      height,
    });
    const translateProps = useMemo(() => getSparklineTransform(width, height), [width, height]);

    const paths = data.map((timeseries, index) => {
      return (
        <TimeseriesPath
          key={timeseries.id}
          areaFn={areaFn}
          initialPath={initialPath}
          lineFn={lineFn}
          onRender={index === 0 ? onRender : undefined}
          timeseries={timeseries}
        />
      );
    });

    return (
      <Svg height={height} width={width}>
        <G {...translateProps}>{paths}</G>
      </Svg>
    );
  },
);
