import { Animated } from 'react-native';
import { render, screen } from '@testing-library/react-native';

import { DefaultThemeProvider } from '../../../utils/testHelpers';
import { Overlay } from '../Overlay';
import { useOverlayAnimation } from '../useOverlayAnimation';

describe('Overlay', () => {
  const TestComponent = () => {
    const [opacity] = useOverlayAnimation();
    return <Overlay opacity={opacity} testID="mock-overlay" />;
  };

  it('passes a11y', () => {
    render(
      <DefaultThemeProvider>
        <TestComponent />
      </DefaultThemeProvider>,
    );
    expect(screen.getByTestId('mock-overlay')).toBeAccessible();
  });

  it('renders an animated view', () => {
    render(
      <DefaultThemeProvider>
        <TestComponent />
      </DefaultThemeProvider>,
    );

    expect(screen.UNSAFE_queryAllByType(Animated.View)).toHaveLength(1);
  });
});
