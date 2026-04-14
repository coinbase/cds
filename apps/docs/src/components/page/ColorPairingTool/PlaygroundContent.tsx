import React, { memo } from 'react';
import type { ThemeVars } from '@coinbase/cds-common/core/theme';
import { useTheme } from '@coinbase/cds-web';
import { Button, IconButton } from '@coinbase/cds-web/buttons';
import { Card, MessagingCard } from '@coinbase/cds-web/cards';
import { Box, HStack, VStack } from '@coinbase/cds-web/layout';
import { Tag } from '@coinbase/cds-web/tag';
import { Text } from '@coinbase/cds-web/typography';
import { LineChart, Scrubber, SolidLine } from '@coinbase/cds-web-visualization';

import CheckerboardSvg from './checkerboard.svg';
import { aaTextColor } from './colorUtils';
const CHART_DATA_PRIMARY = [10, 22, 29, 45, 98, 45, 22, 52, 21, 4, 68, 20, 21, 58];
const CHART_DATA_SECONDARY = [5, 18, 35, 28, 55, 70, 48, 62, 38, 15, 42, 55, 30, 45];

export type PlaygroundContentProps = {
  selectedToken: ThemeVars.SpectrumColor;
  selectedHex: string;
  imgSrc: string | null;
};

export const PlaygroundContent = memo(function PlaygroundContent({
  selectedToken,
  selectedHex,
  imgSrc,
}: PlaygroundContentProps) {
  const theme = useTheme();

  const spectrumRgb = theme.spectrum[selectedToken];
  const pColor = spectrumRgb ? `rgb(${spectrumRgb})` : selectedHex;

  const pText = aaTextColor(selectedHex);
  const pButtonBg = pText;
  const pButtonText = aaTextColor(pButtonBg);

  return (
    <Box
      background="bgAlternate"
      borderRadius={200}
      padding={3}
      style={{ transition: 'background 0.2s ease' }}
    >
      <VStack gap={3} width="100%">
        <HStack alignItems="center" flexWrap="wrap" gap={2}>
          <Button
            compact
            onClick={() => {}}
            style={{ backgroundColor: pColor, color: pText, borderColor: pColor }}
          >
            Button
          </Button>
          <IconButton
            accessibilityLabel="Add"
            name="add"
            style={{ background: pColor, color: pText, borderColor: pColor }}
          />
          <Tag
            emphasis="high"
            intent="promotional"
            style={{
              background: pColor,
              color: pText,
              ['--cds-fg' as string]: pText,
              ['--cds-fgPrimary' as string]: pText,
            }}
          >
            <span style={{ color: pText }}>Promo Tag</span>
          </Tag>
        </HStack>

        <HStack
          alignItems="stretch"
          flexDirection={{ base: 'column', tablet: 'row', desktop: 'row' }}
          gap={2}
          height={{ base: 'auto', tablet: 200, desktop: 200 }}
          width="100%"
        >
          <Box
            display="flex"
            height={{ base: 200, tablet: 'auto', desktop: 'auto' }}
            minWidth={0}
            style={{ flex: '1 1 0' }}
            width={{ base: '100%', tablet: 'auto', desktop: 'auto' }}
          >
            <MessagingCard
              action={
                <Button
                  compact
                  onClick={() => {}}
                  style={{ background: pButtonBg, color: pButtonText, borderColor: pButtonBg }}
                  variant="secondary"
                >
                  Learn more
                </Button>
              }
              description="Add up to 3 lines of body copy. Be concise."
              media={
                imgSrc ? (
                  <img
                    alt=""
                    src={imgSrc}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                ) : (
                  <CheckerboardSvg
                    aria-hidden="true"
                    preserveAspectRatio="xMidYMid slice"
                    style={{ width: '100%', height: '100%', display: 'block' }}
                  />
                )
              }
              mediaPlacement="end"
              styles={{
                root: {
                  height: '100%',
                  background: pColor,
                  ['--color-fgInverse' as string]: pText,
                  ['--color-bgPrimary' as string]: pColor,
                },
                contentContainer: {
                  justifyContent: 'space-between',
                  flex: '1 1 0',
                  minWidth: 0,
                },
                mediaContainer: { maxWidth: '45%' },
              }}
              title="Title"
              type="upsell"
              width="100%"
            />
          </Box>

          <Box
            display="flex"
            height={{ base: 200, tablet: 'auto', desktop: 'auto' }}
            minWidth={0}
            style={{ flex: '1 1 0' }}
            width={{ base: '100%', tablet: 'auto', desktop: 'auto' }}
          >
            <Card background="bg" borderRadius={500} style={{ height: '100%', width: '100%' }}>
              <VStack gap={1}>
                <Box padding={2}>
                  <HStack alignItems="center" gap={1}>
                    <Box
                      borderRadius={1000}
                      height={36}
                      style={{ background: pColor, flexShrink: 0, overflow: 'hidden' }}
                      width={36}
                    >
                      {imgSrc && (
                        <img
                          alt=""
                          src={imgSrc}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      )}
                    </Box>
                    <VStack gap={0}>
                      <Text color="fgMuted" font="legal">
                        Subtitle
                      </Text>
                      <HStack alignItems="center" gap={0.5}>
                        <Text font="headline">Title</Text>
                        <Text color="fgPositive" font="label2">
                          ↗ 25.25%
                        </Text>
                      </HStack>
                    </VStack>
                  </HStack>
                </Box>
                <LineChart
                  enableScrubbing
                  accessibilityLabel="Sample line chart"
                  height={110}
                  series={[
                    { id: 'primary', data: CHART_DATA_PRIMARY, color: pColor },
                    { id: 'secondary', data: CHART_DATA_SECONDARY, color: theme.color.fg },
                  ]}
                  xAxis={{ range: ({ min, max }) => ({ min, max: max - 8 }) }}
                >
                  <Scrubber
                    hideOverlay
                    idlePulse
                    LineComponent={SolidLine}
                    accessibilityLabel="Scrub chart data"
                  />
                </LineChart>
              </VStack>
            </Card>
          </Box>
        </HStack>
      </VStack>
    </Box>
  );
});
