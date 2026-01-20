// Disabling this because its just testing

import React from 'react';
import { renderA11y } from '@coinbase/cds-web-utils';
import { fireEvent, render, screen } from '@testing-library/react';

import { Text } from '../../typography/Text';
import { DefaultThemeProvider } from '../../utils/test';
import { TextInput } from '../TextInput';

describe('TextInput', () => {
  it('passes accessibility', async () => {
    expect(
      await renderA11y(
        <DefaultThemeProvider>
          <TextInput
            accessibilityHint="Text"
            accessibilityLabel="Text"
            end={
              <Text as="h1" display="block" font="title1">
                Node
              </Text>
            }
            helperText="Text"
            label="Text"
            placeholder="Text"
            start={
              <Text as="h1" display="block" font="title1">
                Node
              </Text>
            }
          />
        </DefaultThemeProvider>,
      ),
    ).toHaveNoViolations();
  });

  it('renders an input', () => {
    const value = 'Example value';
    render(
      <DefaultThemeProvider>
        <TextInput onChange={jest.fn()} value={value} />
      </DefaultThemeProvider>,
    );
    expect(screen.getByRole('textbox')).toHaveValue(value);
  });

  it('renders a label', () => {
    const testID = 'label-testid';
    const labelText = 'Example label';
    render(
      <DefaultThemeProvider>
        <TextInput
          label="Example label"
          testIDMap={{
            label: testID,
          }}
        />
      </DefaultThemeProvider>,
    );
    expect(screen.getByTestId(testID)).toHaveTextContent(labelText);
  });

  it('renders label in start node when compact', () => {
    const testID = 'start-testid';
    const labelText = 'Example label';
    render(
      <DefaultThemeProvider>
        <TextInput
          compact
          label="Example label"
          testIDMap={{
            start: testID,
          }}
        />
      </DefaultThemeProvider>,
    );
    expect(screen.getByTestId(testID)).toHaveTextContent(labelText);
  });

  it('renders helper text', () => {
    const testID = 'helpertext-testid';
    const helperText = 'Example helper text';
    render(
      <DefaultThemeProvider>
        <TextInput
          helperText={helperText}
          testIDMap={{
            helperText: testID,
          }}
        />
      </DefaultThemeProvider>,
    );
    expect(screen.getByTestId(testID)).toHaveTextContent(helperText);
  });

  it('renders error icon in helper text when variant is negative', () => {
    const testID = 'helpertext-testid';
    const helperText = 'Example helper text';
    render(
      <DefaultThemeProvider>
        <TextInput
          helperText={helperText}
          testIDMap={{
            helperText: testID,
          }}
          variant="negative"
        />
      </DefaultThemeProvider>,
    );
    expect(screen.getByTestId(`${testID}-error-icon`)).toBeTruthy();
  });

  it('should not render error icon when passing in helper text node', () => {
    const testID = 'helpertext-testid';
    const helperText = 'Example helper text';
    render(
      <DefaultThemeProvider>
        <TextInput
          helperText={
            <Text as="p" display="block" font="title1">
              {helperText}
            </Text>
          }
          testIDMap={{
            helperText: testID,
          }}
          variant="negative"
        />
      </DefaultThemeProvider>,
    );
    expect(screen.queryByTestId(`${testID}-error-icon`)).toBeFalsy();
  });

  it('renders placeholder text', () => {
    const placeholderText = 'Example placeholder text';
    render(
      <DefaultThemeProvider>
        <TextInput placeholder={placeholderText} />
      </DefaultThemeProvider>,
    );
    expect(screen.getByPlaceholderText(placeholderText)).toBeDefined();
  });

  it('renders a start node', () => {
    const testID = 'start-testid';
    const startNodeText = 'Example start node';
    render(
      <DefaultThemeProvider>
        <TextInput
          start={
            <Text as="h1" display="block" font="title1">
              {startNodeText}
            </Text>
          }
          testIDMap={{
            start: testID,
          }}
        />
      </DefaultThemeProvider>,
    );
    expect(screen.getByTestId(testID)).toHaveTextContent(startNodeText);
  });

  it('renders an end node', () => {
    const testID = 'end-testid';
    const endNodeText = 'Example end node';
    render(
      <DefaultThemeProvider>
        <TextInput
          start={
            <Text as="h1" display="block" font="title1">
              {endNodeText}
            </Text>
          }
          testIDMap={{
            start: testID,
          }}
        />
      </DefaultThemeProvider>,
    );
    expect(screen.getByTestId(testID)).toHaveTextContent(endNodeText);
  });

  it('renders suffix in end node', () => {
    const testID = 'end-testid';
    const suffixText = 'Example suffix';
    render(
      <DefaultThemeProvider>
        <TextInput
          suffix={suffixText}
          testIDMap={{
            end: testID,
          }}
        />
      </DefaultThemeProvider>,
    );
    expect(screen.getByTestId(testID)).toHaveTextContent(suffixText);
  });

  it('calls onChange when input value changes', () => {
    const onChange = jest.fn();
    render(
      <DefaultThemeProvider>
        <TextInput onChange={onChange} />
      </DefaultThemeProvider>,
    );
    expect(onChange).not.toHaveBeenCalled();
    fireEvent.change(screen.getByRole('textbox'), {
      target: {
        value: 'Updated value',
      },
    });
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.calls[0][0].target.value).toBe('Updated value');
  });

  it('calls onFocus and onBlur when input is focused / blurred', () => {
    const onFocus = jest.fn();
    const onBlur = jest.fn();
    render(
      <DefaultThemeProvider>
        <TextInput onBlur={onBlur} onFocus={onFocus} />
      </DefaultThemeProvider>,
    );
    expect(onFocus).not.toHaveBeenCalled();
    expect(onBlur).not.toHaveBeenCalled();
    fireEvent.focus(screen.getByRole('textbox'));
    expect(onFocus).toHaveBeenCalledTimes(1);
    expect(onBlur).not.toHaveBeenCalled();
    fireEvent.blur(screen.getByRole('textbox'));
    expect(onFocus).toHaveBeenCalledTimes(1);
    expect(onBlur).toHaveBeenCalledTimes(1);
  });

  it('focuses input when start node is pressed', () => {
    const onFocus = jest.fn();
    const startNodeText = 'Start';
    render(
      <DefaultThemeProvider>
        <TextInput
          onFocus={onFocus}
          start={
            <Text as="h1" display="block" font="title1">
              {startNodeText}
            </Text>
          }
        />
      </DefaultThemeProvider>,
    );
    expect(onFocus).not.toHaveBeenCalled();
    fireEvent.click(screen.getByText(startNodeText));
    expect(onFocus).toHaveBeenCalledTimes(1);
  });

  it('focuses input when end node is pressed', () => {
    const onFocus = jest.fn();
    const endNodeText = 'End';
    render(
      <DefaultThemeProvider>
        <TextInput
          end={
            <Text as="h1" display="block" font="title1">
              {endNodeText}
            </Text>
          }
          onFocus={onFocus}
        />
      </DefaultThemeProvider>,
    );
    expect(onFocus).not.toHaveBeenCalled();
    fireEvent.click(screen.getByText(endNodeText));
    expect(onFocus).toHaveBeenCalledTimes(1);
  });

  it('Generates accessible id for screen reader to read label if label exists', () => {
    render(
      <DefaultThemeProvider>
        <TextInput inputNode={<input data-testid="internal-input" />} label="textinput" />
      </DefaultThemeProvider>,
    );

    expect(screen.getByTestId('internal-input')).toHaveAttribute(
      'id',
      expect.stringMatching(/label-.*/),
    );
  });

  it('id is undefined if label does not exist', () => {
    render(
      <DefaultThemeProvider>
        <TextInput inputNode={<input data-testid="internal-input" />} />
      </DefaultThemeProvider>,
    );

    expect(screen.getByTestId('internal-input')).not.toHaveAttribute('id');
  });

  it('Generates accessibleHint mapping if helperText exists', () => {
    render(
      <DefaultThemeProvider>
        <TextInput helperText="success" label="textinput" testID="textinput-testid" />
      </DefaultThemeProvider>,
    );

    expect(screen.getByTestId('textinput-testid')).toHaveAttribute(
      'aria-describedby',
      expect.stringMatching(/description-.*/),
    );
  });

  it('accessibilityHint is undefined if label does not exist', () => {
    render(
      <DefaultThemeProvider>
        <TextInput label="textinput" testID="textinput-testid" />
      </DefaultThemeProvider>,
    );

    expect(screen.getByTestId('textinput-testid')).not.toHaveAttribute('aria-describedby');
  });

  it('focuses the input element when label is clicked', () => {
    const labelTestID = 'label-testid';
    render(
      <DefaultThemeProvider>
        <TextInput
          label="Example label"
          testIDMap={{
            label: labelTestID,
          }}
        />
      </DefaultThemeProvider>,
    );
    const labelForAttribute = screen.getByTestId(labelTestID).getAttribute('for');
    expect(labelForAttribute?.startsWith('cds-textinput-label')).toBe(true);
    expect(screen.getByRole('textbox')).toHaveAttribute('id', labelForAttribute);
  });

  it('renders label outside by default', () => {
    const labelTestID = 'label-test';
    render(
      <DefaultThemeProvider>
        <TextInput label="Outside Label" testIDMap={{ label: labelTestID }} />
      </DefaultThemeProvider>,
    );

    const label = screen.getByTestId(labelTestID);
    expect(label).toBeInTheDocument();

    const inputArea = screen.getByTestId('input-interactable-area');
    expect(inputArea).not.toContainElement(label);
  });

  it('renders label inside when labelVariant="inside"', () => {
    const labelTestID = 'label-test';
    render(
      <DefaultThemeProvider>
        <TextInput label="Inside Label" labelVariant="inside" testIDMap={{ label: labelTestID }} />
      </DefaultThemeProvider>,
    );

    const label = screen.getByTestId(labelTestID);
    const inputArea = screen.getByTestId('input-interactable-area');
    expect(label).toBeInTheDocument();
    expect(inputArea).toContainElement(label);
  });

  it('overrides inside label variant when compact is true', () => {
    const startTestID = 'start-test';
    render(
      <DefaultThemeProvider>
        <TextInput
          compact
          label="Compact Label"
          labelVariant="inside"
          testIDMap={{
            start: startTestID,
          }}
        />
      </DefaultThemeProvider>,
    );

    const startNode = screen.getByTestId(startTestID);
    expect(startNode).toBeTruthy();
    expect(startNode).toHaveTextContent('Compact Label');

    expect(screen.getByText('Compact Label')).toBeTruthy();
  });

  it('renders labelNode without compact', () => {
    const labelTestID = 'custom-label';
    render(
      <DefaultThemeProvider>
        <TextInput
          labelNode={<span data-testid={labelTestID}>Custom Label Node</span>}
          placeholder="Enter text"
        />
      </DefaultThemeProvider>,
    );

    const customLabel = screen.getByTestId(labelTestID);
    expect(customLabel).toBeInTheDocument();
    expect(customLabel).toHaveTextContent('Custom Label Node');
  });

  it('labelNode takes precedence over label without compact', () => {
    const labelTestID = 'custom-label';
    render(
      <DefaultThemeProvider>
        <TextInput
          label="Regular Label"
          labelNode={<span data-testid={labelTestID}>Custom Label Node</span>}
          placeholder="Enter text"
        />
      </DefaultThemeProvider>,
    );

    const customLabel = screen.getByTestId(labelTestID);
    expect(customLabel).toBeInTheDocument();
    expect(customLabel).toHaveTextContent('Custom Label Node');
    expect(screen.queryByText('Regular Label')).not.toBeInTheDocument();
  });

  it('renders labelNode when compact is true', () => {
    const startTestID = 'start-test';
    const labelTestID = 'custom-label';
    render(
      <DefaultThemeProvider>
        <TextInput
          compact
          labelNode={<span data-testid={labelTestID}>Custom Label Node</span>}
          testIDMap={{
            start: startTestID,
          }}
        />
      </DefaultThemeProvider>,
    );

    const startNode = screen.getByTestId(startTestID);
    const customLabel = screen.getByTestId(labelTestID);
    expect(startNode).toContainElement(customLabel);
    expect(customLabel).toHaveTextContent('Custom Label Node');
  });

  it('renders labelNode with labelVariant inside', () => {
    const labelTestID = 'custom-label';
    render(
      <DefaultThemeProvider>
        <TextInput
          labelNode={<span data-testid={labelTestID}>Custom Inside Label</span>}
          labelVariant="inside"
          placeholder="Enter text"
        />
      </DefaultThemeProvider>,
    );

    const customLabel = screen.getByTestId(labelTestID);
    const inputArea = screen.getByTestId('input-interactable-area');
    expect(customLabel).toBeInTheDocument();
    expect(inputArea).toContainElement(customLabel);
    expect(customLabel).toHaveTextContent('Custom Inside Label');
  });

  it('labelNode takes precedence over label with labelVariant inside', () => {
    const labelTestID = 'custom-label';
    render(
      <DefaultThemeProvider>
        <TextInput
          label="Regular Label"
          labelNode={<span data-testid={labelTestID}>Custom Inside Label</span>}
          labelVariant="inside"
          placeholder="Enter text"
        />
      </DefaultThemeProvider>,
    );

    const customLabel = screen.getByTestId(labelTestID);
    const inputArea = screen.getByTestId('input-interactable-area');
    expect(customLabel).toBeInTheDocument();
    expect(inputArea).toContainElement(customLabel);
    expect(customLabel).toHaveTextContent('Custom Inside Label');
    expect(screen.queryByText('Regular Label')).not.toBeInTheDocument();
  });

  it('renders labelNode with labelVariant inside and start content', () => {
    const labelTestID = 'custom-label';
    const startTestID = 'start-content';
    render(
      <DefaultThemeProvider>
        <TextInput
          labelNode={<span data-testid={labelTestID}>Custom Inside Label</span>}
          labelVariant="inside"
          placeholder="Enter text"
          start={<span data-testid={startTestID}>Start</span>}
        />
      </DefaultThemeProvider>,
    );

    const customLabel = screen.getByTestId(labelTestID);
    const startContent = screen.getByTestId(startTestID);
    const inputArea = screen.getByTestId('input-interactable-area');
    expect(customLabel).toBeInTheDocument();
    expect(startContent).toBeInTheDocument();
    expect(inputArea).toContainElement(customLabel);
    expect(inputArea).toContainElement(startContent);
  });

  it('labelNode takes precedence over label when compact is true', () => {
    const startTestID = 'start-test';
    const labelTestID = 'custom-label';
    render(
      <DefaultThemeProvider>
        <TextInput
          compact
          label="Regular Label"
          labelNode={<span data-testid={labelTestID}>Custom Label Node</span>}
          testIDMap={{
            start: startTestID,
          }}
        />
      </DefaultThemeProvider>,
    );

    const startNode = screen.getByTestId(startTestID);
    const customLabel = screen.getByTestId(labelTestID);
    expect(startNode).toContainElement(customLabel);
    expect(customLabel).toHaveTextContent('Custom Label Node');
    expect(screen.queryByText('Regular Label')).not.toBeInTheDocument();
  });

  it('positions label correctly with inside variant and start content', () => {
    render(
      <DefaultThemeProvider>
        <TextInput
          label="Inside Label with Start"
          labelVariant="inside"
          start={<span data-testid="start-content">Start</span>}
          testIDMap={{ label: 'label-test' }}
        />
      </DefaultThemeProvider>,
    );

    const label = screen.getByTestId('label-test');
    const startContent = screen.getByTestId('start-content');
    const inputArea = screen.getByTestId('input-interactable-area');

    expect(inputArea).toContainElement(label);
    expect(inputArea).toContainElement(startContent);
  });

  it('positions label correctly with inside variant and end content', () => {
    render(
      <DefaultThemeProvider>
        <TextInput
          end={<span data-testid="end-content">End</span>}
          label="Inside Label with End"
          labelVariant="inside"
          testIDMap={{ label: 'label-test' }}
        />
      </DefaultThemeProvider>,
    );

    const label = screen.getByTestId('label-test');
    const endContent = screen.getByTestId('end-content');
    const inputArea = screen.getByTestId('input-interactable-area');

    expect(inputArea).toContainElement(label);
    expect(inputArea).toContainElement(endContent);
  });
});
