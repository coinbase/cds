import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { DefaultThemeProvider } from '../../utils/test';
import type { InputStackProps } from '../InputStack';
import { InputStack } from '../InputStack';

const TEST_ID = 'input';
const input = <input required id="name" name="name" type="text" />;

function renderInputStack(props: Partial<InputStackProps> = {}) {
  return render(
    <DefaultThemeProvider>
      <InputStack inputNode={input} testID={TEST_ID} {...props} />
    </DefaultThemeProvider>,
  );
}

function getRoot() {
  return screen.getByTestId(TEST_ID);
}

function getField() {
  return screen.getByTestId('input-interactable-area');
}

describe('InputStack', () => {
  describe('width', () => {
    it.each(['10%', '50%', '100%'] as const)('renders with width="%s"', (width) => {
      renderInputStack({ width });

      expect(getRoot()).toBeInTheDocument();
    });
  });

  describe('height', () => {
    it.each(['10%', '50%', '100%', 56, 40] as const)('renders with height="%s"', (height) => {
      renderInputStack({ height });

      expect(getField()).toBeInTheDocument();
    });
  });

  describe('disabled', () => {
    it('renders without disabled state when disabled=false', () => {
      renderInputStack({ disabled: false });

      expect(getRoot().style.getPropertyValue('--opacity')).toBe('1');
      expect(getField()).not.toHaveAttribute('aria-disabled', 'true');
    });

    it('renders with disabled state when disabled=true', () => {
      renderInputStack({ disabled: true });

      expect(getRoot().style.getPropertyValue('--opacity')).toBe('0.5');
      expect(getField()).toHaveAttribute('aria-disabled', 'true');
    });
  });

  describe('variant', () => {
    it.each([
      ['foreground', 'var(--color-bgInverse)'],
      ['foregroundMuted', 'var(--color-bgLineHeavy)'],
      ['negative', 'var(--color-bgNegative)'],
      ['positive', 'var(--color-bgPositive)'],
      ['primary', 'var(--color-bgPrimary)'],
      ['secondary', 'transparent'],
    ] as const)('applies variant="%s" unfocused border color', (variant, expectedBorderColor) => {
      renderInputStack({ variant });

      expect(getField().style.getPropertyValue('--border-color-unfocused')).toBe(
        expectedBorderColor,
      );
    });
  });

  describe('onFieldPress', () => {
    it('calls onFieldPress when the field chrome is pressed', async () => {
      const onFieldPress = jest.fn();
      const user = userEvent.setup();
      renderInputStack({ onFieldPress, inputNode: <span>value</span> });

      await user.click(getField());

      expect(onFieldPress).toHaveBeenCalledTimes(1);
    });

    it('does not call onFieldPress when disabled', async () => {
      const onFieldPress = jest.fn();
      const user = userEvent.setup();
      renderInputStack({ disabled: true, onFieldPress, inputNode: <span>value</span> });

      await user.click(getField());

      expect(onFieldPress).not.toHaveBeenCalled();
    });

    it('does not call onFieldPress when the label is pressed', async () => {
      const onFieldPress = jest.fn();
      const user = userEvent.setup();
      renderInputStack({
        onFieldPress,
        inputNode: <span>value</span>,
        labelNode: 'Label',
      });

      await user.click(screen.getByText('Label'));

      expect(onFieldPress).not.toHaveBeenCalled();
    });

    it('does not call onFieldPress when the helper text is pressed', async () => {
      const onFieldPress = jest.fn();
      const user = userEvent.setup();
      renderInputStack({
        onFieldPress,
        inputNode: <span>value</span>,
        helperTextNode: <span>Helper</span>,
      });

      await user.click(screen.getByText('Helper'));

      expect(onFieldPress).not.toHaveBeenCalled();
    });
  });
});
