import React, { memo, useMemo } from 'react';
import type { FallbackRectWidthProps } from '@coinbase/cds-common/types';
import { getRectWidthVariant } from '@coinbase/cds-common/utils/getRectWidthVariant';

import { useTheme } from '../hooks/useTheme';
import { Fallback } from '../layout';

import type { CellSpacing } from './Cell';
import type { CellAccessoryType } from './CellAccessory';
import type { CellMediaType } from './CellMedia';
import { ContentCell } from './ContentCell';
import { condensedInnerSpacing, condensedOuterSpacing } from './ListCell';
import { MediaFallback } from './MediaFallback';

type ContentCellFallbackSpacingProps = {
  innerSpacing?: CellSpacing;
  outerSpacing?: CellSpacing;
  spacingVariant?: 'normal' | 'compact' | 'condensed';
};

export type ContentCellFallbackProps = FallbackRectWidthProps &
  ContentCellFallbackSpacingProps & {
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
}: ContentCellFallbackProps) {
  const theme = useTheme();

  const descriptionHeight =
    spacingVariant === 'condensed' ? theme.lineHeight.label2 : theme.lineHeight.body;
  const subtitleHeight =
    spacingVariant === 'condensed' ? theme.lineHeight.label1 : theme.lineHeight.label2;
  const titleHeight = theme.lineHeight.headline;

  const metaNode = useMemo(() => {
    if (!meta) {
      return undefined;
    }

    return (
      <Fallback
        disableRandomRectWidth={disableRandomRectWidth}
        height={theme.lineHeight.label2}
        rectWidthVariant={getRectWidthVariant(rectWidthVariant, 0)}
        width={50}
      />
    );
  }, [meta, disableRandomRectWidth, rectWidthVariant, theme]);

  const titleNode = useMemo(() => {
    if (!title) {
      return undefined;
    }

    return (
      <Fallback
        disableRandomRectWidth={disableRandomRectWidth}
        height={titleHeight}
        rectWidthVariant={getRectWidthVariant(rectWidthVariant, 1)}
        width={90}
      />
    );
  }, [title, disableRandomRectWidth, rectWidthVariant, titleHeight]);

  const subtitleNode = useMemo(() => {
    if (!subtitle) {
      return undefined;
    }

    return (
      <Fallback
        disableRandomRectWidth={disableRandomRectWidth}
        height={subtitleHeight}
        paddingBottom={description ? 0.5 : undefined}
        paddingTop={title ? 0.5 : undefined}
        rectWidthVariant={getRectWidthVariant(rectWidthVariant, 2)}
        width={90}
      />
    );
  }, [subtitle, disableRandomRectWidth, rectWidthVariant, subtitleHeight, description, title]);

  const descriptionNode = useMemo(() => {
    if (!description) {
      return undefined;
    }

    return (
      <Fallback
        disableRandomRectWidth={disableRandomRectWidth}
        height={descriptionHeight}
        paddingTop={0.5}
        rectWidthVariant={getRectWidthVariant(rectWidthVariant, 3)}
        width={110}
      />
    );
  }, [description, disableRandomRectWidth, rectWidthVariant, descriptionHeight]);

  return (
    <ContentCell
      accessory={accessory}
      accessoryNode={accessoryNode}
      descriptionNode={descriptionNode}
      innerSpacing={
        innerSpacing ?? (spacingVariant === 'condensed' ? condensedInnerSpacing : undefined)
      }
      media={media ? <MediaFallback type={media} /> : undefined}
      metaNode={metaNode}
      outerSpacing={
        outerSpacing ?? (spacingVariant === 'condensed' ? condensedOuterSpacing : undefined)
      }
      spacingVariant={spacingVariant}
      subtitleNode={subtitleNode}
      titleNode={titleNode}
    />
  );
});
