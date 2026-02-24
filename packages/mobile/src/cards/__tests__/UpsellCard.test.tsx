import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { assets } from '@coinbase/cds-common/internal/data/assets';
import { NoopFn } from '@coinbase/cds-common/utils/mockUtils';
import { fireEvent, render, screen } from '@testing-library/react-native';

import { Button } from '../../buttons';
import { DefaultThemeProvider } from '../../utils/testHelpers';
import type { UpsellCardProps } from '../UpsellCard';
import { UpsellCard } from '../UpsellCard';

const styles = StyleSheet.create({
  media: {
    width: 32,
    height: 32,
    objectFit: 'cover',
    borderRadius: 100,
  },
  children: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
});

const exampleProps: UpsellCardProps = {
  title: 'Test Title',
  description: 'Test Description',
  action: 'Test Action' as string,
  onActionPress: NoopFn,
  onDismissPress: NoopFn,
  testID: 'upsell-card-test',
  media: (
    <Image
      accessibilityIgnoresInvertColors
      data-testid="media"
      source={{
        uri: assets.btc.imageUrl,
      }}
      style={styles.media}
    />
  ),
  accessibilityLabel: 'Dismiss',
};

const compactProps = {
  title: "It's Onchain Summer!",
  description: 'Stand with crypto and mint your NFT.',
  testID: 'upsell-card-test',
  media: (
    <Image
      accessibilityIgnoresInvertColors
      data-testid="media"
      source={{
        uri: assets.btc.imageUrl,
      }}
      style={styles.media}
    />
  ),
};

describe('UpsellCard', () => {
  it('passes accessibility', async () => {
    render(
      <DefaultThemeProvider>
        <UpsellCard {...exampleProps} />
      </DefaultThemeProvider>,
    );
    expect(screen.getByTestId(exampleProps.testID as string)).toBeAccessible();
  });

  it('renders title, description, action and dismiss', () => {
    render(
      <DefaultThemeProvider>
        <UpsellCard {...exampleProps} />
      </DefaultThemeProvider>,
    );
    expect(screen.getByText('Test Title')).toBeDefined();
    expect(screen.getByText('Test Description')).toBeDefined();
    expect(screen.getByRole('button', { name: 'Test Action' })).toBeDefined();
    expect(screen.getByTestId(`${exampleProps.testID}-dismiss-button`)).toBeDefined();
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
    fireEvent.press(screen.getByText(exampleProps.action as string));
    expect(onActionPressMock).toHaveBeenCalled();
  });

  it('calls onDismissPress on dismiss button click', () => {
    const onDismissPressMock = jest.fn();
    render(
      <DefaultThemeProvider>
        <UpsellCard {...exampleProps} onDismissPress={onDismissPressMock} />
      </DefaultThemeProvider>,
    );
    fireEvent.press(screen.getByTestId(`${exampleProps.testID}-dismiss-button`));
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
    expect(screen.getByTestId('custom-action-button')).toBeVisible();
  });
  it('does not render action button if action prop is not passed', () => {
    const { action, ...propsWithoutAction } = exampleProps;
    render(
      <DefaultThemeProvider>
        <UpsellCard {...propsWithoutAction} />
      </DefaultThemeProvider>,
    );
    const actionButton = screen.queryByRole('button', { name: 'Test Action' });
    expect(actionButton).toBeNull();
  });
  it('calls onPress when the card is pressed', () => {
    const onPressFn = jest.fn();
    render(
      <DefaultThemeProvider>
        <UpsellCard onPress={onPressFn} {...compactProps} />
      </DefaultThemeProvider>,
    );

    fireEvent.press(screen.getByText(`${compactProps.title}`));

    expect(onPressFn).toHaveBeenCalled();
  });
});
