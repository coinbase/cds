import type { CSSProperties } from 'react';

import { Pressable } from '@coinbase/cds-web/pressable';
import { useTheme } from '@coinbase/cds-web/hooks/useTheme';

/** Representative pattern: component applying multiple interactable CSS var overrides. */

const baseOverrides: CSSProperties = {
  '--interactable-background': 'transparent',
  '--interactable-border-color': 'var(--color-lineMuted)',
} as CSSProperties;

function buildStateOverrides(primaryColor: string, pressedColor: string): CSSProperties {
  return {
    ['--interactable-hovered-background' as keyof CSSProperties]: primaryColor,
    ['--interactable-pressed-background' as keyof CSSProperties]: pressedColor,
    ['--interactable-hovered-opacity' as keyof CSSProperties]: '0.98',
    ['--interactable-pressed-opacity' as keyof CSSProperties]: '0.92',
  };
}

function buildDisabledOverrides(): CSSProperties {
  return {
    '--interactable-disabled-background': 'transparent',
    '--interactable-disabled-border-color': 'var(--color-lineDisabled)',
  } as CSSProperties;
}

export function ThemedPressableCard({ children }: { children: React.ReactNode }) {
  const theme = useTheme();

  const borderRadiusOverride = {
    '--interactable-border-radius': theme.radii.medium,
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
