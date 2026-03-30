import React, { memo, useMemo } from 'react';
import type { PressableProps } from 'react-native';
import { defaultMediaSize } from '@coinbase/cds-common/tokens/card';
import type { SharedAccessibilityProps } from '@coinbase/cds-common/types';
import type { PictogramName, SpotSquareName } from '@coinbase/cds-illustrations';

import { Button, type ButtonProps } from '../buttons/Button';
import type { BoxBaseProps, BoxProps } from '../layout/Box';
import { HStack } from '../layout/HStack';
import { VStack } from '../layout/VStack';
import { Text } from '../typography/Text';

import { CardMedia } from './CardMedia';

export type CardMediaPlacement = 'start' | 'above' | 'end';

export type CardBodyBaseProps = Pick<
  SharedAccessibilityProps,
  'accessibilityLabel' | 'accessibilityLabelledBy' | 'accessibilityHint'
> &
  BoxBaseProps & {
    onActionPress?: PressableProps['onPress'];
    /** Text to be displayed in TextHeadline when it's a string, unless you pass a ReactNode */
    title?: React.ReactNode;
    /** Text to be displayed in TextBody when it's a string, unless you pass a ReactNode */
    description?: React.ReactNode;
    /**
     * Maximum number of lines shown. Text that exceeds will be truncated.
     * Only applies to description
     * @default 3
     */
    numberOfLines?: number;
    /** Enables compact spacing around CardBody content */
    compact?: boolean;
    children?: React.ReactNode;
    /** Above places media above text content, start or end places media to the side of text content
     * @default end
     */
    mediaPlacement?: CardMediaPlacement;
    /** The name of the SpotSquare Illustration to use in CardMedia. */
    spotSquare?: SpotSquareName;
    /** The name of the Pictogram Illustration to use in CardMedia. */
    pictogram?: PictogramName;
    /** The image url to use in the CardMedia. Will not be used if illustration is present. */
    image?: string;
    /**
     * Remote Image or other node with media content.
     * If illustration prop is present this will default to <CardMedia type="illustration" name={illustration} variant={variant} />.
     * If image prop is present this will default to <CardMedia type="image" src={image} variant={variant} />.
     */
    media?: React.ReactNode;
    /**
     * Call to action to display underneath title and description.
     * When present this will set action prop to be CardBodyAction with some defaults.
     */
    actionLabel?: string;
    /**
     * Call to action to display underneath title and description.
     * When actionLabel and onActionPress are present this will assign action to <CardBodyAction onPress={onActionPress} endIcon="forwardArrow">{actionLabel}</CardBodyAction>.
     * Internally CardBodyAction is a normal CDS Button, but with some default props designed specifically for this layout.
     */
    action?: React.ReactNode;
  };

export type CardBodyProps = CardBodyBaseProps & BoxProps;

type CardBodyActionProps = ButtonProps & {
  onPress?: PressableProps['onPress'];
};

const CardBodyAction = memo(function CardBodyAction({
  children,
  compact = true,
  flush = 'start',
  transparent = true,
  variant = 'primary',
  numberOfLines = 3,
  ...props
}: CardBodyActionProps) {
  return (
    <Button
      noScaleOnPress
      compact={compact}
      flush={flush}
      numberOfLines={numberOfLines}
      transparent={transparent}
      variant={variant}
      {...props}
    >
      {children}
    </Button>
  );
});

export const CardBody = memo(function CardBody({
  testID = 'card-body',
  title,
  description,
  mediaPlacement = 'end',
  onActionPress,
  actionLabel,
  action: actionProp,
  pictogram,
  spotSquare,
  image,
  media: mediaProp,
  padding,
  paddingX,
  paddingY,
  paddingTop,
  paddingEnd,
  paddingBottom,
  paddingStart,
  numberOfLines = 3,
  accessibilityLabel,
  children,
  compact,
  ...props
}: CardBodyProps) {
  const paddingBottomValue = paddingBottom ?? paddingY ?? padding ?? (compact ? 1 : 3);
  const paddingTopValue = paddingTop ?? paddingY ?? padding ?? (compact ? 2 : 3);
  const paddingStartValue = paddingStart ?? paddingX ?? padding ?? (compact ? 2 : 3);
  const paddingEndValue = paddingEnd ?? paddingX ?? padding ?? (compact ? 2 : 3);

  let mediaContent: React.ReactNode = mediaProp;

  if (spotSquare) {
    mediaContent = <CardMedia name={spotSquare} placement={mediaPlacement} type="spotSquare" />;
  }

  if (pictogram) {
    mediaContent = <CardMedia name={pictogram} placement={mediaPlacement} type="pictogram" />;
  }

  if (image) {
    mediaContent = <CardMedia placement={mediaPlacement} src={image} type="image" />;
  }

  const hasMedia = !!mediaContent;

  const maxWidth = props.maxWidth ?? (hasMedia ? '70%' : undefined);
  const minHeight = props.minHeight ?? (hasMedia ? defaultMediaSize.height : undefined);

  const action = useMemo(() => {
    if (actionLabel && onActionPress) {
      return (
        <CardBodyAction
          accessibilityLabel={accessibilityLabel ?? actionLabel}
          endIcon="forwardArrow"
          onPress={onActionPress}
          testID={`${testID}-action`}
        >
          {actionLabel}
        </CardBodyAction>
      );
    }
    return actionProp;
  }, [accessibilityLabel, actionLabel, actionProp, onActionPress, testID]);

  const textProps = useMemo(
    () => ({ numberOfLines, ellipsize: 'tail' as const, transform: 'none' as const }),
    [numberOfLines],
  );

  if (mediaPlacement === 'above') {
    return (
      <VStack
        gap={2}
        paddingBottom={paddingBottomValue}
        paddingTop={paddingTopValue}
        testID={testID}
        {...props}
      >
        {mediaContent}
        <VStack gap={1} paddingEnd={paddingEndValue} paddingStart={paddingStartValue}>
          {typeof title === 'string' ? (
            <Text font="headline" {...textProps} testID={`${testID}-title`}>
              {title}
            </Text>
          ) : (
            title
          )}
          {typeof description === 'string' ? (
            <Text color="fgMuted" font="label2" {...textProps} testID={`${testID}-description`}>
              {description}
            </Text>
          ) : (
            description
          )}
          {action}
        </VStack>
      </VStack>
    );
  }

  return (
    <HStack
      alignItems="center"
      flexGrow={1}
      gap={1}
      justifyContent="space-between"
      minHeight={minHeight}
      paddingBottom={paddingBottomValue}
      paddingEnd={paddingEndValue}
      paddingStart={paddingStartValue}
      paddingTop={paddingTopValue}
      testID={testID}
      {...props}
    >
      <VStack alignItems="flex-start" flexShrink={1} gap={2} maxWidth={maxWidth}>
        <VStack gap={1} maxWidth="100%" paddingTop={mediaContent ? 0 : 2}>
          {typeof title === 'string' ? (
            <Text font="headline" {...textProps} testID={`${testID}-title`}>
              {title}
            </Text>
          ) : (
            title
          )}
          {typeof description === 'string' ? (
            <Text color="fgMuted" font="label2" {...textProps} testID={`${testID}-description`}>
              {description}
            </Text>
          ) : (
            description
          )}
        </VStack>
        {children}
        {action}
      </VStack>
      {mediaContent}
    </HStack>
  );
});
