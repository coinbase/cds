import { act } from 'react';
import { Animated, Text } from 'react-native';
import { render, screen } from '@testing-library/react-native';

import { Shake } from '../Shake';

describe('Shake', () => {
  let start = jest.fn();
  let stop = jest.fn();

  beforeEach(() => {
    start = jest.fn();
    stop = jest.fn();
    // @ts-expect-error - mock is incomplete but functional
    jest.spyOn(Animated, 'timing').mockImplementation(() => ({ start }));
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
      <Shake>
        <Text>{childrenText}</Text>
      </Shake>,
    );
    expect(screen.getByText(childrenText)).toBeAccessible();
  });

  it('renders children', () => {
    const childrenText = 'Children text';
    render(
      <Shake>
        <Text>{childrenText}</Text>
      </Shake>,
    );
    expect(screen.getByText(childrenText)).toBeDefined();
  });

  it('starts animation on mount by default', () => {
    render(
      <Shake>
        <Text>Children</Text>
      </Shake>,
    );
    expect(start).toHaveBeenCalledTimes(1);
  });

  it('doesnt start animation on mount when disableAnimateOnMount', () => {
    render(
      <Shake disableAnimateOnMount>
        <Text>Children</Text>
      </Shake>,
    );
    expect(start).not.toHaveBeenCalled();
  });

  it('exposes imperative handlers that start the animation', () => {
    const ref = { current: null } as React.RefObject<{
      play: () => Promise<void>;
    }>;
    render(
      <Shake ref={ref}>
        <Text>Children</Text>
      </Shake>,
    );
    start.mockClear();
    expect(start).not.toHaveBeenCalled();
    act(() => void ref.current?.play());
    expect(start).toHaveBeenCalledTimes(1);
  });
});
