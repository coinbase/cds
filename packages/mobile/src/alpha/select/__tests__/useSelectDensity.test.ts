import { renderHook } from '@testing-library/react-native';

import { useSelectDensity, useSelectPlacement } from '../useSelectDensity';

describe('useSelectPlacement', () => {
  it('places the label outside by default', () => {
    const { result } = renderHook(() =>
      useSelectPlacement({
        hasLabel: true,
        isMultiSelect: false,
        labelVariant: 'outside',
        size: 'l',
      }),
    );

    expect(result.current).toBe('outside');
  });

  it('places the label outside when there is no label', () => {
    const { result } = renderHook(() =>
      useSelectPlacement({
        hasLabel: false,
        isMultiSelect: false,
        labelVariant: 'inside',
        size: 'l',
      }),
    );

    expect(result.current).toBe('outside');
  });

  it('renders the label inline (inside-horizontal) when compact for a single select', () => {
    const { result } = renderHook(() =>
      useSelectPlacement({ compact: true, hasLabel: true, isMultiSelect: false, size: 'l' }),
    );

    expect(result.current).toBe('inside-horizontal');
  });

  it('falls back to an outside label when compact for a multi-select', () => {
    const { result } = renderHook(() =>
      useSelectPlacement({ compact: true, hasLabel: true, isMultiSelect: true, size: 'l' }),
    );

    expect(result.current).toBe('outside');
  });

  it('stacks the inside label vertically at size l and horizontally at s/m', () => {
    const { result: large } = renderHook(() =>
      useSelectPlacement({
        hasLabel: true,
        isMultiSelect: false,
        labelVariant: 'inside',
        size: 'l',
      }),
    );
    expect(large.current).toBe('inside-vertical');

    const { result: small } = renderHook(() =>
      useSelectPlacement({
        hasLabel: true,
        isMultiSelect: false,
        labelVariant: 'inside',
        size: 's',
      }),
    );
    expect(small.current).toBe('inside-horizontal');
  });

  it('stacks the inside label vertically for a multi-select at every size', () => {
    const { result } = renderHook(() =>
      useSelectPlacement({
        hasLabel: true,
        isMultiSelect: true,
        labelVariant: 'inside',
        size: 's',
      }),
    );

    expect(result.current).toBe('inside-vertical');
  });
});

describe('useSelectDensity', () => {
  it('uses per-size vertical padding with constant horizontal padding', () => {
    const { result: large } = renderHook(() =>
      useSelectDensity({
        hasValue: false,
        isMultiSelect: false,
        labelPlacement: 'outside',
        size: 'l',
      }),
    );
    expect(large.current.contentPadding).toEqual({ top: 2, right: 2, bottom: 2, left: 2 });

    const { result: medium } = renderHook(() =>
      useSelectDensity({
        hasValue: false,
        isMultiSelect: false,
        labelPlacement: 'outside',
        size: 'm',
      }),
    );
    expect(medium.current.contentPadding).toEqual({ top: 1.5, right: 2, bottom: 1.5, left: 2 });

    const { result: small } = renderHook(() =>
      useSelectDensity({
        hasValue: false,
        isMultiSelect: false,
        labelPlacement: 'outside',
        size: 's',
      }),
    );
    expect(small.current.contentPadding).toEqual({ top: 1, right: 2, bottom: 1, left: 2 });
  });

  it('tightens vertical padding to 8px for an inline (inside-horizontal) label', () => {
    const { result } = renderHook(() =>
      useSelectDensity({
        hasValue: false,
        isMultiSelect: false,
        labelPlacement: 'inside-horizontal',
        size: 's',
      }),
    );
    expect(result.current.contentPadding).toEqual({ top: 1, right: 2, bottom: 1, left: 2 });
  });

  it('tightens vertical padding to 6px for a vertically-stacked inside label', () => {
    const { result } = renderHook(() =>
      useSelectDensity({
        hasValue: false,
        isMultiSelect: false,
        labelPlacement: 'inside-vertical',
        size: 'l',
      }),
    );
    expect(result.current.contentPadding).toEqual({ top: 0.75, right: 2, bottom: 0.75, left: 2 });
  });

  it('reduces vertical padding for a multi-select once options are selected', () => {
    const sizes = [
      { size: 's', empty: 1, selected: 0.5 },
      { size: 'm', empty: 1.5, selected: 1 },
      { size: 'l', empty: 2, selected: 1 },
    ] as const;

    sizes.forEach(({ size, empty, selected }) => {
      const { result: withoutValue } = renderHook(() =>
        useSelectDensity({ hasValue: false, isMultiSelect: true, labelPlacement: 'outside', size }),
      );
      expect(withoutValue.current.contentPadding.top).toBe(empty);

      const { result: withValue } = renderHook(() =>
        useSelectDensity({ hasValue: true, isMultiSelect: true, labelPlacement: 'outside', size }),
      );
      expect(withValue.current.contentPadding.top).toBe(selected);
    });
  });

  it('scales the chip size with the control (l -> s, otherwise xs)', () => {
    const { result: large } = renderHook(() =>
      useSelectDensity({
        hasValue: true,
        isMultiSelect: true,
        labelPlacement: 'outside',
        size: 'l',
      }),
    );
    expect(large.current.chipSize).toBe('s');

    const { result: medium } = renderHook(() =>
      useSelectDensity({
        hasValue: true,
        isMultiSelect: true,
        labelPlacement: 'outside',
        size: 'm',
      }),
    );
    expect(medium.current.chipSize).toBe('xs');
  });
});
