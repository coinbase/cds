import React, { memo, useMemo } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';

import { Box } from '../../layout/Box';
import { HStack } from '../../layout/HStack';
import { VStack } from '../../layout/VStack';
import { Tag } from '../../tag/Tag';
import { Text } from '../../typography';

export type DataCardLayoutBaseProps = {
  /** Text or React node to display as the card title. When a string is provided, it will be rendered in a CardTitle component. */
  title: React.ReactNode;
  /** Text or React node to display as the card subtitle. When a string is provided, it will be rendered in a CardSubtitle component. */
  subtitle?: React.ReactNode;
  /** React node to display as a title accessary. */
  titleAccessory?: React.ReactNode;
  /** React node to display as a thumbnail in the header area. */
  thumbnail?: React.ReactNode;
  /** Layout orientation of the card. Horizontal places header and visualization side by side, vertical stacks them. */
  layout: 'horizontal' | 'vertical';
  /** child node to display as the visualization (e.g., ProgressBar or ProgressCircle). */
  children?: React.ReactNode;
};

export type DataCardLayoutProps = DataCardLayoutBaseProps & {
  styles?: {
    layoutContainer?: StyleProp<ViewStyle>;
    headerContainer?: StyleProp<ViewStyle>;
    headerContent?: StyleProp<ViewStyle>;
    titleContainer?: StyleProp<ViewStyle>;
  };
};
export const DataCardLayout = memo(
  ({
    title,
    subtitle,
    titleAccessory,
    thumbnail,
    layout = 'vertical',
    children,
    styles = {},
  }: DataCardLayoutProps) => {
    const titleNode = useMemo(() => {
      if (typeof title === 'string') {
        return (
          <Text font="headline" numberOfLines={2}>
            {title}
          </Text>
        );
      }
      return title;
    }, [title]);

    const subtitleNode = useMemo(() => {
      if (typeof subtitle === 'string') {
        return (
          <Text color="fgMuted" font="label2" numberOfLines={1}>
            {subtitle}
          </Text>
        );
      }
      return subtitle;
    }, [subtitle]);

    const layoutContainerSpacingProps = useMemo(() => {
      return {
        flexDirection: layout === 'horizontal' ? ('row' as const) : ('column' as const),
        gap: layout === 'horizontal' ? 2 : 1,
        padding: 2,
      } as const;
    }, [layout]);

    const headerSpacingProps = useMemo(() => {
      return {
        flexDirection: layout === 'horizontal' ? ('column' as const) : ('row' as const),
        gap: layout === 'horizontal' ? 2 : 1,
        alignItems: layout === 'horizontal' ? ('flex-start' as const) : ('center' as const),
      } as const;
    }, [layout]);

    return (
      <Box
        flexBasis="100%"
        flexGrow={1}
        flexShrink={1}
        style={styles?.layoutContainer}
        {...layoutContainerSpacingProps}
      >
        <Box flexGrow={1} flexShrink={1} style={styles?.headerContainer} {...headerSpacingProps}>
          {thumbnail}
          <VStack flexShrink={1} overflow="hidden" style={styles?.headerContent}>
            {subtitleNode}
            <HStack alignItems="center" flexWrap="wrap" gap={0.5} style={styles?.titleContainer}>
              {titleNode}
              {titleAccessory}
            </HStack>
          </VStack>
        </Box>
        {children}
      </Box>
    );
  },
);

DataCardLayout.displayName = 'DataCardLayout';
