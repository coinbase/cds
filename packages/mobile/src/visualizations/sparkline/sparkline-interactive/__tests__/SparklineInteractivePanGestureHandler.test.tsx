import { Text } from 'react-native';
import { render, screen } from '@testing-library/react-native';

import { DefaultThemeProvider } from '../../../../utils/testHelpers';
import { SparklineInteractivePanGestureHandler } from '../SparklineInteractivePanGestureHandler';

describe('SparklineInteractivePanGestureHandler.test', () => {
  it('renders children', () => {
    render(
      <DefaultThemeProvider>
        <SparklineInteractivePanGestureHandler getMarker={jest.fn()} selectedPeriod="1D">
          <Text>test</Text>
        </SparklineInteractivePanGestureHandler>
      </DefaultThemeProvider>,
    );

    expect(screen.getByText('test')).toBeTruthy();
  });

  it('renders disabled', () => {
    render(
      <DefaultThemeProvider>
        <SparklineInteractivePanGestureHandler disabled getMarker={jest.fn()} selectedPeriod="1D">
          <Text>test</Text>
        </SparklineInteractivePanGestureHandler>
      </DefaultThemeProvider>,
    );

    expect(screen.getByText('test')).toBeTruthy();
  });
});
