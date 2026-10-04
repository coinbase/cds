import { renderHook } from '@testing-library/react';

import { useTimer } from '../useTimer';

describe('useTimer', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.spyOn(global, 'setTimeout');
    jest.spyOn(global, 'clearTimeout');
  });

  it('returns functions', () => {
    const { result } = renderHook(() => useTimer());

    expect(result.current.clear).toBeTruthy();
    expect(result.current.start).toBeTruthy();
    expect(result.current.pause).toBeTruthy();
    expect(result.current.resume).toBeTruthy();
  });

  it('starts timer', () => {
    const { result } = renderHook(() => useTimer());
    const callback = jest.fn();
    const duration = 1000;

    result.current.start(callback, duration);

    expect(callback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(duration);

    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), duration);
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('pauses timer and returns remaining time', () => {
    const { result } = renderHook(() => useTimer());
    const callback = jest.fn();
    const duration = 1000;
    const timeout = 500;
    const expectedRemainingTime = duration - timeout;

    result.current.start(callback, duration);
    jest.advanceTimersByTime(timeout);
    const remainingTime = result.current.pause();

    expect(remainingTime).toBe(expectedRemainingTime);
    expect(clearTimeout).toHaveBeenCalledTimes(1);
  });

  it('does not report a negative remaining time when pausing before starting', () => {
    const { result } = renderHook(() => useTimer());

    const remainingTime = result.current.pause();

    expect(remainingTime).toBe(0);
    expect(result.current.getRemainingTime()).toBe(0);
  });

  it('does not report a negative remaining time when pausing after the timer elapsed', () => {
    const { result } = renderHook(() => useTimer());
    const callback = jest.fn();
    const duration = 1000;

    result.current.start(callback, duration);
    jest.advanceTimersByTime(duration + 500);

    expect(result.current.pause()).toBe(0);
    expect(result.current.getRemainingTime()).toBe(0);
  });

  it('resumes with a non-negative delay when pausing after the timer elapsed', () => {
    const { result } = renderHook(() => useTimer());
    const callback = jest.fn();
    const duration = 1000;

    result.current.start(callback, duration);
    jest.advanceTimersByTime(duration + 500);
    result.current.pause();
    result.current.resume();

    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 0);
  });

  it('resumes timer', async () => {
    const { result } = renderHook(() => useTimer());
    const callback = jest.fn();
    const duration = 500;

    result.current.start(callback, duration);
    jest.advanceTimersByTime(200);
    const remainingTime = result.current.pause();
    result.current.resume();

    expect(setTimeout).toHaveBeenCalledTimes(2);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), remainingTime);
  });

  it('clears timer', () => {
    const { result } = renderHook(() => useTimer());
    const callback = jest.fn();
    const duration = 500;

    result.current.start(callback, duration);
    result.current.clear();

    expect(clearTimeout).toHaveBeenCalledTimes(1);
  });
});
