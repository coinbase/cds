import { memo } from 'react';
import { useChartContext } from '@coinbase/cds-common/visualizations/charts';

import { Path, type PathProps } from '../Path';

import type { AreaComponentProps } from './Area';

export type SolidAreaProps = Omit<PathProps, 'd' | 'fill' | 'fillOpacity'> & AreaComponentProps;

/**
 * A customizable solid area component which uses Path.
 */
export const SolidArea = memo<SolidAreaProps>(
  ({ d, fill, fillOpacity = 1, clipRect, ...props }) => {
    const context = useChartContext();
    return <Path clipRect={clipRect} d={d} fill={fill} fillOpacity={fillOpacity} {...props} />;
  },
);
