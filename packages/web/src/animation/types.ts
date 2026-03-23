import type { LottieSource } from '@coinbase/cds-common/types/LottieSource';
import type { AnimationEventName, AnimationItem, SVGRendererConfig } from 'lottie-web';

import type { BoxBaseProps, BoxDefaultElement, BoxProps } from '../layout';

export type LottieEventHandlersMap = {
  [key in LottieListener['name']]?: LottieListener['handler'];
};

export type LottieListener = {
  name: AnimationEventName;
  handler: () => void;
};

export type LottieBaseProps<T extends string, Source extends LottieSource<T>> = Omit<
  BoxBaseProps,
  'alignContent' | 'justifyContent' | 'flexWrap' | 'flexDirection'
> & {
  /**
   * A boolean flag indicating whether or not the animation should start automatically when
   * mounted. This only affects the imperative API.
   */
  autoplay?: boolean;
  /**
   * A boolean flag indicating whether or not the animation should loop.
   */
  loop?: boolean;
  /**
   * A callback function which will be called when animation is finished. Note that on mobile, this
   * callback will be called only when `loop` is set to false.
   */
  onAnimationFinish?: () => void;
  /**
   * Determines how to resize the animated view when the frame doesn't match the raw image
   * dimensions.
   * Refer to React Native docs [here](https://facebook.github.io/react-native/docs/image.html#resizemode)
   * @default contain
   */
  resizeMode?: 'cover' | 'contain' | 'center';
  /**
   * The source of animation. Should be pulled from @coinbase/cds-lottie-files.
   * For web, you can import the animation from index since this webpack can handle treeshaking, `import { tradeStatus } from @coinbase/cds-lottie-files`
   */
  source: Source;
  handlers?: LottieEventHandlersMap;
  /**
   * In order to render drop shadows, the filter size needs to be set to increase the render surface of the element.
   * You can set the x, y, width and height of filters manually.
   */
  filterSize?: SVGRendererConfig['filterSize'];
};

export type LottieProps<T extends string, Source extends LottieSource<T>> = LottieBaseProps<
  T,
  Source
> &
  BoxProps<BoxDefaultElement>;

export type LottieAnimationRef = React.MutableRefObject<AnimationItem | undefined>;
