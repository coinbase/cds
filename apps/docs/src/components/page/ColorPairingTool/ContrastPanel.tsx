import React, { memo, useMemo } from 'react';
import { useTheme } from '@coinbase/cds-web';
import { Icon } from '@coinbase/cds-web/icons';
import { Box, HStack, VStack } from '@coinbase/cds-web/layout';
import { Text } from '@coinbase/cds-web/typography';

import type { Spectrum } from './colorUtils';
import { aaTextColor, contrastRatio, wcagLevels } from './colorUtils';
import { WcagBadge } from './WcagBadge';

type ContrastRowProps = {
  label: string;
  modeBg: string;
  swatchHex: string;
  token: string;
};

const ContrastRow = memo(function ContrastRow({
  label,
  modeBg,
  swatchHex,
  token,
}: ContrastRowProps) {
  const textColor = aaTextColor(swatchHex);
  const ratio = contrastRatio(swatchHex, textColor);
  const levels = wcagLevels(ratio);

  return (
    <HStack alignItems="stretch" background="bgSecondary" borderRadius={200} gap={2} padding={2}>
      <Box
        bordered
        alignItems="center"
        borderRadius={200}
        justifyContent="center"
        padding={1}
        style={{
          background: modeBg,
        }}
        width={72}
      >
        <Box
          alignItems="center"
          borderRadius={200}
          display="flex"
          flexGrow={1}
          height="100%"
          justifyContent="center"
          style={{ background: swatchHex }}
          width="100%"
        >
          <Text font="title3" style={{ color: textColor }}>
            Aa
          </Text>
        </Box>
      </Box>
      <VStack gap={1} justifyContent="flex-start">
        <VStack gap={0.25}>
          <Text color="fgMuted" font="label1">
            {label}
          </Text>
          <Text font="title3">{token}</Text>
        </VStack>
        <HStack alignItems="baseline" gap={0.5}>
          <Text font="title4">{ratio.toFixed(2)}</Text>
          <Text color="fg" font="label1">
            :1
          </Text>
        </HStack>
        <HStack flexWrap="wrap" gap={1}>
          <WcagBadge label="AA Normal" passes={levels.aaNormal} />
          <WcagBadge label="AA Large" passes={levels.aaLarge} />
        </HStack>
      </VStack>
    </HStack>
  );
});

type ContrastPanelProps = {
  lightToken: string;
  lightHex: string;
  darkToken: string;
  darkHex: string;
};

export const ContrastPanel = memo(function ContrastPanel({
  lightToken,
  lightHex,
  darkToken,
  darkHex,
}: ContrastPanelProps) {
  const theme = useTheme();
  const lightSpectrum = theme.lightSpectrum as Spectrum;
  const darkSpectrum = theme.darkSpectrum as Spectrum;
  const lightBg = useMemo(() => `rgb(${lightSpectrum.gray0})`, [lightSpectrum]);
  const darkBg = useMemo(() => `rgb(${darkSpectrum.gray5})`, [darkSpectrum]);

  return (
    <VStack flexGrow={1} padding={2}>
      <VStack gap={1.5} padding={2}>
        <ContrastRow label="Light mode" modeBg={lightBg} swatchHex={lightHex} token={lightToken} />
        <ContrastRow label="Dark mode" modeBg={darkBg} swatchHex={darkHex} token={darkToken} />
      </VStack>
      <HStack alignItems="center" gap={0.5} paddingBottom={2} paddingTop={0} paddingX={2}>
        <Icon active color="fgMuted" name="info" size="s" />
        <Text color="fgMuted" font="legal">
          Must pass at least AA normal contrast
        </Text>
      </HStack>
    </VStack>
  );
});
