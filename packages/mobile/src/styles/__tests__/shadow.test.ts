import type { Shadow, ThemeConfig } from '../../core/theme';
import { defaultTheme } from '../../themes/defaultTheme';
import { getSkiaShadowParams, isBoxShadowToken } from '../shadow';

const legacyToken: Shadow = {
  shadowColor: '#000000',
  shadowOffset: { width: 0, height: 8 },
  shadowOpacity: 0.12,
  shadowRadius: 12,
};

const boxShadowToken: Shadow = {
  boxShadow: [{ offsetX: 0, offsetY: 8, blurRadius: 24, color: 'rgba(0, 0, 0, 0.12)' }],
};

describe('isBoxShadowToken', () => {
  it('narrows a boxShadow token', () => {
    expect(isBoxShadowToken(boxShadowToken)).toBe(true);
  });

  it('rejects a legacy token', () => {
    expect(isBoxShadowToken(legacyToken)).toBe(false);
  });

  it('rejects the shipped default theme tokens, which are still legacy', () => {
    expect(isBoxShadowToken(defaultTheme.shadow.elevation1)).toBe(false);
  });
});

describe('getSkiaShadowParams', () => {
  it('returns undefined when there is no shadow', () => {
    expect(getSkiaShadowParams(undefined)).toBeUndefined();
  });

  it('returns undefined for an empty boxShadow array', () => {
    expect(getSkiaShadowParams({ boxShadow: [] })).toBeUndefined();
  });

  it('passes legacy values through unchanged', () => {
    expect(getSkiaShadowParams(legacyToken)).toEqual({
      dx: 0,
      dy: 8,
      blur: 12,
      color: '#000000',
      opacity: 0.12,
    });
  });

  it('halves blurRadius so a boxShadow token matches the legacy shadowRadius it replaces', () => {
    const legacy = getSkiaShadowParams(legacyToken);
    const boxShadow = getSkiaShadowParams(boxShadowToken);

    expect(boxShadow?.blur).toBe(12);
    expect(boxShadow?.blur).toBe(legacy?.blur);
  });

  it('leaves opacity undefined so callers do not overwrite the alpha in the boxShadow color', () => {
    expect(getSkiaShadowParams(boxShadowToken)).toEqual({
      dx: 0,
      dy: 8,
      blur: 12,
      color: 'rgba(0, 0, 0, 0.12)',
    });
    expect(getSkiaShadowParams(boxShadowToken)?.opacity).toBeUndefined();
  });

  it('coerces string dimensions and falls back to opaque black', () => {
    expect(getSkiaShadowParams({ boxShadow: [{ offsetX: '4', offsetY: '-2' }] })).toEqual({
      dx: 4,
      dy: -2,
      blur: 0,
      color: '#000000',
    });
  });

  describe('lossy conversions', () => {
    let warn: jest.SpyInstance;

    beforeEach(() => {
      warn = jest.spyOn(console, 'warn').mockImplementation(() => undefined);
    });

    afterEach(() => {
      warn.mockRestore();
    });

    it('uses the first entry and warns when a token stacks shadows', () => {
      const result = getSkiaShadowParams({
        boxShadow: [
          { offsetX: 0, offsetY: 8, blurRadius: 24, color: 'red' },
          { offsetX: 0, offsetY: 2, blurRadius: 4, color: 'blue' },
        ],
      });

      expect(result?.color).toBe('red');
      expect(warn).toHaveBeenCalled();
    });

    it('drops spreadDistance and warns, since Skia cannot express it', () => {
      const result = getSkiaShadowParams({
        boxShadow: [{ offsetX: 0, offsetY: 8, blurRadius: 24, spreadDistance: 4 }],
      });

      expect(result).not.toHaveProperty('spreadDistance');
      expect(warn).toHaveBeenCalled();
    });

    it('stays quiet for a single spread-free shadow', () => {
      getSkiaShadowParams(boxShadowToken);

      expect(warn).not.toHaveBeenCalled();
    });
  });
});

describe('Shadow token types', () => {
  it('rejects tokens that mix both forms or use the CSS string shorthand', () => {
    const mixed = {
      // @ts-expect-error a token may declare either form, never both
      elevation1: { boxShadow: [{ offsetX: 0, offsetY: 8 }], shadowRadius: 12 },
      elevation2: { boxShadow: [{ offsetX: 0, offsetY: 8 }] },
    } satisfies ThemeConfig['shadow'];

    const cssString = {
      // @ts-expect-error the CSS string form is intentionally excluded
      elevation1: { boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.12)' },
      elevation2: { boxShadow: [{ offsetX: 0, offsetY: 8 }] },
    } satisfies ThemeConfig['shadow'];

    expect(mixed && cssString).toBeTruthy();
  });
});
