import { forwardRef, memo, useMemo } from 'react';
import type { ThemeVars } from '@coinbase/cds-common/core/theme';
import { curves, durations } from '@coinbase/cds-common/motion/tokens';
import {
  IntlNumberFormat,
  type KeyedNumberPart,
} from '@coinbase/cds-common/numbers/IntlNumberFormat';
import { useLocale } from '@coinbase/cds-common/system/LocaleProvider';
import type { SharedProps } from '@coinbase/cds-common/types/SharedProps';
import { css } from '@linaria/core';
import { m, type Transition } from 'framer-motion';

import type { Polymorphic } from '../../core/polymorphism';
import { cx } from '../../cx';
import { HStack } from '../../layout/HStack';
import {
  Text,
  type TextBaseProps,
  type TextDefaultElement,
  type TextProps,
} from '../../typography/Text';

import { DefaultRollingNumberAffixSection } from './DefaultRollingNumberAffixSection';
import { DefaultRollingNumberDigit } from './DefaultRollingNumberDigit';
import { DefaultRollingNumberMask } from './DefaultRollingNumberMask';
import { DefaultRollingNumberSymbol } from './DefaultRollingNumberSymbol';
import { DefaultRollingNumberValueSection } from './DefaultRollingNumberValueSection';
import { useColorPulse } from './useColorPulse';

const tickerCss = css`
  display: inline-flex;
  white-space: nowrap;
`;

const tickerContainerCss = css`
  display: inline-flex;
  width: fit-content;
`;

const screenReaderOnlyCss = css`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
  border: 0;
`;

type RollingNumberTransitionConfig = {
  y?: Transition;
  color?: Transition;
};

export const defaultTransitionConfig = {
  y: { duration: durations.moderate3 / 1000, ease: curves.global },
  color: { duration: durations.slow4 / 1000, ease: curves.global },
} as const satisfies RollingNumberTransitionConfig;

// Subcomponent prop and component type declarations
export type RollingNumberMaskProps = TextProps<TextDefaultElement> & {
  children?: React.ReactNode;
  ref?: React.Ref<HTMLSpanElement>;
};

export type RollingNumberAffixSectionProps = TextProps<TextDefaultElement> & {
  children?: React.ReactNode;
  ref?: React.Ref<HTMLSpanElement>;
  styles?: {
    root?: React.CSSProperties;
    text?: React.CSSProperties;
  };
  classNames?: {
    root?: string;
    text?: string;
  };
};

export type RollingNumberValueSectionProps = TextProps<TextDefaultElement> & {
  intlNumberParts: KeyedNumberPart[];
  RollingNumberDigitComponent?: RollingNumberDigitComponent;
  RollingNumberSymbolComponent?: RollingNumberSymbolComponent;
  RollingNumberMaskComponent?: RollingNumberMaskComponent;
  formattedValue?: string;
  transitionConfig?: RollingNumberTransitionConfig;
  styles?: {
    root?: React.CSSProperties;
    text?: React.CSSProperties;
  };
  classNames?: {
    root?: string;
    text?: string;
  };
  ref?: React.Ref<HTMLSpanElement>;
};

export type RollingNumberDigitProps = TextProps<TextDefaultElement> & {
  value: number;
  initialValue?: number;
  transitionConfig?: RollingNumberTransitionConfig;
  RollingNumberMaskComponent?: RollingNumberMaskComponent;
  styles?: {
    root?: React.CSSProperties;
    text?: React.CSSProperties;
  };
  classNames?: {
    root?: string;
    text?: string;
  };
  ref?: React.Ref<HTMLSpanElement>;
};

export type RollingNumberSymbolProps = TextProps<TextDefaultElement> & {
  value: string;
  styles?: {
    root?: React.CSSProperties;
    text?: React.CSSProperties;
  };
  classNames?: {
    root?: string;
    text?: string;
  };
  ref?: React.Ref<HTMLSpanElement>;
};

export type RollingNumberMaskComponent = React.FC<RollingNumberMaskProps>;

export type RollingNumberAffixSectionComponent = React.FC<RollingNumberAffixSectionProps>;

export type RollingNumberDigitComponent = React.FC<RollingNumberDigitProps>;

export type RollingNumberSymbolComponent = React.FC<RollingNumberSymbolProps>;

export type RollingNumberValueSectionComponent = React.FC<RollingNumberValueSectionProps>;

export type RollingNumberBaseProps = SharedProps &
  TextBaseProps & {
    /**
     * Number to display
     */
    value: number;
    /**
     * Format configuration to apply to the value. Uses the JS's Intl.NumberFormat API.
     * Scientific and engineering notation are not supported.
     */
    format?: Omit<Intl.NumberFormatOptions, 'notation'> & {
      notation?: Extract<Intl.NumberFormatOptions['notation'], 'standard' | 'compact'>;
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
     * Override mask component
     */
    RollingNumberMaskComponent?: RollingNumberMaskComponent;
    /**
     * Override node section component
     */
    RollingNumberAffixSectionComponent?: RollingNumberAffixSectionComponent;
    /**
     * Override number section component
     */
    RollingNumberValueSectionComponent?: RollingNumberValueSectionComponent;
    /**
     * Override number digit component
     */
    RollingNumberDigitComponent?: RollingNumberDigitComponent;
    /**
     * Override number symbol component
     */
    RollingNumberSymbolComponent?: RollingNumberSymbolComponent;
    /**
     * Locale to use for formatting. If not provided, will use the locale provided in LocaleProvider.
     */
    locale?: Intl.LocalesArgument;
    /**
     * Base text color token.
     * When {@link colorPulseOnUpdate} is true, the color will briefly pulse to a
     * positive/negative mid color based on numeric change before returning to this base color.
     * @default 'fg'
     */
    color?: ThemeVars.Color;
    /**
     * Enable color pulse on numeric changes (positive/negative).
     * @default false
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
     * framer-motion transition config.
     * Only allow per-property transitions like { y: { duration: 1 }, color: { duration: 1 } } instead of {{ duration: 1 }}
     * Only allow customization of 'y' and 'color' properties.
     */
    transition?: RollingNumberTransitionConfig;
    /**
     * Accessibility prefix to announce before.
     */
    accessibilityLabelPrefix?: string;
    /**
     * Accessibility suffix to announce after.
     */
    accessibilityLabelSuffix?: string;
    /**
     * Aria-live attribute value.
     * @default 'polite'
     */
    ariaLive?: React.AriaAttributes['aria-live'];
    /**
     * Enable tabular numbers.
     * @default true
     */
    tabularNumbers?: boolean;
  };

export type RollingNumberProps<AsComponent extends React.ElementType> = Polymorphic.Props<
  AsComponent,
  RollingNumberBaseProps & {
    /**
     * Custom class names for the component.
     */
    classNames?: {
      root?: string;
      visibleContent?: string;
      formattedValueSection?: string;
      prefix?: string;
      suffix?: string;
      /**
       * The prefix generated by Intl.NumberFormat, for example, the "$" in "$1,000".
       */
      i18nPrefix?: string;
      /**
       * The suffix generated by Intl.NumberFormat, for example, the "K" in "100K".
       */
      i18nSuffix?: string;
      integer?: string;
      fraction?: string;
      /**
       * The text to display.
       */
      text?: string;
    };
    /**
     * Custom styles for the component.
     */
    styles?: {
      root?: React.CSSProperties;
      visibleContent?: React.CSSProperties;
      formattedValueSection?: React.CSSProperties;
      prefix?: React.CSSProperties;
      suffix?: React.CSSProperties;
      /**
       * The prefix generated by Intl.NumberFormat, for example, the "$" in "$1,000".
       */
      i18nPrefix?: React.CSSProperties;
      /**
       * The suffix generated by Intl.NumberFormat, for example, the "K" in "100K".
       */
      i18nSuffix?: React.CSSProperties;
      integer?: React.CSSProperties;
      fraction?: React.CSSProperties;
      /**
       * The text to display.
       */
      text?: React.CSSProperties;
    };
  }
>;

export const rollingNumberDefaultElement = 'span';
export type RollingNumberDefaultElement = typeof rollingNumberDefaultElement;

type RollingNumberComponent = (<
  AsComponent extends React.ElementType = RollingNumberDefaultElement,
>(
  props: RollingNumberProps<AsComponent>,
) => Polymorphic.ReactReturn) &
  Polymorphic.ReactNamed;

export const RollingNumber: RollingNumberComponent = memo(
  forwardRef<React.ReactElement<RollingNumberBaseProps>, RollingNumberBaseProps>(
    <AsComponent extends React.ElementType>(
      {
        as,
        value,
        transition,
        color = 'fg',
        colorPulseOnUpdate,
        positivePulseColor = 'fgPositive',
        negativePulseColor = 'fgNegative',
        font = 'inherit',
        fontFamily = font,
        fontSize = font,
        fontWeight = font,
        // default to fontSize since lineHeight changes depending on the fontSize
        lineHeight = fontSize,
        locale: localeProp,
        format,
        formattedValue,
        style,
        ariaLive = 'polite',
        prefix,
        suffix,
        classNames,
        styles,
        enableSubscriptNotation,
        RollingNumberMaskComponent = DefaultRollingNumberMask,
        RollingNumberAffixSectionComponent = DefaultRollingNumberAffixSection,
        RollingNumberValueSectionComponent = DefaultRollingNumberValueSection,
        RollingNumberDigitComponent = DefaultRollingNumberDigit,
        RollingNumberSymbolComponent = DefaultRollingNumberSymbol,
        accessibilityLabel,
        tabularNumbers = true,
        accessibilityLabelPrefix,
        accessibilityLabelSuffix,
        ...props
      }: RollingNumberProps<AsComponent>,
      ref: Polymorphic.Ref<AsComponent>,
    ) => {
      const Component = (as ?? rollingNumberDefaultElement) satisfies React.ElementType;
      const { locale: defaultLocale } = useLocale();
      const locale = localeProp ?? defaultLocale;

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

      const colorControls = useColorPulse({
        value,
        defaultColor: color,
        colorPulseOnUpdate: !!colorPulseOnUpdate,
        positivePulseColor,
        negativePulseColor,
        formatted,
      });

      const rootStyle = useMemo(
        () => ({
          ...style,
          ...styles?.root,
        }),
        [style, styles?.root],
      );

      const prefixSection = useMemo(
        () => (
          /* Prefix prop will be displayed here before the prefix generated by Intl.NumberFormat. */
          <RollingNumberAffixSectionComponent
            className={classNames?.prefix}
            classNames={{ text: classNames?.text }}
            justifyContent="flex-end"
            style={styles?.prefix}
            styles={{ text: styles?.text }}
          >
            {prefix}
          </RollingNumberAffixSectionComponent>
        ),

        [
          RollingNumberAffixSectionComponent,
          classNames?.prefix,
          classNames?.text,
          styles?.prefix,
          styles?.text,
          prefix,
        ],
      );

      const suffixSection = useMemo(
        () => (
          /* Suffix prop will be displayed here after the suffix generated by Intl.NumberFormat. */
          <RollingNumberAffixSectionComponent
            className={classNames?.suffix}
            classNames={{ text: classNames?.text }}
            justifyContent="flex-start"
            style={styles?.suffix}
            styles={{ text: styles?.text }}
          >
            {suffix}
          </RollingNumberAffixSectionComponent>
        ),

        [
          RollingNumberAffixSectionComponent,
          classNames?.suffix,
          classNames?.text,
          styles?.suffix,
          styles?.text,
          suffix,
        ],
      );

      const intlPartsValueSection = useMemo(() => {
        const { pre, integer, fraction, post } = intlNumberFormatter.formatToParts({
          enableSubscriptNotation,
        });
        return (
          <HStack
            className={classNames?.formattedValueSection}
            display="inline-flex"
            style={styles?.formattedValueSection}
          >
            {/* Prefix generated by Intl.NumberFormat is displayed here. */}
            <RollingNumberValueSectionComponent
              RollingNumberDigitComponent={RollingNumberDigitComponent}
              RollingNumberMaskComponent={RollingNumberMaskComponent}
              RollingNumberSymbolComponent={RollingNumberSymbolComponent}
              className={classNames?.i18nPrefix}
              classNames={{ text: classNames?.text }}
              intlNumberParts={pre}
              justifyContent="flex-end"
              style={styles?.i18nPrefix}
              styles={{ text: styles?.text }}
              transitionConfig={transitionConfig}
            />
            <RollingNumberValueSectionComponent
              RollingNumberDigitComponent={RollingNumberDigitComponent}
              RollingNumberMaskComponent={RollingNumberMaskComponent}
              RollingNumberSymbolComponent={RollingNumberSymbolComponent}
              className={classNames?.integer}
              classNames={{ text: classNames?.text }}
              intlNumberParts={integer}
              justifyContent="flex-end"
              style={styles?.integer}
              styles={{ text: styles?.text }}
              transitionConfig={transitionConfig}
            />
            <RollingNumberValueSectionComponent
              RollingNumberDigitComponent={RollingNumberDigitComponent}
              RollingNumberMaskComponent={RollingNumberMaskComponent}
              RollingNumberSymbolComponent={RollingNumberSymbolComponent}
              className={classNames?.fraction}
              classNames={{ text: classNames?.text }}
              intlNumberParts={fraction}
              justifyContent="flex-start"
              style={styles?.fraction}
              styles={{ text: styles?.text }}
              transitionConfig={transitionConfig}
            />
            {/* Suffix generated by Intl.NumberFormat is displayed here. */}
            <RollingNumberValueSectionComponent
              RollingNumberDigitComponent={RollingNumberDigitComponent}
              RollingNumberMaskComponent={RollingNumberMaskComponent}
              RollingNumberSymbolComponent={RollingNumberSymbolComponent}
              className={classNames?.i18nSuffix}
              classNames={{ text: classNames?.text }}
              intlNumberParts={post}
              justifyContent="flex-start"
              style={styles?.i18nSuffix}
              styles={{ text: styles?.text }}
              transitionConfig={transitionConfig}
            />
          </HStack>
        );
      }, [
        intlNumberFormatter,
        enableSubscriptNotation,
        classNames?.formattedValueSection,
        classNames?.i18nPrefix,
        classNames?.integer,
        classNames?.fraction,
        classNames?.i18nSuffix,
        styles?.formattedValueSection,
        styles?.i18nPrefix,
        styles?.integer,
        styles?.fraction,
        styles?.i18nSuffix,
        RollingNumberValueSectionComponent,
        RollingNumberMaskComponent,
        RollingNumberDigitComponent,
        RollingNumberSymbolComponent,
        transitionConfig,
        styles?.text,
        classNames?.text,
      ]);

      const formattedValueValueSection = useMemo(
        () => (
          <RollingNumberValueSectionComponent
            RollingNumberDigitComponent={RollingNumberDigitComponent}
            RollingNumberMaskComponent={RollingNumberMaskComponent}
            RollingNumberSymbolComponent={RollingNumberSymbolComponent}
            className={classNames?.formattedValueSection}
            classNames={{ text: classNames?.text }}
            formattedValue={formattedValue}
            intlNumberParts={[]}
            justifyContent="flex-start"
            style={styles?.formattedValueSection}
            styles={{ text: styles?.text }}
            transitionConfig={transitionConfig}
          />
        ),
        [
          classNames?.formattedValueSection,
          styles?.formattedValueSection,
          classNames?.text,
          styles?.text,
          RollingNumberValueSectionComponent,
          RollingNumberDigitComponent,
          RollingNumberSymbolComponent,
          formattedValue,
          RollingNumberMaskComponent,
          transitionConfig,
        ],
      );

      const screenReaderOnlySection = useMemo(() => {
        const prefixString = typeof prefix === 'string' ? prefix : '';
        const suffixString = typeof suffix === 'string' ? suffix : '';
        const formattedWithPrefixSuffix = `${prefixString}${formatted}${suffixString}`;
        return (
          <span aria-atomic="true" aria-live={ariaLive} className={screenReaderOnlyCss}>{`
            ${accessibilityLabelPrefix ?? ''}
            ${accessibilityLabel ?? formattedWithPrefixSuffix}
            ${accessibilityLabelSuffix ?? ''}
            `}</span>
        );
      }, [
        ariaLive,
        accessibilityLabelPrefix,
        prefix,
        accessibilityLabel,
        formatted,
        suffix,
        accessibilityLabelSuffix,
      ]);

      return (
        <Text
          ref={ref}
          as={Component}
          className={cx(tickerContainerCss, classNames?.root)}
          color={color}
          font={font}
          fontFamily={fontFamily}
          fontSize={fontSize}
          fontWeight={fontWeight}
          lineHeight={lineHeight}
          role={ariaLive === 'assertive' ? 'alert' : 'status'}
          style={rootStyle}
          tabularNumbers={tabularNumbers}
          {...props}
        >
          {/* render screen reader only section for accessibility */}
          {screenReaderOnlySection}
          <m.span
            aria-hidden
            animate={colorControls}
            className={cx(tickerCss, classNames?.visibleContent)}
            style={styles?.visibleContent}
            transition={transitionConfig}
          >
            {prefixSection}
            {formattedValue ? formattedValueValueSection : intlPartsValueSection}
            {suffixSection}
          </m.span>
        </Text>
      );
    },
  ),
);
