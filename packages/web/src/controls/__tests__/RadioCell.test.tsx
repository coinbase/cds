import { renderA11y } from '@coinbase/cds-web-utils/jest';
import { fireEvent, render, screen } from '@testing-library/react';

import { Text } from '../../typography/Text';
import { DefaultThemeProvider } from '../../utils/test';
import { RadioCell } from '../RadioCell';

const onChange = jest.fn();

describe('RadioCell', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders title and description', () => {
    render(
      <DefaultThemeProvider>
        <RadioCell
          description="Select this option for optimal performance"
          onChange={onChange}
          title="Performance Mode"
          value="performance"
        />
      </DefaultThemeProvider>,
    );

    expect(screen.getByText('Performance Mode')).toBeInTheDocument();
    expect(screen.getByText('Select this option for optimal performance')).toBeInTheDocument();
  });

  it('renders ReactNode title and description', () => {
    render(
      <DefaultThemeProvider>
        <RadioCell
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
        <RadioCell checked onChange={onChange} title="Selected option" value="selected" />
      </DefaultThemeProvider>,
    );

    const radio = screen.getByRole('radio');
    expect(radio).toBeChecked();
  });

  it('shows unchecked state correctly', () => {
    render(
      <DefaultThemeProvider>
        <RadioCell
          checked={false}
          onChange={onChange}
          title="Unselected option"
          value="unselected"
        />
      </DefaultThemeProvider>,
    );

    const radio = screen.getByRole('radio');
    expect(radio).not.toBeChecked();
  });

  it('triggers onChange when clicked', () => {
    render(
      <DefaultThemeProvider>
        <RadioCell
          onChange={onChange}
          testID="radio-cell"
          title="Clickable option"
          value="clickable"
        />
      </DefaultThemeProvider>,
    );

    const container = screen.getByTestId('radio-cell');
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

  it('triggers onChange when radio is clicked', () => {
    render(
      <DefaultThemeProvider>
        <RadioCell onChange={onChange} title="Radio clickable" value="radio-click" />
      </DefaultThemeProvider>,
    );

    const radio = screen.getByRole('radio');
    fireEvent.click(radio);

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({
        target: expect.objectContaining({
          value: 'radio-click',
        }),
      }),
    );
  });

  it('does not trigger onChange when disabled', () => {
    render(
      <DefaultThemeProvider>
        <RadioCell
          disabled
          onChange={onChange}
          testID="disabled-radio-cell"
          title="Disabled option"
          value="disabled"
        />
      </DefaultThemeProvider>,
    );

    const container = screen.getByTestId('disabled-radio-cell');
    fireEvent.click(container);

    expect(onChange).not.toHaveBeenCalled();
  });

  it('applies disabled state to radio', () => {
    render(
      <DefaultThemeProvider>
        <RadioCell disabled onChange={onChange} title="Disabled radio" value="disabled" />
      </DefaultThemeProvider>,
    );

    const radio = screen.getByRole('radio');
    expect(radio).toBeDisabled();
  });

  it('attaches testID', () => {
    const testID = 'radio-cell-test';
    render(
      <DefaultThemeProvider>
        <RadioCell onChange={onChange} testID={testID} title="Test radio" value="test" />
      </DefaultThemeProvider>,
    );

    expect(screen.getByTestId(testID)).toBeInTheDocument();
  });

  it('handles custom titleId and descriptionId', () => {
    render(
      <DefaultThemeProvider>
        <RadioCell
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
        <RadioCell
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

  it('sets proper ARIA attributes on radio', () => {
    render(
      <DefaultThemeProvider>
        <RadioCell
          description="ARIA test description"
          onChange={onChange}
          title="ARIA test title"
          value="aria-test"
        />
      </DefaultThemeProvider>,
    );

    const radio = screen.getByRole('radio');
    const titleElement = screen.getByText('ARIA test title');
    const descriptionElement = screen.getByText('ARIA test description');

    expect(radio).toHaveAttribute('aria-labelledby', titleElement.getAttribute('id'));
    expect(radio).toHaveAttribute('aria-describedby', descriptionElement.getAttribute('id'));
  });

  it('works without description', () => {
    render(
      <DefaultThemeProvider>
        <RadioCell onChange={onChange} title="Title only" value="title-only" />
      </DefaultThemeProvider>,
    );

    const radio = screen.getByRole('radio');
    const titleElement = screen.getByText('Title only');

    expect(radio).toHaveAttribute('aria-labelledby', titleElement.getAttribute('id'));
    expect(radio).not.toHaveAttribute('aria-describedby');
  });

  it('applies custom styling', () => {
    const customStyle = { backgroundColor: 'blue' };
    render(
      <DefaultThemeProvider>
        <RadioCell
          onChange={onChange}
          style={customStyle}
          testID="styled-radio-cell"
          title="Styled radio"
          value="styled"
        />
      </DefaultThemeProvider>,
    );

    const container = screen.getByTestId('styled-radio-cell');
    expect(container).toHaveStyle(customStyle);
  });

  it('handles custom gap values', () => {
    render(
      <DefaultThemeProvider>
        <RadioCell
          columnGap={4}
          onChange={onChange}
          rowGap={2}
          testID="gap-radio-cell"
          title="Gap test"
          value="gap"
        />
      </DefaultThemeProvider>,
    );

    // Component should render without errors with custom gaps
    expect(screen.getByTestId('gap-radio-cell')).toBeInTheDocument();
  });

  it('handles custom padding and border values', () => {
    render(
      <DefaultThemeProvider>
        <RadioCell
          borderRadius={300}
          borderWidth={200}
          onChange={onChange}
          padding={3}
          testID="border-radio-cell"
          title="Border test"
          value="border"
        />
      </DefaultThemeProvider>,
    );

    // Component should render without errors with custom border values
    expect(screen.getByTestId('border-radio-cell')).toBeInTheDocument();
  });

  it('handles custom width', () => {
    render(
      <DefaultThemeProvider>
        <RadioCell
          onChange={onChange}
          testID="width-radio-cell"
          title="Width test"
          value="width"
          width="50%"
        />
      </DefaultThemeProvider>,
    );

    // Component should render without errors with custom width
    expect(screen.getByTestId('width-radio-cell')).toBeInTheDocument();
  });

  it('renders title as Box when not a string', () => {
    const customTitle = (
      <div>
        <span>Complex</span> <strong>Title</strong>
      </div>
    );

    render(
      <DefaultThemeProvider>
        <RadioCell onChange={onChange} title={customTitle} value="complex-title" />
      </DefaultThemeProvider>,
    );

    expect(screen.getByText('Complex')).toBeInTheDocument();
    expect(screen.getByText('Title')).toBeInTheDocument();
  });

  it('shows radio icon when checked', () => {
    render(
      <DefaultThemeProvider>
        <RadioCell
          checked
          onChange={onChange}
          title="Checked radio with icon"
          value="checked-icon"
        />
      </DefaultThemeProvider>,
    );

    // Check that the radio icon is present when checked
    const radioIcon = screen.getByTestId('radio-icon');
    expect(radioIcon).toBeInTheDocument();
  });

  it('does not show radio icon when unchecked', () => {
    render(
      <DefaultThemeProvider>
        <RadioCell
          checked={false}
          onChange={onChange}
          title="Unchecked radio without icon"
          value="unchecked-icon"
        />
      </DefaultThemeProvider>,
    );

    // Check that the radio icon is not present when unchecked
    const radioIcon = screen.queryByTestId('radio-icon');
    expect(radioIcon).not.toBeInTheDocument();
  });

  it('passes accessibility checks', async () => {
    const results = await renderA11y(
      <DefaultThemeProvider>
        <RadioCell
          description="This is an accessible radio cell"
          onChange={onChange}
          title="Accessible radio"
          value="accessible"
        />
      </DefaultThemeProvider>,
    );
    expect(results).toHaveNoViolations();
  });

  it('passes accessibility checks when checked', async () => {
    const results = await renderA11y(
      <DefaultThemeProvider>
        <RadioCell
          checked
          description="This radio is checked"
          onChange={onChange}
          title="Checked accessible radio"
          value="checked-accessible"
        />
      </DefaultThemeProvider>,
    );
    expect(results).toHaveNoViolations();
  });

  it('passes accessibility checks when disabled', async () => {
    const results = await renderA11y(
      <DefaultThemeProvider>
        <RadioCell
          disabled
          description="This radio is disabled"
          onChange={onChange}
          title="Disabled accessible radio"
          value="disabled-accessible"
        />
      </DefaultThemeProvider>,
    );
    expect(results).toHaveNoViolations();
  });
});
