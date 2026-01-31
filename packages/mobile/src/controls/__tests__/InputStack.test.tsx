import { render, screen } from '@testing-library/react-native';

import { DefaultThemeProvider, theme } from '../../utils/testHelpers';
import { InputStack } from '../InputStack';
import { NativeInput } from '../NativeInput';

const TEST_ID = 'input';

describe('styles', () => {
  it('renders a custom borderStyle', async () => {
    const borderStyle = {
      borderRadius: 8,
      borderWidth: 1,
    };

    render(
      <DefaultThemeProvider>
        <InputStack borderStyle={borderStyle} inputNode={<NativeInput />} testID={TEST_ID} />
      </DefaultThemeProvider>,
    );

    await screen.findByTestId(`${TEST_ID}-input-area`);

    expect(screen.getByTestId(`${TEST_ID}-input-area`)).toHaveStyle(borderStyle);
  });

  it('uses bgLineHeavy border color for default foregroundMuted variant', async () => {
    render(
      <DefaultThemeProvider>
        <InputStack inputNode={<NativeInput />} testID={TEST_ID} variant="foregroundMuted" />
      </DefaultThemeProvider>,
    );

    await screen.findByTestId(`${TEST_ID}-input-area`);

    expect(screen.getByTestId(`${TEST_ID}-input-area`)).toHaveStyle({
      borderColor: theme.lightColor.bgLineHeavy,
    });
  });
});
