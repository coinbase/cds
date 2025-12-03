import React, { memo } from 'react';
import { I18nManager } from 'react-native';
import type { PaddingProps } from '@coinbase/cds-common/types';

import { Icon } from '../icons/Icon';
import { Box } from '../layout/Box';

export type CellAccessoryType = 'arrow' | 'more' | 'selected' | 'unselected';

export type CellAccessoryProps = PaddingProps & {
  /** Type of accessory to display at the end. */
  type: CellAccessoryType;
  /**
   * @danger This is a migration escape hatch. It is not intended to be used normally.
   */
  className?: string;
};

export const CellAccessory = memo(function CellAccessory({ type, ...props }: CellAccessoryProps) {
  let icon;

  if (type === 'more') {
    icon = <Icon color="fgMuted" name="more" size="s" />;
  }

  if (type === 'arrow') {
    icon = <Icon color="fgMuted" name={I18nManager.isRTL ? 'caretLeft' : 'caretRight'} size="s" />;
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
    <Box {...props} testID="accessory">
      {icon}
    </Box>
  );
});
