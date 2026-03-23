import type { DimensionValue } from './DimensionStyles';
import type { LottieStatus } from './LottieStatus';
import type { SharedProps } from './SharedProps';

/**
 * @deprecated Use LottieStatus directly from @coinbase/cds-common/types/LottieStatus instead. This will be removed in a future major release.
 * @deprecationExpectedRemoval v9
 */
export type { LottieStatus as LottieStatusAnimationType };

/**
 * @deprecated Use LottieStatusAnimationBaseProps from cds-web or cds-mobile instead. This will be removed in a future major release.
 * @deprecationExpectedRemoval v9
 */
type BaseStatusAnimationProps = {
  status?: LottieStatus;
  onFinish?: () => void;
};

/**
 * @deprecated Use LottieStatusAnimationPropsWithWidth from cds-web or cds-mobile instead. This will be removed in a future major release.
 * @deprecationExpectedRemoval v9
 */
type LottieStatusAnimationPropsWithWidth = {
  /**
   * We use aspect ratio to calculate the unset dimension based on the set dimension and a given aspect ratio.
   * Only width or height is allowed, but not both.
   */
  width: DimensionValue;
} & BaseStatusAnimationProps;

/**
 * @deprecated Use LottieStatusAnimationPropsWithHeight from cds-web or cds-mobile instead. This will be removed in a future major release.
 * @deprecationExpectedRemoval v9
 */
type LottieStatusAnimationPropsWithHeight = {
  /**
   * We use aspect ratio to calculate the unset dimension based on the set dimension and a given aspect ratio.
   * Only width or height is allowed, but not both.
   */
  height: DimensionValue;
} & BaseStatusAnimationProps;

/**
 * @deprecated Use LottieStatusAnimationProps from cds-web or cds-mobile instead. This will be removed in a future major release.
 * @deprecationExpectedRemoval v9
 */
export type LottieStatusAnimationProps = (
  | LottieStatusAnimationPropsWithWidth
  | LottieStatusAnimationPropsWithHeight
) &
  SharedProps;
