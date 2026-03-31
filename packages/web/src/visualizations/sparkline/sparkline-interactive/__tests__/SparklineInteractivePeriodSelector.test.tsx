import { DefaultThemeProvider } from '@coinbase/cds-web/utils/test';
import { fireEvent, render, screen } from '@testing-library/react';

import { SparklineInteractivePeriodSelector } from '../SparklineInteractivePeriodSelector';

const periods = [
  {
    label: '1H',
    value: '1h',
  },
  {
    label: '1D',
    value: '1d',
  },
  {
    label: '1W',
    value: '1w',
  },
];

const setSelectedPeriodSpy = jest.fn();

const SparklineInteractivePeriodSelectorExample = () => {
  return (
    <DefaultThemeProvider>
      <SparklineInteractivePeriodSelector
        color="blue"
        periods={periods}
        selectedPeriod="1d"
        setSelectedPeriod={setSelectedPeriodSpy}
      />
    </DefaultThemeProvider>
  );
};

describe('SparklineInteractivePeriodSelector', () => {
  afterEach(() => {
    setSelectedPeriodSpy.mockClear();
  });

  it('renders period buttons', () => {
    render(<SparklineInteractivePeriodSelectorExample />);

    expect(screen.getAllByRole('button')).toHaveLength(periods.length);
    expect(screen.getByText('1H')).toBeTruthy();
    expect(screen.getByText('1D')).toBeTruthy();
    expect(screen.getByText('1D')).toBeTruthy();
  });

  it('calls setSelectedPeriod when period button is pressed', () => {
    render(<SparklineInteractivePeriodSelectorExample />);

    fireEvent.click(screen.getAllByRole('button')[0]);

    expect(setSelectedPeriodSpy).toHaveBeenCalledTimes(1);
  });
});
