import { renderHook } from '@testing-library/react-native';

import { useStatusBarHeight } from '../useStatusBarHeight';

import { mockStatusBarHeight } from './constants';

describe('useStatusBarHeight.test', () => {
  it('returns status bar height', () => {
    const { result } = renderHook(() => useStatusBarHeight());

    expect(result.current).toBe(mockStatusBarHeight);
  });
});
