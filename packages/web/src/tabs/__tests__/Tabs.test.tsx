import React, { useState } from 'react';
import type { TabValue } from '@coinbase/cds-common/tabs/useTabs';
import { fireEvent, render, screen } from '@testing-library/react';

import { DefaultThemeProvider } from '../../utils/test';
import { Tabs, type TabsProps } from '../Tabs';

// `react-use-measure` relies on ResizeObserver, which jsdom lacks. We mock only the
// measurement hook so that ref registration (`useRefMap`) stays real and is exercised.
jest.mock('react-use-measure', () => ({
  __esModule: true,
  default: () => [
    () => {},
    { width: 230, height: 40, x: 0, y: 0, top: 0, left: 0, right: 0, bottom: 0 },
  ],
}));

const baseTabs = [
  { id: 'buy', label: 'Buy' },
  { id: 'sell', label: 'Sell' },
  { id: 'convert', label: 'Convert' },
];

type ControlledTabsProps = Partial<Omit<TabsProps, 'activeTab' | 'onChange' | 'tabs'>> & {
  tabs?: TabValue[];
  initialActiveTab?: TabValue | null;
  onChange?: (tab: TabValue | null) => void;
};

const ControlledTabs = ({
  tabs = baseTabs,
  initialActiveTab = baseTabs[0],
  onChange,
  ...props
}: ControlledTabsProps) => {
  const [activeTab, setActiveTab] = useState<TabValue | null>(initialActiveTab);
  return (
    <DefaultThemeProvider>
      <Tabs
        {...props}
        activeTab={activeTab}
        onChange={(tab) => {
          setActiveTab(tab);
          onChange?.(tab);
        }}
        tabs={tabs}
      />
    </DefaultThemeProvider>
  );
};

const getTab = (name: string) => screen.getByRole('tab', { name });

describe('Tabs', () => {
  it('renders a tab for each entry', () => {
    render(<ControlledTabs />);
    expect(getTab('Buy')).toBeInTheDocument();
    expect(getTab('Sell')).toBeInTheDocument();
    expect(getTab('Convert')).toBeInTheDocument();
  });

  describe('keyboard navigation (ref-driven focus management)', () => {
    it('moves focus to the next tab on ArrowRight', () => {
      render(<ControlledTabs />);
      getTab('Buy').focus();

      fireEvent.keyDown(getTab('Buy'), { key: 'ArrowRight' });

      expect(getTab('Sell')).toHaveFocus();
    });

    it('moves focus to the previous tab on ArrowLeft', () => {
      render(<ControlledTabs />);
      getTab('Convert').focus();

      fireEvent.keyDown(getTab('Convert'), { key: 'ArrowLeft' });

      expect(getTab('Sell')).toHaveFocus();
    });

    it('moves focus to the first tab on Home', () => {
      render(<ControlledTabs />);
      getTab('Convert').focus();

      fireEvent.keyDown(getTab('Convert'), { key: 'Home' });

      expect(getTab('Buy')).toHaveFocus();
    });

    it('moves focus to the last tab on End', () => {
      render(<ControlledTabs />);
      getTab('Buy').focus();

      fireEvent.keyDown(getTab('Buy'), { key: 'End' });

      expect(getTab('Convert')).toHaveFocus();
    });

    it('skips disabled tabs when navigating', () => {
      render(
        <ControlledTabs
          tabs={[
            { id: 'buy', label: 'Buy' },
            { id: 'sell', label: 'Sell', disabled: true },
            { id: 'convert', label: 'Convert' },
          ]}
        />,
      );
      getTab('Buy').focus();

      fireEvent.keyDown(getTab('Buy'), { key: 'ArrowRight' });

      expect(getTab('Convert')).toHaveFocus();
    });

    it('does not move focus past the last tab on ArrowRight', () => {
      render(<ControlledTabs />);
      getTab('Convert').focus();

      fireEvent.keyDown(getTab('Convert'), { key: 'ArrowRight' });

      expect(getTab('Convert')).toHaveFocus();
    });
  });

  describe('onActiveTabElementChange (ref registration)', () => {
    it('reports the active tab DOM element on mount', () => {
      const onActiveTabElementChange = jest.fn();
      render(<ControlledTabs onActiveTabElementChange={onActiveTabElementChange} />);

      expect(onActiveTabElementChange).toHaveBeenCalled();
      const element = onActiveTabElementChange.mock.calls.at(-1)?.[0];
      expect(element).toBeInstanceOf(HTMLElement);
      // The reported element must be (or contain) the active tab.
      expect(element?.textContent).toContain('Buy');
    });
  });
});
