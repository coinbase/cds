import React, { memo } from 'react';
import type { ThemeVars } from '@coinbase/cds-common/core/theme';

import { VStack } from '../layout/VStack';
import { Text, type TextProps } from '../typography/Text';

export type CellDetailVariant = 'foregroundMuted' | 'negative' | 'positive' | 'warning';
export type CellDetailProps = {
  /**
   * Label and/or extra detail. This prop is only intended to accept a string or Text component;
   * other use cases, while allowed, are not supported and may result in unexpected behavior.
   */
  detail?: React.ReactNode;
  /**
   * Subdetail providing more information. This prop is only intended to accept a string or Text component;
   * other use cases, while allowed, are not supported and may result in unexpected behavior.
   */
  subdetail?: React.ReactNode;
  /** Variant color to apply to the subdetail text. */
  variant?: CellDetailVariant;
  /** Specifies whether font should be scaled down automatically to fit given style constraints. */
  adjustsFontSizeToFit?: boolean;
  /** Font to apply to the subdetail text. */
  subdetailFont?: TextProps['font'];
};

const variantColorMap: Record<CellDetailVariant, ThemeVars.Color> = {
  foregroundMuted: 'fgMuted',
  negative: 'fgNegative',
  positive: 'fgPositive',
  warning: 'fgWarning',
};

export const CellDetail = memo(function CellDetail({
  adjustsFontSizeToFit,
  detail,
  subdetail,
  variant = 'foregroundMuted',
  subdetailFont = 'label2',
}: CellDetailProps) {
  return (
    <VStack alignContent="flex-end" alignItems="flex-end" justifyContent="center">
      {!!detail && (
        <Text adjustsFontSizeToFit={adjustsFontSizeToFit} font="body" numberOfLines={1}>
          {detail}
        </Text>
      )}

      {!!subdetail && (
        <Text
          adjustsFontSizeToFit={adjustsFontSizeToFit}
          color={variantColorMap[variant]}
          font={subdetailFont}
          numberOfLines={1}
        >
          {subdetail}
        </Text>
      )}
    </VStack>
  );
});
