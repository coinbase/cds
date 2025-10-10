import { type CSSProperties, memo, useMemo } from 'react';
import type { FallbackRectWidthProps, SharedProps } from '@coinbase/cds-common/types';
import { getRectWidthVariant } from '@coinbase/cds-common/utils/getRectWidthVariant';

import { VStack } from '../layout';
import { Fallback } from '../layout/Fallback';

import { Cell, type CellBaseProps } from './Cell';
import type { CellMediaType } from './CellMedia';
import { condensedInnerSpacing, condensedOuterSpacing, type ListCellBaseProps } from './ListCell';
import { MediaFallback } from './MediaFallback';

export type ListCellFallbackBaseProps = SharedProps &
  FallbackRectWidthProps &
  Pick<ListCellBaseProps, 'innerSpacing' | 'outerSpacing' | 'spacingVariant'> & {
    /** Display description shimmer. */
    description?: boolean;
    /** Display detail shimmer. */
    detail?: boolean;
    /** Display helper text shimmer. */
    helperText?: boolean;
    /** Display media shimmer with a shape according to type. */
    media?: CellMediaType;
    /** Display subdetail shimmer. */
    subdetail?: boolean;
    /** Display title shimmer. */
    title?: boolean;
  };

export type ListCellFallbackProps = ListCellFallbackBaseProps & {
  /** Class names to apply to the detail, bottomContent, and title. */
  classNames?: {
    /** Class name for the bottom content (helper text). */
    helperText?: string;
    /** Class name for the detail shimmer. */
    detail?: string;
    /** Class name for the subdetail shimmer. */
    subdetail?: string;
    /** Class name for the title shimmer. */
    title?: string;
    /** Class name for the description shimmer. */
    description?: string;
  };
  /** Styles to apply to the detail, bottomContent, and title. */
  styles?: {
    /** Style to apply to the bottom content (helper text shimmer). */
    helperText?: CSSProperties;
    /** Style to apply to the detail shimmer. */
    detail?: CSSProperties;
    /** Style to apply to the subdetail shimmer. */
    subdetail?: CSSProperties;
    /** Style to apply to the title shimmer. */
    title?: CSSProperties;
    /** Style to apply to the description shimmer. */
    description?: CSSProperties;
  };
};

export const ListCellFallback = memo(function ListCellFallback({
  classNames,
  styles,
  title,
  description,
  detail,
  subdetail,
  media,
  disableRandomRectWidth,
  rectWidthVariant,
  helperText,
  spacingVariant,
  innerSpacing,
  outerSpacing,
  ...props
}: ListCellFallbackProps) {
  // We cant use ListCell here as we need to account for percentage based widths.
  // Flexbox collides with percentages also, so we need to wrap in normal divs.

  const bottomContentFallback = useMemo(() => {
    if (!helperText) {
      return null;
    }

    return (
      <Fallback
        percentage
        className={classNames?.helperText}
        disableRandomRectWidth={disableRandomRectWidth}
        height={22}
        rectWidthVariant={getRectWidthVariant(rectWidthVariant, 4)}
        style={styles?.helperText}
        testID="list-cell-fallback-helper-text"
        width={85}
      />
    );
  }, [
    classNames?.helperText,
    disableRandomRectWidth,
    helperText,
    rectWidthVariant,
    styles?.helperText,
  ]);

  const detailFallback = useMemo(() => {
    if (!detail && !subdetail) {
      return null;
    }

    return (
      <VStack
        alignItems="flex-end"
        className={classNames?.detail}
        flexShrink={0}
        gap={0.5}
        style={styles?.detail}
        testID="list-cell-fallback-detail"
      >
        <Fallback
          percentage
          className={classNames?.detail}
          disableRandomRectWidth={disableRandomRectWidth}
          height={22}
          rectWidthVariant={getRectWidthVariant(rectWidthVariant, 0)}
          style={styles?.detail}
          width={60}
        />
        <Fallback
          percentage
          className={classNames?.subdetail}
          disableRandomRectWidth={disableRandomRectWidth}
          height={22}
          rectWidthVariant={getRectWidthVariant(rectWidthVariant, 1)}
          style={styles?.subdetail}
          width={50}
        />
      </VStack>
    );
  }, [
    detail,
    subdetail,
    classNames?.detail,
    classNames?.subdetail,
    styles?.detail,
    styles?.subdetail,
    disableRandomRectWidth,
    rectWidthVariant,
  ]);

  const titleFallback = useMemo(() => {
    if (!title) {
      return null;
    }

    return (
      <Fallback
        percentage
        className={classNames?.title}
        disableRandomRectWidth={disableRandomRectWidth}
        height={22}
        rectWidthVariant={getRectWidthVariant(rectWidthVariant, 2)}
        style={styles?.title}
        testID="list-cell-fallback-title"
        width={65}
      />
    );
  }, [classNames?.title, disableRandomRectWidth, rectWidthVariant, styles?.title, title]);

  const descriptionFallback = useMemo(() => {
    if (!description) {
      return null;
    }

    return (
      <Fallback
        percentage
        className={classNames?.description}
        disableRandomRectWidth={disableRandomRectWidth}
        height={22}
        rectWidthVariant={getRectWidthVariant(rectWidthVariant, 3)}
        style={styles?.description}
        testID="list-cell-fallback-description"
        width={85}
      />
    );
  }, [
    classNames?.description,
    disableRandomRectWidth,
    rectWidthVariant,
    styles?.description,
    description,
  ]);

  const mediaFallback = useMemo(() => {
    if (!media) {
      return undefined;
    }

    return <MediaFallback testID="list-cell-fallback-media" type={media} />;
  }, [media]);

  return (
    <Cell
      bottomContent={bottomContentFallback}
      detail={detailFallback}
      innerSpacing={
        innerSpacing ?? (spacingVariant === 'condensed' ? condensedInnerSpacing : undefined)
      }
      media={mediaFallback}
      outerSpacing={
        outerSpacing ?? (spacingVariant === 'condensed' ? condensedOuterSpacing : undefined)
      }
      {...props}
    >
      <VStack gap={0.5}>
        {titleFallback}
        {descriptionFallback}
      </VStack>
    </Cell>
  );
});
