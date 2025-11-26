import { memo } from 'react';

import { ChartText } from '../text';

import type { AxisTickLabelComponentProps } from './Axis';

export type DefaultAxisTickLabelProps = AxisTickLabelComponentProps;

/**
 * DefaultAxisTickLabel is the default label component for axis tick labels.
 * Provides standard styling for both X and Y axis tick labels.
 */
export const DefaultAxisTickLabel = memo<DefaultAxisTickLabelProps>((props) => {
  return <ChartText {...props} />;
});
