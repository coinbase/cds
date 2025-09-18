import React, { forwardRef, memo } from 'react';
import { View } from 'react-native';

import { Box, type BoxProps } from '../layout';

export type StickyFooterProps = BoxProps & {
  /**
   * Whether to apply a box shadow to the StickyFooter element.
   * @deprecated Use elevation instead.
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
        ...props
      }: StickyFooterProps,
      forwardedRef: React.ForwardedRef<View>,
    ) => {
      return (
        <Box
          ref={forwardedRef}
          accessibilityLabel={accessibilityLabel}
          elevation={elevation}
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
