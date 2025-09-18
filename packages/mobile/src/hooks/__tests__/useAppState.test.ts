import type { AppStateStatus } from 'react-native';
import { renderHook } from '@testing-library/react-hooks';

import { useAppState } from '../useAppState';

describe('useAppState', () => {
  const removeListenerSpy = jest.fn();
  const addListenerSpy = jest.fn(() => {
    return {
      remove: removeListenerSpy,
    };
  });

  const mockCurrentAppState = (state: AppStateStatus) => {
    jest.resetModules();
    jest.doMock('react-native/Libraries/AppState/AppState', () => ({
      currentState: state,
      addEventListener: addListenerSpy,
    }));
  };

  it('returns AppState.currentState - active', () => {
    mockCurrentAppState('active');
    const { result } = renderHook(() => useAppState());
    expect(result.current).toBe('active');
  });

  it('returns AppState.currentState - inactive', () => {
    mockCurrentAppState('inactive');
    const { result } = renderHook(() => useAppState());
    expect(result.current).toBe('inactive');
  });

  it('adds an event listener for state changes', () => {
    mockCurrentAppState('active');
    renderHook(() => useAppState());
    expect(addListenerSpy).toHaveBeenCalled();
  });

  it('removes event listener on unmount', () => {
    mockCurrentAppState('inactive');
    const { unmount } = renderHook(() => useAppState());
    unmount();
    expect(removeListenerSpy).toHaveBeenCalled();
  });
});
