import React, { memo } from 'react';
import { compactListHeight, listHeight } from '@coinbase/cds-common/tokens/cell';
import type { FallbackRectWidthProps } from '@coinbase/cds-common/types';
import type { SharedAccessibilityProps } from '@coinbase/cds-common/types/SharedAccessibilityProps';
import { getRectWidthVariant } from '@coinbase/cds-common/utils/getRectWidthVariant';
import { css } from '@linaria/core';

import { Box } from '../layout/Box';
import { Fallback } from '../layout/Fallback';

import { Cell } from './Cell';
import { CellAccessory, type CellAccessoryType } from './CellAccessory';
import type { CellMediaType } from './CellMedia';
import type { ContentCellBaseProps } from './ContentCell';
import { condensedInnerSpacing, condensedOuterSpacing } from './ListCell';
import { MediaFallback } from './MediaFallback';

const visuallyHiddenCss = css`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
`;

type ContentCellFallbackSpacingProps = Pick<
  ContentCellBaseProps,
  'innerSpacing' | 'outerSpacing' | 'spacingVariant'
>;

export type ContentCellFallbackProps = FallbackRectWidthProps &
  ContentCellFallbackSpacingProps &
  Pick<SharedAccessibilityProps, 'accessibilityLabel'> & {
    /** Accessory to display at the end of the cell. */
    accessory?: CellAccessoryType;
    /** Custom accessory rendered at the end of the cell. Takes precedence over `accessory`. */
    accessoryNode?: React.ReactNode;
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

const fullWidthStyle = { width: '100%', display: 'block' } as const;

const floatStyle = { float: 'right', width: '30%' } as const;

export const ContentCellFallback = memo(function ContentCellFallback({
  accessory,
  accessoryNode,
  title,
  description,
  media,
  meta,
  subtitle,
  disableRandomRectWidth,
  rectWidthVariant,
  spacingVariant = 'normal',
  innerSpacing,
  outerSpacing,
  accessibilityLabel = 'Loading',
}: ContentCellFallbackProps) {
  // We can't use ContentCell here as we need to account for percentage based widths.
  // Flexbox collides with percentages also, so we need to wrap in normal divs.
  const minHeight =
    spacingVariant === 'compact'
      ? compactListHeight
      : spacingVariant === 'normal'
        ? listHeight
        : undefined;
  const subtitleHeight = spacingVariant === 'condensed' ? 18 : 16;

  return (
    <Cell
      accessory={accessory ? <CellAccessory paddingTop={0.5} type={accessory} /> : undefined}
      accessoryNode={accessoryNode}
      borderRadius={spacingVariant === 'condensed' ? 0 : undefined}
      innerSpacing={
        innerSpacing ?? (spacingVariant === 'condensed' ? condensedInnerSpacing : undefined)
      }
      media={media && <MediaFallback aria-hidden type={media} />}
      minHeight={minHeight}
      outerSpacing={
        outerSpacing ?? (spacingVariant === 'condensed' ? condensedOuterSpacing : undefined)
      }
      styles={{
        media: {
          alignSelf: 'flex-start',
        },
        accessory: {
          alignSelf: 'flex-start',
        },
      }}
    >
      <Box paddingTop={spacingVariant === 'condensed' ? 0.5 : 0} style={fullWidthStyle}>
        {accessibilityLabel && <span className={visuallyHiddenCss}>{accessibilityLabel}</span>}
        {meta && (
          <div style={floatStyle}>
            <Box flexShrink={0} justifyContent="flex-end">
              <Fallback
                aria-hidden
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
            aria-hidden
            percentage
            disableRandomRectWidth={disableRandomRectWidth}
            height={18}
            rectWidthVariant={getRectWidthVariant(rectWidthVariant, 1)}
            width={45}
          />
        )}
        {subtitle && (
          <Fallback
            aria-hidden
            percentage
            disableRandomRectWidth={disableRandomRectWidth}
            height={subtitleHeight}
            paddingTop={0.5}
            rectWidthVariant={getRectWidthVariant(rectWidthVariant, 2)}
            width={35}
          />
        )}
        {description && (
          <Fallback
            aria-hidden
            percentage
            disableRandomRectWidth={disableRandomRectWidth}
            height={24}
            paddingTop={0.5}
            rectWidthVariant={getRectWidthVariant(rectWidthVariant, 3)}
            width={65}
          />
        )}
      </Box>
    </Cell>
  );
});
