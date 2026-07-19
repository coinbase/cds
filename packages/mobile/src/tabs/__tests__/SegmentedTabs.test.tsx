import React from 'react';
import { View } from 'react-native';
import Animated from 'react-native-reanimated';
import { TabsContext } from '@coinbase/cds-common/tabs/TabsContext';
import { fireEvent, render, screen } from '@testing-library/react-native';

import { Box } from '../../layout';
import { Text } from '../../typography/Text';
import { DefaultThemeProvider } from '../../utils/testHelpers';
import { SegmentedTabs, type SegmentedTabsProps } from '../SegmentedTabs';

const TEST_ID = 'mock-segmented-tabs';

const AnimatedBox = Animated.createAnimatedComponent(Box);

const tabs = [
  { id: 'buy', label: 'Buy', testID: 'buy-tab' },
  { id: 'sell', label: 'Sell', testID: 'sell-tab' },
  { id: 'convert', label: 'Convert', testID: 'convert-tab' },
];

const exampleProps: SegmentedTabsProps = {
  testID: TEST_ID,
  tabs,
  activeTab: tabs[0],
  onChange: jest.fn(),
  // Reanimated's Jest matcher can throw when a style array contains `undefined`.
  // Providing an explicit indicator style keeps the test environment stable.
  styles: { activeIndicator: {} },
};

const mockApi = {
  tabs,
  defaultActiveId: undefined,
  activeTab: tabs[0],
  updateActiveTab: jest.fn(),
  goNextTab: jest.fn(),
  goPreviousTab: jest.fn(),
};

const layoutTab = (
  testID: string,
  layout: { x: number; y: number; width: number; height: number },
) => {
  const tab = screen.getByTestId(testID);
  expect(tab.parent).toBeTruthy();
  fireEvent(tab.parent!, 'layout', { nativeEvent: { layout } });
};

describe('SegmentedTabs', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it('passes a11y', () => {
    render(
      <DefaultThemeProvider>
        <TabsContext.Provider value={mockApi}>
          <SegmentedTabs {...exampleProps} />
        </TabsContext.Provider>
      </DefaultThemeProvider>,
    );
    expect(screen.getByTestId(TEST_ID)).toBeAccessible();
  });

  it('set the first tab active by default', () => {
    render(
      <DefaultThemeProvider>
        <TabsContext.Provider value={mockApi}>
          <SegmentedTabs {...exampleProps} />
        </TabsContext.Provider>
      </DefaultThemeProvider>,
    );

    layoutTab('buy-tab', { x: 0, y: 0, width: 68, height: 40 });

    jest.advanceTimersByTime(300);
    expect(screen.getByTestId(`${TEST_ID}-active-indicator`)).toHaveAnimatedStyle({
      width: 68,
      transform: [{ translateX: 0 }, { translateY: 0 }],
    });
  });

  it('sets the second tab active when clicking on it', () => {
    const onChange = jest.fn();
    const { rerender } = render(
      <DefaultThemeProvider>
        <TabsContext.Provider value={mockApi}>
          <SegmentedTabs {...exampleProps} onChange={onChange} />
        </TabsContext.Provider>
      </DefaultThemeProvider>,
    );

    layoutTab('buy-tab', { x: 0, y: 0, width: 68, height: 40 });
    layoutTab('sell-tab', { x: 68, y: 0, width: 68, height: 40 });

    fireEvent.press(screen.getByTestId('sell-tab'));
    expect(onChange).toHaveBeenCalledTimes(1);

    const newProps = { ...exampleProps, activeTab: tabs[1] };
    rerender(
      <DefaultThemeProvider>
        <TabsContext.Provider value={mockApi}>
          <SegmentedTabs {...newProps} onChange={onChange} />
        </TabsContext.Provider>
      </DefaultThemeProvider>,
    );

    jest.advanceTimersByTime(1000);

    expect(screen.getByTestId(`${TEST_ID}-active-indicator`)).toHaveAnimatedStyle({
      width: 68,
      transform: [{ translateX: 68 }, { translateY: 0 }],
    });
  });

  it('renders custom tab component', () => {
    const Component = () => (
      <Text font="display1" testID="custom-tab">
        Custom tab
      </Text>
    );
    render(
      <DefaultThemeProvider>
        <TabsContext.Provider value={mockApi}>
          <SegmentedTabs {...exampleProps} TabComponent={Component} />
        </TabsContext.Provider>
      </DefaultThemeProvider>,
    );
    expect(screen.getAllByTestId('custom-tab')[0]).toBeTruthy();
  });

  it('renders custom tab indicator', () => {
    const ActiveIndicatorComponent = () => <AnimatedBox animated testID="custom-indicator" />;
    render(
      <DefaultThemeProvider>
        <TabsContext.Provider value={mockApi}>
          <SegmentedTabs
            {...exampleProps}
            TabsActiveIndicatorComponent={ActiveIndicatorComponent}
          />
        </TabsContext.Provider>
      </DefaultThemeProvider>,
    );
    jest.advanceTimersByTime(300);

    expect(screen.getByTestId('custom-indicator')).toBeTruthy();
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<View>();
    render(
      <DefaultThemeProvider>
        <TabsContext.Provider value={mockApi}>
          <SegmentedTabs {...exampleProps} ref={ref} />
        </TabsContext.Provider>
      </DefaultThemeProvider>,
    );
    expect(ref.current).toBeInstanceOf(View);
  });

  it('positions indicator correctly with horizontal padding', () => {
    render(
      <DefaultThemeProvider>
        <TabsContext.Provider value={mockApi}>
          <SegmentedTabs {...exampleProps} paddingX={5} />
        </TabsContext.Provider>
      </DefaultThemeProvider>,
    );

    layoutTab('buy-tab', { x: 20, y: 0, width: 68, height: 40 });

    jest.advanceTimersByTime(300);

    expect(screen.getByTestId(`${TEST_ID}-active-indicator`)).toHaveAnimatedStyle({
      width: 68,
      transform: [{ translateX: 20 }, { translateY: 0 }],
    });
  });

  it('positions indicator correctly with vertical padding', () => {
    render(
      <DefaultThemeProvider>
        <TabsContext.Provider value={mockApi}>
          <SegmentedTabs {...exampleProps} paddingY={2} />
        </TabsContext.Provider>
      </DefaultThemeProvider>,
    );

    layoutTab('buy-tab', { x: 0, y: 8, width: 68, height: 40 });

    jest.advanceTimersByTime(300);

    expect(screen.getByTestId(`${TEST_ID}-active-indicator`)).toHaveAnimatedStyle({
      width: 68,
      transform: [{ translateX: 0 }, { translateY: 8 }],
    });
  });

  it('positions indicator correctly with both horizontal and vertical padding', () => {
    render(
      <DefaultThemeProvider>
        <TabsContext.Provider value={mockApi}>
          <SegmentedTabs {...exampleProps} paddingX={5} paddingY={2} />
        </TabsContext.Provider>
      </DefaultThemeProvider>,
    );

    layoutTab('buy-tab', { x: 20, y: 8, width: 68, height: 40 });

    jest.advanceTimersByTime(300);

    expect(screen.getByTestId(`${TEST_ID}-active-indicator`)).toHaveAnimatedStyle({
      width: 68,
      transform: [{ translateX: 20 }, { translateY: 8 }],
    });
  });
});
