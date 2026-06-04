import { createRef } from 'react';
import { Animated, StyleSheet, type TextInput as RNTextInput } from 'react-native';
import { focusedInputBorderWidth } from '@coinbase/cds-common/tokens/input';
import { fireEvent, render, screen } from '@testing-library/react-native';

import { defaultTheme } from '../../themes/defaultTheme';
import { Text } from '../../typography/Text';
import { DefaultThemeProvider } from '../../utils/testHelpers';
import { TextInput } from '../TextInput';

describe('TextInput', () => {
  const getFocusedBorderOverlayStyle = () => {
    const focusedBorderOverlay = screen
      .UNSAFE_getAllByType(Animated.View)
      .find((view) => StyleSheet.flatten(view.props.style)?.position === 'absolute');

    return focusedBorderOverlay ? StyleSheet.flatten(focusedBorderOverlay.props.style) : undefined;
  };

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

  it('forwards ref to the underlying RNTextInput', () => {
    const testID = 'textinput-ref-test';
    const ref = createRef<RNTextInput>();
    render(
      <DefaultThemeProvider>
        <TextInput
          ref={ref}
          accessibilityHint="Text input field"
          accessibilityLabel="Text input field"
          testID={testID}
        />
      </DefaultThemeProvider>,
    );
    expect(ref.current).not.toBeNull();
    expect(screen.getByTestId(testID)).toBeTruthy();
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

  it('passes font to native input', () => {
    const testID = 'textinput-id';
    render(
      <DefaultThemeProvider>
        <TextInput font="label1" testID={testID} />
      </DefaultThemeProvider>,
    );

    const flattenedStyle = StyleSheet.flatten(screen.getByTestId(testID).props.style);
    expect(flattenedStyle).toEqual(
      expect.objectContaining({
        fontSize: defaultTheme.fontSize.label1,
        minHeight: defaultTheme.lineHeight.label1,
        fontWeight: defaultTheme.fontWeight.label1,
      }),
    );
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

  it('passes labelFont and labelColor to the outside label', () => {
    const labelTestID = 'label-font-color-test';
    render(
      <DefaultThemeProvider>
        <TextInput
          accessibilityHint="Text input field"
          accessibilityLabel="Text input field"
          label="Fees"
          labelColor="fgMuted"
          labelFont="caption"
          testIDMap={{ label: labelTestID }}
        />
      </DefaultThemeProvider>,
    );
    const flat = StyleSheet.flatten(screen.getByTestId(labelTestID).props.style);
    expect(flat.color).toBe(defaultTheme.lightColor.fgMuted);
    expect(flat.fontSize).toBe(defaultTheme.fontSize.caption);
    expect(flat.fontWeight).toBe(defaultTheme.fontWeight.caption);
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

  it('keeps focused border width at 0 by default when bordered is false', () => {
    const testID = 'input-testid';
    render(
      <DefaultThemeProvider>
        <TextInput
          accessibilityHint="Text input field"
          accessibilityLabel="Text input field"
          bordered={false}
          testID={testID}
        />
      </DefaultThemeProvider>,
    );

    fireEvent(screen.getByTestId(testID), 'focus');
    const focusedBorderOverlayStyle = getFocusedBorderOverlayStyle();
    expect(focusedBorderOverlayStyle).toEqual(expect.objectContaining({ borderWidth: 0 }));
  });

  it('applies focusedBorderWidth when bordered is false', () => {
    const testID = 'input-testid';
    render(
      <DefaultThemeProvider>
        <TextInput
          accessibilityHint="Text input field"
          accessibilityLabel="Text input field"
          bordered={false}
          focusedBorderWidth={200}
          testID={testID}
        />
      </DefaultThemeProvider>,
    );

    fireEvent(screen.getByTestId(testID), 'focus');
    const focusedBorderOverlayStyle = getFocusedBorderOverlayStyle();
    expect(focusedBorderOverlayStyle).toEqual(
      expect.objectContaining({ borderWidth: focusedInputBorderWidth }),
    );
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

    const startNode = screen.getByTestId(startTestID, { includeHiddenElements: true });
    expect(startNode).toBeTruthy();
    expect(startNode).toHaveTextContent('Compact Label');

    expect(screen.getByText('Compact Label', { includeHiddenElements: true })).toBeTruthy();
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

    const startNode = screen.getByTestId(startTestID, { includeHiddenElements: true });
    const customLabel = screen.getByTestId(labelTestID, { includeHiddenElements: true });
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

    const customLabel = screen.getByTestId(labelTestID, { includeHiddenElements: true });
    const startContent = screen.getByTestId(startTestID, { includeHiddenElements: true });
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

    const startNode = screen.getByTestId(startTestID, { includeHiddenElements: true });
    const customLabel = screen.getByTestId(labelTestID, { includeHiddenElements: true });
    expect(startNode).toBeTruthy();
    expect(customLabel).toBeTruthy();
    expect(customLabel).toHaveTextContent('Custom Label Node');
    expect(screen.queryByText('Regular Label', { includeHiddenElements: true })).toBeFalsy();
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

    const label = screen.getByTestId('label-test', { includeHiddenElements: true });
    const startContent = screen.getByTestId('start-content', { includeHiddenElements: true });

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
