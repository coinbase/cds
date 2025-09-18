import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react-native';

import { Text } from '../../typography/Text';
import { DefaultThemeProvider } from '../../utils/testHelpers';
import { CheckboxCell } from '../CheckboxCell';
import { ControlGroup } from '../ControlGroup';
import { RadioCell } from '../RadioCell';

describe('ControlGroup', () => {
  const radioOptions = [
    { value: 'one', title: 'Option One' },
    { value: 'two', title: 'Option Two' },
  ];

  const checkboxOptions = [
    { value: 'one', title: 'Option One' },
    { value: 'two', title: 'Option Two' },
  ];

  it('renders with a label', () => {
    render(
      <DefaultThemeProvider>
        <ControlGroup
          ControlComponent={RadioCell}
          label={<Text>My Control Group</Text>}
          onChange={jest.fn()}
          options={radioOptions}
          value="one"
        />
      </DefaultThemeProvider>,
    );
    expect(screen.getByText('My Control Group')).toBeOnTheScreen();
  });

  it('handles single selection with radio cells', () => {
    const handleChange = jest.fn();
    render(
      <DefaultThemeProvider>
        <ControlGroup
          ControlComponent={RadioCell}
          onChange={handleChange}
          options={radioOptions}
          value="one"
        />
      </DefaultThemeProvider>,
    );

    const radioTwo = screen.getByText('Option Two');
    fireEvent.press(radioTwo);

    expect(handleChange).toHaveBeenCalledWith('two', true);
  });

  it('handles multiple selections with checkbox cells', () => {
    const handleChange = jest.fn();
    render(
      <DefaultThemeProvider>
        <ControlGroup
          ControlComponent={CheckboxCell}
          onChange={handleChange}
          options={checkboxOptions}
          value={['one']}
        />
      </DefaultThemeProvider>,
    );

    const checkboxTwo = screen.getByText('Option Two');
    fireEvent.press(checkboxTwo);
    expect(handleChange).toHaveBeenCalledWith('two', true);

    const checkboxOne = screen.getByText('Option One');
    fireEvent.press(checkboxOne);
    expect(handleChange).toHaveBeenCalledWith('one', false);
  });

  it('renders options correctly', () => {
    render(
      <DefaultThemeProvider>
        <ControlGroup
          ControlComponent={RadioCell}
          onChange={jest.fn()}
          options={radioOptions}
          value="one"
        />
      </DefaultThemeProvider>,
    );
    expect(screen.getByText('Option One')).toBeOnTheScreen();
    expect(screen.getByText('Option Two')).toBeOnTheScreen();
  });
});
