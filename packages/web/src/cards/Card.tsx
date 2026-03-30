import React, { type HTMLAttributes, memo, type MouseEventHandler, useMemo } from 'react';
import { cardSizes } from '@coinbase/cds-common/tokens/card';
import type { SharedAccessibilityProps } from '@coinbase/cds-common/types';

import type { BoxBaseProps, BoxDefaultElement, BoxProps } from '../layout/Box';
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
  Omit<BoxProps<BoxDefaultElement>, 'onClick' | 'onKeyDown' | 'onKeyUp' | 'background'>;

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
        elevation={linkable ? undefined : elevation}
        height={linkable ? undefined : height}
        overflow="hidden"
        pin={linkable ? undefined : pin}
        testID={linkable ? undefined : testID}
        width={linkable ? undefined : width}
        {...props}
      >
        {children}
      </VStack>
    ),
    [background, borderRadius, children, elevation, height, linkable, pin, props, testID, width],
  );

  if (isAnchor) {
    return (
      <Pressable
        accessibilityHint={accessibilityHint}
        accessibilityLabel={accessibilityLabel}
        accessibilityLabelledBy={accessibilityLabelledBy}
        as="a"
        background={background}
        borderRadius={borderRadius}
        elevation={elevation}
        height={height}
        href={href}
        noScaleOnPress={noScaleOnPress}
        onClick={onClick}
        onKeyDown={onKeyDown}
        onKeyUp={onKeyUp}
        pin={pin}
        target={target}
        testID={testID}
        width={width}
      >
        {content}
      </Pressable>
    );
  }

  if (isButton) {
    return (
      <Pressable
        accessibilityHint={accessibilityHint}
        accessibilityLabel={accessibilityLabel}
        accessibilityLabelledBy={accessibilityLabelledBy}
        background={background}
        borderRadius={borderRadius}
        elevation={elevation}
        height={height}
        noScaleOnPress={noScaleOnPress}
        onClick={onClick}
        onKeyDown={onKeyDown}
        onKeyUp={onKeyUp}
        pin={pin}
        testID={testID}
        width={width}
      >
        {content}
      </Pressable>
    );
  }

  return content;
});

Card.displayName = 'Card';
