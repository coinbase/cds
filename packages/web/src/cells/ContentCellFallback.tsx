import React, { memo } from 'react';
import type { FallbackRectWidthProps } from '@cbhq/cds-common/types';
import { getRectWidthVariant } from '@cbhq/cds-common/utils/getRectWidthVariant';

import { Box } from '../layout/Box';
import { Fallback } from '../layout/Fallback';

import { Cell } from './Cell';
import type { CellMediaType } from './CellMedia';
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

const fullWidthStyle = { width: '100%' } as const;

const floatStyle = { float: 'right', width: '30%' } as const;

export const ContentCellFallback = memo(function ContentCellFallback({
  title,
  description,
  media,
  meta,
  subtitle,
  disableRandomRectWidth,
  rectWidthVariant,
}: ContentCellFallbackProps) {
  // We can't use ContentCell here as we need to account for percentage based widths.
  // Flexbox collides with percentages also, so we need to wrap in normal divs.
  return (
    <Cell media={media && <MediaFallback type={media} />}>
      <div style={fullWidthStyle}>
        {meta && (
          <div style={floatStyle}>
            <Box flexShrink={0} justifyContent="flex-end">
              <Fallback
                percentage
                disableRandomRectWidth={disableRandomRectWidth}
                height={18}
                rectWidthVariant={getRectWidthVariant(rectWidthVariant, 0)}
                width={50}
              />
            </Box>
          </div>
        )}

        {title && (
          <Fallback
            percentage
            disableRandomRectWidth={disableRandomRectWidth}
            height={18}
            rectWidthVariant={getRectWidthVariant(rectWidthVariant, 1)}
            width={45}
          />
        )}
        {subtitle && (
          <Fallback
            percentage
            disableRandomRectWidth={disableRandomRectWidth}
            height={16}
            paddingTop={0.5}
            rectWidthVariant={getRectWidthVariant(rectWidthVariant, 2)}
            width={35}
          />
        )}
        {description && (
          <Fallback
            percentage
            disableRandomRectWidth={disableRandomRectWidth}
            height={24}
            paddingTop={0.5}
            rectWidthVariant={getRectWidthVariant(rectWidthVariant, 3)}
            width={65}
          />
        )}
      </div>
    </Cell>
  );
});
