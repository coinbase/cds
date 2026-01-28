import React, { memo, useCallback, useRef, useState } from 'react';
import { useStatusAnimationPoller } from '@coinbase/cds-common/lottie/useStatusAnimationPoller';
import type { LottiePlayer } from '@coinbase/cds-common/types/LottiePlayer';
import type { LottieStatusAnimationProps } from '@coinbase/cds-common/types/LottieStatusAnimationProps';
import type { TradeStatusLottie } from '@coinbase/cds-lottie-files/tradeStatus';
import { tradeStatus } from '@coinbase/cds-lottie-files/tradeStatus';

import { Lottie } from './Lottie';

type LottiePlayerRef = LottiePlayer<TradeStatusLottie>;

export const LottieStatusAnimation = memo(
  ({ status = 'loading', onFinish, testID, ...otherProps }: LottieStatusAnimationProps) => {
    const [, forceUpdate] = useState(0);
    const lottie = useRef<LottiePlayerRef>(undefined);

    const handlePolling = useStatusAnimationPoller({
      status,
      playMarkers: lottie.current?.playMarkers,
      onFinish,
    });

    const handleRef = useCallback((el: LottiePlayerRef | null) => {
      if (el && !lottie.current) {
        lottie.current = el;
        forceUpdate((prev) => prev + 1);
      }
    }, []);

    return (
      <Lottie
        ref={handleRef}
        onAnimationFinish={handlePolling}
        source={tradeStatus}
        testID={testID}
        {...otherProps}
      />
    );
  },
);
