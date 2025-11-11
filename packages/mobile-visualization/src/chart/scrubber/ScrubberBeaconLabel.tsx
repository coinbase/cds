import { memo } from 'react';
import { useTheme } from '@coinbase/cds-mobile';

import { ChartText, type ChartTextProps } from '../text';

// We must disable repositioning
export type ScrubberBeaconLabelProps = Omit<ChartTextProps, 'disableRepositioning'>;

const labelVerticalInset = 2;
const labelHorizontalInset = 4;

export const ScrubberBeaconLabel = memo<ScrubberBeaconLabelProps>(
  ({
    background,
    color,
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
    const theme = useTheme();
    return (
      <ChartText
        disableRepositioning
        background={background ?? theme.color.bg}
        borderRadius={borderRadius}
        color={color ?? theme.color.fgPrimary}
        elevation={elevation}
        font={font}
        inset={inset}
        verticalAlignment={verticalAlignment}
        {...chartTextProps}
      />
    );
  },
);
