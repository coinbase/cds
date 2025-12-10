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
    color,
    elevated = true,
    font = 'label1',
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
        color={color ?? theme.color.fgPrimary}
        elevated={elevated}
        font={font}
        inset={inset}
        {...chartTextProps}
      >
        {label}
      </ChartText>
    );
  },
);
