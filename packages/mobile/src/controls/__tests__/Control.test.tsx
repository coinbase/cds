import { render, screen } from '@testing-library/react-native';
import { View } from 'react-native';

import { defaultTheme } from '../../themes/defaultTheme';
import { DefaultThemeProvider } from '../../utils/testHelpers';
import { Text } from '../../typography/Text';
import { Control } from '../Control';

const MockControlIcon = () => <View testID="control-icon" />;

describe('Control', () => {
  it('renders a string label in Text', () => {
    render(
      <DefaultThemeProvider>
        <Control label="test label" testID="test-control">
          {MockControlIcon}
        </Control>
      </DefaultThemeProvider>,
    );

    expect(screen.getByText('test label')).toBeTruthy();
    expect(screen.getByTestId('test-controlLabel')).toBeTruthy();
  });

  it('applies the font prop to string labels', () => {
    render(
      <DefaultThemeProvider>
        <Control font="label2" label="test label" testID="test-control">
          {MockControlIcon}
        </Control>
      </DefaultThemeProvider>,
    );

    expect(screen.getByTestId('test-controlLabel')).toHaveStyle({
      fontSize: defaultTheme.fontSize.label2,
      fontWeight: defaultTheme.fontWeight.label2,
    });
  });

  it('renders a ReactNode label without wrapping it in Text', () => {
    render(
      <DefaultThemeProvider>
        <Control
          label={
            <View testID="custom-label">
              <Text>custom label</Text>
            </View>
          }
          testID="test-control"
        >
          {MockControlIcon}
        </Control>
      </DefaultThemeProvider>,
    );

    expect(screen.getByTestId('custom-label')).toBeTruthy();
    expect(screen.getByText('custom label')).toBeTruthy();
    expect(screen.queryByTestId('test-controlLabel')).toBeNull();
  });
});
