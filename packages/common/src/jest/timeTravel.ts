/**
 * @link https://caian.dev/posts/test-animations-react-native/
 */
import { advanceBy, advanceTo, clear } from 'jest-date-mock';

export const FRAME_TIME = 10;

function advanceOneFrame() {
  advanceBy(FRAME_TIME);
  jest.advanceTimersByTime(FRAME_TIME);
}

/**
 * Setup tests for time travel (start date)
 */
export function setup(startDate = '') {
  advanceTo(new Date(startDate));
  jest.useFakeTimers();
}

/**
 * Travel a specific amount of time (in ms) inside a test
 */
export function timeTravel(time = FRAME_TIME) {
  const frames = time / FRAME_TIME;
  for (let i = 0; i < frames; i += 1) {
    advanceOneFrame();
  }
}

/**
 * End test with time travel
 */
export function teardown() {
  clear();
  jest.useRealTimers();
}

export const withTimeTravel = (func: (cb: typeof timeTravel) => void) => {
  setup();
  func(timeTravel);
  teardown();
};
