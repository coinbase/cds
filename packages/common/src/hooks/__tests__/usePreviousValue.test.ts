import { useState } from 'react';
import { act, renderHook } from '@testing-library/react-hooks';

import { usePreviousValue } from '../usePreviousValue';

describe('usePreviousValue', () => {
  const useMockPreviousValue = () => {
    const [currentValue, setCurrentValue] = useState(false);
    const previousValue = usePreviousValue(currentValue);
    return {
      setCurrentValue,
      previousValue,
      currentValue,
    };
  };

  it('returns the previous value when input changes', () => {
    const { result } = renderHook(() => useMockPreviousValue());
    expect(result.current.previousValue).toBeUndefined();
    expect(result.current.currentValue).toBe(false);

    act(() => {
      result.current.setCurrentValue(true);
    });
    expect(result.current.previousValue).toBe(false);
    expect(result.current.currentValue).toBe(true);

    act(() => {
      result.current.setCurrentValue(false);
    });
    expect(result.current.previousValue).toBe(true);
    expect(result.current.currentValue).toBe(false);

    act(() => {
      result.current.setCurrentValue(false);
    });
    expect(result.current.previousValue).toBe(false);
    expect(result.current.currentValue).toBe(false);
  });
});
