import { Animated } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { fireEvent, render, screen } from '@testing-library/react-native';

import { DefaultThemeProvider, SAFE_AREA_METRICS } from '../../utils/testHelpers';
import { Toast } from '../Toast';

jest.mock('react-native/Libraries/Animated/Animated', () => {
  return {
    ...jest.requireActual<Record<string, unknown>>('react-native/Libraries/Animated/Animated'),
    parallel: () => {
      return {
        start: jest.fn((callback?: ({ finished }: { finished: boolean }) => void) => {
          callback?.({ finished: true });
        }),
      };
    },
  };
});

const animationParallelSpy = jest.spyOn(Animated, 'parallel');
const animationTimingSpy = jest.spyOn(Animated, 'timing');
jest.useFakeTimers({
  legacyFakeTimers: true,
});

describe('Toast', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders text and passes a11y', () => {
    const text = 'Toast copy';
    render(
      <SafeAreaProvider initialMetrics={SAFE_AREA_METRICS}>
        <DefaultThemeProvider>
          <Toast testID="mock-toast" text={text} />
        </DefaultThemeProvider>
      </SafeAreaProvider>,
    );

    expect(screen.getByTestId('mock-toast')).toBeAccessible();
    expect(screen.getByText(text)).toBeTruthy();
  });

  it('renders action and passes a11y', () => {
    const onWillHide = jest.fn();
    const onDidHide = jest.fn();
    const text = 'Toast copy';
    const action = {
      label: 'Action',
      onPress: jest.fn(),
      testID: 'toast-action',
    };
    render(
      <SafeAreaProvider initialMetrics={SAFE_AREA_METRICS}>
        <DefaultThemeProvider>
          <Toast
            action={action}
            onDidHide={onDidHide}
            onWillHide={onWillHide}
            testID="mock-toast"
            text={text}
          />
        </DefaultThemeProvider>
      </SafeAreaProvider>,
    );

    fireEvent.press(screen.getByTestId(action.testID));
    expect(action.onPress).toHaveBeenCalledTimes(1);
    expect(onWillHide).toHaveBeenCalledTimes(1);
    expect(onDidHide).toHaveBeenCalledTimes(1);

    expect(screen.getByTestId('mock-toast')).toBeAccessible();
  });

  it('triggers animation', () => {
    const text = 'Toast copy';
    render(
      <SafeAreaProvider initialMetrics={SAFE_AREA_METRICS}>
        <DefaultThemeProvider>
          <Toast text={text} />
        </DefaultThemeProvider>
      </SafeAreaProvider>,
    );

    expect(animationParallelSpy).toHaveBeenCalled();
    expect(animationTimingSpy).toHaveBeenCalled();
  });
});
