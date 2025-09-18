import { SafeAreaProvider } from 'react-native-safe-area-context';
import { renderHook } from '@testing-library/react-hooks';

import { DefaultThemeProvider, SAFE_AREA_METRICS } from '../../../utils/testHelpers';
import { useDrawerSpacing } from '../useDrawerSpacing';

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <DefaultThemeProvider>
    <SafeAreaProvider initialMetrics={SAFE_AREA_METRICS}>{children}</SafeAreaProvider>
  </DefaultThemeProvider>
);

describe('useDrawerSpacing.test', () => {
  it('returns spacing for top pin', () => {
    const { result } = renderHook(() => useDrawerSpacing('top'), {
      wrapper,
    });

    expect(result.current).toEqual({
      paddingTop: 40,
    });
  });

  it('returns spacing for left pin', () => {
    const { result } = renderHook(() => useDrawerSpacing('left'), {
      wrapper,
    });

    expect(result.current).toEqual({
      paddingTop: 0,
      paddingLeft: 40,
    });
  });

  it('returns spacing for right pin', () => {
    const { result } = renderHook(() => useDrawerSpacing('right'), {
      wrapper,
    });

    expect(result.current).toEqual({
      paddingTop: 0,
      paddingRight: 40,
    });
  });

  it('returns spacing for all pin', () => {
    const { result } = renderHook(() => useDrawerSpacing('all'), {
      wrapper,
    });

    expect(result.current).toEqual({
      paddingBottom: 48,
    });
  });
});
