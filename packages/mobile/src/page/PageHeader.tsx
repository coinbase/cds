import React, { forwardRef, memo, useMemo } from 'react';
import type { StyleProp, View, ViewStyle } from 'react-native';
import type { ThemeVars } from '@coinbase/cds-common/core/theme';
import { pageHeaderHeight } from '@coinbase/cds-common/tokens/page';
import type { PositionStyles, SharedProps } from '@coinbase/cds-common/types';

import { Box, type BoxProps } from '../layout/Box';
import { HStack } from '../layout/HStack';
import { VStack } from '../layout/VStack';
import { Text } from '../typography/Text';

export type PageHeaderBaseProps = SharedProps &
  PositionStyles & {
    /**
     * Optional. Accepts a ReactNode. Used for placing primary content on the left side of the page header, such as a header title, logo, or icon button.
     */
    start?: React.ReactNode;
    /**
     * Optional. Accepts a ReactNode. Intended for content on the right side of the header, such as action buttons or icons.
     * In modal usage, elements like a close button should be included to facilitate modal dismissal.
     */
    end?: React.ReactNode;
    /**
     * Optional. Accepts a ReactNode. Intended for main title within the Page Header or for secondary content in the center of the header, like a navigation stepper or search bar.
     */
    title?: React.ReactNode;
    /**
     * Set the background color of the box.
     */
    background?: ThemeVars.Color;
  };

export type PageHeaderProps = PageHeaderBaseProps &
  BoxProps & {
    /** Custom styles for individual elements of the PageHeader component */
    styles?: {
      /** Root element */
      root?: StyleProp<ViewStyle>;
      /** Start element */
      start?: StyleProp<ViewStyle>;
      /** End element */
      end?: StyleProp<ViewStyle>;
      /** Title element */
      title?: StyleProp<ViewStyle>;
    };
  };

export const PageHeader = memo(
  forwardRef(function PageHeader(
    { start, title, end, styles, style, ...props }: PageHeaderProps,
    ref: React.ForwardedRef<View>,
  ) {
    const isMultiRow = useMemo(() => Boolean(start && title && end), [start, end, title]);

    return (
      <VStack ref={ref} accessibilityRole="header" {...props}>
        <HStack
          alignItems="center"
          height={pageHeaderHeight}
          justifyContent={isMultiRow ? 'space-between' : undefined}
          paddingY={1}
          style={[style, styles?.root]}
        >
          {!!start && (
            <Box paddingX={3} style={styles?.start}>
              {start}
            </Box>
          )}
          {!isMultiRow && (
            <Box
              flexGrow={1}
              paddingEnd={end ? 0 : 3}
              paddingStart={start ? 0 : 3}
              style={styles?.title}
            >
              {typeof title === 'string' ? <Text font="title1">{title}</Text> : title}
            </Box>
          )}
          {!!end && (
            <Box paddingX={3} style={styles?.end}>
              {end}
            </Box>
          )}
        </HStack>
        {isMultiRow && (
          <Box paddingX={3} style={styles?.title}>
            {typeof title === 'string' ? <Text font="title1">{title}</Text> : title}
          </Box>
        )}
      </VStack>
    );
  }),
);
