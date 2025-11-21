import { memo, useMemo } from 'react';
import { useTheme } from '@coinbase/cds-mobile';

import { useCartesianChartContext } from '../ChartProvider';
import { ChartText } from '../text';
import { type ChartInset, getChartInset } from '../utils';

import type { ReferenceLineLabelComponentProps } from './ReferenceLine';

export type DefaultReferenceLineLabelProps = ReferenceLineLabelComponentProps;

const elevatedInset: ChartInset = { top: 8, bottom: 8, left: 12, right: 12 };
const elevatedBorderRadius = 4;
// Default bounds inset when elevated to prevent shadow clipping
const elevatedBoundsInset: ChartInset = { top: 4, bottom: 20, left: 12, right: 12 };
const nonElevatedBoundsInset: ChartInset = { top: 0, bottom: 0, left: 0, right: 0 };

/**
 * DefaultReferenceLineLabel is the default label component for ReferenceLine.
 * Provides standard styling with elevation, inset, and color defaults.
 * When elevated, automatically adds bounds to prevent shadow cutoff at chart edges.
 */
export const DefaultReferenceLineLabel = memo<DefaultReferenceLineLabelProps>(
  ({
    color,
    elevated,
    borderRadius = elevated ? elevatedBorderRadius : undefined,
    inset = elevated ? elevatedInset : undefined,
    boundsInset: boundsInsetProp,
    ...props
  }) => {
    const theme = useTheme();
    const { width: chartWidth, height: chartHeight } = useCartesianChartContext();

    const bounds = useMemo(() => {
      const boundsInset = getChartInset(
        boundsInsetProp,
        elevated ? elevatedBoundsInset : nonElevatedBoundsInset,
      );
      return {
        x: boundsInset.left,
        y: boundsInset.top,
        width: chartWidth - boundsInset.left - boundsInset.right,
        height: chartHeight - boundsInset.top - boundsInset.bottom,
      };
    }, [elevated, boundsInsetProp, chartWidth, chartHeight]);

    return (
      <ChartText
        borderRadius={borderRadius}
        bounds={bounds}
        color={color ?? theme.color.fgMuted}
        elevated={elevated}
        inset={inset}
        {...props}
      />
    );
  },
);
