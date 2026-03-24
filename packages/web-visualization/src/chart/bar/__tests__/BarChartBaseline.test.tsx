import { DefaultThemeProvider } from '@coinbase/cds-web/utils/test';
import { render } from '@testing-library/react';

import { CartesianChart } from '../../CartesianChart';
import { BarChart } from '../BarChart';

jest.mock('../BarPlot', () => ({
  BarPlot: () => null,
}));

jest.mock('../../CartesianChart', () => ({
  CartesianChart: jest.fn(({ children }) => children),
}));

describe('BarChart baseline domain defaults', () => {
  const mockedCartesianChart = jest.mocked(CartesianChart);
  const getSingleAxisConfig = <Config,>(axis: Config | Config[] | undefined): Config | undefined =>
    Array.isArray(axis) ? axis[0] : axis;

  beforeEach(() => {
    mockedCartesianChart.mockClear();
  });

  it('extends lower bound to baseline in vertical layout', () => {
    render(
      <DefaultThemeProvider>
        <BarChart
          height={200}
          series={[{ id: 'baseline-series', data: [55, 70, 84] }]}
          yAxis={{ baseline: 30 }}
        />
      </DefaultThemeProvider>,
    );

    const cartesianChartProps = mockedCartesianChart.mock.calls.at(-1)?.[0];
    const yAxisConfig = getSingleAxisConfig(cartesianChartProps?.yAxis);
    const yDomain = yAxisConfig?.domain;
    expect(yAxisConfig?.baseline).toBe(30);
    expect(typeof yDomain).toBe('function');
    if (typeof yDomain !== 'function') throw new Error('Expected y-axis domain function');
    expect(yDomain({ min: 55, max: 84 })).toEqual({ min: 30, max: 84 });
  });

  it('keeps bounds unchanged when baseline is already inside range', () => {
    render(
      <DefaultThemeProvider>
        <BarChart
          height={200}
          series={[{ id: 'baseline-series', data: [20, 42, 55] }]}
          yAxis={{ baseline: 30 }}
        />
      </DefaultThemeProvider>,
    );

    const cartesianChartProps = mockedCartesianChart.mock.calls.at(-1)?.[0];
    const yAxisConfig = getSingleAxisConfig(cartesianChartProps?.yAxis);
    const yDomain = yAxisConfig?.domain;
    expect(yAxisConfig?.baseline).toBe(30);
    expect(typeof yDomain).toBe('function');
    if (typeof yDomain !== 'function') throw new Error('Expected y-axis domain function');
    expect(yDomain({ min: 20, max: 55 })).toEqual({ min: 20, max: 55 });
  });

  it('extends upper bound to baseline when values are below it', () => {
    render(
      <DefaultThemeProvider>
        <BarChart
          height={200}
          series={[{ id: 'baseline-series', data: [-98, -80, -52] }]}
          yAxis={{ baseline: 30 }}
        />
      </DefaultThemeProvider>,
    );

    const cartesianChartProps = mockedCartesianChart.mock.calls.at(-1)?.[0];
    const yAxisConfig = getSingleAxisConfig(cartesianChartProps?.yAxis);
    const yDomain = yAxisConfig?.domain;
    expect(yAxisConfig?.baseline).toBe(30);
    expect(typeof yDomain).toBe('function');
    if (typeof yDomain !== 'function') throw new Error('Expected y-axis domain function');
    expect(yDomain({ min: -98, max: -52 })).toEqual({ min: -98, max: 30 });
  });

  it('extends lower bound to baseline on horizontal value axis', () => {
    render(
      <DefaultThemeProvider>
        <BarChart
          height={200}
          layout="horizontal"
          series={[{ id: 'baseline-series', data: [55, 70, 84] }]}
          xAxis={{ baseline: 30 }}
        />
      </DefaultThemeProvider>,
    );

    const cartesianChartProps = mockedCartesianChart.mock.calls.at(-1)?.[0];
    const xAxisConfig = getSingleAxisConfig(cartesianChartProps?.xAxis);
    const xDomain = xAxisConfig?.domain;
    expect(xAxisConfig?.baseline).toBe(30);
    expect(typeof xDomain).toBe('function');
    if (typeof xDomain !== 'function') throw new Error('Expected x-axis domain function');
    expect(xDomain({ min: 55, max: 84 })).toEqual({ min: 30, max: 84 });
  });

  it('preserves function domains on value axis', () => {
    const customDomain = jest.fn((bounds: { min: number; max: number }) => bounds);

    render(
      <DefaultThemeProvider>
        <BarChart
          height={200}
          layout="horizontal"
          series={[{ id: 'baseline-series', data: [55, 70, 84] }]}
          xAxis={{ baseline: 30, domain: customDomain }}
        />
      </DefaultThemeProvider>,
    );

    const cartesianChartProps = mockedCartesianChart.mock.calls.at(-1)?.[0];
    expect(cartesianChartProps?.xAxis).toEqual(
      expect.objectContaining({
        domain: customDomain,
      }),
    );
  });
});
