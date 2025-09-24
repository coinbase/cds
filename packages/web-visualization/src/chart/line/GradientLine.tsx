import { memo, useRef } from 'react';
import type { SharedProps } from '@coinbase/cds-common/types';
import { generateRandomId } from '@coinbase/cds-utils';

import { Path, type PathProps } from '../Path';

import type { LineComponentProps } from './Line';

export type GradientLineProps = SharedProps &
  Omit<PathProps, 'stroke' | 'strokeOpacity' | 'strokeWidth'> &
  Pick<LineComponentProps, 'strokeWidth'> & {
    /**
     * The color of the line.
     * @default 'var(--color-bgLine)'
     */
    stroke?: string;
    /**
     * Opacity of the line.
     * @default 1
     */
    strokeOpacity?: number;
    /**
     * The color of the start of the gradient.
     * @default stroke or 'var(--color-bgLine)'
     */
    startColor?: string;
    /**
     * The color of the end of the gradient.
     * @default stroke or 'var(--color-bgLine)'
     */
    endColor?: string;
    /**
     * Opacity of the start color.
     * @default strokeOpacity
     */
    startOpacity?: number;
    /**
     * Opacity of the end color.
     * @default strokeOpacity
     */
    endOpacity?: number;
  };

/**
 * A gradient line component which uses path element.
 * todo: should we rely on getAccessibleForegroundGradient or just use the startColor and endColor props?
 */
export const GradientLine = memo<GradientLineProps>(
  ({
    fill = 'none',
    stroke = 'var(--color-bgLine)',
    startColor,
    endColor,
    strokeOpacity = 1,
    startOpacity = strokeOpacity,
    endOpacity = strokeOpacity,
    strokeLinecap = 'round',
    strokeLinejoin = 'round',
    strokeWidth = 2,
    ...props
  }) => {
    const patternIdRef = useRef<string>(generateRandomId());

    return (
      <>
        <defs>
          <linearGradient id={patternIdRef.current} x1="0%" x2="0%" y1="0%" y2="100%">
            <stop offset="0%" stopColor={startColor ?? stroke} stopOpacity={startOpacity} />
            <stop offset="100%" stopColor={endColor ?? stroke} stopOpacity={endOpacity} />
          </linearGradient>
        </defs>
        <Path
          clipOffset={strokeWidth}
          fill={fill}
          stroke={`url(#${patternIdRef.current})`}
          strokeLinecap={strokeLinecap}
          strokeLinejoin={strokeLinejoin}
          strokeOpacity={strokeOpacity}
          strokeWidth={strokeWidth}
          {...props}
        />
      </>
    );
  },
);
