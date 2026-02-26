import React, { type HTMLAttributes, memo, type MouseEventHandler, useMemo } from 'react';
import { cardSizes } from '@coinbase/cds-common/tokens/card';
import type { SharedAccessibilityProps } from '@coinbase/cds-common/types';

import { cx } from '../cx';
import type { BoxBaseProps, BoxDefaultElement, BoxProps } from '../layout/Box';
import { Box } from '../layout/Box';
import { VStack } from '../layout/VStack';
import { Pressable, type PressableProps } from '../system/Pressable';

export type CardBaseProps = Pick<SharedAccessibilityProps, 'id'> &
  Pick<PressableProps<'a'>, 'href' | 'target' | 'background' | 'noScaleOnPress'> &
  Omit<BoxBaseProps, 'background'> & {
    /** Size of the card. Small and medium have fixed widths and large grows with its children. */
    size?: 'small' | 'medium' | 'large';
    children?: React.ReactNode;
    onKeyDown?: HTMLAttributes<HTMLElement>['onKeyDown'];
    onKeyUp?: HTMLAttributes<HTMLElement>['onKeyUp'];
    onClick?: MouseEventHandler;
  };

export type CardProps = CardBaseProps &
  Omit<BoxProps<BoxDefaultElement>, 'onClick' | 'onKeyDown' | 'onKeyUp' | 'background'> & {
    /** Slot-level class names for Card. */
    classNames?: {
      /** Top-level Card element (pressable wrapper when linkable, content wrapper otherwise). */
      root?: string;
      /** Card content container (`VStack`). */
      content?: string;
      /**
       * Pressable wrapper element.
       * Applies only when `href`, `onClick`, `onKeyDown`, or `onKeyUp` makes the card interactive.
       */
      pressable?: string;
    };
    /** Slot-level styles for Card. */
    styles?: {
      /** Top-level Card element (pressable wrapper when linkable, content wrapper otherwise). */
      root?: React.CSSProperties;
      /** Card content container (`VStack`). */
      content?: React.CSSProperties;
      /**
       * Pressable wrapper element.
       * Applies only when `href`, `onClick`, `onKeyDown`, or `onKeyUp` makes the card interactive.
       */
      pressable?: React.CSSProperties;
    };
  };

export const Card = memo<CardProps>(function Card({
  children,
  background = 'bg',
  size = 'large',
  onClick,
  onKeyDown,
  onKeyUp,
  href,
  target,
  pin,
  width: widthProps,
  height: heightProps,
  accessibilityLabel,
  accessibilityLabelledBy,
  accessibilityHint,
  testID,
  borderRadius,
  elevation,
  noScaleOnPress,
  className,
  style,
  classNames,
  styles,
  ...props
}) {
  const width = widthProps ?? cardSizes[size].width;
  const height = heightProps ?? cardSizes[size].height;
  const isAnchor = Boolean(href);
  const isButton = Boolean(onClick ?? onKeyDown ?? onKeyUp);
  const linkable = isAnchor || isButton;

  const content = useMemo(
    () => (
      <VStack
        background={linkable ? undefined : background}
        borderRadius={borderRadius}
        className={classNames?.content}
        elevation={linkable ? undefined : elevation}
        height={linkable ? undefined : height}
        overflow="hidden"
        pin={linkable ? undefined : pin}
        style={styles?.content}
        testID={linkable ? undefined : testID}
        width={linkable ? undefined : width}
        {...props}
      >
        {children}
      </VStack>
    ),
    [
      background,
      borderRadius,
      children,
      classNames?.content,
      elevation,
      height,
      linkable,
      pin,
      props,
      styles?.content,
      testID,
      width,
    ],
  );

  return (
    <Box className={cx(className, classNames?.root)} style={{ ...style, ...styles?.root }}>
      {isAnchor ? (
        <Pressable
          accessibilityHint={accessibilityHint}
          accessibilityLabel={accessibilityLabel}
          accessibilityLabelledBy={accessibilityLabelledBy}
          as="a"
          background={background}
          borderRadius={borderRadius}
          className={classNames?.pressable}
          elevation={elevation}
          height={height}
          href={href}
          noScaleOnPress={noScaleOnPress}
          onClick={onClick}
          onKeyDown={onKeyDown}
          onKeyUp={onKeyUp}
          pin={pin}
          style={styles?.pressable}
          target={target}
          testID={testID}
          width={width}
        >
          {content}
        </Pressable>
      ) : isButton ? (
        <Pressable
          accessibilityHint={accessibilityHint}
          accessibilityLabel={accessibilityLabel}
          accessibilityLabelledBy={accessibilityLabelledBy}
          background={background}
          borderRadius={borderRadius}
          className={classNames?.pressable}
          elevation={elevation}
          height={height}
          noScaleOnPress={noScaleOnPress}
          onClick={onClick}
          onKeyDown={onKeyDown}
          onKeyUp={onKeyUp}
          pin={pin}
          style={styles?.pressable}
          testID={testID}
          width={width}
        >
          {content}
        </Pressable>
      ) : (
        content
      )}
    </Box>
  );
});

Card.displayName = 'Card';
