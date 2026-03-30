import React, { forwardRef, memo } from 'react';
import { Animated } from 'react-native';
import type { View } from 'react-native';
import type { ThemeVars } from '@coinbase/cds-common/core/theme';
import type { SharedProps } from '@coinbase/cds-common/types';

import { Box } from '../layout';

import { useTabIndicatorStyles } from './hooks/useTabIndicatorStyles';

export type TabIndicatorProps = SharedProps & {
  /** The width of the active TabLabel. */
  width: number;
  /** The xPosition of the active TabLabel. */
  x: number;
  /** This should always match the background color of the parent container
   * @default: 'bg'
   */
  background?: ThemeVars.Color;
};

export const TabIndicator = memo(
  forwardRef(
    (
      { width, x, background = 'bg', testID, ...props }: TabIndicatorProps,
      forwardedRef: React.ForwardedRef<View>,
    ) => {
      const { widthStyle, xStyle } = useTabIndicatorStyles({ width, x });

      return (
        <Animated.View ref={forwardedRef} style={xStyle} testID={testID} {...props}>
          <Box
            background="bgPrimary"
            flexGrow={1}
            height={2}
            overflow="hidden"
            testID="cds-tab-indicator-inner-bar-container"
          >
            <Box
              animated
              background={background}
              height={2}
              style={widthStyle}
              testID="cds-tab-indicator-inner-bar"
              width="100%"
            />
          </Box>
        </Animated.View>
      );
    },
  ),
);

TabIndicator.displayName = 'TabIndicator';
