import React, { useCallback, useRef } from 'react';
import type { ThemeVars } from '@coinbase/cds-common/core/theme';
import { createMotionConfig } from '@coinbase/cds-common/motion/tokens';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import type { ColorSurgeTypes } from '../ColorSurge';
import { ColorSurge } from '../ColorSurge';
import { useMotionProps } from '../useMotionProps';

const mockedSet = jest.fn();
const mockedStart = jest.fn();

jest.mock('../../layout/Box', () => {
  const { forwardRef }: { forwardRef: typeof React.forwardRef } = jest.requireActual('react');
  return {
    Box: forwardRef<HTMLDivElement, Record<string, any>>((props, ref) => {
      return (
        <div ref={ref}>
          <div>MotionBox</div>
          <div data-testid="box-props">{JSON.stringify(props)}</div>
        </div>
      );
    }),
  };
});

jest.mock('framer-motion', () => ({
  ...jest.requireActual<object>('framer-motion'),
  useAnimation: jest.fn(() => ({
    set: mockedSet,
    start: mockedStart,
  })),
}));

jest.mock('../useMotionProps', () => ({
  useMotionProps: jest.fn(() => ({
    variants: {
      enter: {
        transition: {},
      },
    },
  })),
}));

const TestWrapper = (props: ColorSurgeTypes) => {
  const ref = useRef({
    play: async (background: ThemeVars.Color | undefined) => {},
  });

  const handleClick = useCallback(async () => ref.current.play('bgPositive'), []);

  return (
    <>
      <ColorSurge {...props} ref={ref} />
      <button onClick={handleClick} type="button">
        set background
      </button>
    </>
  );
};

describe('ColorSurge', () => {
  beforeEach(jest.clearAllMocks);
  it('should render motion box', () => {
    render(<TestWrapper />);
    expect(screen.getByText('MotionBox')).toBeInTheDocument();
  });

  it('default background should be bgprimary', () => {
    render(<TestWrapper />);
    expect(screen.getByTestId('box-props').innerHTML).toContain('"background":"bgPrimary"');
  });

  it('should use motion props', () => {
    render(<TestWrapper />);
    expect(useMotionProps as jest.Mock).toHaveBeenCalledWith({
      enterConfigs: [createMotionConfig('fadeIn30', 'fast1')],
      exitConfigs: [createMotionConfig('fadeOut30', 'slow4', { delay: 200 })],
      animate: {
        set: expect.any(Function) as unknown,
        start: expect.any(Function) as unknown,
      },
    });
  });

  it('should set controls on mount if disableAnimateOnMount is false', () => {
    render(<TestWrapper disableAnimateOnMount={false} />);
    expect(mockedSet).toHaveBeenCalledWith('enter');
    expect(mockedStart).toHaveBeenCalledWith('exit');
  });

  it('should not set controls on mount if disableAnimateOnMount is true', () => {
    render(<TestWrapper disableAnimateOnMount />);
    expect(mockedSet).not.toHaveBeenCalledWith('enter');
    expect(mockedStart).not.toHaveBeenCalledWith('exit');
  });

  it('able to set background', async () => {
    render(<TestWrapper />);
    fireEvent.click(screen.getByText('set background'));

    await waitFor(() =>
      expect(screen.getByTestId('box-props').innerHTML).toContain('"background":"bgPositive"'),
    );
  });
});
