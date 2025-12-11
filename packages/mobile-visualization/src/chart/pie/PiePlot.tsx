import React, { memo, useMemo } from 'react';
import { useTheme } from '@coinbase/cds-mobile';

import { usePolarChartContext } from '../ChartProvider';
import { defaultAxisId } from '../utils';
import { calculateArcData } from '../utils/polar';

import { Arc, type ArcBaseProps, type ArcProps } from './Arc';

export type PiePlotBaseProps = Pick<
  ArcBaseProps,
  'fillOpacity' | 'stroke' | 'strokeWidth' | 'cornerRadius' | 'clipPathId' | 'animate'
> & {
  /**
   * Array of series IDs to render.
   * If not provided, renders all series for the axes.
   */
  seriesIds?: string[];
  /**
   * ID of the radial axis to filter series by.
   * Defaults to the default radial axis.
   */
  radialAxisId?: string;
  /**
   * ID of the angular axis to filter series by.
   * Defaults to the default angular axis.
   */
  angularAxisId?: string;
  /**
   * Custom Arc component to use for rendering slices.
   */
  ArcComponent?: React.ComponentType<ArcProps>;
};

export type PiePlotProps = PiePlotBaseProps;

/**
 * PiePlot component that renders arc slices for polar charts.
 * Filters series by radialAxisId and angularAxisId, then renders an Arc for each.
 */
export const PiePlot = memo<PiePlotProps>(
  ({
    seriesIds,
    radialAxisId: radialAxisIdProp,
    angularAxisId: angularAxisIdProp,
    ArcComponent = Arc,
    animate: animateProp,
    fillOpacity,
    stroke,
    strokeWidth = 1,
    cornerRadius,
    clipPathId,
  }) => {
    const theme = useTheme();
    const {
      series: allSeries,
      animate: contextAnimate,
      drawingArea,
      getAngularAxis,
      getRadialAxis,
    } = usePolarChartContext();

    const animate = animateProp ?? contextAnimate;

    const maxRadius = useMemo(() => {
      return Math.max(0, Math.min(drawingArea.width, drawingArea.height) / 2);
    }, [drawingArea.width, drawingArea.height]);

    const radialAxisId = radialAxisIdProp ?? defaultAxisId;
    const angularAxisId = angularAxisIdProp ?? defaultAxisId;

    const targetSeries = useMemo(() => {
      // Filter by axis IDs first
      const axisFilteredSeries = allSeries.filter(
        (s) =>
          (s.radialAxisId ?? defaultAxisId) === radialAxisId &&
          (s.angularAxisId ?? defaultAxisId) === angularAxisId,
      );

      // Then filter by seriesIds if provided
      if (seriesIds !== undefined) {
        return axisFilteredSeries.filter((s) => seriesIds.includes(s.id));
      }

      return axisFilteredSeries;
    }, [allSeries, seriesIds, radialAxisId, angularAxisId]);

    const angularAxisConfig = useMemo(
      () => getAngularAxis(angularAxisId),
      [angularAxisId, getAngularAxis],
    );

    const radialAxisConfig = useMemo(
      () => getRadialAxis(radialAxisId),
      [radialAxisId, getRadialAxis],
    );

    const { startAngleDegrees, endAngleDegrees, paddingAngleDegrees } = useMemo(() => {
      const range = angularAxisConfig?.range ?? { min: 0, max: 360 };
      return {
        startAngleDegrees: range.min ?? 0,
        endAngleDegrees: range.max ?? 360,
        paddingAngleDegrees: angularAxisConfig?.paddingAngle ?? 0,
      };
    }, [angularAxisConfig]);

    const { innerRadius, outerRadius } = useMemo(() => {
      const range = radialAxisConfig?.range ?? { min: 0, max: maxRadius };
      return {
        innerRadius: range.min ?? 0,
        outerRadius: range.max ?? maxRadius,
      };
    }, [radialAxisConfig, maxRadius]);

    const seriesData = useMemo(() => {
      return targetSeries
        .map((s) => {
          const value = typeof s.data === 'number' ? s.data : s.data[0];
          if (value === null || value === undefined) return null;
          return { value, color: s.color, id: s.id, label: s.label };
        })
        .filter((d): d is NonNullable<typeof d> => d !== null);
    }, [targetSeries]);

    const arcs = useMemo(() => {
      if (!seriesData.length) {
        return [];
      }

      const values = seriesData.map((d) => d.value);
      return calculateArcData(
        values,
        innerRadius,
        outerRadius,
        startAngleDegrees,
        endAngleDegrees,
        paddingAngleDegrees,
      );
    }, [
      seriesData,
      innerRadius,
      outerRadius,
      startAngleDegrees,
      endAngleDegrees,
      paddingAngleDegrees,
    ]);

    if (!arcs.length) return;

    return arcs.map((arc) => {
      const data = seriesData[arc.index];
      const fill = data.color ?? theme.color.fgPrimary;

      return (
        <ArcComponent
          key={data.id ?? arc.index}
          angularAxisId={angularAxisId}
          animate={animate}
          clipPathId={clipPathId}
          cornerRadius={cornerRadius}
          endAngle={arc.endAngle}
          fill={fill}
          fillOpacity={fillOpacity}
          innerRadius={arc.innerRadius}
          outerRadius={arc.outerRadius}
          paddingAngle={arc.paddingAngle}
          startAngle={arc.startAngle}
          stroke={stroke ?? theme.color.bg}
          strokeWidth={strokeWidth}
        />
      );
    });
  },
);
