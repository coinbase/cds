import React, { memo } from 'react';
import type { FallbackRectWidthProps } from '@cbhq/cds-common/types';
import { getRectWidthVariant } from '@cbhq/cds-common/utils/getRectWidthVariant';

import { useTheme } from '../hooks/useTheme';
import { Fallback } from '../layout';

import type { CellMediaType } from './CellMedia';
import { ContentCell } from './ContentCell';
import { MediaFallback } from './MediaFallback';

export type ContentCellFallbackProps = FallbackRectWidthProps & {
  /** Display description shimmer. */
  description?: boolean;
  /** Display media shimmer with a shape according to type. */
  media?: CellMediaType;
  /** Display meta shimmer. */
  meta?: boolean;
  /** Display subtitle shimmer. */
  subtitle?: boolean;
  /** Display title shimmer. */
  title?: boolean;
};

export const ContentCellFallback = memo(function ContentCellFallback({
  title,
  description,
  media,
  meta,
  subtitle,
  disableRandomRectWidth,
  rectWidthVariant,
}: ContentCellFallbackProps) {
  const theme = useTheme();

  return (
    <ContentCell
      description={
        description && (
          <Fallback
            disableRandomRectWidth={disableRandomRectWidth}
            height={theme.lineHeight.body}
            paddingTop={0.5}
            rectWidthVariant={getRectWidthVariant(rectWidthVariant, 0)}
            width={110}
          />
        )
      }
      media={media ? <MediaFallback type={media} /> : undefined}
      meta={
        meta && (
          <Fallback
            disableRandomRectWidth={disableRandomRectWidth}
            height={theme.lineHeight.label2}
            rectWidthVariant={getRectWidthVariant(rectWidthVariant, 1)}
            width={50}
          />
        )
      }
      title={
        (title || subtitle) && (
          <Fallback
            disableRandomRectWidth={disableRandomRectWidth}
            height={theme.lineHeight.label2}
            rectWidthVariant={getRectWidthVariant(rectWidthVariant, 2)}
            width={90}
          />
        )
      }
    />
  );
});
