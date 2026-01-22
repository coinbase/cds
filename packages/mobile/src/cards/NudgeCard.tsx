import React, { isValidElement, memo } from 'react';
import type { PressableProps } from 'react-native';
import { getCardBodySpacingProps } from '@coinbase/cds-common/cards/getCardBodySpacingProps';
import type { ThemeVars } from '@coinbase/cds-common/core/theme';
import type {
  DimensionStyles,
  DimensionValue,
  IllustrationPictogramNames,
  SharedAccessibilityProps,
  SharedProps,
} from '@coinbase/cds-common/types';

import { IconButton } from '../buttons';
import { Pictogram } from '../illustrations/Pictogram';
import { Box, HStack, VStack } from '../layout';
import { Pressable } from '../system/Pressable';
import { Text } from '../typography/Text';

export type NudgeCardBaseProps = SharedProps &
  Omit<DimensionStyles, 'minHeight' | 'width'> &
  Pick<SharedAccessibilityProps, 'accessibilityLabel'> & {
    /** Text or ReactNode to be displayed above the description in a TextHeadline */
    title?: React.ReactNode;
    /** Text or ReactNode to be displayed below the title in a TextBody */
    description?: React.ReactNode;
    /** If you pass a Pictogram name it will render a Pictogram to the right of the text content */
    pictogram?: IllustrationPictogramNames;
    /** Pass any node to be rendered to the right of the text content */
    media?: React.ReactNode;
    /** Text or ReactNode to display as the call to action */
    action?: React.ReactNode;
    /**
     * Maximum number of lines shown for the title and description text. Text that exceeds will be truncated.
     * @default 3
     */
    numberOfLines?: number;
    /**
     * @default 327
     */
    width?: DimensionValue;
    /**
     * @default 160
     */
    minHeight?: DimensionValue;
    /**
     * Background color for the card.
     * @default bgAlternate
     */
    background?: ThemeVars.Color;
    /**
     * Set the media position for the pictogram or media.
     * @default right
     */
    mediaPosition?: 'left' | 'right';
    onDismissPress?: PressableProps['onPress'];
    onActionPress?: PressableProps['onPress'];
    onPress?: PressableProps['onPress'];
  };

export type NudgeCardProps = NudgeCardBaseProps;

/**
 * @deprecated Use `MessagingCard` with `type="nudge"` instead. NudgeCard will be removed in a future major release.
 *
 * Migration guide:
 * ```tsx
 * // Before
 * <NudgeCard
 *   title="Title"
 *   description="Description"
 *   pictogram="addToWatchlist"
 *   action="Learn more"
 *   onActionPress={handleAction}
 *   onDismissPress={handleDismiss}
 * />
 *
 * // After
 * <MessagingCard
 *   type="nudge"
 *   title="Title"
 *   description="Description"
 *   media={<Pictogram dimension="48x48" name="addToWatchlist" />}
 *   actions={<Button compact variant="secondary">Learn more</Button>}
 *   onDismiss={handleDismiss}
 *   mediaPlacement="end"
 * />
 * ```
 */
export const NudgeCard = memo(
  ({
    title,
    description,
    pictogram,
    media,
    mediaPosition = 'right',
    action,
    onActionPress,
    numberOfLines = 3,
    onDismissPress,
    width = '100%',
    testID = 'nudge-card',
    accessibilityLabel,
    background = 'bgAlternate',
    onPress,
    maxWidth,
    ...props
  }: NudgeCardProps) => {
    const hasMedia = pictogram || media;
    const paddingBottom = action ? 1 : 2;
    const spacingProps = getCardBodySpacingProps({ paddingBottom, compact: true });

    const renderAction = isValidElement(action) ? (
      action
    ) : (
      <Pressable accessibilityRole="button" background="transparent" onPress={onActionPress}>
        <Text color="fgPrimary" font="headline" numberOfLines={1} paddingY={1}>
          {action}
        </Text>
      </Pressable>
    );

    const renderMedia = pictogram ? (
      <Pictogram
        dimension={action ? '64x64' : '48x48'}
        name={pictogram}
        testID={`${testID}-pictogram`}
      />
    ) : (
      media
    );

    const content = (
      <Box
        background={background}
        borderColor="transparent"
        borderRadius={500}
        maxWidth={maxWidth}
        paddingEnd={onDismissPress ? 3 : 0}
        position="relative"
        testID={testID}
        width={width}
      >
        {onDismissPress ? (
          // zIndex is required otherwise CardBody sits on top of it
          <Box padding={0.5} position="absolute" right={0} top={0} zIndex={2}>
            <IconButton
              transparent
              accessibilityLabel={
                accessibilityLabel ?? `Dismiss the ${typeof title === 'string' ? title : ''} card`
              }
              name="close"
              onPress={onDismissPress}
              testID={`${testID}-dismiss-button`}
              variant="secondary"
            />
          </Box>
        ) : null}
        {/* ported over from CardBody */}
        <HStack
          alignItems="center"
          flexGrow={1}
          gap={2}
          justifyContent={mediaPosition === 'right' ? 'space-between' : 'flex-start'}
          {...spacingProps}
          {...props}
        >
          {hasMedia && mediaPosition === 'left' ? renderMedia : null}
          <VStack alignItems="flex-start" flexGrow={1} flexShrink={1} gap={2} maxWidth={maxWidth}>
            <VStack gap={0.5} maxWidth="100%" paddingTop={hasMedia ? 0 : 2}>
              {typeof title === 'string' ? (
                <Text
                  ellipsize="tail"
                  font="headline"
                  numberOfLines={numberOfLines}
                  testID={`${testID}-title`}
                  textTransform="none"
                >
                  {title}
                </Text>
              ) : (
                title
              )}
              {typeof description === 'string' ? (
                <Text
                  ellipsize="tail"
                  font="label2"
                  numberOfLines={numberOfLines}
                  testID={`${testID}-description`}
                  textTransform="none"
                >
                  {description}
                </Text>
              ) : (
                description
              )}
            </VStack>
            {action ? renderAction : null}
          </VStack>
          {hasMedia && mediaPosition === 'right' ? renderMedia : null}
        </HStack>
      </Box>
    );
    return onPress ? (
      <Pressable accessibilityRole="button" background="transparent" onPress={onPress}>
        {content}
      </Pressable>
    ) : (
      content
    );
  },
);
