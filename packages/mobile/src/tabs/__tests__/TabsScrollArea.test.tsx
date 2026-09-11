import { useState } from 'react';
import { Text } from 'react-native';
import { sampleTabs } from '@coinbase/cds-common/internal/data/tabs';
import type { TabValue } from '@coinbase/cds-common/tabs/useTabs';
import { fireEvent, render, screen, waitFor } from '@testing-library/react-native';

import { DefaultThemeProvider } from '../../utils/testHelpers';
import { DefaultTab } from '../DefaultTab';
import { DefaultTabsActiveIndicator } from '../DefaultTabsActiveIndicator';
import { Tabs } from '../Tabs';
import { TabsScrollArea } from '../TabsScrollArea';

const tabs = sampleTabs.slice(0, 5);

const testID = 'tabs-scroll-area';

const Demo = () => {
  const [activeTab, setActiveTab] = useState<TabValue | null>(tabs[0]);
  return (
    <DefaultThemeProvider>
      <TabsScrollArea accessibilityLabel="Scrollable tab list" testID={testID}>
        {({ onActiveTabElementChange }) => (
          <Tabs
            TabComponent={DefaultTab}
            TabsActiveIndicatorComponent={DefaultTabsActiveIndicator}
            accessibilityLabel="Tabs"
            activeBackground="bgPrimary"
            activeTab={activeTab}
            background="bg"
            gap={4}
            onActiveTabElementChange={onActiveTabElementChange}
            onChange={setActiveTab}
            tabs={tabs}
          />
        )}
      </TabsScrollArea>
    </DefaultThemeProvider>
  );
};

describe('TabsScrollArea', () => {
  it('passes a11y', () => {
    render(<Demo />);
    expect(screen.getByTestId(testID)).toBeAccessible();
  });

  it('renders the scroll area and tabs', () => {
    render(<Demo />);
    expect(screen.getByTestId(testID)).toBeVisible();
    expect(screen.getByText('Tab one')).toBeVisible();
  });

  it('forwards accessibilityLabel to the root', () => {
    render(<Demo />);
    expect(screen.getByLabelText('Scrollable tab list')).toBeVisible();
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
});
