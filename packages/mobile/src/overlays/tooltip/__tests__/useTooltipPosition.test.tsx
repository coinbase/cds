import { Platform } from 'react-native';
import { renderHook } from '@testing-library/react-native';

import { useDimensions } from '../../../hooks/useDimensions';
import { DefaultThemeProvider } from '../../../utils/testHelpers';
import type { UseTooltipPositionParams } from '../TooltipProps';
import { useTooltipPosition } from '../useTooltipPosition';

jest.mock('../../../hooks/useDimensions');

const mockUseDimensions = (mocks: ReturnType<typeof useDimensions>) => {
  (useDimensions as jest.Mock).mockReturnValue(mocks);
};

const createHookInstance = (options: UseTooltipPositionParams) => {
  return renderHook(() => useTooltipPosition(options), {
    wrapper: DefaultThemeProvider,
  });
};

const STATUS_BAR_HEIGHT = 24;
const SCREEN_HEIGHT = 800;
const SCREEN_WIDTH = 400;

const baseSubjectLayout = {
  height: 40,
  width: 100,
  pageOffsetX: 150,
  pageOffsetY: 200,
};

const baseTooltipLayout = {
  height: 50,
  width: 150,
  x: 0,
  y: 0,
};

describe('useTooltipPosition - Android Edge-to-Edge', () => {
  const originalPlatformOS = Platform.OS;

  beforeEach(() => {
    jest.clearAllMocks();
    // Set platform to Android for these tests
    Platform.OS = 'android';
  });

  afterEach(() => {
    Platform.OS = originalPlatformOS;
  });

  describe('Android Edge-to-Edge Mode (safe area insets > 0)', () => {
    // In edge-to-edge mode, useSafeAreaInsets().top returns the status bar height
    // The Modal and main view share the same coordinate system (both start from screen top)
    // Therefore, NO adjustment should be made to pageOffsetY

    it('positions tooltip above subject without status bar offset', () => {
      // Edge-to-edge: statusBarHeight comes from safe area insets and is > 0
      mockUseDimensions({
        screenHeight: SCREEN_HEIGHT,
        screenWidth: SCREEN_WIDTH,
        statusBarHeight: STATUS_BAR_HEIGHT,
      });

      const { result } = createHookInstance({
        placement: 'top',
        subjectLayout: baseSubjectLayout,
        tooltipLayout: baseTooltipLayout,
      });

      // Expected: tooltip top = pageOffsetY - tooltipHeight (no status bar subtraction)
      // = 200 - 50 = 150
      const expectedTop = baseSubjectLayout.pageOffsetY - baseTooltipLayout.height;

      expect(result.current.top).toBe(expectedTop);
      expect(result.current.opacity).toBe(1);
    });

    it('positions tooltip below subject without status bar offset', () => {
      mockUseDimensions({
        screenHeight: SCREEN_HEIGHT,
        screenWidth: SCREEN_WIDTH,
        statusBarHeight: STATUS_BAR_HEIGHT,
      });

      const { result } = createHookInstance({
        placement: 'bottom',
        subjectLayout: baseSubjectLayout,
        tooltipLayout: baseTooltipLayout,
      });

      // Expected: tooltip top = pageOffsetY + subjectHeight (no status bar subtraction)
      // = 200 + 40 = 240
      const expectedTop = baseSubjectLayout.pageOffsetY + baseSubjectLayout.height;

      expect(result.current.top).toBe(expectedTop);
      expect(result.current.opacity).toBe(1);
    });
  });

  describe('Android Non-Edge-to-Edge Mode (safe area insets = 0)', () => {
    // In non-edge-to-edge mode, useSafeAreaInsets().top returns 0
    // But the coordinate systems are still offset by the status bar
    // Therefore, we need to subtract StatusBar.currentHeight from pageOffsetY

    it('positions tooltip above subject with status bar offset adjustment', () => {
      // Non-edge-to-edge: statusBarHeight from safe area insets is 0
      // But StatusBar.currentHeight should be used for the offset
      mockUseDimensions({
        screenHeight: SCREEN_HEIGHT,
        screenWidth: SCREEN_WIDTH,
        statusBarHeight: 0,
      });

      const { result } = createHookInstance({
        placement: 'top',
        subjectLayout: baseSubjectLayout,
        tooltipLayout: baseTooltipLayout,
      });

      // Expected: tooltip top = (pageOffsetY - StatusBar.currentHeight) - tooltipHeight
      // With StatusBar.currentHeight ≈ 24, this should be: (200 - 24) - 50 = 126
      // Note: The actual StatusBar.currentHeight value would come from the native module
      // For this test, we verify the offset IS applied (top should be less than edge-to-edge case)
      const edgeToEdgeTop = baseSubjectLayout.pageOffsetY - baseTooltipLayout.height; // 150

      // In non-edge-to-edge, the top should be offset by the status bar height
      // So it should be: 150 - ACTUAL_STATUS_BAR_HEIGHT
      // We expect this to be LESS than the edge-to-edge case
      expect(result.current.top).toBeLessThan(edgeToEdgeTop);
      expect(result.current.opacity).toBe(1);
    });

    it('positions tooltip below subject with status bar offset adjustment', () => {
      mockUseDimensions({
        screenHeight: SCREEN_HEIGHT,
        screenWidth: SCREEN_WIDTH,
        statusBarHeight: 0,
      });

      const { result } = createHookInstance({
        placement: 'bottom',
        subjectLayout: baseSubjectLayout,
        tooltipLayout: baseTooltipLayout,
      });

      // Expected: tooltip top = (pageOffsetY - StatusBar.currentHeight) + subjectHeight
      // With StatusBar.currentHeight ≈ 24, this should be: (200 - 24) + 40 = 216
      const edgeToEdgeTop = baseSubjectLayout.pageOffsetY + baseSubjectLayout.height; // 240

      // In non-edge-to-edge, the top should be offset by the status bar height
      expect(result.current.top).toBeLessThan(edgeToEdgeTop);
      expect(result.current.opacity).toBe(1);
    });
  });

  describe('Android with yShiftByStatusBarHeight flag', () => {
    // When yShiftByStatusBarHeight is true, the status bar offset should NOT be applied
    // This is for cases where the tooltip is already in a context with aligned coordinates

    it('does not apply status bar offset when yShiftByStatusBarHeight is true', () => {
      mockUseDimensions({
        screenHeight: SCREEN_HEIGHT,
        screenWidth: SCREEN_WIDTH,
        statusBarHeight: STATUS_BAR_HEIGHT,
      });

      const { result } = createHookInstance({
        placement: 'top',
        subjectLayout: baseSubjectLayout,
        tooltipLayout: baseTooltipLayout,
        yShiftByStatusBarHeight: true,
      });

      // With yShiftByStatusBarHeight=true, should use pageOffsetY directly
      const expectedTop = baseSubjectLayout.pageOffsetY - baseTooltipLayout.height;

      expect(result.current.top).toBe(expectedTop);
    });
  });
});

describe('useTooltipPosition - iOS (baseline comparison)', () => {
  const originalPlatformOS = Platform.OS;

  beforeEach(() => {
    jest.clearAllMocks();
    Platform.OS = 'ios';
  });

  afterEach(() => {
    Platform.OS = originalPlatformOS;
  });

  it('positions tooltip without status bar offset on iOS', () => {
    mockUseDimensions({
      screenHeight: SCREEN_HEIGHT,
      screenWidth: SCREEN_WIDTH,
      statusBarHeight: STATUS_BAR_HEIGHT,
    });

    const { result } = createHookInstance({
      placement: 'top',
      subjectLayout: baseSubjectLayout,
      tooltipLayout: baseTooltipLayout,
    });

    // iOS always uses pageOffsetY directly (no status bar subtraction)
    const expectedTop = baseSubjectLayout.pageOffsetY - baseTooltipLayout.height;

    expect(result.current.top).toBe(expectedTop);
    expect(result.current.opacity).toBe(1);
  });
});
