import type { StyleProp, TextStyle, View, ViewProps, ViewStyle } from 'react-native';
import type { AnimatedStyle, WithSpringConfig, WithTimingConfig } from 'react-native-reanimated';
import { Easing } from 'react-native-reanimated';
import { curves, durations } from '@coinbase/cds-common/motion/tokens';
import type { KeyedNumberPart } from '@coinbase/cds-common/numbers/IntlNumberFormat';

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
 * - `'every'`: Rolls through every intermediate digit (e.g., 1→2→3→...→9). Default behavior.
 * - `'single'`: Rolls directly to the new digit without showing intermediates.
 */
export type DigitTransitionVariant = 'every' | 'single';

export type { SingleDirection } from '@coinbase/cds-common/numbers/useValueChangeDirection';

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
   * Style of digit transition animation. Defaults to {@code 'every'}.
   */
  digitTransitionVariant?: DigitTransitionVariant;
  /**
   * Direction of the roll animation. Only used when {@link digitTransitionVariant} is `'single'`.
   */
  direction?: SingleDirection;
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

export type RollingNumberSymbolProps = HStackProps & {
  /**
   * Literal symbol rendered within the formatted value.
   */
  value: string;
  /**
   * Text props forwarded to the Text components rendering the symbol.
   */
  textProps?: TextProps;
  styles?: {
    /**
     * Style override applied to the symbol container.
     */
    root?: StyleProp<ViewStyle>;
    /**
     * Style override applied to Text within the symbol component.
     */
    text?:
      | AnimatedStyle<TextStyle>
      | StyleProp<TextStyle>
      | (AnimatedStyle<TextStyle> | StyleProp<TextStyle>)[];
  };
  /**
   * Ref forwarded to the symbol container view element.
   */
  ref?: React.Ref<View>;
};

export type RollingNumberSymbolComponent = React.FC<RollingNumberSymbolProps>;

export type RollingNumberValueSectionProps = HStackProps & {
  /**
   * Parts from Intl.NumberFormat used to render digits and symbols.
   */
  intlNumberParts: KeyedNumberPart[];
  /**
   * Height of a single digit row used to size the animated mask.
   */
  digitHeight?: number;
  /**
   * Component used to render digit columns.
   */
  RollingNumberDigitComponent?: RollingNumberDigitComponent;
  /**
   * Component used to render symbols and literals.
   */
  RollingNumberSymbolComponent?: RollingNumberSymbolComponent;
  /**
   * Component used to mask the value section.
   */
  RollingNumberMaskComponent?: RollingNumberMaskComponent;
  /**
   * Preformatted value rendered instead of intlNumberParts when provided.
   */
  formattedValue?: string;
  /**
   * Transition overrides applied to digit and symbol animations.
   */
  transitionConfig?: RollingNumberTransitionConfig;
  /**
   * Style of digit transition animation. Defaults to {@code 'every'}.
   */
  digitTransitionVariant?: DigitTransitionVariant;
  /**
   * Direction of the roll animation. Only used when {@link digitTransitionVariant} is `'single'`.
   */
  direction?: SingleDirection;
  /**
   * Text props forwarded to Text children within the section.
   */
  textProps?: TextProps;
  styles?: {
    /**
     * Style override applied to the value section container.
     */
    root?: StyleProp<ViewStyle>;
    /**
     * Style override applied to Text within the value section.
     */
    text?:
      | AnimatedStyle<TextStyle>
      | StyleProp<TextStyle>
      | (AnimatedStyle<TextStyle> | StyleProp<TextStyle>)[];
  };
  /**
   * Ref forwarded to the value section view element.
   */
  ref?: React.Ref<View>;
};

export type RollingNumberValueSectionComponent = React.FC<RollingNumberValueSectionProps>;
