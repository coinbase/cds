import React from 'react';
import type { View } from 'react-native';
import { NoopFn } from '@coinbase/cds-common/utils/mockUtils';
import { fireEvent, render, screen } from '@testing-library/react-native';

import { Button } from '../../buttons';
import { ButtonGroup } from '../../buttons/ButtonGroup';
import { LogoMark } from '../../icons';
import { Box, VStack } from '../../layout';
import { Text } from '../../typography/Text';
import { DefaultThemeProvider } from '../../utils/testHelpers';
import type { MultiContentModuleProps } from '../MultiContentModule';
import { MultiContentModule } from '../MultiContentModule';

const exampleProps: MultiContentModuleProps = {
  title: 'Title',
  description: 'Description',
  pictogram: 'waiting',
  testID: 'mcm',
};

describe('MultiContentModule', () => {
  it('passes accessibility', () => {
    render(
      <DefaultThemeProvider>
        <MultiContentModule {...exampleProps} />
      </DefaultThemeProvider>,
    );
    expect(screen.getByTestId('mcm')).toBeAccessible();
  });

  it('passes accessibility when passing action', () => {
    render(
      <DefaultThemeProvider>
        <MultiContentModule
          {...exampleProps}
          action="Button"
          actionAccessibilityLabel="Button Label"
          onActionPress={NoopFn}
        />
      </DefaultThemeProvider>,
    );
    expect(screen.getByTestId('mcm')).toBeAccessible();
  });

  it('renders pictogram, title and description correctly', () => {
    render(
      <DefaultThemeProvider>
        <MultiContentModule {...exampleProps} />
      </DefaultThemeProvider>,
    );
    const title = screen.getByText('Title');
    expect(title).toBeTruthy();
    expect(title.props.role).toBe('heading');
    expect(screen.getByText('Description')).toBeTruthy();
    expect(screen.getByTestId('mcm-pictogram')).toBeTruthy();
    expect(screen.getByTestId('mcm-primary-content')).toBeTruthy();
  });

  it('renders custom node for pictogram', () => {
    const pictogram = (
      <Box testID="custom-pictogram">
        <LogoMark size={32} />
      </Box>
    );
    render(
      <DefaultThemeProvider>
        <MultiContentModule {...exampleProps} pictogram={pictogram} />
      </DefaultThemeProvider>,
    );
    expect(screen.getByTestId('custom-pictogram')).toBeTruthy();
  });

  it('renders custom node for title', () => {
    const title = (
      <Text font="display1" testID="custom-title">
        Custom Title
      </Text>
    );
    render(
      <DefaultThemeProvider>
        <MultiContentModule {...exampleProps} title={title} />
      </DefaultThemeProvider>,
    );
    expect(screen.getByTestId('custom-title')).toBeTruthy();
  });

  it('renders custom node for description', () => {
    const description = (
      <Text font="body" testID="custom-description">
        Custom Description
      </Text>
    );
    render(
      <DefaultThemeProvider>
        <MultiContentModule {...exampleProps} description={description} />
      </DefaultThemeProvider>,
    );
    expect(screen.getByTestId('custom-description')).toBeTruthy();
  });

  it('renders children correctly', () => {
    render(
      <DefaultThemeProvider>
        <MultiContentModule {...exampleProps}>
          <Text font="body">primary content</Text>
        </MultiContentModule>
      </DefaultThemeProvider>,
    );
    expect(screen.getByText('primary content')).toBeTruthy();
  });

  it('renders action correctly', () => {
    const spy = jest.fn();
    render(
      <DefaultThemeProvider>
        <MultiContentModule
          {...exampleProps}
          action="Button"
          actionAccessibilityLabel="Button Label"
          onActionPress={spy}
        />
      </DefaultThemeProvider>,
    );
    expect(screen.getByText('Button')).toBeTruthy();
    expect(screen.getByLabelText('Button Label')).toBeTruthy();

    fireEvent.press(screen.getByRole('button'));
    expect(spy).toHaveBeenCalled();
  });

  it('renders custom node for action', () => {
    const action = (
      <VStack paddingTop={2}>
        <ButtonGroup accessibilityLabel="Group" direction="vertical">
          <Button onPress={NoopFn} testID="continue-btn">
            Continue
          </Button>
          <Button onPress={NoopFn} testID="cancel-btn" variant="secondary">
            Cancel
          </Button>
        </ButtonGroup>
      </VStack>
    );
    render(
      <DefaultThemeProvider>
        <MultiContentModule {...exampleProps} action={action} />
      </DefaultThemeProvider>,
    );
    expect(screen.getByTestId('continue-btn')).toBeTruthy();
    expect(screen.getByTestId('cancel-btn')).toBeTruthy();
  });

  it('sets aria-label correctly', () => {
    render(
      <DefaultThemeProvider>
        <MultiContentModule {...exampleProps} accessibilityLabel="Test Aria Label" />
      </DefaultThemeProvider>,
    );
    expect(screen.getByLabelText('Test Aria Label')).toBeTruthy();
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<View>();
    render(
      <DefaultThemeProvider>
        <MultiContentModule {...exampleProps} ref={ref} />
      </DefaultThemeProvider>,
    );
    expect(ref.current).not.toBeNull();
  });
});
