import { memo } from 'react';
import { useTheme } from '@coinbase/cds-mobile';

import { ChartText } from '../text';
import type { ChartInset } from '../utils';

import type { ReferenceLineLabelComponentProps } from './ReferenceLine';

export type DefaultReferenceLineLabelProps = ReferenceLineLabelComponentProps;

const elevatedInset: ChartInset = { top: 8, bottom: 8, left: 12, right: 12 };
const elevatedBorderRadius = 4;

/**
 * DefaultReferenceLineLabel is the default label component for ReferenceLine.
 * Provides standard styling with elevation, inset, and color defaults.
 */
export const DefaultReferenceLineLabel = memo<DefaultReferenceLineLabelProps>(
  ({
    color,
    elevation,
    borderRadius = elevation && elevation > 0 ? elevatedBorderRadius : undefined,
    inset = elevation && elevation > 0 ? elevatedInset : undefined,
    ...props
  }) => {
    const theme = useTheme();

    return (
      <ChartText
        borderRadius={borderRadius}
        color={color ?? theme.color.fgMuted}
        elevation={elevation}
        inset={inset}
        {...props}
      />
    );
  },
);
