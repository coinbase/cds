import React, { forwardRef, isValidElement, memo, useMemo } from 'react';
import { defaultMaxWidth } from '@coinbase/cds-common/tokens/multiContentModule';
import type { IllustrationPictogramNames } from '@coinbase/cds-common/types/IllustrationNames';

import { Button } from '../buttons';
import type { Polymorphic } from '../core/polymorphism';
import { Pictogram } from '../illustrations';
import type { VStackBaseProps } from '../layout';
import { Box, VStack } from '../layout';
import { Text } from '../typography/Text';

export const multiContentModuleDefaultElement = 'div';

export type MultiContentModuleDefaultElement = typeof multiContentModuleDefaultElement;

export type MultiContentModuleBaseProps = Polymorphic.ExtendableProps<
  VStackBaseProps,
  {
    /** Callback fired when the action button pressed and cannot be used when `action` is a React Element */
    onActionPress?: React.MouseEventHandler;
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
  }
>;

export type MultiContentModuleProps<AsComponent extends React.ElementType> = Polymorphic.Props<
  AsComponent,
  MultiContentModuleBaseProps
>;

type MultiContentModuleComponent = (<
  AsComponent extends React.ElementType = MultiContentModuleDefaultElement,
>(
  props: MultiContentModuleProps<AsComponent>,
) => Polymorphic.ReactReturn) &
  Polymorphic.ReactNamed;

export const MultiContentModule: MultiContentModuleComponent = memo(
  forwardRef<React.ReactElement<MultiContentModuleBaseProps>, MultiContentModuleBaseProps>(
    <AsComponent extends React.ElementType>(
      {
        as,
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
        maxWidth = defaultMaxWidth,
        style,
        ...props
      }: MultiContentModuleProps<AsComponent>,
      ref?: Polymorphic.Ref<AsComponent>,
    ) => {
      const Component = (as ?? multiContentModuleDefaultElement) satisfies React.ElementType;
      const multiContentModulePaddingX = useMemo(
        () => ({
          phone: bordered ? 4 : 0,
          tablet: 4,
          desktop: 4,
        }),
        [bordered],
      );

      return (
        <VStack
          ref={ref}
          accessibilityLabel={accessibilityLabel}
          as={Component}
          background="bg"
          borderRadius={400}
          bordered={bordered}
          gap={2}
          maxWidth={maxWidth}
          paddingX={multiContentModulePaddingX}
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
            <Text as="h1" display="block" font="title1">
              {title}
            </Text>
          ) : (
            title
          )}
          {typeof description === 'string' ? (
            <Text as="p" color="fgMuted" display="block" font="body" numberOfLines={3}>
              {description}
            </Text>
          ) : (
            description
          )}
          {!!children && (
            <Box display="block" testID={`${testID}-primary-content`}>
              {children}
            </Box>
          )}
          {action &&
            (isValidElement(action) ? (
              action
            ) : (
              <Button accessibilityLabel={actionAccessibilityLabel} onClick={onActionPress}>
                {action}
              </Button>
            ))}
          {end}
        </VStack>
      );
    },
  ),
);
