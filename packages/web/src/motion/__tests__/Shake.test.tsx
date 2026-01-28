import { act } from 'react';
import { renderA11y } from '@coinbase/cds-web-utils/jest';
import { render, screen } from '@testing-library/react';
import { useAnimation } from 'framer-motion';

import { Shake } from '../Shake';

jest.mock('framer-motion', () => {
  return {
    ...jest.requireActual('framer-motion'),
    useAnimation: jest.fn(),
  };
});

describe('Shake', () => {
  let start = jest.fn();
  let stop = jest.fn();

  beforeEach(() => {
    start = jest.fn();
    stop = jest.fn();
    (useAnimation as jest.Mock).mockImplementation(() => ({
      start,
      stop,
      set: jest.fn(),
    }));
  });

  it('passes a11y', async () => {
    expect(
      await renderA11y(
        <Shake>
          <div>Children</div>
        </Shake>,
      ),
    ).toHaveNoViolations();
  });

  it('renders children', () => {
    const childrenText = 'Children text';
    render(
      <Shake>
        <div>{childrenText}</div>
      </Shake>,
    );
    expect(screen.getByText('Children text')).toBeInTheDocument();
  });

  it('starts animation on mount by default', () => {
    render(
      <Shake>
        <div>Children</div>
      </Shake>,
    );
    expect(start).toHaveBeenCalledTimes(1);
  });

  it('doesnt start animation on mount when disableAnimateOnMount', () => {
    render(
      <Shake disableAnimateOnMount>
        <div>Children</div>
      </Shake>,
    );
    expect(start).not.toHaveBeenCalled();
  });

  it('exposes imperative handlers that start the animation', () => {
    const ref = { current: null } as React.RefObject<{
      play: () => Promise<void>;
    } | null>;
    render(
      <Shake ref={ref}>
        <div>Children</div>
      </Shake>,
    );
    start.mockClear();

    expect(start).not.toHaveBeenCalled();
    act(() => void ref.current?.play());
    expect(start).toHaveBeenCalledTimes(1);
  });
});
