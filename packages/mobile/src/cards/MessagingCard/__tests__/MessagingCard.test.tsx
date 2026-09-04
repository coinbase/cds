import { Text } from 'react-native';
import { NoopFn } from '@coinbase/cds-common/utils/mockUtils';
import { fireEvent, render, screen } from '@testing-library/react-native';

import { Button } from '../../../buttons/Button';
import { Pictogram } from '../../../illustrations';
import { DefaultThemeProvider } from '../../../utils/testHelpers';
import { MessagingCard } from '..';

const exampleProps = {
  title: 'Test Title',
  description: 'Test Description',
  mediaPlacement: 'end' as const,
  type: 'upsell' as const,
  media: (
    <Pictogram accessibilityLabel="Add to watchlist" dimension="48x48" name="addToWatchlist" />
  ),
  testID: 'messaging-card-test',
};

describe('MessagingCard', () => {
  it('passes accessibility for upsell type', () => {
    render(
      <DefaultThemeProvider>
        <MessagingCard {...exampleProps} type="upsell" />
      </DefaultThemeProvider>,
    );
    expect(screen.getByTestId(exampleProps.testID)).toBeAccessible();
  });

  it('passes accessibility for nudge type', () => {
    render(
      <DefaultThemeProvider>
        <MessagingCard {...exampleProps} type="nudge" />
      </DefaultThemeProvider>,
    );
    expect(screen.getByTestId(exampleProps.testID)).toBeAccessible();
  });

  it('passes accessibility when dismissable', () => {
    render(
      <DefaultThemeProvider>
        <MessagingCard
          {...exampleProps}
          dismissButtonAccessibilityLabel="Dismiss card"
          onDismissButtonPress={NoopFn}
        />
      </DefaultThemeProvider>,
    );
    expect(screen.getByTestId(exampleProps.testID)).toBeAccessible();
  });

  it('renders the card with the correct title', () => {
    render(
      <DefaultThemeProvider>
        <MessagingCard {...exampleProps} />
      </DefaultThemeProvider>,
    );
    expect(screen.getByText(exampleProps.title)).toBeTruthy();
  });

  it('renders the card with the correct description', () => {
    render(
      <DefaultThemeProvider>
        <MessagingCard {...exampleProps} />
      </DefaultThemeProvider>,
    );
    expect(screen.getByText(exampleProps.description)).toBeTruthy();
  });

  it('renders the card with a tag', () => {
    render(
      <DefaultThemeProvider>
        <MessagingCard {...exampleProps} tag="New" />
      </DefaultThemeProvider>,
    );
    expect(screen.getByText('New')).toBeTruthy();
  });

  it('renders the card with a string action', () => {
    render(
      <DefaultThemeProvider>
        <MessagingCard {...exampleProps} action="Learn More" />
      </DefaultThemeProvider>,
    );
    expect(screen.getByText('Learn More')).toBeTruthy();
  });

  it('renders the card with a custom action button', () => {
    render(
      <DefaultThemeProvider>
        <MessagingCard
          {...exampleProps}
          action={<Button testID="custom-action">Custom Action</Button>}
        />
      </DefaultThemeProvider>,
    );
    expect(screen.getByTestId('custom-action')).toBeTruthy();
    expect(screen.getByText('Custom Action')).toBeTruthy();
  });

  it('calls onActionButtonPress when action button is pressed', () => {
    const onActionButtonPress = jest.fn();
    render(
      <DefaultThemeProvider>
        <MessagingCard
          {...exampleProps}
          action="Learn More"
          onActionButtonPress={onActionButtonPress}
        />
      </DefaultThemeProvider>,
    );
    fireEvent.press(screen.getByText('Learn More'));
    expect(onActionButtonPress).toHaveBeenCalled();
  });

  it('renders dismiss button when onDismissButtonPress is provided', () => {
    render(
      <DefaultThemeProvider>
        <MessagingCard
          {...exampleProps}
          dismissButtonAccessibilityLabel="Dismiss card"
          onDismissButtonPress={NoopFn}
        />
      </DefaultThemeProvider>,
    );
    expect(screen.getByLabelText('Dismiss card')).toBeTruthy();
  });

  it('calls onDismissButtonPress when dismiss button is pressed', () => {
    const onDismissButtonPress = jest.fn();
    render(
      <DefaultThemeProvider>
        <MessagingCard
          {...exampleProps}
          dismissButtonAccessibilityLabel="Dismiss card"
          onDismissButtonPress={onDismissButtonPress}
        />
      </DefaultThemeProvider>,
    );
    fireEvent.press(screen.getByLabelText('Dismiss card'));
    expect(onDismissButtonPress).toHaveBeenCalled();
  });

  it('renders custom dismiss button when provided', () => {
    render(
      <DefaultThemeProvider>
        <MessagingCard {...exampleProps} dismissButton={<Text testID="custom-dismiss">X</Text>} />
      </DefaultThemeProvider>,
    );
    expect(screen.getByTestId('custom-dismiss')).toBeTruthy();
  });

  it('renders media content', () => {
    render(
      <DefaultThemeProvider>
        <MessagingCard {...exampleProps} media={<Text testID="test-media">Media</Text>} />
      </DefaultThemeProvider>,
    );
    expect(screen.getByTestId('test-media')).toBeTruthy();
  });
});
