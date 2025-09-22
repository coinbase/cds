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
import { HStack } from '../../layout';
import type { TextBaseProps } from '..';
import { Text } from '..';

import { DefaultRollingNumberDigit } from './DefaultRollingNumberDigit';
import { DefaultRollingNumberMask } from './DefaultRollingNumberMask';
import { DefaultRollingNumberNodeSection } from './DefaultRollingNumberNodeSection';
import { DefaultRollingNumberNumberSection } from './DefaultRollingNumberNumberSection';
import { DefaultRollingNumberSymbol } from './DefaultRollingNumberSymbol';
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
export type RollingNumberMaskProps = HTMLMotionProps<'span'> & {
  children?: React.ReactNode;
  ref?: React.Ref<HTMLSpanElement>;
};

export type RollingNumberNodeSectionProps = HTMLMotionProps<'span'> & {
  children?: React.ReactNode;
  justify?: CSSProperties['justifyContent'];
  ref?: React.Ref<HTMLSpanElement>;
};

export type RollingNumberNumberSectionProps = HTMLMotionProps<'span'> & {
  intlNumberParts: KeyedNumberPart[];
  justify?: CSSProperties['justifyContent'];
  RollingNumberDigitComponent?: RollingNumberDigitComponent;
  RollingNumberSymbolComponent?: RollingNumberSymbolComponent;
  RollingNumberMaskComponent?: RollingNumberMaskComponent;
  formattedValue?: string;
  transitionConfig?: TransitionConfig;
  ref?: React.Ref<HTMLSpanElement>;
};

export type RollingNumberDigitProps = HTMLMotionProps<'span'> & {
  value: number;
  initialValue?: number;
  transitionConfig?: TransitionConfig;
  RollingNumberMaskComponent?: RollingNumberMaskComponent;
  ref?: React.Ref<HTMLSpanElement>;
};

export type RollingNumberSymbolProps = HTMLMotionProps<'span'> & {
  justify: CSSProperties['justifyContent'];
  value: string;
  ref?: React.Ref<HTMLSpanElement>;
};

export type RollingNumberMaskComponent = React.FC<RollingNumberMaskProps>;

export type RollingNumberNodeSectionComponent = React.FC<RollingNumberNodeSectionProps>;

export type RollingNumberDigitComponent = React.FC<RollingNumberDigitProps>;

export type RollingNumberSymbolComponent = React.FC<RollingNumberSymbolProps>;

export type RollingNumberNumberSectionComponent = React.FC<RollingNumberNumberSectionProps>;

export type RollingNumberBaseProps = SharedProps &
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
    RollingNumberMaskComponent?: RollingNumberMaskComponent;
    /**
     * Override node section component
     */
    RollingNumberNodeSectionComponent?: RollingNumberNodeSectionComponent;
    /**
     * Override number section component
     */
    RollingNumberNumberSectionComponent?: RollingNumberNumberSectionComponent;
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

export type RollingNumberProps<AsComponent extends React.ElementType> = Polymorphic.Props<
  AsComponent,
  RollingNumberBaseProps & {
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
        RollingNumberNodeSectionComponent = DefaultRollingNumberNodeSection,
        RollingNumberNumberSectionComponent = DefaultRollingNumberNumberSection,
        RollingNumberDigitComponent = DefaultRollingNumberDigit,
        RollingNumberSymbolComponent = DefaultRollingNumberSymbol,
        accessibilityLabel,
        tabularNumbers = true,
        accessibilityLabelPrefix = '',
        accessibilityLabelSuffix = '',
        ...restTextProps
      }: RollingNumberProps<AsComponent>,
      ref: Polymorphic.Ref<AsComponent>,
    ) => {
      const Component = (as ?? rollingNumberDefaultElement) satisfies React.ElementType;
      const { locale: defaultLocale } = useLocale();
      const locale = localeProp ?? defaultLocale;

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
          <RollingNumberNodeSectionComponent
            className={classNames?.prefix}
            justify="flex-end"
            style={styles?.prefix}
          >
            {prefix}
          </RollingNumberNodeSectionComponent>
        ),

        [classNames?.prefix, styles?.prefix, prefix, RollingNumberNodeSectionComponent],
      );

      const suffixSection = useMemo(
        () => (
          /* Suffix prop will be displayed here after the suffix generated by Intl.NumberFormat. */
          <RollingNumberNodeSectionComponent
            className={classNames?.suffix}
            justify="flex-start"
            style={styles?.suffix}
          >
            {suffix}
          </RollingNumberNodeSectionComponent>
        ),

        [classNames?.suffix, styles?.suffix, suffix, RollingNumberNodeSectionComponent],
      );

      const intlPartsNumberSection = useMemo(() => {
        const { pre, integer, fraction, post } = intlNumberFormatter.formatToParts({
          enableSubscriptNotation,
        });
        return (
          <HStack
            className={classNames?.formattedNumberSection}
            display="inline-flex"
            style={styles?.formattedNumberSection}
          >
            {/* Prefix generated by Intl.NumberFormat is displayed here. */}
            <RollingNumberNumberSectionComponent
              RollingNumberDigitComponent={RollingNumberDigitComponent}
              RollingNumberMaskComponent={RollingNumberMaskComponent}
              RollingNumberSymbolComponent={RollingNumberSymbolComponent}
              className={classNames?.i18nPrefix}
              intlNumberParts={pre}
              justify="flex-end"
              style={styles?.i18nPrefix}
              transitionConfig={transitionConfig}
            />
            <RollingNumberNumberSectionComponent
              RollingNumberDigitComponent={RollingNumberDigitComponent}
              RollingNumberMaskComponent={RollingNumberMaskComponent}
              RollingNumberSymbolComponent={RollingNumberSymbolComponent}
              className={classNames?.integer}
              intlNumberParts={integer}
              justify="flex-end"
              style={styles?.integer}
              transitionConfig={transitionConfig}
            />
            <RollingNumberNumberSectionComponent
              RollingNumberDigitComponent={RollingNumberDigitComponent}
              RollingNumberMaskComponent={RollingNumberMaskComponent}
              RollingNumberSymbolComponent={RollingNumberSymbolComponent}
              className={classNames?.fraction}
              intlNumberParts={fraction}
              justify="flex-start"
              style={styles?.fraction}
              transitionConfig={transitionConfig}
            />
            {/* Suffix generated by Intl.NumberFormat is displayed here. */}
            <RollingNumberNumberSectionComponent
              RollingNumberDigitComponent={RollingNumberDigitComponent}
              RollingNumberMaskComponent={RollingNumberMaskComponent}
              RollingNumberSymbolComponent={RollingNumberSymbolComponent}
              className={classNames?.i18nSuffix}
              intlNumberParts={post}
              justify="flex-start"
              style={styles?.i18nSuffix}
              transitionConfig={transitionConfig}
            />
          </HStack>
        );
      }, [
        intlNumberFormatter,
        enableSubscriptNotation,
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
        RollingNumberNumberSectionComponent,
        RollingNumberMaskComponent,
        RollingNumberDigitComponent,
        RollingNumberSymbolComponent,
        transitionConfig,
      ]);

      const formattedValueNumberSection = useMemo(
        () => (
          <RollingNumberNumberSectionComponent
            RollingNumberDigitComponent={RollingNumberDigitComponent}
            RollingNumberMaskComponent={RollingNumberMaskComponent}
            RollingNumberSymbolComponent={RollingNumberSymbolComponent}
            className={classNames?.formattedNumberSection}
            formattedValue={formattedValue}
            intlNumberParts={[]}
            justify="flex-start"
            style={styles?.formattedNumberSection}
            transitionConfig={transitionConfig}
          />
        ),
        [
          classNames?.formattedNumberSection,
          styles?.formattedNumberSection,
          RollingNumberNumberSectionComponent,
          RollingNumberDigitComponent,
          RollingNumberSymbolComponent,
          formattedValue,
          RollingNumberMaskComponent,
          transitionConfig,
        ],
      );

      const screenReaderOnlySection = useMemo(() => {
        const formattedWithPrefixSuffix = `${typeof prefix === 'string' ? prefix : ''}${formatted}${typeof suffix === 'string' ? suffix : ''}`;
        return (
          <span aria-atomic="true" aria-live={ariaLive} className={screenReaderOnlyCss}>{`
            ${accessibilityLabelPrefix}
            ${accessibilityLabel ?? formattedWithPrefixSuffix}
            ${accessibilityLabelSuffix}
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
