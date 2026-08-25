import React from 'react';
import useMeasure from 'react-use-measure';
import { useRefMap } from '@coinbase/cds-common/hooks/useRefMap';
import { render, screen } from '@testing-library/react';

import { ComponentConfigProvider } from '../../../system';
import { DefaultThemeProvider } from '../../../utils/test';
import { PeriodSelector } from '../PeriodSelector';

const TEST_ID = 'period-selector';
const tabs = [
  { id: '1h', label: '1H' },
  { id: '1d', label: '1D' },
];

jest.mock('react-use-measure');
jest.mock('@coinbase/cds-common/hooks/useRefMap');

const mockUseMeasure = (mocks: Partial<ReturnType<typeof useMeasure>>) => {
  (useMeasure as jest.Mock).mockReturnValue(mocks);
};

const mockUseRefMap = (mocks: ReturnType<typeof useRefMap>) => {
  (useRefMap as jest.Mock).mockReturnValue(mocks);
};

const refMap: ReturnType<typeof useRefMap> = {
  refs: { current: {} },
  registerRef: () => {},
  getRef: jest.fn(() => ({
    getBoundingClientRect: jest.fn(() => ({
      x: 0,
      y: 0,
      width: 48,
      height: 40,
    })),
    offsetLeft: 0,
    offsetTop: 0,
    offsetWidth: 48,
    offsetHeight: 40,
    offsetParent: {},
  })),
};

describe('PeriodSelector', () => {
  beforeEach(() => {
    mockUseMeasure([
      jest.fn(),
      {
        width: 200,
        x: 0,
        y: 0,
        height: 40,
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
      },
    ]);
    mockUseRefMap(refMap);
  });

  it('applies PeriodSelector defaults from ComponentConfigProvider', () => {
    render(
      <DefaultThemeProvider>
        <ComponentConfigProvider value={{ PeriodSelector: { activeBackground: 'bgSecondary' } }}>
          <PeriodSelector activeTab={tabs[0]} onChange={jest.fn()} tabs={tabs} testID={TEST_ID} />
        </ComponentConfigProvider>
      </DefaultThemeProvider>,
    );

    expect(screen.getByTestId(`${TEST_ID}-active-indicator`)).toHaveStyle({
      backgroundColor: 'var(--color-bgSecondary)',
    });
  });

  it('keeps local PeriodSelector props higher precedence than provider defaults', () => {
    render(
      <DefaultThemeProvider>
        <ComponentConfigProvider value={{ PeriodSelector: { activeBackground: 'bgSecondary' } }}>
          <PeriodSelector
            activeBackground="bgPositive"
            activeTab={tabs[0]}
            onChange={jest.fn()}
            tabs={tabs}
            testID={TEST_ID}
          />
        </ComponentConfigProvider>
      </DefaultThemeProvider>,
    );

    expect(screen.getByTestId(`${TEST_ID}-active-indicator`)).toHaveStyle({
      backgroundColor: 'var(--color-bgPositive)',
    });
  });
});
