import { AccessibilityInfo } from 'react-native';
import { renderHook } from '@testing-library/react-hooks';

import { useScreenReaderStatus } from '../useScreenReaderStatus';

describe('useScreenReaderStatus', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return false by default', () => {
    const { result } = renderHook(() => useScreenReaderStatus());
    expect(result.current).toBe(false);
  });

  it('should return true when screen reader is enabled', async () => {
    (AccessibilityInfo.isScreenReaderEnabled as jest.Mock).mockResolvedValueOnce(true);
    const { result, waitForNextUpdate } = renderHook(() => useScreenReaderStatus());
    await waitForNextUpdate();
    expect(result.current).toBe(true);
  });

  it('should return false when screen reader is disabled', () => {
    (AccessibilityInfo.isScreenReaderEnabled as jest.Mock).mockResolvedValueOnce(false);
    const { result } = renderHook(() => useScreenReaderStatus());
    expect(result.current).toBe(false);
  });
});
