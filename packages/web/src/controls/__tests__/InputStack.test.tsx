import { render, screen } from '@testing-library/react';

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

describe('InputStack', () => {
  describe('width', () => {
    it.each(['10%', '50%', '100%'] as const)('renders with width="%s"', (width) => {
      renderInputStack({ width });

      const container = screen.getByTestId(TEST_ID);
      expect(container).toBeInTheDocument();
    });
  });

  describe('height', () => {
    it.each(['10%', '50%', '100%', 56, 40] as const)('renders with height="%s"', (height) => {
      renderInputStack({ height });

      const interactable = screen.getByTestId('input-interactable-area');
      expect(interactable).toBeInTheDocument();
    });
  });

  describe('disabled', () => {
    it('renders without disabled state when disabled=false', () => {
      renderInputStack({ disabled: false });

      const interactable = screen.getByTestId('input-interactable-area');
      expect(interactable).not.toHaveAttribute('aria-disabled', 'true');
    });

    it('renders with disabled state when disabled=true', () => {
      renderInputStack({ disabled: true });

      const interactable = screen.getByTestId('input-interactable-area');
      expect(interactable).toHaveAttribute('aria-disabled', 'true');
    });
  });

  describe('variant', () => {
    it.each([
      ['foreground', 'var(--color-bgInverse)'],
      ['foregroundMuted', 'var(--color-bgLineHeavy)'],
      ['negative', 'var(--color-bgNegative)'],
      ['positive', 'var(--color-bgPositive)'],
      ['primary', 'var(--color-bgPrimary)'],
    ] as const)('applies variant="%s" border color styling', (variant, expectedBorderColor) => {
      renderInputStack({ variant });

      const interactable = screen.getByTestId('input-interactable-area');
      // The variant affects the CSS custom property --border-color-unfocused via inline style
      expect(interactable.style.getPropertyValue('--border-color-unfocused')).toBe(
        expectedBorderColor,
      );
    });
  });
});
