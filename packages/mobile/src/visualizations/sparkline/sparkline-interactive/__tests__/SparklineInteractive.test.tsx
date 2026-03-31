import React from 'react';
import { sparklineInteractiveData } from '@coinbase/cds-common/internal/visualizations/SparklineInteractiveData';
import { DefaultThemeProvider } from '@coinbase/cds-mobile/utils/testHelpers';
import { render, screen } from '@testing-library/react-native';

import { SparklineInteractiveHeader } from '../..';
import { SparklineInteractive } from '../SparklineInteractive';

const periods = [
  { label: '1H', value: 'hour' as const },
  { label: '1D', value: 'day' as const },
  { label: '1W', value: 'week' as const },
  { label: '1M', value: 'month' as const },
  { label: '1Y', value: 'year' as const },
  { label: 'All', value: 'all' as const },
];

const headerTestID = 'sparkline-header';

describe('SparklineInteractive', () => {
  const observe = jest.fn();
  const disconnect = jest.fn();
  const mockResizeObserver = jest.fn(() => ({
    observe: () => {
      observe();
    },
    unobserve: () => {},
    disconnect,
  }));
  const mockResizeObserverEntry = jest.fn();

  beforeAll(() => {
    global.ResizeObserver = mockResizeObserver;
    global.ResizeObserverEntry = mockResizeObserverEntry;
  });

  it('renders with header styles', () => {
    render(
      <DefaultThemeProvider>
        <SparklineInteractive
          data={sparklineInteractiveData}
          defaultPeriod="day"
          formatDate={(date) => date.toLocaleDateString()}
          headerNode={
            <SparklineInteractiveHeader defaultLabel="Bitcoin Price" defaultTitle="$1,000" />
          }
          headerTestID={headerTestID}
          periods={periods}
          strokeColor="#F7931A"
          styles={{ header: { paddingLeft: 0, paddingRight: 1 } }}
        />
      </DefaultThemeProvider>,
    );

    const headerComponent = screen.getByTestId(headerTestID);
    expect(headerComponent).toHaveStyle({ paddingLeft: 0, paddingRight: 1 });
  });

  it('renders with default fallback when no data is provided', () => {
    const { toJSON } = render(
      <DefaultThemeProvider>
        <SparklineInteractive
          defaultPeriod="day"
          formatDate={(date) => date.toLocaleDateString()}
          periods={periods}
          strokeColor="#F7931A"
        />
      </DefaultThemeProvider>,
    );

    expect(toJSON()).toBeTruthy();
  });

  it('applies the compact prop correctly', () => {
    const { toJSON } = render(
      <DefaultThemeProvider>
        <SparklineInteractive
          compact={true}
          data={sparklineInteractiveData}
          defaultPeriod="day"
          formatDate={(date) => date.toLocaleDateString()}
          periods={periods}
          strokeColor="#F7931A"
        />
      </DefaultThemeProvider>,
    );

    expect(toJSON()).toBeTruthy();
  });

  it('hides period selector when hidePeriodSelector is true', () => {
    const { toJSON } = render(
      <DefaultThemeProvider>
        <SparklineInteractive
          data={sparklineInteractiveData}
          defaultPeriod="day"
          formatDate={(date) => date.toLocaleDateString()}
          hidePeriodSelector={true}
          periods={periods}
          strokeColor="#F7931A"
        />
      </DefaultThemeProvider>,
    );

    expect(toJSON()).toBeTruthy();
  });
});
