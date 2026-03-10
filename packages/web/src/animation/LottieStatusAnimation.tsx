import { memo, useCallback, useMemo, useRef, useState } from 'react';
import { lottieStatusToAccessibilityLabel } from '@coinbase/cds-common/lottie/statusToAccessibilityLabel';
import { useStatusAnimationPoller } from '@coinbase/cds-common/lottie/useStatusAnimationPoller';
import type { DimensionValue } from '@coinbase/cds-common/types/DimensionStyles';
import type { LottiePlayer } from '@coinbase/cds-common/types/LottiePlayer';
import type { SharedAccessibilityProps } from '@coinbase/cds-common/types/SharedAccessibilityProps';
import type { SharedProps } from '@coinbase/cds-common/types/SharedProps';
import type { TradeStatusLottie } from '@coinbase/cds-lottie-files/tradeStatus';
import { tradeStatus } from '@coinbase/cds-lottie-files/tradeStatus';
import type { LottieStatus } from 'packages/common/dts/types/LottieStatus';

import { Lottie } from './Lottie';

type LottiePlayerRef = LottiePlayer<TradeStatusLottie>;

type LottieStatusAnimationBaseProps = {
  status?: LottieStatus;
  onFinish?: () => void;
};

type LottieStatusAnimationPropsWithWidth = {
  width: DimensionValue;
} & LottieStatusAnimationBaseProps;

type LottieStatusAnimationPropsWithHeight = {
  height: DimensionValue;
} & LottieStatusAnimationBaseProps;

export type LottieStatusAnimationProps = (
  | LottieStatusAnimationPropsWithWidth
  | LottieStatusAnimationPropsWithHeight
) &
  SharedProps &
  SharedAccessibilityProps;
export const LottieStatusAnimation = memo(
  ({
    status = 'loading',
    onFinish,
    testID,
    accessibilityLabel,
    ...otherProps
  }: LottieStatusAnimationProps) => {
    const [, forceUpdate] = useState(0);
    const lottie = useRef<LottiePlayerRef>();

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

    const label = useMemo(
      () => accessibilityLabel ?? lottieStatusToAccessibilityLabel[status as LottieStatus],
      [accessibilityLabel, status],
    );

    return (
      <Lottie
        ref={handleRef}
        accessibilityLabel={label}
        aria-live="polite"
        onAnimationFinish={handlePolling}
        role="status"
        source={tradeStatus}
        testID={testID}
        {...otherProps}
      />
    );
  },
);
