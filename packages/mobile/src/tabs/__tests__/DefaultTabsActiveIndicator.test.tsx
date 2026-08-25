import { render, screen } from '@testing-library/react-native';

import { DefaultThemeProvider } from '../../utils/testHelpers';
import { DefaultTabsActiveIndicator } from '../DefaultTabsActiveIndicator';

const buyTabRect = { x: 12, y: 0, width: 80, height: 36 };
const sellTabRect = { x: 72, y: 0, width: 68, height: 40 };

describe('DefaultTabsActiveIndicator', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it('renders at the target position on first layout without animating', () => {
    render(
      <DefaultThemeProvider>
        <DefaultTabsActiveIndicator activeTabRect={buyTabRect} style={{}} testID="indicator" />
      </DefaultThemeProvider>,
    );

    expect(screen.getByTestId('indicator')).toHaveAnimatedStyle({
      width: 80,
      transform: [{ translateX: 12 }],
    });
  });

  it('animates when activeTabRect changes', () => {
    const { rerender } = render(
      <DefaultThemeProvider>
        <DefaultTabsActiveIndicator activeTabRect={buyTabRect} style={{}} testID="indicator" />
      </DefaultThemeProvider>,
    );

    rerender(
      <DefaultThemeProvider>
        <DefaultTabsActiveIndicator activeTabRect={sellTabRect} style={{}} testID="indicator" />
      </DefaultThemeProvider>,
    );

    jest.advanceTimersByTime(1000);

    expect(screen.getByTestId('indicator')).toHaveAnimatedStyle({
      width: 68,
      transform: [{ translateX: 72 }],
    });
  });
});
