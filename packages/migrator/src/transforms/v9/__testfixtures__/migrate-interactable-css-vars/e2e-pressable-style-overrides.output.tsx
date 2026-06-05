import type { CSSProperties } from 'react';

import { Pressable } from '@coinbase/cds-web/pressable';
import { useTheme } from '@coinbase/cds-web/hooks/useTheme';

/** Representative pattern: component applying multiple interactable CSS var overrides. */

const baseOverrides: CSSProperties = {
  "--inter-bg": 'transparent',
  "--inter-borderColor": 'var(--color-lineMuted)',
} as CSSProperties;

function buildStateOverrides(primaryColor: string, pressedColor: string): CSSProperties {
  return {
    ["--inter-hover-bg" as keyof CSSProperties]: primaryColor,
    ["--inter-press-bg" as keyof CSSProperties]: pressedColor,
    ["--inter-hover-opacity" as keyof CSSProperties]: '0.98',
    ["--inter-press-opacity" as keyof CSSProperties]: '0.92',
  };
}

function buildDisabledOverrides(): CSSProperties {
  return {
    "--inter-disable-bg": 'transparent',
    "--inter-disable-borderColor": 'var(--color-lineDisabled)',
  } as CSSProperties;
}

export function ThemedPressableCard({ children }: { children: React.ReactNode }) {
  const theme = useTheme();

  const borderRadiusOverride = {
    "--inter-borderRadius": theme.radii.medium,
  } as CSSProperties;

  const stateOverrides = buildStateOverrides(
    'var(--color-bgSecondaryHovered)',
    'var(--color-bgSecondaryPressed)',
  );

  return (
    <Pressable
      style={{
        ...baseOverrides,
        ...stateOverrides,
        ...buildDisabledOverrides(),
        ...borderRadiusOverride,
      }}
    >
      {children}
    </Pressable>
  );
}
