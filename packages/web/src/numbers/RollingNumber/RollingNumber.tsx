import { forwardRef, memo, useCallback, useMemo } from 'react';
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

/**
 * Defines transition overrides for RollingNumber animations.
 */
type RollingNumberTransitionConfig = {
  /**
   * Transition override applied to the vertical translation animation.
   */
  y?: Transition;
  /**
   * Transition override applied to the color interpolation animation.
   */
  color?: Transition;
};

export const defaultTransitionConfig = {
  y: { duration: durations.moderate3 / 1000, ease: curves.global },
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
  /**
   * Inline style overrides applied to the affix section.
   */
  styles?: {
    /**
     * Inline style override applied to the affix section container.
     */
    root?: React.CSSProperties;
    /**
     * Inline style override applied to the text within the section.
     */
    text?: React.CSSProperties;
  };
  /**
   * Class name overrides applied to the affix section.
   */
  classNames?: {
    /**
     * Class name override applied to the affix section container.
     */
    root?: string;
    /**
     * Class name override applied to the text within the section.
     */
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
   * Inline style overrides applied to the value section.
   */
  styles?: {
    /**
     * Inline style override applied to the section container.
     */
    root?: React.CSSProperties;
    /**
     * Inline style override applied to text within the section.
     */
    text?: React.CSSProperties;
  };
  /**
   * Class name overrides applied to the value section.
   */
  classNames?: {
    /**
     * Class name override applied to the section container.
     */
    root?: string;
    /**
     * Class name override applied to text within the section.
     */
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
   * Inline style overrides applied to the digit component.
   */
  styles?: {
    /**
     * Inline style override applied to the digit container.
     */
    root?: React.CSSProperties;
    /**
     * Inline style override applied to the digit text.
     */
    text?: React.CSSProperties;
  };
  /**
   * Class name overrides applied to the digit component.
   */
  classNames?: {
    /**
     * Class name override applied to the digit container.
     */
    root?: string;
    /**
     * Class name override applied to the digit text.
     */
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
  /**
   * Inline style overrides applied to the symbol component.
   */
  styles?: {
    /**
     * Inline style override applied to the symbol container.
     */
    root?: React.CSSProperties;
    /**
     * Inline style override applied to the symbol text.
     */
    text?: React.CSSProperties;
  };
  /**
   * Class name overrides applied to the symbol component.
   */
  classNames?: {
    /**
     * Class name override applied to the symbol container.
     */
    root?: string;
    /**
     * Class name override applied to the symbol text.
     */
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
     * Base text color token. When {@link colorPulseOnUpdate} is true, the color briefly pulses to a positive or negative mid color before returning to this base color. Defaults to {@code 'fg'}.
     */
    color?: ThemeVars.Color;
    /**
     * Enables color pulsing on positive or negative changes. Defaults to {@code false}.
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
     * Framer Motion transition overrides. Supports per-property overrides for {@code y} and {@code color} only.
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
     * aria-live politeness level. Defaults to {@code 'polite'}.
     */
    ariaLive?: React.AriaAttributes['aria-live'];
    /**
     * Enables tabular figures on the underlying {@link Text}. Defaults to {@code true}.
     */
    tabularNumbers?: boolean;
  };

export type RollingNumberProps<AsComponent extends React.ElementType> = Polymorphic.Props<
  AsComponent,
  RollingNumberBaseProps & {
    /**
     * Class name overrides applied to RollingNumber slots.
     */
    classNames?: {
      /**
       * Class override applied to the outer container element.
       */
      root?: string;
      /**
       * Class override applied to the animated content wrapper that is visually rendered.
       */
      visibleContent?: string;
      /**
       * Class override applied to the wrapper for the formatted numeric value.
       */
      formattedValueSection?: string;
      /**
       * Class override applied to the prefix section rendered from props.
       */
      prefix?: string;
      /**
       * Class override applied to the suffix section rendered from props.
       */
      suffix?: string;
      /**
       * The prefix generated by Intl.NumberFormat, for example, the "$" in "$1,000".
       */
      i18nPrefix?: string;
      /**
       * The suffix generated by Intl.NumberFormat, for example, the "K" in "100K".
       */
      i18nSuffix?: string;
      /**
       * Class override applied to the integer portion of the formatted value.
       */
      integer?: string;
      /**
       * Class override applied to the fractional portion of the formatted value.
       */
      fraction?: string;
      /**
       * Class override applied to the Text component rendering digits and symbols.
       */
      text?: string;
    };
    /**
     * Inline style overrides applied to RollingNumber slots.
     */
    styles?: {
      /**
       * Inline style override applied to the outer container element.
       */
      root?: React.CSSProperties;
      /**
       * Inline style override applied to the animated content wrapper that is visually rendered.
       */
      visibleContent?: React.CSSProperties;
      /**
       * Inline style override applied to the wrapper for the formatted numeric value.
       */
      formattedValueSection?: React.CSSProperties;
      /**
       * Inline style override applied to the prefix section rendered from props.
       */
      prefix?: React.CSSProperties;
      /**
       * Inline style override applied to the suffix section rendered from props.
       */
      suffix?: React.CSSProperties;
      /**
       * The prefix generated by Intl.NumberFormat, for example, the "$" in "$1,000".
       */
      i18nPrefix?: React.CSSProperties;
      /**
       * The suffix generated by Intl.NumberFormat, for example, the "K" in "100K".
       */
      i18nSuffix?: React.CSSProperties;
      /**
       * Inline styles applied to the integer portion of the formatted value.
       */
      integer?: React.CSSProperties;
      /**
       * Inline styles applied to the fractional portion of the formatted value.
       */
      fraction?: React.CSSProperties;
      /**
       * Inline styles applied to the Text component rendering digits and symbols.
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

      // Copy sanitizer for RollingNumber
      // - Clones the current selection's DOM Range (index 0; browsers typically expose a single range)
      // - Removes any nodes marked with data-copy-exclude (non-active digit stacks)
      // - Joins the remaining text and strips newline characters to keep the copy single-line
      // - Only overrides the clipboard when the sanitized text differs from the raw selection
      const handleCopySanitized = useCallback((e: React.ClipboardEvent) => {
        const selection = window.getSelection();
        if (!selection || selection.rangeCount === 0) return; // nothing selected
        const range = selection.getRangeAt(0); // single contiguous selection range is the norm
        const container = document.createElement('div');
        container.appendChild(range.cloneContents());
        // Drop non-active digit stacks from the cloned fragment so they aren't copied
        container.querySelectorAll('[data-copy-exclude]').forEach((node) => {
          node.parentNode?.removeChild(node);
        });
        // Normalize to single line (remove CR/LF) after exclusions
        const text = (container.textContent || '').replace(/\r?\n/g, '');
        if (text !== selection.toString()) {
          e.preventDefault();
          e.clipboardData.setData('text/plain', text);
        }
      }, []);

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
          onCopy={handleCopySanitized}
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
