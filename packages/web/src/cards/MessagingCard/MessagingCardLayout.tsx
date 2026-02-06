import { memo, useMemo } from 'react';

import { Button } from '../../buttons/Button';
import { IconButton } from '../../buttons/IconButton';
import { Box, VStack } from '../../layout';
import { HStack } from '../../layout/HStack';
import { Pressable } from '../../system/Pressable';
import { Tag } from '../../tag/Tag';
import { Text } from '../../typography/Text';

export type MessagingCardLayoutProps = {
  /** Type of messaging card. Determines background color and text color. */
  type: 'upsell' | 'nudge';
  /** Text or React node to display as the card title. Use a Text component to override default color and font. */
  title?: React.ReactNode;
  /** Text or React node to display as the card description. Use a Text component to override default color and font. */
  description?: React.ReactNode;
  /** Text or React node to display as a tag. When a string is provided, it will be rendered in a Tag component. */
  tag?: React.ReactNode;
  /**
   * Action element to display. Can be a string (renders as default button) or a custom ReactNode.
   * When a string is provided, use `onActionButtonClick` to handle clicks.
   */
  action?: React.ReactNode;
  /** Callback fired when the action button is clicked. Only used when `action` is a string. */
  onActionButtonClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /** Accessibility label for the action button. Only used when `action` is a string.
   * @default action value (when action is a string)
   */
  actionButtonAccessibilityLabel?: string;
  /** React node to display as the dismiss button. When provided, this will be rendered instead of the default dismiss button. */
  dismissButton?: React.ReactNode;
  /** Callback fired when the dismiss button is clicked. When provided, a default dismiss button will be rendered in the top-right corner. */
  onDismissButtonClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /** Accessibility label for the dismiss button.
   * @default 'Dismiss {title}' when title is a string, otherwise 'Dismiss card'
   */
  dismissButtonAccessibilityLabel?: string;
  /** Placement of the media content relative to the text content.
   * @default 'end'
   */
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
    action,
    onActionButtonClick,
    actionButtonAccessibilityLabel,
    onDismissButtonClick,
    dismissButtonAccessibilityLabel,
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
            as="div"
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
          <Text
            as="p"
            color={type === 'upsell' ? 'fgInverse' : 'fg'}
            font="label2"
            numberOfLines={3}
          >
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

    const actionButtonNode = useMemo(() => {
      if (!action) return null;

      // If action is a string, render in a default button
      if (typeof action === 'string') {
        const handleActionClick = (event: React.MouseEvent<HTMLButtonElement>) => {
          event.preventDefault();
          event.stopPropagation();
          onActionButtonClick?.(event);
        };

        if (type === 'upsell') {
          return (
            <Button
              compact
              accessibilityLabel={actionButtonAccessibilityLabel ?? action}
              onClick={handleActionClick}
              variant="secondary"
            >
              {action}
            </Button>
          );
        }

        return (
          <Pressable
            accessibilityLabel={actionButtonAccessibilityLabel ?? action}
            background="transparent"
            onClick={handleActionClick}
            paddingY={1}
          >
            <Text color="fgPrimary" font="headline">
              {action}
            </Text>
          </Pressable>
        );
      }

      // Otherwise, render action as-is (custom React element)
      return action;
    }, [action, actionButtonAccessibilityLabel, onActionButtonClick, type]);

    const computedDismissButtonAccessibilityLabel = useMemo(() => {
      if (dismissButtonAccessibilityLabel) return dismissButtonAccessibilityLabel;
      if (typeof title === 'string') return `Dismiss ${title}`;
      return 'Dismiss card';
    }, [dismissButtonAccessibilityLabel, title]);

    const dismissButtonNode = useMemo(() => {
      if (dismissButton) {
        return dismissButton;
      }
      if (onDismissButtonClick) {
        const handleDismiss = (event: React.MouseEvent<HTMLButtonElement>) => {
          event.preventDefault();
          event.stopPropagation();
          onDismissButtonClick(event);
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
              accessibilityLabel={computedDismissButtonAccessibilityLabel}
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
      computedDismissButtonAccessibilityLabel,
      dismissButton,
      onDismissButtonClick,
      styles?.dismissButtonContainer,
    ]);

    const contentContainerPaddingProps = useMemo(() => {
      if (mediaPlacement === 'start' && dismissButtonNode) {
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
    }, [dismissButtonNode, mediaPlacement]);

    const mediaContainerPaddingProps = useMemo(() => {
      if (type === 'upsell') return;
      if (mediaPlacement === 'start') {
        return { paddingStart: 3, paddingEnd: 1 } as const;
      }
      // when media is placed at the end, we need to add additional padding to the end of the media container
      // this is to avoid the dismiss button from overlapping with the media
      return dismissButtonNode
        ? ({ paddingStart: 1, paddingEnd: 6 } as const)
        : ({ paddingStart: 1, paddingEnd: 3 } as const);
    }, [dismissButtonNode, mediaPlacement, type]);

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
          {actionButtonNode}
        </VStack>
        <Box
          alignItems="center"
          className={classNames?.mediaContainer}
          flexShrink={0}
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
