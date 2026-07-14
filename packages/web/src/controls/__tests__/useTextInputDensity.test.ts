import { renderHook } from '@testing-library/react';

import { useTextInputDensity } from '../useTextInputDensity';

describe('useTextInputDensity', () => {
  it('defaults to size l with outside label placement', () => {
    const { result } = renderHook(() =>
      useTextInputDensity({
        hasLabel: true,
        labelVariant: 'outside',
      }),
    );

    expect(result.current.resolvedSize).toBe('l');
    expect(result.current.labelPlacement).toBe('outside');
    expect(result.current.showLabelInStack).toBe(true);
    expect(result.current.showLabelInStartSlot).toBe(false);
    expect(result.current.nativeCompact).toBe(false);
    expect(result.current.dataSize).toBe('l');
  });

  it('uses legacy compact when compact is true and size is undefined', () => {
    const { result } = renderHook(() =>
      useTextInputDensity({
        compact: true,
        hasLabel: true,
        labelVariant: 'inside',
      }),
    );

    expect(result.current.useLegacyCompact).toBe(true);
    expect(result.current.labelPlacement).toBe('legacy-compact');
    expect(result.current.showLabelInStartSlot).toBe(true);
    expect(result.current.nativeCompact).toBe(true);
    expect(result.current.dataSize).toBeUndefined();
  });

  it('ignores compact when size is explicitly set', () => {
    const { result } = renderHook(() =>
      useTextInputDensity({
        compact: true,
        hasLabel: true,
        labelVariant: 'outside',
        size: 's',
      }),
    );

    expect(result.current.useLegacyCompact).toBe(false);
    expect(result.current.resolvedSize).toBe('s');
    expect(result.current.nativeCompact).toBe(false);
    expect(result.current.dataSize).toBe('s');
  });

  it('uses inside-horizontal for size s/m and inside-vertical for size l', () => {
    const { result: small } = renderHook(() =>
      useTextInputDensity({
        hasLabel: true,
        labelVariant: 'inside',
        size: 's',
      }),
    );
    expect(small.current.labelPlacement).toBe('inside-horizontal');

    const { result: large } = renderHook(() =>
      useTextInputDensity({
        hasLabel: true,
        labelVariant: 'inside',
        size: 'l',
      }),
    );
    expect(large.current.labelPlacement).toBe('inside-vertical');
    expect(large.current.inputStackLabelVariant).toBe('inside');
  });
});
