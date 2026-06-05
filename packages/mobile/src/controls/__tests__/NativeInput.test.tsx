import { render, screen } from '@testing-library/react-native';

import { defaultTheme } from '../../themes/defaultTheme';
import { DefaultThemeProvider } from '../../utils/testHelpers';
import { NativeInput } from '../NativeInput';

const TEST_ID = 'native-input';

describe('NativeInput', () => {
  it('uses fgPrimary for selection color', () => {
    render(
      <DefaultThemeProvider>
        <NativeInput accessibilityLabel="Field" testID={TEST_ID} />
      </DefaultThemeProvider>,
    );

    expect(screen.getByTestId(TEST_ID).props.selectionColor).toBe(
      defaultTheme.lightColor.fgPrimary,
    );
  });

  it('allows selection color override from props', () => {
    render(
      <DefaultThemeProvider>
        <NativeInput accessibilityLabel="Field" selectionColor="fgNegative" testID={TEST_ID} />
      </DefaultThemeProvider>,
    );

    expect(screen.getByTestId(TEST_ID).props.selectionColor).toBe(
      defaultTheme.lightColor.fgNegative,
    );
  });
});
