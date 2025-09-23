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

import { DefaultRollingNumberDigit } from './DefaultRollingNumberDigit';
import { DefaultRollingNumberMask } from './DefaultRollingNumberMask';
import { DefaultRollingNumberNodeSection } from './DefaultRollingNumberNodeSection';
import { DefaultRollingNumberNumberSection } from './DefaultRollingNumberNumberSection';
import { DefaultRollingNumberSymbol } from './DefaultRollingNumberSymbol';
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
export type RollingNumberMaskProps = HStackProps & {
  children?: React.ReactNode;
  ref?: React.Ref<View>;
};

export type RollingNumberNodeSectionProps = HStackProps & {
  children?: React.ReactNode;
  textProps?: TextProps;
  styles?: {
    root?: StyleProp<ViewStyle>;
    text?:
      | AnimatedStyle<TextStyle>
      | StyleProp<TextStyle>
      | (AnimatedStyle<TextStyle> | StyleProp<TextStyle>)[];
  };
  ref?: React.Ref<View>;
};

export type RollingNumberNumberSectionProps = HStackProps & {
  intlNumberParts: KeyedNumberPart[];
  invisibleDigitMeasurements: LayoutMap;
  measurementCompleted: boolean;
  formattedValue?: string;
  RollingNumberDigitComponent?: RollingNumberDigitComponent;
  RollingNumberSymbolComponent?: RollingNumberSymbolComponent;
  RollingNumberMaskComponent?: RollingNumberMaskComponent;
  textProps?: TextProps;
  styles?: {
    root?: StyleProp<ViewStyle>;
    text?:
      | AnimatedStyle<TextStyle>
      | StyleProp<TextStyle>
      | (AnimatedStyle<TextStyle> | StyleProp<TextStyle>)[];
  };
  transitionConfig?: TransitionConfig;
  ref?: React.Ref<View>;
};

export type RollingNumberDigitProps = ViewProps & {
  value: number;
  invisibleDigitMeasurements: LayoutMap;
  initialValue?: number;
  textProps?: TextProps;
  styles?: {
    root?: StyleProp<ViewStyle>;
    text?:
      | AnimatedStyle<TextStyle>
      | StyleProp<TextStyle>
      | (AnimatedStyle<TextStyle> | StyleProp<TextStyle>)[];
  };
  transitionConfig?: TransitionConfig;
  ref?: React.Ref<View>;
  RollingNumberMaskComponent?: RollingNumberMaskComponent;
};

export type RollingNumberSymbolProps = HStackProps & {
  value: string;
  textProps?: TextProps;
  styles?: {
    root?: StyleProp<ViewStyle>;
    text?:
      | AnimatedStyle<TextStyle>
      | StyleProp<TextStyle>
      | (AnimatedStyle<TextStyle> | StyleProp<TextStyle>)[];
  };
  ref?: React.Ref<View>;
};

// TODO: confirm ref definition
export type RollingNumberMaskComponent = React.FC<RollingNumberMaskProps>;

export type RollingNumberNodeSectionComponent = React.FC<RollingNumberNodeSectionProps>;

export type RollingNumberNumberSectionComponent = React.FC<RollingNumberNumberSectionProps>;

export type RollingNumberDigitComponent = React.FC<RollingNumberDigitProps>;

export type RollingNumberSymbolComponent = React.FC<RollingNumberSymbolProps>;

export type RollingNumberBaseProps = SharedProps &
  TextProps & {
    /**
     * Number to display
     */
    value: number;
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
    RollingNumberMaskComponent?: RollingNumberMaskComponent;
    /**
     * Override node section component (wrapping prefix/suffix ReactNodes)
     */
    RollingNumberNodeSectionComponent?: RollingNumberNodeSectionComponent;
    /**
     * Override number section component (renders Intl intlNumberParts or formatted override)
     */
    RollingNumberNumberSectionComponent?: RollingNumberNumberSectionComponent;
    /**
     * Override number digit component (per-digit scroller)
     */
    RollingNumberDigitComponent?: RollingNumberDigitComponent;
    /**
     * Override number symbol component (literal/separators/subscripts)
     */
    RollingNumberSymbolComponent?: RollingNumberSymbolComponent;
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

export type RollingNumberProps = RollingNumberBaseProps & {
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
    /**
     * Custom styles for the text (symbol/digit/prefix/suffix).
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
        transition = DEFAULT_TRANSITION,
        formattedValue,
        accessibilityLabel,
        accessibilityLabelPrefix = '',
        accessibilityLabelSuffix = '',
        RollingNumberMaskComponent = DefaultRollingNumberMask,
        RollingNumberNodeSectionComponent = DefaultRollingNumberNodeSection,
        RollingNumberNumberSectionComponent = DefaultRollingNumberNumberSection,
        RollingNumberDigitComponent = DefaultRollingNumberDigit,
        RollingNumberSymbolComponent = DefaultRollingNumberSymbol,
        ...restTextProps
      }: RollingNumberProps,
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
        () =>
          digits.map((digit) => (
            <Text
              key={digit}
              accessibilityElementsHidden
              accessibilityLabel=""
              importantForAccessibility="no-hide-descendants"
              onLayout={(event: LayoutChangeEvent) => handleMeasure(event, digit)}
              style={[baseStylesheet.hide, styles?.text]}
              {...textProps}
            >
              {digit}
            </Text>
          )),
        [textProps, styles?.text],
      );

      const prefixSection = useMemo(
        () => (
          // prefix from props
          <RollingNumberNodeSectionComponent
            justifyContent="flex-end"
            style={styles?.prefix}
            styles={{ text: [animatedColorStyle, styles?.text] }}
            textProps={textProps}
          >
            {prefix}
          </RollingNumberNodeSectionComponent>
        ),
        [
          RollingNumberNodeSectionComponent,
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
          <RollingNumberNodeSectionComponent
            justifyContent="flex-start"
            style={styles?.suffix}
            styles={{ text: [animatedColorStyle, styles?.text] }}
            textProps={textProps}
          >
            {suffix}
          </RollingNumberNodeSectionComponent>
        ),
        [
          RollingNumberNodeSectionComponent,
          animatedColorStyle,
          styles?.suffix,
          textProps,
          suffix,
          styles?.text,
        ],
      );

      const intlPartsNumberSection = useMemo(() => {
        const { pre, integer, fraction, post } = intlNumberFormatter.formatToParts({
          enableSubscriptNotation,
        });
        return (
          <HStack style={styles?.formattedNumberSection}>
            {/* Prefix generated by Intl.NumberFormat */}
            <RollingNumberNumberSectionComponent
              RollingNumberDigitComponent={RollingNumberDigitComponent}
              RollingNumberMaskComponent={RollingNumberMaskComponent}
              RollingNumberSymbolComponent={RollingNumberSymbolComponent}
              intlNumberParts={pre}
              invisibleDigitMeasurements={invisibleDigitMeasurements.current}
              justifyContent="flex-end"
              measurementCompleted={measurementCompleted}
              style={styles?.i18nPrefix}
              styles={{ text: [animatedColorStyle, styles?.text] }}
              textProps={textProps}
              transitionConfig={transitionConfig}
            />
            <RollingNumberNumberSectionComponent
              RollingNumberDigitComponent={RollingNumberDigitComponent}
              RollingNumberMaskComponent={RollingNumberMaskComponent}
              RollingNumberSymbolComponent={RollingNumberSymbolComponent}
              intlNumberParts={integer}
              invisibleDigitMeasurements={invisibleDigitMeasurements.current}
              justifyContent="flex-end"
              measurementCompleted={measurementCompleted}
              style={styles?.integer}
              styles={{ text: [animatedColorStyle, styles?.text] }}
              textProps={textProps}
              transitionConfig={transitionConfig}
            />
            <RollingNumberNumberSectionComponent
              RollingNumberDigitComponent={RollingNumberDigitComponent}
              RollingNumberMaskComponent={RollingNumberMaskComponent}
              RollingNumberSymbolComponent={RollingNumberSymbolComponent}
              intlNumberParts={fraction}
              invisibleDigitMeasurements={invisibleDigitMeasurements.current}
              justifyContent="flex-start"
              measurementCompleted={measurementCompleted}
              style={styles?.fraction}
              styles={{ text: [animatedColorStyle, styles?.text] }}
              textProps={textProps}
              transitionConfig={transitionConfig}
            />
            {/* Suffix generated by Intl.NumberFormat */}
            <RollingNumberNumberSectionComponent
              RollingNumberDigitComponent={RollingNumberDigitComponent}
              RollingNumberMaskComponent={RollingNumberMaskComponent}
              RollingNumberSymbolComponent={RollingNumberSymbolComponent}
              intlNumberParts={post}
              invisibleDigitMeasurements={invisibleDigitMeasurements.current}
              justifyContent="flex-start"
              measurementCompleted={measurementCompleted}
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
        styles?.formattedNumberSection,
        styles?.i18nPrefix,
        styles?.text,
        styles?.integer,
        styles?.fraction,
        styles?.i18nSuffix,
        RollingNumberNumberSectionComponent,
        RollingNumberDigitComponent,
        RollingNumberMaskComponent,
        RollingNumberSymbolComponent,
        measurementCompleted,
        animatedColorStyle,
        textProps,
        transitionConfig,
      ]);

      const formattedValueNumberSection = useMemo(
        () => (
          <RollingNumberNumberSectionComponent
            RollingNumberDigitComponent={RollingNumberDigitComponent}
            RollingNumberMaskComponent={RollingNumberMaskComponent}
            RollingNumberSymbolComponent={RollingNumberSymbolComponent}
            formattedValue={formattedValue}
            intlNumberParts={[]}
            invisibleDigitMeasurements={invisibleDigitMeasurements.current}
            justifyContent="flex-start"
            measurementCompleted={measurementCompleted}
            style={styles?.formattedNumberSection}
            styles={{ text: [animatedColorStyle, styles?.text] }}
            textProps={textProps}
            transitionConfig={transitionConfig}
          />
        ),
        [
          RollingNumberMaskComponent,
          styles?.formattedNumberSection,
          styles?.text,
          RollingNumberNumberSectionComponent,
          RollingNumberDigitComponent,
          RollingNumberSymbolComponent,
          formattedValue,
          measurementCompleted,
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
            {`${accessibilityLabelPrefix}
            ${accessibilityLabel ?? formattedWithPrefixSuffix}
            ${accessibilityLabelSuffix}`}
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
