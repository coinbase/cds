import { renderHook } from '@testing-library/react';

import { useTextInputDensity, useTextInputPlacement } from '../useTextInputDensity';

describe('useTextInputPlacement', () => {
  it('places the label outside by default', () => {
    const { result } = renderHook(() =>
      useTextInputPlacement({ hasLabel: true, labelVariant: 'outside', size: 'l' }),
    );

    expect(result.current).toBe('outside');
  });

  it('renders the label inline (inside-horizontal) when compact', () => {
    const { result } = renderHook(() =>
      useTextInputPlacement({ compact: true, hasLabel: true, labelVariant: 'inside', size: 'l' }),
    );

    expect(result.current).toBe('inside-horizontal');
  });

  it('places the label outside when compact but there is no label', () => {
    const { result } = renderHook(() =>
      useTextInputPlacement({ compact: true, hasLabel: false, labelVariant: 'inside', size: 'l' }),
    );

    expect(result.current).toBe('outside');
  });

  it('stacks the inside label vertically at size l and horizontally at s/m', () => {
    const { result: large } = renderHook(() =>
      useTextInputPlacement({ hasLabel: true, labelVariant: 'inside', size: 'l' }),
    );
    expect(large.current).toBe('inside-vertical');

    const { result: small } = renderHook(() =>
      useTextInputPlacement({ hasLabel: true, labelVariant: 'inside', size: 's' }),
    );
    expect(small.current).toBe('inside-horizontal');
  });
});

describe('useTextInputDensity', () => {
  it('uses per-size vertical padding with constant horizontal padding', () => {
    const { result: large } = renderHook(() =>
      useTextInputDensity({ labelPlacement: 'outside', size: 'l' }),
    );
    expect(large.current.contentPadding).toEqual({ top: 2, right: 2, bottom: 2, left: 2 });

    const { result: medium } = renderHook(() =>
      useTextInputDensity({ labelPlacement: 'outside', size: 'm' }),
    );
    expect(medium.current.contentPadding).toEqual({ top: 1.5, right: 2, bottom: 1.5, left: 2 });

    const { result: small } = renderHook(() =>
      useTextInputDensity({ labelPlacement: 'outside', size: 's' }),
    );
    expect(small.current.contentPadding).toEqual({ top: 1, right: 2, bottom: 1, left: 2 });
  });

  it('collapses to space-1 all around for legacy compact', () => {
    const { result } = renderHook(() =>
      useTextInputDensity({ compact: true, labelPlacement: 'inside-horizontal', size: 'l' }),
    );
    expect(result.current.contentPadding).toEqual({ top: 1, right: 1, bottom: 1, left: 1 });
  });

  it('tightens vertical padding for a vertically-stacked inside label', () => {
    const { result } = renderHook(() =>
      useTextInputDensity({ labelPlacement: 'inside-vertical', size: 'l' }),
    );
    expect(result.current.contentPadding).toEqual({ top: 0.75, right: 2, bottom: 0.75, left: 2 });
  });

  it('exposes a content gap for spacing between slots', () => {
    const { result } = renderHook(() =>
      useTextInputDensity({ labelPlacement: 'outside', size: 'l' }),
    );
    expect(result.current.contentGap).toBe(0.5);
  });
});
