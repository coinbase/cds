import { memo, useMemo } from 'react';

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
    color = 'var(--color-fgMuted)',
    elevation,
    borderRadius = elevation && elevation > 0 ? elevatedBorderRadius : undefined,
    inset = elevation && elevation > 0 ? elevatedInset : undefined,
    className,
    classNames,
    style,
    styles,
    ...props
  }) => {
    const mergedClassNames = useMemo(
      () => ({
        ...(className && { text: className }),
        ...classNames,
      }),
      [className, classNames],
    );

    const mergedStyles = useMemo(
      () => ({
        ...(style && { text: style }),
        ...styles,
      }),
      [style, styles],
    );

    return (
      <ChartText
        borderRadius={borderRadius}
        classNames={mergedClassNames}
        color={color}
        elevation={elevation}
        inset={inset}
        styles={mergedStyles}
        {...props}
      />
    );
  },
);
