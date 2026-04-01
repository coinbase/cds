import type { ChartTimeseries } from '@coinbase/cds-common';
import { render } from '@testing-library/react-native';

import { DefaultThemeProvider } from '../../../../utils/testHelpers';
import { SparklineInteractiveTimeseriesPaths } from '../SparklineInteractiveTimeseriesPaths';

describe('SparklineInteractiveTimeseriesPaths.test', () => {
  it('renders', () => {
    const onRender = jest.fn();

    const data: ChartTimeseries[] = [
      {
        points: [{ value: 48994.25, date: new Date() }],
        id: '1',
        strokeColor: 'red',
      },
    ];

    render(
      <DefaultThemeProvider>
        <SparklineInteractiveTimeseriesPaths
          data={data}
          height={100}
          initialPath=""
          onRender={onRender}
          width={300}
        />
      </DefaultThemeProvider>,
    );

    expect(onRender).toHaveBeenCalledTimes(1);
  });
});
