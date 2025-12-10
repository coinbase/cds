import { forwardRef, memo } from 'react';
import type { StyleProp, View, ViewStyle } from 'react-native';
import type { ThemeVars } from '@coinbase/cds-common';

import { CardRoot, type CardRootProps } from '../CardRoot';

import { MessagingCardLayout, type MessagingCardLayoutProps } from './MessagingCardLayout';

export type MessagingCardBaseProps = MessagingCardLayoutProps;

export type MessagingCardProps = Omit<CardRootProps, 'children'> &
  MessagingCardBaseProps & {
    styles?: {
      root?: StyleProp<ViewStyle>;
    };
  };

const messagingCardContainerProps = {
  borderRadius: 500 as ThemeVars.BorderRadius,
  overflow: 'hidden' as const,
};

export const MessagingCard = memo(
  forwardRef<View, MessagingCardProps>(
    (
      {
        type,
        title,
        description,
        tag,
        actions,
        dismissButton,
        onDismiss,
        dismissButtonAccessibilityLabel,
        mediaPlacement,
        media,
        style,
        styles: { root: rootStyle, ...layoutStyles } = {},
        ...props
      },
      ref,
    ) => {
      const background = type === 'upsell' ? 'bgPrimary' : 'bgAlternate';
      return (
        <CardRoot
          ref={ref}
          background={background}
          borderWidth={0}
          style={[style, rootStyle]}
          {...messagingCardContainerProps}
          {...props}
        >
          <MessagingCardLayout
            actions={actions}
            description={description}
            dismissButton={dismissButton}
            dismissButtonAccessibilityLabel={dismissButtonAccessibilityLabel}
            media={media}
            mediaPlacement={mediaPlacement}
            onDismiss={onDismiss}
            styles={layoutStyles}
            tag={tag}
            title={title}
            type={type}
          />
        </CardRoot>
      );
    },
  ),
);

MessagingCard.displayName = 'MessagingCard';
