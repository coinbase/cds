import { mergeComponentProps } from '../mergeComponentProps';

describe('mergeComponentProps (mobile)', () => {
  describe('edge cases', () => {
    it('returns source when target is undefined', () => {
      const source = { variant: 'primary' };
      const result = mergeComponentProps(undefined, source);
      expect(result).toBe(source);
    });

    it('returns target when source is undefined', () => {
      const target = { variant: 'primary' };
      const result = mergeComponentProps(target, undefined);
      expect(result).toBe(target);
    });

    it('returns source when both are undefined', () => {
      const result = mergeComponentProps(undefined, undefined);
      expect(result).toBeUndefined();
    });

    it('handles empty objects', () => {
      const result = mergeComponentProps({}, {});
      expect(result).toEqual({});
    });
  });

  describe('override behavior', () => {
    it('keeps BaseProps defaults while allowing local overrides', () => {
      const target = {
        compact: false,
        variant: 'secondary',
        height: 32,
        font: 'headline',
      };
      const source = {
        compact: true,
        variant: 'primary',
      };
      const result = mergeComponentProps(target, source);

      expect(result).toEqual({
        compact: true,
        variant: 'primary',
        height: 32,
        font: 'headline',
      });
    });

    it('overrides target with source props', () => {
      const target = { variant: 'primary', size: 'm' };
      const source = { variant: 'secondary', compact: true };
      const result = mergeComponentProps(target, source);

      expect(result).toEqual({
        variant: 'secondary',
        size: 'm',
        compact: true,
      });
    });

    it('keeps target props when source does not provide values', () => {
      const target = { variant: 'primary', size: 'm', disabled: true };
      const source = { variant: 'secondary' };
      const result = mergeComponentProps(target, source);

      expect(result).toEqual({
        variant: 'secondary',
        size: 'm',
        disabled: true,
      });
    });

    it('overrides style and styles instead of merging', () => {
      const target = {
        style: { color: 'red', fontSize: 14 },
        styles: { root: { color: 'red' }, label: { fontSize: 14 } },
      };
      const source = {
        style: { color: 'blue' },
        styles: { root: { color: 'blue' } },
      };
      const result = mergeComponentProps(target, source);

      expect(result).toEqual({
        style: { color: 'blue' },
        styles: { root: { color: 'blue' } },
      });
    });
  });
});
