import React, { useCallback, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { fireEvent, render, screen } from '@testing-library/react-native';

import { Tray } from '../../overlays/tray/Tray';
import { Text } from '../../typography/Text';
import { DefaultThemeProvider, SAFE_AREA_METRICS } from '../../utils/testHelpers';
import { Select } from '../Select';
import { SelectOption } from '../SelectOption';

const DefaultSelect = ({ trayTitle, hasDescription, hideHandleBar, ...props }: any) => {
  const [isTrayVisible, setIsTrayVisible] = useState(false);
  const [selectedValue, setValue] = useState<string | undefined>();

  const openTray = useCallback(() => setIsTrayVisible(true), []);
  const closeTray = useCallback(() => setIsTrayVisible(false), []);

  const exampleOptions = ['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5', 'Option 6'];

  return (
    <Select onChange={setValue} onPress={openTray} value={selectedValue} {...props}>
      {isTrayVisible && (
        <Tray
          hideHandleBar={hideHandleBar}
          onCloseComplete={closeTray}
          testID="select-input-tray"
          title={trayTitle}
        >
          {({ handleClose }) =>
            exampleOptions.map((option) => (
              <SelectOption
                key={option}
                description={hasDescription ? 'Description' : undefined}
                onPress={handleClose}
                title={option}
                value={option}
              />
            ))
          }
        </Tray>
      )}
    </Select>
  );
};

const placeholderText = 'Choose something';

describe('Select Input', () => {
  it('passes a11y', () => {
    render(
      <DefaultThemeProvider>
        <SafeAreaProvider initialMetrics={SAFE_AREA_METRICS}>
          <DefaultSelect placeholder={placeholderText} testID="mock-select" />
        </SafeAreaProvider>
      </DefaultThemeProvider>,
    );
    expect(screen.getByTestId('mock-select')).toBeAccessible();
  });
  it('renders the Select Input trigger', async () => {
    render(
      <DefaultThemeProvider>
        <SafeAreaProvider initialMetrics={SAFE_AREA_METRICS}>
          <DefaultSelect placeholder={placeholderText} />
        </SafeAreaProvider>
      </DefaultThemeProvider>,
    );

    expect(screen.getByText(placeholderText)).toBeTruthy();
  });
  it('prevents press interactions when disabled', () => {
    const onPressSpy = jest.fn();
    render(
      <DefaultThemeProvider>
        <SafeAreaProvider initialMetrics={SAFE_AREA_METRICS}>
          <DefaultSelect disabled onPress={onPressSpy} placeholder={placeholderText} />
        </SafeAreaProvider>
      </DefaultThemeProvider>,
    );

    fireEvent.press(screen.getByText(placeholderText));

    expect(onPressSpy).not.toHaveBeenCalled();
  });
  it('renders error icon in helper text when variant is negative', async () => {
    render(
      <DefaultThemeProvider>
        <SafeAreaProvider initialMetrics={SAFE_AREA_METRICS}>
          <DefaultSelect
            helperText="helper text"
            placeholder={placeholderText}
            variant="negative"
          />
        </SafeAreaProvider>
      </DefaultThemeProvider>,
    );

    expect(screen.getByTestId('select-error-icon')).toBeTruthy();
    expect(screen.getByTestId('select-error-icon')).toBeAccessible();
  });
  it('should not render error icon when passing helper text node', async () => {
    render(
      <DefaultThemeProvider>
        <SafeAreaProvider initialMetrics={SAFE_AREA_METRICS}>
          <DefaultSelect
            helperText={<Text font="body">helper text</Text>}
            placeholder={placeholderText}
            variant="negative"
          />
        </SafeAreaProvider>
      </DefaultThemeProvider>,
    );

    expect(screen.queryByTestId('select-error-icon')).toBeFalsy();
  });

  it('renders with compact label', () => {
    render(
      <DefaultThemeProvider>
        <SafeAreaProvider initialMetrics={SAFE_AREA_METRICS}>
          <DefaultSelect compact label="Compact Label" placeholder="Choose option" />
        </SafeAreaProvider>
      </DefaultThemeProvider>,
    );

    const label = screen.getByText('Compact Label');
    const placeholder = screen.getByText('Choose option');

    expect(label).toBeTruthy();
    expect(placeholder).toBeTruthy();
  });

  it('renders with start node', () => {
    render(
      <DefaultThemeProvider>
        <SafeAreaProvider initialMetrics={SAFE_AREA_METRICS}>
          <DefaultSelect
            label="Select with Icon"
            placeholder="Choose option"
            startNode={<Text testID="start-icon">Icon</Text>}
          />
        </SafeAreaProvider>
      </DefaultThemeProvider>,
    );

    expect(screen.getByText('Select with Icon')).toBeTruthy();
    expect(screen.getByTestId('start-icon')).toBeTruthy();
    expect(screen.getByText('Icon')).toBeTruthy();
  });

  it('handles value and valueLabel correctly', () => {
    const SelectWithValueLabel = () => {
      const [value, setValue] = useState('opt1');
      const [isTrayVisible, setIsTrayVisible] = useState(false);

      const options = [
        { value: 'opt1', label: 'Option One' },
        { value: 'opt2', label: 'Option Two' },
      ];

      const selectedOption = options.find((opt) => opt.value === value);

      return (
        <Select
          onChange={setValue}
          onPress={() => setIsTrayVisible(true)}
          value={value}
          valueLabel={selectedOption?.label}
        >
          {isTrayVisible && (
            <Tray onCloseComplete={() => setIsTrayVisible(false)}>
              {({ handleClose }) =>
                options.map((option) => (
                  <SelectOption
                    key={option.value}
                    onPress={handleClose}
                    title={option.label}
                    value={option.value}
                  />
                ))
              }
            </Tray>
          )}
        </Select>
      );
    };

    render(
      <DefaultThemeProvider>
        <SafeAreaProvider initialMetrics={SAFE_AREA_METRICS}>
          <SelectWithValueLabel />
        </SafeAreaProvider>
      </DefaultThemeProvider>,
    );

    expect(screen.getByText('Option One')).toBeTruthy();
  });

  it('supports all available variants', () => {
    const variants = [
      'positive',
      'negative',
      'primary',
      'foreground',
      'foregroundMuted',
      'secondary',
    ] as const;

    variants.forEach((variant) => {
      const { unmount } = render(
        <DefaultThemeProvider>
          <SafeAreaProvider initialMetrics={SAFE_AREA_METRICS}>
            <DefaultSelect
              label={`${variant} variant`}
              placeholder="Choose option"
              variant={variant}
            />
          </SafeAreaProvider>
        </DefaultThemeProvider>,
      );

      expect(screen.getByText(`${variant} variant`)).toBeTruthy();
      unmount();
    });
  });

  it('renders with helper text and label together', () => {
    render(
      <DefaultThemeProvider>
        <SafeAreaProvider initialMetrics={SAFE_AREA_METRICS}>
          <DefaultSelect
            helperText="This is helper text"
            label="Label with Helper"
            placeholder="Choose option"
          />
        </SafeAreaProvider>
      </DefaultThemeProvider>,
    );

    expect(screen.getByText('Label with Helper')).toBeTruthy();
    expect(screen.getByText('This is helper text')).toBeTruthy();
  });

  it('handles disabled state correctly', () => {
    const onPressSpy = jest.fn();

    render(
      <DefaultThemeProvider>
        <SafeAreaProvider initialMetrics={SAFE_AREA_METRICS}>
          <DefaultSelect
            disabled
            label="Disabled Select"
            onPress={onPressSpy}
            placeholder="Cannot select"
          />
        </SafeAreaProvider>
      </DefaultThemeProvider>,
    );

    expect(screen.getByText('Disabled Select')).toBeTruthy();
    expect(screen.getByText('Cannot select')).toBeTruthy();

    fireEvent.press(screen.getByText('Cannot select'));
    expect(onPressSpy).not.toHaveBeenCalled();
  });

  it('supports accessibility props correctly', () => {
    render(
      <DefaultThemeProvider>
        <SafeAreaProvider initialMetrics={SAFE_AREA_METRICS}>
          <DefaultSelect
            accessibilityHint="Select an option from the list"
            accessibilityLabel="Options selector"
            placeholder="Choose option"
            testID="accessible-select"
          />
        </SafeAreaProvider>
      </DefaultThemeProvider>,
    );

    const selectElement = screen.getByTestId('accessible-select');
    expect(selectElement).toBeAccessible();
    expect(selectElement).toBeTruthy();
  });
});
