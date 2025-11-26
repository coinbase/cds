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
    background = 'var(--color-bg',
    color = 'var(--color-fgPrimary)',
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
    return (
      <ChartText
        disableRepositioning
        background={background}
        borderRadius={borderRadius}
        color={color}
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
