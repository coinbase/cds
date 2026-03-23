import React, { forwardRef, memo } from 'react';
import { View } from 'react-native';

import { useSafeBottomPadding } from '../hooks/useSafeBottomPadding';
import { Box, type BoxProps } from '../layout';

export type StickyFooterProps = BoxProps & {
  /**
   * Whether to apply a box shadow to the StickyFooter element.
   * @deprecated Use elevation instead. This will be removed in a future major release.
   * @deprecationExpectedRemoval v8
   */
  elevated?: boolean;
};

export const StickyFooter = memo(
  forwardRef(
    (
      {
        elevated,
        elevation = elevated ? 1 : 0,
        children,
        testID = 'sticky-footer',
        role = 'toolbar',
        accessibilityLabel = 'footer',
        padding = 2,
        flexShrink = 0,
        ...props
      }: StickyFooterProps,
      forwardedRef: React.ForwardedRef<View>,
    ) => {
      return (
        <Box
          ref={forwardedRef}
          accessibilityLabel={accessibilityLabel}
          elevation={elevation}
          flexShrink={flexShrink}
          padding={padding}
          role={role}
          testID={testID}
          {...props}
        >
          <View>{children}</View>
        </Box>
      );
    },
  ),
);
