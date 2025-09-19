import { useEffect, useRef } from 'react';
import type { ThemeVars } from '@coinbase/cds-common/core/theme';
import { useAnimation } from 'framer-motion';

import { useTheme } from '../../hooks/useTheme';

export function useColorPulse({
  value,
  defaultColor,
  colorPulseOnUpdate,
  positivePulseColor,
  negativePulseColor,
}: {
  value: number | bigint;
  defaultColor: ThemeVars.Color;
  colorPulseOnUpdate: boolean;
  positivePulseColor: ThemeVars.Color;
  negativePulseColor: ThemeVars.Color;
}) {
  const theme = useTheme();
  const baseColor = theme.color[defaultColor];
  const previousValue = useRef<number>(Number(value));
  const colorControls = useAnimation();

  useEffect(() => {
    if (!colorPulseOnUpdate || !baseColor) return;

    const prev = previousValue.current;
    const next = Number(value);
    const hasMeaningfulChange = !Number.isNaN(prev) && !Number.isNaN(next) && prev !== next;
    const pulseColor = hasMeaningfulChange
      ? theme.color[next > prev ? positivePulseColor : negativePulseColor]
      : undefined;

    if (hasMeaningfulChange && pulseColor) {
      colorControls.start({ color: [pulseColor, baseColor] });
    }

    previousValue.current = next;
  }, [
    value,
    colorPulseOnUpdate,
    positivePulseColor,
    negativePulseColor,
    colorControls,
    baseColor,
    theme,
  ]);

  return colorControls;
}
