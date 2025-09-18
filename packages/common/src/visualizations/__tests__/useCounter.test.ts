import { act } from 'react';
import { renderHook } from '@testing-library/react-hooks';

import { useCounter } from '../useCounter';

/* eslint-disable jest/expect-expect */

function countSetTimeoutCalls() {
  return (setTimeout as jest.MockedFunction<typeof setTimeout>).mock.calls.filter(
    ([fn, t]) => t !== 0 || !String(fn).includes('_flushCallback'),
  );
}

jest.useFakeTimers({
  legacyFakeTimers: true,
});
jest.spyOn(global, 'setTimeout');

const TIMEOUT_DURATION = 500;
describe('useCounter tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  async function runTest(startValue: number, endValue: number, expectedIterations: number) {
    const currentTime = 1637957276262; // baseline doesn't matter

    const realDateNow = Date.now.bind(global.Date);

    let increment = -2;
    jest.spyOn(global.Date, 'now').mockImplementation(() => {
      increment += 1;
      return (
        currentTime +
        Math.max(1, TIMEOUT_DURATION / Math.max(startValue, endValue)) * Math.max(0, increment)
      );
    });

    const { result } = renderHook(() => {
      return useCounter({
        startNum: startValue,
        endNum: endValue,
        durationInMillis: TIMEOUT_DURATION,
      });
    });

    expect(result.current).toEqual(startValue);

    expect(countSetTimeoutCalls()).toHaveLength(1);

    await act(async () => {
      jest.runAllTimers();
    });

    expect(countSetTimeoutCalls()).toHaveLength(expectedIterations + 1);
    expect(result.current).toEqual(endValue);

    global.Date.now = realDateNow;
  }

  it('can count up', async () => {
    await runTest(0, 75, 75);
  });

  it('can count down', async () => {
    await runTest(75, 0, 75);
  });

  it('can count up large number', async () => {
    await runTest(0, 75000, TIMEOUT_DURATION);
  });

  it('can count down large number', async () => {
    await runTest(75000, 0, TIMEOUT_DURATION);
  });
});
