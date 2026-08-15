import { Animated, Text } from 'react-native';
import type { ReactElement } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { render, screen } from '@testing-library/react-native';

import { defaultTheme } from '../../../themes/defaultTheme';
import { DefaultThemeProvider } from '../../../utils/testHelpers';
import { InternalTooltip } from '../InternalTooltip';

const TEST_ID = 'mock-internal-tooltip';

const safeAreaInitialMetrics = {
  frame: { x: 0, y: 0, width: 0, height: 0 },
  insets: { top: 0, left: 0, right: 0, bottom: 0 },
};

const mockAnimateIn = {
  start: jest.fn(),
};

describe('InternalTooltip.test', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderWithProviders = (ui: ReactElement) =>
    render(
      <SafeAreaProvider initialMetrics={safeAreaInitialMetrics}>
        <DefaultThemeProvider>{ui}</DefaultThemeProvider>
      </SafeAreaProvider>,
    );

  it('passes a11y', () => {
    renderWithProviders(
      <InternalTooltip
        animateIn={mockAnimateIn as unknown as Animated.CompositeAnimation}
        content={<Text>test content</Text>}
        opacity={new Animated.Value(1)}
        placement="top"
        subjectLayout={{ width: 20, height: 30, pageOffsetX: 15, pageOffsetY: 25 }}
        testID={TEST_ID}
        translateY={new Animated.Value(5)}
      />,
    );
    expect(screen.getByTestId(TEST_ID)).toBeAccessible();
  });

  it('renders content', () => {
    renderWithProviders(
      <InternalTooltip
        animateIn={mockAnimateIn as unknown as Animated.CompositeAnimation}
        content={<Text>test content</Text>}
        opacity={new Animated.Value(1)}
        placement="top"
        subjectLayout={{ width: 20, height: 30, pageOffsetX: 15, pageOffsetY: 25 }}
        testID={TEST_ID}
        translateY={new Animated.Value(5)}
      />,
    );

    expect(screen.getByText('test content')).toBeTruthy();
    expect(screen.getByTestId(TEST_ID)).toHaveStyle({
      backgroundColor: defaultTheme.lightColor.bg,
    });
    expect(mockAnimateIn.start).toHaveBeenCalledTimes(1);
  });

  it('renders string content', () => {
    renderWithProviders(
      <InternalTooltip
        animateIn={mockAnimateIn as unknown as Animated.CompositeAnimation}
        content="test content"
        opacity={new Animated.Value(1)}
        placement="bottom"
        subjectLayout={{ width: 20, height: 30, pageOffsetX: 15, pageOffsetY: 25 }}
        translateY={new Animated.Value(5)}
      />,
    );

    expect(screen.getByText('test content')).toBeTruthy();
    expect(mockAnimateIn.start).toHaveBeenCalledTimes(1);
  });

  it('renders active colorScheme when invertColorScheme sets to false', () => {
    renderWithProviders(
      <InternalTooltip
        animateIn={mockAnimateIn as unknown as Animated.CompositeAnimation}
        content={<Text>test content</Text>}
        elevation={2}
        invertColorScheme={false}
        opacity={new Animated.Value(1)}
        placement="top"
        subjectLayout={{ width: 20, height: 30, pageOffsetX: 15, pageOffsetY: 25 }}
        testID={TEST_ID}
        translateY={new Animated.Value(5)}
      />,
    );

    expect(screen.getByTestId(TEST_ID)).toHaveStyle({
      backgroundColor: defaultTheme.lightColor.bg,
    });
  });

  it('renders custom background from box props', () => {
    renderWithProviders(
      <InternalTooltip
        animateIn={mockAnimateIn as unknown as Animated.CompositeAnimation}
        background="bgSecondary"
        content={<Text>test content</Text>}
        elevation={2}
        opacity={new Animated.Value(1)}
        placement="top"
        subjectLayout={{ width: 20, height: 30, pageOffsetX: 15, pageOffsetY: 25 }}
        testID={TEST_ID}
        translateY={new Animated.Value(5)}
      />,
    );

    expect(screen.getByTestId(TEST_ID)).toHaveStyle({
      backgroundColor: defaultTheme.lightColor.bgSecondary,
    });
  });
});
