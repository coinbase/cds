import React, { memo, useRef } from 'react';
import { Circle, Defs, Path, Pattern } from 'react-native-svg';
import type { SharedProps } from '@coinbase/cds-common';
import { useTheme } from '@coinbase/cds-mobile/hooks/useTheme';
import { generateRandomId } from '@coinbase/cds-utils';

import type { BarComponentProps } from './Bar';

export type DottedBarProps = SharedProps &
  BarComponentProps & {
    /**
     * The fill color of the bar.
     * @default theme.color.fgPrimary
     */
    fill?: string;
    /**
     * The size of each dot.
     * @default 2
     */
    dotSize?: number;
    /**
     * The spacing between dots.
     * @default 4
     */
    dotSpacing?: number;
  };

/**
 * A bar component with a dotted pattern fill.
 */
export const DottedBar = memo<DottedBarProps>(
  ({
    d,
    fill,
    fillOpacity = 1,
    stroke,
    strokeWidth,
    dotSize = 2,
    dotSpacing = 4,
    x = 0,
    y = 0,
    width = 0,
    height = 0,
    yOrigin,
    ...props
  }) => {
    const theme = useTheme();
    const patternId = useRef(generateRandomId()).current;
    const patternSize = dotSize + dotSpacing;
    const effectiveFill = fill ?? theme.color.fgPrimary;
    const patternFill = `url(#${patternId})`;

    return (
      <>
        <Defs>
          <Pattern
            height={patternSize}
            id={patternId}
            patternUnits="userSpaceOnUse"
            width={patternSize}
          >
            <Circle
              cx={patternSize / 2}
              cy={patternSize / 2}
              fill={effectiveFill}
              fillOpacity={fillOpacity}
              r={dotSize / 2}
            />
          </Pattern>
        </Defs>
        <Path d={d} fill={patternFill} stroke={stroke} strokeWidth={strokeWidth} {...props} />
      </>
    );
  },
);

DottedBar.displayName = 'DottedBar';
