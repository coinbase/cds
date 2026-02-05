import { renderA11y } from '@coinbase/cds-web-utils/jest';
import { fireEvent, render, screen } from '@testing-library/react';

import { Button } from '../../../buttons/Button';
import { Pictogram } from '../../../illustrations';
import { DefaultThemeProvider } from '../../../utils/test';
import { MessagingCard } from '..';

const NoopFn = () => {};

const exampleProps = {
  title: 'Test Title',
  description: 'Test Description',
  mediaPlacement: 'end' as const,
  type: 'upsell' as const,
  media: <Pictogram dimension="48x48" name="addToWatchlist" />,
};

describe('MessagingCard', () => {
  it('passes accessibility for upsell type', async () => {
    expect(
      await renderA11y(
        <DefaultThemeProvider>
          <MessagingCard {...exampleProps} type="upsell" />
        </DefaultThemeProvider>,
      ),
    ).toHaveNoViolations();
  });

  it('passes accessibility for nudge type', async () => {
    expect(
      await renderA11y(
        <DefaultThemeProvider>
          <MessagingCard {...exampleProps} type="nudge" />
        </DefaultThemeProvider>,
      ),
    ).toHaveNoViolations();
  });

  it('passes accessibility when dismissable', async () => {
    expect(
      await renderA11y(
        <DefaultThemeProvider>
          <MessagingCard
            {...exampleProps}
            dismissButtonAccessibilityLabel="Dismiss card"
            onDismissButtonClick={NoopFn}
          />
        </DefaultThemeProvider>,
      ),
    ).toHaveNoViolations();
  });

  it('renders the card with the correct title', () => {
    render(
      <DefaultThemeProvider>
        <MessagingCard {...exampleProps} />
      </DefaultThemeProvider>,
    );
    expect(screen.getByText(exampleProps.title)).toBeInTheDocument();
  });

  it('renders the card with the correct description', () => {
    render(
      <DefaultThemeProvider>
        <MessagingCard {...exampleProps} />
      </DefaultThemeProvider>,
    );
    expect(screen.getByText(exampleProps.description)).toBeInTheDocument();
  });

  it('renders the card with a tag', () => {
    render(
      <DefaultThemeProvider>
        <MessagingCard {...exampleProps} tag="New" />
      </DefaultThemeProvider>,
    );
    expect(screen.getByText('New')).toBeInTheDocument();
  });

  it('renders the card with a string action', () => {
    render(
      <DefaultThemeProvider>
        <MessagingCard {...exampleProps} action="Learn More" />
      </DefaultThemeProvider>,
    );
    expect(screen.getByText('Learn More')).toBeInTheDocument();
  });

  it('renders the card with a custom action button', () => {
    render(
      <DefaultThemeProvider>
        <MessagingCard
          {...exampleProps}
          action={<Button data-testid="custom-action">Custom Action</Button>}
        />
      </DefaultThemeProvider>,
    );
    expect(screen.getByTestId('custom-action')).toBeInTheDocument();
    expect(screen.getByText('Custom Action')).toBeInTheDocument();
  });

  it('calls onActionButtonClick when action button is clicked', () => {
    const onActionButtonClick = jest.fn();
    render(
      <DefaultThemeProvider>
        <MessagingCard
          {...exampleProps}
          action="Learn More"
          onActionButtonClick={onActionButtonClick}
        />
      </DefaultThemeProvider>,
    );
    fireEvent.click(screen.getByText('Learn More'));
    expect(onActionButtonClick).toHaveBeenCalled();
  });

  it('renders dismiss button when onDismissButtonClick is provided', () => {
    render(
      <DefaultThemeProvider>
        <MessagingCard
          {...exampleProps}
          dismissButtonAccessibilityLabel="Dismiss card"
          onDismissButtonClick={NoopFn}
        />
      </DefaultThemeProvider>,
    );
    expect(screen.getByLabelText('Dismiss card')).toBeInTheDocument();
  });

  it('calls onDismissButtonClick when dismiss button is clicked', () => {
    const onDismissButtonClick = jest.fn();
    render(
      <DefaultThemeProvider>
        <MessagingCard
          {...exampleProps}
          dismissButtonAccessibilityLabel="Dismiss card"
          onDismissButtonClick={onDismissButtonClick}
        />
      </DefaultThemeProvider>,
    );
    fireEvent.click(screen.getByLabelText('Dismiss card'));
    expect(onDismissButtonClick).toHaveBeenCalled();
  });

  it('renders custom dismiss button when provided', () => {
    render(
      <DefaultThemeProvider>
        <MessagingCard
          {...exampleProps}
          dismissButton={<button data-testid="custom-dismiss">X</button>}
        />
      </DefaultThemeProvider>,
    );
    expect(screen.getByTestId('custom-dismiss')).toBeInTheDocument();
  });

  it('renders media content', () => {
    render(
      <DefaultThemeProvider>
        <MessagingCard {...exampleProps} media={<div data-testid="test-media">Media</div>} />
      </DefaultThemeProvider>,
    );
    expect(screen.getByTestId('test-media')).toBeInTheDocument();
  });
});
