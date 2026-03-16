import { mergeComponentProps } from '../mergeComponentProps';

describe('mergeComponentProps (mobile)', () => {
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

  describe('mergeStyleProps = false (default)', () => {
    describe('basic prop merging', () => {
      it('should override target with source props', () => {
        const target = { variant: 'primary', size: 'm' };
        const source = { variant: 'secondary', compact: true };
        const result = mergeComponentProps(target, source);

        expect(result).toEqual({
          variant: 'secondary',
          size: 'm',
          compact: true,
        });
      });

      it('should keep target props when not in source', () => {
        const target = { variant: 'primary', size: 'm', disabled: true };
        const source = { variant: 'secondary' };
        const result = mergeComponentProps(target, source);

        expect(result).toEqual({
          variant: 'secondary',
          size: 'm',
          disabled: true,
        });
      });
    });

    describe('style handling', () => {
      it('should override style (not merge)', () => {
        const target = { style: { color: 'red', fontSize: 14 } };
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

      it('should use source style when target has none', () => {
        const target = { variant: 'primary' };
        const source = { style: { color: 'blue' } };
        const result = mergeComponentProps(target, source);

        expect(result.style).toEqual({ color: 'blue' });
      });
    });

    describe('styles handling', () => {
      it('should override styles object (not merge keys)', () => {
        const target = { styles: { root: { color: 'red' }, label: { fontSize: 14 } } };
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

  describe('mergeStyleProps = true', () => {
    describe('basic prop merging', () => {
      it('should still override non-special props', () => {
        const target = { variant: 'primary', size: 'm' };
        const source = { variant: 'secondary', compact: true };
        const result = mergeComponentProps(target, source, true);

        expect(result).toEqual({
          variant: 'secondary',
          size: 'm',
          compact: true,
        });
      });
    });

    describe('style shallow merging', () => {
      it('should shallow merge style objects (source overrides)', () => {
        const target = { style: { color: 'red', fontSize: 14 } };
        const source = { style: { color: 'blue', padding: 8 } };
        const result = mergeComponentProps(target, source, true);

        expect(result.style).toEqual({
          color: 'blue',
          fontSize: 14,
          padding: 8,
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

      it('should handle complex style properties', () => {
        const target = {
          style: {
            flex: 1,
            flexDirection: 'row' as const,
            alignItems: 'center' as const,
            paddingHorizontal: 16,
          },
        };
        const source = {
          style: {
            flexDirection: 'column' as const,
            paddingVertical: 8,
            backgroundColor: '#fff',
          },
        };
        const result = mergeComponentProps(target, source, true);

        expect(result.style).toEqual({
          flex: 1,
          flexDirection: 'column',
          alignItems: 'center',
          paddingHorizontal: 16,
          paddingVertical: 8,
          backgroundColor: '#fff',
        });
      });
    });

    describe('styles merging', () => {
      it('should merge styles keys with shallow merge per key', () => {
        const target = {
          styles: {
            root: { color: 'red', fontSize: 14 },
            label: { fontWeight: 'bold' as const },
          },
        };
        const source = {
          styles: {
            root: { color: 'blue', padding: 8 },
            icon: { width: 20 },
          },
        };
        const result = mergeComponentProps(target, source, true);

        expect(result.styles).toEqual({
          root: { color: 'blue', fontSize: 14, padding: 8 },
          label: { fontWeight: 'bold' },
          icon: { width: 20 },
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
            label: { fontSize: 14 },
          },
        };
        const source = {
          styles: {
            label: { fontWeight: 'bold' as const },
            icon: { width: 20 },
          },
        };
        const result = mergeComponentProps(target, source, true);

        expect(result.styles).toEqual({
          root: { color: 'red' },
          label: { fontSize: 14, fontWeight: 'bold' },
          icon: { width: 20 },
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
          variant: 'primary' as const,
          style: { color: 'red', fontSize: 14 },
          styles: { root: { padding: 4 }, icon: { width: 16 } },
        };
        const source = {
          variant: 'secondary' as const,
          style: { color: 'blue', margin: 8 },
          styles: { root: { margin: 8 }, label: { fontWeight: 'bold' as const } },
        };
        const result = mergeComponentProps(target, source, true);

        expect(result).toEqual({
          variant: 'secondary',
          style: { color: 'blue', fontSize: 14, margin: 8 },
          styles: {
            root: { padding: 4, margin: 8 },
            icon: { width: 16 },
            label: { fontWeight: 'bold' },
          },
        });
      });

      it('should merge with mixed special and regular props', () => {
        const target = {
          variant: 'primary' as const,
          size: 'm' as const,
          style: { color: 'red' },
          disabled: false,
        };
        const source = {
          variant: 'secondary' as const,
          style: { padding: 8 },
          compact: true,
        };
        const result = mergeComponentProps(target, source, true);

        expect(result).toEqual({
          variant: 'secondary',
          size: 'm',
          style: { color: 'red', padding: 8 },
          disabled: false,
          compact: true,
        });
      });

      it('should handle React Native specific style properties', () => {
        const target = {
          style: {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          },
        };
        const source = {
          style: {
            shadowOpacity: 0.5,
            elevation: 10,
            backgroundColor: '#fff',
          },
        };
        const result = mergeComponentProps(target, source, true);

        expect(result.style).toEqual({
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.5,
          shadowRadius: 3.84,
          elevation: 10,
          backgroundColor: '#fff',
        });
      });
    });
  });
});
