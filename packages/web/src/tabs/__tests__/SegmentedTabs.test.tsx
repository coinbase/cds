import React from 'react';
import useMeasure from 'react-use-measure';
import { useRefMap } from '@coinbase/cds-common/hooks/useRefMap';
import { TabsContext } from '@coinbase/cds-common/tabs/TabsContext';
import { renderA11y } from '@coinbase/cds-web-utils';
import { fireEvent, render, screen } from '@testing-library/react';

import { Text } from '../../typography/Text';
import { DefaultThemeProvider } from '../../utils/test';
import { SegmentedTabs, type SegmentedTabsProps } from '../SegmentedTabs';

const TEST_ID = 'mock-segmented-tabs';
const NoopFn = () => {};

const tabs = [
  { id: 'buy', label: 'Buy', testID: 'buy-tab' },
  { id: 'sell', label: 'Sell', testID: 'sell-tab' },
  { id: 'convert', label: 'Convert', testID: 'convert-tab' },
];

jest.mock('react-use-measure');
jest.mock('@coinbase/cds-common/hooks/useRefMap');

const mockUseMeasure = (mocks: Partial<ReturnType<typeof useMeasure>>) => {
  (useMeasure as jest.Mock).mockReturnValue(mocks);
};

const mockUseRefMap = (mocks: ReturnType<typeof useRefMap>) => {
  (useRefMap as jest.Mock).mockReturnValue(mocks);
};

const mockDimensions: Partial<ReturnType<typeof useMeasure>> = [
  jest.fn(),
  {
    width: 230,
    x: 20,
    y: 64,
    height: 40,
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
  },
];

const refMap: ReturnType<typeof useRefMap> = {
  refs: { current: {} },
  registerRef: NoopFn,
  getRef: jest.fn(() => ({
    getBoundingClientRect: jest.fn(() => ({
      x: 20,
      y: 64,
      width: 68,
      height: 40,
    })),
    offsetLeft: 0,
    offsetTop: 0,
    offsetWidth: 68,
    offsetHeight: 40,
    offsetParent: {},
  })),
};

const exampleProps: SegmentedTabsProps = {
  testID: TEST_ID,
  tabs,
  activeTab: tabs[0],
  onChange: jest.fn(),
};

const mockApi = {
  tabs,
  activeTab: tabs[0],
  updateActiveTab: jest.fn(),
  goNextTab: jest.fn(),
  goPreviousTab: jest.fn(),
};

describe('SegmentedTabs', () => {
  beforeEach(() => {
    mockUseMeasure(mockDimensions);
    mockUseRefMap(refMap);
  });

  it('passes accessibility', async () => {
    expect(
      await renderA11y(
        <DefaultThemeProvider>
          <TabsContext.Provider value={mockApi}>
            <SegmentedTabs {...exampleProps} />
          </TabsContext.Provider>
        </DefaultThemeProvider>,
      ),
    ).toHaveNoViolations();
  });

  it('set the first tab active on render', async () => {
    render(
      <DefaultThemeProvider>
        <TabsContext.Provider value={mockApi}>
          <SegmentedTabs {...exampleProps} />
        </TabsContext.Provider>
      </DefaultThemeProvider>,
    );

    const indicator = screen.getByTestId('tabs-active-indicator');
    const style = indicator.getAttribute('style');
    expect(style).toContain('--height: 40px');
    expect(style).toContain('width: 68px');
    expect(style).toContain('transform: none');
  });

  it('sets the second tab active when clicking on it', () => {
    const onChange = jest.fn();
    const mockData: ReturnType<typeof useRefMap> = {
      refs: { current: {} },
      registerRef: NoopFn,
      getRef: jest.fn(() => ({
        getBoundingClientRect: jest.fn(() => ({
          x: 88,
          y: 64,
          width: 68,
          height: 40,
        })),
        offsetLeft: 68,
        offsetTop: 0,
        offsetWidth: 68,
        offsetHeight: 40,
        offsetParent: {},
      })),
    };
    mockUseRefMap(mockData);
    render(
      <DefaultThemeProvider>
        <TabsContext.Provider value={mockApi}>
          <SegmentedTabs {...exampleProps} onChange={onChange} />
        </TabsContext.Provider>
      </DefaultThemeProvider>,
    );
    fireEvent.click(screen.getByTestId('sell-tab'));

    const indicator = screen.getByTestId('tabs-active-indicator');
    const style = indicator.getAttribute('style');
    expect(style).toContain('--height: 40px');
    expect(style).toContain('width: 68px');
    expect(style).toContain('transform: translateX(68px) translateZ(0)');
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('renders custom tab component', () => {
    const TabComponent = () => (
      <Text font="display1" testID="custom-tab">
        Custom tab
      </Text>
    );
    render(
      <DefaultThemeProvider>
        <TabsContext.Provider value={mockApi}>
          <SegmentedTabs {...exampleProps} TabComponent={TabComponent} />
        </TabsContext.Provider>
      </DefaultThemeProvider>,
    );
    expect(screen.getAllByTestId('custom-tab')[0]).toBeInTheDocument();
  });

  it('renders custom tab indicator', () => {
    const TabsActiveIndicatorComponent = () => <div data-testid="custom-indicator" />;
    render(
      <DefaultThemeProvider>
        <TabsContext.Provider value={mockApi}>
          <SegmentedTabs
            {...exampleProps}
            TabsActiveIndicatorComponent={TabsActiveIndicatorComponent}
          />
        </TabsContext.Provider>
      </DefaultThemeProvider>,
    );
    expect(screen.getByTestId('custom-indicator')).toBeInTheDocument();
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(
      <DefaultThemeProvider>
        <TabsContext.Provider value={mockApi}>
          <SegmentedTabs {...exampleProps} ref={ref} />
        </TabsContext.Provider>
      </DefaultThemeProvider>,
    );
    expect(ref.current).not.toBeNull();
  });

  it('handles scroll positioning correctly', () => {
    const mockScrollData: ReturnType<typeof useRefMap> = {
      refs: { current: {} },
      registerRef: NoopFn,
      getRef: jest.fn(() => ({
        getBoundingClientRect: jest.fn(() => ({
          x: 150,
          y: 64,
          width: 68,
          height: 40,
        })),
        offsetLeft: 136, // Position after scroll
        offsetTop: 0,
        offsetWidth: 68,
        offsetHeight: 40,
        offsetParent: {},
      })),
    };
    mockUseRefMap(mockScrollData);

    render(
      <DefaultThemeProvider>
        <TabsContext.Provider value={mockApi}>
          <SegmentedTabs {...exampleProps} />
        </TabsContext.Provider>
      </DefaultThemeProvider>,
    );

    const indicator = screen.getByTestId('tabs-active-indicator');
    const style = indicator.getAttribute('style');
    expect(style).toContain('--height: 40px');
    expect(style).toContain('width: 68px');
    expect(style).toContain('transform: translateX(136px) translateZ(0)');
  });

  it('shows no indicator when activeTabRef is null', () => {
    const mockNullData: ReturnType<typeof useRefMap> = {
      refs: { current: {} },
      registerRef: NoopFn,
      getRef: jest.fn(() => null),
    };
    mockUseRefMap(mockNullData);

    render(
      <DefaultThemeProvider>
        <TabsContext.Provider value={mockApi}>
          <SegmentedTabs {...exampleProps} />
        </TabsContext.Provider>
      </DefaultThemeProvider>,
    );

    expect(screen.queryByTestId('tabs-active-indicator')).not.toBeInTheDocument();
  });
});
