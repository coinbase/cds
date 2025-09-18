import React from 'react';
import type { LottieStatusAnimationProps } from '@cbhq/cds-common';
import { useStatusAnimationPoller } from '@cbhq/cds-common';
import { tradeStatus } from '@cbhq/cds-lottie-files/tradeStatus';

import { useLottie } from './useLottie';

export const LottieStatusAnimation = ({
  status = 'loading',
  onFinish,
  testID,
  ...otherProps
}: LottieStatusAnimationProps) => {
  const { playMarkers, Lottie } = useLottie(tradeStatus);
  const handlePolling = useStatusAnimationPoller({ status, playMarkers, onFinish });

  return <Lottie {...otherProps} onAnimationFinish={handlePolling} testID={testID} />;
};
