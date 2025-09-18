import { View } from 'react-native';
import { render, screen, waitFor } from '@testing-library/react-native';

import { defaultTheme } from '../../themes/defaultTheme';
import { DefaultThemeProvider } from '../../utils/testHelpers';
import { TabIndicator } from '../TabIndicator';

describe('TabIndicator', () => {
  it('passes a11y', () => {
    const TEST_ID = 'tabIndicator';
    render(
      <DefaultThemeProvider>
        <TabIndicator testID={TEST_ID} width={100} x={0} />
      </DefaultThemeProvider>,
    );
    expect(screen.getByTestId(TEST_ID)).toBeAccessible();
  });

  it('renders x and width', async () => {
    const TEST_ID = 'tabIndicator';
    render(
      <DefaultThemeProvider>
        <TabIndicator background="bgSecondary" testID={TEST_ID} width={1000} x={50} />
      </DefaultThemeProvider>,
    );
    await waitFor(() =>
      expect(screen.getByTestId(TEST_ID).props.style.transform[0].translateX).toBeGreaterThan(0),
    );
    expect(screen.getByTestId(TEST_ID)).toHaveStyle({
      transform: [{ translateX: 50 }],
    });
    expect(screen.getByTestId('cds-tab-indicator-inner-bar')).toHaveStyle({
      transform: [{ translateX: 1000 }],
    });
  });

  it('renders background', () => {
    render(
      <DefaultThemeProvider>
        <TabIndicator background="bgSecondary" width={100} x={0} />
      </DefaultThemeProvider>,
    );
    expect(screen.getByTestId('cds-tab-indicator-inner-bar')).toHaveStyle({
      backgroundColor: defaultTheme.lightColor.bgSecondary,
    });
  });

  it('renders with testID', () => {
    const TEST_ID = 'tabIndicator';
    render(
      <DefaultThemeProvider>
        <TabIndicator testID={TEST_ID} width={100} x={0} />
      </DefaultThemeProvider>,
    );
    expect(screen.getByTestId(TEST_ID)).toBeDefined();
  });

  it('renders with ref', () => {
    const TEST_ID = 'tabIndicator';
    const ref = { current: undefined } as unknown as React.RefObject<View>;
    render(
      <DefaultThemeProvider>
        <TabIndicator ref={ref} testID={TEST_ID} width={100} x={0} />
      </DefaultThemeProvider>,
    );
    expect(ref.current).toBeInstanceOf(View);
  });
});
