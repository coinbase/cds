import { render, screen } from '@testing-library/react-native';

import { DefaultThemeProvider } from '../../utils/testHelpers';
import { InputIconButton } from '../InputIconButton';

const INPUTICONBUTTON_TEST_ID = 'input-iconbutton';

describe('InputIconButton', () => {
  it('passes a11y', () => {
    render(
      <DefaultThemeProvider>
        <InputIconButton
          active
          name="add"
          testID={INPUTICONBUTTON_TEST_ID}
          variant="foregroundMuted"
        />
      </DefaultThemeProvider>,
    );
    expect(screen.getByTestId(INPUTICONBUTTON_TEST_ID)).toBeAccessible();
  });

  it('renders an InputIconButton', () => {
    render(
      <DefaultThemeProvider>
        <InputIconButton
          active
          name="add"
          testID={INPUTICONBUTTON_TEST_ID}
          variant="foregroundMuted"
        />
      </DefaultThemeProvider>,
    );
    expect(screen.getByTestId(INPUTICONBUTTON_TEST_ID)).toBeTruthy();
  });
});
