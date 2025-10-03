import { memo } from 'react';

import { ChartText, type ChartTextProps } from '../text';

export type ScrubberBeaconLabelProps = ChartTextProps;

/**
 * The ScrubberBeaconLabel is a special instance of ChartText used to label a series' scrubber beacon (i.e. a point on the series pinned to the scrubber position).
 */
export const ScrubberBeaconLabel = memo<ScrubberBeaconLabelProps>(
  ({
    background = 'white',
    color = 'var(--color-fgPrimary)',
    elevation = background !== undefined ? 1 : undefined,
    borderRadius = background !== undefined ? 4 : undefined,
    font = 'label1',
    verticalAlignment = 'middle',
    ...chartTextProps
  }) => {
    return (
      <ChartText
        background={background}
        borderRadius={borderRadius}
        color={color}
        elevation={elevation}
        font={font}
        verticalAlignment={verticalAlignment}
        {...chartTextProps}
      />
    );
  },
);
