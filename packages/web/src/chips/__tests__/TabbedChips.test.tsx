import React, { useState } from 'react';
import useMeasure from 'react-use-measure';
import { sampleTabs } from '@coinbase/cds-common/internal/data/tabs';
import { renderA11y } from '@coinbase/cds-web-utils';
import { render, screen } from '@testing-library/react';

import { DefaultThemeProvider } from '../../utils/test';
import { TabbedChips, type TabbedChipsBaseProps } from '../TabbedChips';

jest.mock('../../hooks/useDimensions', () => ({
  useDimensions: jest.fn(() => {
    return {
      observe: jest.fn(),
    };
  }),
}));

jest.mock('react-use-measure');

const mockUseMeasure = (mocks: Partial<ReturnType<typeof useMeasure>>) => {
  (useMeasure as jest.Mock).mockReturnValue(mocks);
};

const mockDimensions: Partial<ReturnType<typeof useMeasure>> = [
  jest.fn(),
  {
    width: 230,
    x: 20,
    y: 64,
    height: 40,
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
  },
];

const testID = 'tabbedChip';

const Demo = () => {
  const [value, setValue] = useState<TabbedChipsBaseProps['value']>(sampleTabs[0].id);
  return (
    <DefaultThemeProvider>
      <TabbedChips onChange={setValue} tabs={sampleTabs} testID={testID} value={value} />
    </DefaultThemeProvider>
  );
};

describe('TabbedChips', () => {
  beforeEach(() => {
    mockUseMeasure(mockDimensions);
  });

  it('passes a11y', async () => {
    expect(await renderA11y(<Demo />)).toHaveNoViolations();
  });

  it('renders a custom tab label with injected testID', () => {
    render(<Demo />);
    expect(screen.getByTestId(sampleTabs[5].id)).toBeDefined();
  });
});
