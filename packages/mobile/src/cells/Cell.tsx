import React, { memo, useMemo } from 'react';
import type { ViewProps } from 'react-native';
import type { ThemeVars } from '@cbhq/cds-common/core/theme';
import type { CellPriority, SharedProps } from '@cbhq/cds-common/types';
import { hasCellPriority } from '@cbhq/cds-common/utils/cell';

import { useCellSpacing } from '../hooks/useCellSpacing';
import { useTheme } from '../hooks/useTheme';
import { Box, type BoxBaseProps, type BoxProps } from '../layout/Box';
import { HStack } from '../layout/HStack';
import { VStack } from '../layout/VStack';
import type { LinkableProps } from '../system/Pressable';
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
  LinkableProps & {
    accessory?: React.ReactElement<CellAccessoryProps>;
    children: React.ReactNode;
    detail?: React.ReactNode;
    intermediary?: React.ReactNode;
    media?: React.ReactElement;
    borderRadius?: ThemeVars.BorderRadius;
    /** Apply a fixed width to the detail (end). */
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
  };

export type CellProps = BoxProps & CellBaseProps;

export const Cell = memo(function Cell({
  accessory,
  alignItems = 'center',
  borderRadius = 200,
  children,
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
  gap = 2,
  columnGap,
  rowGap = 1,
  innerSpacing: innerSpacingProp,
  outerSpacing: outerSpacingProp,
  bottomContent,
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
      ...(selected ? { background: 'bgAlternate' as const } : {}),
      ...(onPress ? innerSpacingWithoutMarginX : innerSpacing),
    };

    const topContentContainerProps = {
      alignItems,
      flexGrow: 1,
      gap: columnGap || gap,
      width: '100%',
    } as const;

    const topContent = (
      <>
        {!!media && (
          <Box flexGrow={0} flexShrink={0}>
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
          >
            {intermediary}
          </Box>
        )}

        {!!detail && (
          <Box
            alignItems="flex-end"
            flexGrow={detailWidth ? undefined : 1}
            flexShrink={detailWidth ? undefined : hasCellPriority('end', priority) ? 0 : 1}
            justifyContent="flex-end"
            width={detailWidth}
          >
            {detail}
          </Box>
        )}

        {!!accessory && (
          <Box flexGrow={0} flexShrink={0}>
            {accessory}
          </Box>
        )}
      </>
    );
    if (!bottomContent) {
      return (
        <HStack {...topContentContainerProps} {...contentContainerProps}>
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
        <HStack {...topContentContainerProps}>{topContent}</HStack>
        <Box>{bottomContent}</Box>
      </VStack>
    );
  }, [
    borderRadius,
    testID,
    disabled,
    selected,
    onPress,
    innerSpacingWithoutMarginX,
    innerSpacing,
    alignItems,
    columnGap,
    gap,
    media,
    priority,
    children,
    intermediary,
    detail,
    detailWidth,
    accessory,
    bottomContent,
    rowGap,
  ]);

  const wrappedContent = useMemo(() => {
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
          accessibilityState={{ disabled }}
          background="bg"
          borderRadius={borderRadius}
          contentStyle={pressStyles}
          disabled={disabled}
          onPress={onPress}
          style={[offsetStyle, pressStyles]}
        >
          {content}
        </Pressable>
      );
    }
    return content;
  }, [
    accessibilityHint,
    accessibilityLabel,
    borderRadius,
    content,
    disabled,
    onPress,
    innerSpacingMarginX,
    theme.space,
  ]);

  return (
    <Box
      alignItems="stretch"
      flexDirection="row"
      maxHeight={maxHeight}
      minHeight={minHeight}
      onLayout={onLayout}
      width="100%"
      {...outerSpacing}
      {...props}
    >
      {wrappedContent}
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
