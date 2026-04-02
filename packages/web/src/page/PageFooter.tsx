import React, { forwardRef, memo } from 'react';
import type { ThemeVars } from '@coinbase/cds-common/core/theme';
import { pageFooterHeight } from '@coinbase/cds-common/tokens/page';
import type { PositionStyles, SharedProps } from '@coinbase/cds-common/types';

import type { Polymorphic } from '../core/polymorphism';
import { useComponentConfig } from '../hooks/useComponentConfig';
import { Box, type BoxDefaultElement, type BoxProps } from '../layout/Box';
import type { ResponsiveProps, StaticStyleProps } from '../styles/styleProps';

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

export const pageFooterPaddingX: ResponsiveProps<StaticStyleProps>['paddingX'] = {
  phone: 3,
  tablet: 4,
  desktop: 4,
} as const;

export const pageFooterJustifyContent: ResponsiveProps<StaticStyleProps>['justifyContent'] = {
  phone: 'center',
  tablet: 'flex-end',
  desktop: 'flex-end',
} as const;

export type PageFooterProps = Polymorphic.ExtendableProps<
  BoxProps<BoxDefaultElement>,
  PageFooterBaseProps
>;
export const PageFooter = memo(
  forwardRef((_props: PageFooterProps, ref: React.ForwardedRef<HTMLDivElement>) => {
    const mergedProps = useComponentConfig('PageFooter', _props);
    const {
      action,
      height = pageFooterHeight,
      justifyContent = pageFooterJustifyContent,
      paddingX = pageFooterPaddingX,
      paddingY = 1.5,
      role = 'contentinfo',
      ...props
    } = mergedProps;
    return (
      <Box
        ref={ref}
        height={height}
        justifyContent={justifyContent}
        paddingX={paddingX}
        paddingY={paddingY}
        role={role}
        {...props}
      >
        {action}
      </Box>
    );
  }),
);
