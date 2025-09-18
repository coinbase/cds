import type { DimensionValue } from './DimensionStyles';
import type { SharedProps } from './SharedProps';

export type LottieStatusAnimationType =
  | 'loading'
  | 'success'
  | 'cardSuccess'
  | 'failure'
  | 'pending';

type BaseStatusAnimationProps = {
  status?: LottieStatusAnimationType;
  onFinish?: () => void;
};

type StatusAnimationWithWidth = {
  /**
   * We use aspect ratio to calculate the unset dimension based on the set dimension and a given aspect ratio.
   * Only width or height is allowed, but not both.
   */
  width: DimensionValue;
} & BaseStatusAnimationProps;

type StatusAnimationWithHeight = {
  /**
   * We use aspect ratio to calculate the unset dimension based on the set dimension and a given aspect ratio.
   * Only width or height is allowed, but not both.
   */
  height: DimensionValue;
} & BaseStatusAnimationProps;

export type LottieStatusAnimationProps = (StatusAnimationWithWidth | StatusAnimationWithHeight) &
  SharedProps;
