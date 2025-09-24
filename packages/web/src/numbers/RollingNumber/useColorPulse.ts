import { useEffect, useRef } from 'react';
import type { ThemeVars } from '@coinbase/cds-common/core/theme';
import { useAnimation } from 'framer-motion';

import { useTheme } from '../../hooks/useTheme';

export function useColorPulse({
  value,
  formatted,
  defaultColor,
  colorPulseOnUpdate,
  positivePulseColor,
  negativePulseColor,
}: {
  value: number;
  formatted: string;
  defaultColor: ThemeVars.Color;
  colorPulseOnUpdate: boolean;
  positivePulseColor: ThemeVars.Color;
  negativePulseColor: ThemeVars.Color;
}) {
  const theme = useTheme();
  const baseColor = theme.color[defaultColor];
  const previousValue = useRef<number>(Number(value));
  const previousStringValue = useRef<string>(formatted);
  const colorControls = useAnimation();

  useEffect(() => {
    if (!colorPulseOnUpdate || !baseColor) return;

    const prev = previousValue.current;
    const next = Number(value);
    const hasMeaningfulChange =
      !Number.isNaN(prev) &&
      !Number.isNaN(next) &&
      prev !== next &&
      // a change from 125,000 to 125,001 should not pulse if it's being formatted as 125K, since the displayed value is the same
      previousStringValue.current !== formatted;
    const pulseColor = hasMeaningfulChange
      ? theme.color[next > prev ? positivePulseColor : negativePulseColor]
      : undefined;

    if (hasMeaningfulChange && pulseColor) {
      colorControls.start({ color: [pulseColor, baseColor] });
    }

    previousValue.current = next;
    previousStringValue.current = formatted;
  }, [
    value,
    colorPulseOnUpdate,
    positivePulseColor,
    negativePulseColor,
    colorControls,
    baseColor,
    theme,
    formatted,
  ]);

  return colorControls;
}
