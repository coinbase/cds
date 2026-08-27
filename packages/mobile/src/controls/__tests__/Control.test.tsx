import { render, screen } from '@testing-library/react-native';
import { View } from 'react-native';

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
