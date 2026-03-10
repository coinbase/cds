import type { ComponentProps } from 'react';
import type { LottieStatus } from '@coinbase/cds-common';
import { render, screen, waitFor } from '@testing-library/react-native';
import LottieView from 'lottie-react-native';

import { DefaultThemeProvider } from '../../utils/testHelpers';
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

describe('LottieStatusAnimation', () => {
  it('renders a LottieStatusAnimation', () => {
    render(
      <DefaultThemeProvider>
        <LottieStatusAnimation height="100" testID="lottie-status-animation-test" />
      </DefaultThemeProvider>,
    );

    expect(screen.UNSAFE_queryAllByType(LottieView)).toHaveLength(1);
    expect(screen.getByTestId('lottie-status-animation-test')).toBeTruthy();
  });

  it('renders a LottieStatusAnimation and calls onFinish', async () => {
    const mockOnFinish = jest.fn();

    render(
      <DefaultThemeProvider>
        <LottieStatusAnimation
          height="100"
          onFinish={mockOnFinish}
          testID="lottie-status-animation-test"
        />
      </DefaultThemeProvider>,
    );

    expect(screen.getByTestId('lottie-status-animation-test')).toBeTruthy();
    await waitFor(() => expect(mockOnFinish).toHaveBeenCalled(), { timeout: 1500 });
  });

  it('renders LottieStatusAnimation with different status values', () => {
    const testStatuses: LottieStatus[] = ['loading', 'success', 'failure', 'pending'];

    testStatuses.forEach((status) => {
      const props: LottieStatusAnimationProps = {
        status,
        testID: `lottie-status-animation-${status}`,
        height: '100',
      };

      render(
        <DefaultThemeProvider>
          <LottieStatusAnimation {...props} />
        </DefaultThemeProvider>,
      );
      expect(screen.getByTestId(`lottie-status-animation-${status}`)).toBeTruthy();
    });
  });

  describe('cardSuccess status', () => {
    it('renders with cardSuccess status', () => {
      render(
        <DefaultThemeProvider>
          <LottieStatusAnimation height="100" status="cardSuccess" testID="lottie-card-success" />
        </DefaultThemeProvider>,
      );
      expect(screen.getByTestId('lottie-card-success')).toBeTruthy();
    });

    it('calls onFinish with cardSuccess status', async () => {
      const mockOnFinish = jest.fn();
      render(
        <DefaultThemeProvider>
          <LottieStatusAnimation
            height="100"
            onFinish={mockOnFinish}
            status="cardSuccess"
            testID="lottie-card-success-finish"
          />
        </DefaultThemeProvider>,
      );

      expect(screen.getByTestId('lottie-card-success-finish')).toBeTruthy();
      await waitFor(() => expect(mockOnFinish).toHaveBeenCalled(), { timeout: 1500 });
    });
  });

  describe('status transitions', () => {
    it('transitions from pending to success', async () => {
      const { rerender } = render(
        <DefaultThemeProvider>
          <LottieStatusAnimation height="100" status="pending" testID="lottie-transition" />
        </DefaultThemeProvider>,
      );
      expect(screen.getByTestId('lottie-transition')).toBeTruthy();

      rerender(
        <DefaultThemeProvider>
          <LottieStatusAnimation height="100" status="success" testID="lottie-transition" />
        </DefaultThemeProvider>,
      );
      expect(screen.getByTestId('lottie-transition')).toBeTruthy();
    });

    it('transitions from pending to failure', async () => {
      const { rerender } = render(
        <DefaultThemeProvider>
          <LottieStatusAnimation height="100" status="pending" testID="lottie-transition-fail" />
        </DefaultThemeProvider>,
      );
      expect(screen.getByTestId('lottie-transition-fail')).toBeTruthy();

      rerender(
        <DefaultThemeProvider>
          <LottieStatusAnimation height="100" status="failure" testID="lottie-transition-fail" />
        </DefaultThemeProvider>,
      );
      expect(screen.getByTestId('lottie-transition-fail')).toBeTruthy();
    });

    it('transitions from loading to success and calls onFinish', async () => {
      const mockOnFinish = jest.fn();
      const { rerender } = render(
        <DefaultThemeProvider>
          <LottieStatusAnimation
            height="100"
            onFinish={mockOnFinish}
            status="loading"
            testID="lottie-loading-success"
          />
        </DefaultThemeProvider>,
      );
      expect(screen.getByTestId('lottie-loading-success')).toBeTruthy();

      rerender(
        <DefaultThemeProvider>
          <LottieStatusAnimation
            height="100"
            onFinish={mockOnFinish}
            status="success"
            testID="lottie-loading-success"
          />
        </DefaultThemeProvider>,
      );

      await waitFor(() => expect(mockOnFinish).toHaveBeenCalled(), { timeout: 1500 });
    });
  });
});
