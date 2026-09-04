import { Animated } from 'react-native';
import { render, screen } from '@testing-library/react-native';

import { DefaultThemeProvider } from '../../utils/testHelpers';
import { ProgressIndicator } from '../ProgressIndicator';

describe('ProgressIndicator.test', () => {
  it('passes a11y', () => {
    const progress = new Animated.Value(0.2);

    render(
      <DefaultThemeProvider>
        <ProgressIndicator progress={progress} testID="mock-progress-indicator" />
      </DefaultThemeProvider>,
    );

    expect(screen.getByTestId('mock-progress-indicator')).toBeAccessible();
  });

  it('renders with progress', () => {
    const progress = new Animated.Value(0.2);

    render(
      <DefaultThemeProvider>
        <ProgressIndicator progress={progress} testID="test-progress-indicator" />
      </DefaultThemeProvider>,
    );

    expect(screen.getByTestId('test-progress-indicator')).toBeTruthy();
  });
});
