import React, { memo } from 'react';

import { Card, type CardBaseProps } from './Card';
import { CardBody, type CardBodyBaseProps } from './CardBody';

export type FeatureEntryCardBaseProps = CardBaseProps & CardBodyBaseProps;

/** @deprecated will be removed in v7.0.0 use NudgeCard or UpsellCard instead */
export type FeatureEntryCardProps = FeatureEntryCardBaseProps;

/** @deprecated This component will be removed in a future version. Use NudgeCard or UpsellCard instead. */
export const FeatureEntryCard = memo(function FeatureEntryCard({
  onClick,
  testID = 'feature-entry-card',
  accessibilityHint,
  accessibilityLabel,
  description,
  title,
  borderRadius = 0,
  elevation = 0,
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
      onClick={onClick}
      testID={testID}
    >
      <CardBody description={description} testID={`${testID}-body`} title={title} {...props} />
    </Card>
  );
});
