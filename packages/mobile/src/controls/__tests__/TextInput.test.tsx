import { fireEvent, render, screen } from '@testing-library/react-native';

import { Text } from '../../typography/Text';
import { DefaultThemeProvider } from '../../utils/testHelpers';
import { TextInput } from '../TextInput';

describe('TextInput', () => {
  it('passes a11y', () => {
    const testID = 'textinput-id';
    render(
      <DefaultThemeProvider>
        <TextInput
          accessibilityHint="Text"
          accessibilityLabel="Text"
          end={<Text font="title1">Node</Text>}
          helperText="Text"
          label="Text"
          placeholder="Text"
          start={<Text font="title1">Node</Text>}
          testID={testID}
        />
      </DefaultThemeProvider>,
    );
    expect(screen.getByTestId(testID)).toBeAccessible();
  });

  it('passes a11y with wrapper component', () => {
    const testID = 'textinput-id';
    const MockTextInput = TextInput;
    render(
      <DefaultThemeProvider>
        <MockTextInput
          end={<Text font="title1">Node</Text>}
          helperText="Text"
          label="Text"
          placeholder="Text"
          start={<Text font="title1">Node</Text>}
          testID={testID}
        />
      </DefaultThemeProvider>,
    );
    expect(screen.getByTestId(testID)).toBeAccessible();
  });

  it('renders a TextInput', () => {
    const testID = 'textinput-id';
    const value = 'Example value';
    render(
      <DefaultThemeProvider>
        <TextInput
          accessibilityHint="Text input field"
          accessibilityLabel="Text input field"
          onChange={jest.fn()}
          testID={testID}
          value={value}
        />
      </DefaultThemeProvider>,
    );
    expect(screen.getByTestId(testID).props.value).toBe(value);
  });

  it('renders a label', () => {
    const testID = 'label-testid';
    const labelText = 'Example label';
    render(
      <DefaultThemeProvider>
        <TextInput
          accessibilityHint="Text input field"
          accessibilityLabel="Text input field"
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
          accessibilityHint="Text input field"
          accessibilityLabel="Text input field"
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
          compact
          accessibilityHint="Text input field"
          accessibilityLabel="Text input field"
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
          compact
          accessibilityHint="Text input field"
          accessibilityLabel="Text input field"
          helperText={helperText}
          testIDMap={{
            helperText: testID,
          }}
          variant="negative"
        />
      </DefaultThemeProvider>,
    );
    expect(screen.getByTestId(`${testID}-error-icon`)).toBeTruthy();
    expect(screen.getByTestId(`${testID}-error-icon`)).toBeAccessible();
  });

  it('should not render error icon when passing helper text node', () => {
    const testID = 'helpertext-testid';
    const helperText = 'Example helper text';
    render(
      <DefaultThemeProvider>
        <TextInput
          compact
          accessibilityHint="Text input field"
          accessibilityLabel="Text input field"
          helperText={<Text font="title1">{helperText}</Text>}
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
        <TextInput
          accessibilityHint="Text input field"
          accessibilityLabel="Text input field"
          placeholder={placeholderText}
        />
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
          accessibilityHint="Text input field"
          accessibilityLabel="Text input field"
          start={<Text font="title1">{startNodeText}</Text>}
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
          accessibilityHint="Text input field"
          accessibilityLabel="Text input field"
          start={<Text font="title1">{endNodeText}</Text>}
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
          accessibilityHint="Text input field"
          accessibilityLabel="Text input field"
          suffix={suffixText}
          testIDMap={{
            end: testID,
          }}
        />
      </DefaultThemeProvider>,
    );
    expect(screen.getByTestId(testID)).toHaveTextContent(suffixText);
  });

  it('calls onChangeText when input value changes', () => {
    const testID = 'input-testid';
    const onChange = jest.fn();
    render(
      <DefaultThemeProvider>
        <TextInput
          accessibilityHint="Text input field"
          accessibilityLabel="Text input field"
          onChangeText={onChange}
          testID={testID}
        />
      </DefaultThemeProvider>,
    );
    expect(onChange).not.toHaveBeenCalled();
    fireEvent.changeText(screen.getByTestId(testID), 'Updated value');
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.calls[0][0]).toBe('Updated value');
  });

  it('calls onFocus and onBlur when input is focused / blurred', () => {
    const testID = 'input-testid';
    const onFocus = jest.fn();
    const onBlur = jest.fn();
    render(
      <DefaultThemeProvider>
        <TextInput
          accessibilityHint="Text input field"
          accessibilityLabel="Text input field"
          onBlur={onBlur}
          onFocus={onFocus}
          testID={testID}
        />
      </DefaultThemeProvider>,
    );
    expect(onFocus).not.toHaveBeenCalled();
    expect(onBlur).not.toHaveBeenCalled();
    fireEvent(screen.getByTestId(testID), 'focus');
    expect(onFocus).toHaveBeenCalledTimes(1);
    expect(onBlur).not.toHaveBeenCalled();
    fireEvent(screen.getByTestId(testID), 'blur');
    expect(onFocus).toHaveBeenCalledTimes(1);
    expect(onBlur).toHaveBeenCalledTimes(1);
  });

  it('renders label outside by default', () => {
    const labelTestID = 'label-test';
    render(
      <DefaultThemeProvider>
        <TextInput
          accessibilityHint="Text input field"
          accessibilityLabel="Text input field"
          label="Outside Label"
          testIDMap={{ label: labelTestID }}
        />
      </DefaultThemeProvider>,
    );

    const label = screen.getByTestId(labelTestID);
    expect(label).toBeTruthy();
    expect(label).toHaveTextContent('Outside Label');
  });

  it('renders label inside when labelVariant="inside"', () => {
    const labelTestID = 'label-test';
    render(
      <DefaultThemeProvider>
        <TextInput
          accessibilityHint="Text input field"
          accessibilityLabel="Text input field"
          label="Inside Label"
          labelVariant="inside"
          testIDMap={{ label: labelTestID }}
        />
      </DefaultThemeProvider>,
    );

    const label = screen.getByTestId(labelTestID);
    expect(label).toBeTruthy();
    expect(label).toHaveTextContent('Inside Label');
  });

  it('overrides inside label variant when compact is true', () => {
    const startTestID = 'start-test';
    render(
      <DefaultThemeProvider>
        <TextInput
          compact
          accessibilityHint="Text input field"
          accessibilityLabel="Text input field"
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
          accessibilityHint="Text input field"
          accessibilityLabel="Text input field"
          labelNode={<Text testID={labelTestID}>Custom Label Node</Text>}
          placeholder="Enter text"
        />
      </DefaultThemeProvider>,
    );

    const customLabel = screen.getByTestId(labelTestID);
    expect(customLabel).toBeTruthy();
    expect(customLabel).toHaveTextContent('Custom Label Node');
  });

  it('labelNode takes precedence over label without compact', () => {
    const labelTestID = 'custom-label';
    render(
      <DefaultThemeProvider>
        <TextInput
          accessibilityHint="Text input field"
          accessibilityLabel="Text input field"
          label="Regular Label"
          labelNode={<Text testID={labelTestID}>Custom Label Node</Text>}
          placeholder="Enter text"
        />
      </DefaultThemeProvider>,
    );

    const customLabel = screen.getByTestId(labelTestID);
    expect(customLabel).toBeTruthy();
    expect(customLabel).toHaveTextContent('Custom Label Node');
    expect(screen.queryByText('Regular Label')).toBeFalsy();
  });

  it('renders labelNode when compact is true', () => {
    const startTestID = 'start-test';
    const labelTestID = 'custom-label';
    render(
      <DefaultThemeProvider>
        <TextInput
          compact
          accessibilityHint="Text input field"
          accessibilityLabel="Text input field"
          labelNode={<Text testID={labelTestID}>Custom Label Node</Text>}
          testIDMap={{
            start: startTestID,
          }}
        />
      </DefaultThemeProvider>,
    );

    const startNode = screen.getByTestId(startTestID);
    const customLabel = screen.getByTestId(labelTestID);
    expect(startNode).toBeTruthy();
    expect(customLabel).toBeTruthy();
    expect(customLabel).toHaveTextContent('Custom Label Node');
  });

  it('renders labelNode with labelVariant inside', () => {
    const labelTestID = 'custom-label';
    render(
      <DefaultThemeProvider>
        <TextInput
          accessibilityHint="Text input field"
          accessibilityLabel="Text input field"
          labelNode={<Text testID={labelTestID}>Custom Inside Label</Text>}
          labelVariant="inside"
          placeholder="Enter text"
        />
      </DefaultThemeProvider>,
    );

    const customLabel = screen.getByTestId(labelTestID);
    expect(customLabel).toBeTruthy();
    expect(customLabel).toHaveTextContent('Custom Inside Label');
  });

  it('labelNode takes precedence over label with labelVariant inside', () => {
    const labelTestID = 'custom-label';
    render(
      <DefaultThemeProvider>
        <TextInput
          accessibilityHint="Text input field"
          accessibilityLabel="Text input field"
          label="Regular Label"
          labelNode={<Text testID={labelTestID}>Custom Inside Label</Text>}
          labelVariant="inside"
          placeholder="Enter text"
        />
      </DefaultThemeProvider>,
    );

    const customLabel = screen.getByTestId(labelTestID);
    expect(customLabel).toBeTruthy();
    expect(customLabel).toHaveTextContent('Custom Inside Label');
    expect(screen.queryByText('Regular Label')).toBeFalsy();
  });

  it('renders labelNode with labelVariant inside and start content', () => {
    const labelTestID = 'custom-label';
    const startTestID = 'start-content';
    render(
      <DefaultThemeProvider>
        <TextInput
          accessibilityHint="Text input field"
          accessibilityLabel="Text input field"
          labelNode={<Text testID={labelTestID}>Custom Inside Label</Text>}
          labelVariant="inside"
          placeholder="Enter text"
          start={<Text testID={startTestID}>Start</Text>}
        />
      </DefaultThemeProvider>,
    );

    const customLabel = screen.getByTestId(labelTestID);
    const startContent = screen.getByTestId(startTestID);
    expect(customLabel).toBeTruthy();
    expect(startContent).toBeTruthy();
  });

  it('labelNode takes precedence over label when compact is true', () => {
    const startTestID = 'start-test';
    const labelTestID = 'custom-label';
    render(
      <DefaultThemeProvider>
        <TextInput
          compact
          accessibilityHint="Text input field"
          accessibilityLabel="Text input field"
          label="Regular Label"
          labelNode={<Text testID={labelTestID}>Custom Label Node</Text>}
          testIDMap={{
            start: startTestID,
          }}
        />
      </DefaultThemeProvider>,
    );

    const startNode = screen.getByTestId(startTestID);
    const customLabel = screen.getByTestId(labelTestID);
    expect(startNode).toBeTruthy();
    expect(customLabel).toBeTruthy();
    expect(customLabel).toHaveTextContent('Custom Label Node');
    expect(screen.queryByText('Regular Label')).toBeFalsy();
  });

  it('positions label correctly with inside variant and start content', () => {
    render(
      <DefaultThemeProvider>
        <TextInput
          accessibilityHint="Text input field"
          accessibilityLabel="Text input field"
          label="Inside Label with Start"
          labelVariant="inside"
          start={<Text testID="start-content">Start</Text>}
          testIDMap={{ label: 'label-test' }}
        />
      </DefaultThemeProvider>,
    );

    const label = screen.getByTestId('label-test');
    const startContent = screen.getByTestId('start-content');

    expect(label).toBeTruthy();
    expect(startContent).toBeTruthy();
    expect(label).toHaveTextContent('Inside Label with Start');
    expect(startContent).toHaveTextContent('Start');
  });

  it('positions label correctly with inside variant and end content', () => {
    render(
      <DefaultThemeProvider>
        <TextInput
          accessibilityHint="Text input field"
          accessibilityLabel="Text input field"
          end={<Text testID="end-content">End</Text>}
          label="Inside Label with End"
          labelVariant="inside"
          testIDMap={{ label: 'label-test' }}
        />
      </DefaultThemeProvider>,
    );

    const label = screen.getByTestId('label-test');
    const endContent = screen.getByTestId('end-content');

    expect(label).toBeTruthy();
    expect(endContent).toBeTruthy();
    expect(label).toHaveTextContent('Inside Label with End');
    expect(endContent).toHaveTextContent('End');
  });
});
