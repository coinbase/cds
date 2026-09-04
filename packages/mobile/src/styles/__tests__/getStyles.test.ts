import type { Theme } from '../../core/theme';
import { defaultTheme } from '../../themes/defaultTheme';
import type { StyleProps } from '../styleProps';
import { getStyles } from '../styleProps';

const theme: Theme = {
  ...defaultTheme,
  activeColorScheme: 'light',
  spectrum: defaultTheme.lightSpectrum!,
  color: defaultTheme.lightColor!,
};

describe('getStyles', () => {
  it('skips undefined values', () => {
    const styleProps: StyleProps = { padding: 1, width: undefined };
    const result = getStyles(styleProps, theme);
    expect(result).toEqual({ padding: 8 });
    expect(result).not.toHaveProperty('width');
  });

  it('passes through non-themed props as-is', () => {
    const styleProps: StyleProps = {
      width: 100,
      height: '50%',
      alignSelf: 'flex-start',
    };
    const result = getStyles(styleProps, theme);
    expect(result).toEqual({
      width: 100,
      height: '50%',
      alignSelf: 'flex-start',
    });
  });

  it('resolves themed space props (e.g. padding) from theme', () => {
    const styleProps: StyleProps = { padding: 1, paddingTop: 2 };
    const result = getStyles(styleProps, theme);
    expect(result).toEqual({ padding: 8, paddingTop: 16 });
  });

  it('resolves margin from theme with negated lookup', () => {
    const styleProps: StyleProps = { margin: -1, marginTop: -2 };
    const result = getStyles(styleProps, theme);
    expect(result).toEqual({ margin: -8, marginTop: -16 });
  });

  it('resolves themed color props from theme', () => {
    const styleProps: StyleProps = { color: 'fg', background: 'bgPrimary' };
    const result = getStyles(styleProps, theme);
    expect(result).toEqual({
      color: theme.color.fg,
      backgroundColor: theme.color.bgPrimary,
    });
  });

  it('expands paddingX to paddingStart and paddingEnd', () => {
    const styleProps: StyleProps = { paddingX: 1 };
    const result = getStyles(styleProps, theme);
    expect(result).toEqual({ paddingStart: 8, paddingEnd: 8 });
  });

  it('expands marginY to marginTop and marginBottom', () => {
    const styleProps: StyleProps = { marginY: -2 };
    const result = getStyles(styleProps, theme);
    expect(result).toEqual({ marginTop: -16, marginBottom: -16 });
  });

  it('skips themed props when value is null', () => {
    const styleProps = {
      padding: 1,
      margin: -2,
      color: 'fg',
    } as StyleProps & {
      padding?: number | null;
      margin?: number | null;
      color?: keyof Theme['color'] | null;
    };
    const withNull = {
      ...styleProps,
      padding: null,
      margin: null,
      color: null,
    };
    const result = getStyles(withNull as unknown as StyleProps, theme);
    expect(result).toEqual({});
  });

  it('passes through null for non-themed dimension props', () => {
    const styleProps = { width: null, height: 100 } as StyleProps;
    const result = getStyles(styleProps, theme);
    expect(result).toEqual({ width: null, height: 100 });
  });
});
