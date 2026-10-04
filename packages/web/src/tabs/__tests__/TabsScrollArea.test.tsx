import { useState } from 'react';
import useMeasure from 'react-use-measure';
import { useRefMap } from '@coinbase/cds-common/hooks/useRefMap';
import { sampleTabs } from '@coinbase/cds-common/internal/data/tabs';
import { render, screen } from '@testing-library/react';

import { DefaultThemeProvider } from '../../utils/test';
import { Tabs } from '../Tabs';
import { TabsScrollArea } from '../TabsScrollArea';

jest.mock('react-use-measure');
jest.mock('@coinbase/cds-common/hooks/useRefMap');

const NoopFn = () => {};

const mockUseMeasure = (mocks: Partial<ReturnType<typeof useMeasure>>) => {
  (useMeasure as jest.Mock).mockReturnValue(mocks);
};

const mockUseRefMap = (mocks: ReturnType<typeof useRefMap>) => {
  (useRefMap as jest.Mock).mockReturnValue(mocks);
};

const mockDimensions: Partial<ReturnType<typeof useMeasure>> = [
  jest.fn(),
  {
    width: 400,
    x: 0,
    y: 0,
    height: 40,
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
  },
];

const refMap: ReturnType<typeof useRefMap> = {
  refs: { current: {} },
  registerRef: NoopFn,
  getRef: jest.fn(() => ({
    getBoundingClientRect: jest.fn(() => ({
      x: 0,
      y: 0,
      width: 80,
      height: 40,
    })),
    offsetLeft: 0,
    offsetTop: 0,
    offsetWidth: 80,
    offsetHeight: 40,
    offsetParent: {},
  })),
};

const tabs = sampleTabs.slice(0, 3);

const MockTabsScrollArea = () => {
  const [activeTab, setActiveTab] = useState(tabs[0]);
  return (
    <TabsScrollArea testID="tabs-scroll-area">
      {({ onActiveTabElementChange: onActiveTab }) => (
        <Tabs
          activeTab={activeTab}
          onActiveTabElementChange={onActiveTab}
          onChange={(tab) => {
            if (tab) setActiveTab(tab);
          }}
          tabs={tabs}
        />
      )}
    </TabsScrollArea>
  );
};

describe('TabsScrollArea', () => {
  const mockResizeObserver = jest.fn(() => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
  }));

  beforeAll(() => {
    global.ResizeObserver = mockResizeObserver;
    Element.prototype.scrollTo = jest.fn();
  });

  beforeEach(() => {
    mockUseMeasure(mockDimensions);
    mockUseRefMap(refMap);
  });

  it('renders the scroll area and tabs', () => {
    render(
      <DefaultThemeProvider>
        <MockTabsScrollArea />
      </DefaultThemeProvider>,
    );

    expect(screen.getByTestId('tabs-scroll-area')).toBeVisible();
    expect(screen.getByText('Tab one')).toBeVisible();
  });

  it('renders non-function children without throwing', () => {
    render(
      <DefaultThemeProvider>
        <TabsScrollArea testID="tabs-scroll-area">
          {/* @ts-expect-error Intentionally invalid: `children` must be a render function */}
          <span>invalid</span>
        </TabsScrollArea>
      </DefaultThemeProvider>,
    );

    expect(screen.getByText('invalid')).toBeVisible();
  });

  it('forwards accessibilityLabel to the root', () => {
    render(
      <DefaultThemeProvider>
        <TabsScrollArea accessibilityLabel="Scrollable tab list" testID="tabs-scroll-area">
          {({ onActiveTabElementChange: onActiveTab }) => (
            <Tabs
              activeTab={tabs[0]}
              onActiveTabElementChange={onActiveTab}
              onChange={NoopFn}
              tabs={tabs}
            />
          )}
        </TabsScrollArea>
      </DefaultThemeProvider>,
    );

    expect(screen.getByLabelText('Scrollable tab list')).toBeVisible();
  });
});
