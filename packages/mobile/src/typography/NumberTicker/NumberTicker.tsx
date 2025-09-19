import { forwardRef, memo, useMemo, useRef, useState } from 'react';
import {
  type LayoutChangeEvent,
  type LayoutRectangle,
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
import { Text, type TextProps } from '../Text';

import { DefaultNumberTickerDigit } from './DefaultNumberTickerDigit';
import { DefaultNumberTickerMask } from './DefaultNumberTickerMask';
import { DefaultNumberTickerNodeSection } from './DefaultNumberTickerNodeSection';
import { DefaultNumberTickerNumberSection } from './DefaultNumberTickerNumberSection';
import { DefaultNumberTickerSymbol } from './DefaultNumberTickerSymbol';
import { useColorPulse } from './useColorPulse';

export const DEFAULT_TRANSITION = {
  y: {
    duration: durations.moderate3,
    easing: Easing.bezier(...curves.global),
  },
  color: {
    duration: durations.slow4,
    easing: Easing.bezier(...curves.global),
  },
} as const;

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
    // Use color: transparent instead of opacity: 0 to avoid issues with screen readers
    color: 'transparent',
  },
});

export type LayoutMap = Record<string, LayoutRectangle>;

export type TimingTransition = {
  type?: 'timing';
} & WithTimingConfig;

export type SpringTransition = {
  type: 'spring';
} & WithSpringConfig;

export type TransitionConfig = {
  y?: TimingTransition | SpringTransition;
  color?: TimingTransition | SpringTransition;
};

// Subcomponent prop and component type declarations
export type NumberTickerMaskProps = HStackProps & {
  children?: React.ReactNode;
  ref?: React.Ref<View>;
};

export type NumberTickerNodeSectionProps = HStackProps & {
  children?: React.ReactNode;
  textProps?: TextProps;
  styles?: {
    root?: StyleProp<ViewStyle>;
    text?: AnimatedStyle<TextStyle>;
  };
  ref?: React.Ref<View>;
};

export type NumberTickerNumberSectionProps = HStackProps & {
  intlNumberParts: KeyedNumberPart[];
  invisibleDigitMeasurements: LayoutMap;
  measurementCompleted: boolean;
  formattedValue?: string;
  NumberDigitComponent?: NumberTickerDigitComponent;
  NumberSymbolComponent?: NumberTickerSymbolComponent;
  textProps?: TextProps;
  styles?: {
    root?: StyleProp<ViewStyle>;
    text?: AnimatedStyle<TextStyle>;
  };
  transitionConfig?: TransitionConfig;
  ref?: React.Ref<View>;
};

export type NumberTickerDigitProps = ViewProps & {
  value: number;
  invisibleDigitMeasurements: LayoutMap;
  initialValue?: number;
  textProps?: TextProps;
  styles?: {
    root?: StyleProp<ViewStyle>;
    text?: AnimatedStyle<TextStyle>;
  };
  transitionConfig?: TransitionConfig;
  ref?: React.Ref<View>;
};

export type NumberTickerSymbolProps = HStackProps & {
  value: string;
  textProps?: TextProps;
  styles?: {
    root?: StyleProp<ViewStyle>;
    text?: AnimatedStyle<TextStyle>;
  };
  ref?: React.Ref<View>;
};

// TODO: confirm ref definition
export type NumberTickerMaskComponent = React.FC<NumberTickerMaskProps>;

export type NumberTickerNodeSectionComponent = React.FC<NumberTickerNodeSectionProps>;

export type NumberTickerNumberSectionComponent = React.FC<NumberTickerNumberSectionProps>;

export type NumberTickerDigitComponent = React.FC<NumberTickerDigitProps>;

export type NumberTickerSymbolComponent = React.FC<NumberTickerSymbolProps>;

export type NumberTickerBaseProps = SharedProps &
  TextProps & {
    /**
     * Number to display
     */
    value: number | bigint;
    /**
     * Format configuration to apply to the value. Uses the JS's Intl.NumberFormat API.
     * Scientific and engineering notation are not supported.
     */
    format?: Omit<Intl.NumberFormatOptions, 'notation'> & {
      notation?: Exclude<Intl.NumberFormatOptions['notation'], 'scientific' | 'engineering'>;
    };
    /**
     * Formatted number to display. If provided, we will render this instead of using value and format.
     * We will still need to use value to determine increase or decrease.
     */
    formattedValue?: string;
    /**
     * Prefix to display before the number.
     */
    prefix?: React.ReactNode;
    /**
     * Suffix to display after the number.
     */
    suffix?: React.ReactNode;
    /**
     * Override mask component (container around the animated number sections)
     */
    NumberTickerMaskComponent?: NumberTickerMaskComponent;
    /**
     * Override node section component (wrapping prefix/suffix ReactNodes)
     */
    NumberTickerNodeSectionComponent?: NumberTickerNodeSectionComponent;
    /**
     * Override number section component (renders Intl intlNumberParts or formatted override)
     */
    NumberTickerNumberSectionComponent?: NumberTickerNumberSectionComponent;
    /**
     * Override number digit component (per-digit scroller)
     */
    NumberTickerDigitComponent?: NumberTickerDigitComponent;
    /**
     * Override number symbol component (literal/separators/subscripts)
     */
    NumberTickerSymbolComponent?: NumberTickerSymbolComponent;
    /**
     * Locale to use for formatting. If not provided, will use the locale provided in LocaleProvider.
     */
    locale?: string;
    /**
     * Base text color token.
     * When {@link colorPulseOnUpdate} is true, the color will briefly pulse to a
     * positive/negative mid color based on numeric change before returning to this base color.
     * @default 'fg'
     */
    color?: ThemeVars.Color;
    /**
     * Enable color pulse on numeric changes (positive/negative).
     */
    colorPulseOnUpdate?: boolean;
    /**
     * Color to use for positive numeric changes.
     * @default 'fgPositive'
     */
    positivePulseColor?: ThemeVars.Color;
    /**
     * Color to use for negative numeric changes.
     * @default 'fgNegative'
     */
    negativePulseColor?: ThemeVars.Color;
    /**
     * Enable subscript notation for leading zeros in the fractional part.
     * Example: 0.00009 => 0.0₄9
     */
    enableSubscriptNotation?: boolean;
    /**
     * Transition config for the component.
     * If type = 'timing', it follows the reanimated WithTimingConfig.
     * If type = 'spring', it follows the reanimated WithSpringConfig.
     */
    transition?: TransitionConfig;
    /**
     * Accessibility label to display for screen readers.
     */
    accessibilityLabel?: string;
    /**
     * Accessibility prefix to announce before.
     * @default ''
     */
    accessibilityLabelPrefix?: string;
    /**
     * Accessibility suffix to announce after.
     * @default ''
     */
    accessibilityLabelSuffix?: string;
    /**
     * accessibilityLiveRegion for screen readers (Android).
     * @default 'polite'
     */
    accessibilityLiveRegion?: React.ComponentProps<typeof Text>['accessibilityLiveRegion'];
    /**
     * Enable tabular numbers.
     * Currently non tabularNumbers are not supported on mobile. All the digits will be the same width.
     * @default true
     */
    tabularNumbers?: boolean;
  };

export type NumberTickerProps = NumberTickerBaseProps & {
  /**
   * Custom styles for the component.
   */
  styles?: {
    root?: StyleProp<ViewStyle>;
    visibleContent?: StyleProp<ViewStyle>;
    formattedNumberSection?: StyleProp<ViewStyle>;
    prefix?: StyleProp<ViewStyle>;
    suffix?: StyleProp<ViewStyle>;
    /**
     * The prefix generated by Intl.NumberFormat, for example, the "$" in "$1,000".
     */
    i18nPrefix?: StyleProp<ViewStyle>;
    /**
     * The suffix generated by Intl.NumberFormat, for example, the "K" in "100K".
     */
    i18nSuffix?: StyleProp<ViewStyle>;
    integer?: StyleProp<ViewStyle>;
    fraction?: StyleProp<ViewStyle>;
  };
};

export const NumberTicker = memo(
  forwardRef<View, NumberTickerProps>(
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
        transition = DEFAULT_TRANSITION,
        formattedValue,
        accessibilityLabel,
        accessibilityLabelPrefix = '',
        accessibilityLabelSuffix = '',
        NumberTickerMaskComponent = DefaultNumberTickerMask,
        NumberTickerNodeSectionComponent = DefaultNumberTickerNodeSection,
        NumberTickerNumberSectionComponent = DefaultNumberTickerNumberSection,
        NumberTickerDigitComponent = DefaultNumberTickerDigit,
        NumberTickerSymbolComponent = DefaultNumberTickerSymbol,
        ...restTextProps
      }: NumberTickerProps,
      ref,
    ) => {
      const { locale: defaultLocale } = useLocale();
      const locale = localeProp ?? defaultLocale;
      const invisibleDigitMeasurements = useRef<LayoutMap>({});
      const [measurementCompleted, setMeasurementCompleted] = useState(false);

      const handleMeasure = (e: LayoutChangeEvent, v: number) => {
        if (!invisibleDigitMeasurements.current) return;
        const { layout } = e.nativeEvent;
        invisibleDigitMeasurements.current[v] = layout;
        if (Object.keys(invisibleDigitMeasurements.current).length === 10) {
          setMeasurementCompleted(true);
        }
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
        () => ({ ...DEFAULT_TRANSITION, ...transition }),
        [transition],
      );

      const animatedColorStyle = useColorPulse({
        value,
        defaultColor: colorProp,
        colorPulseOnUpdate: !!colorPulseOnUpdate,
        positivePulseColor,
        negativePulseColor,
        transitionConfig,
      });

      const intlNumberFormatter = useMemo(
        () =>
          new IntlNumberFormat({
            value,
            format,
            locale,
          }),
        [value, format, locale],
      );

      const rootStyle = useMemo(() => [style, styles?.root], [style, styles?.root]);

      const invisibleMeasuredDigits = useMemo(
        () =>
          digits.map((digit) => (
            <Text
              key={digit}
              accessibilityElementsHidden
              accessibilityLabel=""
              importantForAccessibility="no-hide-descendants"
              onLayout={(event: LayoutChangeEvent) => handleMeasure(event, digit)}
              style={baseStylesheet.hide}
              {...textProps}
            >
              {digit}
            </Text>
          )),
        [textProps],
      );

      const prefixSection = useMemo(
        () => (
          // prefix from props
          <NumberTickerNodeSectionComponent
            justifyContent="flex-end"
            style={styles?.prefix}
            styles={{ text: animatedColorStyle }}
            textProps={textProps}
          >
            {prefix}
          </NumberTickerNodeSectionComponent>
        ),
        [NumberTickerNodeSectionComponent, animatedColorStyle, styles?.prefix, textProps, prefix],
      );

      const suffixSection = useMemo(
        () => (
          // suffix from props
          <NumberTickerNodeSectionComponent
            justifyContent="flex-start"
            style={styles?.suffix}
            styles={{ text: animatedColorStyle }}
            textProps={textProps}
          >
            {suffix}
          </NumberTickerNodeSectionComponent>
        ),
        [NumberTickerNodeSectionComponent, animatedColorStyle, styles?.suffix, textProps, suffix],
      );

      const intlPartsNumberSection = useMemo(() => {
        const { pre, integer, fraction, post } =
          intlNumberFormatter.formatToParts(enableSubscriptNotation);
        return (
          <NumberTickerMaskComponent style={styles?.formattedNumberSection}>
            {/* Prefix generated by Intl.NumberFormat */}
            <NumberTickerNumberSectionComponent
              NumberDigitComponent={NumberTickerDigitComponent}
              NumberSymbolComponent={NumberTickerSymbolComponent}
              intlNumberParts={pre}
              invisibleDigitMeasurements={invisibleDigitMeasurements.current}
              justifyContent="flex-end"
              measurementCompleted={measurementCompleted}
              style={styles?.i18nPrefix}
              styles={{ text: animatedColorStyle }}
              textProps={textProps}
              transitionConfig={transitionConfig}
            />
            <NumberTickerNumberSectionComponent
              NumberDigitComponent={NumberTickerDigitComponent}
              NumberSymbolComponent={NumberTickerSymbolComponent}
              intlNumberParts={integer}
              invisibleDigitMeasurements={invisibleDigitMeasurements.current}
              justifyContent="flex-end"
              measurementCompleted={measurementCompleted}
              style={styles?.integer}
              styles={{ text: animatedColorStyle }}
              textProps={textProps}
              transitionConfig={transitionConfig}
            />
            <NumberTickerNumberSectionComponent
              NumberDigitComponent={NumberTickerDigitComponent}
              NumberSymbolComponent={NumberTickerSymbolComponent}
              intlNumberParts={fraction}
              invisibleDigitMeasurements={invisibleDigitMeasurements.current}
              justifyContent="flex-start"
              measurementCompleted={measurementCompleted}
              style={styles?.fraction}
              styles={{ text: animatedColorStyle }}
              textProps={textProps}
              transitionConfig={transitionConfig}
            />
            {/* Suffix generated by Intl.NumberFormat */}
            <NumberTickerNumberSectionComponent
              NumberDigitComponent={NumberTickerDigitComponent}
              NumberSymbolComponent={NumberTickerSymbolComponent}
              intlNumberParts={post}
              invisibleDigitMeasurements={invisibleDigitMeasurements.current}
              justifyContent="flex-start"
              measurementCompleted={measurementCompleted}
              style={styles?.i18nSuffix}
              styles={{ text: animatedColorStyle }}
              textProps={textProps}
              transitionConfig={transitionConfig}
            />
          </NumberTickerMaskComponent>
        );
      }, [
        intlNumberFormatter,
        enableSubscriptNotation,
        NumberTickerMaskComponent,
        styles?.formattedNumberSection,
        styles?.i18nPrefix,
        styles?.integer,
        styles?.fraction,
        styles?.i18nSuffix,
        NumberTickerNumberSectionComponent,
        NumberTickerDigitComponent,
        NumberTickerSymbolComponent,
        measurementCompleted,
        animatedColorStyle,
        textProps,
        transitionConfig,
      ]);

      const formattedValueNumberSection = useMemo(
        () => (
          <NumberTickerMaskComponent style={styles?.formattedNumberSection}>
            <NumberTickerNumberSectionComponent
              NumberDigitComponent={NumberTickerDigitComponent}
              NumberSymbolComponent={NumberTickerSymbolComponent}
              formattedValue={formattedValue}
              intlNumberParts={[]}
              invisibleDigitMeasurements={invisibleDigitMeasurements.current}
              justifyContent="flex-start"
              measurementCompleted={measurementCompleted}
              styles={{ text: animatedColorStyle }}
              textProps={textProps}
              transitionConfig={transitionConfig}
            />
          </NumberTickerMaskComponent>
        ),
        [
          NumberTickerMaskComponent,
          styles?.formattedNumberSection,
          NumberTickerNumberSectionComponent,
          NumberTickerDigitComponent,
          NumberTickerSymbolComponent,
          formattedValue,
          measurementCompleted,
          animatedColorStyle,
          textProps,
          transitionConfig,
        ],
      );

      const screenReaderOnlySection = useMemo(
        () => (
          <Text
            allowFontScaling
            accessibilityLiveRegion={accessibilityLiveRegion}
            importantForAccessibility="yes"
            style={baseStylesheet.screenReaderOnly}
            {...textProps}
          >
            {`${accessibilityLabelPrefix}${
              accessibilityLabel ??
              formattedValue ??
              intlNumberFormatter.format({
                // only include prefix/suffix if they are strings
                prefix: typeof prefix === 'string' ? prefix : undefined,
                suffix: typeof suffix === 'string' ? suffix : undefined,
              })
            }${accessibilityLabelSuffix}`}
          </Text>
        ),
        [
          accessibilityLiveRegion,
          textProps,
          accessibilityLabelPrefix,
          accessibilityLabel,
          formattedValue,
          intlNumberFormatter,
          prefix,
          suffix,
          accessibilityLabelSuffix,
        ],
      );

      return (
        <HStack ref={ref} alignSelf="flex-start" style={rootStyle} testID={testID}>
          {invisibleMeasuredDigits}
          {screenReaderOnlySection}
          <HStack
            accessibilityElementsHidden
            flexWrap="wrap"
            importantForAccessibility="no-hide-descendants"
            style={styles?.visibleContent}
          >
            {prefixSection}
            {formattedValue ? formattedValueNumberSection : intlPartsNumberSection}
            {suffixSection}
          </HStack>
        </HStack>
      );
    },
  ),
);
