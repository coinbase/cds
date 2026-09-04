import { render, screen } from '@testing-library/react-native';

import { DefaultThemeProvider } from '../../utils/testHelpers';
import { InputIcon } from '../InputIcon';

const INPUTICON_TEST_ID = 'input-icon';

describe('InputIcon', () => {
  it('passes a11y', () => {
    render(
      <DefaultThemeProvider>
        <InputIcon active color="fg" name="add" testID={INPUTICON_TEST_ID} />
      </DefaultThemeProvider>,
    );
    expect(screen.getByTestId(INPUTICON_TEST_ID)).toBeAccessible();
  });

  it('renders an InputIcon', () => {
    render(
      <DefaultThemeProvider>
        <InputIcon active color="fg" name="add" testID={INPUTICON_TEST_ID} />
      </DefaultThemeProvider>,
    );
    expect(screen.getByTestId(INPUTICON_TEST_ID)).toBeTruthy();
  });
});
