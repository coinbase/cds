import { memo, useMemo } from 'react';
import { useTheme } from '@coinbase/cds-web';
import { Box, Grid, VStack } from '@coinbase/cds-web/layout';
import type { defaultTheme } from '@coinbase/cds-web/themes/defaultTheme';
import { Text } from '@coinbase/cds-web/typography';
import { parse, rgb as toRgb, wcagContrast } from 'culori';

const TOKEN_SECTIONS: { title: string; keys: Array<keyof typeof defaultTheme.lightColor> }[] = [
  {
    title: 'Foreground',
    keys: ['fg', 'fgMuted', 'fgInverse', 'fgPrimary', 'fgWarning', 'fgPositive', 'fgNegative'],
  },
  {
    title: 'Background',
    keys: [
      'bg',
      'bgAlternate',
      'bgInverse',
      'bgOverlay',
      'bgElevation1',
      'bgElevation2',
      'bgPrimary',
      'bgPrimaryWash',
      'bgSecondary',
      'bgSecondaryWash',
      'bgTertiary',
      'bgNegative',
      'bgNegativeWash',
      'bgPositive',
      'bgPositiveWash',
      'bgWarning',
      'bgWarningWash',
    ],
  },
  {
    title: 'Line',
    keys: ['bgLine', 'bgLineHeavy', 'bgLineInverse', 'bgLinePrimary', 'bgLinePrimarySubtle'],
  },
  {
    title: 'Accent',
    keys: [
      'accentSubtleGreen',
      'accentBoldGreen',
      'accentSubtleBlue',
      'accentBoldBlue',
      'accentSubtlePurple',
      'accentBoldPurple',
      'accentSubtleYellow',
      'accentBoldYellow',
      'accentSubtleRed',
      'accentBoldRed',
      'accentSubtleGray',
      'accentBoldGray',
    ],
  },
  {
    title: 'Other',
    keys: ['transparent'],
  },
];

function formatTokenName(name: string): string {
  if (name === 'fg') return 'Foreground';
  if (name === 'bg') return 'Background';
  if (name === 'currentColor') return 'Current Color';

  return name
    .replace(/^fg(?=[A-Z])/, 'Foreground ')
    .replace(/^bgLine/, 'Line')
    .replace(/^bg(?=[A-Z])/, 'Background ')
    .replace(/^accent(?=[A-Z])/, 'Accent ')
    .replace(/([a-z])([A-Z0-9])/g, '$1 $2')
    .replace(/([A-Z0-9])([A-Z][a-z])/g, '$1 $2')
    .replace(/^./, (s) => s.toUpperCase());
}

function findSpectrumLabel(
  cssColor: string,
  spectrum: Record<string, string>,
): { label: string; alpha: string | null } {
  const parsed = parse(cssColor);
  if (!parsed) return { label: '', alpha: null };

  const rgb = toRgb(parsed);
  if (!rgb) return { label: '', alpha: null };

  const r = Math.round(rgb.r * 255);
  const g = Math.round(rgb.g * 255);
  const b = Math.round(rgb.b * 255);
  const rgbStr = `${r},${g},${b}`;
  const alpha = rgb.alpha !== undefined && rgb.alpha !== 1 ? `@ ${rgb.alpha}` : null;

  for (const [key, value] of Object.entries(spectrum)) {
    if (value === rgbStr) {
      return { label: key.charAt(0).toUpperCase() + key.slice(1), alpha };
    }
  }
  return { label: '', alpha };
}

function getContrastTextColor(
  cssColor: string,
  fgCssColor: string,
  fgInverseCssColor: string,
): 'fg' | 'fgInverse' {
  const parsed = parse(cssColor);
  if (!parsed) return 'fg';
  const contrastWithFgInverse = wcagContrast(parsed, fgInverseCssColor);
  const contrastWithFg = wcagContrast(parsed, fgCssColor);
  return contrastWithFgInverse > contrastWithFg ? 'fgInverse' : 'fg';
}

function hasTransparency(cssColor: string): boolean {
  const parsed = parse(cssColor);
  if (!parsed) return false;
  return (parsed.alpha ?? 1) < 1;
}

const CHECKERED_BG = 'repeating-conic-gradient(#ccc 0% 25%, #fff 0% 50%) 0 0 / 16px 16px';

type ColorSwatchCardProps = {
  tokenKey: string;
  cssColor: string;
  spectrum: Record<string, string>;
};

const ColorSwatchCard = memo(({ tokenKey, cssColor, spectrum }: ColorSwatchCardProps) => {
  const { color } = useTheme();
  const isTransparent = useMemo(() => hasTransparency(cssColor), [cssColor]);
  const { label, alpha } = useMemo(
    () => findSpectrumLabel(cssColor, spectrum),
    [cssColor, spectrum],
  );
  const textColor = useMemo<'fg' | 'fgInverse'>(
    () => (isTransparent ? 'fg' : getContrastTextColor(cssColor, color.fg, color.fgInverse)),
    [color.fg, color.fgInverse, cssColor, isTransparent],
  );

  const sublabel = label ? (alpha ? `${label} ${alpha}` : label) : cssColor;

  return (
    <Box
      borderRadius={200}
      overflow="hidden"
      style={{
        background: CHECKERED_BG,
      }}
    >
      <VStack
        bordered
        alignItems="flex-start"
        borderRadius={200}
        gap={0}
        height={80}
        justifyContent="flex-end"
        padding={1}
        style={{ background: cssColor }}
        width="100%"
      >
        <VStack background={isTransparent ? 'bg' : 'transparent'} borderRadius={100} padding={0.5}>
          <Text color={textColor} font="label1">
            {formatTokenName(tokenKey)}
          </Text>
          <Text color={textColor} font="caption">
            {sublabel}
          </Text>
        </VStack>
      </VStack>
    </Box>
  );
});

export const ColorSwatchGrid = memo(() => {
  const { color, spectrum } = useTheme();

  return (
    <VStack gap={3}>
      {TOKEN_SECTIONS.map(({ title, keys }) => (
        <VStack key={title} gap={1}>
          <Text color="fgMuted" font="label1">
            {title}
          </Text>
          <Grid gap={1} gridTemplateColumns="repeat(auto-fill, minmax(200px, 1fr))">
            {keys.map((key) => (
              <ColorSwatchCard key={key} cssColor={color[key]} spectrum={spectrum} tokenKey={key} />
            ))}
          </Grid>
        </VStack>
      ))}
    </VStack>
  );
});
