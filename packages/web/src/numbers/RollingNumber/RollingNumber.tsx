import { forwardRef, memo, useMemo } from 'react';
import type { ThemeVars } from '@coinbase/cds-common/core/theme';
import { curves, durations } from '@coinbase/cds-common/motion/tokens';
import {
  IntlNumberFormat,
  type KeyedNumberPart,
} from '@coinbase/cds-common/numbers/IntlNumberFormat';
import {
  type SingleDirection,
  useValueChangeDirection,
} from '@coinbase/cds-common/numbers/useValueChangeDirection';
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
  user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
`;

/**
 * Defines transition overrides for RollingNumber animations.
 */
type RollingNumberTransitionConfig = {
  /**
   * Transition applied to the vertical translation animation (digit roll).
   */
  y?: Transition;
  /**
   * Transition applied to the opacity animation during digit transitions.
   * Controls how digits fade in/out during the single variant animation.
   */
  opacity?: Transition;
  /**
   * Transition applied to the color interpolation animation (color pulse).
   */
  color?: Transition;
};

/**
 * Defines the style of digit transition animation.
 * - `'every'`: Rolls through every intermediate digit (e.g., 1→2→3→...→9). Default behavior.
 * - `'single'`: Rolls directly to the new digit without showing intermediates (e.g., 1→9).
 */
export type DigitTransitionVariant = 'every' | 'single';

export const defaultTransitionConfig = {
  y: { type: 'spring', stiffness: 280, damping: 18, mass: 0.3 },
  opacity: { duration: durations.fast2 / 1000, ease: curves.global },
  color: { duration: durations.slow4 / 1000, ease: curves.global },
} as const satisfies RollingNumberTransitionConfig;

// Subcomponent prop and component type declarations
export type RollingNumberMaskProps = TextProps<TextDefaultElement> & {
  /**
   * Content rendered inside the mask container.
   */
  children?: React.ReactNode;
  /**
   * Ref forwarded to the mask element.
   */
  ref?: React.Ref<HTMLSpanElement>;
};

export type RollingNumberAffixSectionProps = TextProps<TextDefaultElement> & {
  /**
   * Content rendered inside the affix section.
   */
  children?: React.ReactNode;
  /**
   * Ref forwarded to the affix section wrapper element.
   */
  ref?: React.Ref<HTMLSpanElement>;
  styles?: {
    /** Affix section container element */
    root?: React.CSSProperties;
    /** Text element within the section */
    text?: React.CSSProperties;
  };
  classNames?: {
    /** Affix section container element */
    root?: string;
    /** Text element within the section */
    text?: string;
  };
};

export type RollingNumberValueSectionProps = TextProps<TextDefaultElement> & {
  /**
   * Parts provided by Intl.NumberFormat used to render the formatted value.
   */
  intlNumberParts: KeyedNumberPart[];
  /**
   * Component used to render numeric digits within the section.
   */
  RollingNumberDigitComponent?: RollingNumberDigitComponent;
  /**
   * Component used to render non-digit symbols within the section.
   */
  RollingNumberSymbolComponent?: RollingNumberSymbolComponent;
  /**
   * Component used to mask and animate digit transitions.
   */
  RollingNumberMaskComponent?: RollingNumberMaskComponent;
  /**
   * Preformatted string rendered instead of intlNumberParts when provided.
   */
  formattedValue?: string;
  /**
   * Transition overrides applied to digit and symbol animations.
   */
  transitionConfig?: RollingNumberTransitionConfig;
  /**
   * Style of digit transition animation.
   * @default 'every'
   */
  digitTransitionVariant?: DigitTransitionVariant;
  /**
   * Direction of the roll animation. Only used when {@link digitTransitionVariant} is `'single'`.
   */
  direction?: SingleDirection;
  styles?: {
    /** Value section container element */
    root?: React.CSSProperties;
    /** Text element within the section */
    text?: React.CSSProperties;
  };
  classNames?: {
    /** Value section container element */
    root?: string;
    /** Text element within the section */
    text?: string;
  };
  /**
   * Ref forwarded to the section container element.
   */
  ref?: React.Ref<HTMLSpanElement>;
};

export type RollingNumberDigitProps = TextProps<TextDefaultElement> & {
  /**
   * Digit currently displayed in the animated column.
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
   * Style of digit transition animation.
   * @default 'every'
   */
  digitTransitionVariant?: DigitTransitionVariant;
  /**
   * Direction of the roll animation. Only used when {@link digitTransitionVariant} is `'single'`.
   */
  direction?: SingleDirection;
  styles?: {
    /** Digit container element */
    root?: React.CSSProperties;
    /** Digit text element */
    text?: React.CSSProperties;
  };
  classNames?: {
    /** Digit container element */
    root?: string;
    /** Digit text element */
    text?: string;
  };
  /**
   * Ref forwarded to the digit container element.
   */
  ref?: React.Ref<HTMLSpanElement>;
};

export type RollingNumberSymbolProps = TextProps<TextDefaultElement> & {
  /**
   * Literal symbol rendered within the number stream.
   */
  value: string;
  styles?: {
    /** Symbol container element */
    root?: React.CSSProperties;
    /** Symbol text element */
    text?: React.CSSProperties;
  };
  classNames?: {
    /** Symbol container element */
    root?: string;
    /** Symbol text element */
    text?: string;
  };
  /**
   * Ref forwarded to the symbol container element.
   */
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
     * Base text color token. When {@link colorPulseOnUpdate} is true, the color briefly pulses to a positive or negative mid color before returning to this base color.
     * @default 'fg'
     */
    color?: ThemeVars.Color;
    /**
     * Enables color pulsing on positive or negative changes.
     */
    colorPulseOnUpdate?: boolean;
    /**
     * Color token used for positive numeric changes.
     * @default 'fgPositive'
     */
    positivePulseColor?: ThemeVars.Color;
    /**
     * Color token used for negative numeric changes.
     * @default 'fgNegative'
     */
    negativePulseColor?: ThemeVars.Color;
    /**
     * Enables subscript notation for leading zeros in the fractional part (for example, {@code 0.00009 => 0.0₄9}).
     */
    enableSubscriptNotation?: boolean;
    /**
     * Framer Motion transition overrides. Supports per-property overrides for {@code y} and {@code color} only.
     */
    transition?: RollingNumberTransitionConfig;
    /**
     * Style of digit transition animation.
     * - `'every'`: Rolls through every intermediate digit (e.g., 1→2→3→...→9).
     * - `'single'`: Rolls directly to the new digit without showing intermediates (e.g., 1→9).
     * @default 'every'
     */
    digitTransitionVariant?: DigitTransitionVariant;
    /**
     * Accessibility label prefix announced before the value.
     */
    accessibilityLabelPrefix?: string;
    /**
     * Accessibility label suffix announced after the value.
     */
    accessibilityLabelSuffix?: string;
    /**
     * aria-live politeness level.
     * @default 'polite'
     */
    ariaLive?: React.AriaAttributes['aria-live'];
    /**
     * Enables tabular figures on the underlying {@link Text}.
     * @default true
     */
    tabularNumbers?: boolean;
  };

export type RollingNumberProps<AsComponent extends React.ElementType> = Polymorphic.Props<
  AsComponent,
  RollingNumberBaseProps & {
    /** Custom class names for individual elements of the RollingNumber component */
    classNames?: {
      /** Outer container element */
      root?: string;
      /** Animated visible content wrapper */
      visibleContent?: string;
      /** Formatted numeric value wrapper */
      formattedValueSection?: string;
      /** Prefix section (from props) */
      prefix?: string;
      /** Suffix section (from props) */
      suffix?: string;
      /** Prefix from Intl.NumberFormat (e.g. "$" in "$1,000") */
      i18nPrefix?: string;
      /** Suffix from Intl.NumberFormat (e.g. "K" in "100K") */
      i18nSuffix?: string;
      /** Integer portion of formatted value */
      integer?: string;
      /** Fractional portion of formatted value */
      fraction?: string;
      /** Text element for digits and symbols */
      text?: string;
    };
    /** Custom styles for individual elements of the RollingNumber component */
    styles?: {
      /** Outer container element */
      root?: React.CSSProperties;
      /** Animated visible content wrapper */
      visibleContent?: React.CSSProperties;
      /** Formatted numeric value wrapper */
      formattedValueSection?: React.CSSProperties;
      /** Prefix section (from props) */
      prefix?: React.CSSProperties;
      /** Suffix section (from props) */
      suffix?: React.CSSProperties;
      /** Prefix from Intl.NumberFormat (e.g. "$" in "$1,000") */
      i18nPrefix?: React.CSSProperties;
      /** Suffix from Intl.NumberFormat (e.g. "K" in "100K") */
      i18nSuffix?: React.CSSProperties;
      /** Integer portion of formatted value */
      integer?: React.CSSProperties;
      /** Fractional portion of formatted value */
      fraction?: React.CSSProperties;
      /** Text element for digits and symbols */
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
        digitTransitionVariant = 'every',
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

      const direction = useValueChangeDirection(value);

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
              digitTransitionVariant={digitTransitionVariant}
              direction={direction}
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
              digitTransitionVariant={digitTransitionVariant}
              direction={direction}
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
              digitTransitionVariant={digitTransitionVariant}
              direction={direction}
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
              digitTransitionVariant={digitTransitionVariant}
              direction={direction}
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
        digitTransitionVariant,
        direction,
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
            digitTransitionVariant={digitTransitionVariant}
            direction={direction}
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
          digitTransitionVariant,
          direction,
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
