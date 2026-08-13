import { useState } from 'react';
import { sampleTabs } from '@coinbase/cds-common/internal/data/tabs';
import { renderA11y } from '@coinbase/cds-web-utils';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import type { ChipSize } from '../../../chips/ChipProps';
import { DefaultThemeProvider } from '../../../utils/test';
import { type TabbedChipProps, TabbedChips, type TabbedChipsProps } from '../TabbedChips';

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

const activeBackgroundTabs: TabbedChipProps[] = tabs.map((tab) => ({
  ...tab,
  activeBackground: 'bgPositive' as TabbedChipProps['activeBackground'],
}));

const activeColorTabs: TabbedChipProps[] = tabs.map((tab) => ({
  ...tab,
  activeColor: 'fgPositive' as TabbedChipProps['activeColor'],
}));

const ActiveBackgroundDemo = () => {
  const [value, setValue] = useState<TabbedChipsProps['activeTab']>(activeBackgroundTabs[0]);
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
  const [value, setValue] = useState<TabbedChipsProps['activeTab']>(activeColorTabs[0]);
  return (
    <DefaultThemeProvider>
      <TabbedChips activeTab={value} onChange={setValue} tabs={activeColorTabs} testID={testID} />
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

  describe('activeBackground', () => {
    it('paints activeBackground on the selected tab without inverting', () => {
      render(<ActiveBackgroundDemo />);
      const first = screen.getByTestId(
        activeBackgroundTabs[0].testID ?? activeBackgroundTabs[0].id,
      );
      const second = screen.getByTestId(
        activeBackgroundTabs[1].testID ?? activeBackgroundTabs[1].id,
      );

      expect(first).toHaveAttribute('aria-selected', 'true');
      expect(first).toHaveStyle({ backgroundColor: 'var(--color-bgPositive)' });
      expect(first.parentElement?.className).not.toMatch(/\bdark\b/);
      expect(second).toHaveAttribute('aria-selected', 'false');
      expect(second).toHaveStyle({ backgroundColor: 'var(--color-bgSecondary)' });
    });

    it('moves activeBackground to the newly selected tab', async () => {
      render(<ActiveBackgroundDemo />);
      const first = screen.getByTestId(
        activeBackgroundTabs[0].testID ?? activeBackgroundTabs[0].id,
      );
      const second = screen.getByTestId(
        activeBackgroundTabs[1].testID ?? activeBackgroundTabs[1].id,
      );

      fireEvent.click(second);

      await waitFor(() => expect(second).toHaveAttribute('aria-selected', 'true'));
      expect(second).toHaveStyle({ backgroundColor: 'var(--color-bgPositive)' });
      expect(first).toHaveAttribute('aria-selected', 'false');
      expect(first).toHaveStyle({ backgroundColor: 'var(--color-bgSecondary)' });
    });
  });

  describe('size', () => {
    const renderWithCapturingTab = (props: Partial<TabbedChipsProps>) => {
      const receivedSizes: (ChipSize | undefined)[] = [];
      const CapturingTab = (tabProps: TabbedChipProps) => {
        receivedSizes.push(tabProps.size);
        return null;
      };
      render(
        <DefaultThemeProvider>
          <TabbedChips
            TabComponent={CapturingTab}
            activeTab={tabs[0]}
            onChange={jest.fn()}
            tabs={tabs}
            testID={testID}
            {...props}
          />
        </DefaultThemeProvider>,
      );
      return receivedSizes;
    };

    it('forwards s to tab chips by default', () => {
      expect(renderWithCapturingTab({}).every((size) => size === 's')).toBe(true);
    });

    it('forwards the provided size to tab chips', () => {
      expect(renderWithCapturingTab({ size: 'xs' }).every((size) => size === 'xs')).toBe(true);
    });

    it('forwards xs to tab chips when legacy compact is set', () => {
      expect(renderWithCapturingTab({ compact: true }).every((size) => size === 'xs')).toBe(true);
    });

    it('resolves size over compact when both are provided', () => {
      expect(
        renderWithCapturingTab({ compact: true, size: 's' }).every((size) => size === 's'),
      ).toBe(true);
    });
  });

  describe('activeColor', () => {
    it('applies activeColor to the selected tab label', () => {
      render(<ActiveColorDemo />);

      expect(screen.getByText('Tab one')).toHaveStyle({ color: 'var(--color-fgPositive)' });
      expect(screen.getByText('Tab two')).toHaveStyle({ color: 'var(--color-fg)' });
    });

    it('moves activeColor to the newly selected tab', async () => {
      render(<ActiveColorDemo />);

      fireEvent.click(screen.getByTestId(activeColorTabs[1].testID ?? activeColorTabs[1].id));

      await waitFor(() =>
        expect(screen.getByText('Tab two')).toHaveStyle({ color: 'var(--color-fgPositive)' }),
      );
      expect(screen.getByText('Tab one')).toHaveStyle({ color: 'var(--color-fg)' });
    });
  });
});
