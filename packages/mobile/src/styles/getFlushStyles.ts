import { I18nManager, type ViewStyle } from 'react-native';

import type { ButtonBaseProps } from '../buttons/Button';

type GetFlushStylesProps = {
  flush: ButtonBaseProps['flush'];
  spacing: ViewStyle;
};

export const getFlushStyles = ({ flush, spacing }: GetFlushStylesProps): ViewStyle => {
  let offsetDirection = flush === 'start' ? 'left' : 'right';
  // We need to invert the setup for RTL
  if (I18nManager.isRTL) {
    offsetDirection = flush === 'start' ? 'right' : 'left';
  }

  const style = {
    marginLeft: offsetDirection === 'left' ? Number(spacing.paddingLeft ?? 0) * -1 : 0,
    marginRight: offsetDirection === 'right' ? Number(spacing.paddingRight ?? 0) * -1 : 0,
  };

  return flush ? style : {};
};
