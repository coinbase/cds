import { styleVarPrefixes, type Theme } from './theme';

const periodsRegex = /\./g;

// Converts a camelCase illustration theme key to the kebab-case CSS var suffix that
// the generated themeable SVGs expect: accent1 → accent-1, gray2 → gray-2.
const toIllustrationVarSuffix = (key: string) => key.replace(/([a-z])(\d+)$/i, '$1-$2');

/** Takes a theme object and formats its keys as CSS variables to be used in inline styles. */
export const createThemeCssVars = (theme: Partial<Theme>) => {
  const themeCss: Record<string, unknown> = {};

  const themeKeys = Object.keys(theme);

  for (const key of themeKeys) {
    const themeVars = theme[key as keyof Theme];
    if (!themeVars || key === 'id') continue;

    // Handle activeColorScheme separately
    if (key === 'activeColorScheme') {
      themeCss['--activeColorScheme'] = theme.activeColorScheme;
      continue;
    }

    // lightIllustrationColor/darkIllustrationColor are resolved into theme.illustrationColor by ThemeProvider.
    // Skip them here to avoid emitting --lightIllustrationColor-* / --darkIllustrationColor-* vars.
    if (key === 'lightIllustrationColor' || key === 'darkIllustrationColor') {
      continue;
    }

    // Illustration colors use a kebab-converted key format to match the var(--illustration-accent-1)
    // tokens in the generated themeable SVGs, so they need special handling rather than the default
    // period-to-underscore substitution.
    if (key === 'illustrationColor') {
      for (const varName of Object.keys(themeVars)) {
        const value = themeVars[varName as keyof typeof themeVars];
        if (value !== undefined) {
          themeCss[`--illustration-${toIllustrationVarSuffix(varName)}`] = value;
        }
      }
      continue;
    }

    const prefix = styleVarPrefixes[key as keyof typeof styleVarPrefixes];
    const cssVarPrefix = prefix ? `--${prefix}-` : '--';
    const varNames = Object.keys(themeVars);

    // Process each var in the themeVars
    for (const varName of varNames) {
      const value = themeVars[varName as keyof typeof themeVars];
      if (value === undefined) continue;

      // Create CSS variable name, replacing periods with underscores
      const cssVarName = `${cssVarPrefix}${varName}`.replace(periodsRegex, '_');

      // Format value (add px to numbers)
      themeCss[cssVarName] = typeof value !== 'number' ? value : value + 'px';
    }
  }

  return themeCss;
};
