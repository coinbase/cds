import { mergeComponentProps } from '../../utils/mergeComponentProps';

describe('mergeComponentProps', () => {
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
      const target = { variant: 'primary', size: 'md' };
      const source = { variant: 'secondary', compact: true };
      const result = mergeComponentProps(target, source);

      expect(result).toEqual({
        variant: 'secondary',
        size: 'md',
        compact: true,
      });
    });

    it('keeps target props when source does not provide values', () => {
      const target = { variant: 'primary', size: 'md', disabled: true };
      const source = { variant: 'secondary' };
      const result = mergeComponentProps(target, source);

      expect(result).toEqual({
        variant: 'secondary',
        size: 'md',
        disabled: true,
      });
    });

    it('overrides className/style-like props instead of merging', () => {
      const target = {
        className: 'base',
        classNames: { root: 'base-root', label: 'base-label' },
        style: { color: 'red', fontSize: '14px' },
        styles: { root: { color: 'red' }, label: { fontSize: '14px' } },
      };
      const source = {
        className: 'override',
        classNames: { root: 'override-root' },
        style: { color: 'blue' },
        styles: { root: { color: 'blue' } },
      };
      const result = mergeComponentProps(target, source);

      expect(result).toEqual({
        className: 'override',
        classNames: { root: 'override-root' },
        style: { color: 'blue' },
        styles: { root: { color: 'blue' } },
      });
    });
  });
});
