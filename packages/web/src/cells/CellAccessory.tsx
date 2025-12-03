import React, { forwardRef, memo } from 'react';
import type { PaddingProps } from '@coinbase/cds-common/types';

import { Icon } from '../icons/Icon';
import { Box, type BoxDefaultElement, type BoxProps } from '../layout/Box';
import { isRtl } from '../utils/isRtl';

export const cellAccessoryTestId = 'accessory';

export type CellAccessoryType = 'arrow' | 'more' | 'selected' | 'unselected';

export type CellAccessoryBaseProps = PaddingProps & {
  /** Type of accessory to display at the end. */
  type: CellAccessoryType;
  /**
   * @danger This is a migration escape hatch. It is not intended to be used normally.
   */
  className?: string;
};

export type CellAccessoryProps = CellAccessoryBaseProps & BoxProps<BoxDefaultElement>;

export const CellAccessory = memo(
  forwardRef(function CellAccessory(
    { type, ...props }: CellAccessoryProps,
    ref: React.ForwardedRef<HTMLDivElement>,
  ) {
    let icon;

    if (type === 'more') {
      icon = <Icon color="fgMuted" name="more" size="s" />;
    }

    if (type === 'arrow') {
      icon = <Icon color="fgMuted" name={isRtl() ? 'caretLeft' : 'caretRight'} size="s" />;
    }

    if (type === 'selected') {
      icon = <Icon color="fgPrimary" name="checkmark" size="s" />;
    }

    if (type === 'unselected') {
      icon = <Icon name="checkmark" size="s" style={{ opacity: 0 }} />;
    }

    if (!icon) {
      return null;
    }

    return (
      <Box {...props} ref={ref} testID={cellAccessoryTestId}>
        {icon}
      </Box>
    );
  }),
);
