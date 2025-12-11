import React, { forwardRef, memo } from 'react';
import type { StyleProp, View, ViewStyle } from 'react-native';

import { HStack } from '../layout/HStack';
import { Pressable, type PressableProps } from '../system/Pressable';

export type CardRootBaseProps = {
  children: React.ReactNode;
  /** If true, the CardRoot will be rendered as a Pressable component. */
  renderAsPressable?: boolean;
};

export type CardRootProps = CardRootBaseProps &
  Omit<PressableProps, 'style'> & {
    style?: StyleProp<ViewStyle>;
  };

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
