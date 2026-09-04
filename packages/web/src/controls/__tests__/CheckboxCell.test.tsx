import { renderA11y } from '@coinbase/cds-web-utils/jest';
import { fireEvent, render, screen } from '@testing-library/react';

import { Text } from '../../typography/Text';
import { DefaultThemeProvider } from '../../utils/test';
import { CheckboxCell } from '../CheckboxCell';

const onChange = jest.fn();

describe('CheckboxCell', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders title and description', () => {
    render(
      <DefaultThemeProvider>
        <CheckboxCell
          description="Choose this option for better results"
          onChange={onChange}
          title="Enable feature"
          value="feature"
        />
      </DefaultThemeProvider>,
    );

    expect(screen.getByText('Enable feature')).toBeInTheDocument();
    expect(screen.getByText('Choose this option for better results')).toBeInTheDocument();
  });

  it('renders ReactNode title and description', () => {
    render(
      <DefaultThemeProvider>
        <CheckboxCell
          description={<Text font="body">Custom description</Text>}
          onChange={onChange}
          title={<Text font="headline">Custom title</Text>}
          value="custom"
        />
      </DefaultThemeProvider>,
    );

    expect(screen.getByText('Custom title')).toBeInTheDocument();
    expect(screen.getByText('Custom description')).toBeInTheDocument();
  });

  it('shows checked state correctly', () => {
    render(
      <DefaultThemeProvider>
        <CheckboxCell checked onChange={onChange} title="Checked option" value="checked" />
      </DefaultThemeProvider>,
    );

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeChecked();
  });

  it('shows unchecked state correctly', () => {
    render(
      <DefaultThemeProvider>
        <CheckboxCell
          checked={false}
          onChange={onChange}
          title="Unchecked option"
          value="unchecked"
        />
      </DefaultThemeProvider>,
    );

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();
  });

  it('triggers onChange when clicked', () => {
    render(
      <DefaultThemeProvider>
        <CheckboxCell
          onChange={onChange}
          testID="checkbox-cell"
          title="Clickable option"
          value="clickable"
        />
      </DefaultThemeProvider>,
    );

    const container = screen.getByTestId('checkbox-cell');
    fireEvent.click(container);

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({
        target: expect.objectContaining({
          value: 'clickable',
        }),
      }),
    );
  });

  it('triggers onChange when checkbox is clicked', () => {
    render(
      <DefaultThemeProvider>
        <CheckboxCell onChange={onChange} title="Checkbox clickable" value="checkbox-click" />
      </DefaultThemeProvider>,
    );

    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({
        target: expect.objectContaining({
          value: 'checkbox-click',
        }),
      }),
    );
  });

  it('does not trigger onChange when disabled', () => {
    render(
      <DefaultThemeProvider>
        <CheckboxCell
          disabled
          onChange={onChange}
          testID="disabled-checkbox-cell"
          title="Disabled option"
          value="disabled"
        />
      </DefaultThemeProvider>,
    );

    const container = screen.getByTestId('disabled-checkbox-cell');
    fireEvent.click(container);

    expect(onChange).not.toHaveBeenCalled();
  });

  it('applies disabled state to checkbox', () => {
    render(
      <DefaultThemeProvider>
        <CheckboxCell disabled onChange={onChange} title="Disabled checkbox" value="disabled" />
      </DefaultThemeProvider>,
    );

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeDisabled();
  });

  it('attaches testID', () => {
    const testID = 'checkbox-cell-test';
    render(
      <DefaultThemeProvider>
        <CheckboxCell onChange={onChange} testID={testID} title="Test checkbox" value="test" />
      </DefaultThemeProvider>,
    );

    expect(screen.getByTestId(testID)).toBeInTheDocument();
  });

  it('handles custom titleId and descriptionId', () => {
    render(
      <DefaultThemeProvider>
        <CheckboxCell
          description="Test description"
          descriptionId="custom-desc-id"
          onChange={onChange}
          title="Test title"
          titleId="custom-title-id"
          value="custom-ids"
        />
      </DefaultThemeProvider>,
    );

    expect(screen.getByText('Test title')).toHaveAttribute('id', 'custom-title-id');
    expect(screen.getByText('Test description')).toHaveAttribute('id', 'custom-desc-id');
  });

  it('generates unique IDs when not provided', () => {
    render(
      <DefaultThemeProvider>
        <CheckboxCell
          description="Auto ID description"
          onChange={onChange}
          title="Auto ID title"
          value="auto-id"
        />
      </DefaultThemeProvider>,
    );

    const titleElement = screen.getByText('Auto ID title');
    const descriptionElement = screen.getByText('Auto ID description');

    expect(titleElement).toHaveAttribute('id');
    expect(descriptionElement).toHaveAttribute('id');
    expect(titleElement.getAttribute('id')).not.toBe(descriptionElement.getAttribute('id'));
  });

  it('sets proper ARIA attributes on checkbox', () => {
    render(
      <DefaultThemeProvider>
        <CheckboxCell
          description="ARIA test description"
          onChange={onChange}
          title="ARIA test title"
          value="aria-test"
        />
      </DefaultThemeProvider>,
    );

    const checkbox = screen.getByRole('checkbox');
    const titleElement = screen.getByText('ARIA test title');
    const descriptionElement = screen.getByText('ARIA test description');

    expect(checkbox).toHaveAttribute('aria-labelledby', titleElement.getAttribute('id'));
    expect(checkbox).toHaveAttribute('aria-describedby', descriptionElement.getAttribute('id'));
  });

  it('works without description', () => {
    render(
      <DefaultThemeProvider>
        <CheckboxCell onChange={onChange} title="Title only" value="title-only" />
      </DefaultThemeProvider>,
    );

    const checkbox = screen.getByRole('checkbox');
    const titleElement = screen.getByText('Title only');

    expect(checkbox).toHaveAttribute('aria-labelledby', titleElement.getAttribute('id'));
    expect(checkbox).not.toHaveAttribute('aria-describedby');
  });

  it('applies custom styling', () => {
    const customStyle = { backgroundColor: 'red' };
    render(
      <DefaultThemeProvider>
        <CheckboxCell
          onChange={onChange}
          style={customStyle}
          testID="styled-checkbox-cell"
          title="Styled checkbox"
          value="styled"
        />
      </DefaultThemeProvider>,
    );

    const container = screen.getByTestId('styled-checkbox-cell');
    expect(container).toHaveStyle(customStyle);
  });

  it('handles custom gap values', () => {
    render(
      <DefaultThemeProvider>
        <CheckboxCell
          columnGap={4}
          onChange={onChange}
          rowGap={2}
          testID="gap-checkbox-cell"
          title="Gap test"
          value="gap"
        />
      </DefaultThemeProvider>,
    );

    // Component should render without errors with custom gaps
    expect(screen.getByTestId('gap-checkbox-cell')).toBeInTheDocument();
  });

  it('handles custom padding and border values', () => {
    render(
      <DefaultThemeProvider>
        <CheckboxCell
          borderRadius={300}
          borderWidth={200}
          onChange={onChange}
          padding={3}
          testID="border-checkbox-cell"
          title="Border test"
          value="border"
        />
      </DefaultThemeProvider>,
    );

    // Component should render without errors with custom border values
    expect(screen.getByTestId('border-checkbox-cell')).toBeInTheDocument();
  });

  it('passes accessibility checks', async () => {
    const results = await renderA11y(
      <DefaultThemeProvider>
        <CheckboxCell
          description="This is an accessible checkbox cell"
          onChange={onChange}
          title="Accessible checkbox"
          value="accessible"
        />
      </DefaultThemeProvider>,
    );
    expect(results).toHaveNoViolations();
  });

  it('passes accessibility checks when checked', async () => {
    const results = await renderA11y(
      <DefaultThemeProvider>
        <CheckboxCell
          checked
          description="This checkbox is checked"
          onChange={onChange}
          title="Checked accessible checkbox"
          value="checked-accessible"
        />
      </DefaultThemeProvider>,
    );
    expect(results).toHaveNoViolations();
  });

  it('passes accessibility checks when disabled', async () => {
    const results = await renderA11y(
      <DefaultThemeProvider>
        <CheckboxCell
          disabled
          description="This checkbox is disabled"
          onChange={onChange}
          title="Disabled accessible checkbox"
          value="disabled-accessible"
        />
      </DefaultThemeProvider>,
    );
    expect(results).toHaveNoViolations();
  });
});
