import { useState } from 'react';
import { sampleTabs } from '@coinbase/cds-common/internal/data/tabs';
import type { TabValue } from '@coinbase/cds-common/tabs/useTabs';
import { fireEvent, render, screen, waitFor } from '@testing-library/react-native';

import type { ChipSize } from '../../../chips/ChipProps';
import { defaultTheme } from '../../../themes/defaultTheme';
import { DefaultThemeProvider, treeHasStyleProp } from '../../../utils/testHelpers';
import { type TabbedChipProps, TabbedChips, type TabbedChipsProps } from '../TabbedChips';

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

const activeBackgroundTabs: TabbedChipProps[] = [
  { ...tabs[0], activeBackground: 'bgPositive' as TabbedChipProps['activeBackground'] },
  { ...tabs[1], activeBackground: 'bgNegative' as TabbedChipProps['activeBackground'] },
  ...tabs.slice(2).map((tab) => ({
    ...tab,
    activeBackground: 'bgPositive' as TabbedChipProps['activeBackground'],
  })),
];

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
    it('paints activeBackground on the selected tab without inverting', () => {
      const { toJSON } = render(<ActiveBackgroundDemo />);

      expect(
        screen.getByTestId(activeBackgroundTabs[0].testID ?? activeBackgroundTabs[0].id),
      ).toBeSelected();
      expect(
        treeHasStyleProp(
          toJSON(),
          (style) => style.backgroundColor === defaultTheme.lightColor.bgPositive,
        ),
      ).toBe(true);
      expect(
        treeHasStyleProp(
          toJSON(),
          (style) => style.backgroundColor === defaultTheme.lightColor.bgNegative,
        ),
      ).toBe(false);
    });

    it('moves activeBackground to the newly selected tab', async () => {
      const { toJSON } = render(<ActiveBackgroundDemo />);
      const secondTestId = activeBackgroundTabs[1].testID ?? activeBackgroundTabs[1].id;

      fireEvent.press(screen.getByTestId(secondTestId));

      await waitFor(() => expect(screen.getByTestId(secondTestId)).toBeSelected());
      expect(
        treeHasStyleProp(
          toJSON(),
          (style) => style.backgroundColor === defaultTheme.lightColor.bgNegative,
        ),
      ).toBe(true);
      expect(
        treeHasStyleProp(
          toJSON(),
          (style) => style.backgroundColor === defaultTheme.lightColor.bgPositive,
        ),
      ).toBe(false);
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

      expect(screen.getByText('Tab one')).toHaveStyle({
        color: defaultTheme.darkColor.fgPositive,
      });
      expect(screen.getByText('Tab two')).toHaveStyle({
        color: defaultTheme.lightColor.fg,
      });
    });

    it('moves activeColor to the newly selected tab', async () => {
      render(<ActiveColorDemo />);

      fireEvent.press(screen.getByTestId(activeColorTabs[1].testID ?? activeColorTabs[1].id));

      await waitFor(() =>
        expect(screen.getByText('Tab two')).toHaveStyle({
          color: defaultTheme.darkColor.fgPositive,
        }),
      );
      expect(screen.getByText('Tab one')).toHaveStyle({
        color: defaultTheme.lightColor.fg,
      });
    });
  });
});
