import { type AriaAttributes, type CSSProperties, forwardRef, memo, useMemo } from 'react';
import type { ThemeVars } from '@coinbase/cds-common/core/theme';
import { curves, durations } from '@coinbase/cds-common/motion/tokens';
import {
  IntlNumberFormat,
  type KeyedNumberPart,
} from '@coinbase/cds-common/numbers/IntlNumberFormat';
import { useLocale } from '@coinbase/cds-common/system/LocaleProvider';
import type { SharedProps } from '@coinbase/cds-common/types/SharedProps';
import { css } from '@linaria/core';
import { type HTMLMotionProps, m, type Transition } from 'framer-motion';

import type { Polymorphic } from '../../core/polymorphism';
import { cx } from '../../cx';
import type { TextBaseProps } from '..';
import { Text } from '..';

import { DefaultNumberTickerDigit } from './DefaultNumberTickerDigit';
import { DefaultNumberTickerMask } from './DefaultNumberTickerMask';
import { DefaultNumberTickerNodeSection } from './DefaultNumberTickerNodeSection';
import { DefaultNumberTickerNumberSection } from './DefaultNumberTickerNumberSection';
import { DefaultNumberTickerSymbol } from './DefaultNumberTickerSymbol';
import { useColorPulse } from './useColorPulse';

export const DEFAULT_TRANSITION = {
  y: { duration: durations.moderate3 / 1000, ease: curves.global },
  color: { duration: durations.slow4 / 1000, ease: curves.global },
} as const;

const tickerCss = css`
  display: inline-flex;
  white-space: nowrap;
`;

const tickerContainerCss = css`
  display: inline-flex;
  width: fit-content;
`;

const screenReaderOnlyCss = css`
  position: absolute !important;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
  border: 0;
`;

type TransitionConfig = {
  y?: Transition;
  color?: Transition;
};

// Subcomponent prop and component type declarations
export type NumberTickerMaskProps = HTMLMotionProps<'span'> & {
  children?: React.ReactNode;
  ref?: React.Ref<HTMLSpanElement>;
};

export type NumberTickerNodeSectionProps = HTMLMotionProps<'span'> & {
  children?: React.ReactNode;
  justify?: CSSProperties['justifyContent'];
  ref?: React.Ref<HTMLSpanElement>;
};

export type NumberTickerNumberSectionProps = HTMLMotionProps<'span'> & {
  intlNumberParts: KeyedNumberPart[];
  justify?: CSSProperties['justifyContent'];
  NumberDigitComponent?: NumberTickerDigitComponent;
  NumberSymbolComponent?: NumberTickerSymbolComponent;
  formattedValue?: string;
  transitionConfig?: TransitionConfig;
  ref?: React.Ref<HTMLSpanElement>;
};

export type NumberTickerDigitProps = HTMLMotionProps<'span'> & {
  value: number;
  initialValue?: number;
  transitionConfig?: TransitionConfig;
  ref?: React.Ref<HTMLSpanElement>;
};

export type NumberTickerSymbolProps = HTMLMotionProps<'span'> & {
  type: string;
  justify: CSSProperties['justifyContent'];
  value: string;
  ref?: React.Ref<HTMLSpanElement>;
};

// TODO: confirm ref definition
export type NumberTickerMaskComponent = React.FC<NumberTickerMaskProps>;

export type NumberTickerNodeSectionComponent = React.FC<NumberTickerNodeSectionProps>;

export type NumberTickerDigitComponent = React.FC<NumberTickerDigitProps>;

export type NumberTickerSymbolComponent = React.FC<NumberTickerSymbolProps>;

export type NumberTickerNumberSectionComponent = React.FC<NumberTickerNumberSectionProps>;

export type NumberTickerBaseProps = SharedProps &
  TextBaseProps & {
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
     * Override mask component
     */
    NumberTickerMaskComponent?: NumberTickerMaskComponent;
    /**
     * Override node section component
     */
    NumberTickerNodeSectionComponent?: NumberTickerNodeSectionComponent;
    /**
     * Override number section component
     */
    NumberTickerNumberSectionComponent?: NumberTickerNumberSectionComponent;
    /**
     * Override number digit component
     */
    NumberTickerDigitComponent?: NumberTickerDigitComponent;
    /**
     * Override number symbol component
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
     * Aria-live attribute value.
     * @default 'polite'
     */
    ariaLive?: AriaAttributes['aria-live'];
    /**
     * Enable tabular numbers.
     * @default true
     */
    tabularNumbers?: boolean;
  };

export type NumberTickerProps<AsComponent extends React.ElementType> = Polymorphic.Props<
  AsComponent,
  NumberTickerBaseProps & {
    /**
     * Custom class names for the component.
     */
    classNames?: {
      root?: string;
      visibleContent?: string;
      formattedNumberSection?: string;
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
    };
    /**
     * Custom styles for the component.
     */
    styles?: {
      root?: React.CSSProperties;
      visibleContent?: React.CSSProperties;
      formattedNumberSection?: React.CSSProperties;
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
    };
  }
>;

export const numberTickerDefaultElement = 'span';
export type NumberTickerDefaultElement = typeof numberTickerDefaultElement;

type NumberTickerComponent = (<AsComponent extends React.ElementType = NumberTickerDefaultElement>(
  props: NumberTickerProps<AsComponent>,
) => Polymorphic.ReactReturn) &
  Polymorphic.ReactNamed;

export const NumberTicker: NumberTickerComponent = memo(
  forwardRef<React.ReactElement<NumberTickerBaseProps>, NumberTickerBaseProps>(
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
        NumberTickerMaskComponent = DefaultNumberTickerMask,
        NumberTickerNodeSectionComponent = DefaultNumberTickerNodeSection,
        NumberTickerNumberSectionComponent = DefaultNumberTickerNumberSection,
        NumberTickerDigitComponent = DefaultNumberTickerDigit,
        NumberTickerSymbolComponent = DefaultNumberTickerSymbol,
        accessibilityLabel,
        tabularNumbers = true,
        accessibilityLabelPrefix = '',
        accessibilityLabelSuffix = '',
        ...restTextProps
      }: NumberTickerProps<AsComponent>,
      ref: Polymorphic.Ref<AsComponent>,
    ) => {
      const Component = (as ?? numberTickerDefaultElement) satisfies React.ElementType;
      const { locale: defaultLocale } = useLocale();
      const locale = localeProp ?? defaultLocale;

      const transitionConfig = useMemo(
        () => ({ ...DEFAULT_TRANSITION, ...transition }),
        [transition],
      );

      const colorControls = useColorPulse({
        value,
        defaultColor: color,
        colorPulseOnUpdate: !!colorPulseOnUpdate,
        positivePulseColor,
        negativePulseColor,
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
          <NumberTickerNodeSectionComponent
            className={classNames?.prefix}
            justify="flex-end"
            style={styles?.prefix}
          >
            {prefix}
          </NumberTickerNodeSectionComponent>
        ),

        [classNames?.prefix, styles?.prefix, prefix, NumberTickerNodeSectionComponent],
      );

      const suffixSection = useMemo(
        () => (
          /* Suffix prop will be displayed here after the suffix generated by Intl.NumberFormat. */
          <NumberTickerNodeSectionComponent
            className={classNames?.suffix}
            justify="flex-start"
            style={styles?.suffix}
          >
            {suffix}
          </NumberTickerNodeSectionComponent>
        ),

        [classNames?.suffix, styles?.suffix, suffix, NumberTickerNodeSectionComponent],
      );

      const intlPartsNumberSection = useMemo(() => {
        const { pre, integer, fraction, post } =
          intlNumberFormatter.formatToParts(enableSubscriptNotation);
        return (
          <NumberTickerMaskComponent
            className={classNames?.formattedNumberSection}
            style={styles?.formattedNumberSection}
          >
            {/* Prefix generated by Intl.NumberFormat is displayed here. */}
            <NumberTickerNumberSectionComponent
              NumberDigitComponent={NumberTickerDigitComponent}
              NumberSymbolComponent={NumberTickerSymbolComponent}
              className={classNames?.i18nPrefix}
              intlNumberParts={pre}
              justify="flex-end"
              style={styles?.i18nPrefix}
              transitionConfig={transitionConfig}
            />
            <NumberTickerNumberSectionComponent
              NumberDigitComponent={NumberTickerDigitComponent}
              NumberSymbolComponent={NumberTickerSymbolComponent}
              className={classNames?.integer}
              intlNumberParts={integer}
              justify="flex-end"
              style={styles?.integer}
              transitionConfig={transitionConfig}
            />
            <NumberTickerNumberSectionComponent
              NumberDigitComponent={NumberTickerDigitComponent}
              NumberSymbolComponent={NumberTickerSymbolComponent}
              className={classNames?.fraction}
              intlNumberParts={fraction}
              justify="flex-start"
              style={styles?.fraction}
              transitionConfig={transitionConfig}
            />
            {/* Suffix generated by Intl.NumberFormat is displayed here. */}
            <NumberTickerNumberSectionComponent
              NumberDigitComponent={NumberTickerDigitComponent}
              NumberSymbolComponent={NumberTickerSymbolComponent}
              className={classNames?.i18nSuffix}
              intlNumberParts={post}
              justify="flex-start"
              style={styles?.i18nSuffix}
              transitionConfig={transitionConfig}
            />
          </NumberTickerMaskComponent>
        );
      }, [
        intlNumberFormatter,
        enableSubscriptNotation,
        NumberTickerMaskComponent,
        classNames?.formattedNumberSection,
        classNames?.i18nPrefix,
        classNames?.integer,
        classNames?.fraction,
        classNames?.i18nSuffix,
        styles?.formattedNumberSection,
        styles?.i18nPrefix,
        styles?.integer,
        styles?.fraction,
        styles?.i18nSuffix,
        NumberTickerNumberSectionComponent,
        NumberTickerDigitComponent,
        NumberTickerSymbolComponent,
        transitionConfig,
      ]);

      const formattedValueNumberSection = useMemo(
        () => (
          <NumberTickerMaskComponent
            className={classNames?.formattedNumberSection}
            style={styles?.formattedNumberSection}
          >
            <NumberTickerNumberSectionComponent
              NumberDigitComponent={NumberTickerDigitComponent}
              NumberSymbolComponent={NumberTickerSymbolComponent}
              formattedValue={formattedValue}
              intlNumberParts={[]}
              justify="flex-start"
              transitionConfig={transitionConfig}
            />
          </NumberTickerMaskComponent>
        ),
        [
          NumberTickerMaskComponent,
          classNames?.formattedNumberSection,
          styles?.formattedNumberSection,
          NumberTickerNumberSectionComponent,
          NumberTickerDigitComponent,
          NumberTickerSymbolComponent,
          formattedValue,
          transitionConfig,
        ],
      );

      const screenReaderOnlySection = useMemo(
        () => (
          <span
            aria-atomic="true"
            aria-live={ariaLive}
            className={screenReaderOnlyCss}
          >{`${accessibilityLabelPrefix}${
            accessibilityLabel ??
            formattedValue ??
            intlNumberFormatter.format({
              // only include prefix/suffix if they are strings
              prefix: typeof prefix === 'string' ? prefix : undefined,
              suffix: typeof suffix === 'string' ? suffix : undefined,
            })
          }${accessibilityLabelSuffix}`}</span>
        ),
        [
          ariaLive,
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
          {...restTextProps}
        >
          {screenReaderOnlySection}
          {/* wrap another layer of m.span to use framer-motion color animation */}
          <m.span
            aria-hidden
            animate={colorControls}
            className={cx(tickerCss, classNames?.visibleContent)}
            style={styles?.visibleContent}
            transition={transitionConfig}
          >
            {prefixSection}
            {formattedValue ? formattedValueNumberSection : intlPartsNumberSection}
            {suffixSection}
          </m.span>
        </Text>
      );
    },
  ),
);
