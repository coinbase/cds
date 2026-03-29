/**
 * @deprecated This component is deprecated. Please use the alpha `DataCard` from `@coinbase/cds-mobile/alpha/data-card` instead.
 *
 * ### Migration Guide
 *
 * The new `DataCard` provides more flexibility with custom layouts and visualization components.
 *
 * **Before:**
 * ```jsx
 * <DataCard
 *   title="Progress"
 *   description="45% complete"
 *   progress={0.45}
 *   progressVariant="bar"
 *   startLabel="0"
 *   endLabel="45"
 * />
 * ```
 *
 * **After:**
 * ```jsx
 * import { DataCard } from '@coinbase/cds-mobile/alpha/data-card';
 *
 * <DataCard
 *   title="Progress"
 *   subtitle="45% complete"
 *   layout="vertical"
 *   thumbnail={<RemoteImage source={{ uri: assetUrl }} shape="circle" size="l" />}
 * >
 *   <ProgressBarWithFixedLabels startLabel={0} endLabel={45} labelPlacement="below">
 *     <ProgressBar accessibilityLabel="45% complete" progress={0.45} weight="semiheavy" />
 *   </ProgressBarWithFixedLabels>
 * </DataCard>
 * ```
 */
import { memo, useMemo } from 'react';
import type { ThemeVars } from '@coinbase/cds-common/core/theme';
import { defaultMediaSize } from '@coinbase/cds-common/tokens/card';
import { gutter } from '@coinbase/cds-common/tokens/sizing';
import type { SharedProps } from '@coinbase/cds-common/types';

import { HStack } from '../layout/HStack';
import { TextBody } from '../typography/TextBody';
import { TextHeadline } from '../typography/TextHeadline';
import { TextLabel2 } from '../typography/TextLabel2';
import { ProgressBar } from '../visualizations/ProgressBar';
import { ProgressCircle } from '../visualizations/ProgressCircle';

import { Card, type CardBaseProps } from './Card';
import { CardBody } from './CardBody';

export type DataCardBaseProps = CardBaseProps &
  SharedProps & {
    onPress?: CardBaseProps['onPress'];
    /** Text to be displayed in TextHeadline under CardHeader section. */
    title: string;
    /** Text to be displayed in TextLabel2 under title. */
    description: string;
    startLabel?: string;
    endLabel?: string;
    progressVariant?: 'bar' | 'circle';
    progress?: number;
    progressColor?: ThemeVars.Color;
  };

export type DataCardProps = DataCardBaseProps;

export const DataCard = memo(function DataCard({
  onPress,
  title,
  description,
  progressVariant,
  progress,
  progressColor,
  startLabel: startLabelProp,
  endLabel: endLabelProp,
  testID = 'data-card',
  borderRadius = 0,
  elevation = 0,
  ...cardProps
}: DataCardProps) {
  const content = useMemo(() => {
    const TextEndLabel = progressVariant === 'bar' ? TextLabel2 : TextBody;
    return (
      <HStack justifyContent="space-between">
        {!!startLabelProp && (
          <TextHeadline testID={`${testID}-start-label`}>{startLabelProp}</TextHeadline>
        )}
        {!!endLabelProp && (
          <TextEndLabel color="fgMuted" testID={`${testID}-end-label`}>
            {endLabelProp}
          </TextEndLabel>
        )}
      </HStack>
    );
  }, [endLabelProp, progressVariant, startLabelProp, testID]);

  return (
    <Card
      borderRadius={borderRadius}
      elevation={elevation}
      gap={2}
      onPress={onPress}
      padding={gutter}
      testID={testID}
      {...cardProps}
    >
      <CardBody
        description={description}
        media={
          progressVariant === 'circle' &&
          !!progress && (
            <ProgressCircle
              color={progressColor}
              progress={progress}
              size={defaultMediaSize.width}
            />
          )
        }
        padding={0}
        testID={`${testID}-body`}
        title={title}
      />
      {content}
      {progressVariant === 'bar' && !!progress && (
        <ProgressBar color={progressColor} progress={progress} />
      )}
    </Card>
  );
});
