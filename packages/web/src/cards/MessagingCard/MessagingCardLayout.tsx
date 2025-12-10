import { memo, useMemo } from 'react';

import { IconButton } from '../../buttons/IconButton';
import { Box, VStack } from '../../layout';
import { HStack } from '../../layout/HStack';
import { Tag } from '../../tag/Tag';
import { Text } from '../../typography/Text';

export type MessagingCardLayoutProps = {
  /** Type of messaging card. Determines background color and text color. */
  type: 'upsell' | 'nudge';
  /** Text or React node to display as the card title. When a string is provided, it will be rendered in a CardTitle component with appropriate color based on type. */
  title?: React.ReactNode;
  /** Text or React node to display as the card subtitle. */
  subtitle?: React.ReactNode;
  /** Text or React node to display as the card description. When a string is provided, it will be rendered in a CardDescription component with appropriate color based on type. */
  description?: React.ReactNode;
  /** Text or React node to display as a tag. When a string is provided, it will be rendered in a Tag component. */
  tag?: React.ReactNode;
  /** React node to display as actions (typically buttons) at the bottom of the content area. */
  actions?: React.ReactNode;
  /** React node to display as the dismiss button. When provided, a dismiss button will be rendered in the top-right corner. */
  dismissButton?: React.ReactNode;
  /** Callback fired when the dismiss button is pressed. When provided, a dismiss button will be rendered in the top-right corner. */
  onDismiss?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /** Accessibility label for the dismiss button.
   * @default 'Dismiss card'
   */
  dismissButtonAccessibilityLabel?: string;
  /** Placement of the media content relative to the text content. */
  mediaPlacement: 'start' | 'end';
  /** React node to display as the main media content. When provided, it will be rendered in a Box container. */
  media?: React.ReactNode;
  styles?: {
    layoutContainer?: React.CSSProperties;
    contentContainer?: React.CSSProperties;
    textContainer?: React.CSSProperties;
    mediaContainer?: React.CSSProperties;
    dismissButtonContainer?: React.CSSProperties;
  };
  classNames?: {
    layoutContainer?: string;
    contentContainer?: string;
    textContainer?: string;
    mediaContainer?: string;
    dismissButtonContainer?: string;
  };
};

export const MessagingCardLayout = memo(
  ({
    type,
    title,
    description,
    tag,
    actions,
    onDismiss,
    dismissButtonAccessibilityLabel = 'Dismiss card',
    mediaPlacement = 'end',
    media,
    styles = {},
    classNames = {},
    dismissButton,
  }: MessagingCardLayoutProps) => {
    const titleNode = useMemo(() => {
      if (typeof title === 'string') {
        return (
          <Text
            as="h3"
            color={type === 'upsell' ? 'fgInverse' : 'fg'}
            font="headline"
            numberOfLines={2}
          >
            {title}
          </Text>
        );
      }
      return title;
    }, [title, type]);

    const descriptionNode = useMemo(() => {
      if (typeof description === 'string') {
        return (
          <Text color={type === 'upsell' ? 'fgInverse' : 'fg'} font="label2" numberOfLines={3}>
            {description}
          </Text>
        );
      }
      return description;
    }, [description, type]);

    const tagNode = useMemo(() => {
      if (typeof tag === 'string') {
        return <Tag>{tag}</Tag>;
      }
      return tag;
    }, [tag]);

    const dismissButtonNode = useMemo(() => {
      if (dismissButton) {
        return dismissButton;
      }
      if (onDismiss) {
        const handleDismiss = (event: React.MouseEvent<HTMLButtonElement>) => {
          event.preventDefault();
          event.stopPropagation();
          onDismiss(event);
        };

        return (
          <HStack
            className={classNames?.dismissButtonContainer}
            paddingEnd={1}
            paddingTop={1}
            position="absolute"
            right={0}
            style={styles?.dismissButtonContainer}
            top={0}
          >
            <IconButton
              compact
              accessibilityLabel={dismissButtonAccessibilityLabel}
              name="close"
              onClick={handleDismiss}
              variant="secondary"
            />
          </HStack>
        );
      }
      return null;
    }, [
      classNames?.dismissButtonContainer,
      dismissButton,
      dismissButtonAccessibilityLabel,
      onDismiss,
      styles?.dismissButtonContainer,
    ]);

    const contentContainerPaddingProps = useMemo(() => {
      if (mediaPlacement === 'start' && onDismiss) {
        // needs to add additional padding to the end of the content area when media is placed at the start and there is a dismiss button
        // this is to avoid dismiss button from overlapping with the content area
        return {
          paddingY: 2,
          paddingStart: 2,
          paddingEnd: 6,
        } as const;
      }
      return {
        padding: 2,
      } as const;
    }, [mediaPlacement, onDismiss]);

    const mediaContainerPaddingProps = useMemo(() => {
      if (type === 'upsell') return;
      if (mediaPlacement === 'start') {
        return { paddingStart: 3, paddingEnd: 1 } as const;
      }
      // when media is placed at the end, we need to add additional padding to the end of the media container
      // this is to avoid the dismiss button from overlapping with the media
      return onDismiss
        ? ({ paddingStart: 1, paddingEnd: 6 } as const)
        : ({ paddingStart: 1, paddingEnd: 3 } as const);
    }, [mediaPlacement, onDismiss, type]);

    return (
      <HStack
        alignItems="stretch"
        className={classNames?.layoutContainer}
        flexDirection={mediaPlacement === 'start' ? 'row-reverse' : 'row'}
        flexGrow={1}
        position="relative"
        style={styles?.layoutContainer}
      >
        <VStack
          alignItems="flex-start"
          className={classNames?.contentContainer}
          flexGrow={1}
          gap={2}
          style={styles?.contentContainer}
          {...contentContainerPaddingProps}
        >
          <VStack
            alignItems="flex-start"
            className={classNames?.textContainer}
            gap={0.5}
            style={styles?.textContainer}
          >
            {tagNode}
            {titleNode}
            {descriptionNode}
          </VStack>
          {actions}
        </VStack>
        <Box
          alignItems="center"
          className={classNames?.mediaContainer}
          style={styles?.mediaContainer}
          {...mediaContainerPaddingProps}
        >
          {media}
        </Box>
        {dismissButtonNode}
      </HStack>
    );
  },
);
