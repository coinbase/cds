import React from 'react';
import { View } from 'react-native';
import { TabsContext } from '@coinbase/cds-common/tabs/TabsContext';
import { NoopFn } from '@coinbase/cds-common/utils/mockUtils';
import { fireEvent, render, screen } from '@testing-library/react-native';

import { defaultTheme } from '../../themes/defaultTheme';
import { Text } from '../../typography/Text';
import { DefaultThemeProvider } from '../../utils/testHelpers';
import type { SegmentedTabProps } from '../SegmentedTab';
import { SegmentedTab } from '../SegmentedTab';

const TEST_ID = 'mock-segmented-tab';

const exampleProps: SegmentedTabProps = {
  id: 'buy',
  label: 'Buy',
  onPress: NoopFn,
  testID: TEST_ID,
};

const mockApi = {
  tabs: [],
  activeTab: null,
  updateActiveTab: jest.fn(),
  goNextTab: jest.fn(),
  goPreviousTab: jest.fn(),
};

const mockActiveApi = { ...mockApi, activeTab: exampleProps };

describe('SegmentedTab', () => {
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
          <SegmentedTab {...exampleProps} />
        </TabsContext.Provider>
      </DefaultThemeProvider>,
    );
    expect(screen.getByTestId(TEST_ID)).toBeAccessible();
  });

  it('renders SegmentedTab correctly', () => {
    render(
      <DefaultThemeProvider>
        <TabsContext.Provider value={mockApi}>
          <SegmentedTab {...exampleProps} />
        </TabsContext.Provider>
      </DefaultThemeProvider>,
    );
    expect(screen.getByText('Buy')).toBeTruthy();
    expect(screen.getByText('Buy')).toHaveAnimatedStyle({
      color: `rgb(${defaultTheme.lightSpectrum.gray100})`,
    });
  });

  it('renders correct color when active', () => {
    render(
      <DefaultThemeProvider>
        <TabsContext.Provider value={mockActiveApi}>
          <SegmentedTab {...exampleProps} />
        </TabsContext.Provider>
      </DefaultThemeProvider>,
    );
    jest.advanceTimersByTime(300);
    expect(screen.getByTestId(`${TEST_ID}-label`)).toHaveAnimatedStyle({
      color: `rgb(${defaultTheme.lightSpectrum.gray0})`,
    });
  });

  it('triggers onPress when clicking the tab', () => {
    const onPress = jest.fn();
    render(
      <DefaultThemeProvider>
        <TabsContext.Provider value={mockApi}>
          <SegmentedTab {...exampleProps} onPress={onPress} />
        </TabsContext.Provider>
      </DefaultThemeProvider>,
    );
    fireEvent.press(screen.getByTestId(TEST_ID));

    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('renders custom node for label', () => {
    const label = (
      <Text font="display1" testID="custom-label">
        Custom label
      </Text>
    );
    render(
      <DefaultThemeProvider>
        <TabsContext.Provider value={mockApi}>
          <SegmentedTab {...exampleProps} label={label} />
        </TabsContext.Provider>
      </DefaultThemeProvider>,
    );
    expect(screen.getByTestId('custom-label')).toBeTruthy();
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<View>();
    render(
      <DefaultThemeProvider>
        <TabsContext.Provider value={mockApi}>
          <SegmentedTab {...exampleProps} ref={ref} />
        </TabsContext.Provider>
      </DefaultThemeProvider>,
    );
    expect(ref.current).toBeInstanceOf(View);
  });
});
