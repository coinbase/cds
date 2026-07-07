import { useMemo } from 'react';
import { I18nManager } from 'react-native';
import type { TextAlignProps } from '@coinbase/cds-common/types/TextBaseProps';

export type TextAlign = TextAlignProps['align'];

export const useTextAlign = (align?: TextAlign) => {
  return useMemo(() => {
    if (align === 'start') {
      return { textAlign: I18nManager.isRTL ? 'right' : 'left' } as const;
    }
    if (align === 'end') {
      return { textAlign: I18nManager.isRTL ? 'left' : 'right' } as const;
    }
    return { textAlign: align };
  }, [align]);
};
