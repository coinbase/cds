import type { InputVariant } from '@coinbase/cds-common';
import { fireEvent, render, screen } from '@testing-library/react';

import { DefaultThemeProvider } from '../../utils/test';
import { InputIconButton, variantTransformMap } from '../InputIconButton';
import { TextInput } from '../TextInput';

describe('Test InputIconButton inheritFocusedVariant interaction', () => {
  Object.entries(variantTransformMap).map(([variant, focusedColor]) => {
    return it(`${variant} TextInput will set icon to ${focusedColor} when focused`, () => {
      render(
        <DefaultThemeProvider>
          <TextInput
            key={`${variant}-inputicon`}
            label="Label"
            start={<InputIconButton active name="add" testID="input-icon" />}
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

describe('InputIconButton', () => {
  it(`Uses context variant over its own variant when disableInheritFocusStyle is false`, () => {
    render(
      <DefaultThemeProvider>
        <TextInput
          label="Label"
          start={<InputIconButton active name="add" testID="input-icon" variant="secondary" />}
          testID="text-input"
          variant="foregroundMuted"
        />
      </DefaultThemeProvider>,
    );

    fireEvent.click(screen.getByRole('textbox'));

    expect(screen.getByTestId('icon-base-glyph')).toHaveStyle(`color: var(--secondary)`);
  });
});
