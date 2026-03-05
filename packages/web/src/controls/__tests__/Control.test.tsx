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

  it('keeps a stable root wrapper regardless of label presence', () => {
    const { rerender } = render(
      <DefaultThemeProvider>
        <Control aria-label="control" type="checkbox">
          <div>test children</div>
        </Control>
      </DefaultThemeProvider>,
    );

    expect(screen.getByRole('checkbox').closest('.cds-Control')).toBeTruthy();

    rerender(
      <DefaultThemeProvider>
        <Control aria-label="control" label="test label" type="checkbox">
          <div>test children</div>
        </Control>
      </DefaultThemeProvider>,
    );

    expect(screen.getByRole('checkbox').closest('.cds-Control')).toBeTruthy();
  });

  it('applies classNames/styles to root and slots', () => {
    render(
      <DefaultThemeProvider>
        <Control
          aria-label="control"
          classNames={{
            icon: 'test-control-icon',
            input: 'test-control-input',
            root: 'test-control-root',
          }}
          styles={{ root: { borderTopWidth: 3 } }}
          type="checkbox"
        >
          <div>test children</div>
        </Control>
      </DefaultThemeProvider>,
    );

    expect(screen.getByRole('checkbox').closest('.test-control-root')).toBeTruthy();
    expect(screen.getByRole('checkbox').closest('.cds-Control')).toBeTruthy();
    expect(screen.getByRole('checkbox').className).toContain('test-control-input');
    expect(screen.getByRole('checkbox').className).toContain('cds-Control-input');
    expect(screen.getByText('test children').parentElement?.className).toContain(
      'test-control-icon',
    );
    expect(screen.getByText('test children').parentElement?.className).toContain(
      'cds-Control-icon',
    );
  });
});
