import React from 'react';
import { render, screen } from '@testing-library/react-native';

import { DefaultThemeProvider } from '../../utils/testHelpers';
import { Checkbox } from '../Checkbox';
import { CheckboxGroup } from '../CheckboxGroup';

const customStyle = { marginTop: 20, paddingHorizontal: 16 };

describe('CheckboxGroup', () => {
  it('applies custom styles', () => {
    render(
      <DefaultThemeProvider>
        <CheckboxGroup selectedValues={new Set('1')} style={customStyle} testID="test">
          <Checkbox value="1">Option 1</Checkbox>
          <Checkbox value="2">Option 2</Checkbox>
        </CheckboxGroup>
      </DefaultThemeProvider>,
    );

    expect(screen.getByTestId('test')).toHaveStyle(customStyle);
  });
});
