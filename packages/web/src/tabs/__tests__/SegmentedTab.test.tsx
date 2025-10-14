import React from 'react';
import { TabsContext } from '@coinbase/cds-common/tabs/TabsContext';
import { renderA11y } from '@coinbase/cds-web-utils';
import { fireEvent, render, screen } from '@testing-library/react';

import { Text } from '../../typography/Text';
import { DefaultThemeProvider } from '../../utils/test';
import type { SegmentedTabProps } from '../SegmentedTab';
import { SegmentedTab } from '../SegmentedTab';
import { SegmentedTabs } from '../SegmentedTabs';

const TEST_ID = 'mock-segmented-tab';
const NoopFn = () => {};

const exampleProps: SegmentedTabProps = {
  id: 'buy',
  label: 'Buy',
  onClick: NoopFn,
  testID: TEST_ID,
};

const mockApi = {
  tabs: [],
  activeTab: null,
  updateActiveTab: jest.fn(),
  goNextTab: jest.fn(),
  goPreviousTab: jest.fn(),
};

describe('SegmentedTab', () => {
  it('passes accessibility', async () => {
    expect(
      await renderA11y(
        <DefaultThemeProvider>
          <TabsContext.Provider value={mockApi}>
            <div role="tablist">
              <SegmentedTab {...exampleProps} />
            </div>
          </TabsContext.Provider>
        </DefaultThemeProvider>,
      ),
    ).toHaveNoViolations();
  });

  it('renders SegmentedTab correctly', () => {
    render(
      <DefaultThemeProvider>
        <TabsContext.Provider value={mockApi}>
          <SegmentedTab {...exampleProps} />
        </TabsContext.Provider>
      </DefaultThemeProvider>,
    );
    const buyTab = screen.getByText('Buy');
    expect(buyTab).toBeInTheDocument();
    expect(buyTab.className).toContain('fg');
  });

  it('renders SegmentedTab correctly when disabled', () => {
    render(
      <DefaultThemeProvider>
        <TabsContext.Provider value={mockApi}>
          <SegmentedTab {...exampleProps} disabled />
        </TabsContext.Provider>
      </DefaultThemeProvider>,
    );
    expect(screen.getByTestId(TEST_ID)).toHaveAttribute('disabled');
  });

  it('renders with custom classNames', () => {
    render(
      <DefaultThemeProvider>
        <TabsContext.Provider value={mockApi}>
          <SegmentedTab {...exampleProps} className="custom-class" />
        </TabsContext.Provider>
      </DefaultThemeProvider>,
    );
    expect(screen.getByTestId(TEST_ID)).toHaveClass('custom-class');
  });

  it('does not call onClick when disabled and clicked', () => {
    const onClick = jest.fn();
    render(
      <DefaultThemeProvider>
        <TabsContext.Provider value={mockApi}>
          <SegmentedTab {...exampleProps} disabled onClick={onClick} />
        </TabsContext.Provider>
      </DefaultThemeProvider>,
    );
    fireEvent.click(screen.getByTestId(TEST_ID));
    expect(onClick).not.toHaveBeenCalled();
  });

  it('triggers onClick when clicking the tab', () => {
    const onClick = jest.fn();
    render(
      <DefaultThemeProvider>
        <TabsContext.Provider value={mockApi}>
          <SegmentedTab {...exampleProps} onClick={onClick} />
        </TabsContext.Provider>
      </DefaultThemeProvider>,
    );
    fireEvent.click(screen.getByTestId(TEST_ID));

    expect(onClick).toHaveBeenCalledTimes(1);
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
    expect(screen.getByTestId('custom-label')).toBeInTheDocument();
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(
      <DefaultThemeProvider>
        <TabsContext.Provider value={mockApi}>
          <SegmentedTab {...exampleProps} ref={ref} />
        </TabsContext.Provider>
      </DefaultThemeProvider>,
    );
    expect(ref.current).not.toBeNull();
  });
});
