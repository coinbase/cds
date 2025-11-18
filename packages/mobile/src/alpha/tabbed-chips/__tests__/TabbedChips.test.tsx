import { useState } from 'react';
import { sampleTabs } from '@coinbase/cds-common/internal/data/tabs';
import type { TabValue } from '@coinbase/cds-common/tabs/useTabs';
import { fireEvent, render, screen, waitFor } from '@testing-library/react-native';

import { DefaultThemeProvider } from '../../../utils/testHelpers';
import { TabbedChips } from '../TabbedChips';

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

    expect(screen.getByTestId(firstTestId)).toHaveAccessibilityState({ selected: true });

    fireEvent.press(screen.getByTestId(secondTestId));

    await waitFor(() =>
      expect(screen.getByTestId(secondTestId)).toHaveAccessibilityState({ selected: true }),
    );
    await waitFor(() =>
      expect(screen.getByTestId(firstTestId)).toHaveAccessibilityState({ selected: false }),
    );
  });
});
