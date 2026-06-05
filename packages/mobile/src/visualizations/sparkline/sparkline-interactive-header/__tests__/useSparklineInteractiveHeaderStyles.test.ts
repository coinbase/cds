import type { StyleProp, TextStyle } from 'react-native';
import { renderHook } from '@testing-library/react-native';

import { defaultTheme } from '../../../../themes/defaultTheme';
import { DefaultThemeProvider } from '../../../../utils/testHelpers';
import { useSparklineInteractiveHeaderStyles } from '../useSparklineInteractiveHeaderStyles';

const getStyleValue = (styles: StyleProp<TextStyle>, styleProp: keyof TextStyle) =>
  (styles as TextStyle[]).reverse().find((item: TextStyle) => item?.[styleProp])?.[styleProp];

describe('useSparklineInteractiveHeaderStyles', () => {
  it('adjusts calculated width based on text length', () => {
    const { result } = renderHook(() => useSparklineInteractiveHeaderStyles(), {
      wrapper: DefaultThemeProvider,
    });
    const styles1 = result.current.title('$1,000');
    // Uses default fontSize if less than 12 characters
    expect(getStyleValue(styles1, 'fontSize')).toBe(28);
    // Calculates fontSize if > 12 characters
    const styles2 = result.current.title('$1,110,000.12');
    expect(getStyleValue(styles2, 'fontSize')).toBeLessThan(28);
  });

  it('sets correct styles for positive subHead (percent change)', () => {
    const { result } = renderHook(() => useSparklineInteractiveHeaderStyles(), {
      wrapper: DefaultThemeProvider,
    });
    const subHeadIconStyles = result.current.subHead('positive');
    expect(getStyleValue(subHeadIconStyles, 'color')).toBe(defaultTheme.lightColor.fgPositive);

    const subHeadStyles = result.current.subHead('positive');
    expect(getStyleValue(subHeadStyles, 'color')).toBe(defaultTheme.lightColor.fgPositive);
  });

  it('sets correct styles for negative subHead (percent change)', () => {
    const { result } = renderHook(() => useSparklineInteractiveHeaderStyles(), {
      wrapper: DefaultThemeProvider,
    });
    const subHeadIconStyles = result.current.subHead('negative');
    expect(getStyleValue(subHeadIconStyles, 'color')).toBe(defaultTheme.lightColor.fgNegative);

    const subHeadStyles = result.current.subHead('negative');
    expect(getStyleValue(subHeadStyles, 'color')).toBe(defaultTheme.lightColor.fgNegative);
  });
});
