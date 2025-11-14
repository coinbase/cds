import { memo, useMemo } from 'react';
import type { CSSProperties, ReactNode } from 'react';
import type { FallbackRectWidthProps, SharedProps } from '@coinbase/cds-common/types';
import { getRectWidthVariant } from '@coinbase/cds-common/utils/getRectWidthVariant';

import { VStack } from '../layout';
import { Fallback } from '../layout/Fallback';

import { Cell } from './Cell';
import { CellAccessory, type CellAccessoryType } from './CellAccessory';
import type { CellMediaType } from './CellMedia';
import { condensedInnerSpacing, condensedOuterSpacing, type ListCellBaseProps } from './ListCell';
import { MediaFallback } from './MediaFallback';

export type ListCellFallbackBaseProps = SharedProps &
  FallbackRectWidthProps &
  Pick<ListCellBaseProps, 'innerSpacing' | 'outerSpacing' | 'spacingVariant'> & {
    /** Accessory to display at the end of the cell. */
    accessory?: CellAccessoryType;
    /** Custom accessory rendered at the end of the cell. Takes precedence over `accessory`. */
    accessoryNode?: ReactNode;
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
    /** Display subtitle shimmer. */
    subtitle?: boolean;
    /** Display title shimmer. */
    title?: boolean;
  };

export type ListCellFallbackProps = ListCellFallbackBaseProps & {
  /** Class names to apply to parts of the fallback cell. */
  classNames?: {
    /** Class name for the bottom content (helper text). */
    helperText?: string;
    /** Class name for the detail shimmer. */
    detail?: string;
    /** Class name for the subdetail shimmer. */
    subdetail?: string;
    /** Class name for the accessory container. */
    accessory?: string;
    /** Class name for the subtitle shimmer. */
    subtitle?: string;
    /** Class name for the title shimmer. */
    title?: string;
    /** Class name for the description shimmer. */
    description?: string;
  };
  /** Styles to apply to parts of the fallback cell. */
  styles?: {
    /** Style to apply to the bottom content (helper text shimmer). */
    helperText?: CSSProperties;
    /** Style to apply to the detail shimmer. */
    detail?: CSSProperties;
    /** Style to apply to the subdetail shimmer. */
    subdetail?: CSSProperties;
    /** Style to apply to the accessory container. */
    accessory?: CSSProperties;
    /** Style to apply to the subtitle shimmer. */
    subtitle?: CSSProperties;
    /** Style to apply to the title shimmer. */
    title?: CSSProperties;
    /** Style to apply to the description shimmer. */
    description?: CSSProperties;
  };
};

export const ListCellFallback = memo(function ListCellFallback({
  accessory,
  accessoryNode,
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
  subtitle,
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
          height={spacingVariant === 'condensed' ? 18 : 22}
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
    spacingVariant,
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

  const subtitleFallback = useMemo(() => {
    if (!subtitle) {
      return null;
    }

    return (
      <Fallback
        percentage
        className={classNames?.subtitle}
        disableRandomRectWidth={disableRandomRectWidth}
        height={18}
        rectWidthVariant={getRectWidthVariant(rectWidthVariant, 2)}
        style={styles?.subtitle}
        testID="list-cell-fallback-subtitle"
        width={50}
      />
    );
  }, [classNames?.subtitle, disableRandomRectWidth, rectWidthVariant, styles?.subtitle, subtitle]);

  const descriptionFallback = useMemo(() => {
    if (!description) {
      return null;
    }

    return (
      <Fallback
        percentage
        className={classNames?.description}
        disableRandomRectWidth={disableRandomRectWidth}
        height={spacingVariant === 'condensed' ? 18 : 22}
        rectWidthVariant={getRectWidthVariant(rectWidthVariant, 3)}
        style={styles?.description}
        testID="list-cell-fallback-description"
        width={85}
      />
    );
  }, [
    description,
    classNames?.description,
    disableRandomRectWidth,
    spacingVariant,
    rectWidthVariant,
    styles?.description,
  ]);

  const mediaFallback = useMemo(() => {
    if (!media) {
      return undefined;
    }

    return <MediaFallback testID="list-cell-fallback-media" type={media} />;
  }, [media]);

  return (
    <Cell
      accessory={accessory ? <CellAccessory type={accessory} /> : undefined}
      accessoryNode={accessoryNode}
      bottomContent={bottomContentFallback}
      classNames={{ accessory: classNames?.accessory }}
      end={detailFallback}
      innerSpacing={
        innerSpacing ?? (spacingVariant === 'condensed' ? condensedInnerSpacing : undefined)
      }
      media={mediaFallback}
      outerSpacing={
        outerSpacing ?? (spacingVariant === 'condensed' ? condensedOuterSpacing : undefined)
      }
      styles={{ accessory: styles?.accessory }}
      {...props}
    >
      <VStack gap={0.5}>
        {titleFallback}
        {subtitleFallback}
        {descriptionFallback}
      </VStack>
    </Cell>
  );
});
