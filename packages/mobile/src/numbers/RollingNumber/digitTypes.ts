import type { StyleProp, TextStyle, ViewProps, ViewStyle } from 'react-native';
import type { AnimatedStyle, WithSpringConfig, WithTimingConfig } from 'react-native-reanimated';
import { Easing } from 'react-native-reanimated';
import { curves, durations } from '@coinbase/cds-common/motion/tokens';

import type { HStackProps } from '../../layout/HStack';
import type { TextProps } from '../../typography/Text';

/**
 * Digits 0-9 as an array.
 */
export const digits = new Array(10).fill(null).map((_, digit) => digit);

/**
 * Defines transition overrides for RollingNumber animations.
 */
export type RollingNumberTransitionConfig = {
  /**
   * Transition override for the vertical translation animation.
   */
  y?: ({ type: 'timing' } & WithTimingConfig) | ({ type: 'spring' } & WithSpringConfig);
  /**
   * Transition override for the color interpolation animation.
   */
  color?: ({ type: 'timing' } & WithTimingConfig) | ({ type: 'spring' } & WithSpringConfig);
};

export const defaultTransitionConfig = {
  y: {
    type: 'timing',
    duration: durations.moderate3,
    easing: Easing.bezier(...curves.global),
  },
  color: {
    type: 'timing',
    duration: durations.slow4,
    easing: Easing.bezier(...curves.global),
  },
} as const satisfies RollingNumberTransitionConfig;

/**
 * Defines the style of digit transition animation.
 * - `'roll'`: Digits roll through all intermediate values (e.g., 1→2→3→...→9). Default behavior.
 * - `'slide'`: Digits slide directly from old to new value with opacity crossfade.
 */
export type DigitTransitionVariant = 'roll' | 'slide';

/**
 * Direction of value change for digit animations.
 * - `'up'`: Value increased, digits animate upward.
 * - `'down'`: Value decreased, digits animate downward.
 * - `'none'`: No change or initial render.
 */
export type ValueChangeDirection = 'up' | 'down' | 'none';

/**
 * Spring configuration for slide transition variant.
 */
export const slideTransitionSpringConfig = {
  stiffness: 280,
  damping: 18,
  mass: 0.3,
} as const;

export type RollingNumberMaskProps = HStackProps & {
  /**
   * Content rendered inside the mask container.
   */
  children?: React.ReactNode;
  /**
   * Ref forwarded to the mask view element.
   */
  ref?: React.Ref<import('react-native').View>;
};

export type RollingNumberMaskComponent = React.FC<RollingNumberMaskProps>;

export type RollingNumberDigitProps = ViewProps & {
  /**
   * Digit currently displayed in the rotating column.
   */
  value: number;
  /**
   * Digit displayed during the initial render.
   */
  initialValue?: number;
  /**
   * Transition overrides applied to the digit animation.
   */
  transitionConfig?: RollingNumberTransitionConfig;
  /**
   * Component used to mask the digit column.
   */
  RollingNumberMaskComponent?: RollingNumberMaskComponent;
  /**
   * Height of the digit column used to compute translations.
   */
  digitHeight: number;
  /**
   * Style of digit transition animation. Defaults to {@code 'roll'}.
   */
  digitTransitionVariant?: DigitTransitionVariant;
  /**
   * Direction of value change for slide animations.
   */
  valueChangeDirection?: ValueChangeDirection;
  /**
   * Text props forwarded to the Text elements rendering digits.
   */
  textProps?: TextProps;
  styles?: {
    /**
     * Style overrides applied to the digit container view.
     */
    root?: StyleProp<ViewStyle>;
    /**
     * Style overrides applied to Text rendered within the digit column.
     */
    text?:
      | AnimatedStyle<TextStyle>
      | StyleProp<TextStyle>
      | (AnimatedStyle<TextStyle> | StyleProp<TextStyle>)[];
  };
  /**
   * Ref forwarded to the digit container view element.
   */
  ref?: React.Ref<import('react-native').View>;
};

export type RollingNumberDigitComponent = React.FC<RollingNumberDigitProps>;

