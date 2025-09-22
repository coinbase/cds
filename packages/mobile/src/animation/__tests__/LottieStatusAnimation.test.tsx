import type {
  LottieStatusAnimationProps,
  LottieStatusAnimationType,
  useStatusAnimationPoller,
} from '@cbhq/cds-common';
import { render, screen, waitFor } from '@testing-library/react-native';
import LottieView from 'lottie-react-native';

import { DefaultThemeProvider } from '../../utils/testHelpers';
import { LottieStatusAnimation } from '../LottieStatusAnimation';

type UseStatusAnimationPollerParams = {
  onFinish?: () => void;
};

type UseStatusAnimationPollerReturn = ReturnType<typeof useStatusAnimationPoller>;

type CdsCommonMockTypes = {
  useStatusAnimationPoller: typeof useStatusAnimationPoller;
};

jest.mock('@cbhq/cds-common', () => {
  const actual: CdsCommonMockTypes = jest.requireActual('@cbhq/cds-common');

  return {
    ...actual,
    useStatusAnimationPoller: jest
      .fn<UseStatusAnimationPollerReturn, [UseStatusAnimationPollerParams]>()
      .mockImplementation(({ onFinish }) => {
        setTimeout(() => {
          if (onFinish) onFinish();
        }, 1000);
        return jest.fn();
      }),
  };
});

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
    const testStatuses: LottieStatusAnimationType[] = ['loading', 'success', 'failure', 'pending'];

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
});
