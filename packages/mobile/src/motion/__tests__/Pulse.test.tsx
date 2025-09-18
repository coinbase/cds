import React, { act } from 'react';
import { Animated, Text } from 'react-native';
import { render, screen } from '@testing-library/react-native';

import { Pulse } from '../Pulse';

describe('Pulse', () => {
  let start = jest.fn();
  let stop = jest.fn();

  beforeEach(() => {
    start = jest.fn();
    stop = jest.fn();
    // @ts-expect-error - mock is incomplete but functional
    jest.spyOn(Animated, 'loop').mockImplementation(() => ({ start }));
    // @ts-expect-error - mock is incomplete but functional
    jest.spyOn(Animated, 'Value').mockImplementation(() => ({
      stopAnimation: stop,
      setValue: jest.fn(),
      interpolate: jest.fn(),
    }));
  });

  it('passes a11y', () => {
    const childrenText = 'Children text';
    render(
      <Pulse>
        <Text>{childrenText}</Text>
      </Pulse>,
    );
    expect(screen.getByText(childrenText)).toBeAccessible();
  });

  it('renders children', () => {
    const childrenText = 'Children text';
    render(
      <Pulse>
        <Text>{childrenText}</Text>
      </Pulse>,
    );
    expect(screen.getByText(childrenText)).toBeDefined();
  });

  it('starts animation on mount by default', () => {
    render(
      <Pulse>
        <Text>Children</Text>
      </Pulse>,
    );
    expect(start).toHaveBeenCalledTimes(1);
  });

  it('doesnt start animation on mount when disableAnimateOnMount', () => {
    render(
      <Pulse disableAnimateOnMount>
        <Text>Children</Text>
      </Pulse>,
    );
    expect(start).not.toHaveBeenCalled();
  });

  it('exposes imperative handlers that start and stop the animation', () => {
    const ref = { current: null } as React.RefObject<{
      play: () => Promise<void>;
      stop: () => Promise<void>;
    }>;
    render(
      <Pulse ref={ref}>
        <Text>Children</Text>
      </Pulse>,
    );
    start.mockClear();
    stop.mockClear();
    expect(stop).not.toHaveBeenCalled();
    act(() => void ref.current?.stop());
    expect(stop).toHaveBeenCalledTimes(1);
    expect(start).not.toHaveBeenCalled();
    act(() => void ref.current?.play());
    expect(start).toHaveBeenCalledTimes(1);
  });
});
