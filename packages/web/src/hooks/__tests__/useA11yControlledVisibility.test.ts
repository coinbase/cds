import { renderHook } from '@testing-library/react-hooks';

import { useA11yControlledVisibility } from '../useA11yControlledVisibility';

const mockAccessibilityLabel = 'test';

describe('useA11yControlledVisibility', () => {
  it('expect it to return the correct attributes when given a visibility prop of false', () => {
    const { result } = renderHook(() => useA11yControlledVisibility(false));
    expect(result.current.triggerAccessibilityProps['aria-expanded']).toBe(false);
    expect(result.current.triggerAccessibilityProps['aria-haspopup']).toBe('dialog');
  });
  it('expect it to return the correct attributes when given a visibility prop of true', () => {
    const { result } = renderHook(() => useA11yControlledVisibility(true));
    expect(result.current.triggerAccessibilityProps['aria-expanded']).toBe(true);
    expect(result.current.triggerAccessibilityProps['aria-haspopup']).toBe('dialog');
  });
  it('expect trigger aria-controls prop and controlled element id to contain accessibility label when provided', () => {
    const { result } = renderHook(() =>
      useA11yControlledVisibility(false, { accessibilityLabel: mockAccessibilityLabel }),
    );
    expect(result.current.triggerAccessibilityProps['aria-controls']).toContain(
      mockAccessibilityLabel,
    );
    expect(result.current.controlledElementAccessibilityProps.id).toContain(mockAccessibilityLabel);
  });
  it('expect trigger aria-controls prop and controlled element id to contain correct hasPopupType when provided', () => {
    const { result } = renderHook(() =>
      useA11yControlledVisibility(false, { hasPopupType: 'true' }),
    );
    expect(result.current.triggerAccessibilityProps['aria-haspopup']).toBe('true');
  });
});
