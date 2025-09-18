import React from 'react';
import type {
  LottieStatusAnimationProps,
  LottieStatusAnimationType,
} from '@cbhq/cds-common/types/LottieStatusAnimationProps';
import { render, screen, waitFor } from '@testing-library/react';

import { LottieStatusAnimation } from '../LottieStatusAnimation';

type StatusAnimationPollerParams = {
  onFinish?: () => void;
};

jest.mock('@cbhq/cds-common/lottie/useStatusAnimationPoller', () => ({
  useStatusAnimationPoller: jest
    .fn()
    .mockImplementation(({ onFinish }: StatusAnimationPollerParams) => {
      setTimeout(() => {
        if (onFinish) onFinish();
      }, 1000);
      return jest.fn();
    }),
}));

jest.mock('../Lottie', () => {
  const { forwardRef }: { forwardRef: typeof React.forwardRef } = jest.requireActual('react');
  return {
    Lottie: forwardRef<HTMLDivElement, { onAnimationFinish?: () => void; testID?: string }>(
      ({ onAnimationFinish, testID }, ref) => {
        if (onAnimationFinish) {
          setTimeout(onAnimationFinish, 1000);
        }
        return <div ref={ref} data-testid={testID} />;
      },
    ),
  };
});

describe('LottieStatusAnimation', () => {
  it('renders LottieStatusAnimation', () => {
    render(<LottieStatusAnimation height="100" testID="lottie-status-animation-test" />);
    expect(screen.getByTestId('lottie-status-animation-test')).toBeTruthy();
  });

  it('renders LottieStatusAnimation and calls onFinish', async () => {
    const onFinish = jest.fn();
    render(
      <LottieStatusAnimation
        height="100"
        onFinish={onFinish}
        testID="lottie-status-animation-test"
      />,
    );

    expect(screen.getByTestId('lottie-status-animation-test')).toBeTruthy();
    await waitFor(() => expect(onFinish).toHaveBeenCalled(), { timeout: 1500 });
  });

  it('renders with different status values', () => {
    const testStatuses: LottieStatusAnimationType[] = ['loading', 'success', 'failure', 'pending'];

    testStatuses.forEach((status) => {
      const props: LottieStatusAnimationProps = {
        status,
        testID: `lottie-status-animation-${status}`,
        height: '100',
      };

      render(<LottieStatusAnimation {...props} />);
      expect(screen.getByTestId(`lottie-status-animation-${status}`)).toBeTruthy();
    });
  });
});
