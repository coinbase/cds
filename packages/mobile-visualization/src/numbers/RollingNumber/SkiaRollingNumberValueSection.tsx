import { forwardRef, memo, useEffect, useMemo, useRef, useState } from 'react';
import type { View, ViewStyle } from 'react-native';
import type { SharedValue } from 'react-native-reanimated';
import { makeMutable, useDerivedValue, withSpring, withTiming } from 'react-native-reanimated';
import { useTheme } from '@coinbase/cds-mobile/hooks/useTheme';
import { HStack } from '@coinbase/cds-mobile/layout';
import {
  defaultTransitionConfig,
  digits,
  type RollingNumberValueSectionComponent,
  type RollingNumberValueSectionProps,
} from '@coinbase/cds-mobile/numbers/RollingNumber';
import { Text } from '@coinbase/cds-mobile/typography';
import {
  Canvas,
  Group,
  Paragraph,
  type SkColor,
  Skia,
  type SkParagraph,
  TextAlign,
} from '@shopify/react-native-skia';

// ============================================================================
// Color Pulse State Hook (Skia-specific, performance-optimized)
// ============================================================================

type ColorState = 'base' | 'positive' | 'negative';

/**
 * Returns which color state to show based on value changes.
 * Changes instantly to pulse color, then returns to base after a delay.
 * No continuous animation - just discrete states to avoid rebuilding paragraphs on every frame.
 *
 * Only pulses when both the numeric value AND the formatted display string change,
 * to avoid pulsing when the display doesn't visually change (e.g., 125000 → 125001 both showing as "125K").
 */
function useColorPulseState({
  value,
  formatted,
  direction,
  colorPulseOnUpdate,
  pulseDuration = 400,
}: {
  value?: number;
  formatted: string;
  direction?: 'up' | 'down';
  colorPulseOnUpdate?: boolean;
  pulseDuration?: number;
}): ColorState {
  const [prevValue, setPrevValue] = useState<number | undefined>(value);
  const [prevFormatted, setPrevFormatted] = useState<string>(formatted);

  // Compute color state synchronously based on current vs previous values
  const colorState = useMemo((): ColorState => {
    if (!colorPulseOnUpdate || !direction) {
      return 'base';
    }

    const hasMeaningfulChange =
      value !== undefined &&
      prevValue !== undefined &&
      value !== prevValue &&
      formatted !== prevFormatted;

    if (hasMeaningfulChange) {
      return direction === 'up' ? 'positive' : 'negative';
    }

    return 'base';
  }, [value, formatted, prevValue, prevFormatted, direction, colorPulseOnUpdate]);

  // Reset previous values after pulse duration
  useEffect(() => {
    const timeout = setTimeout(() => {
      setPrevValue(value);
      setPrevFormatted(formatted);
    }, pulseDuration);

    return () => {
      clearTimeout(timeout);
      // Handle edge case where updates arrive faster than timeout
      setPrevValue(value);
      setPrevFormatted(formatted);
    };
  }, [value, formatted, pulseDuration]);

  return colorState;
}

// ============================================================================
// Helpers
// ============================================================================

/**
 * Extract base font family name from CDS font family strings.
 * CDS uses names like "Inter_400Regular" or "CoinbaseDisplay-Medium"
 * but Skia expects just "Inter" or "CoinbaseDisplay".
 */
function extractBaseFontFamily(fontFamily: string): string {
  // Handle underscore format: "Inter_400Regular" -> "Inter"
  if (fontFamily.includes('_')) {
    return fontFamily.split('_')[0];
  }
  // Handle dash format: "CoinbaseDisplay-Medium" -> "CoinbaseDisplay"
  // But be careful - some fonts use dashes in base name like "Source-Code-Pro"
  // CDS fonts use pattern: BaseName-Weight (e.g., CoinbaseSans-Medium)
  const dashMatch = fontFamily.match(/^(.+?)-(?:Regular|Medium|SemiBold|Bold|Light|Thin)$/i);
  if (dashMatch) {
    return dashMatch[1];
  }
  // Return as-is if no pattern matches
  return fontFamily;
}

/**
 * Extract font weight from CDS font family strings.
 * CDS uses names like "Inter_600SemiBold" or "CoinbaseDisplay-Medium".
 * Returns Skia FontWeight value (100-900).
 */
function extractFontWeight(fontFamily: string): number {
  const lowerFamily = fontFamily.toLowerCase();

  // Check for explicit numeric weight in underscore format (e.g., "Inter_600SemiBold")
  const numericMatch = fontFamily.match(/_(\d{3})/);
  if (numericMatch) {
    return parseInt(numericMatch[1], 10);
  }

  // Check for weight keywords (order matters - check more specific first)
  if (lowerFamily.includes('thin') || lowerFamily.includes('hairline')) {
    return 100;
  }
  if (lowerFamily.includes('extralight') || lowerFamily.includes('ultralight')) {
    return 200;
  }
  if (lowerFamily.includes('light')) {
    return 300;
  }
  if (lowerFamily.includes('medium')) {
    return 500;
  }
  if (lowerFamily.includes('semibold') || lowerFamily.includes('demibold')) {
    return 600;
  }
  if (lowerFamily.includes('extrabold') || lowerFamily.includes('ultrabold')) {
    return 800;
  }
  if (lowerFamily.includes('bold')) {
    return 700;
  }
  if (lowerFamily.includes('black') || lowerFamily.includes('heavy')) {
    return 900;
  }
  if (lowerFamily.includes('regular') || lowerFamily.includes('normal')) {
    return 400;
  }

  // Default to normal weight
  return 400;
}

/**
 * Convert a CDS font family name to an array of possible Skia font names.
 * Skia's fontFamilies array uses the first one it can resolve.
 *
 * CDS uses: "CoinbaseDisplay-Regular"
 * Skia sees: "Coinbase Display" (with space)
 *
 * Returns both formats so Skia can match whichever is available.
 */
function getFontFamiliesForSkia(rawFontFamily: string): string[] {
  const baseName = extractBaseFontFamily(rawFontFamily);

  // Add spaces before capital letters: "CoinbaseDisplay" -> "Coinbase Display"
  const spacedName = baseName.replace(/([a-z])([A-Z])/g, '$1 $2');

  // Return both formats - Skia will use the first one it finds
  if (spacedName !== baseName) {
    return [spacedName, baseName, rawFontFamily];
  }
  return [baseName, rawFontFamily];
}

/**
 * Convert any CSS color format to hex for Skia compatibility.
 * Skia.Color() works best with hex format.
 */
function toHexColor(color: string): string {
  // Already hex
  if (color.startsWith('#')) {
    return color;
  }

  // Parse rgb(r, g, b) or rgba(r, g, b, a)
  const rgbMatch = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
  if (rgbMatch) {
    const r = parseInt(rgbMatch[1], 10);
    const g = parseInt(rgbMatch[2], 10);
    const b = parseInt(rgbMatch[3], 10);
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  }

  // Return as-is and let Skia try to parse it
  return color;
}

function isDigitChar(char: string): boolean {
  const n = parseInt(char, 10);
  return n >= 0 && n <= 9;
}

/**
 * Build an array of 10 paragraphs, one for each digit 0-9.
 * These are shared across all digit columns.
 *
 * Uses tabular figures (tnum) to ensure consistent digit widths and proper
 * glyph variants (e.g., '1' with base crossbar in some fonts).
 */
function buildDigitParagraphs(
  fontFamilies: string[],
  fontSize: number,
  fontWeight: number,
  color: SkColor,
  width: number,
): SkParagraph[] {
  return digits.map((d) => {
    const builder = Skia.ParagraphBuilder.Make({ textAlign: TextAlign.Center });
    builder.pushStyle({
      fontFamilies,
      fontSize,
      color,
      fontStyle: { weight: fontWeight },
      fontFeatures: [{ name: 'tnum', value: 1 }], // Tabular figures
    });
    builder.addText(String(d));
    builder.pop();
    const para = builder.build();
    para.layout(width);
    return para;
  });
}

function buildSymbolParagraph(
  char: string,
  fontFamilies: string[],
  fontSize: number,
  fontWeight: number,
  color: SkColor,
): SkParagraph {
  const builder = Skia.ParagraphBuilder.Make({ textAlign: TextAlign.Left });
  builder.pushStyle({
    fontFamilies,
    fontSize,
    color,
    fontStyle: { weight: fontWeight },
    fontFeatures: [{ name: 'tnum', value: 1 }], // Tabular figures for consistency
  });
  builder.addText(char);
  builder.pop();
  const para = builder.build();
  para.layout(9999);
  return para;
}

// ============================================================================
// Animated Digit Column - minimal component for transform animation
// ============================================================================

type DigitColumnData = {
  x: number;
  positionY: SharedValue<number>;
};

const AnimatedDigitGroup = memo(function AnimatedDigitGroup({
  data,
  width,
  height,
  paragraphs,
}: {
  data: DigitColumnData;
  width: number;
  height: number;
  paragraphs: SkParagraph[];
}) {
  const transform = useDerivedValue(() => [{ translateY: data.positionY.value }], [data.positionY]);

  return (
    <Group clip={Skia.XYWHRect(0, 0, width, height)} transform={[{ translateX: data.x }]}>
      <Group transform={transform}>
        {paragraphs.map((para, i) => (
          <Paragraph key={i} paragraph={para} width={width} x={0} y={i * height} />
        ))}
      </Group>
    </Group>
  );
});

// ============================================================================
// Main Component
// ============================================================================

type ColumnLayout = {
  type: 'digit' | 'symbol';
  key: string;
  x: number;
  width: number;
  // For digits: index into digitPositions array
  // For symbols: index into symbolParagraphs array
  index: number;
};

/**
 * High-performance Skia-based RollingNumber value section.
 *
 * This component renders rolling numbers using Skia's Paragraph API for significantly
 * better performance than React Native's AnimatedText approach. It reduces the number
 * of React component instances from 70-80 (one per digit position × 10 digits) to just
 * 7-8 Canvas groups.
 *
 * ## Optimizations
 *
 * - **Paragraph pooling**: Pre-builds digit paragraphs for all 3 color states (base,
 *   positive, negative) upfront, then switches pools instantly during color pulse
 * - **Single draw call per digit**: Each digit column renders all 10 digits (0-9) in
 *   one Skia Paragraph, using GPU-accelerated clipping and transforms
 * - **UI thread animations**: Position animations run via Reanimated SharedValues,
 *   keeping the JS thread free
 * - **Discrete color states**: Color pulse uses discrete state changes (not continuous
 *   animation) to avoid rebuilding paragraphs on every frame
 *
 * ## Limitations vs DefaultRollingNumberValueSection
 *
 * 1. **No `'single'` variant**: Only supports `digitTransitionVariant="every"`.
 *
 * 2. **Discrete color pulse**: The default renderer smoothly interpolates colors during
 *    pulse using `transitionConfig.color`. This Skia renderer uses discrete color states
 *    (instant switch to pulse color, then back to base after 400ms) because continuous
 *    color animation would require rebuilding Skia paragraphs on every frame, dropping
 *    JS thread to 0 FPS.
 *
 * 3. **No custom sub-components**: The `RollingNumberDigitComponent`,
 *    `RollingNumberSymbolComponent`, and `RollingNumberMaskComponent` props are ignored.
 *    This component uses its own internal Skia-based rendering for all elements.
 *
 * 4. **No animated text styles**: The `styles.text` prop cannot contain Reanimated
 *    animated styles (like the `animatedColorStyle` from `useColorPulse`). Colors are
 *    managed internally through pre-built paragraph pools for each color state.
 *
 * 5. **Font extraction**: Font names are extracted from CDS format (e.g.,
 *    "Inter_400Regular" → "Inter") for Skia compatibility. Uses tabular figures (`tnum`
 *    font feature) for consistent digit widths.
 *
 * ## Usage
 *
 * ```tsx
 * import { RollingNumber } from '@coinbase/cds-mobile/numbers';
 * import { SkiaRollingNumberValueSection } from '@coinbase/cds-mobile-visualization/numbers';
 *
 * <RollingNumber
 *   value={12345.67}
 *   RollingNumberValueSectionComponent={SkiaRollingNumberValueSection}
 *   digitTransitionVariant="every" // Required - "single" will be ignored
 * />
 * ```
 *
 * @see DefaultRollingNumberValueSection for the standard React Native implementation
 */
export const SkiaRollingNumberValueSection: RollingNumberValueSectionComponent = memo(
  forwardRef<View, RollingNumberValueSectionProps>(function SkiaRollingNumberValueSection(
    {
      value,
      intlNumberParts,
      textProps,
      digitHeight: digitHeightProp,
      formattedValue,
      style,
      styles,
      justifyContent = 'flex-start',
      transitionConfig,
      digitTransitionVariant = 'every',
      direction,
      colorPulseOnUpdate,
      ...viewProps
    },
    ref,
  ) {
    if (digitTransitionVariant === 'single') {
      // TODO: SkiaRollingNumberValueSection only supports "every" variant
      digitTransitionVariant = 'every';
    }

    const theme = useTheme();

    // Measurement for digit dimensions
    const [measured, setMeasured] = useState<{ width: number; height: number } | null>(null);

    // Measurement for symbol widths - use RN Text widths to match fallback layout
    const [symbolWidths, setSymbolWidths] = useState<Map<string, number>>(new Map());

    // Font config - extract base font family for Skia (e.g., "Inter_600SemiBold" -> "Inter")
    const fontKey = textProps?.font === 'inherit' ? 'body' : (textProps?.font ?? 'body');
    const fontSize = theme.fontSize[fontKey];
    const rawFontFamily = theme.fontFamily[fontKey];
    const fontFamilies = useMemo(() => getFontFamiliesForSkia(rawFontFamily), [rawFontFamily]);
    const fontWeight = useMemo(() => extractFontWeight(rawFontFamily), [rawFontFamily]);

    // Resolve text colors from theme - infer from textProps.color token or use defaults
    const colorToken = textProps?.color ?? 'fg';
    const baseColor = theme.color[colorToken] ?? theme.color.fg ?? '#000000';
    const positiveColor = theme.color.fgPositive ?? '#00FF00';
    const negativeColor = theme.color.fgNegative ?? '#FF0000';

    // Derive formatted display string for meaningful change detection
    const formatted = useMemo(() => {
      if (formattedValue) return formattedValue;
      return intlNumberParts.map((part) => String(part.value)).join('');
    }, [formattedValue, intlNumberParts]);

    // Color pulse state (discrete: base, positive, or negative - not continuously animated)
    const colorState = useColorPulseState({
      value,
      formatted,
      direction,
      colorPulseOnUpdate,
      pulseDuration: 500,
    });

    const digitHeight = digitHeightProp ?? measured?.height ?? 0;
    const digitWidth = measured?.width ?? 0;

    // Parse display parts
    const displayParts = useMemo(() => {
      if (formattedValue) {
        return formattedValue.split('').map((char, i) => ({
          key: `c${i}`,
          char,
          isDigit: isDigitChar(char),
          digitValue: isDigitChar(char) ? parseInt(char, 10) : undefined,
        }));
      }
      return intlNumberParts.map((part) => ({
        key: part.key,
        char: String(part.value),
        isDigit:
          (part.type === 'integer' || part.type === 'fraction') && typeof part.value === 'number',
        digitValue:
          (part.type === 'integer' || part.type === 'fraction') && typeof part.value === 'number'
            ? part.value
            : undefined,
      }));
    }, [formattedValue, intlNumberParts]);

    // Pre-build paragraph pools for all 3 color states (base, positive, negative)
    // This avoids rebuilding during color pulse - just switch which pool we use
    const digitParagraphPool = useMemo(() => {
      if (!digitWidth || !fontSize) return null;
      const baseSkColor = Skia.Color(toHexColor(baseColor));
      const positiveSkColor = Skia.Color(toHexColor(positiveColor));
      const negativeSkColor = Skia.Color(toHexColor(negativeColor));
      return {
        base: buildDigitParagraphs(fontFamilies, fontSize, fontWeight, baseSkColor, digitWidth),
        positive: buildDigitParagraphs(
          fontFamilies,
          fontSize,
          fontWeight,
          positiveSkColor,
          digitWidth,
        ),
        negative: buildDigitParagraphs(
          fontFamilies,
          fontSize,
          fontWeight,
          negativeSkColor,
          digitWidth,
        ),
      };
    }, [fontFamilies, fontSize, fontWeight, digitWidth, baseColor, positiveColor, negativeColor]);

    // Select current digit paragraphs based on color state
    const digitParagraphs = digitParagraphPool?.[colorState] ?? null;

    // Get unique symbol characters that need measurement
    const symbolsToMeasure = useMemo(() => {
      const symbols: { key: string; char: string }[] = [];
      for (const part of displayParts) {
        if (!part.isDigit && !symbolWidths.has(part.key)) {
          symbols.push({ key: part.key, char: part.char });
        }
      }
      return symbols;
    }, [displayParts, symbolWidths]);

    // Check if all symbols are measured
    const allSymbolsMeasured = useMemo(() => {
      for (const part of displayParts) {
        if (!part.isDigit && !symbolWidths.has(part.key)) {
          return false;
        }
      }
      return true;
    }, [displayParts, symbolWidths]);

    // Pre-build symbol paragraph pools for all 3 color states
    // Uses measured RN Text widths for layout consistency with fallback
    const symbolParagraphPool = useMemo(() => {
      if (!fontSize || !allSymbolsMeasured) return null;
      const baseSkColor = Skia.Color(toHexColor(baseColor));
      const positiveSkColor = Skia.Color(toHexColor(positiveColor));
      const negativeSkColor = Skia.Color(toHexColor(negativeColor));

      const buildSymbolMap = (color: SkColor) => {
        const map = new Map<string, { paragraph: SkParagraph; width: number }>();
        for (const part of displayParts) {
          if (!part.isDigit) {
            const para = buildSymbolParagraph(part.char, fontFamilies, fontSize, fontWeight, color);
            // Use RN Text measured width, not Skia's getMaxIntrinsicWidth()
            const measuredWidth = symbolWidths.get(part.key) ?? 0;
            map.set(part.key, { paragraph: para, width: measuredWidth });
          }
        }
        return map;
      };

      return {
        base: buildSymbolMap(baseSkColor),
        positive: buildSymbolMap(positiveSkColor),
        negative: buildSymbolMap(negativeSkColor),
      };
    }, [
      displayParts,
      fontFamilies,
      fontSize,
      fontWeight,
      baseColor,
      positiveColor,
      negativeColor,
      allSymbolsMeasured,
      symbolWidths,
    ]);

    // Select current symbol paragraphs based on color state
    const symbolParagraphs = symbolParagraphPool?.[colorState];
    const symbolParagraphsMap = useMemo(() => symbolParagraphs ?? new Map(), [symbolParagraphs]);

    // Persistent ref for digit positions (animations)
    const digitPositionsRef = useRef<
      Map<string, { positionY: SharedValue<number>; value: number }>
    >(new Map());

    // Layout calculation - returns stable column layout array
    const { columns, totalWidth } = useMemo(() => {
      if (!digitWidth || !digitHeight || !fontSize) {
        return { columns: [] as ColumnLayout[], totalWidth: 0 };
      }

      const cols: ColumnLayout[] = [];
      let x = 0;
      let digitIndex = 0;
      let symbolIndex = 0;

      for (const part of displayParts) {
        if (part.isDigit && part.digitValue !== undefined) {
          // Get or create position SharedValue
          let posData = digitPositionsRef.current.get(part.key);
          if (!posData) {
            posData = {
              positionY: makeMutable(part.digitValue * -digitHeight),
              value: part.digitValue,
            };
            digitPositionsRef.current.set(part.key, posData);
          } else if (posData.value !== part.digitValue) {
            // Animate to new position
            const targetY = part.digitValue * -digitHeight;
            const yConfig = transitionConfig?.y ?? defaultTransitionConfig.y;
            posData.positionY.value =
              yConfig?.type === 'timing'
                ? withTiming(targetY, yConfig)
                : withSpring(targetY, yConfig);
            posData.value = part.digitValue;
          }

          cols.push({ type: 'digit', key: part.key, x, width: digitWidth, index: digitIndex++ });
          x += digitWidth;
        } else {
          // Get symbol width from pre-built map
          const symData = symbolParagraphsMap.get(part.key);
          const symWidth = symData?.width ?? 0;

          cols.push({
            type: 'symbol',
            key: part.key,
            x,
            width: symWidth,
            index: symbolIndex++,
          });
          x += symWidth;
        }
      }

      return { columns: cols, totalWidth: x };
    }, [displayParts, digitWidth, digitHeight, fontSize, symbolParagraphsMap, transitionConfig?.y]);

    // Build digit column data array (stable references)
    const digitColumnData = useMemo(() => {
      return columns
        .filter((c) => c.type === 'digit')
        .map((c) => {
          const posData = digitPositionsRef.current.get(c.key)!;
          return { x: c.x, positionY: posData.positionY };
        });
    }, [columns]);

    // Build symbol data array (filter out any missing symbols for safety)
    const symbolData = useMemo(() => {
      return columns
        .filter((c) => c.type === 'symbol')
        .map((c) => {
          const symData = symbolParagraphsMap.get(c.key);
          if (!symData) return null;
          return { x: c.x, paragraph: symData.paragraph, width: symData.width };
        })
        .filter((s): s is NonNullable<typeof s> => s !== null);
    }, [columns, symbolParagraphsMap]);

    // Cleanup stale digit position entries
    useEffect(() => {
      const currentDigitKeys = new Set(displayParts.filter((p) => p.isDigit).map((p) => p.key));
      for (const key of digitPositionsRef.current.keys()) {
        if (!currentDigitKeys.has(key)) digitPositionsRef.current.delete(key);
      }
    }, [displayParts]);

    // Measurement element for digit dimensions - only render until measured
    const measureElement = useMemo(
      () =>
        !measured ? (
          <Text
            onLayout={(e) => {
              const layout = e?.nativeEvent?.layout;
              if (layout?.width !== undefined && layout?.height !== undefined) {
                setMeasured({
                  width: layout.width,
                  height: layout.height,
                });
              }
            }}
            style={{ position: 'absolute', opacity: 0 }}
            {...textProps}
          >
            0
          </Text>
        ) : null,
      [measured, textProps],
    );

    // Measurement elements for symbol widths - render until all symbols are measured
    const symbolMeasureElements = useMemo(
      () =>
        symbolsToMeasure.map((sym) => (
          <Text
            key={`measure-${sym.key}`}
            onLayout={(e) => {
              const width = e?.nativeEvent?.layout?.width;
              if (width !== undefined) {
                setSymbolWidths((prev) => {
                  const next = new Map(prev);
                  next.set(sym.key, width);
                  return next;
                });
              }
            }}
            style={{ position: 'absolute', opacity: 0 }}
            {...textProps}
          >
            {sym.char}
          </Text>
        )),
      [symbolsToMeasure, textProps],
    );

    const containerStyle = useMemo(() => [style, styles?.root], [style, styles?.root]);

    // Count expected symbols
    const expectedSymbolCount = useMemo(
      () => displayParts.filter((p) => !p.isDigit).length,
      [displayParts],
    );

    // Check if Skia is ready to render
    const skiaReady =
      !!measured &&
      !!allSymbolsMeasured &&
      !!digitParagraphs &&
      !!symbolParagraphPool &&
      symbolData.length === expectedSymbolCount &&
      totalWidth > 0;
    const [removeFallback, setRemoveFallback] = useState(false);
    useEffect(() => {
      if (skiaReady) {
        setTimeout(() => {
          setRemoveFallback(true);
        }, 100);
      }
    }, [skiaReady]);

    // Calculate vertical offset to align Skia text with RN Text baseline
    const skiaParaHeight = digitParagraphs ? (digitParagraphs[0]?.getHeight() ?? digitHeight) : 0;
    const verticalOffset = digitParagraphs ? (digitHeight - skiaParaHeight) / 2 : 0;

    const canvasStyle = useMemo(
      (): ViewStyle => ({
        position: 'absolute',
        width: totalWidth,
        height: digitHeight,
      }),
      [totalWidth, digitHeight],
    );

    // Fallback content provides layout sizing for the HStack.
    // Always use current displayParts so layout updates when number changes.
    // When Skia is ready, make fallback invisible but keep it for layout.
    const fallbackContent = useMemo(() => {
      return displayParts.map((p) => (
        <Text key={p.key} style={removeFallback ? { opacity: 0 } : undefined} {...textProps}>
          {p.char}
        </Text>
      ));
    }, [removeFallback, displayParts, textProps]);

    const digitsAndSymbols = useMemo(() => {
      return (
        <>
          {digitColumnData.map((data, i) => (
            <AnimatedDigitGroup
              key={i}
              data={data}
              height={digitHeight}
              paragraphs={digitParagraphs ?? []}
              width={digitWidth}
            />
          ))}
          {symbolData.map((s, i) => (
            <Paragraph key={`s${i}`} paragraph={s.paragraph} width={s.width} x={s.x} y={0} />
          ))}
        </>
      );
    }, [digitColumnData, digitHeight, digitParagraphs, digitWidth, symbolData]);

    return (
      <HStack
        ref={ref}
        alignItems="center"
        justifyContent={justifyContent}
        style={containerStyle}
        {...viewProps}
      >
        {measureElement}
        {symbolMeasureElements}
        {fallbackContent}
        {/* Skia Canvas - overlaid on top, only rendered when ready */}
        {skiaReady && digitParagraphs && (
          <Canvas style={canvasStyle}>
            <Group transform={[{ translateY: verticalOffset }]}>{digitsAndSymbols}</Group>
          </Canvas>
        )}
      </HStack>
    );
  }),
);
