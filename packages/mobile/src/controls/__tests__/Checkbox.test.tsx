import { Pressable } from 'react-native';
import { glyphMap } from '@coinbase/cds-icons/glyphMap';
import { fireEvent, render, screen, within } from '@testing-library/react-native';

import { defaultTheme } from '../../themes/defaultTheme';
import { DefaultThemeProvider } from '../../utils/testHelpers';
import { Checkbox } from '../Checkbox';

describe('Checkbox', () => {
  it('passes a11y', () => {
    render(
      <DefaultThemeProvider>
        <Checkbox testID="mock-checkbox">Checkbox</Checkbox>
      </DefaultThemeProvider>,
    );
    expect(screen.getByTestId('mock-checkbox')).toBeAccessible();
  });

  it('renders a Pressable', () => {
    render(
      <DefaultThemeProvider>
        <Checkbox>Checkbox</Checkbox>
      </DefaultThemeProvider>,
    );

    expect(screen.UNSAFE_queryAllByType(Pressable)).toHaveLength(1);
    expect(screen.getByText('Checkbox')).toBeTruthy();
  });

  it('renders a check icon when checked', () => {
    render(
      <DefaultThemeProvider>
        <Checkbox checked>Checked</Checkbox>
      </DefaultThemeProvider>,
    );

    const icon = screen.getByText(glyphMap['checkmark-24-inactive']);
    expect(icon).toBeTruthy();
  });
  it('checked Checkbox passes a11y', () => {
    render(
      <DefaultThemeProvider>
        <Checkbox checked testID="mock-checkbox">
          Checkbox
        </Checkbox>
      </DefaultThemeProvider>,
    );
    expect(screen.getByTestId('mock-checkbox')).toBeAccessible();
  });

  it('applies controlSize to checkbox container', () => {
    render(
      <DefaultThemeProvider>
        <Checkbox checked controlSize={60} testID="test-checkbox">
          Checked
        </Checkbox>
      </DefaultThemeProvider>,
    );

    expect(screen.getByTestId('test-checkbox')).toHaveStyle({
      width: 60,
      height: 60,
    });
  });

  it('renders a minus icon when indeterminate', () => {
    render(
      <DefaultThemeProvider>
        <Checkbox indeterminate>Indeterminate</Checkbox>
      </DefaultThemeProvider>,
    );

    const icon = screen.getByText(glyphMap['minus-24-inactive']);
    expect(icon).toBeTruthy();
  });

  it('indeterminate Checkbox passes a11y', () => {
    render(
      <DefaultThemeProvider>
        <Checkbox indeterminate testID="mock-checkbox">
          Checkbox
        </Checkbox>
      </DefaultThemeProvider>,
    );
    expect(screen.getByTestId('mock-checkbox')).toBeAccessible();
  });

  it('attaches testID', () => {
    const TEST_ID = 'checkbox-testid-test';
    render(
      <DefaultThemeProvider>
        <Checkbox testID={TEST_ID}>Checkbox</Checkbox>
      </DefaultThemeProvider>,
    );

    expect(screen.queryAllByTestId(TEST_ID)).toHaveLength(1);
  });

  it('has accessibility role checkbox', () => {
    render(
      <DefaultThemeProvider>
        <Checkbox>Checkbox</Checkbox>
      </DefaultThemeProvider>,
    );

    expect(screen.queryAllByRole('checkbox')).toHaveLength(1);
  });

  it('has accessibility state checked when checked', () => {
    render(
      <DefaultThemeProvider>
        <Checkbox checked>Checked</Checkbox>
      </DefaultThemeProvider>,
    );

    expect(screen.queryAllByA11yState({ checked: true })).toHaveLength(1);
  });

  it('has accessibility state disabled when disabled', () => {
    render(
      <DefaultThemeProvider>
        <Checkbox disabled>Disabled</Checkbox>
      </DefaultThemeProvider>,
    );

    expect(screen.queryAllByA11yState({ disabled: true })).toHaveLength(1);
  });

  it('disabled checkbox passes a11y', () => {
    render(
      <DefaultThemeProvider>
        <Checkbox disabled testID="disabled-checkbox">
          Disabled
        </Checkbox>
      </DefaultThemeProvider>,
    );

    expect(screen.getByTestId('disabled-checkbox')).toBeAccessible();
  });

  it('fires `onChange` when pressed and not disabled', () => {
    const spy = jest.fn();
    render(
      <DefaultThemeProvider>
        <Checkbox onChange={spy}>Checkbox</Checkbox>
      </DefaultThemeProvider>,
    );

    fireEvent.press(screen.getByText('Checkbox'));

    expect(spy).toHaveBeenCalled();
  });

  it('if children is a string, the accessibilityLabel and accessibilityHint is set to its children by default', () => {
    render(
      <DefaultThemeProvider>
        <Checkbox>Checkbox</Checkbox>
      </DefaultThemeProvider>,
    );

    expect(screen.getByLabelText('Checkbox')).toBeTruthy();
    expect(screen.getByA11yHint('Checkbox')).toBeTruthy();
  });

  it('if children is a string, you can still override the accessibilityLabel and accessibilityHint', () => {
    render(
      <DefaultThemeProvider>
        <Checkbox accessibilityHint="Custom Checkbox" accessibilityLabel="Custom Checkbox">
          Checkbox
        </Checkbox>
      </DefaultThemeProvider>,
    );

    expect(screen.getByLabelText('Custom Checkbox')).toBeTruthy();
    expect(screen.getByA11yHint('Custom Checkbox')).toBeTruthy();
  });

  it('does not fires `onChange` when disabled and pressed', () => {
    const spy = jest.fn();
    render(
      <DefaultThemeProvider>
        <Checkbox disabled onChange={spy}>
          Checkbox
        </Checkbox>
      </DefaultThemeProvider>,
    );

    fireEvent.press(screen.getByText('Checkbox'));

    expect(spy).not.toHaveBeenCalled();
  });

  it('has default color when unchecked', () => {
    render(
      <DefaultThemeProvider>
        <Checkbox testID="test-checkbox">Unchecked</Checkbox>
      </DefaultThemeProvider>,
    );

    expect(screen.getByTestId('test-checkbox')).toHaveStyle({
      backgroundColor: defaultTheme.lightColor.bg,
      borderColor: defaultTheme.lightColor.bgLineHeavy,
    });
  });

  it('has default color when checked', () => {
    render(
      <DefaultThemeProvider>
        <Checkbox checked testID="test-checkbox">
          Checked
        </Checkbox>
      </DefaultThemeProvider>,
    );

    expect(screen.getByTestId('test-checkbox')).toHaveStyle({
      backgroundColor: defaultTheme.lightColor.bgPrimary,
      borderColor: defaultTheme.lightColor.bgPrimary,
    });
  });

  it('applies custom controlColor prop when checked', () => {
    render(
      <DefaultThemeProvider>
        <Checkbox checked controlColor="bgPositive" testID="test-checkbox">
          Checked
        </Checkbox>
      </DefaultThemeProvider>,
    );

    const iconBox = screen.getByTestId('checkbox-icon');
    // The icon glyph is inside the Box, find the Text element by role
    const iconText = within(iconBox).getByRole('image');
    expect(iconText).toHaveStyle({
      color: defaultTheme.lightColor.bgPositive,
    });
  });

  it('applies custom controlColor prop when indeterminate', () => {
    render(
      <DefaultThemeProvider>
        <Checkbox indeterminate controlColor="bgWarning" testID="test-checkbox">
          Indeterminate
        </Checkbox>
      </DefaultThemeProvider>,
    );

    const iconBox = screen.getByTestId('checkbox-icon');
    // The icon glyph is inside the Box, find the Text element by role
    const iconText = within(iconBox).getByRole('image');
    expect(iconText).toHaveStyle({
      color: defaultTheme.lightColor.bgWarning,
    });
  });

  it('uses bg color when unchecked regardless of controlColor prop', () => {
    render(
      <DefaultThemeProvider>
        <Checkbox controlColor="bgPositive" testID="test-checkbox">
          Unchecked
        </Checkbox>
      </DefaultThemeProvider>,
    );

    expect(screen.getByTestId('test-checkbox')).toHaveStyle({
      backgroundColor: defaultTheme.lightColor.bg,
      borderColor: defaultTheme.lightColor.bgLineHeavy,
    });
  });
});
