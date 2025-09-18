import { useCallback, useEffect, useState } from 'react';
import { AppState } from 'react-native';
import type { AppStateStatus } from 'react-native';

export const useAppState = () => {
  const [appState, setAppState] = useState(AppState.currentState);

  const handleChange = useCallback((newState: AppStateStatus) => {
    setAppState(newState);
  }, []);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', handleChange);

    return () => {
      subscription.remove();
    };
  }, [handleChange]);

  return appState;
};
