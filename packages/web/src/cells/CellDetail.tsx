import React, { memo } from 'react';
import type { ThemeVars } from '@coinbase/cds-common/core/theme';

import type { TextProps } from '../typography/Text';
import { Text } from '../typography/Text';

// TODO: update this CellDetailVariant in the next breaking change release.
export type CellDetailVariant = 'foregroundMuted' | 'negative' | 'positive' | 'warning';

export type CellDetailProps = {
  /**
   * Label and/or extra detail. This prop is only intended to accept a string or Text component;
   * other use cases, while allowed, are not supported and may result in unexpected behavior. For arbitrary content, use `detailNode`.
   */
  detail?: React.ReactNode;
  /** React node to render label and/or extra detail. Takes precedence over `detail`. */
  detailNode?: React.ReactNode;
  /**
   * Subdetail providing more information. This prop is only intended to accept a string or Text component;
   * other use cases, while allowed, are not supported and may result in unexpected behavior. For arbitrary content, use `subdetailNode`.
   */
  subdetail?: React.ReactNode;
  /** React node to render subdetail. Takes precedence over `subdetail`. */
  subdetailNode?: React.ReactNode;
  /** Variant color to apply to the subdetail text. */
  variant?: CellDetailVariant;
  /** Font to apply to the subdetail text. */
  subdetailFont?: TextProps<'div'>['font'];
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
  subdetailFont = 'label2',
  detailNode,
  subdetailNode,
}: CellDetailProps) {
  return (
    <>
      {detailNode ? (
        detailNode
      ) : detail ? (
        <Text as="div" display="block" font="body" overflow="truncate" textAlign="end">
          {detail}
        </Text>
      ) : null}

      {subdetailNode ? (
        subdetailNode
      ) : subdetail ? (
        <Text
          as="div"
          color={variantColorMap[variant]}
          display="block"
          font={subdetailFont}
          overflow="truncate"
          textAlign="end"
        >
          {subdetail}
        </Text>
      ) : null}
    </>
  );
});
