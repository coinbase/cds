import React, { memo } from 'react';
import type { View } from 'react-native';
import type { ThemeVars } from '@coinbase/cds-common/core/theme';
import { pageFooterHeight } from '@coinbase/cds-common/tokens/page';
import type { SharedProps } from '@coinbase/cds-common/types/SharedProps';

import { useComponentConfig } from '../hooks/useComponentConfig';
import { Box, type BoxProps } from '../layout/Box';
import { VStack } from '../layout/VStack';
import type { PositionStyles } from '../styles/styleProps';
import { Text } from '../typography/Text';

export type PageFooterBaseProps = SharedProps &
  PositionStyles & {
    /**
     * Required. Accepts a ReactNode. Intended for content on the right side of the footer, such as action buttons or icons. */
    action: React.ReactNode;
    /**
     * Set the background color of the box.
     */
    background?: ThemeVars.Color;
    /**
     * Optional legal text rendered below the action in a pre-styled caption. Centered on mobile.
     */
    legalText?: string;
  };

export type PageFooterProps = PageFooterBaseProps & BoxProps;

export const PageFooter = memo(
  ({
    ref,
    ..._props
  }: PageFooterProps & {
    ref?: React.Ref<View>;
  }) => {
    const mergedProps = useComponentConfig('PageFooter', _props);
    const { action, legalText, ...props } = mergedProps;
    return (
      <Box
        ref={ref}
        accessibilityRole="toolbar"
        alignItems="center"
        height={legalText ? undefined : pageFooterHeight}
        paddingX={3}
        paddingY={1.5}
        {...props}
      >
        {legalText ? (
          <VStack alignItems="center" gap={2}>
            {action}
            <Text color="fgMuted" font="legal">
              {legalText}
            </Text>
          </VStack>
        ) : (
          action
        )}
      </Box>
    );
  },
);
