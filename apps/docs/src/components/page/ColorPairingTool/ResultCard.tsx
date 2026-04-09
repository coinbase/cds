import React, { memo, useMemo } from 'react';
import type { ThemeVars } from '@coinbase/cds-common/core/theme';
import { useTheme } from '@coinbase/cds-web';
import { Card } from '@coinbase/cds-web/cards';
import { Box, Divider, HStack, VStack } from '@coinbase/cds-web/layout';
import { Text } from '@coinbase/cds-web/typography';

import type { ExtractedColor, Spectrum, TokenMatch } from './colorUtils';
import {
  aaTextColor,
  contrastRatio,
  enforceAA,
  findBestDarkToken,
  findClosestPrimitiveHueAware,
  findHighContrastPair,
  parseRGB,
  toHex,
  tokenHex,
} from './colorUtils';
import { ComponentPlayground } from './ComponentPlayground';
import { ContrastPanel } from './ContrastPanel';
import { HotspotImagePreview } from './HotspotImagePreview';
import type { ResultEntry } from './types';

const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));

type ResultCardProps = {
  result: ResultEntry;
  onResampleBg: (color: ExtractedColor, secondary: TokenMatch) => void;
};

export const ResultCard = memo(function ResultCard({ result, onResampleBg }: ResultCardProps) {
  const theme = useTheme();
  const lightSpectrum = theme.lightSpectrum as Spectrum;
  const darkSpectrum = theme.darkSpectrum as Spectrum;

  const { bg } = useMemo(() => {
    const enforced = enforceAA(result.primary, result.secondary, lightSpectrum);
    return { bg: enforced.secondary };
  }, [result.primary, result.secondary, lightSpectrum]);

  const { lh2, lightToken, dh2, darkToken, selectedImgX, selectedImgY } = useMemo(() => {
    const c0 = result.colors?.[0];
    if (c0) {
      const lightMatch = findClosestPrimitiveHueAware(c0.r, c0.g, c0.b, lightSpectrum);
      const darkMatch = findBestDarkToken(c0, lightMatch, darkSpectrum);
      return {
        lh2: lightMatch.hex,
        lightToken: lightMatch.token,
        dh2: darkMatch.hex,
        darkToken: darkMatch.token,
        selectedImgX: c0.imgX,
        selectedImgY: c0.imgY,
      };
    }

    if (result.manualRaw) {
      const lightMatch = findClosestPrimitiveHueAware(
        result.manualRaw.r,
        result.manualRaw.g,
        result.manualRaw.b,
        lightSpectrum,
      );
      const darkMatch = findBestDarkToken(result.manualRaw, lightMatch, darkSpectrum);
      return {
        lh2: lightMatch.hex,
        lightToken: lightMatch.token,
        dh2: darkMatch.hex,
        darkToken: darkMatch.token,
        selectedImgX: 0.5,
        selectedImgY: 0.5,
      };
    }

    return {
      lh2: tokenHex(bg.token, lightSpectrum),
      lightToken: bg.token,
      dh2: tokenHex(bg.token, darkSpectrum),
      darkToken: bg.token,
      selectedImgX: 0.5,
      selectedImgY: 0.5,
    };
  }, [result.colors, result.manualRaw, bg.token, lightSpectrum, darkSpectrum]);

  const isImage = Boolean(result.imgSrc && result.colors);

  // Clamp initial hotspot position away from edges so the label is always visible
  const hotspotX = clamp(selectedImgX, 0.25, 0.75) * 100;
  const hotspotY = clamp(selectedImgY, 0.25, 0.75) * 100;

  return (
    <Card style={{ borderRadius: 16, overflow: 'hidden' }}>
      <VStack gap={0}>
        <HStack
          alignItems="stretch"
          flexDirection={{ base: 'column', tablet: 'row', desktop: 'row' }}
          minHeight={{ base: 0, tablet: 240, desktop: 240 }}
          style={{ borderBottom: '1px solid var(--cds-line)' }}
        >
          {/* Left: image preview or manual color swatch */}
          <Box
            alignItems="center"
            display="flex"
            height={{ base: 200, tablet: 'auto', desktop: 'auto' }}
            justifyContent="center"
            padding={isImage ? 3 : 4}
            paddingBottom={{ base: 0, tablet: isImage ? 3 : 4, desktop: isImage ? 3 : 4 }}
            position="relative"
            style={{
              flexShrink: 0,
              overflow: 'hidden',
              background: isImage ? result.primary.hex : undefined,
            }}
            width={{ base: '100%', tablet: '50%', desktop: '50%' }}
          >
            {isImage ? (
              <HotspotImagePreview
                hotspotColor={lh2}
                hotspotX={hotspotX}
                hotspotY={hotspotY}
                imgDataURL={result.imgDataURL!}
                imgHeight={result.imgHeight}
                imgSrc={result.imgSrc!}
                imgWidth={result.imgWidth}
                onResample={onResampleBg}
              />
            ) : result.manualRaw ? (
              <Box
                borderRadius={200}
                padding={2}
                style={{
                  background: result.manualRaw.hex,
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column' as const,
                  justifyContent: 'flex-start',
                }}
              >
                <Text font="label1" style={{ color: aaTextColor(result.manualRaw.hex) }}>
                  Input color
                </Text>
                <Text font="label2" style={{ color: aaTextColor(result.manualRaw.hex) }}>
                  {result.manualRaw.hex.toUpperCase()}
                </Text>
              </Box>
            ) : null}
          </Box>

          <Divider
            direction="vertical"
            display={{ base: 'none', tablet: 'flex', desktop: 'flex' }}
          />

          {/* Right: light/dark contrast panels */}
          <ContrastPanel
            darkHex={dh2}
            darkToken={darkToken}
            lightHex={lh2}
            lightToken={lightToken}
          />
        </HStack>

        <Divider />

        {/* Component playground */}
        <ComponentPlayground
          darkHex={dh2}
          darkToken={darkToken as ThemeVars.SpectrumColor}
          imgSrc={result.imgSrc ?? null}
          lightHex={lh2}
          lightToken={lightToken as ThemeVars.SpectrumColor}
        />
      </VStack>
    </Card>
  );
});
