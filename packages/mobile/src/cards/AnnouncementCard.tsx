import React, { memo } from 'react';

import { Card, type CardBaseProps } from './Card';
import { CardBody, type CardBodyBaseProps, type CardBodyProps } from './CardBody';

export type AnnouncementCardBaseProps = CardBaseProps & CardBodyBaseProps;
/** @deprecated Use MessagingCard instead. AnnouncementCard will be removed in a future major release. */
export type AnnouncementCardProps = AnnouncementCardBaseProps;

/** @deprecated Use MessagingCard instead. AnnouncementCard will be removed in a future major release. */
export const AnnouncementCard = memo(function AnnouncementCard({
  onPress,
  width,
  title,
  description,
  testID,
  accessibilityLabel,
  accessibilityHint,
  elevation = 0,
  borderRadius = 0,
  onActionPress,
  ...props
}: AnnouncementCardProps) {
  const accessibilityLabelValue =
    typeof title === 'string' && accessibilityLabel === undefined ? title : accessibilityLabel;

  const accessibilityHintValue =
    typeof description === 'string' && accessibilityHint === undefined
      ? description
      : accessibilityHint;

  return (
    <Card
      accessibilityHint={accessibilityHintValue}
      accessibilityLabel={accessibilityLabelValue}
      borderRadius={borderRadius}
      elevation={elevation}
      flexShrink={0}
      onPress={onPress}
      testID={testID}
      width={width}
    >
      <CardBody
        alignItems="flex-start"
        description={description}
        onActionPress={onActionPress}
        title={title}
        {...props}
      />
    </Card>
  );
});
