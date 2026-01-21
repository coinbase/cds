import React, { forwardRef, memo, useMemo } from 'react';
import type { SharedProps } from '@coinbase/cds-common/types';

import type { Polymorphic } from '../../core/polymorphism';
import { cx } from '../../cx';
import { Box, type BoxBaseProps, HStack, VStack } from '../../layout';
import { Text } from '../../typography/Text';

export const contentCardBodyDefaultElement = 'div';
export type ContentCardBodyDefaultElement = typeof contentCardBodyDefaultElement;

export type ContentCardBodyBaseProps = Polymorphic.ExtendableProps<
  BoxBaseProps,
  SharedProps & {
    title?: React.ReactNode;
    /**
     * @deprecated Use description instead
     * Main body copy
     */
    body?: React.ReactNode;
    description?: React.ReactNode;
    /**
     * @deprecated Use a ReactNode as `description` instead if you need to display content below the description.
     * Use for supplemental data.
     */
    label?: React.ReactNode;
    /** Media, image or video to show */
    media?: React.ReactNode;
    /**
     * @deprecated Use mediaPlacement instead
     * The position of the media within the card.
     * Can be one of: 'top', 'bottom', 'right' or 'left'.
     */
    mediaPosition?: 'top' | 'bottom' | 'right' | 'left';
    mediaPlacement?: 'top' | 'bottom' | 'start' | 'end';
    /**
     * Custom content to display below the main content box (title/description/media).
     * Use this when you need to render custom content that doesn't fit the standard media/title/description layout.
     */
    children?: React.ReactNode;
    styles?: {
      /**
       * Root container style (content container + children)
       */
      root?: React.CSSProperties;
      /**
       * Container for the content (media + text content)
       */
      contentContainer?: React.CSSProperties;
      /**
       * Container for the text content (title + description + label)
       */
      textContainer?: React.CSSProperties;
      /**
       * Container for the media
       */
      mediaContainer?: React.CSSProperties;
    };
    classNames?: {
      /**
       * Root container class name
       */
      root?: string;
      /**
       * Container for the content (media + text content)
       */
      contentContainer?: string;
      /**
       * Container for the text content (title + description + label)
       */
      textContainer?: string;
      /**
       * Container for the media
       */
      mediaContainer?: string;
    };
  }
>;

export type ContentCardBodyProps<AsComponent extends React.ElementType> = Polymorphic.Props<
  AsComponent,
  ContentCardBodyBaseProps
>;

type ContentCardBodyComponent = (<
  AsComponent extends React.ElementType = ContentCardBodyDefaultElement,
>(
  props: ContentCardBodyProps<AsComponent>,
) => Polymorphic.ReactReturn) &
  Polymorphic.ReactNamed;

const mapMediaPositionToMediaPlacement: Record<
  'top' | 'bottom' | 'right' | 'left',
  'top' | 'bottom' | 'start' | 'end'
> = {
  top: 'top',
  bottom: 'bottom',
  right: 'end',
  left: 'start',
};

export const ContentCardBody: ContentCardBodyComponent = memo(
  forwardRef<React.ReactElement<ContentCardBodyBaseProps>, ContentCardBodyBaseProps>(
    <AsComponent extends React.ElementType>(
      {
        as,
        body,
        label,
        media,
        mediaPosition = 'top',
        mediaPlacement = mapMediaPositionToMediaPlacement[mediaPosition],
        title,
        description = body,
        children,
        gap = 1,
        testID,
        styles,
        style,
        classNames,
        className,
        padding = 2,
        ...props
      }: ContentCardBodyProps<AsComponent>,
      ref?: Polymorphic.Ref<AsComponent>,
    ) => {
      const Component = (as ?? contentCardBodyDefaultElement) satisfies React.ElementType;
      const isHorizontal = mediaPlacement === 'start' || mediaPlacement === 'end';
      const isMediaFirst = !!media && (mediaPlacement === 'top' || mediaPlacement === 'start');
      const isMediaLast = !!media && (mediaPlacement === 'bottom' || mediaPlacement === 'end');

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

      const descriptionNode = useMemo(() => {
        if (typeof description === 'string') {
          return (
            <Text color="fgMuted" font="label2" numberOfLines={3}>
              {description}
            </Text>
          );
        }
        return description;
      }, [description]);

      const labelNode = useMemo(() => {
        if (typeof label === 'string') {
          return <Text font="label2">{label}</Text>;
        }
        return label;
      }, [label]);

      const textNode = useMemo(() => {
        if (!titleNode && !descriptionNode && !labelNode) {
          return null;
        }
        return (
          <VStack
            className={classNames?.textContainer}
            gap={isHorizontal ? 1 : 0}
            style={styles?.textContainer}
          >
            {titleNode}
            {descriptionNode}
            {labelNode}
          </VStack>
        );
      }, [
        classNames?.textContainer,
        isHorizontal,
        styles?.textContainer,
        titleNode,
        descriptionNode,
        labelNode,
      ]);
      const mediaBox = isHorizontal ? (
        <Box flexShrink={0} height={96} width={96}>
          {media}
        </Box>
      ) : (
        media
      );
      return (
        <VStack
          ref={ref}
          as={Component}
          className={cx(classNames?.root, className)}
          padding={padding}
          style={{ ...style, ...styles?.root }}
          testID={testID}
          {...props}
        >
          {(mediaBox || textNode) && (
            <Box
              flexDirection={isHorizontal ? 'row' : 'column'}
              gap={isHorizontal ? 2 : 1}
              justifyContent={mediaPlacement === 'end' ? 'space-between' : 'flex-start'}
              style={styles?.contentContainer}
            >
              {isMediaFirst && mediaBox}
              {textNode}
              {isMediaLast && mediaBox}
            </Box>
          )}
          {children}
        </VStack>
      );
    },
  ),
);
