import React, { isValidElement, memo } from 'react';
import type { ThemeVars } from '@coinbase/cds-common/core/theme';
import { upsellCardDefaultWidth, upsellCardMinHeight } from '@coinbase/cds-common/tokens/card';
import type {
  DimensionStyles,
  SharedAccessibilityProps,
  SharedProps,
} from '@coinbase/cds-common/types';

import { Button, IconButton } from '../buttons';
import { HStack, VStack } from '../layout';
import { Pressable, type PressableDefaultElement, type PressableProps } from '../system';
import { Text } from '../typography/Text';

export type UpsellCardBaseProps = SharedProps &
  Pick<SharedAccessibilityProps, 'accessibilityLabel'> &
  Pick<DimensionStyles, 'width'> & {
    /** Callback fired when the action button is pressed */
    onActionPress?: PressableProps<PressableDefaultElement>['onClick'];
    /** Callback fired when the dismiss button is pressed */
    onDismissPress?: PressableProps<PressableDefaultElement>['onClick'];
    /** Callback fired when the card is pressed */
    onClick?: PressableProps<PressableDefaultElement>['onClick'];
    /** Text or ReactNode to be displayed in TextHeadline */
    title: React.ReactNode;
    /** Content to be displayed below the title */
    description?: React.ReactNode;
    /** Node to display for the card action */
    action?: React.ReactNode;
    /**
     * Remote Image or other node with media content.
     */
    media?: React.ReactNode;
    /**
     * Background color for the card.
     * @default 'bgPrimaryWash'
     */
    background?: ThemeVars.Color;
    /**
     * @danger This is a migration escape hatch. It is not intended to be used normally.
     */
    dangerouslySetBackground?: string;
  };

export type UpsellCardProps = UpsellCardBaseProps;

/**
 * @deprecated Use `MessagingCard` with `type="upsell"` instead. UpsellCard will be removed in a future major release.
 *
 * Migration guide:
 * ```tsx
 * // Before
 * <UpsellCard
 *   title="Title"
 *   description="Description"
 *   media={<RemoteImage ... />}
 *   action="Get Started"
 *   onActionPress={handleAction}
 *   onDismissPress={handleDismiss}
 * />
 *
 * // After
 * <MessagingCard
 *   type="upsell"
 *   title="Title"
 *   description="Description"
 *   media={<RemoteImage ... />}
 *   actions={<Button compact variant="secondary">Get Started</Button>}
 *   onDismiss={handleDismiss}
 *   mediaPlacement="end"
 * />
 * ```
 */
export const UpsellCard = memo(
  ({
    title,
    description,
    action,
    onActionPress,
    onDismissPress,
    media,
    background = 'bgPrimaryWash',
    dangerouslySetBackground,
    testID = 'upsell-card',
    accessibilityLabel,
    width = upsellCardDefaultWidth,
    onClick,
  }: UpsellCardProps) => {
    const content = (
      <HStack
        alignContent="space-between"
        background={background}
        borderColor="transparent"
        borderRadius={500}
        dangerouslySetBackground={dangerouslySetBackground}
        minHeight={upsellCardMinHeight}
        style={{ border: 'none' }}
        testID={testID}
        width={width}
      >
        <HStack
          alignContent="space-between"
          alignItems="center"
          borderRadius={500}
          height="100%"
          justifyContent="space-between"
          overflow="hidden"
          position="relative"
          width="100%"
        >
          <VStack
            gap={3}
            justifyContent="space-between"
            minHeight={upsellCardMinHeight}
            padding={2}
            width="70%"
          >
            <VStack gap={1}>
              {typeof title === 'string' ? (
                <Text as="h3" display="block" font="headline">
                  {title}
                </Text>
              ) : (
                title
              )}
              {typeof description === 'string' ? (
                <Text as="p" display="block" font="label2" numberOfLines={3}>
                  {description}
                </Text>
              ) : (
                description
              )}
            </VStack>
            {!!action && (
              <HStack paddingStart={2}>
                {isValidElement(action) ? (
                  action
                ) : (
                  <Button
                    compact
                    flush="start"
                    numberOfLines={1}
                    onClick={onActionPress}
                    variant="secondary"
                  >
                    {action as string}
                  </Button>
                )}
              </HStack>
            )}
          </VStack>
          {!!media && (
            <HStack position="absolute" right={0}>
              {media}
            </HStack>
          )}
          {onDismissPress && (
            <HStack padding={1} position="absolute" right={0} top={0}>
              <IconButton
                accessibilityLabel={accessibilityLabel ?? `Dismiss the ${title} card`}
                name="close"
                onClick={onDismissPress}
                testID={`${testID}-dismiss-button`}
                variant="secondary"
              />
            </HStack>
          )}
        </HStack>
      </HStack>
    );

    return onClick ? (
      <Pressable background="transparent" onClick={onClick}>
        {content}
      </Pressable>
    ) : (
      content
    );
  },
);
