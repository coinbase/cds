import { mergeComponentProps } from '../../utils/mergeComponentProps';

describe('mergeComponentProps', () => {
  describe('edge cases', () => {
    it('should return source when target is undefined', () => {
      const source = { variant: 'primary' };
      const result = mergeComponentProps(undefined, source);
      expect(result).toBe(source);
    });

    it('should return target when source is undefined', () => {
      const target = { variant: 'primary' };
      const result = mergeComponentProps(target, undefined);
      expect(result).toBe(target);
    });

    it('should return source when both are undefined', () => {
      const result = mergeComponentProps(undefined, undefined);
      expect(result).toBeUndefined();
    });

    it('should handle empty objects', () => {
      const result = mergeComponentProps({}, {});
      expect(result).toEqual({});
    });
  });

  describe('mergeClassNameAndStyle = false (default)', () => {
    describe('basic prop merging', () => {
      it('should override target with source props', () => {
        const target = { variant: 'primary', size: 'md' };
        const source = { variant: 'secondary', compact: true };
        const result = mergeComponentProps(target, source);

        expect(result).toEqual({
          variant: 'secondary',
          size: 'md',
          compact: true,
        });
      });

      it('should keep target props when not in source', () => {
        const target = { variant: 'primary', size: 'md', disabled: true };
        const source = { variant: 'secondary' };
        const result = mergeComponentProps(target, source);

        expect(result).toEqual({
          variant: 'secondary',
          size: 'md',
          disabled: true,
        });
      });
    });

    describe('className handling', () => {
      it('should override className (not concatenate)', () => {
        const target = { className: 'base' };
        const source = { className: 'override' };
        const result = mergeComponentProps(target, source);

        expect(result.className).toBe('override');
      });

      it('should keep target className when source has none', () => {
        const target = { className: 'base' };
        const source = { variant: 'primary' };
        const result = mergeComponentProps(target, source);

        expect(result.className).toBe('base');
      });

      it('should use source className when target has none', () => {
        const target = { variant: 'primary' };
        const source = { className: 'override' };
        const result = mergeComponentProps(target, source);

        expect(result.className).toBe('override');
      });
    });

    describe('classNames handling', () => {
      it('should override classNames object (not merge keys)', () => {
        const target = { classNames: { root: 'base-root', label: 'base-label' } };
        const source = { classNames: { root: 'override-root' } };
        const result = mergeComponentProps(target, source);

        expect(result.classNames).toEqual({ root: 'override-root' });
      });

      it('should keep target classNames when source has none', () => {
        const target = { classNames: { root: 'base-root' } };
        const source = { variant: 'primary' };
        const result = mergeComponentProps(target, source);

        expect(result.classNames).toEqual({ root: 'base-root' });
      });
    });

    describe('style handling', () => {
      it('should override style object (not merge)', () => {
        const target = { style: { color: 'red', fontSize: '14px' } };
        const source = { style: { color: 'blue' } };
        const result = mergeComponentProps(target, source);

        expect(result.style).toEqual({ color: 'blue' });
      });

      it('should keep target style when source has none', () => {
        const target = { style: { color: 'red' } };
        const source = { variant: 'primary' };
        const result = mergeComponentProps(target, source);

        expect(result.style).toEqual({ color: 'red' });
      });
    });

    describe('styles handling', () => {
      it('should override styles object (not merge keys)', () => {
        const target = { styles: { root: { color: 'red' }, label: { fontSize: '14px' } } };
        const source = { styles: { root: { color: 'blue' } } };
        const result = mergeComponentProps(target, source);

        expect(result.styles).toEqual({ root: { color: 'blue' } });
      });

      it('should keep target styles when source has none', () => {
        const target = { styles: { root: { color: 'red' } } };
        const source = { variant: 'primary' };
        const result = mergeComponentProps(target, source);

        expect(result.styles).toEqual({ root: { color: 'red' } });
      });
    });
  });

  describe('mergeClassNameAndStyle = true', () => {
    describe('basic prop merging', () => {
      it('should still override non-special props', () => {
        const target = { variant: 'primary', size: 'md' };
        const source = { variant: 'secondary', compact: true };
        const result = mergeComponentProps(target, source, true);

        expect(result).toEqual({
          variant: 'secondary',
          size: 'md',
          compact: true,
        });
      });
    });

    describe('className concatenation', () => {
      it('should concatenate className with cx()', () => {
        const target = { className: 'base' };
        const source = { className: 'themed' };
        const result = mergeComponentProps(target, source, true);

        expect(result.className).toBe('base themed');
      });

      it('should handle only target className', () => {
        const target = { className: 'base' };
        const source = { variant: 'primary' };
        const result = mergeComponentProps(target, source, true);

        expect(result.className).toBe('base');
      });

      it('should handle only source className', () => {
        const target = { variant: 'primary' };
        const source = { className: 'themed' };
        const result = mergeComponentProps(target, source, true);

        expect(result.className).toBe('themed');
      });

      it('should handle undefined className in target', () => {
        const target = { className: undefined, variant: 'primary' };
        const source = { className: 'themed' };
        const result = mergeComponentProps(target, source, true);

        expect((result as any).className).toBe('themed');
      });
    });

    describe('classNames merging', () => {
      it('should merge classNames keys with cx() per key', () => {
        const target = { classNames: { root: 'base-root', label: 'base-label' } };
        const source = { classNames: { root: 'themed-root', icon: 'themed-icon' } };
        const result = mergeComponentProps(target, source, true);

        expect(result.classNames).toEqual({
          root: 'base-root themed-root',
          label: 'base-label',
          icon: 'themed-icon',
        });
      });

      it('should handle only target classNames', () => {
        const target = { classNames: { root: 'base-root' } };
        const source = { variant: 'primary' };
        const result = mergeComponentProps(target, source, true);

        expect(result.classNames).toEqual({ root: 'base-root' });
      });

      it('should handle only source classNames', () => {
        const target = { variant: 'primary' };
        const source = { classNames: { root: 'themed-root' } };
        const result = mergeComponentProps(target, source, true);

        expect(result.classNames).toEqual({ root: 'themed-root' });
      });

      it('should handle overlapping and non-overlapping keys', () => {
        const target = { classNames: { root: 'base-root', label: 'base-label' } };
        const source = { classNames: { label: 'themed-label', icon: 'themed-icon' } };
        const result = mergeComponentProps(target, source, true);

        expect(result.classNames).toEqual({
          root: 'base-root',
          label: 'base-label themed-label',
          icon: 'themed-icon',
        });
      });

      it('should handle empty classNames objects', () => {
        const target = { classNames: {} };
        const source = { classNames: {} };
        const result = mergeComponentProps(target, source, true);

        expect(result.classNames).toEqual({});
      });
    });

    describe('style shallow merging', () => {
      it('should shallow merge style objects (source overrides)', () => {
        const target = { style: { color: 'red', fontSize: '14px' } };
        const source = { style: { color: 'blue', padding: '8px' } };
        const result = mergeComponentProps(target, source, true);

        expect(result.style).toEqual({
          color: 'blue',
          fontSize: '14px',
          padding: '8px',
        });
      });

      it('should handle only target style', () => {
        const target = { style: { color: 'red' } };
        const source = { variant: 'primary' };
        const result = mergeComponentProps(target, source, true);

        expect(result.style).toEqual({ color: 'red' });
      });

      it('should handle only source style', () => {
        const target = { variant: 'primary' };
        const source = { style: { color: 'blue' } };
        const result = mergeComponentProps(target, source, true);

        expect(result.style).toEqual({ color: 'blue' });
      });
    });

    describe('styles merging', () => {
      it('should merge styles keys with shallow merge per key', () => {
        const target = {
          styles: {
            root: { color: 'red', fontSize: '14px' },
            label: { fontWeight: 'bold' },
          },
        };
        const source = {
          styles: {
            root: { color: 'blue', padding: '8px' },
            icon: { width: '20px' },
          },
        };
        const result = mergeComponentProps(target, source, true);

        expect(result.styles).toEqual({
          root: { color: 'blue', fontSize: '14px', padding: '8px' },
          label: { fontWeight: 'bold' },
          icon: { width: '20px' },
        });
      });

      it('should handle only target styles', () => {
        const target = { styles: { root: { color: 'red' } } };
        const source = { variant: 'primary' };
        const result = mergeComponentProps(target, source, true);

        expect(result.styles).toEqual({ root: { color: 'red' } });
      });

      it('should handle only source styles', () => {
        const target = { variant: 'primary' };
        const source = { styles: { root: { color: 'blue' } } };
        const result = mergeComponentProps(target, source, true);

        expect(result.styles).toEqual({ root: { color: 'blue' } });
      });

      it('should handle overlapping and non-overlapping style keys', () => {
        const target = {
          styles: {
            root: { color: 'red' },
            label: { fontSize: '14px' },
          },
        };
        const source = {
          styles: {
            label: { fontWeight: 'bold' },
            icon: { width: '20px' },
          },
        };
        const result = mergeComponentProps(target, source, true);

        expect(result.styles).toEqual({
          root: { color: 'red' },
          label: { fontSize: '14px', fontWeight: 'bold' },
          icon: { width: '20px' },
        });
      });

      it('should handle empty styles objects', () => {
        const target = { styles: {} };
        const source = { styles: {} };
        const result = mergeComponentProps(target, source, true);

        expect(result.styles).toEqual({});
      });
    });

    describe('comprehensive merging', () => {
      it('should handle all special fields together', () => {
        const target = {
          variant: 'primary',
          className: 'base',
          classNames: { root: 'base-root', label: 'base-label' },
          style: { color: 'red', fontSize: '14px' },
          styles: { root: { padding: '4px' }, icon: { width: '16px' } },
        };
        const source = {
          variant: 'secondary',
          className: 'themed',
          classNames: { root: 'themed-root', icon: 'themed-icon' },
          style: { color: 'blue', margin: '8px' },
          styles: { root: { margin: '8px' }, label: { fontWeight: 'bold' } },
        };
        const result = mergeComponentProps(target, source, true);

        expect(result).toEqual({
          variant: 'secondary',
          className: 'base themed',
          classNames: {
            root: 'base-root themed-root',
            label: 'base-label',
            icon: 'themed-icon',
          },
          style: { color: 'blue', fontSize: '14px', margin: '8px' },
          styles: {
            root: { padding: '4px', margin: '8px' },
            icon: { width: '16px' },
            label: { fontWeight: 'bold' },
          },
        });
      });

      it('should merge with mixed special and regular props', () => {
        const target = {
          variant: 'primary',
          size: 'md',
          className: 'base',
          disabled: false,
        };
        const source = {
          variant: 'secondary',
          className: 'themed',
          compact: true,
        };
        const result = mergeComponentProps(target, source, true);

        expect(result).toEqual({
          variant: 'secondary',
          size: 'md',
          className: 'base themed',
          disabled: false,
          compact: true,
        });
      });
    });
  });
});
