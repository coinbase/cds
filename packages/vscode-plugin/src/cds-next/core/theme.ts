import type { SpectrumVars } from '../styles/spectrum';
import type * as vars from '../styles/vars';

/** The categories of themable CSS variables that power CDS. */
export type VarType = keyof typeof vars;
export type SpectrumVarType = 'spectrum';
export type StyleVarType = Exclude<VarType, SpectrumVarType>;

/** The canonical list of themeable vars. We don't use the vars.js directly because we want to allow vars.js to be tree-shaken when a consumer is supplying their own vars / theme and not consuming vars.js directly. */
export const varNames = {
  spectrum: 1,
  color: 1,
  illustrationColor: 1,
  space: 1,
  size: 1,
  borderWidth: 1,
  borderRadius: 1,
  fontFamily: 1,
  fontSize: 1,
  fontWeight: 1,
  lineHeight: 1,
  shadow: 1,
  zIndex: 1,
} as const satisfies Record<VarType, 1>;

/** Maps our StyleVars to their CSS variable prefixes. For example, the names of CSS vars generated from `illustrationColor` vars will be prefixed with `--illo-`. */
export const styleVarPrefixes = {
  color: 'color',
  illustrationColor: 'illo',
  space: 'space',
  size: 'size',
  borderWidth: 'borderWidth',
  borderRadius: 'borderRadius',
  fontFamily: 'fontFamily',
  fontSize: 'fontSize',
  fontWeight: 'fontWeight',
  lineHeight: 'lineHeight',
  shadow: 'shadow',
  zIndex: 'zIndex',
} as const satisfies Record<StyleVarType, string>;

/** Maps our StyleVarTypes to the CSS property types they affect. Vars like `size` can affect multiple properties like width, height, etc - but all those properties have the same type. */
export const styleVarProperties = {
  color: 'color',
  illustrationColor: 'color',
  space: 'padding',
  size: 'width',
  borderWidth: 'borderWidth',
  borderRadius: 'borderRadius',
  fontFamily: 'fontFamily',
  fontSize: 'fontSize',
  fontWeight: 'fontWeight',
  lineHeight: 'lineHeight',
  shadow: 'boxShadow',
  zIndex: 'zIndex',
} as const satisfies Record<StyleVarType, keyof React.CSSProperties>;

/** The canonical type of the core CDS theme object. Contains all themeable vars. Does not include media queries.  */
export type Theme = {
  // If it's a SpectrumVarType, it should be a SpectrumVars object.
  [Var in VarType]: Var extends SpectrumVarType
    ? SpectrumVars
    : // If it's a StyleVarType, it should be an object with React.CSSProperties values.
      Var extends StyleVarType
      ? {
          [key in keyof (typeof vars)[Var]]: NonNullable<
            React.CSSProperties[(typeof styleVarProperties)[Var]]
          >;
        }
      : never;
};

export type ThemeConfig = Partial<Theme> & {
  [mediaQuery: `@media ${string}`]: Partial<Theme>;
};

// -------------------
// Begin subthemes
// -------------------
export type ColorTheme = Pick<Theme, 'color'>;

export type IllustrationColorTheme = Pick<Theme, 'illustrationColor'>;

export type DensityTheme = Pick<
  Theme,
  'space' | 'size' | 'fontFamily' | 'fontSize' | 'fontWeight' | 'lineHeight'
>;
// -------------------
// End subthemes
// -------------------

/** The Theme type, but the themeable vars have their CSS variable names - which may be prefixed, e.g. `color['line']` becomes `color['--color-line']`. */
export type ThemeCSSVars = {
  [VarType in keyof Theme]: VarType extends keyof typeof styleVarPrefixes
    ? {
        // If VarType is a key of styleVarPrefixes we need to add the prefix to the CSS var name.
        [Var in keyof Theme[VarType] as `--${(typeof styleVarPrefixes)[VarType]}-${Var &
          string}`]: React.CSSProperties[(typeof styleVarProperties)[VarType]];
      }
    : {
        // If VarType is not a key of styleVarPrefixes we don't need to add any prefix.
        [Var in keyof Theme[VarType] as `--${Var & string}`]: Theme[VarType][Var];
      };
};

type UnionToIntersection<U> = (U extends unknown ? (x: U) => void : never) extends (
  x: infer I,
) => void
  ? I
  : never;

/** A flat object of the CSS variable names of all themeable vars, based on the Theme type. */
export type AllThemeCSSVars = UnionToIntersection<ThemeCSSVars[keyof ThemeCSSVars]>;

/** The Theme type, but the themeable vars have their CSS variable names - which may be prefixed, e.g. `color['line']` becomes `color['--color-line']`. You should prefer to use `ThemeCSSVars`. This type is used to extend React.CSSProperties, and thus has removed the types of most theme vars, because they extended from React.CSSProperties which creates a circular type definition. */
export type ThemeCSSVarsUntyped = {
  [Var in VarType]: Var extends keyof typeof styleVarPrefixes
    ? {
        // If Var is a key of styleVarPrefixes we need to add the prefix to the CSS var name.
        [VarValue in keyof (typeof vars)[Var] as `--${(typeof styleVarPrefixes)[Var]}-${VarValue &
          string}`]: any;
      }
    : {
        // If Var is not a key of styleVarPrefixes we don't need to add any prefix.
        [VarValue in keyof SpectrumVars as `--${VarValue & string}`]: SpectrumVars[VarValue];
      };
};

/** A flat object of the CSS variable names of all themeable vars, based on the Theme type. You should prefer to use `AllThemeCSSVars` instead. This type is used to extend React.CSSProperties, and thus has removed the types of most theme vars, because they extended from React.CSSProperties which creates a circular type definition. */
export type AllThemeCSSVarsUntyped = UnionToIntersection<
  ThemeCSSVarsUntyped[keyof ThemeCSSVarsUntyped]
>;
