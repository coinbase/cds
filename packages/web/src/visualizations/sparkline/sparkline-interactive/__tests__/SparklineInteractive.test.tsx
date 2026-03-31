import { sparklineInteractiveData } from '@coinbase/cds-common/internal/visualizations/SparklineInteractiveData';
import { DefaultThemeProvider } from '@coinbase/cds-web/utils/test';
import { render, screen } from '@testing-library/react';

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

describe('SparklineInteractiveHeader', () => {
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
});
