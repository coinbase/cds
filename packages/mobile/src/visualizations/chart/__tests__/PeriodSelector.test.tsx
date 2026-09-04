import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react-native';

import { ComponentConfigProvider } from '../../../system/ComponentConfigProvider';
import { defaultTheme } from '../../../themes/defaultTheme';
import { DefaultThemeProvider } from '../../../utils/testHelpers';
import { PeriodSelector } from '../PeriodSelector';

const TEST_ID = 'period-selector';
const tabs = [
  { id: '1h', label: '1H', testID: '1h-tab' },
  { id: '1d', label: '1D', testID: '1d-tab' },
];

const layoutTab = (
  testID: string,
  layout: { x: number; y: number; width: number; height: number },
) => {
  const tab = screen.getByTestId(testID);
  expect(tab.parent).toBeTruthy();
  fireEvent(tab.parent!, 'layout', { nativeEvent: { layout } });
};

describe('PeriodSelector', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it('applies PeriodSelector defaults from ComponentConfigProvider', () => {
    render(
      <DefaultThemeProvider>
        <ComponentConfigProvider value={{ PeriodSelector: { activeBackground: 'bgSecondary' } }}>
          <PeriodSelector
            activeTab={tabs[0]}
            onChange={jest.fn()}
            styles={{ activeIndicator: {} }}
            tabs={tabs}
            testID={TEST_ID}
          />
        </ComponentConfigProvider>
      </DefaultThemeProvider>,
    );

    layoutTab('1h-tab', { x: 0, y: 0, width: 48, height: 40 });
    jest.advanceTimersByTime(300);

    expect(screen.getByTestId(`${TEST_ID}-active-indicator`)).toHaveAnimatedStyle({
      backgroundColor: defaultTheme.lightColor.bgSecondary,
    });
  });

  it('keeps local PeriodSelector props higher precedence than provider defaults', () => {
    render(
      <DefaultThemeProvider>
        <ComponentConfigProvider value={{ PeriodSelector: { activeBackground: 'bgSecondary' } }}>
          <PeriodSelector
            activeBackground="bgPositive"
            activeTab={tabs[0]}
            onChange={jest.fn()}
            styles={{ activeIndicator: {} }}
            tabs={tabs}
            testID={TEST_ID}
          />
        </ComponentConfigProvider>
      </DefaultThemeProvider>,
    );

    layoutTab('1h-tab', { x: 0, y: 0, width: 48, height: 40 });
    jest.advanceTimersByTime(300);

    expect(screen.getByTestId(`${TEST_ID}-active-indicator`)).toHaveAnimatedStyle({
      backgroundColor: defaultTheme.lightColor.bgPositive,
    });
  });
});
