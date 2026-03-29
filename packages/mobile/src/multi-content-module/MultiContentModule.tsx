import React, { forwardRef, isValidElement, memo } from 'react';
import type { View } from 'react-native';
import type { IllustrationPictogramNames } from '@coinbase/cds-common/types';

import { Button } from '../buttons';
import { Pictogram } from '../illustrations';
import type { VStackProps } from '../layout';
import { Box, VStack } from '../layout';
import { type PressableProps } from '../system';
import { Text } from '../typography/Text';

export type MultiContentModuleBaseProps = {
  /** Illustration pictogram name or ReacNode to be displayed at the start of an module */
  pictogram?: IllustrationPictogramNames | Exclude<React.ReactNode, 'string'>;
  /** ReactNode or Text to be displayed in TextTitle1 */
  title: React.ReactNode;
  /** ReactNode or Text to be displayed in TextBody to provide details about the module */
  description?: React.ReactNode;
  /** ReactNode to be displayed at the middle of the module */
  children?: React.ReactNode;
  /** Text to be displayed in Button or ReactNode to display as call to action */
  action?: React.ReactNode;
  /** A11y Label for action button and cannot be used when `action` is a React Element */
  actionAccessibilityLabel?: string;
  /** ReactNode to display at the end */
  end?: React.ReactNode;
};

export type MultiContentModuleProps = MultiContentModuleBaseProps & {
  /** Callback fired when the action button pressed and cannot be used when `action` is a React Element */
  onActionPress?: PressableProps['onPress'];
} & Omit<VStackProps, 'children'>;

export const MultiContentModule = memo(
  forwardRef(function MultiContentModule(
    {
      pictogram,
      title,
      description,
      children,
      action,
      onActionPress,
      actionAccessibilityLabel,
      end,
      bordered = false,
      testID,
      accessibilityLabel,
      style,
      ...props
    }: MultiContentModuleProps,
    ref: React.Ref<View>,
  ) {
    return (
      <VStack
        ref={ref}
        accessibilityLabel={accessibilityLabel}
        borderRadius={400}
        bordered={bordered}
        flexGrow={1}
        gap={2}
        paddingY={4}
        style={style}
        testID={testID}
        {...props}
      >
        {typeof pictogram === 'string' ? (
          <Pictogram
            dimension="48x48"
            name={pictogram as IllustrationPictogramNames}
            testID={`${testID}-pictogram`}
          />
        ) : (
          pictogram
        )}
        {typeof title === 'string' ? (
          <Text font="title1" role="heading">
            {title}
          </Text>
        ) : (
          title
        )}
        {typeof description === 'string' ? (
          <Text color="fgMuted" font="body" numberOfLines={3}>
            {description}
          </Text>
        ) : (
          description
        )}
        <Box flexGrow={1} testID={`${testID}-primary-content`}>
          {children}
        </Box>
        {action &&
          (isValidElement(action) ? (
            action
          ) : (
            <Button accessibilityLabel={actionAccessibilityLabel} onPress={onActionPress}>
              {action}
            </Button>
          ))}
        {end}
      </VStack>
    );
  }),
);
