import { renderHook } from '@testing-library/react-hooks';

import type { UseSparklineCoordinatesParams } from '../useSparklineCoordinates';
import { useSparklineCoordinates } from '../useSparklineCoordinates';

const sharedProps = {
  width: 440,
  height: 320,
};

const mockData1: UseSparklineCoordinatesParams = {
  ...sharedProps,
  data: [
    {
      value: 100,
      date: new Date(2018, 8, 1),
    },
    {
      value: 200,
      date: new Date(2018, 12, 2),
    },
  ],
};

const mockData2: UseSparklineCoordinatesParams = {
  ...sharedProps,
  data: [
    {
      value: 500,
      date: new Date(2020, 1, 1),
    },
    {
      value: 400,
      date: new Date(2020, 1, 2),
    },
  ],
};

describe('useSparklineCoordinates', () => {
  it('returns the correct path', () => {
    const { result, rerender } = renderHook((props: UseSparklineCoordinatesParams = mockData1) => {
      return useSparklineCoordinates(props);
    });
    const path1 = result.current.path;
    rerender(mockData2);
    const path2 = result.current.path;

    expect(mockData1).not.toEqual(mockData2);
    expect(path1).toBe('M2,318L438,2');
    expect(path2).toBe('M2,2L438,318');
    expect(path1).not.toEqual(path2);
  });

  it('returns the correct area', () => {
    const { result, rerender } = renderHook((props: UseSparklineCoordinatesParams = mockData1) => {
      return useSparklineCoordinates(props);
    });
    const area1 = result.current.area;
    rerender(mockData2);
    const area2 = result.current.area;

    expect(mockData1).not.toEqual(mockData2);
    expect(area1).toBe('M2,318L438,2L438,320L2,320Z');
    expect(area2).toBe('M2,2L438,318L438,320L2,320Z');
    expect(area1).not.toEqual(area2);
  });

  it('returns the data point for a given x position', () => {
    const marker1 = {
      value: 0,
      date: new Date(2020, 1, 1),
    };
    const marker2 = {
      value: 500,
      date: new Date(2020, 1, 2),
    };
    const { result } = renderHook(() =>
      useSparklineCoordinates({
        width: 100,
        height: 100,
        data: [marker1, marker2],
      }),
    );
    // borderWidth.sparkline of 2px is accounted for when plotting path
    expect(result.current.getMarker(0)).toEqual({ ...marker1, x: 2, y: 98 });
  });
});
