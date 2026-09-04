import { fireEvent, render, screen } from '@testing-library/react-native';

import { DefaultThemeProvider, theme } from '../../utils/testHelpers';
import { Text } from '../../typography/Text';
import type { InputStackProps } from '../InputStack';
import { InputStack } from '../InputStack';
import { NativeInput } from '../NativeInput';

const TEST_ID = 'input';

function renderInputStack(props: Partial<InputStackProps> = {}) {
  return render(
    <DefaultThemeProvider>
      <InputStack inputNode={<NativeInput />} testID={TEST_ID} {...props} />
    </DefaultThemeProvider>,
  );
}

function getRoot() {
  return screen.getByTestId(TEST_ID);
}

function getField() {
  return screen.getByTestId(`${TEST_ID}-input-area`);
}

describe('InputStack', () => {
  describe('width', () => {
    it.each(['10%', '50%', '100%'] as const)('renders with width="%s"', (width) => {
      renderInputStack({ width });

      expect(getRoot()).toBeTruthy();
    });
  });

  describe('height', () => {
    it.each(['10%', '50%', '100%', 56, 40] as const)('renders with height="%s"', (height) => {
      renderInputStack({ height });

      expect(getField()).toBeTruthy();
    });
  });

  describe('disabled', () => {
    it('renders without disabled state when disabled=false', () => {
      renderInputStack({ disabled: false });

      expect(getRoot()).toHaveStyle({ opacity: 1 });
    });

    it('renders with disabled state when disabled=true', () => {
      renderInputStack({ disabled: true });

      expect(getRoot()).toHaveStyle({ opacity: 0.5 });
    });
  });

  describe('variant', () => {
    it.each([
      ['foreground', theme.lightColor.fg],
      ['foregroundMuted', theme.lightColor.bgLineHeavy],
      ['negative', theme.lightColor.fgNegative],
      ['positive', theme.lightColor.fgPositive],
      ['primary', theme.lightColor.fgPrimary],
      ['secondary', 'transparent'],
    ] as const)('applies variant="%s" unfocused border color', (variant, expectedBorderColor) => {
      renderInputStack({ variant });

      expect(getField()).toHaveStyle({ borderColor: expectedBorderColor });
    });
  });

  describe('onFieldPress', () => {
    it('calls onFieldPress when the field chrome is pressed', () => {
      const onFieldPress = jest.fn();
      renderInputStack({ onFieldPress, inputNode: <Text>value</Text> });

      fireEvent.press(getField());

      expect(onFieldPress).toHaveBeenCalledTimes(1);
    });

    it('does not call onFieldPress when disabled', () => {
      const onFieldPress = jest.fn();
      renderInputStack({ disabled: true, onFieldPress, inputNode: <Text>value</Text> });

      fireEvent.press(getField());

      expect(onFieldPress).not.toHaveBeenCalled();
    });

    it('does not call onFieldPress when the label is pressed', () => {
      const onFieldPress = jest.fn();
      renderInputStack({
        onFieldPress,
        inputNode: <Text>value</Text>,
        labelNode: <Text>Label</Text>,
      });

      fireEvent.press(screen.getByText('Label'));

      expect(onFieldPress).not.toHaveBeenCalled();
    });

    it('does not call onFieldPress when the helper text is pressed', () => {
      const onFieldPress = jest.fn();
      renderInputStack({
        onFieldPress,
        inputNode: <Text>value</Text>,
        helperTextNode: <Text>Helper</Text>,
      });

      fireEvent.press(screen.getByText('Helper'));

      expect(onFieldPress).not.toHaveBeenCalled();
    });
  });

  // Mobile-only: animated border styles are passed in by consumers (useInputBorderStyle).
  describe('borderStyle', () => {
    it('renders a custom borderStyle', () => {
      const borderStyle = {
        borderRadius: 8,
        borderWidth: 1,
      };

      renderInputStack({ borderStyle });

      expect(getField()).toHaveStyle(borderStyle);
    });
  });
});
