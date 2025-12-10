import { memo } from 'react';

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
 * DefaultScrubberBeaconLabel is a special instance of ChartText used to label a series' scrubber beacon (i.e. a point on the series pinned to the scrubber position).
 */
export const DefaultScrubberBeaconLabel = memo<DefaultScrubberBeaconLabelProps>(
  ({
    color = 'var(--color-fgPrimary)',
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
    return (
      <ChartText
        disableRepositioning
        color={color}
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
