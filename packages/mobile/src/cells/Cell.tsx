import React, { memo, useMemo } from 'react';
import { type StyleProp, StyleSheet, type ViewProps, type ViewStyle } from 'react-native';
import type { ThemeVars } from '@coinbase/cds-common/core/theme';
import type { CellPriority, SharedProps } from '@coinbase/cds-common/types';
import { hasCellPriority } from '@coinbase/cds-common/utils/cell';

import { useCellSpacing } from '../hooks/useCellSpacing';
import { useTheme } from '../hooks/useTheme';
import { Box, type BoxBaseProps, type BoxProps } from '../layout/Box';
import { HStack } from '../layout/HStack';
import { VStack } from '../layout/VStack';
import type { LinkableProps, PressableProps } from '../system/Pressable';
import { Pressable } from '../system/Pressable';

import type { CellAccessoryProps } from './CellAccessory';

export type CellSpacing = Pick<
  BoxBaseProps,
  | 'padding'
  | 'paddingX'
  | 'paddingY'
  | 'paddingTop'
  | 'paddingEnd'
  | 'paddingBottom'
  | 'paddingStart'
  | 'margin'
  | 'marginX'
  | 'marginY'
  | 'marginTop'
  | 'marginEnd'
  | 'marginBottom'
  | 'marginStart'
>;

export type CellBaseProps = SharedProps &
  LinkableProps &
  Pick<PressableProps, 'blendStyles'> & {
    accessory?: React.ReactElement<CellAccessoryProps>;
    /** Custom accessory node rendered at the end of the cell. Takes precedence over `accessory`. */
    accessoryNode?: React.ReactNode;
    /** Main content of the cell; typically title/description content. */
    children: React.ReactNode;
    /**
     * End-aligned content (e.g., value, status).
     * Replaces the deprecated `detail` prop.
     */
    end?: React.ReactNode;
    /**
     * @deprecated Use `end` instead. `detail` will be removed in a release.
     */
    detail?: React.ReactNode;
    /** Middle content between main content and detail. */
    intermediary?: React.ReactNode;
    /** Media rendered at the start of the cell (icon, avatar, image, etc). */
    media?: React.ReactElement;
    borderRadius?: ThemeVars.BorderRadius;
    /**
     * @deprecated Use `styles.end` instead. `detailWidth` will be removed in a release.
     */
    detailWidth?: number | string;
    /** Is the cell disabled? Will apply opacity and disable interaction. */
    disabled?: boolean;
    /** Which piece of content has the highest priority in regards to text truncation, growing, and shrinking. */
    priority?: CellPriority | CellPriority[];
    /** Is the cell selected? Will apply a background and selected accessory. */
    selected?: boolean;
    /** The spacing to use on the parent wrapper of Cell */
    outerSpacing?: CellSpacing;
    /** The spacing to use on the inner content of Cell */
    innerSpacing?: CellSpacing;
    /** The content to display below the main cell content. */
    bottomContent?: React.ReactNode;
    /** Measure the dimensions of the cell. */
    onLayout?: ViewProps['onLayout'];
    /** Styles for the components */
    styles?: {
      root?: StyleProp<ViewStyle>;
      contentContainer?: StyleProp<ViewStyle>;
      topContent?: StyleProp<ViewStyle>;
      bottomContent?: StyleProp<ViewStyle>;
      pressable?: StyleProp<ViewStyle>;
      media?: StyleProp<ViewStyle>;
      intermediary?: StyleProp<ViewStyle>;
      /** Applied to the container of detail or action */
      end?: StyleProp<ViewStyle>;
      accessory?: StyleProp<ViewStyle>;
    };
  };

export type CellProps = BoxProps & CellBaseProps;

export const Cell = memo(function Cell({
  accessory,
  accessoryNode,
  alignItems = 'center',
  borderRadius = 200,
  children,
  styles,
  end,
  detail,
  detailWidth,
  disabled,
  intermediary,
  media,
  minHeight,
  maxHeight,
  onLayout,
  onPress,
  priority,
  selected,
  testID,
  accessibilityLabel,
  accessibilityHint,
  accessibilityRole,
  accessibilityState,
  gap = 2,
  columnGap,
  rowGap = 1,
  innerSpacing: innerSpacingProp,
  outerSpacing: outerSpacingProp,
  bottomContent,
  style,
  background = 'bgAlternate',
  blendStyles,
  ...props
}: CellProps) {
  const theme = useTheme();
  const { inner: innerSpacing, outer: outerSpacing } = useCellSpacing({
    innerSpacing: innerSpacingProp,
    outerSpacing: outerSpacingProp,
  });

  const { marginX: innerSpacingMarginX, ...innerSpacingWithoutMarginX } = innerSpacing;

  const content = useMemo(() => {
    const contentContainerProps = {
      borderRadius,
      testID,
      renderToHardwareTextureAndroid: disabled,
      ...(selected ? { background } : {}),
      ...(onPress ? innerSpacingWithoutMarginX : innerSpacing),
      style: styles?.contentContainer,
    };

    const topContentProps = {
      alignItems,
      flexGrow: 1,
      gap: columnGap || gap,
      width: '100%',
      style: styles?.topContent,
    } as const;

    const endWidth = StyleSheet.flatten(styles?.end)?.width ?? detailWidth;

    const endContent = end ?? detail;

    const topContent = (
      <>
        {!!media && (
          <Box flexGrow={0} flexShrink={0} style={styles?.media}>
            {media}
          </Box>
        )}

        <Box
          flexGrow={1}
          flexShrink={hasCellPriority('start', priority) ? 0 : 1}
          justifyContent="flex-start"
        >
          {children}
        </Box>

        {!!intermediary && (
          <Box
            flexGrow={0}
            flexShrink={hasCellPriority('middle', priority) ? 0 : 1}
            justifyContent="center"
            style={styles?.intermediary}
          >
            {intermediary}
          </Box>
        )}

        {!!endContent && (
          <Box
            alignItems="flex-end"
            flexGrow={endWidth ? undefined : 1}
            flexShrink={endWidth ? undefined : hasCellPriority('end', priority) ? 0 : 1}
            justifyContent="flex-end"
            style={styles?.end}
            width={detailWidth}
          >
            {endContent}
          </Box>
        )}

        {!!(accessoryNode ?? accessory) && (
          <Box flexGrow={0} flexShrink={0} style={styles?.accessory}>
            {accessoryNode ?? accessory}
          </Box>
        )}
      </>
    );
    if (!bottomContent) {
      return (
        <HStack {...topContentProps} {...contentContainerProps}>
          {topContent}
        </HStack>
      );
    }
    return (
      <VStack
        alignItems="stretch"
        flexGrow={1}
        gap={rowGap}
        width="100%"
        {...contentContainerProps}
      >
        <HStack {...topContentProps}>{topContent}</HStack>
        <Box style={styles?.bottomContent}>{bottomContent}</Box>
      </VStack>
    );
  }, [
    borderRadius,
    testID,
    disabled,
    selected,
    background,
    onPress,
    innerSpacingWithoutMarginX,
    innerSpacing,
    alignItems,
    columnGap,
    gap,
    media,
    styles?.media,
    priority,
    children,
    intermediary,
    styles?.intermediary,
    end,
    detail,
    detailWidth,
    styles?.end,
    accessory,
    accessoryNode,
    styles?.accessory,
    bottomContent,
    styles?.contentContainer,
    styles?.topContent,
    styles?.bottomContent,
    rowGap,
  ]);

  const pressableWrappedContent = useMemo(() => {
    if (onPress) {
      const offsetStyle = {
        marginHorizontal: -theme.space[(innerSpacingMarginX * -1) as ThemeVars.Space],
      };
      return (
        <Pressable
          block
          noScaleOnPress
          transparentWhileInactive
          accessibilityHint={accessibilityHint}
          accessibilityLabel={accessibilityLabel}
          accessibilityRole={accessibilityRole}
          accessibilityState={{ disabled, ...accessibilityState }}
          background="bg"
          blendStyles={blendStyles}
          borderRadius={borderRadius}
          contentStyle={pressStyles}
          disabled={disabled}
          onPress={onPress}
          style={[offsetStyle, pressStyles, styles?.pressable]}
        >
          {content}
        </Pressable>
      );
    }
    return content;
  }, [
    onPress,
    content,
    theme.space,
    innerSpacingMarginX,
    accessibilityHint,
    accessibilityLabel,
    accessibilityRole,
    disabled,
    styles?.pressable,
    accessibilityState,
    blendStyles,
    borderRadius,
  ]);

  return (
    <Box
      alignItems="stretch"
      flexDirection="row"
      maxHeight={maxHeight}
      minHeight={minHeight}
      onLayout={onLayout}
      style={[styles?.root, style]}
      width="100%"
      {...outerSpacing}
      {...props}
    >
      {pressableWrappedContent}
    </Box>
  );
});

Cell.displayName = 'Cell';

// Since Pressable and Interactable wraps with another `View`,
// we need to apply flex styles to those wrappers!
const pressStyles = {
  alignItems: 'stretch',
  flexGrow: 1,
  flexDirection: 'row',
} as const;
