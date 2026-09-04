import React, { type ComponentProps } from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import type { LottieStatus } from 'packages/common/dts/types/LottieStatus';

import { LottieStatusAnimation } from '../LottieStatusAnimation';

type LottieStatusAnimationProps = ComponentProps<typeof LottieStatusAnimation>;

type StatusAnimationPollerParams = {
  onFinish?: () => void;
};

jest.mock('@coinbase/cds-common/lottie/useStatusAnimationPoller', () => ({
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
    const testStatuses: LottieStatus[] = ['loading', 'success', 'failure', 'pending'];

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

  describe('cardSuccess status', () => {
    it('renders with cardSuccess status', () => {
      render(
        <LottieStatusAnimation height="100" status="cardSuccess" testID="lottie-card-success" />,
      );
      expect(screen.getByTestId('lottie-card-success')).toBeTruthy();
    });

    it('calls onFinish with cardSuccess status', async () => {
      const onFinish = jest.fn();
      render(
        <LottieStatusAnimation
          height="100"
          onFinish={onFinish}
          status="cardSuccess"
          testID="lottie-card-success-finish"
        />,
      );

      expect(screen.getByTestId('lottie-card-success-finish')).toBeTruthy();
      await waitFor(() => expect(onFinish).toHaveBeenCalled(), { timeout: 1500 });
    });
  });

  describe('status transitions', () => {
    it('transitions from pending to success', async () => {
      const { rerender } = render(
        <LottieStatusAnimation height="100" status="pending" testID="lottie-transition" />,
      );
      expect(screen.getByTestId('lottie-transition')).toBeTruthy();

      rerender(<LottieStatusAnimation height="100" status="success" testID="lottie-transition" />);
      expect(screen.getByTestId('lottie-transition')).toBeTruthy();
    });

    it('transitions from pending to failure', async () => {
      const { rerender } = render(
        <LottieStatusAnimation height="100" status="pending" testID="lottie-transition-fail" />,
      );
      expect(screen.getByTestId('lottie-transition-fail')).toBeTruthy();

      rerender(
        <LottieStatusAnimation height="100" status="failure" testID="lottie-transition-fail" />,
      );
      expect(screen.getByTestId('lottie-transition-fail')).toBeTruthy();
    });

    it('transitions from loading to success and calls onFinish', async () => {
      const onFinish = jest.fn();
      const { rerender } = render(
        <LottieStatusAnimation
          height="100"
          onFinish={onFinish}
          status="loading"
          testID="lottie-loading-success"
        />,
      );
      expect(screen.getByTestId('lottie-loading-success')).toBeTruthy();

      rerender(
        <LottieStatusAnimation
          height="100"
          onFinish={onFinish}
          status="success"
          testID="lottie-loading-success"
        />,
      );

      await waitFor(() => expect(onFinish).toHaveBeenCalled(), { timeout: 1500 });
    });
  });
});
