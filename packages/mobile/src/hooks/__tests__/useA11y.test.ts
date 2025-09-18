import { AccessibilityInfo } from 'react-native';
import { renderHook } from '@testing-library/react-hooks';

import { useA11y } from '../useA11y';

describe('useA11y', () => {
  it('should return setA11yFocus and announceForA11y functions', () => {
    const { result } = renderHook(() => useA11y());

    expect(typeof result.current.setA11yFocus).toBe('function');
    expect(typeof result.current.announceForA11y).toBe('function');
  });

  it('announceForA11y should call AccessibilityInfo.announceForAccessibility with text', () => {
    const text = 'Hello';
    const { result } = renderHook(() => useA11y());

    result.current.announceForA11y(text);

    expect(AccessibilityInfo.announceForAccessibility).toHaveBeenCalledWith(text);
  });
});
