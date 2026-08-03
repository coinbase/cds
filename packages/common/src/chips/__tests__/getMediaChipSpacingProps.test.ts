import { getMediaChipSpacingProps } from '../getMediaChipSpacingProps';

describe('getMediaChipSpacingProps', () => {
  const sizeDependentCompositions = [
    { name: 'label only', start: false, children: true, end: false },
    { name: 'start + label', start: true, children: true, end: false },
    { name: 'label + end', start: false, children: true, end: true },
    { name: 'start + label + end', start: true, children: true, end: true },
  ] as const;

  describe('backward compatibility with compact', () => {
    it.each(sizeDependentCompositions)(
      'compact:true deep-equals size:"xs" for $name',
      ({ start, children, end }) => {
        expect(getMediaChipSpacingProps({ compact: true, start, children, end })).toEqual(
          getMediaChipSpacingProps({ size: 'xs', start, children, end }),
        );
      },
    );

    it.each(sizeDependentCompositions)(
      'compact:false deep-equals size:"s" for $name',
      ({ start, children, end }) => {
        expect(getMediaChipSpacingProps({ compact: false, start, children, end })).toEqual(
          getMediaChipSpacingProps({ size: 's', start, children, end }),
        );
      },
    );
  });

  describe('default resolution', () => {
    it.each(sizeDependentCompositions)(
      'omitting both size and compact resolves to the s output for $name',
      ({ start, children, end }) => {
        expect(getMediaChipSpacingProps({ start, children, end })).toEqual(
          getMediaChipSpacingProps({ size: 's', start, children, end }),
        );
      },
    );
  });

  describe('size wins over compact', () => {
    it.each(sizeDependentCompositions)(
      'size:"s" + compact:true resolves to the s output for $name',
      ({ start, children, end }) => {
        expect(
          getMediaChipSpacingProps({ size: 's', compact: true, start, children, end }),
        ).toEqual(getMediaChipSpacingProps({ size: 's', start, children, end }));
      },
    );
  });

  describe('media-only compositions are size-agnostic', () => {
    it('start only is unaffected by size', () => {
      const expected = { paddingY: 1, paddingX: 1 };
      expect(getMediaChipSpacingProps({ start: true, size: 'xs' })).toEqual(expected);
      expect(getMediaChipSpacingProps({ start: true, size: 's' })).toEqual(expected);
    });

    it('start + end is unaffected by size', () => {
      const expected = { paddingStart: 1, paddingY: 1, paddingEnd: 1.5, gap: 0.75 };
      expect(getMediaChipSpacingProps({ start: true, end: true, size: 'xs' })).toEqual(expected);
      expect(getMediaChipSpacingProps({ start: true, end: true, size: 's' })).toEqual(expected);
    });
  });
});
