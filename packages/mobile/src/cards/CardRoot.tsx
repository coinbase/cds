import React, { forwardRef, memo } from 'react';
import type { StyleProp, View, ViewStyle } from 'react-native';

import { HStack } from '../layout/HStack';
import { Pressable, type PressableProps } from '../system/Pressable';

export type CardRootBaseProps = {
  /** Content to render inside the card. */
  children: React.ReactNode;
  /**
   * If true, the CardRoot will be rendered as a Pressable component.
   * When false, renders as an HStack for layout purposes.
   * @default false
   */
  renderAsPressable?: boolean;
};

export type CardRootProps = CardRootBaseProps &
  Omit<PressableProps, 'style'> & {
    style?: StyleProp<ViewStyle>;
  };

/**
 * CardRoot is the foundational wrapper component for card layouts.
 *
 * By default, it renders as an HStack for horizontal layout.
 * When `renderAsPressable` is true, it renders as a Pressable component.
 */
export const CardRoot = memo(
  forwardRef<View, CardRootProps>(({ children, style, renderAsPressable, ...props }, ref) => {
    const Component = renderAsPressable ? Pressable : HStack;
    return (
      <Component ref={ref} {...props}>
        {children}
      </Component>
    );
  }),
);

CardRoot.displayName = 'CardRoot';
