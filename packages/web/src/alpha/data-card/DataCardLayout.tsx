import React, { memo, useMemo } from 'react';

import { Box, HStack, VStack } from '../../layout';
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
  classNames?: {
    layoutContainer?: string;
    headerContainer?: string;
    textContainer?: string;
    titleContainer?: string;
  };
  styles?: {
    layoutContainer?: React.CSSProperties;
    headerContainer?: React.CSSProperties;
    textContainer?: React.CSSProperties;
    titleContainer?: React.CSSProperties;
  };
};

export const DataCardLayout = memo(
  ({
    title,
    subtitle,
    titleAccessory,
    thumbnail,
    layout = 'vertical',
    classNames = {},
    styles = {},
    children,
  }: DataCardLayoutProps) => {
    const titleNode = useMemo(() => {
      if (typeof title === 'string') {
        return (
          <Text as="h3" font="headline" numberOfLines={2}>
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
        flexDirection: layout === 'horizontal' ? 'row' : 'column',
        gap: layout === 'horizontal' ? 2 : 1,
        padding: 2,
      } as const;
    }, [layout]);

    const headerSpacingProps = useMemo(() => {
      return {
        flexDirection: layout === 'horizontal' ? 'column' : 'row',
        gap: layout === 'horizontal' ? 1.5 : 1,
        alignItems: layout === 'horizontal' ? 'flex-start' : 'center',
      } as const;
    }, [layout]);

    return (
      <Box
        className={classNames?.layoutContainer}
        flexGrow={1}
        style={styles?.layoutContainer}
        {...layoutContainerSpacingProps}
      >
        <Box
          flexGrow={1}
          {...headerSpacingProps}
          as="header"
          className={classNames?.headerContainer}
          style={styles?.headerContainer}
        >
          {thumbnail}
          <VStack className={classNames?.textContainer} style={styles?.textContainer}>
            {subtitleNode}
            <HStack
              alignItems="center"
              className={classNames?.titleContainer}
              columnGap={0.5}
              flexWrap="wrap"
              style={styles?.titleContainer}
            >
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
