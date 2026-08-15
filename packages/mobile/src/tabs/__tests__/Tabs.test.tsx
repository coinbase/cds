import React, { createRef, useState } from 'react';
import { StyleSheet, Text as RNText, View } from 'react-native';
import { fireEvent, render, screen } from '@testing-library/react-native';

import { defaultTheme } from '../../themes/defaultTheme';
import { DefaultThemeProvider } from '../../utils/testHelpers';
import { Tabs, TabsActiveIndicator, type TabsActiveIndicatorProps } from '../Tabs';

const tabs = [
  { id: 'buy', label: 'Buy', testID: 'buy-tab' },
  { id: 'sell', label: 'Sell', testID: 'sell-tab' },
  { id: 'convert', label: 'Convert', testID: 'convert-tab' },
];

const layoutTab = (
  testID: string,
  layout: { x: number; y: number; width: number; height: number },
) => {
  const tab = screen.getByTestId(testID);
  expect(tab.parent).toBeTruthy();
  fireEvent(tab.parent!, 'layout', { nativeEvent: { layout } });
};

const IndicatorSpy = ({ activeTabRect }: TabsActiveIndicatorProps) => (
  <View accessibilityLabel={JSON.stringify(activeTabRect)} testID="indicator-spy" />
);

describe('Tabs', () => {
  it('allows per-tab color and activeColor to override Tabs defaults', () => {
    const coloredTabs = [
      {
        id: 'one',
        label: 'One',
        testID: 'tab-one',
        color: 'fgPositive',
        activeColor: 'fgNegative',
      },
      { id: 'two', label: 'Two', testID: 'tab-two' },
    ];

    const Wrapper = () => {
      const [active, setActive] = useState<(typeof coloredTabs)[number] | null>(coloredTabs[0]);
      return (
        <DefaultThemeProvider>
          <Tabs
            activeColor="fg"
            activeTab={active}
            color="fgMuted"
            onChange={setActive}
            tabs={coloredTabs}
            testID="tabs-root"
          />
        </DefaultThemeProvider>
      );
    };

    render(<Wrapper />);

    const labelStyle = (text: string) => {
      const node = screen.UNSAFE_getAllByType(RNText).find((n) => n.props.children === text);
      expect(node).toBeDefined();
      return StyleSheet.flatten(node!.props.style);
    };

    expect(labelStyle('One').color).toBe(defaultTheme.lightColor.fgNegative);
    expect(labelStyle('Two').color).toBe(defaultTheme.lightColor.fgMuted);

    fireEvent.press(screen.getByTestId('tab-two'));

    expect(labelStyle('One').color).toBe(defaultTheme.lightColor.fgPositive);
    expect(labelStyle('Two').color).toBe(defaultTheme.lightColor.fg);
  });

  it('allows per-tab style to override shared styles.tab', () => {
    const marginTop = 42;
    const styledTabs = [{ id: 'a', label: 'A', testID: 'tab-a', style: { marginTop } }];

    const Wrapper = () => {
      const [active, setActive] = useState<(typeof styledTabs)[number] | null>(styledTabs[0]);
      return (
        <DefaultThemeProvider>
          <Tabs
            activeTab={active}
            onChange={setActive}
            styles={{ tab: { marginTop: 8 } }}
            tabs={styledTabs}
          />
        </DefaultThemeProvider>
      );
    };

    render(<Wrapper />);

    const flat = StyleSheet.flatten(screen.getByTestId('tab-a').props.style);
    expect(flat.marginTop).toBe(marginTop);
  });

  it('forwards ref to the underlying View', () => {
    const ref = createRef<View>();
    const singleTab = [{ id: 'a', label: 'A', testID: 'tab-a' }];

    const Wrapper = () => {
      const [active, setActive] = useState<(typeof singleTab)[number] | null>(singleTab[0]);
      return (
        <DefaultThemeProvider>
          <Tabs ref={ref} activeTab={active} onChange={setActive} tabs={singleTab} />
        </DefaultThemeProvider>
      );
    };

    render(<Wrapper />);

    expect(ref.current).not.toBeNull();
    expect(ref.current).toBeInstanceOf(View);
  });

  it('sets activeTabRect from the active tab onLayout', () => {
    render(
      <DefaultThemeProvider>
        <Tabs
          TabsActiveIndicatorComponent={IndicatorSpy}
          activeTab={tabs[0]}
          onChange={jest.fn()}
          tabs={tabs}
          testID="tabs-root"
        />
      </DefaultThemeProvider>,
    );

    layoutTab('buy-tab', { x: 0, y: 0, width: 64, height: 40 });

    expect(screen.getByTestId('indicator-spy').props.accessibilityLabel).toBe(
      JSON.stringify({ x: 0, y: 0, width: 64, height: 40 }),
    );
  });

  it('updates activeTabRect from cached layouts when the active tab changes', () => {
    const onChange = jest.fn();
    const { rerender } = render(
      <DefaultThemeProvider>
        <Tabs
          TabsActiveIndicatorComponent={IndicatorSpy}
          activeTab={tabs[0]}
          onChange={onChange}
          tabs={tabs}
          testID="tabs-root"
        />
      </DefaultThemeProvider>,
    );

    layoutTab('buy-tab', { x: 0, y: 0, width: 64, height: 40 });
    layoutTab('sell-tab', { x: 72, y: 0, width: 68, height: 40 });

    fireEvent.press(screen.getByTestId('sell-tab'));
    expect(onChange).toHaveBeenCalledWith(tabs[1]);

    rerender(
      <DefaultThemeProvider>
        <Tabs
          TabsActiveIndicatorComponent={IndicatorSpy}
          activeTab={tabs[1]}
          onChange={onChange}
          tabs={tabs}
          testID="tabs-root"
        />
      </DefaultThemeProvider>,
    );

    expect(screen.getByTestId('indicator-spy').props.accessibilityLabel).toBe(
      JSON.stringify({ x: 72, y: 0, width: 68, height: 40 }),
    );
  });

  it('restores activeTabRect from onLayout after remount', () => {
    const { rerender } = render(
      <DefaultThemeProvider>
        <Tabs
          key={0}
          TabsActiveIndicatorComponent={IndicatorSpy}
          activeTab={tabs[1]}
          onChange={jest.fn()}
          tabs={tabs}
          testID="tabs-root"
        />
      </DefaultThemeProvider>,
    );

    layoutTab('sell-tab', { x: 72, y: 0, width: 68, height: 40 });
    expect(screen.getByTestId('indicator-spy').props.accessibilityLabel).toBe(
      JSON.stringify({ x: 72, y: 0, width: 68, height: 40 }),
    );

    rerender(
      <DefaultThemeProvider>
        <Tabs
          key={1}
          TabsActiveIndicatorComponent={IndicatorSpy}
          activeTab={tabs[1]}
          onChange={jest.fn()}
          tabs={tabs}
          testID="tabs-root"
        />
      </DefaultThemeProvider>,
    );

    expect(screen.getByTestId('indicator-spy').props.accessibilityLabel).toBe(
      JSON.stringify({ x: 0, y: 0, width: 0, height: 0 }),
    );

    layoutTab('sell-tab', { x: 72, y: 0, width: 68, height: 40 });
    expect(screen.getByTestId('indicator-spy').props.accessibilityLabel).toBe(
      JSON.stringify({ x: 72, y: 0, width: 68, height: 40 }),
    );
  });

  it('animates TabsActiveIndicator from tab layout without writing during render', () => {
    jest.useFakeTimers();

    render(
      <DefaultThemeProvider>
        <Tabs
          TabsActiveIndicatorComponent={TabsActiveIndicator}
          activeTab={tabs[0]}
          onChange={jest.fn()}
          styles={{ activeIndicator: {} }}
          tabs={tabs}
          testID="tabs-root"
        />
      </DefaultThemeProvider>,
    );

    layoutTab('buy-tab', { x: 12, y: 4, width: 80, height: 36 });
    jest.advanceTimersByTime(300);

    expect(screen.getByTestId('tabs-root-active-indicator')).toHaveAnimatedStyle({
      width: 80,
      transform: [{ translateX: 12 }, { translateY: 4 }],
    });

    jest.useRealTimers();
  });
});
