import { AppState, type AppStateStatus } from 'react-native';
import { renderHook } from '@testing-library/react-native';

import { useAppState } from '../useAppState';

describe('useAppState', () => {
  const mockRemoveListener = jest.fn();
  let addEventListenerSpy: jest.SpyInstance;
  const originalCurrentState = AppState.currentState;

  beforeEach(() => {
    jest.clearAllMocks();
    addEventListenerSpy = jest.spyOn(AppState, 'addEventListener').mockReturnValue({
      remove: mockRemoveListener,
    });
  });

  afterEach(() => {
    addEventListenerSpy.mockRestore();
    Object.defineProperty(AppState, 'currentState', {
      value: originalCurrentState,
      writable: true,
      configurable: true,
    });
  });

  const mockCurrentState = (state: AppStateStatus) => {
    Object.defineProperty(AppState, 'currentState', {
      value: state,
      writable: true,
      configurable: true,
    });
  };

  it('returns AppState.currentState - active', () => {
    mockCurrentState('active');
    const { result } = renderHook(() => useAppState());
    expect(result.current).toBe('active');
  });

  it('returns AppState.currentState - inactive', () => {
    mockCurrentState('inactive');
    const { result } = renderHook(() => useAppState());
    expect(result.current).toBe('inactive');
  });

  it('adds an event listener for state changes', () => {
    mockCurrentState('active');
    renderHook(() => useAppState());
    expect(addEventListenerSpy).toHaveBeenCalled();
  });

  it('removes event listener on unmount', () => {
    mockCurrentState('inactive');
    const { unmount } = renderHook(() => useAppState());
    unmount();
    expect(mockRemoveListener).toHaveBeenCalled();
  });
});
