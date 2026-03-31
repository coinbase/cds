import React, { memo, useCallback, useEffect, useMemo, useRef } from 'react';
import { animatedPathConfig } from '@coinbase/cds-common/animation/sparkline';
import type { ChartDataPoint, ChartTimeseries } from '@coinbase/cds-common/types';
import { getAccessibleColor } from '@coinbase/cds-common/utils/getAccessibleColor';
import { getSparklineTransform } from '@coinbase/cds-common/visualizations/getSparklineTransform';
import { useTimeseriesPaths } from '@coinbase/cds-common/visualizations/useTimeseriesPaths';
import { useTheme } from '@coinbase/cds-web/hooks/useTheme';
import { interpolatePath } from 'd3-interpolate-path';
import { select } from 'd3-selection';
import type { Area, Line } from 'd3-shape';

import { SparklinePath } from '../SparklinePath';

const { duration, easing } = animatedPathConfig;

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
    const pathRef = useRef<SVGPathElement | null>(null);
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

    const playAnimation = useCallback(() => {
      select(pathRef.current)
        .transition()
        .duration(duration)
        .ease(easing)
        .attrTween('d', function tween() {
          const current = newPath;
          return interpolatePath(initialPath, current);
        });
    }, [initialPath, newPath]);

    useEffect(() => {
      playAnimation();
      onRender?.({
        path: newPath,
        area: newArea as string,
      });
    }, [newArea, newPath, onRender, playAnimation]);

    return <SparklinePath ref={pathRef} path={initialPath} stroke={lineColor} />;
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
      <svg height={height} width={width}>
        <g {...translateProps}>{paths}</g>
      </svg>
    );
  },
);
