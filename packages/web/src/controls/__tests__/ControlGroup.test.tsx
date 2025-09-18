import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import { Text } from '../../typography/Text';
import { DefaultThemeProvider } from '../../utils/test';
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
    expect(screen.getByText('My Control Group')).toBeInTheDocument();
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

    const radioTwo = screen.getByLabelText('Option Two');
    fireEvent.click(radioTwo);

    expect(handleChange).toHaveBeenCalledTimes(1);
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

    const checkboxTwo = screen.getByLabelText('Option Two');
    fireEvent.click(checkboxTwo);
    expect(handleChange).toHaveBeenCalledTimes(1);
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
    expect(screen.getByLabelText('Option One')).toBeInTheDocument();
    expect(screen.getByLabelText('Option Two')).toBeInTheDocument();
  });
});
