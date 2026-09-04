import React from 'react';
import { renderA11y } from '@coinbase/cds-web-utils';
import { fireEvent, render, screen } from '@testing-library/react';

import { Button } from '../../buttons';
import { ButtonGroup } from '../../buttons/ButtonGroup';
import { LogoMark } from '../../icons';
import { Box, VStack } from '../../layout';
import { Text } from '../../typography/Text';
import { DefaultThemeProvider } from '../../utils/test';
import { MultiContentModule, type MultiContentModuleBaseProps } from '../MultiContentModule';

const exampleProps: MultiContentModuleBaseProps = {
  title: 'Title',
  description: 'Description',
  pictogram: 'waiting',
  testID: 'mcm',
};

describe('MultiContentModule', () => {
  it('passes accessibility', async () => {
    expect(
      await renderA11y(<MultiContentModule title={exampleProps.title} />),
    ).toHaveNoViolations();
  });

  it('passes accessibility when passing action', async () => {
    expect(
      await renderA11y(
        <DefaultThemeProvider>
          <MultiContentModule
            action="Button"
            actionAccessibilityLabel="Button Label"
            onActionPress={() => {}}
            title={exampleProps.title}
          />
        </DefaultThemeProvider>,
      ),
    ).toHaveNoViolations();
  });

  it('renders pictogram, title and description correctly', () => {
    render(
      <DefaultThemeProvider>
        <MultiContentModule {...exampleProps} />
      </DefaultThemeProvider>,
    );
    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Description')).toBeInTheDocument();
    expect(screen.getByTestId('mcm-pictogram')).toBeInTheDocument();
    expect(screen.queryByTestId('mcm-primary-content')).not.toBeInTheDocument();
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
    expect(screen.getByTestId('custom-pictogram')).toBeInTheDocument();
  });

  it('renders custom node for title', () => {
    const title = (
      <Text as="h1" display="block" font="display1" testID="custom-title">
        Custom Title
      </Text>
    );
    render(
      <DefaultThemeProvider>
        <MultiContentModule {...exampleProps} title={title} />
      </DefaultThemeProvider>,
    );
    expect(screen.getByTestId('custom-title')).toBeInTheDocument();
  });

  it('renders custom node for description', () => {
    const description = (
      <Text as="p" display="block" font="body" testID="custom-description">
        Custom Description
      </Text>
    );
    render(
      <DefaultThemeProvider>
        <MultiContentModule {...exampleProps} description={description} />
      </DefaultThemeProvider>,
    );
    expect(screen.getByTestId('custom-description')).toBeInTheDocument();
  });

  it('renders children correctly', () => {
    render(
      <DefaultThemeProvider>
        <MultiContentModule {...exampleProps}>
          <Text as="p" display="block" font="body">
            primary content
          </Text>
        </MultiContentModule>
      </DefaultThemeProvider>,
    );
    expect(screen.getByText('primary content')).toBeInTheDocument();
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
    expect(screen.getByText('Button')).toBeInTheDocument();
    expect(screen.getByLabelText('Button Label')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button'));
    expect(spy).toHaveBeenCalled();
  });

  it('renders custom node for action', () => {
    const action = (
      <VStack paddingTop={2}>
        <ButtonGroup accessibilityLabel="Group" direction="vertical">
          <Button onClick={() => {}} testID="continue-btn">
            Continue
          </Button>
          <Button onClick={() => {}} testID="cancel-btn" variant="secondary">
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
    expect(screen.getByTestId('continue-btn')).toBeInTheDocument();
    expect(screen.getByTestId('cancel-btn')).toBeInTheDocument();
  });

  it('sets aria-label correctly', () => {
    render(
      <DefaultThemeProvider>
        <MultiContentModule {...exampleProps} accessibilityLabel="Test Aria Label" />
      </DefaultThemeProvider>,
    );
    expect(screen.getByLabelText('Test Aria Label')).toBeInTheDocument();
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(
      <DefaultThemeProvider>
        <MultiContentModule {...exampleProps} ref={ref} />
      </DefaultThemeProvider>,
    );
    expect(ref.current).not.toBeNull();
  });
});
