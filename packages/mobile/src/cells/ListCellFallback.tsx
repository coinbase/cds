import { memo, type ReactNode, useMemo } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import type { FallbackRectWidthProps, SharedProps } from '@coinbase/cds-common/types';
import { getRectWidthVariant } from '@coinbase/cds-common/utils/getRectWidthVariant';

import { useTheme } from '../hooks/useTheme';
import { VStack } from '../layout';
import { Fallback } from '../layout/Fallback';

import { Cell } from './Cell';
import { CellAccessory, type CellAccessoryType } from './CellAccessory';
import type { CellMediaType } from './CellMedia';
import { condensedInnerSpacing, condensedOuterSpacing, type ListCellBaseProps } from './ListCell';
import { MediaFallback } from './MediaFallback';

export type ListCellFallbackBaseProps = SharedProps &
  FallbackRectWidthProps &
  Pick<ListCellBaseProps, 'compact' | 'innerSpacing' | 'outerSpacing' | 'spacingVariant'> & {
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
  /** Styles to apply to the detail, bottomContent, and title. */
  styles?: {
    /** Style to apply to the bottom content (helper text shimmer). */
    helperText?: StyleProp<ViewStyle>;
    /** Style to apply to the detail shimmer. */
    detail?: StyleProp<ViewStyle>;
    /** Style to apply to the subdetail shimmer. */
    subdetail?: StyleProp<ViewStyle>;
    /** Style to apply to the title shimmer. */
    title?: StyleProp<ViewStyle>;
    /** Style to apply to the description shimmer. */
    description?: StyleProp<ViewStyle>;
    /** Style to apply to the subtitle shimmer. */
    subtitle?: StyleProp<ViewStyle>;
    /** Style to apply to the accessory container. */
    accessory?: StyleProp<ViewStyle>;
  };
};

export const ListCellFallback = memo(function ListCellFallback({
  accessory,
  accessoryNode,
  title,
  description,
  detail,
  subdetail,
  media,
  disableRandomRectWidth,
  rectWidthVariant,
  helperText,
  subtitle,
  styles,
  compact,
  spacingVariant = compact ? 'compact' : 'normal',
  innerSpacing,
  outerSpacing,
  ...props
}: ListCellFallbackProps) {
  const theme = useTheme();

  const descriptionFallback = useMemo(() => {
    if (!description) {
      return null;
    }

    return (
      <Fallback
        disableRandomRectWidth={disableRandomRectWidth}
        height={spacingVariant === 'condensed' ? theme.lineHeight.label2 : theme.lineHeight.body}
        rectWidthVariant={getRectWidthVariant(rectWidthVariant, 0)}
        style={styles?.description}
        testID="list-cell-fallback-description"
        width={110}
      />
    );
  }, [
    description,
    disableRandomRectWidth,
    rectWidthVariant,
    spacingVariant,
    styles?.description,
    theme.lineHeight.body,
    theme.lineHeight.label2,
  ]);

  const detailFallback = useMemo(() => {
    if (!detail && !subdetail) {
      return null;
    }

    return (
      <VStack alignContent="flex-end" alignItems="flex-end" gap={0.5} justifyContent="center">
        {!!detail && (
          <Fallback
            disableRandomRectWidth={disableRandomRectWidth}
            height={theme.lineHeight.body}
            rectWidthVariant={getRectWidthVariant(rectWidthVariant, 1)}
            style={styles?.detail}
            testID="list-cell-fallback-detail"
            width={60}
          />
        )}
        {!!subdetail && (
          <Fallback
            disableRandomRectWidth={disableRandomRectWidth}
            height={
              spacingVariant === 'condensed' ? theme.lineHeight.label2 : theme.lineHeight.body
            }
            rectWidthVariant={getRectWidthVariant(rectWidthVariant, 1)}
            style={styles?.subdetail}
            testID="list-cell-fallback-subdetail"
            width={60}
          />
        )}
      </VStack>
    );
  }, [
    detail,
    disableRandomRectWidth,
    rectWidthVariant,
    spacingVariant,
    styles?.detail,
    styles?.subdetail,
    subdetail,
    theme.lineHeight.body,
    theme.lineHeight.label2,
  ]);

  const helperTextFallback = useMemo(() => {
    if (!helperText) {
      return null;
    }

    return (
      <Fallback
        disableRandomRectWidth={disableRandomRectWidth}
        height={theme.lineHeight.body}
        rectWidthVariant={getRectWidthVariant(rectWidthVariant, 4)}
        style={styles?.helperText}
        testID="list-cell-fallback-helper-text"
        width="85%"
      />
    );
  }, [
    disableRandomRectWidth,
    helperText,
    rectWidthVariant,
    styles?.helperText,
    theme.lineHeight.body,
  ]);

  const subtitleFallback = useMemo(() => {
    if (!subtitle) {
      return null;
    }

    return (
      <Fallback
        disableRandomRectWidth={disableRandomRectWidth}
        height={theme.lineHeight.label1}
        rectWidthVariant={getRectWidthVariant(rectWidthVariant, 2)}
        style={styles?.subtitle}
        testID="list-cell-fallback-subtitle"
        width={80}
      />
    );
  }, [
    disableRandomRectWidth,
    rectWidthVariant,
    styles?.subtitle,
    subtitle,
    theme.lineHeight.label1,
  ]);

  const mediaFallback = useMemo(() => {
    if (!media) {
      return;
    }

    return <MediaFallback testID="list-cell-fallback-media" type={media} />;
  }, [media]);

  const titleFallback = useMemo(() => {
    if (!title) {
      return null;
    }

    return (
      <Fallback
        disableRandomRectWidth={disableRandomRectWidth}
        height={theme.lineHeight.headline}
        rectWidthVariant={getRectWidthVariant(rectWidthVariant, 3)}
        style={styles?.title}
        testID="list-cell-fallback-title"
        width={90}
      />
    );
  }, [disableRandomRectWidth, rectWidthVariant, styles?.title, theme.lineHeight.headline, title]);

  return (
    <Cell
      accessory={accessory ? <CellAccessory type={accessory} /> : undefined}
      accessoryNode={accessoryNode}
      bottomContent={helperTextFallback}
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
