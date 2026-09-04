import { useState } from 'react';
import { sampleTabs } from '@coinbase/cds-common/internal/data/tabs';
import { render, screen } from '@testing-library/react';

import { DefaultThemeProvider } from '../../utils/test';
import { TabNavigation, type TabProps } from '../TabNavigation';

jest.mock('../../hooks/useDimensions', () => ({
  useDimensions: jest.fn(() => {
    return {
      observe: jest.fn(),
    };
  }),
}));

const MockTabNavigation = ({
  testID,
  tabs = sampleTabs,
}: {
  testID: string;
  tabs?: TabProps[];
}) => {
  const [activeTab, setActiveTab] = useState(sampleTabs[0].id);
  return (
    <DefaultThemeProvider>
      <TabNavigation onChange={setActiveTab} tabs={tabs} testID={testID} value={activeTab} />
    </DefaultThemeProvider>
  );
};

describe('TabNavigation', () => {
  const TEST_ID = 'mainTabNav';

  const observe = jest.fn();
  const disconnect = jest.fn();
  const mockResizeObserver = jest.fn(() => ({
    observe: () => {
      observe();
    },
    unobserve: () => {},
    disconnect,
  }));
  const mockResizeObserverEntry = jest.fn();

  /*
    When using the delete operator in strictNullChecks, the operand must now be any, unknown, never, or be optional
    (in that it contains undefined in the type). Otherwise, use of the delete operator is an error.
  */
  const deleteResizeObserver = () => {
    // @ts-expect-error See comment above
    delete global.ResizeObserver;
  };

  const deleteResizeObserverEntry = () => {
    // @ts-expect-error See comment above
    delete global.ResizeObserverEntry;
  };

  beforeAll(() => {
    global.ResizeObserver = mockResizeObserver;
    global.ResizeObserverEntry = mockResizeObserverEntry;
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    deleteResizeObserver();
    deleteResizeObserverEntry();
  });

  it('Properly inherits testID from TabNavigation', () => {
    render(<MockTabNavigation testID={TEST_ID} />);

    expect(screen.getByTestId(TEST_ID)).toBeVisible();
    // renders the first tab
    expect(screen.getByText(sampleTabs[0].label as string)).toBeVisible();
  });

  it("Properly applies custom testID's", () => {
    render(<MockTabNavigation testID={TEST_ID} />);

    expect(screen.getByTestId(TEST_ID)).toBeVisible();
    expect(screen.getByTestId(sampleTabs[0].testID as string)).toBeVisible();
  });

  it('should allow tabs to be disabled', () => {
    render(
      <MockTabNavigation
        tabs={sampleTabs.map((tab) => ({ ...tab, disabled: true }))}
        testID={TEST_ID}
      />,
    );

    expect(screen.getByTestId(TEST_ID)).toBeVisible();
    expect(screen.getByTestId(sampleTabs[0].testID as string)).toBeVisible();
    expect(screen.getByTestId(sampleTabs[0].testID as string)).toBeDisabled();
  });
});
