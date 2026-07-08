import React, { createRef, useState } from 'react';
import { StyleSheet, Text as RNText, View } from 'react-native';
import { fireEvent, render, screen } from '@testing-library/react-native';

import { defaultTheme } from '../../themes/defaultTheme';
import { DefaultThemeProvider } from '../../utils/testHelpers';
import { Tabs } from '../Tabs';

describe('Tabs', () => {
  it('allows per-tab color and activeColor to override Tabs defaults', () => {
    const tabs = [
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
      const [active, setActive] = useState<(typeof tabs)[number] | null>(tabs[0]);
      return (
        <DefaultThemeProvider>
          <Tabs
            activeColor="fg"
            activeTab={active}
            color="fgMuted"
            onChange={setActive}
            tabs={tabs}
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
    const tabs = [{ id: 'a', label: 'A', testID: 'tab-a', style: { marginTop } }];

    const Wrapper = () => {
      const [active, setActive] = useState<(typeof tabs)[number] | null>(tabs[0]);
      return (
        <DefaultThemeProvider>
          <Tabs
            activeTab={active}
            onChange={setActive}
            styles={{ tab: { marginTop: 8 } }}
            tabs={tabs}
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
    const tabs = [{ id: 'a', label: 'A', testID: 'tab-a' }];

    const Wrapper = () => {
      const [active, setActive] = useState<(typeof tabs)[number] | null>(tabs[0]);
      return (
        <DefaultThemeProvider>
          <Tabs ref={ref} activeTab={active} onChange={setActive} tabs={tabs} />
        </DefaultThemeProvider>
      );
    };

    render(<Wrapper />);

    expect(ref.current).not.toBeNull();
    expect(ref.current).toBeInstanceOf(View);
  });
});
