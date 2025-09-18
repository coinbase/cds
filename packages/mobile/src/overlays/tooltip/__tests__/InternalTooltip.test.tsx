import { Animated, Text } from 'react-native';
import { render, screen } from '@testing-library/react-native';

import { defaultTheme } from '../../../themes/defaultTheme';
import { DefaultThemeProvider } from '../../../utils/testHelpers';
import { InternalTooltip } from '../InternalTooltip';

const TEST_ID = 'mock-internal-tooltip';

const mockAnimateIn = {
  start: jest.fn(),
};

describe('InternalTooltip.test', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('passes a11y', () => {
    render(
      <DefaultThemeProvider>
        <InternalTooltip
          animateIn={mockAnimateIn as unknown as Animated.CompositeAnimation}
          content={<Text>test content</Text>}
          opacity={new Animated.Value(1)}
          placement="top"
          subjectLayout={{ width: 20, height: 30, pageOffsetX: 15, pageOffsetY: 25 }}
          testID={TEST_ID}
          translateY={new Animated.Value(5)}
        />
      </DefaultThemeProvider>,
    );
    expect(screen.getByTestId(TEST_ID)).toBeAccessible();
  });

  it('renders content', () => {
    render(
      <DefaultThemeProvider>
        <InternalTooltip
          animateIn={mockAnimateIn as unknown as Animated.CompositeAnimation}
          content={<Text>test content</Text>}
          opacity={new Animated.Value(1)}
          placement="top"
          subjectLayout={{ width: 20, height: 30, pageOffsetX: 15, pageOffsetY: 25 }}
          testID={TEST_ID}
          translateY={new Animated.Value(5)}
        />
      </DefaultThemeProvider>,
    );

    expect(screen.getByText('test content')).toBeTruthy();
    expect(screen.getByTestId(TEST_ID)).toHaveStyle({
      backgroundColor: defaultTheme.lightColor.bg,
    });
    expect(mockAnimateIn.start).toHaveBeenCalledTimes(1);
  });

  it('renders string content', () => {
    render(
      <DefaultThemeProvider>
        <InternalTooltip
          animateIn={mockAnimateIn as unknown as Animated.CompositeAnimation}
          content="test content"
          opacity={new Animated.Value(1)}
          placement="bottom"
          subjectLayout={{ width: 20, height: 30, pageOffsetX: 15, pageOffsetY: 25 }}
          translateY={new Animated.Value(5)}
        />
      </DefaultThemeProvider>,
    );

    expect(screen.getByText('test content')).toBeTruthy();
    expect(mockAnimateIn.start).toHaveBeenCalledTimes(1);
  });

  it('renders active colorScheme when invertColorScheme sets to false', () => {
    render(
      <DefaultThemeProvider>
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
        />
      </DefaultThemeProvider>,
    );

    expect(screen.getByTestId(TEST_ID)).toHaveStyle({
      backgroundColor: defaultTheme.lightColor.bg,
    });
  });
});
