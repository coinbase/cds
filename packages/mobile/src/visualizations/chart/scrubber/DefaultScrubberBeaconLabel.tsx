import { memo } from 'react';
import { useTheme } from '@coinbase/cds-mobile';

import { ChartText, type ChartTextProps } from '../text';

import type { ScrubberBeaconLabelProps } from './Scrubber';

const labelVerticalInset = 3.5;
const labelHorizontalInset = 4;

export type DefaultScrubberBeaconLabelProps = ScrubberBeaconLabelProps &
  Pick<
    ChartTextProps,
    'background' | 'elevated' | 'borderRadius' | 'font' | 'verticalAlignment' | 'inset' | 'opacity'
  >;

/**
 * DefaultScrubberBeaconLabel is a special instance of ChartText used to label a series' scrubber beacon.
 */
export const DefaultScrubberBeaconLabel = memo<DefaultScrubberBeaconLabelProps>(
  ({
    background,
    color,
    elevated = true,
    borderRadius = 4,
    font = 'label1',
    verticalAlignment = 'middle',
    inset = {
      left: labelHorizontalInset,
      right: labelHorizontalInset,
      top: labelVerticalInset,
      bottom: labelVerticalInset,
    },
    label,
    ...chartTextProps
  }) => {
    const theme = useTheme();
    return (
      <ChartText
        disableRepositioning
        background={background ?? theme.color.bg}
        borderRadius={borderRadius}
        color={color ?? theme.color.fgPrimary}
        elevated={elevated}
        font={font}
        inset={inset}
        verticalAlignment={verticalAlignment}
        {...chartTextProps}
      >
        {label}
      </ChartText>
    );
  },
);
