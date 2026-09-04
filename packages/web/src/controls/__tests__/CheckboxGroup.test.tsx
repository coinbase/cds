import { fireEvent, render, screen } from '@testing-library/react';

import { DefaultThemeProvider } from '../../utils/test';
import { Checkbox } from '../Checkbox';
import { CheckboxGroup } from '../CheckboxGroup';

const testStyle = { display: 'grid', gap: '16px' };
const testClass = 'test-class';
const testLabel = 'test label';

describe('CheckboxGroup.test', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('triggers onChange', () => {
    // Suppress deprecation warning for this test
    jest.spyOn(console, 'warn').mockImplementation(() => {});
    const onChange = jest.fn();

    render(
      <DefaultThemeProvider>
        <CheckboxGroup onChange={onChange} selectedValues={new Set('1')} testID="test-group">
          <Checkbox id="item1" value="1">
            1
          </Checkbox>
          <Checkbox id="item2" value="2">
            2
          </Checkbox>
        </CheckboxGroup>
      </DefaultThemeProvider>,
    );

    fireEvent.click(screen.getByTestId('test-group-1'));
    expect(onChange).toHaveBeenCalledTimes(1);

    fireEvent.click(screen.getByTestId('test-group-1'));
    expect(onChange).toHaveBeenCalledTimes(2);
  });

  it('logs deprecation warning', () => {
    process.env.NODE_ENV = 'development';

    const onChange = jest.fn();
    const consoleSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});

    render(
      <DefaultThemeProvider>
        <CheckboxGroup label="test label" onChange={onChange} selectedValues={new Set('1')}>
          <Checkbox value="1">1</Checkbox>
          <Checkbox value="2">2</Checkbox>
        </CheckboxGroup>
      </DefaultThemeProvider>,
    );

    expect(consoleSpy).toHaveBeenCalledWith(
      'CheckboxGroup is deprecated. Use ControlGroup with role="group" instead.',
    );
    process.env.NODE_ENV = 'test';
  });

  it('logs warning if no ariaLabelledby is provided', () => {
    process.env.NODE_ENV = 'development';

    const onChange = jest.fn();
    const consoleSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});

    render(
      <DefaultThemeProvider>
        <CheckboxGroup onChange={onChange} selectedValues={new Set('1')}>
          <Checkbox value="1">1</Checkbox>
          <Checkbox value="2">2</Checkbox>
        </CheckboxGroup>
      </DefaultThemeProvider>,
    );

    expect(consoleSpy).toHaveBeenCalledWith(
      'CheckboxGroup is deprecated. Use ControlGroup with role="group" instead.',
    );
    expect(consoleSpy).toHaveBeenCalledWith('Please specify an aria label for the checkbox group.');
    expect(consoleSpy).toHaveBeenCalledWith(
      'Please specify a label or aria-labelledby for the ControlGroup.',
    );
    expect(consoleSpy).toHaveBeenCalledTimes(3);
    process.env.NODE_ENV = 'test';
  });

  it('logs warning if checkbox has no value', () => {
    process.env.NODE_ENV = 'development';

    const onChange = jest.fn();
    // Suppress warnings
    jest.spyOn(console, 'warn').mockImplementation(() => {});
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <DefaultThemeProvider>
        <CheckboxGroup label="test label" onChange={onChange} selectedValues={new Set('1')}>
          <Checkbox>1</Checkbox>
          <Checkbox value="2">2</Checkbox>
        </CheckboxGroup>
      </DefaultThemeProvider>,
    );

    expect(errorSpy).toHaveBeenCalledWith('Checkboxes inside CheckboxGroup should have values.');
    process.env.NODE_ENV = 'test';
  });

  it('applies className to container', () => {
    // Suppress deprecation warning for this test
    jest.spyOn(console, 'warn').mockImplementation(() => {});

    render(
      <DefaultThemeProvider>
        <CheckboxGroup
          className={testClass}
          label={testLabel}
          onChange={jest.fn()}
          selectedValues={new Set('1')}
        >
          <Checkbox value="1">1</Checkbox>
          <Checkbox value="2">2</Checkbox>
        </CheckboxGroup>
      </DefaultThemeProvider>,
    );

    // The className is now applied to the container div, not the label
    expect(screen.getByRole('group')).toHaveClass(testClass);
  });

  it('applies style to container', () => {
    // Suppress deprecation warning for this test
    jest.spyOn(console, 'warn').mockImplementation(() => {});

    render(
      <DefaultThemeProvider>
        <CheckboxGroup
          label={testLabel}
          onChange={jest.fn()}
          selectedValues={new Set('1')}
          style={testStyle}
        >
          <Checkbox value="1">1</Checkbox>
          <Checkbox value="2">2</Checkbox>
        </CheckboxGroup>
      </DefaultThemeProvider>,
    );

    // The style is now applied to the container div, not the label
    expect(screen.getByRole('group')).toHaveStyle(testStyle);
  });
});
