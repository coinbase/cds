import { memo } from 'react';

import { ChartText, type ChartTextProps } from '../text';

// We must disable repositioning
export type ScrubberBeaconLabelProps = Omit<ChartTextProps, 'disableRepositioning'>;

const labelVerticalInset = 3.5;
const labelHorizontalInset = 4;

/**
 * The ScrubberBeaconLabel is a special instance of ChartText used to label a series' scrubber beacon (i.e. a point on the series pinned to the scrubber position).
 */
export const ScrubberBeaconLabel = memo<ScrubberBeaconLabelProps>(
  ({
    background = 'var(--color-bg',
    color = 'var(--color-fgPrimary)',
    elevation = 1,
    borderRadius = 4,
    font = 'label1',
    verticalAlignment = 'middle',
    inset = {
      left: labelHorizontalInset,
      right: labelHorizontalInset,
      top: labelVerticalInset,
      bottom: labelVerticalInset,
    },
    ...chartTextProps
  }) => {
    return (
      <ChartText
        disableRepositioning
        background={background}
        borderRadius={borderRadius}
        color={color}
        elevation={elevation}
        font={font}
        inset={inset}
        verticalAlignment={verticalAlignment}
        {...chartTextProps}
      />
    );
  },
);
