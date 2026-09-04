import type { InputVariant } from '@coinbase/cds-common';
import { fireEvent, render, screen } from '@testing-library/react';

import { DefaultThemeProvider } from '../../utils/test';
import { InputIcon, variantColorMap } from '../InputIcon';
import { TextInput } from '../TextInput';

describe('Test InputIcon inheritFocusedVariant interaction', () => {
  Object.entries(variantColorMap).map(([variant, focusedColor]) => {
    return it(`${variant} TextInput will set icon to ${focusedColor} when focused`, () => {
      render(
        <DefaultThemeProvider>
          <TextInput
            key={`${variant}-inputicon`}
            label="Label"
            start={<InputIcon active name="add" testID="input-icon" />}
            testID="text-input"
            variant={variant as InputVariant}
          />
        </DefaultThemeProvider>,
      );

      fireEvent.click(screen.getByRole('textbox'));

      expect(screen.getByTestId('icon-base-glyph')).toHaveStyle(`color: var(--${focusedColor})`);
    });
  });
});

describe('InputIcon', () => {
  it(`Can override focused color provided by context.`, () => {
    const variant = 'fg';

    render(
      <DefaultThemeProvider>
        <TextInput
          key={`${variant}-inputicon`}
          label="Label"
          start={<InputIcon active color={variant} name="add" testID="input-icon" />}
          testID="text-input"
          variant={variant as InputVariant}
        />
      </DefaultThemeProvider>,
    );

    fireEvent.click(screen.getByRole('textbox'));

    expect(screen.getByTestId('icon-base-glyph')).toHaveStyle(`color: var(--${variant})`);
  });
});
