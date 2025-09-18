import { StatusBar } from 'react-native';
import { renderHook } from '@testing-library/react-hooks';

import { useStatusBarHeight } from '../useStatusBarHeight';

import { mockStatusBarHeight } from './constants';

describe('useStatusBarHeight.test', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  it('returns status bar height', () => {
    const { result } = renderHook(() => useStatusBarHeight());

    expect(result.current).toBe(mockStatusBarHeight);
  });

  it('returns default status bar height on android', () => {
    jest.doMock('react-native/Libraries/Utilities/Platform', () => ({ OS: 'android' }));

    const { result } = renderHook(() => useStatusBarHeight());

    expect(result.current).toBe(StatusBar.currentHeight);
  });
});
