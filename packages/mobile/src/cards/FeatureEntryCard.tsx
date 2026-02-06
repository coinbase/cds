import React, { memo } from 'react';

import { Card, type CardBaseProps } from './Card';
import { CardBody, type CardBodyBaseProps } from './CardBody';

export type FeatureEntryCardBaseProps = CardBaseProps & CardBodyBaseProps;

/** @deprecated Use MessagingCard instead. FeatureEntryCard will be removed in a future major release. */
export type FeatureEntryCardProps = FeatureEntryCardBaseProps;

/** @deprecated Use MessagingCard instead. FeatureEntryCard will be removed in a future major release. */
export const FeatureEntryCard = memo(function FeatureEntryCard({
  onPress,
  testID = 'feature-entry-card',
  accessibilityHint,
  accessibilityLabel,
  description,
  title,
  borderRadius = 0,
  elevation = 0,
  onActionPress,
  ...props
}: FeatureEntryCardProps) {
  return (
    <Card
      accessibilityHint={
        accessibilityHint ?? (typeof description === 'string' ? description : undefined)
      }
      accessibilityLabel={accessibilityLabel ?? (typeof title === 'string' ? title : undefined)}
      borderRadius={borderRadius}
      elevation={elevation}
      flexShrink={0}
      onPress={onPress}
      testID={testID}
    >
      <CardBody
        description={description}
        onActionPress={onActionPress}
        testID={`${testID}-body`}
        title={title}
        {...props}
      />
    </Card>
  );
});
