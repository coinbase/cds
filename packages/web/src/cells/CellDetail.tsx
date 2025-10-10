import React, { memo } from 'react';
import type { ThemeVars } from '@coinbase/cds-common/core/theme';

import type { TextProps } from '../typography/Text';
import { Text } from '../typography/Text';

// TODO: update this CellDetailVariant in the next breaking change release.
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
  /** Props to be spreaded into internal components */
  props?: {
    detailText?: TextProps<'div'>;
    subdetailText?: TextProps<'div'>;
  };
};

const variantColorMap: Record<CellDetailVariant, ThemeVars.Color> = {
  foregroundMuted: 'fgMuted',
  negative: 'fgNegative',
  positive: 'fgPositive',
  warning: 'fgWarning',
};

export const CellDetail = memo(function CellDetail({
  detail,
  subdetail,
  variant = 'foregroundMuted',
  props: propsProp,
}: CellDetailProps) {
  return (
    <>
      {!!detail && (
        <Text
          as="div"
          display="block"
          font="body"
          overflow="truncate"
          textAlign="end"
          {...propsProp?.detailText}
        >
          {detail}
        </Text>
      )}

      {!!subdetail && (
        <Text
          as="div"
          color={variantColorMap[variant]}
          display="block"
          overflow="truncate"
          textAlign="end"
          {...propsProp?.subdetailText}
        >
          {subdetail}
        </Text>
      )}
    </>
  );
});
