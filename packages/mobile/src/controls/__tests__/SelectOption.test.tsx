import { render, screen } from '@testing-library/react-native';

import { DefaultThemeProvider } from '../../utils/testHelpers';
import { SelectOption } from '../SelectOption';

const TEST_ID = 'select-option-test';

describe('Accessibility', () => {
  it('passes a11y', () => {
    render(
      <DefaultThemeProvider>
        <SelectOption description="Description" testID={TEST_ID} title="Title" value="Value" />
      </DefaultThemeProvider>,
    );

    expect(screen.getByTestId(TEST_ID)).toBeAccessible();
  });
  it('AccessibilityLabel set to title. AccessibilityHint set to hint', () => {
    render(
      <DefaultThemeProvider>
        <SelectOption description="Description" testID={TEST_ID} title="Title" value="Value" />
      </DefaultThemeProvider>,
    );

    expect(screen.getByLabelText('Title')).toBeTruthy();
    expect(screen.getByA11yHint('Description')).toBeTruthy();
  });

  it('AccessibilityLabel and AccessibilityHint set to custom value', () => {
    render(
      <DefaultThemeProvider>
        <SelectOption
          accessibilityHint="Custom Hint"
          accessibilityLabel="Custom Label"
          description="Description"
          testID={TEST_ID}
          title="Title"
          value="Value"
        />
      </DefaultThemeProvider>,
    );

    expect(screen.getByLabelText('Custom Label')).toBeTruthy();
    expect(screen.getByA11yHint('Custom Hint')).toBeTruthy();
  });
});
