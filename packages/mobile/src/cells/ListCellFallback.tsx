import { memo, type ReactNode, useMemo } from 'react';
import { type StyleProp, StyleSheet, Text, type ViewStyle } from 'react-native';
import type { FallbackRectWidthProps } from '@coinbase/cds-common/types/FallbackBaseProps';
import type { SharedAccessibilityProps } from '@coinbase/cds-common/types/SharedAccessibilityProps';
import type { SharedProps } from '@coinbase/cds-common/types/SharedProps';
import { getRectWidthVariant } from '@coinbase/cds-common/utils/getRectWidthVariant';

import { useComponentConfig } from '../hooks/useComponentConfig';
import { VStack } from '../layout/VStack';
import { TextFallback } from '../typography/TextFallback';

import { Cell } from './Cell';
import { CellAccessory, type CellAccessoryType } from './CellAccessory';
import type { CellMediaType } from './CellMedia';
import { condensedInnerSpacing, condensedOuterSpacing, type ListCellBaseProps } from './ListCell';
import { MediaFallback } from './MediaFallback';

export type ListCellFallbackBaseProps = SharedProps &
  FallbackRectWidthProps &
  Pick<SharedAccessibilityProps, 'accessibilityLabel'> &
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

export const ListCellFallback = memo(function ListCellFallback(_props: ListCellFallbackProps) {
  const mergedProps = useComponentConfig('ListCellFallback', _props);
  const {
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
    accessibilityLabel = 'Loading',
    ...props
  } = mergedProps;
  const descriptionFallback = useMemo(() => {
    if (!description) {
      return null;
    }

    return (
      <TextFallback
        aria-hidden
        disableRandomRectWidth={disableRandomRectWidth}
        font={spacingVariant === 'condensed' ? 'label2' : 'body'}
        rectWidthVariant={getRectWidthVariant(rectWidthVariant, 0)}
        style={styles?.description}
        testID="list-cell-fallback-description"
        width={110}
      />
    );
  }, [description, disableRandomRectWidth, rectWidthVariant, spacingVariant, styles?.description]);

  const detailFallback = useMemo(() => {
    if (!detail && !subdetail) {
      return null;
    }

    return (
      <VStack alignContent="flex-end" alignItems="flex-end" justifyContent="center">
        {!!detail && (
          <TextFallback
            aria-hidden
            disableRandomRectWidth={disableRandomRectWidth}
            font="body"
            rectWidthVariant={getRectWidthVariant(rectWidthVariant, 1)}
            style={styles?.detail}
            testID="list-cell-fallback-detail"
            width={60}
          />
        )}
        {!!subdetail && (
          <TextFallback
            aria-hidden
            disableRandomRectWidth={disableRandomRectWidth}
            font={spacingVariant === 'condensed' ? 'label2' : 'body'}
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
  ]);

  const helperTextFallback = useMemo(() => {
    if (!helperText) {
      return null;
    }

    return (
      <TextFallback
        aria-hidden
        disableRandomRectWidth={disableRandomRectWidth}
        font="body"
        rectWidthVariant={getRectWidthVariant(rectWidthVariant, 4)}
        style={styles?.helperText}
        testID="list-cell-fallback-helper-text"
        width="85%"
      />
    );
  }, [disableRandomRectWidth, helperText, rectWidthVariant, styles?.helperText]);

  const subtitleFallback = useMemo(() => {
    if (!subtitle) {
      return null;
    }

    return (
      <TextFallback
        aria-hidden
        disableRandomRectWidth={disableRandomRectWidth}
        font="label1"
        rectWidthVariant={getRectWidthVariant(rectWidthVariant, 2)}
        style={styles?.subtitle}
        testID="list-cell-fallback-subtitle"
        width={80}
      />
    );
  }, [disableRandomRectWidth, rectWidthVariant, styles?.subtitle, subtitle]);

  const mediaFallback = useMemo(() => {
    if (!media) {
      return undefined;
    }

    return <MediaFallback aria-hidden testID="list-cell-fallback-media" type={media} />;
  }, [media]);

  const titleFallback = useMemo(() => {
    if (!title) {
      return null;
    }

    return (
      <TextFallback
        aria-hidden
        disableRandomRectWidth={disableRandomRectWidth}
        font="headline"
        rectWidthVariant={getRectWidthVariant(rectWidthVariant, 3)}
        style={styles?.title}
        testID="list-cell-fallback-title"
        width={90}
      />
    );
  }, [disableRandomRectWidth, rectWidthVariant, styles?.title, title]);

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
      position="relative"
      styles={{ accessory: styles?.accessory }}
      {...props}
    >
      {accessibilityLabel && <Text style={localStyles.visuallyHidden}>{accessibilityLabel}</Text>}
      <VStack>
        {titleFallback}
        {subtitleFallback}
        {descriptionFallback}
      </VStack>
    </Cell>
  );
});

const localStyles = StyleSheet.create({
  visuallyHidden: {
    position: 'absolute',
    width: 1,
    height: 1,
    margin: -1,
    overflow: 'hidden',
  },
});
