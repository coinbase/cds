import React from 'react';
import { renderA11y } from '@coinbase/cds-web-utils';
import { fireEvent, render, screen } from '@testing-library/react';

import { Button } from '../../buttons/Button';
import { DefaultThemeProvider } from '../../utils/test';
import { UpsellCard, type UpsellCardProps } from '../UpsellCard';

const exampleProps: UpsellCardProps = {
  title: 'Test Title',
  description: 'Test Description',
  action: 'Test Action',
  onActionPress: () => {},
  onDismissPress: () => {},
  testID: 'upsell-card-test',
  accessibilityLabel: 'Dismiss',
};

const compactProps: UpsellCardProps = {
  title: "It's Onchain Summer!",
  description: 'Stand with crypto and mint your NFT.',
  testID: 'upsell-card-test',
};

describe('UpsellCard', () => {
  it('passes accessibility', async () => {
    expect(
      await renderA11y(
        <DefaultThemeProvider>
          <UpsellCard {...exampleProps} />
        </DefaultThemeProvider>,
      ),
    ).toHaveNoViolations();
  });

  it('renders title, description, action, dismiss, and media', () => {
    render(
      <DefaultThemeProvider>
        <UpsellCard {...exampleProps} media={<div data-testid="media" />} />
      </DefaultThemeProvider>,
    );
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
    expect(screen.getByText('Test Action')).toBeInTheDocument();
    expect(screen.getByTestId('icon-base-glyph')).toBeInTheDocument();
    expect(screen.getByTestId('media')).toBeInTheDocument();
  });

  it('renders custom background via style prop', () => {
    render(
      <DefaultThemeProvider>
        <UpsellCard {...exampleProps} style={{ backgroundColor: '#d3d3d3' }} />
      </DefaultThemeProvider>,
    );
    expect(screen.getByTestId(exampleProps.testID as string)).toHaveStyle({
      backgroundColor: '#d3d3d3',
    });
  });

  it('calls onActionPress on action button click', async () => {
    const onActionPressMock = jest.fn();
    render(
      <DefaultThemeProvider>
        <UpsellCard {...exampleProps} onActionPress={onActionPressMock} />
      </DefaultThemeProvider>,
    );
    const actionButton = await screen.findByRole('button', { name: 'Test Action' });
    await actionButton.click();
    expect(onActionPressMock).toHaveBeenCalled();
  });

  it('calls onDismissPress on dismiss button click', () => {
    const onDismissPressMock = jest.fn();
    render(
      <DefaultThemeProvider>
        <UpsellCard {...exampleProps} onDismissPress={onDismissPressMock} />
      </DefaultThemeProvider>,
    );
    const dismissButton = screen.getByTestId(`${exampleProps.testID}-dismiss-button`);
    dismissButton.click();
    expect(onDismissPressMock).toHaveBeenCalled();
  });
  it('renders custom action button', () => {
    render(
      <DefaultThemeProvider>
        <UpsellCard
          {...exampleProps}
          action={
            <Button role="button" testID="custom-action-button">
              Custom Action
            </Button>
          }
        />
      </DefaultThemeProvider>,
    );
    expect(screen.getByTestId('custom-action-button')).toBeInTheDocument();
  });
  it('does not render action button if action prop is not passed', () => {
    const { action, ...propsWithoutAction } = exampleProps;
    render(
      <DefaultThemeProvider>
        <UpsellCard {...propsWithoutAction} />
      </DefaultThemeProvider>,
    );
    const actionButton = screen.queryByText('Test Action');
    expect(actionButton).not.toBeInTheDocument();
  });
  it('calls onClick when the card is pressed', () => {
    const onClickFn = jest.fn();
    render(
      <DefaultThemeProvider>
        <UpsellCard onClick={onClickFn} {...compactProps} />
      </DefaultThemeProvider>,
    );

    fireEvent.click(screen.getByText(`${compactProps.title}`));

    expect(onClickFn).toHaveBeenCalled();
  });
});
