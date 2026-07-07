import React, { memo } from 'react';
import { useWindowDimensions } from 'react-native';
import type { DimensionValue, View } from 'react-native';
import { type SharedProps } from '@coinbase/cds-common/types/SharedProps';

import { IconButton } from '../buttons/IconButton';
import { useComponentConfig } from '../hooks/useComponentConfig';
import { useTheme } from '../hooks/useTheme';
import { Box, type BoxBaseProps, type BoxProps } from '../layout/Box';
import { HStack } from '../layout/HStack';
import { VStack } from '../layout/VStack';
import { InvertedThemeProvider } from '../system/ThemeProvider';
import { Text } from '../typography/Text';

export type CoachmarkBaseProps = SharedProps &
  BoxBaseProps & {
    /**
     * Title of the Coachmark. Text or ReactNode
     */
    title: React.ReactNode;
    /**
     * Content of the Coachmark. Text or ReactNode to be rendered below the title
     */
    content: React.ReactNode;
    /**
     * Checkbox component to be rendered below the content
     */
    checkbox?: React.ReactNode;
    /**
     * Media of the Coachmark
     */
    media?: React.ReactNode;
    /**
     * Callback function fired when close button is pressed
     */
    onClose?: () => void;
    /**
     * Action button for next step or ending the tour
     */
    action: React.ReactNode;
    /**
     * Desired width of the Coachmark with respect to max width of windowWidth - spacing2 * 2
     */
    width?: DimensionValue;
    /**
     * a11y label of the close button
     */
    closeButtonAccessibilityLabel?: string;
  };

export type CoachmarkProps = CoachmarkBaseProps & BoxProps;

export const Coachmark = memo(
  ({
    ref,
    ..._props
  }: CoachmarkProps & {
    ref?: React.Ref<View>;
  }) => {
    const mergedProps = useComponentConfig('Coachmark', _props);
    const {
      title,
      content,
      checkbox,
      media,
      onClose,
      action,
      width,
      closeButtonAccessibilityLabel,
      testID,
      ...props
    } = mergedProps;
    const theme = useTheme();
    const { width: windowWidth } = useWindowDimensions();
    const paddingX = theme.space[2];

    return (
      <InvertedThemeProvider>
        <VStack
          ref={ref}
          borderRadius={400}
          maxWidth={windowWidth - paddingX * 2}
          overflow="hidden"
          testID={testID}
          width={width}
          {...props}
        >
          {media}
          <VStack background="bg" padding={2}>
            <VStack gap={2}>
              <VStack gap={0.5}>
                {typeof title === 'string' ? (
                  <Text accessibilityRole="header" font="headline">
                    {title}
                  </Text>
                ) : (
                  title
                )}
                {typeof content === 'string' ? <Text font="body">{content}</Text> : content}
              </VStack>
              <HStack alignItems="center" justifyContent={checkbox ? 'space-between' : 'flex-end'}>
                {checkbox}
                {action}
              </HStack>
            </VStack>
          </VStack>
          {!!onClose && (
            <Box padding={1} position="absolute" right={0} top={0}>
              <IconButton
                transparent
                accessibilityLabel={closeButtonAccessibilityLabel}
                name="close"
                onPress={onClose}
              />
            </Box>
          )}
        </VStack>
      </InvertedThemeProvider>
    );
  },
);
