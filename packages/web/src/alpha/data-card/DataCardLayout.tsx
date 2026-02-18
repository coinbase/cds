import React, { memo, useMemo } from 'react';

import { Box, HStack, VStack } from '../../layout';
import { Tag } from '../../tag/Tag';
import { Text } from '../../typography';

export type DataCardLayoutBaseProps = {
  /** Text or React node to display as the card title. Use a Text component to override default color and font. */
  title: React.ReactNode;
  /** Text or React node to display as the card subtitle. Use a Text component to override default color and font. */
  subtitle?: React.ReactNode;
  /** React node to display as a title accessory. */
  titleAccessory?: React.ReactNode;
  /** React node to display as a thumbnail in the header area. */
  thumbnail?: React.ReactNode;
  /** Layout orientation of the card. Horizontal places header and visualization side by side, vertical stacks them.
   * @default 'vertical'
   */
  layout: 'horizontal' | 'vertical';
  /** Child node to display as the visualization (e.g., ProgressBar or ProgressCircle). */
  children?: React.ReactNode;
};

export type DataCardLayoutProps = DataCardLayoutBaseProps & {
  classNames?: {
    /** Layout container element */
    layoutContainer?: string;
    /** Header container element */
    headerContainer?: string;
    /** Text container element */
    textContainer?: string;
    /** Title container element */
    titleContainer?: string;
  };
  styles?: {
    /** Layout container element */
    layoutContainer?: React.CSSProperties;
    /** Header container element */
    headerContainer?: React.CSSProperties;
    /** Text container element */
    textContainer?: React.CSSProperties;
    /** Title container element */
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
          <Text as="div" font="headline" numberOfLines={2}>
            {title}
          </Text>
        );
      }
      return title;
    }, [title]);

    const subtitleNode = useMemo(() => {
      if (typeof subtitle === 'string') {
        return (
          <Text as="div" color="fgMuted" font="label2" numberOfLines={1}>
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
        gap: layout === 'horizontal' ? 2 : 1.5,
        alignItems: layout === 'horizontal' ? 'flex-start' : 'center',
        justifyContent: layout === 'horizontal' ? 'space-between' : 'flex-start',
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
