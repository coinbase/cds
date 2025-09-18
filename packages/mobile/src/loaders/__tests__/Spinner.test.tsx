import { render, screen } from '@testing-library/react-native';

import { DefaultThemeProvider } from '../../utils/testHelpers';
import { Spinner } from '../Spinner';

describe('Spinner', () => {
  it('passes a11y', () => {
    render(
      <DefaultThemeProvider>
        <Spinner testID="mock-spinner" />
      </DefaultThemeProvider>,
    );
    expect(screen.getByTestId('mock-spinner')).toBeAccessible();
  });
});
