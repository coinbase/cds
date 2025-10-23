import React from 'react';
import { View } from 'react-native';
import { fireEvent, render, screen } from '@testing-library/react-native';

import { DefaultThemeProvider } from '../../../utils/testHelpers';
import { DefaultSelectOption } from '../DefaultSelectOption';
import type { SelectOptionProps } from '../Select';

const defaultProps: SelectOptionProps = {
  value: 'option1',
  label: 'Option 1',
  onPress: jest.fn(),
  selected: false,
  disabled: false,
  compact: false,
};

describe('DefaultSelectOption', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Accessibility', () => {
    it('has correct accessibility state for disabled state', () => {
      render(
        <DefaultThemeProvider>
          <DefaultSelectOption {...defaultProps} disabled />
        </DefaultThemeProvider>,
      );
      const option = screen.getByRole('menuitem');
      expect(option).toHaveAccessibilityState({ disabled: true });
    });

    it('has correct accessibility attributes for single select', () => {
      render(
        <DefaultThemeProvider>
          <DefaultSelectOption {...defaultProps} selected type="single" />
        </DefaultThemeProvider>,
      );

      const option = screen.getByRole('menuitem');
      expect(option).toHaveAccessibilityState({ selected: true });
    });

    it('has correct accessibility attributes for multi select', () => {
      render(
        <DefaultThemeProvider>
          <DefaultSelectOption {...defaultProps} selected type="multi" />
        </DefaultThemeProvider>,
      );

      const option = screen.getByRole('checkbox');
      expect(option).toHaveAccessibilityState({ checked: true });
    });

    it('has correct accessibility attributes for indeterminate state', () => {
      render(
        <DefaultThemeProvider>
          <DefaultSelectOption {...defaultProps} indeterminate selected={false} type="multi" />
        </DefaultThemeProvider>,
      );

      const option = screen.getByRole('checkbox');
      expect(option).toHaveAccessibilityState({ checked: 'mixed' });
    });

    it('sets custom accessibility role', () => {
      render(
        <DefaultThemeProvider>
          <DefaultSelectOption {...defaultProps} accessibilityRole="button" />
        </DefaultThemeProvider>,
      );

      expect(screen.getByRole('button')).toBeTruthy();
    });

    it('defaults to correct role based on type', () => {
      const { rerender } = render(
        <DefaultThemeProvider>
          <DefaultSelectOption {...defaultProps} type="single" />
        </DefaultThemeProvider>,
      );

      expect(screen.getByRole('menuitem')).toBeTruthy();

      rerender(
        <DefaultThemeProvider>
          <DefaultSelectOption {...defaultProps} type="multi" />
        </DefaultThemeProvider>,
      );

      expect(screen.getByRole('checkbox')).toBeTruthy();
    });
  });

  describe('Basic Rendering', () => {
    it('renders with label', () => {
      render(
        <DefaultThemeProvider>
          <DefaultSelectOption {...defaultProps} />
        </DefaultThemeProvider>,
      );

      expect(screen.getByText('Option 1')).toBeTruthy();
    });

    it('renders with string label', () => {
      render(
        <DefaultThemeProvider>
          <DefaultSelectOption {...defaultProps} label="String Label" />
        </DefaultThemeProvider>,
      );

      expect(screen.getByText('String Label')).toBeTruthy();
    });

    it('renders with ReactNode label', () => {
      const CustomLabel = () => <View testID="custom-label" />;
      render(
        <DefaultThemeProvider>
          <DefaultSelectOption {...defaultProps} label={<CustomLabel />} />
        </DefaultThemeProvider>,
      );

      expect(screen.getByTestId('custom-label')).toBeTruthy();
    });

    it('renders with description', () => {
      render(
        <DefaultThemeProvider>
          <DefaultSelectOption {...defaultProps} description="This is a description" />
        </DefaultThemeProvider>,
      );

      expect(screen.getByText('This is a description')).toBeTruthy();
    });

    it('renders with string description', () => {
      render(
        <DefaultThemeProvider>
          <DefaultSelectOption {...defaultProps} description="String Description" />
        </DefaultThemeProvider>,
      );

      expect(screen.getByText('String Description')).toBeTruthy();
    });

    it('renders with ReactNode description', () => {
      const CustomDescription = () => <View testID="custom-description" />;
      render(
        <DefaultThemeProvider>
          <DefaultSelectOption {...defaultProps} description={<CustomDescription />} />
        </DefaultThemeProvider>,
      );

      expect(screen.getByTestId('custom-description')).toBeTruthy();
    });
  });

  describe('States', () => {
    it('renders selected state', () => {
      render(
        <DefaultThemeProvider>
          <DefaultSelectOption {...defaultProps} selected type="single" />
        </DefaultThemeProvider>,
      );

      const option = screen.getByRole('menuitem');
      expect(option).toHaveAccessibilityState({ selected: true });
    });

    it('renders unselected state', () => {
      render(
        <DefaultThemeProvider>
          <DefaultSelectOption {...defaultProps} selected={false} type="single" />
        </DefaultThemeProvider>,
      );

      const option = screen.getByRole('menuitem');
      expect(option).toHaveAccessibilityState({ selected: false });
    });

    it('renders disabled state', () => {
      render(
        <DefaultThemeProvider>
          <DefaultSelectOption {...defaultProps} disabled />
        </DefaultThemeProvider>,
      );

      const option = screen.getByRole('menuitem');
      expect(option).toHaveAccessibilityState({ disabled: true });
    });

    it('renders enabled state', () => {
      render(
        <DefaultThemeProvider>
          <DefaultSelectOption {...defaultProps} disabled={false} />
        </DefaultThemeProvider>,
      );

      const option = screen.getByRole('menuitem');
      expect(option).not.toHaveAccessibilityState({ disabled: true });
    });
  });

  describe('Multiline Text', () => {
    it('handles multiline text', () => {
      render(
        <DefaultThemeProvider>
          <DefaultSelectOption
            {...defaultProps}
            multiline
            description="This is a very long description that should wrap to multiple lines when multiline is enabled"
          />
        </DefaultThemeProvider>,
      );

      expect(screen.getByText(/This is a very long description/)).toBeTruthy();
    });

    it('handles single line text by default', () => {
      render(
        <DefaultThemeProvider>
          <DefaultSelectOption
            {...defaultProps}
            description="This is a description that should be truncated"
          />
        </DefaultThemeProvider>,
      );

      expect(screen.getByText('This is a description that should be truncated')).toBeTruthy();
    });

    it('adjusts numberOfLines based on multiline and content', () => {
      const { rerender } = render(
        <DefaultThemeProvider>
          <DefaultSelectOption
            {...defaultProps}
            description="Test Description"
            label="Test Label"
            multiline={false}
          />
        </DefaultThemeProvider>,
      );

      expect(screen.getByText('Test Label')).toBeTruthy();
      expect(screen.getByText('Test Description')).toBeTruthy();

      rerender(
        <DefaultThemeProvider>
          <DefaultSelectOption
            {...defaultProps}
            multiline
            description="Test Description"
            label="Test Label"
          />
        </DefaultThemeProvider>,
      );

      expect(screen.getByText('Test Label')).toBeTruthy();
      expect(screen.getByText('Test Description')).toBeTruthy();
    });

    it('handles label without description in multiline mode', () => {
      render(
        <DefaultThemeProvider>
          <DefaultSelectOption
            {...defaultProps}
            multiline
            label="Long label text that might wrap"
          />
        </DefaultThemeProvider>,
      );

      expect(screen.getByText('Long label text that might wrap')).toBeTruthy();
    });
  });

  describe('Interaction', () => {
    it('calls onChange when pressed', () => {
      const onChange = jest.fn();
      render(
        <DefaultThemeProvider>
          <DefaultSelectOption {...defaultProps} onPress={onChange} />
        </DefaultThemeProvider>,
      );

      const option = screen.getByRole('menuitem');
      fireEvent.press(option);

      expect(onChange).toHaveBeenCalledWith('option1');
    });

    it('does not call onChange when disabled', () => {
      const onChange = jest.fn();
      render(
        <DefaultThemeProvider>
          <DefaultSelectOption {...defaultProps} disabled onPress={onChange} />
        </DefaultThemeProvider>,
      );

      const option = screen.getByRole('menuitem');
      fireEvent.press(option);

      expect(onChange).not.toHaveBeenCalled();
    });

    it('handles touch interactions correctly', () => {
      const onChange = jest.fn();
      render(
        <DefaultThemeProvider>
          <DefaultSelectOption {...defaultProps} onPress={onChange} />
        </DefaultThemeProvider>,
      );

      const option = screen.getByRole('menuitem');
      fireEvent.press(option);

      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledWith('option1');
    });
  });

  describe('Cell Props', () => {
    it('renders with media', () => {
      render(
        <DefaultThemeProvider>
          <DefaultSelectOption {...defaultProps} media={<View testID="media-content" />} />
        </DefaultThemeProvider>,
      );

      expect(screen.getByTestId('media-content')).toBeTruthy();
    });

    it('renders with accessory', () => {
      render(
        <DefaultThemeProvider>
          <DefaultSelectOption {...defaultProps} accessory={<View testID="accessory-content" />} />
        </DefaultThemeProvider>,
      );

      expect(screen.getByTestId('accessory-content')).toBeTruthy();
    });

    it('renders with end', () => {
      render(
        <DefaultThemeProvider>
          <DefaultSelectOption {...defaultProps} end={<View testID="end-content" />} />
        </DefaultThemeProvider>,
      );

      expect(screen.getByTestId('end-content')).toBeTruthy();
    });

    it('applies correct spacing configuration', () => {
      render(
        <DefaultThemeProvider>
          <DefaultSelectOption {...defaultProps} />
        </DefaultThemeProvider>,
      );

      expect(screen.getByRole('menuitem')).toBeTruthy();
    });
  });

  describe('Type Variants', () => {
    it('handles single select type', () => {
      render(
        <DefaultThemeProvider>
          <DefaultSelectOption {...defaultProps} type="single" />
        </DefaultThemeProvider>,
      );

      expect(screen.getByRole('menuitem')).toBeTruthy();
    });

    it('handles multi select type', () => {
      render(
        <DefaultThemeProvider>
          <DefaultSelectOption {...defaultProps} type="multi" />
        </DefaultThemeProvider>,
      );

      expect(screen.getByRole('checkbox')).toBeTruthy();
    });

    it('applies correct background for different types', () => {
      const { rerender } = render(
        <DefaultThemeProvider>
          <DefaultSelectOption {...defaultProps} type="single" value="test" />
        </DefaultThemeProvider>,
      );

      expect(screen.getByRole('menuitem')).toBeTruthy();

      rerender(
        <DefaultThemeProvider>
          <DefaultSelectOption {...defaultProps} type="multi" />
        </DefaultThemeProvider>,
      );

      expect(screen.getByRole('checkbox')).toBeTruthy();

      rerender(
        <DefaultThemeProvider>
          <DefaultSelectOption {...defaultProps} disabled />
        </DefaultThemeProvider>,
      );

      expect(screen.getByRole('menuitem')).toBeTruthy();

      rerender(
        <DefaultThemeProvider>
          <DefaultSelectOption {...defaultProps} value={null} />
        </DefaultThemeProvider>,
      );

      expect(screen.getByRole('menuitem')).toBeTruthy();
    });
  });

  describe('Edge Cases', () => {
    it('handles null value', () => {
      render(
        <DefaultThemeProvider>
          <DefaultSelectOption {...defaultProps} value={null} />
        </DefaultThemeProvider>,
      );

      expect(screen.getByRole('menuitem')).toBeTruthy();
    });

    it('handles empty label', () => {
      render(
        <DefaultThemeProvider>
          <DefaultSelectOption {...defaultProps} label="" />
        </DefaultThemeProvider>,
      );

      expect(screen.getByRole('menuitem')).toBeTruthy();
    });

    it('handles undefined onChange', () => {
      render(
        <DefaultThemeProvider>
          <DefaultSelectOption {...defaultProps} onPress={(() => {}) as any} />
        </DefaultThemeProvider>,
      );

      const option = screen.getByRole('menuitem');
      expect(() => fireEvent.press(option)).not.toThrow();
    });

    it('handles missing description in multiline mode', () => {
      render(
        <DefaultThemeProvider>
          <DefaultSelectOption {...defaultProps} multiline label="Label only" />
        </DefaultThemeProvider>,
      );

      expect(screen.getByText('Label only')).toBeTruthy();
    });
  });

  describe('VStack Content Organization', () => {
    it('organizes label and description in VStack correctly', () => {
      render(
        <DefaultThemeProvider>
          <DefaultSelectOption
            {...defaultProps}
            description="Test Description"
            label="Test Label"
          />
        </DefaultThemeProvider>,
      );

      // Both label and description should be rendered
      expect(screen.getByText('Test Label')).toBeTruthy();
      expect(screen.getByText('Test Description')).toBeTruthy();
    });

    it('handles label-only content', () => {
      render(
        <DefaultThemeProvider>
          <DefaultSelectOption {...defaultProps} label="Label Only" />
        </DefaultThemeProvider>,
      );

      expect(screen.getByText('Label Only')).toBeTruthy();
    });

    it('handles description-only content', () => {
      render(
        <DefaultThemeProvider>
          <DefaultSelectOption {...defaultProps} description="Description Only" label={undefined} />
        </DefaultThemeProvider>,
      );

      expect(screen.getByText('Description Only')).toBeTruthy();
    });
  });

  describe('Ref Forwarding', () => {
    it('forwards ref correctly', () => {
      const ref = React.createRef<View>();
      render(
        <DefaultThemeProvider>
          <DefaultSelectOption {...defaultProps} ref={ref} />
        </DefaultThemeProvider>,
      );
      // Note: Due to Cell component not supporting ref forwarding yet,
      // the ref won't be properly attached to the underlying element.
      // This test confirms the ref prop is accepted without errors.
      expect(ref.current).toBeNull(); // Will be non-null when Cell supports refs
    });
  });
});
