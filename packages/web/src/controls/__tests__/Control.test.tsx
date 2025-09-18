import { fireEvent, render, screen } from '@testing-library/react';

import { DefaultThemeProvider } from '../../utils/test';
import { Control } from '../Control';

describe('Control', () => {
  it('renders label and children', () => {
    render(
      <DefaultThemeProvider>
        <Control readOnly label="test label">
          <div>test children</div>
        </Control>
      </DefaultThemeProvider>,
    );

    expect(screen.getByText('test label')).toBeTruthy();
    expect(screen.getByText('test children')).toBeTruthy();
  });

  it('triggers onChange', () => {
    const onChange = jest.fn();
    render(
      <DefaultThemeProvider>
        <Control label="test label" onChange={onChange} testID="test-control" type="checkbox">
          <div />
        </Control>
      </DefaultThemeProvider>,
    );

    fireEvent.click(screen.getByTestId('test-control'));

    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('logs warning if no ariaLabelledby is provided', () => {
    process.env.NODE_ENV = 'development';

    const onChange = jest.fn();
    // suppress warning
    jest.spyOn(console, 'warn').mockImplementation(() => {});

    render(
      <DefaultThemeProvider>
        {/* @ts-expect-error Test falsy children to trigger console warning */}
        <Control label="test label" onChange={onChange} type="checkbox" />
      </DefaultThemeProvider>,
    );

    expect(console.warn).toHaveBeenCalledTimes(1);
    process.env.NODE_ENV = 'test';
  });
});
