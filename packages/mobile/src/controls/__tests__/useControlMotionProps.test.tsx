import { renderHook } from '@testing-library/react-hooks';

import { useControlMotionProps } from '../useControlMotionProps';

describe('useControlMotionProps.test', () => {
  it('returns default value when checked', () => {
    const { result } = renderHook(() => useControlMotionProps({ checked: true, disabled: false }));

    expect((result.current.animatedBoxValue as any)._value).toBe(1);
    expect((result.current.animatedScaleValue as any)._value).toBe(1);
    expect((result.current.animatedOpacityValue as any)._value).toBe(1);
  });

  it('returns default value when unchecked', () => {
    const { result } = renderHook(() => useControlMotionProps({ checked: false, disabled: false }));

    expect((result.current.animatedBoxValue as any)._value).toBe(0);
    expect((result.current.animatedScaleValue as any)._value).toBe(0.9);
    expect((result.current.animatedOpacityValue as any)._value).toBe(0);
  });
});
