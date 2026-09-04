import { render, screen } from '@testing-library/react-native';

import { DefaultThemeProvider } from '../../utils/testHelpers';
import { SpotSquare } from '../SpotSquare';

const SPOT_SQUARE_TEST_ID = 'add-spot-square-test';

describe('SpotSquare', () => {
  it('passes a11y', () => {
    render(
      <DefaultThemeProvider>
        <SpotSquare name="gifting" testID={SPOT_SQUARE_TEST_ID} />
      </DefaultThemeProvider>,
    );
    expect(screen.getByTestId(SPOT_SQUARE_TEST_ID)).toBeAccessible();
  });

  it('renders a SpotSquare', () => {
    render(
      <DefaultThemeProvider>
        <SpotSquare name="gifting" testID={SPOT_SQUARE_TEST_ID} />
      </DefaultThemeProvider>,
    );
    expect(screen.getByTestId(SPOT_SQUARE_TEST_ID)).toBeTruthy();
  });

  it('renders a SpotSquare with accessibilityHint and accessibilityLabel', () => {
    render(
      <DefaultThemeProvider>
        <SpotSquare
          accessibilityHint="Accessibility Hint"
          accessibilityLabel="Accessibility Label"
          name="gifting"
          testID={SPOT_SQUARE_TEST_ID}
        />
      </DefaultThemeProvider>,
    );
    expect(screen.getByTestId(SPOT_SQUARE_TEST_ID)).toBeTruthy();

    const spotSquareComponent = screen.getByTestId(SPOT_SQUARE_TEST_ID);

    expect(spotSquareComponent).toHaveProp('accessibilityLabel', 'Accessibility Label');
    expect(spotSquareComponent).toHaveProp('accessibilityHint', 'Accessibility Hint');

    // This should automatically be set always
    expect(screen.getByTestId(SPOT_SQUARE_TEST_ID)).toHaveProp('accessibilityRole', 'image');

    // This should be true if accessibility label is passed
    expect(screen.getByTestId(SPOT_SQUARE_TEST_ID)).toHaveProp('accessible', true);
  });

  it('renders a SpotSquare with accessibilityHint and no accessibilityLabel', () => {
    render(
      <DefaultThemeProvider>
        <SpotSquare
          accessibilityHint="Accessibility Hint"
          name="gifting"
          testID={SPOT_SQUARE_TEST_ID}
        />
      </DefaultThemeProvider>,
    );
    expect(screen.getByTestId(SPOT_SQUARE_TEST_ID)).toBeTruthy();

    const spotSquareComponent = screen.getByTestId(SPOT_SQUARE_TEST_ID);

    expect(spotSquareComponent).toHaveProp('accessibilityLabel', undefined);
    expect(spotSquareComponent).toHaveProp('accessibilityHint', 'Accessibility Hint');

    // This should automatically be set always
    expect(screen.getByTestId(SPOT_SQUARE_TEST_ID)).toHaveProp('accessibilityRole', 'image');

    // This should be false since there's no accessible prop or accessibilityLabel prop
    expect(screen.getByTestId(SPOT_SQUARE_TEST_ID)).toHaveProp('accessible', false);
  });
});
