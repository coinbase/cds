import { useState } from 'react';
import { sampleTabs } from '@coinbase/cds-common/internal/data/tabs';
import type { TabValue } from '@coinbase/cds-common/tabs/useTabs';
import { fireEvent, render, screen, waitFor } from '@testing-library/react-native';

import { DefaultThemeProvider } from '../../../utils/testHelpers';
import { type TabbedChipProps, TabbedChips } from '../TabbedChips';

const testID = 'tabbed-chips';
const tabs = sampleTabs.slice(0, 5);

const Demo = () => {
  const [value, setValue] = useState<TabValue | null>(tabs[0]);
  return (
    <DefaultThemeProvider>
      <TabbedChips activeTab={value} onChange={setValue} tabs={tabs} testID={testID} />
    </DefaultThemeProvider>
  );
};

const activeBackgroundTabs: TabbedChipProps[] = tabs.map((tab) => ({
  ...tab,
  activeBackground: 'bgPositive' as TabbedChipProps['activeBackground'],
}));

const activeColorTabs: TabbedChipProps[] = tabs.map((tab) => ({
  ...tab,
  activeColor: 'fgPositive' as TabbedChipProps['activeColor'],
}));

const ActiveBackgroundDemo = () => {
  const [value, setValue] = useState<TabValue | null>(activeBackgroundTabs[0]);
  return (
    <DefaultThemeProvider>
      <TabbedChips
        activeTab={value}
        onChange={setValue}
        tabs={activeBackgroundTabs}
        testID={testID}
      />
    </DefaultThemeProvider>
  );
};

const ActiveColorDemo = () => {
  const [value, setValue] = useState<TabValue | null>(activeColorTabs[0]);
  return (
    <DefaultThemeProvider>
      <TabbedChips activeTab={value} onChange={setValue} tabs={activeColorTabs} testID={testID} />
    </DefaultThemeProvider>
  );
};

describe('TabbedChips(Alpha)', () => {
  it('passes a11y', () => {
    render(<Demo />);
    expect(screen.getByTestId(testID)).toBeAccessible();
  });

  it('renders a tab with injected testID', () => {
    render(<Demo />);
    const targetTestId = tabs[1].testID ?? tabs[1].id;
    expect(screen.getByTestId(targetTestId)).toBeDefined();
  });

  it('updates selected tab on press', async () => {
    render(<Demo />);
    const firstTestId = tabs[0].testID ?? tabs[0].id;
    const secondTestId = tabs[1].testID ?? tabs[1].id;

    expect(screen.getByTestId(firstTestId)).toBeSelected();

    fireEvent.press(screen.getByTestId(secondTestId));

    await waitFor(() => expect(screen.getByTestId(secondTestId)).toBeSelected());
    await waitFor(() => expect(screen.getByTestId(firstTestId)).not.toBeSelected());
  });

  describe('activeBackground', () => {
    it('renders without error when tabs have activeBackground set', () => {
      render(<ActiveBackgroundDemo />);
      expect(screen.getByTestId(testID)).toBeDefined();
    });

    it('active tab with activeBackground remains selected', async () => {
      render(<ActiveBackgroundDemo />);
      const firstTestId = activeBackgroundTabs[0].testID ?? activeBackgroundTabs[0].id;
      const secondTestId = activeBackgroundTabs[1].testID ?? activeBackgroundTabs[1].id;

      expect(screen.getByTestId(firstTestId)).toBeSelected();

      fireEvent.press(screen.getByTestId(secondTestId));

      await waitFor(() => expect(screen.getByTestId(secondTestId)).toBeSelected());
      await waitFor(() => expect(screen.getByTestId(firstTestId)).not.toBeSelected());
    });
  });

  describe('activeColor', () => {
    it('renders without error when tabs have activeColor set', () => {
      render(<ActiveColorDemo />);
      expect(screen.getByTestId(testID)).toBeDefined();
    });

    it('active tab with activeColor remains selected', async () => {
      render(<ActiveColorDemo />);
      const firstTestId = activeColorTabs[0].testID ?? activeColorTabs[0].id;
      const secondTestId = activeColorTabs[1].testID ?? activeColorTabs[1].id;

      expect(screen.getByTestId(firstTestId)).toBeSelected();

      fireEvent.press(screen.getByTestId(secondTestId));

      await waitFor(() => expect(screen.getByTestId(secondTestId)).toBeSelected());
      await waitFor(() => expect(screen.getByTestId(firstTestId)).not.toBeSelected());
    });
  });
});
