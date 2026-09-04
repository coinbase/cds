import React from 'react';
import type { ColorScheme } from '@coinbase/cds-common/core/theme';

import type { ThemeConfig } from '../core/theme';
import { ThemeProvider } from '../system/ThemeProvider';
import { defaultTheme } from '../themes/defaultTheme';

export const SAFE_AREA_METRICS = {
  frame: { x: 0, y: 0, width: 0, height: 0 },
  insets: { top: 0, left: 0, right: 0, bottom: 0 },
};

type DefaultThemeProviderProps = {
  children?: React.ReactNode;
  theme?: ThemeConfig;
  activeColorScheme?: ColorScheme;
};

export const theme = defaultTheme;

export const DefaultThemeProvider = ({
  children,
  theme = defaultTheme,
  activeColorScheme = 'light',
}: DefaultThemeProviderProps) => {
  return (
    <ThemeProvider activeColorScheme={activeColorScheme} theme={theme}>
      {children}
    </ThemeProvider>
  );
};

export function flattenStyle(style: unknown): Array<Record<string, unknown>> {
  if (!style) return [];
  if (Array.isArray(style)) return style.flatMap(flattenStyle);
  if (typeof style === 'object') return [style as Record<string, unknown>];
  return [];
}

export function treeHasStyleProp(
  tree: unknown,
  predicate: (style: Record<string, unknown>) => boolean,
): boolean {
  if (!tree) return false;

  if (Array.isArray(tree)) {
    return tree.some((node) => treeHasStyleProp(node, predicate));
  }

  if (typeof tree !== 'object') return false;

  const node = tree as {
    props?: { style?: unknown };
    children?: unknown[];
  };

  const styles = flattenStyle(node.props?.style);
  if (styles.some(predicate)) return true;

  return (node.children ?? []).some((child) => treeHasStyleProp(child, predicate));
}
