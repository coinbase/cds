import React from 'react';
import type { LottieStatusAnimationProps } from '@coinbase/cds-common';
import { useStatusAnimationPoller } from '@coinbase/cds-common';
import { tradeStatus } from '@coinbase/cds-lottie-files/tradeStatus';

import { useLottie } from './useLottie';

export const LottieStatusAnimation = ({
  status = 'loading',
  onFinish,
  testID,
  ...otherProps
}: LottieStatusAnimationProps) => {
  const { playMarkers, Lottie } = useLottie(tradeStatus);
  const handlePolling = useStatusAnimationPoller({ status, playMarkers, onFinish });

  return <Lottie onAnimationFinish={handlePolling} testID={testID} {...otherProps} />;
};
