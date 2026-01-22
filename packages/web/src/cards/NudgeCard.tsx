import React from 'react';
import { opacityHovered, opacityPressed } from '@coinbase/cds-common/tokens/interactable';
import type { ValidateProps } from '@coinbase/cds-common/types';
import type { IllustrationPictogramNames } from '@coinbase/cds-common/types/IllustrationNames';
import { css } from '@linaria/core';

import { IconButton } from '../buttons/IconButton';
import { cx } from '../cx';
import { Pictogram } from '../illustrations/Pictogram';
import { Box, type BoxDefaultElement, type BoxProps } from '../layout/Box';
import { HStack } from '../layout/HStack';
import { VStack } from '../layout/VStack';
import { type StyleProps } from '../styles/styleProps';
import { Pressable } from '../system';
import { Text } from '../typography/Text';

const pressCss = css`
  /* Prevents layout shift - https://web.dev/cls/#animations-and-transitions */
  transform: scale(1);
  appearance: none;
  cursor: pointer;
  user-select: none;
  text-decoration: none;
  padding: 0;

  /* Removes weird bonus padding in Firefox */
  &::-moz-focus-inner {
    border: 0;
    padding: 0;
    margin: 0;
  }
  &:active {
    transform: scale(0.98);
    opacity: ${opacityPressed};
  }
  &:hover {
    opacity: ${opacityHovered};
  }
`;

const focusRingCss = css`
  position: relative;
  /* Disable default focus ring before adding custom focus ring styles */
  &:focus {
    outline: none;
  }
  &:focus-visible {
    outline-style: solid;
    outline-width: 2px;
    outline-color: var(--color-bgPrimary);
    outline-offset: 2px;
    border-radius: var(--borderRadius-500);
  }
`;

const getCardBodyPaddingProps = ({
  paddingStart,
  paddingEnd,
  paddingTop,
  paddingBottom,
  padding,
  paddingX,
  paddingY,
  compact,
}: {
  compact?: boolean;
} & any) => {
  if (compact)
    return {
      paddingBottom: paddingBottom ?? paddingY ?? padding ?? 1,
      paddingTop: paddingTop ?? paddingY ?? padding ?? 2,
      paddingStart: paddingStart ?? paddingX ?? padding ?? 2,
      paddingEnd: paddingEnd ?? paddingX ?? padding ?? 2,
    };
  return {
    paddingBottom: paddingBottom ?? paddingY ?? padding ?? 3,
    paddingTop: paddingTop ?? paddingY ?? padding ?? 3,
    paddingStart: paddingStart ?? paddingX ?? padding ?? 3,
    paddingEnd: paddingEnd ?? paddingX ?? padding ?? 3,
  };
};

export type NudgeCardBaseProps = {
  /** Text or React.ReactNode to be displayed above the description in a TextHeadline */
  title?: React.ReactNode;
  /** Text or React.ReactNode to be displayed below the title in a TextBody */
  description?: React.ReactNode;
  /** If you pass a Pictogram name it will render a Pictogram to the right of the text content */
  pictogram?: IllustrationPictogramNames;
  /** Pass any node to be rendered to the right of the text content */
  media?: React.ReactNode;
  /** Text or React.ReactNode to display as the call to action */
  action?: React.ReactNode;
  /**
   * Maximum number of lines shown for the title and description text. Text that exceeds will be truncated.
   * @default 3
   */
  numberOfLines?: number;
  /**
   * @default 327
   */
  width?: StyleProps['width'];
  /**
   * @default 160
   */
  minHeight?: StyleProps['minHeight'];
  /**
   * Background color for the card.
   * @default bgAlternate
   */
  background?: StyleProps['background'];
  /**
   * Set the media position for the pictogram or media.
   * @default right
   */
  mediaPosition?: 'left' | 'right';
  /**
   * Callback fired when the action button is pressed
   * Cannot be used when `action` is a React Element, only when `action` is a string
   */
  onActionPress?: React.MouseEventHandler;
  /** Callback fired when the dismiss button is pressed */
  onDismissPress?: React.MouseEventHandler;
};

export type NudgeCardProps = NudgeCardBaseProps & Omit<BoxProps<BoxDefaultElement>, 'title'>;

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
export const NudgeCard = ({
  title,
  description,
  pictogram,
  media,
  mediaPosition = 'right',
  action,
  className,
  onActionPress,
  numberOfLines = 3,
  onDismissPress,
  width = 327,
  minWidth = 327,
  testID = 'nudge-card',
  accessibilityLabel,
  maxHeight,
  maxWidth,
  background = 'bgAlternate',
  minHeight,
  height,
  aspectRatio,
  onClick,
  ...props
}: NudgeCardProps) => {
  const hasMedia = pictogram || media;
  const paddingBottom = action ? 1 : 2;
  const paddingProps = getCardBodyPaddingProps({
    paddingBottom,
    compact: true,
  });

  const renderMedia = pictogram ? (
    <Pictogram
      dimension={action ? '64x64' : '48x48'}
      name={pictogram}
      testID={`${testID}-pictogram`}
    />
  ) : (
    media
  );

  return (
    <Box
      as={onClick ? 'button' : 'div'}
      background={background}
      borderColor="transparent"
      borderRadius={500}
      borderWidth={100}
      className={cx(onClick && pressCss, focusRingCss, className)}
      maxHeight={maxHeight}
      maxWidth={maxWidth}
      minWidth={minWidth}
      onClick={onClick}
      paddingEnd={onDismissPress ? 3 : 0}
      position="relative"
      width={width}
      {...(props satisfies ValidateProps<
        typeof props,
        Omit<NudgeCardProps, keyof BoxProps<BoxDefaultElement>>
      >)}
    >
      {onDismissPress ? (
        <Box alignSelf="flex-end" padding={0.5} position="absolute" right={0} top={0}>
          <IconButton
            transparent
            accessibilityLabel={
              accessibilityLabel ?? `Dismiss the ${typeof title === 'string' ? title : ''} card`
            }
            name="close"
            onClick={onDismissPress}
            testID={`${testID}-dismiss-button`}
            variant="secondary"
          />
        </Box>
      ) : null}
      <HStack
        alignItems="center"
        aspectRatio={aspectRatio}
        flexGrow={1}
        gap={2}
        height={height}
        justifyContent={mediaPosition === 'right' ? 'space-between' : 'flex-start'}
        minHeight={minHeight}
        {...paddingProps}
      >
        {hasMedia && mediaPosition === 'left' && renderMedia}
        <VStack alignItems="flex-start" flexShrink={1} gap={2} maxWidth={maxWidth}>
          <VStack gap={0.5} maxWidth="100%" paddingTop={hasMedia ? 0 : 2}>
            {typeof title === 'string' ? (
              <Text
                as="h3"
                display="block"
                font="headline"
                numberOfLines={numberOfLines}
                testID={`${testID}-title`}
                transform="none"
              >
                {title}
              </Text>
            ) : (
              title
            )}
            {typeof description === 'string' ? (
              <Text
                as="p"
                display="block"
                font="label2"
                numberOfLines={numberOfLines}
                testID={`${testID}-description`}
                transform="none"
              >
                {description}
              </Text>
            ) : (
              description
            )}
          </VStack>
          {typeof action === 'string' ? (
            <Pressable background="transparent" onClick={onActionPress} paddingY={1}>
              <Text color="fgPrimary" font="headline" numberOfLines={1}>
                {action}
              </Text>
            </Pressable>
          ) : (
            action
          )}
        </VStack>
        {hasMedia && mediaPosition === 'right' && renderMedia}
      </HStack>
    </Box>
  );
};
