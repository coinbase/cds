import { render, screen } from '@testing-library/react-native';

import { DefaultThemeProvider } from '../../utils/testHelpers';
import { SpotRectangle } from '../SpotRectangle';

const SPOT_RECTANGLE_TEST_ID = 'add-spot-rectangle-test';

describe('SpotRectangle', () => {
  it('passes a11y', () => {
    render(
      <DefaultThemeProvider>
        <SpotRectangle name="creditCardExcitement" testID={SPOT_RECTANGLE_TEST_ID} />
      </DefaultThemeProvider>,
    );
    expect(screen.getByTestId(SPOT_RECTANGLE_TEST_ID)).toBeAccessible();
  });

  it('renders a SpotRectangle', () => {
    render(
      <DefaultThemeProvider>
        <SpotRectangle name="creditCardExcitement" testID={SPOT_RECTANGLE_TEST_ID} />
      </DefaultThemeProvider>,
    );
    expect(screen.getByTestId(SPOT_RECTANGLE_TEST_ID)).toBeTruthy();
  });

  it('renders a SpotRectangle with accessibilityHint and accessibilityLabel', () => {
    render(
      <DefaultThemeProvider>
        <SpotRectangle
          accessibilityHint="Accessibility Hint"
          accessibilityLabel="Accessibility Label"
          name="creditCardExcitement"
          testID={SPOT_RECTANGLE_TEST_ID}
        />
      </DefaultThemeProvider>,
    );
    expect(screen.getByTestId(SPOT_RECTANGLE_TEST_ID)).toBeTruthy();
    expect(screen.getByTestId(SPOT_RECTANGLE_TEST_ID)).toHaveProp(
      'accessibilityLabel',
      'Accessibility Label',
    );
    expect(screen.getByTestId(SPOT_RECTANGLE_TEST_ID)).toHaveProp(
      'accessibilityHint',
      'Accessibility Hint',
    );
    // This should automatically be set always
    expect(screen.getByTestId(SPOT_RECTANGLE_TEST_ID)).toHaveProp('accessibilityRole', 'image');

    // This should be true if accessibility label is passed
    expect(screen.getByTestId(SPOT_RECTANGLE_TEST_ID)).toHaveProp('accessible', true);
  });

  it('renders a SpotRectangle with accessibilityHint and no accessibilityLabel', () => {
    render(
      <DefaultThemeProvider>
        <SpotRectangle
          accessibilityHint="Accessibility Hint"
          name="creditCardExcitement"
          testID={SPOT_RECTANGLE_TEST_ID}
        />
      </DefaultThemeProvider>,
    );
    expect(screen.getByTestId(SPOT_RECTANGLE_TEST_ID)).toBeTruthy();

    const SpotRectangleComponent = screen.getByTestId(SPOT_RECTANGLE_TEST_ID);

    expect(SpotRectangleComponent).toHaveProp('accessibilityLabel', undefined);
    expect(SpotRectangleComponent).toHaveProp('accessibilityHint', 'Accessibility Hint');

    // This should automatically be set always
    expect(screen.getByTestId(SPOT_RECTANGLE_TEST_ID)).toHaveProp('accessibilityRole', 'image');

    // This should be false since there's no accessible prop or accessibilityLabel prop
    expect(screen.getByTestId(SPOT_RECTANGLE_TEST_ID)).toHaveProp('accessible', false);
  });
});
