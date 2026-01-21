import React, { forwardRef, memo } from 'react';
import type { View } from 'react-native';
import { contentCardMaxWidth, contentCardMinWidth } from '@coinbase/cds-common/tokens/card';

import { VStack } from '../../layout';
import { Pressable, type PressableProps } from '../../system';

export type ContentCardBaseProps = PressableProps & {
  renderAsPressable?: boolean;
};

export type ContentCardProps = ContentCardBaseProps;

export const ContentCard = memo(
  forwardRef(function ContentCard(
    {
      testID,
      children,
      maxWidth = contentCardMaxWidth,
      minWidth = contentCardMinWidth,
      renderAsPressable,
      borderRadius = 500,
      style,
      ...props
    }: ContentCardProps,
    ref: React.ForwardedRef<View>,
  ) {
    const Component = renderAsPressable ? Pressable : VStack;
    return (
      <Component
        ref={ref}
        borderRadius={borderRadius}
        maxWidth={maxWidth}
        minWidth={minWidth}
        testID={testID}
        {...props}
      >
        {children}
      </Component>
    );
  }),
);
