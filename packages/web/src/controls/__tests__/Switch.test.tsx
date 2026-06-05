import { useState } from 'react';
import { renderA11y } from '@coinbase/cds-web-utils';
import { fireEvent, render, screen } from '@testing-library/react';

import { DefaultThemeProvider } from '../../utils/test';
import { Switch } from '../Switch';

describe('Switch.test', () => {
  it('handles input', () => {
    const TestComponent = () => {
      const [checked, setChecked] = useState(false);
      const onChange: React.ChangeEventHandler<HTMLInputElement> = (event) =>
        setChecked(event.target.checked);
      return (
        <DefaultThemeProvider>
          <div>checked is {checked ? 'true' : 'false'}</div>
          <Switch checked={checked} onChange={onChange}>
            test label
          </Switch>
        </DefaultThemeProvider>
      );
    };

    render(<TestComponent />);

    expect(screen.getByText('checked is false')).toBeTruthy();

    fireEvent.click(screen.getByRole('switch'));

    expect(screen.getByText('checked is true')).toBeTruthy();

    fireEvent.click(screen.getByRole('switch'));

    expect(screen.getByText('checked is false')).toBeTruthy();
  });

  it('passes accessibility', async () => {
    expect(
      await renderA11y(
        <DefaultThemeProvider>
          <Switch onChange={jest.fn()}>test label</Switch>
        </DefaultThemeProvider>,
      ),
    ).toHaveNoViolations();
  });

  it('renders label', () => {
    render(
      <DefaultThemeProvider>
        <Switch onChange={jest.fn()}>test label</Switch>
      </DefaultThemeProvider>,
    );

    expect(screen.getByLabelText('test label')).toBeTruthy();
  });

  it('disables user interaction when disabled', () => {
    const onChange = jest.fn();

    render(
      <DefaultThemeProvider>
        <Switch disabled onChange={onChange} />
      </DefaultThemeProvider>,
    );

    // dispatching event doesn't respect disabled inputs
    // so we use click method directly
    screen.getByRole('switch').click();

    expect(onChange).not.toHaveBeenCalled();
  });

  it('sets forwarded ref', () => {
    const ref = { current: null };

    render(
      <DefaultThemeProvider>
        <Switch ref={ref} onChange={jest.fn()} />
      </DefaultThemeProvider>,
    );

    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  it('renders testID', () => {
    render(
      <DefaultThemeProvider>
        <Switch onChange={jest.fn()} testID="test-test-id" />
      </DefaultThemeProvider>,
    );

    expect(screen.getByTestId('test-test-id')).toBeTruthy();
  });

  it('keeps a stable root wrapper regardless of label presence', () => {
    const { rerender } = render(
      <DefaultThemeProvider>
        <Switch onChange={jest.fn()} />
      </DefaultThemeProvider>,
    );

    expect(screen.getByRole('switch').closest('.cds-Switch')).toBeTruthy();

    rerender(
      <DefaultThemeProvider>
        <Switch onChange={jest.fn()}>with label</Switch>
      </DefaultThemeProvider>,
    );

    expect(screen.getByRole('switch').closest('.cds-Switch')).toBeTruthy();
  });

  it('applies classNames/styles to root and slots', () => {
    render(
      <DefaultThemeProvider>
        <Switch
          classNames={{
            control: 'test-switch-control',
            root: 'test-switch-root',
            thumb: 'test-switch-thumb',
            track: 'test-switch-track',
          }}
          onChange={jest.fn()}
          style={{ borderRightWidth: 5 }}
          styles={{ control: { borderLeftWidth: 4 }, root: { borderTopWidth: 2 } }}
        >
          label
        </Switch>
      </DefaultThemeProvider>,
    );

    expect(screen.getByRole('switch').closest('.test-switch-root')).toBeTruthy();
    expect(screen.getByRole('switch').closest('.cds-Switch')).toBeTruthy();
    expect(screen.getByTestId('switch-track').className).toContain('test-switch-track');
    expect(screen.getByTestId('switch-track').className).toContain('cds-Switch-track');
    expect(screen.getByTestId('switch-thumb').className).toContain('test-switch-thumb');
    expect(screen.getByTestId('switch-thumb').className).toContain('cds-Switch-thumb');
    expect(screen.getByRole('switch').closest('.test-switch-control')).toBeTruthy();
    expect(screen.getByRole('switch').closest('.cds-Switch-control')).toBeTruthy();
    expect(screen.getByRole('switch').closest('.cds-Control')).toHaveStyle({
      borderLeftWidth: '4px',
    });
    expect(screen.getByRole('switch').closest('.cds-Control')).toHaveStyle({
      borderRightWidth: '5px',
    });
  });

  it('has default color', () => {
    render(
      <DefaultThemeProvider>
        <Switch onChange={jest.fn()} testID="test-switch" />
      </DefaultThemeProvider>,
    );

    const track = screen.getByTestId('switch-track');

    expect(track.className).toContain('bgTertiary');
  });

  it('has default color when checked', () => {
    render(
      <DefaultThemeProvider>
        <Switch checked onChange={jest.fn()} testID="test-switch" />
      </DefaultThemeProvider>,
    );

    const track = screen.getByTestId('switch-track');

    expect(track.className).toContain('bgPrimary');
  });

  it('applies custom controlColor prop when checked', () => {
    render(
      <DefaultThemeProvider>
        <Switch checked controlColor="bgPositive" onChange={jest.fn()} testID="test-switch" />
      </DefaultThemeProvider>,
    );

    const thumb = screen.getByTestId('switch-thumb');

    expect(thumb.className).toContain('bgPositive');
  });

  it('uses bgTertiary color when unchecked regardless of controlColor prop', () => {
    render(
      <DefaultThemeProvider>
        <Switch controlColor="bgPositive" onChange={jest.fn()} testID="test-switch" />
      </DefaultThemeProvider>,
    );

    const track = screen.getByTestId('switch-track');

    expect(track.className).toContain('bgTertiary');
  });
});
