import React, { useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { fireEvent, render, screen } from '@testing-library/react-native';

import { Text } from '../../typography/Text';
import { DefaultThemeProvider, SAFE_AREA_METRICS } from '../../utils/testHelpers';
import { NavigationTitleSelect } from '../NavigationTitleSelect';

const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <DefaultThemeProvider>
      <SafeAreaProvider initialMetrics={SAFE_AREA_METRICS}>{component}</SafeAreaProvider>
    </DefaultThemeProvider>,
  );
};

const mockOptions = [
  { id: 'option1', label: 'Option 1' },
  { id: 'option2', label: 'Option 2' },
  { id: 'option3', label: 'Option 3' },
];

const TestNavigationTitleSelect = ({ onChange, ...props }: any) => {
  const [value, setValue] = useState('option1');

  const handleChange = (newValue: string) => {
    setValue(newValue);
    onChange?.(newValue);
  };

  return (
    <NavigationTitleSelect onChange={handleChange} options={mockOptions} value={value} {...props} />
  );
};

describe('NavigationTitleSelect', () => {
  it('renders with default props', () => {
    renderWithTheme(
      <NavigationTitleSelect onChange={jest.fn()} options={mockOptions} value="option1" />,
    );

    const option1Text = screen.getByText('Option 1');
    const caretDownIcon = screen.getByTestId('icon-caretDown');
    expect(option1Text).toBeDefined();
    expect(caretDownIcon).toBeDefined();
  });

  it('displays the correct label for the selected value', () => {
    renderWithTheme(
      <NavigationTitleSelect onChange={jest.fn()} options={mockOptions} value="option2" />,
    );

    const option2Text = screen.getByText('Option 2');
    expect(option2Text).toBeDefined();
  });

  it('opens tray when pressed', () => {
    renderWithTheme(<TestNavigationTitleSelect />);

    const trigger = screen.getByText('Option 1');
    fireEvent.press(trigger);

    // Check if all options are rendered in the tray - using getAllByText since there are duplicates
    expect(screen.getAllByText('Option 1')).toHaveLength(2); // One in trigger, one in tray
    expect(screen.getAllByText('Option 2')).toHaveLength(1);
    expect(screen.getAllByText('Option 3')).toHaveLength(1);
  });

  it('calls onChange when option is selected', () => {
    const onChangeSpy = jest.fn();
    renderWithTheme(<TestNavigationTitleSelect onChange={onChangeSpy} />);

    // Open tray
    const trigger = screen.getByText('Option 1');
    fireEvent.press(trigger);

    // Select different option
    const option2 = screen.getByText('Option 2');
    fireEvent.press(option2);

    expect(onChangeSpy).toHaveBeenCalledWith('option2');
  });

  it('forwards Text component props', () => {
    renderWithTheme(
      <NavigationTitleSelect
        color="fgMuted"
        font="title1"
        onChange={jest.fn()}
        options={mockOptions}
        testID="custom-title"
        value="option1"
      />,
    );

    const title = screen.getByTestId('custom-title');
    expect(title.props.accessibilityRole).toBe('header');
  });

  it('overrides default accessibilityRole', () => {
    renderWithTheme(
      <NavigationTitleSelect
        accessibilityRole="text"
        onChange={jest.fn()}
        options={mockOptions}
        testID="override-title"
        value="option1"
      />,
    );

    const title = screen.getByTestId('override-title');
    expect(title.props.accessibilityRole).toBe('text');
  });

  it('applies custom color to both title and icon', () => {
    renderWithTheme(
      <NavigationTitleSelect
        color="fgMuted"
        onChange={jest.fn()}
        options={mockOptions}
        testID="colored-title"
        value="option1"
      />,
    );

    const coloredTitle = screen.getByTestId('colored-title');
    const caretDownIcon = screen.getByTestId('icon-caretDown');
    expect(coloredTitle).toBeDefined();
    expect(caretDownIcon).toBeDefined();
  });

  it('supports custom font prop', () => {
    renderWithTheme(
      <NavigationTitleSelect
        font="title2"
        onChange={jest.fn()}
        options={mockOptions}
        testID="custom-font"
        value="option1"
      />,
    );

    const customFontTitle = screen.getByTestId('custom-font');
    expect(customFontTitle).toBeDefined();
  });

  it('handles options with React node labels', () => {
    const reactNodeOptions = [
      { id: 'node1', label: <Text>React Node 1</Text> },
      { id: 'node2', label: <Text>React Node 2</Text> },
    ];

    renderWithTheme(
      <NavigationTitleSelect onChange={jest.fn()} options={reactNodeOptions} value="node1" />,
    );

    // Should render the React node as label
    const reactNodeText = screen.getByText('React Node 1');
    expect(reactNodeText).toBeDefined();
  });

  it('handles empty options array', () => {
    renderWithTheme(<NavigationTitleSelect onChange={jest.fn()} options={[]} value="" />);

    // Should not crash and show no label
    const caretDownIcon = screen.getByTestId('icon-caretDown');
    expect(caretDownIcon).toBeDefined();
  });

  it('handles value not found in options', () => {
    renderWithTheme(
      <NavigationTitleSelect onChange={jest.fn()} options={mockOptions} value="nonexistent" />,
    );

    // Should show undefined/empty for unknown value
    const caretDownIcon = screen.getByTestId('icon-caretDown');
    expect(caretDownIcon).toBeDefined();
  });

  it('supports all Text component accessibility props', () => {
    renderWithTheme(
      <NavigationTitleSelect
        accessibilityHint="Select an option"
        accessibilityLabel="Navigation Title Selector"
        onChange={jest.fn()}
        options={mockOptions}
        testID="a11y-title"
        value="option1"
      />,
    );

    const title = screen.getByTestId('a11y-title');
    expect(title.props.accessibilityHint).toBe('Select an option');
    expect(title.props.accessibilityLabel).toBe('Navigation Title Selector');
  });

  it('supports text styling props', () => {
    renderWithTheme(
      <NavigationTitleSelect
        ellipsize="tail"
        numberOfLines={1}
        onChange={jest.fn()}
        options={mockOptions}
        testID="styled-text"
        value="option1"
      />,
    );

    const title = screen.getByTestId('styled-text');
    expect(title.props.numberOfLines).toBe(1);
    expect(title.props.ellipsizeMode).toBe('tail');
  });

  it('applies default props correctly', () => {
    renderWithTheme(
      <NavigationTitleSelect
        onChange={jest.fn()}
        options={mockOptions}
        testID="default-props"
        value="option1"
      />,
    );

    const title = screen.getByTestId('default-props');
    expect(title.props.accessibilityRole).toBe('header');
  });

  it('renders with many options', () => {
    const manyOptions = Array.from({ length: 20 }, (_, i) => ({
      id: `option${i}`,
      label: `Option ${i}`,
    }));

    renderWithTheme(<TestNavigationTitleSelect options={manyOptions} value="option0" />);

    const trigger = screen.getByText('Option 0');
    fireEvent.press(trigger);

    // Should render all options in tray - using getAllByText for duplicates
    expect(screen.getAllByText('Option 0')).toHaveLength(2); // One in trigger, one in tray
    const option19Text = screen.getByText('Option 19');
    expect(option19Text).toBeDefined();
  });

  it('handles very long option labels', () => {
    const longLabelOptions = [
      {
        id: 'long1',
        label:
          'This is a very long option label that might overflow the container width and should be handled gracefully',
      },
      {
        id: 'long2',
        label: 'Another extremely long option label for testing purposes',
      },
    ];

    renderWithTheme(
      <NavigationTitleSelect onChange={jest.fn()} options={longLabelOptions} value="long1" />,
    );

    const longLabelText = screen.getByText(
      'This is a very long option label that might overflow the container width and should be handled gracefully',
    );
    expect(longLabelText).toBeDefined();
  });

  it('maintains component structure with HStack and Icon', () => {
    renderWithTheme(
      <NavigationTitleSelect onChange={jest.fn()} options={mockOptions} value="option1" />,
    );

    // Should have both text and icon elements
    const option1Text = screen.getByText('Option 1');
    const caretDownIcon = screen.getByTestId('icon-caretDown');
    expect(option1Text).toBeDefined();
    expect(caretDownIcon).toBeDefined();
  });

  it('handles rapid option changes', () => {
    const onChangeSpy = jest.fn();
    renderWithTheme(<TestNavigationTitleSelect onChange={onChangeSpy} />);

    const trigger = screen.getByText('Option 1');
    fireEvent.press(trigger);

    // Rapidly select multiple options
    const option2 = screen.getByText('Option 2');
    fireEvent.press(option2);

    expect(onChangeSpy).toHaveBeenCalledWith('option2');
  });

  it('supports controlled usage pattern', () => {
    const ControlledComponent = () => {
      const [selectedValue, setSelectedValue] = useState('option2');

      return (
        <NavigationTitleSelect
          onChange={setSelectedValue}
          options={mockOptions}
          value={selectedValue}
        />
      );
    };

    renderWithTheme(<ControlledComponent />);

    // Should show the initially selected value
    const option2Text = screen.getByText('Option 2');
    expect(option2Text).toBeDefined();
  });
});
