import React, { forwardRef, memo } from 'react';
import type { View } from 'react-native';
import type { SharedAccessibilityProps, SharedProps } from '@coinbase/cds-common/types';

import { HStack, type HStackProps } from '../layout/HStack';
import { Pressable, type PressableProps } from '../system/Pressable';

export type CardRootBaseProps = SharedAccessibilityProps &
  SharedProps & {
    children: React.ReactNode;
    actionable?: boolean;
  };

export type CardRootProps = CardRootBaseProps & PressableProps;

export const CardRoot = memo(
  forwardRef<View, CardRootBaseProps>(({ children, actionable, ...props }, ref) => {
    const Component = actionable ? Pressable : HStack;
    return (
      <Component ref={ref} {...props}>
        {children}
      </Component>
    );
  }),
);

CardRoot.displayName = 'CardRoot';
