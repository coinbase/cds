import { renderHook } from '@testing-library/react';

import { usePreviousValue } from '../usePreviousValue';

describe('usePreviousValue', () => {
  it('returns undefined on initial render', () => {
    const { result } = renderHook(({ value }) => usePreviousValue(value), {
      initialProps: { value: 'initial' },
    });

    expect(result.current).toBeUndefined();
  });

  it('returns the previous value after rerender with a new value', () => {
    const { result, rerender } = renderHook(({ value }) => usePreviousValue(value), {
      initialProps: { value: 'a' },
    });

    rerender({ value: 'b' });
    expect(result.current).toBe('a');

    rerender({ value: 'c' });
    expect(result.current).toBe('b');
  });

  it('returns the last distinct value when rerendered with unchanged value', () => {
    const { result, rerender } = renderHook(({ value }) => usePreviousValue(value), {
      initialProps: { value: 'a' },
    });

    rerender({ value: 'b' });
    expect(result.current).toBe('a');

    // Rerender with same value - effect doesn't re-run, so previous becomes 'b'
    rerender({ value: 'b' });
    expect(result.current).toBe('b');

    // Change to new value - previous should be 'b'
    rerender({ value: 'c' });
    expect(result.current).toBe('b');
  });
});
