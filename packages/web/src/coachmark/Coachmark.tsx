import React, { forwardRef, memo } from 'react';
import { type DimensionValue, type SharedProps } from '@coinbase/cds-common';

import { IconButton } from '../buttons/IconButton';
import { useComponentConfig } from '../hooks/useComponentConfig';
import {
  Box,
  type BoxBaseProps,
  type BoxDefaultElement,
  type BoxProps,
  HStack,
  VStack,
} from '../layout';
import { InvertedThemeProvider } from '../system';
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

export type CoachmarkProps = CoachmarkBaseProps &
  Omit<BoxProps<BoxDefaultElement>, 'title' | 'content'>;

export const Coachmark = memo(
  forwardRef((_props: CoachmarkProps, ref: React.ForwardedRef<HTMLDivElement>) => {
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
    return (
      <InvertedThemeProvider>
        <VStack
          {...props}
          ref={ref}
          borderRadius={400}
          maxWidth={400}
          overflow="hidden"
          position="relative"
          testID={testID}
          width={width}
        >
          {media}
          {!!onClose && (
            <Box alignSelf="flex-start" padding={1} pin="right">
              <IconButton
                accessibilityLabel={closeButtonAccessibilityLabel}
                name="close"
                onClick={onClose}
              />
            </Box>
          )}
          <VStack background="bg" padding={2}>
            <VStack gap={2}>
              <VStack gap={0.5}>
                {typeof title === 'string' ? (
                  <Text as="h2" display="block" font="headline">
                    {title}
                  </Text>
                ) : (
                  title
                )}
                {typeof content === 'string' ? (
                  <Text as="p" display="block" font="body">
                    {content}
                  </Text>
                ) : (
                  content
                )}
              </VStack>
              <HStack alignItems="center" justifyContent={checkbox ? 'space-between' : 'flex-end'}>
                {checkbox}
                {action}
              </HStack>
            </VStack>
          </VStack>
        </VStack>
      </InvertedThemeProvider>
    );
  }),
);
