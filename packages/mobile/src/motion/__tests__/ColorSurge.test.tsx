import { createRef } from 'react';
import { Animated } from 'react-native';
import { act, render } from '@testing-library/react-native';

import { DefaultThemeProvider } from '../../utils/testHelpers';
import type { ColorSurgeRefBaseProps } from '../ColorSurge';
import { ColorSurge } from '../ColorSurge';

describe('ColorSurge', () => {
  let start = jest.fn();

  beforeEach(() => {
    start = jest.fn();
    // @ts-expect-error - mock is incomplete but functional
    jest.spyOn(Animated, 'sequence').mockImplementation(() => ({ start }));
    // @ts-expect-error - mock is incomplete but functional
    jest.spyOn(Animated, 'Value').mockImplementation(() => ({
      stopAnimation: jest.fn(),
      setValue: jest.fn(),
      interpolate: jest.fn(),
    }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('starts animation on mount by default', () => {
    render(
      <DefaultThemeProvider>
        <ColorSurge />
      </DefaultThemeProvider>,
    );
    expect(start).toHaveBeenCalledTimes(1);
  });

  it('does not start animation on mount when disableAnimateOnMount', () => {
    render(
      <DefaultThemeProvider>
        <ColorSurge disableAnimateOnMount />
      </DefaultThemeProvider>,
    );
    expect(start).not.toHaveBeenCalled();
  });

  it('exposes imperative play handler via ref', () => {
    const ref = createRef<ColorSurgeRefBaseProps>();
    render(
      <DefaultThemeProvider>
        <ColorSurge ref={ref} disableAnimateOnMount />
      </DefaultThemeProvider>,
    );

    expect(ref.current).not.toBeNull();
    expect(typeof ref.current?.play).toBe('function');

    start.mockClear();
    act(() => void ref.current?.play());
    expect(start).toHaveBeenCalledTimes(1);
  });

  it('exposes imperative play handler that accepts a background color', () => {
    const ref = createRef<ColorSurgeRefBaseProps>();
    render(
      <DefaultThemeProvider>
        <ColorSurge ref={ref} disableAnimateOnMount />
      </DefaultThemeProvider>,
    );

    start.mockClear();
    act(() => void ref.current?.play('bgSecondary'));
    expect(start).toHaveBeenCalledTimes(1);
  });
});
