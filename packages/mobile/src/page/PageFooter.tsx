import React, { forwardRef, memo } from 'react';
import type { View } from 'react-native';
import type { ThemeVars } from '@coinbase/cds-common/core/theme';
import { pageFooterHeight } from '@coinbase/cds-common/tokens/page';
import type { PositionStyles, SharedProps } from '@coinbase/cds-common/types';

import { useComponentConfig } from '../hooks/useComponentConfig';
import { Box, type BoxProps } from '../layout/Box';

export type PageFooterBaseProps = SharedProps &
  PositionStyles & {
    /**
     * Required. Accepts a ReactNode. Intended for content on the right side of the footer, such as action buttons or icons. */
    action: React.ReactNode;
    /**
     * Set the background color of the box.
     */
    background?: ThemeVars.Color;
  };

export type PageFooterProps = PageFooterBaseProps & BoxProps;

export const PageFooter = memo(
  forwardRef((_props: PageFooterProps, ref: React.ForwardedRef<View>) => {
    const mergedProps = useComponentConfig('PageFooter', _props);
    const { action, ...props } = mergedProps;
    return (
      <Box
        ref={ref}
        accessibilityRole="toolbar"
        alignItems="center"
        height={pageFooterHeight}
        paddingX={3}
        paddingY={1.5}
        {...props}
      >
        {action}
      </Box>
    );
  }),
);
