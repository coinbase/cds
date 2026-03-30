import { glyphMap } from '@coinbase/cds-icons/glyphMap';
import { render, screen } from '@testing-library/react';

import { DefaultThemeProvider } from '../../utils/test';
import { Checkbox } from '../Checkbox';

describe('Checkbox', () => {
  const mockOnChange = jest.fn();
  it('renders a check icon when checked', () => {
    render(
      <DefaultThemeProvider>
        <Checkbox checked onChange={mockOnChange}>
          Checked
        </Checkbox>
      </DefaultThemeProvider>,
    );

    const icon = screen.getByText(glyphMap['checkmark-16-inactive']);
    expect(icon).toBeTruthy();
  });

  it('renders a minus icon when indeterminate', () => {
    render(
      <DefaultThemeProvider>
        <Checkbox indeterminate onChange={mockOnChange}>
          Indeterminate
        </Checkbox>
      </DefaultThemeProvider>,
    );

    const icon = screen.getByText(glyphMap['minus-16-inactive']);
    expect(icon).toBeTruthy();
  });

  it('has default color when unchecked', () => {
    render(
      <DefaultThemeProvider>
        <Checkbox onChange={mockOnChange} testID="test-checkbox">
          Unchecked
        </Checkbox>
      </DefaultThemeProvider>,
    );

    const outline = screen.getByTestId('checkbox-outer');

    expect(outline.className).toContain('bg');
  });

  it('has default color when checked', () => {
    render(
      <DefaultThemeProvider>
        <Checkbox checked onChange={mockOnChange} testID="test-checkbox">
          Checked
        </Checkbox>
      </DefaultThemeProvider>,
    );

    const outline = screen.getByTestId('checkbox-outer');

    expect(outline.className).toContain('bgPrimary');
  });

  it('applies custom controlColor prop when checked', () => {
    render(
      <DefaultThemeProvider>
        <Checkbox checked controlColor="bgPositive" onChange={mockOnChange} testID="test-checkbox">
          Checked
        </Checkbox>
      </DefaultThemeProvider>,
    );

    const icon = screen.getByTestId('checkbox-icon');

    expect(icon.className).toContain('bgPositive');
  });

  it('applies custom controlColor prop when indeterminate', () => {
    render(
      <DefaultThemeProvider>
        <Checkbox
          indeterminate
          controlColor="bgNegative"
          onChange={mockOnChange}
          testID="test-checkbox"
        >
          Indeterminate
        </Checkbox>
      </DefaultThemeProvider>,
    );

    const icon = screen.getByTestId('checkbox-icon');

    expect(icon.className).toContain('bgNegative');
  });

  it('applies controlSize to checkbox container', () => {
    render(
      <DefaultThemeProvider>
        <Checkbox checked controlSize={60} onChange={mockOnChange}>
          Checked
        </Checkbox>
      </DefaultThemeProvider>,
    );

    const outline = screen.getByTestId('checkbox-outer');

    expect(outline).toHaveStyle({
      width: '60px',
      height: '60px',
    });
  });

  it('uses bg color when unchecked regardless of controlColor prop', () => {
    render(
      <DefaultThemeProvider>
        <Checkbox controlColor="bgPositive" onChange={mockOnChange} testID="test-checkbox">
          Unchecked
        </Checkbox>
      </DefaultThemeProvider>,
    );

    const outline = screen.getByTestId('checkbox-outer');

    expect(outline.className).toContain('bg');
  });
});
