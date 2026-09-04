import React, { memo, useCallback, useMemo, useState } from 'react';
import { useTheme } from '@coinbase/cds-web';
import { Button, IconButton } from '@coinbase/cds-web/buttons';
import { HStack, VStack } from '@coinbase/cds-web/layout';
import { Text } from '@coinbase/cds-web/typography';

import { ColorPicker } from './ColorPicker';
import type { ExtractedColor, Spectrum, TokenMatch } from './colorUtils';
import {
  aaTextColor,
  contrastRatio,
  enforceAA,
  findBestDarkToken,
  findClosestPrimitiveHueAware,
  findHighContrastPair,
  hexToRGB,
  parseMultiColor,
  parseRGB,
  processImageFile,
  toHex,
  tokenHex,
} from './colorUtils';
import { ResultCard } from './ResultCard';
import type { ResultEntry, Screen } from './types';
import { UploadZone } from './UploadZone';

type ExportEntry = {
  label: string;
  light: { token: string; hex: string; textColor: { token: string; hex: string } };
  dark: { token: string; hex: string; textColor: { token: string; hex: string } };
  buttonStates: {
    light: { hover: string; pressed: string };
    dark: { hover: string; pressed: string };
  };
};

function blendWithBlack(hex: string, amount: number): string {
  const { r, g, b } = hexToRGB(hex);
  const nr = Math.round(r * (1 - amount));
  const ng = Math.round(g * (1 - amount));
  const nb = Math.round(b * (1 - amount));
  return toHex({ r: nr, g: ng, b: nb });
}

// Returns the CDS gray token to use for text on top of `swatchHex` in the given spectrum.
// gray0/gray100 are inverted between light and dark spectrums, so the token name depends on mode.
function swatchTextToken(
  swatchHex: string,
  spectrum: Spectrum,
  white: string,
  black: string,
): { token: string; hex: string } {
  const needsWhite = contrastRatio(swatchHex, white) >= contrastRatio(swatchHex, black);
  const gray0Hex = toHex(parseRGB(spectrum['gray0']));
  const gray0IsWhite = gray0Hex.toLowerCase() === white.toLowerCase();
  const token = needsWhite === gray0IsWhite ? 'gray0' : 'gray100';
  return { token, hex: toHex(parseRGB(spectrum[token])) };
}

function computeExportEntry(
  result: ResultEntry,
  contrastMode: 'default' | 'high',
  lightSpectrum: Spectrum,
  darkSpectrum: Spectrum,
): ExportEntry {
  const white = toHex(parseRGB(lightSpectrum.gray0));
  const black = toHex(parseRGB(darkSpectrum.gray0));

  let lightToken = '';
  let lightHex = '';
  let darkToken = '';
  let darkHex = '';

  const c0 = result.colors?.[0];
  if (c0) {
    const lightMatch = findClosestPrimitiveHueAware(c0.r, c0.g, c0.b, lightSpectrum);
    lightToken = lightMatch.token;
    lightHex = lightMatch.hex;
    const darkMatch = findBestDarkToken(c0, lightMatch, darkSpectrum);
    darkToken = darkMatch.token;
    darkHex = darkMatch.hex;
  } else {
    let fg: TokenMatch, bg: TokenMatch;
    if (contrastMode === 'high') {
      const hc = findHighContrastPair(result.primary, lightSpectrum);
      fg = hc.fg;
      bg = hc.bg;
    } else {
      const enforced = enforceAA(result.primary, result.secondary, lightSpectrum);
      fg = enforced.primary;
      bg = enforced.secondary;
    }
    void fg;
    lightToken = bg.token;
    lightHex = bg.hex;
    darkToken = bg.token;
    darkHex = tokenHex(bg.token, darkSpectrum);
  }

  return {
    label: result.filename,
    light: {
      token: lightToken,
      hex: lightHex,
      textColor: swatchTextToken(lightHex, lightSpectrum, white, black),
    },
    dark: {
      token: darkToken,
      hex: darkHex,
      textColor: swatchTextToken(darkHex, darkSpectrum, white, black),
    },
    buttonStates: {
      light: { hover: blendWithBlack(lightHex, 0.12), pressed: blendWithBlack(lightHex, 0.24) },
      dark: { hover: blendWithBlack(darkHex, 0.12), pressed: blendWithBlack(darkHex, 0.24) },
    },
  };
}

export const ColorPairingTool = memo(function ColorPairingTool() {
  const theme = useTheme();
  const lightSpectrum = theme.lightSpectrum as Spectrum;
  const darkSpectrum = theme.darkSpectrum as Spectrum;

  const [screen, setScreen] = useState<Screen>('idle');
  const [results, setResults] = useState<ResultEntry[]>([]);
  const [currentResultIdx, setCurrentResultIdx] = useState(0);
  const [progress, setProgress] = useState({ current: 0, total: 0 });
  const [error, setError] = useState<string | undefined>();

  const currentResult = results[currentResultIdx] ?? null;

  // ── Image Upload Flow ──────────────────────────────────────────────
  const handleFiles = useCallback(
    async (files: File[]) => {
      const ALLOWED_TYPES = ['image/png', 'image/jpeg', 'image/webp'];
      const imageFiles = files.filter((f) => ALLOWED_TYPES.includes(f.type));
      if (imageFiles.length === 0) {
        setError('Please upload image files (PNG, JPG, or WebP).');
        return;
      }

      const capped = imageFiles.slice(0, 10);
      setScreen('loading');
      setError(undefined);
      setProgress({ current: 0, total: capped.length });

      try {
        const processed: ResultEntry[] = [];
        const startTime = Date.now();

        for (let i = 0; i < capped.length; i++) {
          setProgress({ current: i + 1, total: capped.length });
          await new Promise<void>((r) =>
            requestAnimationFrame(() => requestAnimationFrame(() => r())),
          );
          try {
            const img = await processImageFile(capped[i], lightSpectrum);
            processed.push({
              filename: img.filename,
              imgSrc: img.imgSrc,
              imgDataURL: img.imgDataURL,
              imgWidth: img.imgWidth,
              imgHeight: img.imgHeight,
              colors: img.colors,
              manualRaw: undefined,
              primary: img.primary,
              secondary: img.secondary,
            });
          } catch (err) {
            console.warn('Skipped ' + capped[i].name + ':', (err as Error).message);
          }
        }

        const elapsed = Date.now() - startTime;
        if (elapsed < 600) await new Promise((r) => setTimeout(r, 600 - elapsed));

        if (processed.length === 0) {
          setScreen('idle');
          setError('Could not process any of the uploaded images. Please try different files.');
          setProgress({ current: 0, total: 0 });
          return;
        }

        setResults(processed);
        setCurrentResultIdx(0);
        setScreen('result');
        setProgress({ current: 0, total: 0 });
      } catch {
        setScreen('idle');
        setError('Something went wrong while processing. Please try again.');
        setProgress({ current: 0, total: 0 });
      }
    },
    [lightSpectrum],
  );

  // ── Manual Color Flow ──────────────────────────────────────────────
  const handleManualApply = useCallback(
    (inputValue: string) => {
      const sp = lightSpectrum;
      const cols = parseMultiColor(inputValue);
      if (!cols.length) return;

      const manualResults: ResultEntry[] = cols.map((col) => {
        const bgMatch = findClosestPrimitiveHueAware(col.r, col.g, col.b, sp);
        const fgHex = aaTextColor(bgMatch.hex);
        const fgToken =
          contrastRatio(bgMatch.hex, tokenHex('gray0', sp)) >=
          contrastRatio(bgMatch.hex, tokenHex('gray100', sp))
            ? 'gray0'
            : 'gray100';
        const rawHex = toHex(col);
        return {
          filename: 'Manual — ' + rawHex,
          imgSrc: undefined,
          imgDataURL: undefined,
          imgWidth: 0,
          imgHeight: 0,
          colors: undefined,
          manualRaw: { hex: rawHex, r: col.r, g: col.g, b: col.b },
          primary: { token: fgToken, hex: fgHex },
          secondary: bgMatch,
        };
      });

      setResults(manualResults);
      setCurrentResultIdx(0);
      setScreen('result');
      setError(undefined);
    },
    [lightSpectrum],
  );

  // ── Hotspot Resample ───────────────────────────────────────────────
  const handleResampleBg = useCallback(
    (color: ExtractedColor, secondary: TokenMatch) => {
      setResults((prev) =>
        prev.map((r, i) => {
          if (i !== currentResultIdx) return r;
          const newColors = r.colors ? [...r.colors] : [];
          newColors[0] = color;
          return { ...r, colors: newColors, secondary };
        }),
      );
    },
    [currentResultIdx],
  );

  const handleReset = useCallback(() => {
    setScreen('idle');
    setResults([]);
    setCurrentResultIdx(0);
    setProgress({ current: 0, total: 0 });
    setError(undefined);
  }, []);

  const handlePrev = useCallback(() => {
    setCurrentResultIdx((prev) => Math.max(0, prev - 1));
  }, []);

  const handleNext = useCallback(() => {
    setCurrentResultIdx((prev) => Math.min(results.length - 1, prev + 1));
  }, [results.length]);

  // ── Export Data ────────────────────────────────────────────────────
  const exportEntries = useMemo(
    () => results.map((r) => computeExportEntry(r, 'default', lightSpectrum, darkSpectrum)),
    [results, lightSpectrum, darkSpectrum],
  );

  const exportJson = useMemo(() => {
    const payload = {
      generated: new Date().toISOString(),
      results: exportEntries.map((entry, i) => ({
        source: `Image ${i + 1} — ${entry.label}`,
        light: { token: entry.light.token, hex: entry.light.hex, textColor: entry.light.textColor },
        dark: { token: entry.dark.token, hex: entry.dark.hex, textColor: entry.dark.textColor },
        button: {
          light: {
            hover: entry.buttonStates.light.hover,
            pressed: entry.buttonStates.light.pressed,
          },
          dark: { hover: entry.buttonStates.dark.hover, pressed: entry.buttonStates.dark.pressed },
        },
      })),
    };
    return JSON.stringify(payload, null, 2);
  }, [exportEntries]);

  const handleExportDownload = useCallback(() => {
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([exportJson], { type: 'application/json' }));
    a.download = 'spectrum-pairing.json';
    a.click();
    URL.revokeObjectURL(a.href);
  }, [exportJson]);

  const isInputVisible = screen === 'idle' || screen === 'loading';
  const isResultVisible = screen === 'result';
  const showCarousel = results.length > 1;

  return (
    <VStack
      as="section"
      background="bgAlternate"
      borderBottomLeftRadius={500}
      borderBottomRightRadius={500}
      borderTopLeftRadius={500}
      borderTopRightRadius={500}
      gap={4}
      paddingBottom={4}
      paddingTop={3}
      paddingX={{ base: 4, phone: 2 }}
      width="100%"
    >
      {isInputVisible && (
        <>
          <UploadZone
            error={error}
            isLoading={screen === 'loading'}
            onFiles={handleFiles}
            progress={progress}
          />
          {screen !== 'loading' && <ColorPicker onApply={handleManualApply} />}
        </>
      )}

      {isResultVisible && currentResult && (
        <VStack gap={2}>
          <HStack alignItems="center" flexWrap="wrap" justifyContent="space-between">
            <Button
              compact
              transparent
              onClick={handleReset}
              startIcon="backArrow"
              style={{ marginLeft: -12 }}
              variant="secondary"
            >
              Start over
            </Button>
            {showCarousel && (
              <HStack
                alignItems="center"
                gap={1}
                justifyContent="center"
                style={{ order: 3, width: '100%' }}
              >
                <IconButton
                  compact
                  transparent
                  accessibilityLabel="Previous"
                  disabled={currentResultIdx === 0}
                  name="caretLeft"
                  onClick={handlePrev}
                />
                <Text color="fgMuted" font="label1">
                  {currentResultIdx + 1} / {results.length}
                </Text>
                <IconButton
                  compact
                  transparent
                  accessibilityLabel="Next"
                  disabled={currentResultIdx === results.length - 1}
                  name="caretRight"
                  onClick={handleNext}
                />
              </HStack>
            )}
            <Button
              compact
              transparent
              endIcon="download"
              onClick={handleExportDownload}
              variant="secondary"
            >
              Export JSON
            </Button>
          </HStack>
          <ResultCard
            key={currentResultIdx}
            onResampleBg={handleResampleBg}
            result={currentResult}
          />
        </VStack>
      )}
    </VStack>
  );
});
