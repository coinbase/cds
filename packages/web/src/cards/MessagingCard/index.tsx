import { forwardRef, memo } from 'react';

import type { Polymorphic } from '../../core/polymorphism';
import { cx } from '../../cx';
import { CardRoot, type CardRootBaseProps } from '../CardRoot';

import { MessagingCardLayout, type MessagingCardLayoutProps } from './MessagingCardLayout';

export type MessagingCardBaseProps = Polymorphic.ExtendableProps<
  Omit<CardRootBaseProps, 'children'>,
  MessagingCardLayoutProps & {
    classNames?: {
      /** Root element */
      root?: string;
    };
    styles?: {
      /** Root element */
      root?: React.CSSProperties;
    };
  }
>;

export type MessagingCardProps<AsComponent extends React.ElementType = 'article'> =
  Polymorphic.Props<AsComponent, MessagingCardBaseProps>;

type MessagingCardComponent = (<AsComponent extends React.ElementType = 'article'>(
  props: MessagingCardProps<AsComponent>,
) => Polymorphic.ReactReturn) &
  Polymorphic.ReactNamed;

export const MessagingCard: MessagingCardComponent = memo(
  forwardRef<React.ReactElement<MessagingCardBaseProps>, MessagingCardBaseProps>(
    <AsComponent extends React.ElementType>(
      {
        as,
        type,
        title,
        description,
        tag,
        action,
        onActionButtonClick,
        actionButtonAccessibilityLabel,
        onDismissButtonClick,
        dismissButtonAccessibilityLabel,
        mediaPlacement,
        media,
        dismissButton,
        styles: { root: rootStyle, ...layoutStyles } = {},
        classNames: { root: rootClassName, ...layoutClassNames } = {},
        className,
        style,
        ...props
      }: MessagingCardProps<AsComponent>,
      ref?: Polymorphic.Ref<AsComponent>,
    ) => (
      <CardRoot
        ref={ref}
        as={as as React.ElementType}
        background={type === 'upsell' ? 'bgPrimary' : 'bgAlternate'}
        borderRadius={500}
        borderWidth={0}
        className={cx(rootClassName, className)}
        overflow="hidden"
        style={{ ...rootStyle, ...style }}
        {...props}
      >
        <MessagingCardLayout
          action={action}
          actionButtonAccessibilityLabel={actionButtonAccessibilityLabel}
          classNames={layoutClassNames}
          description={description}
          dismissButton={dismissButton}
          dismissButtonAccessibilityLabel={dismissButtonAccessibilityLabel}
          media={media}
          mediaPlacement={mediaPlacement}
          onActionButtonClick={onActionButtonClick}
          onDismissButtonClick={onDismissButtonClick}
          styles={layoutStyles}
          tag={tag}
          title={title}
          type={type}
        />
      </CardRoot>
    ),
  ),
);
