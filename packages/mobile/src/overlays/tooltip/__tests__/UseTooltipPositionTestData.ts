import type { LayoutRectangle } from 'react-native';

import type { useDimensions } from '../../../hooks/useDimensions';
import type { SubjectLayout } from '../TooltipProps';

export const galaxyScreenDimensions: ReturnType<typeof useDimensions> = {
  screenHeight: 779.3777777777777,
  screenWidth: 384,
  statusBarHeight: 25.955554962158203,
};

type UseTooltipPositionExpectedResult = {
  opacity: number;
  start: number;
  top: number;
};

export type UseTooltipPositionTestData = {
  subjectLayout: SubjectLayout;
  tooltipLayout: LayoutRectangle;
  dimensions: ReturnType<typeof useDimensions>;
  expectedTop: UseTooltipPositionExpectedResult;
  expectedBottom: UseTooltipPositionExpectedResult;
};

export const basicCenterSubject: UseTooltipPositionTestData = {
  subjectLayout: {
    height: 20.266666412353516,
    pageOffsetX: 178.13333129882812,
    pageOffsetY: 291.20001220703125,
    width: 28.08888816833496,
  },
  tooltipLayout: {
    height: 52.266666412353516,
    width: 158.57777404785156,
    x: 113.06666564941406,
    y: 212.977783203125,
  },
  dimensions: galaxyScreenDimensions,

  expectedTop: { opacity: 1, start: 112.13333129882812, top: 212.97779083251953 },

  // To do:
  expectedBottom: {
    opacity: 0,
    start: 0,
    top: 0,
  },
};
