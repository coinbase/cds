import { useState } from 'react';
import { sampleTabs } from '@coinbase/cds-common/internal/data/tabs';
import { renderA11y } from '@coinbase/cds-web-utils';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import { DefaultThemeProvider } from '../../../utils/test';
import { TabbedChips, type TabbedChipsProps } from '../TabbedChips';

// Mock ResizeObserver for scrolling hook
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

// Mock Element.scrollTo used by the hook and paddles
Element.prototype.scrollTo = jest.fn();

const testID = 'tabbed-chips';
const tabs = sampleTabs.slice(0, 5);

const Demo = () => {
  const [value, setValue] = useState<TabbedChipsProps['activeTab']>(tabs[0]);
  return (
    <DefaultThemeProvider>
      <TabbedChips activeTab={value} onChange={setValue} tabs={tabs} testID={testID} />
    </DefaultThemeProvider>
  );
};

describe('TabbedChips(Alpha) - web', () => {
  it('passes a11y', async () => {
    expect(await renderA11y(<Demo />)).toHaveNoViolations();
  });

  it('renders a tab with injected testID', () => {
    render(<Demo />);
    const targetTestId = tabs[1].testID ?? tabs[1].id;
    expect(screen.getByTestId(targetTestId)).toBeDefined();
  });

  it('updates selected tab on click', async () => {
    render(<Demo />);
    const firstTestId = tabs[0].testID ?? tabs[0].id;
    const secondTestId = tabs[1].testID ?? tabs[1].id;

    // Initial selection
    expect(screen.getByTestId(firstTestId)).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByTestId(secondTestId)).toHaveAttribute('aria-selected', 'false');

    // Click second tab and wait for state update
    fireEvent.click(screen.getByTestId(secondTestId));

    await waitFor(() =>
      expect(screen.getByTestId(secondTestId)).toHaveAttribute('aria-selected', 'true'),
    );
    await waitFor(() =>
      expect(screen.getByTestId(firstTestId)).toHaveAttribute('aria-selected', 'false'),
    );
  });
});
