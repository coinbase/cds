import { renderHook } from '@testing-library/react-native';

import { defaultTheme } from '../../themes/defaultTheme';
import { textInputSizePaddingY, useTextInputDensity } from '../useTextInputDensity';

describe('useTextInputDensity', () => {
  it('defaults to size l with outside label placement', () => {
    const { result } = renderHook(() =>
      useTextInputDensity({
        hasLabel: true,
        hasStart: false,
        labelVariant: 'outside',
        theme: defaultTheme,
      }),
    );

    expect(result.current.resolvedSize).toBe('l');
    expect(result.current.labelPlacement).toBe('outside');
    expect(result.current.showLabelInStack).toBe(true);
    expect(result.current.showLabelInStartSlot).toBe(false);
    expect(result.current.nativeCompact).toBeUndefined();
    expect(result.current.inputStackLabelVariant).toBe('outside');
  });

  it('uses legacy compact when compact is true and size is undefined', () => {
    const { result } = renderHook(() =>
      useTextInputDensity({
        compact: true,
        hasLabel: true,
        hasStart: false,
        labelVariant: 'inside',
        theme: defaultTheme,
      }),
    );

    expect(result.current.useLegacyCompact).toBe(true);
    expect(result.current.labelPlacement).toBe('legacy-compact');
    expect(result.current.showLabelInStartSlot).toBe(true);
    expect(result.current.showLabelInStack).toBe(false);
    expect(result.current.nativeCompact).toBe(true);
  });

  it('ignores compact when size is explicitly set', () => {
    const { result } = renderHook(() =>
      useTextInputDensity({
        compact: true,
        hasLabel: true,
        hasStart: false,
        labelVariant: 'outside',
        size: 's',
        theme: defaultTheme,
      }),
    );

    expect(result.current.useLegacyCompact).toBe(false);
    expect(result.current.resolvedSize).toBe('s');
    expect(result.current.nativeCompact).toBeUndefined();
  });

  it('uses inside-vertical placement for size l with inside label', () => {
    const { result } = renderHook(() =>
      useTextInputDensity({
        hasLabel: true,
        hasStart: false,
        labelVariant: 'inside',
        size: 'l',
        theme: defaultTheme,
      }),
    );

    expect(result.current.labelPlacement).toBe('inside-vertical');
    expect(result.current.inputStackLabelVariant).toBe('inside');
    expect(result.current.showLabelInStack).toBe(true);
  });

  it('uses inside-horizontal placement for size s/m with inside label', () => {
    const { result: smallResult } = renderHook(() =>
      useTextInputDensity({
        hasLabel: true,
        hasStart: false,
        labelVariant: 'inside',
        size: 's',
        theme: defaultTheme,
      }),
    );

    expect(smallResult.current.labelPlacement).toBe('inside-horizontal');
    expect(smallResult.current.showLabelInStartSlot).toBe(true);

    const { result: mediumResult } = renderHook(() =>
      useTextInputDensity({
        hasLabel: true,
        hasStart: false,
        labelVariant: 'inside',
        size: 'm',
        theme: defaultTheme,
      }),
    );

    expect(mediumResult.current.labelPlacement).toBe('inside-horizontal');
  });

  it('allows outside label with size s', () => {
    const { result } = renderHook(() =>
      useTextInputDensity({
        hasLabel: true,
        hasStart: false,
        labelVariant: 'outside',
        size: 's',
        theme: defaultTheme,
      }),
    );

    expect(result.current.labelPlacement).toBe('outside');
    expect(result.current.showLabelInStack).toBe(true);
    expect(result.current.showLabelInStartSlot).toBe(false);
  });

  it('applies size paddingY overrides through containerSpacing', () => {
    const { result: smallResult } = renderHook(() =>
      useTextInputDensity({
        hasLabel: false,
        hasStart: false,
        size: 's',
        theme: defaultTheme,
      }),
    );

    expect(smallResult.current.containerSpacing.paddingVertical).toBe(
      defaultTheme.space[textInputSizePaddingY.s],
    );

    const { result: mediumResult } = renderHook(() =>
      useTextInputDensity({
        hasLabel: false,
        hasStart: false,
        size: 'm',
        theme: defaultTheme,
      }),
    );

    expect(mediumResult.current.containerSpacing.paddingVertical).toBe(
      defaultTheme.space[textInputSizePaddingY.m],
    );

    const { result: largeResult } = renderHook(() =>
      useTextInputDensity({
        hasLabel: false,
        hasStart: false,
        size: 'l',
        theme: defaultTheme,
      }),
    );

    expect(largeResult.current.containerSpacing.paddingVertical).toBeUndefined();
  });
});
