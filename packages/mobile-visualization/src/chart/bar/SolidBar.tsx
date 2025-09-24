import React, { memo } from 'react';
import { Path } from 'react-native-svg';
import type { SharedProps } from '@coinbase/cds-common/types';
import { useTheme } from '@coinbase/cds-mobile/hooks/useTheme';

import type { BarComponentProps } from './Bar';

export type SolidBarProps = SharedProps &
  BarComponentProps & {
    /**
     * The fill color of the bar.
     * @default theme.color.fgPrimary
     */
    fill?: string;
  };

/**
 * A customizable solid bar component which uses path element.
 */
export const SolidBar = memo<SolidBarProps>(
  ({
    d,
    fill,
    x = 0,
    y = 0,
    width = 0,
    height = 0,
    yOrigin,
    fillOpacity = 1,
    stroke,
    strokeWidth,
    ...props
  }) => {
    const theme = useTheme();
    const effectiveFill = fill ?? theme.color.fgPrimary;

    return (
      <Path
        d={d}
        fill={effectiveFill}
        fillOpacity={fillOpacity}
        stroke={stroke}
        strokeWidth={strokeWidth}
        {...props}
      />
    );
  },
);
