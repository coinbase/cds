import { memo, useMemo } from 'react';
import { lottieStatusToAccessibilityLabel } from '@coinbase/cds-common/lottie/statusToAccessibilityLabel';
import { useStatusAnimationPoller } from '@coinbase/cds-common/lottie/useStatusAnimationPoller';
import type { DimensionValue } from '@coinbase/cds-common/types/DimensionStyles';
import type { SharedAccessibilityProps } from '@coinbase/cds-common/types/SharedAccessibilityProps';
import type { SharedProps } from '@coinbase/cds-common/types/SharedProps';
import { tradeStatus } from '@coinbase/cds-lottie-files/tradeStatus';
import type { LottieStatus } from 'packages/common/dts/types/LottieStatus';

import { useLottie } from './useLottie';

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
    const { playMarkers, Lottie } = useLottie(tradeStatus);
    const handlePolling = useStatusAnimationPoller({ status, playMarkers, onFinish });

    const label = useMemo(
      () => accessibilityLabel ?? lottieStatusToAccessibilityLabel[status],
      [accessibilityLabel, status],
    );

    return (
      <Lottie
        {...otherProps}
        accessible
        accessibilityLabel={label}
        accessibilityLiveRegion="polite"
        onAnimationFinish={handlePolling}
        testID={testID}
      />
    );
  },
);
