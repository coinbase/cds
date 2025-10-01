import { forwardRef, memo, useMemo, useState } from 'react';
import {
  type LayoutChangeEvent,
  type StyleProp,
  StyleSheet,
  type TextStyle,
  type View,
  type ViewProps,
  type ViewStyle,
} from 'react-native';
import {
  type AnimatedStyle,
  Easing,
  type WithSpringConfig,
  type WithTimingConfig,
} from 'react-native-reanimated';
import type { ThemeVars } from '@coinbase/cds-common/core/theme';
import { curves, durations } from '@coinbase/cds-common/motion/tokens';
import type { KeyedNumberPart } from '@coinbase/cds-common/numbers/IntlNumberFormat';
import { IntlNumberFormat } from '@coinbase/cds-common/numbers/IntlNumberFormat';
import { useLocale } from '@coinbase/cds-common/system/LocaleProvider';
import type { SharedProps } from '@coinbase/cds-common/types/SharedProps';

import { HStack, type HStackProps } from '../../layout/HStack';
import { Text, type TextBaseProps, type TextProps } from '../../typography/Text';

import { DefaultRollingNumberAffixSection } from './DefaultRollingNumberAffixSection';
import { DefaultRollingNumberDigit } from './DefaultRollingNumberDigit';
import { DefaultRollingNumberMask } from './DefaultRollingNumberMask';
import { DefaultRollingNumberSymbol } from './DefaultRollingNumberSymbol';
import { DefaultRollingNumberValueSection } from './DefaultRollingNumberValueSection';
import { useColorPulse } from './useColorPulse';

export const digits = new Array(10).fill(null).map((_, digit) => digit);

const baseStylesheet = StyleSheet.create({
  hide: {
    position: 'absolute',
    top: 0,
    left: 0,
    opacity: 0,
  },
  screenReaderOnly: {
    position: 'absolute',
    // Snap to parent size so a11y hit area matches visible content
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    // Use color: transparent instead of opacity: 0 to avoid issues with screen readers
    color: 'transparent',
  },
});

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

// Subcomponent prop and component type declarations
export type RollingNumberMaskProps = HStackProps & {
  /**
   * Content rendered inside the mask container.
   */
  children?: React.ReactNode;
  /**
   * Ref forwarded to the mask view element.
   */
  ref?: React.Ref<View>;
};

export type RollingNumberAffixSectionProps = HStackProps & {
  /**
   * Content rendered inside the affix section.
   */
  children?: React.ReactNode;
  /**
   * Text props forwarded to the Text components rendered inside the section.
   */
  textProps?: TextProps;
  styles?: {
    /**
     * Style override applied to the affix section container.
     */
    root?: StyleProp<ViewStyle>;
    /**
     * Style override applied to Text within the affix section.
     */
    text?:
      | AnimatedStyle<TextStyle>
      | StyleProp<TextStyle>
      | (AnimatedStyle<TextStyle> | StyleProp<TextStyle>)[];
  };
  /**
   * Ref forwarded to the affix section view element.
   */
  ref?: React.Ref<View>;
};

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
  ref?: React.Ref<View>;
};

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

export type RollingNumberMaskComponent = React.FC<RollingNumberMaskProps>;

export type RollingNumberAffixSectionComponent = React.FC<RollingNumberAffixSectionProps>;

export type RollingNumberValueSectionComponent = React.FC<RollingNumberValueSectionProps>;

export type RollingNumberDigitComponent = React.FC<RollingNumberDigitProps>;

export type RollingNumberSymbolComponent = React.FC<RollingNumberSymbolProps>;

export type RollingNumberBaseProps = SharedProps &
  TextBaseProps & {
    /**
     * Number to display.
     */
    value: number;
    /**
     * Intl.NumberFormat options applied when formatting the value. Scientific and engineering notation are not supported.
     */
    format?: Omit<Intl.NumberFormatOptions, 'notation'> & {
      notation?: Extract<Intl.NumberFormatOptions['notation'], 'standard' | 'compact'>;
    };
    /**
     * Preformatted value rendered instead of formatting {@link value}. {@link value} is still used to determine numeric deltas.
     */
    formattedValue?: string;
    /**
     * Content rendered before the formatted value.
     */
    prefix?: React.ReactNode;
    /**
     * Content rendered after the formatted value.
     */
    suffix?: React.ReactNode;
    /**
     * Component used to render the mask container.
     */
    RollingNumberMaskComponent?: RollingNumberMaskComponent;
    /**
     * Component used to render prefix and suffix sections.
     */
    RollingNumberAffixSectionComponent?: RollingNumberAffixSectionComponent;
    /**
     * Component used to render the numeric sections.
     */
    RollingNumberValueSectionComponent?: RollingNumberValueSectionComponent;
    /**
     * Component used to render individual digits.
     */
    RollingNumberDigitComponent?: RollingNumberDigitComponent;
    /**
     * Component used to render separators and other symbols.
     */
    RollingNumberSymbolComponent?: RollingNumberSymbolComponent;
    /**
     * Locale used for formatting. Defaults to the locale from {@link LocaleProvider}.
     */
    locale?: Intl.LocalesArgument;
    /**
     * Base text color token. When {@link colorPulseOnUpdate} is true, the color briefly pulses to a positive or negative mid color before returning to this base color. Defaults to {@code 'fg'}.
     */
    color?: ThemeVars.Color;
    /**
     * Enables color pulsing on positive or negative changes.
     */
    colorPulseOnUpdate?: boolean;
    /**
     * Color token used for positive numeric changes. Defaults to {@code 'fgPositive'}.
     */
    positivePulseColor?: ThemeVars.Color;
    /**
     * Color token used for negative numeric changes. Defaults to {@code 'fgNegative'}.
     */
    negativePulseColor?: ThemeVars.Color;
    /**
     * Enables subscript notation for leading zeros in the fractional part (for example, {@code 0.00009 => 0.0₄9}).
     */
    enableSubscriptNotation?: boolean;
    /**
     * Reanimated transition overrides. Supports per-property overrides for {@code y} and {@code color} only.
     */
    transition?: RollingNumberTransitionConfig;
    /**
     * Accessibility label prefix announced before the value.
     */
    accessibilityLabelPrefix?: string;
    /**
     * Accessibility label suffix announced after the value.
     */
    accessibilityLabelSuffix?: string;
    /**
     * accessibilityLiveRegion value used for screen readers on Android. Defaults to {@code 'polite'}.
     */
    accessibilityLiveRegion?: React.ComponentProps<typeof Text>['accessibilityLiveRegion'];
    /**
     * Enables tabular figures on the underlying {@link Text}. All digits render with equal width. Defaults to {@code true}.
     */
    tabularNumbers?: boolean;
  };

export type RollingNumberProps = TextProps &
  RollingNumberBaseProps & {
    /**
     * Style overrides applied to RollingNumber slots.
     */
    styles?: {
      /**
       * Style override applied to the outer container view.
       */
      root?: StyleProp<ViewStyle>;
      /**
       * Style override applied to the visible animated content wrapper.
       */
      visibleContent?: StyleProp<ViewStyle>;
      /**
       * Style override applied to the Intl formatted section wrapper.
       */
      formattedValueSection?: StyleProp<ViewStyle>;
      /**
       * Style override applied to the prefix section rendered from props.
       */
      prefix?: StyleProp<ViewStyle>;
      /**
       * Style override applied to the suffix section rendered from props.
       */
      suffix?: StyleProp<ViewStyle>;
      /**
       * The prefix generated by Intl.NumberFormat, for example, the "$" in "$1,000".
       */
      i18nPrefix?: StyleProp<ViewStyle>;
      /**
       * The suffix generated by Intl.NumberFormat, for example, the "K" in "100K".
       */
      i18nSuffix?: StyleProp<ViewStyle>;
      /**
       * Style override applied to the integer portion of the formatted value.
       */
      integer?: StyleProp<ViewStyle>;
      /**
       * Style override applied to the fractional portion of the formatted value.
       */
      fraction?: StyleProp<ViewStyle>;
      /**
       * Style override applied to Text rendered within the component.
       */
      text?: StyleProp<TextStyle>;
    };
  };

export const RollingNumber = memo(
  forwardRef<View, RollingNumberProps>(
    (
      {
        value,
        color: colorProp = 'fg',
        colorPulseOnUpdate,
        positivePulseColor = 'fgPositive',
        negativePulseColor = 'fgNegative',
        font = 'inherit',
        fontFamily = font,
        fontSize = font,
        fontWeight = font,
        // default to fontSize since lineHeight changes depending on the fontSize
        lineHeight = fontSize,
        tabularNumbers = true,
        testID,
        accessibilityLiveRegion = 'polite',
        locale: localeProp,
        format,
        style,
        prefix,
        suffix,
        styles,
        enableSubscriptNotation,
        transition = defaultTransitionConfig,
        formattedValue,
        accessibilityLabel,
        accessibilityLabelPrefix,
        accessibilityLabelSuffix,
        RollingNumberMaskComponent = DefaultRollingNumberMask,
        RollingNumberAffixSectionComponent = DefaultRollingNumberAffixSection,
        RollingNumberValueSectionComponent = DefaultRollingNumberValueSection,
        RollingNumberDigitComponent = DefaultRollingNumberDigit,
        RollingNumberSymbolComponent = DefaultRollingNumberSymbol,
        ...restTextProps
      }: RollingNumberProps,
      ref,
    ) => {
      const { locale: defaultLocale } = useLocale();
      const locale = localeProp ?? defaultLocale;
      const [digitHeight, setDigitHeight] = useState<number | undefined>();

      const handleMeasureDigits = (e: LayoutChangeEvent) => {
        const { layout } = e.nativeEvent;
        setDigitHeight(layout.height);
      };

      const textProps = useMemo(
        () => ({
          font,
          fontSize,
          fontWeight,
          fontFamily,
          lineHeight,
          tabularNumbers,
          color: colorProp,
          ...restTextProps,
        }),
        [
          font,
          fontSize,
          fontWeight,
          fontFamily,
          lineHeight,
          tabularNumbers,
          colorProp,
          restTextProps,
        ],
      );

      const transitionConfig = useMemo(
        () => ({ ...defaultTransitionConfig, ...transition }),
        [transition],
      );

      const intlNumberFormatter = useMemo(
        () =>
          new IntlNumberFormat({
            value,
            format,
            locale,
          }),
        [value, format, locale],
      );

      const formatted = useMemo(
        () => formattedValue ?? intlNumberFormatter.format(),
        [formattedValue, intlNumberFormatter],
      );

      const animatedColorStyle = useColorPulse({
        value,
        defaultColor: colorProp,
        colorPulseOnUpdate: !!colorPulseOnUpdate,
        positivePulseColor,
        negativePulseColor,
        transitionConfig,
        formatted,
      });

      const rootStyle = useMemo(() => [style, styles?.root], [style, styles?.root]);

      const invisibleMeasuredDigits = useMemo(
        () => (
          <Text
            accessibilityElementsHidden
            accessibilityLabel=""
            importantForAccessibility="no-hide-descendants"
            onLayout={handleMeasureDigits}
            style={[baseStylesheet.hide, styles?.text]}
            {...textProps}
          >
            0
          </Text>
        ),

        [textProps, styles?.text],
      );

      const prefixSection = useMemo(
        () => (
          // prefix from props
          <RollingNumberAffixSectionComponent
            justifyContent="flex-end"
            style={styles?.prefix}
            styles={{ text: [animatedColorStyle, styles?.text] }}
            textProps={textProps}
          >
            {prefix}
          </RollingNumberAffixSectionComponent>
        ),
        [
          RollingNumberAffixSectionComponent,
          animatedColorStyle,
          styles?.prefix,
          textProps,
          prefix,
          styles?.text,
        ],
      );

      const suffixSection = useMemo(
        () => (
          // suffix from props
          <RollingNumberAffixSectionComponent
            justifyContent="flex-start"
            style={styles?.suffix}
            styles={{ text: [animatedColorStyle, styles?.text] }}
            textProps={textProps}
          >
            {suffix}
          </RollingNumberAffixSectionComponent>
        ),
        [
          RollingNumberAffixSectionComponent,
          animatedColorStyle,
          styles?.suffix,
          textProps,
          suffix,
          styles?.text,
        ],
      );

      const intlPartsValueSection = useMemo(() => {
        const { pre, integer, fraction, post } = intlNumberFormatter.formatToParts({
          enableSubscriptNotation,
        });
        return (
          <HStack style={styles?.formattedValueSection}>
            {/* Prefix generated by Intl.NumberFormat */}
            <RollingNumberValueSectionComponent
              RollingNumberDigitComponent={RollingNumberDigitComponent}
              RollingNumberMaskComponent={RollingNumberMaskComponent}
              RollingNumberSymbolComponent={RollingNumberSymbolComponent}
              digitHeight={digitHeight}
              intlNumberParts={pre}
              justifyContent="flex-end"
              style={styles?.i18nPrefix}
              styles={{ text: [animatedColorStyle, styles?.text] }}
              textProps={textProps}
              transitionConfig={transitionConfig}
            />
            <RollingNumberValueSectionComponent
              RollingNumberDigitComponent={RollingNumberDigitComponent}
              RollingNumberMaskComponent={RollingNumberMaskComponent}
              RollingNumberSymbolComponent={RollingNumberSymbolComponent}
              digitHeight={digitHeight}
              intlNumberParts={integer}
              justifyContent="flex-end"
              style={styles?.integer}
              styles={{ text: [animatedColorStyle, styles?.text] }}
              textProps={textProps}
              transitionConfig={transitionConfig}
            />
            <RollingNumberValueSectionComponent
              RollingNumberDigitComponent={RollingNumberDigitComponent}
              RollingNumberMaskComponent={RollingNumberMaskComponent}
              RollingNumberSymbolComponent={RollingNumberSymbolComponent}
              digitHeight={digitHeight}
              intlNumberParts={fraction}
              justifyContent="flex-start"
              style={styles?.fraction}
              styles={{ text: [animatedColorStyle, styles?.text] }}
              textProps={textProps}
              transitionConfig={transitionConfig}
            />
            {/* Suffix generated by Intl.NumberFormat */}
            <RollingNumberValueSectionComponent
              RollingNumberDigitComponent={RollingNumberDigitComponent}
              RollingNumberMaskComponent={RollingNumberMaskComponent}
              RollingNumberSymbolComponent={RollingNumberSymbolComponent}
              digitHeight={digitHeight}
              intlNumberParts={post}
              justifyContent="flex-start"
              style={styles?.i18nSuffix}
              styles={{ text: [animatedColorStyle, styles?.text] }}
              textProps={textProps}
              transitionConfig={transitionConfig}
            />
          </HStack>
        );
      }, [
        intlNumberFormatter,
        enableSubscriptNotation,
        styles?.formattedValueSection,
        styles?.i18nPrefix,
        styles?.text,
        styles?.integer,
        styles?.fraction,
        styles?.i18nSuffix,
        RollingNumberValueSectionComponent,
        RollingNumberDigitComponent,
        RollingNumberMaskComponent,
        RollingNumberSymbolComponent,
        digitHeight,
        animatedColorStyle,
        textProps,
        transitionConfig,
      ]);

      const formattedValueValueSection = useMemo(
        () => (
          <RollingNumberValueSectionComponent
            RollingNumberDigitComponent={RollingNumberDigitComponent}
            RollingNumberMaskComponent={RollingNumberMaskComponent}
            RollingNumberSymbolComponent={RollingNumberSymbolComponent}
            digitHeight={digitHeight}
            formattedValue={formattedValue}
            intlNumberParts={[]}
            justifyContent="flex-start"
            style={styles?.formattedValueSection}
            styles={{ text: [animatedColorStyle, styles?.text] }}
            textProps={textProps}
            transitionConfig={transitionConfig}
          />
        ),
        [
          RollingNumberMaskComponent,
          styles?.formattedValueSection,
          styles?.text,
          RollingNumberValueSectionComponent,
          RollingNumberDigitComponent,
          RollingNumberSymbolComponent,
          formattedValue,
          digitHeight,
          animatedColorStyle,
          textProps,
          transitionConfig,
        ],
      );

      const screenReaderOnlySection = useMemo(() => {
        const prefixString = typeof prefix === 'string' ? prefix : '';
        const suffixString = typeof suffix === 'string' ? suffix : '';
        const formattedWithPrefixSuffix = `${prefixString}${formatted}${suffixString}`;
        return (
          <Text
            allowFontScaling
            accessibilityLiveRegion={accessibilityLiveRegion}
            importantForAccessibility="yes"
            style={[baseStylesheet.screenReaderOnly, styles?.text]}
            {...textProps}
          >
            {`${accessibilityLabelPrefix ?? ''}
            ${accessibilityLabel ?? formattedWithPrefixSuffix}
            ${accessibilityLabelSuffix ?? ''}`}
          </Text>
        );
      }, [
        accessibilityLiveRegion,
        textProps,
        accessibilityLabelPrefix,
        accessibilityLabel,
        formatted,
        prefix,
        suffix,
        accessibilityLabelSuffix,
        styles?.text,
      ]);

      return (
        <HStack ref={ref} style={rootStyle} testID={testID}>
          {/* render invisible measured digits for measuring the digits height */}
          {invisibleMeasuredDigits}
          {/* render screen reader only section for accessibility */}
          {screenReaderOnlySection}
          <HStack
            accessibilityElementsHidden
            flexWrap="wrap"
            importantForAccessibility="no-hide-descendants"
            style={styles?.visibleContent}
          >
            {prefixSection}
            {formattedValue ? formattedValueValueSection : intlPartsValueSection}
            {suffixSection}
          </HStack>
        </HStack>
      );
    },
  ),
);
