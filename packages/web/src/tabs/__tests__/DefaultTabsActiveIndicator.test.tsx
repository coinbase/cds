import { render, screen, waitFor } from '@testing-library/react';

import { DefaultThemeProvider } from '../../utils/test';
import { DefaultTabsActiveIndicator } from '../DefaultTabsActiveIndicator';

const buyTabRect = { x: 12, y: 0, width: 80, height: 36 };
const sellTabRect = { x: 72, y: 0, width: 68, height: 40 };

describe('DefaultTabsActiveIndicator', () => {
  it('renders at the target position on first render without animating', () => {
    render(
      <DefaultThemeProvider>
        <DefaultTabsActiveIndicator activeTabRect={buyTabRect} testID="indicator" />
      </DefaultThemeProvider>,
    );

    expect(screen.getByTestId('indicator')).toHaveStyle({
      width: '80px',
      transform: 'translateX(12px) translateZ(0)',
    });
  });

  it('updates when activeTabRect changes', async () => {
    const { rerender } = render(
      <DefaultThemeProvider>
        <DefaultTabsActiveIndicator activeTabRect={buyTabRect} testID="indicator" />
      </DefaultThemeProvider>,
    );

    rerender(
      <DefaultThemeProvider>
        <DefaultTabsActiveIndicator activeTabRect={sellTabRect} testID="indicator" />
      </DefaultThemeProvider>,
    );

    await waitFor(() =>
      expect(screen.getByTestId('indicator')).toHaveStyle({
        width: '68px',
        transform: 'translateX(72px) translateZ(0)',
      }),
    );
  });
});
