import React from 'react';
import type { PictogramName } from '@coinbase/cds-illustrations';
import { renderA11y } from '@coinbase/cds-web-utils';
import { fireEvent, render, screen } from '@testing-library/react';

import { DefaultThemeProvider } from '../../utils/test';
import type { NudgeCardProps } from '../NudgeCard';
import { NudgeCard as BaseNudgeCard } from '../NudgeCard';

const NoopFn = () => {};

const exampleProps = {
  title: "It's Onchain Summer!",
  description: 'Stand with crypto and mint your NFT.',
  pictogram: 'ethStaking' as PictogramName,
  action: 'Join the movement',
  onActionPress: NoopFn,
};

const NudgeCard = (
  props: Partial<
    Pick<
      NudgeCardProps,
      'onDismissPress' | 'onActionPress' | 'media' | 'pictogram' | 'accessibilityLabel'
    >
  >,
) => <BaseNudgeCard {...exampleProps} {...props} />;

describe('NudgeCard', () => {
  it('passes accessibility', async () => {
    expect(
      await renderA11y(
        <DefaultThemeProvider>
          <NudgeCard />
        </DefaultThemeProvider>,
      ),
    ).toHaveNoViolations();
  });

  it('passes accessibility when dismissable', async () => {
    expect(
      await renderA11y(
        <DefaultThemeProvider>
          <NudgeCard accessibilityLabel="Dismiss" onDismissPress={NoopFn} />
        </DefaultThemeProvider>,
      ),
    ).toHaveNoViolations();
  });

  it('renders the card with the correct title', () => {
    render(
      <DefaultThemeProvider>
        <NudgeCard />
      </DefaultThemeProvider>,
    );
    expect(screen.getByText(exampleProps.title)).toBeDefined();
  });
  it('renders the card with the correct description', () => {
    render(
      <DefaultThemeProvider>
        <NudgeCard />
      </DefaultThemeProvider>,
    );
    expect(screen.getByText(exampleProps.description)).toBeDefined();
  });

  it('renders the card with the correct action', () => {
    render(
      <DefaultThemeProvider>
        <NudgeCard />
      </DefaultThemeProvider>,
    );
    expect(screen.getByText(exampleProps.action)).toBeDefined();
  });

  it('calls the onActionPress function when the action button is pressed', () => {
    const onActionPress = jest.fn();
    render(
      <DefaultThemeProvider>
        <NudgeCard onActionPress={onActionPress} />
      </DefaultThemeProvider>,
    );
    fireEvent.click(screen.getByText(exampleProps.action));
    expect(onActionPress).toHaveBeenCalled();
  });

  it('renders the dismiss button when onDismissPress is provided', () => {
    render(
      <DefaultThemeProvider>
        <NudgeCard onDismissPress={NoopFn} />
      </DefaultThemeProvider>,
    );
    expect(screen.getByTestId('nudge-card-dismiss-button')).toBeVisible();
  });

  it('calls the onDismissPress function when the dismiss button is pressed', () => {
    const onDismissPress = jest.fn();
    render(
      <DefaultThemeProvider>
        <NudgeCard onDismissPress={onDismissPress} />
      </DefaultThemeProvider>,
    );
    fireEvent.click(screen.getByTestId('nudge-card-dismiss-button'));
    expect(onDismissPress).toHaveBeenCalled();
  });

  it('renders a Pictogram when passed a pictogram', () => {
    render(
      <DefaultThemeProvider>
        <NudgeCard />
      </DefaultThemeProvider>,
    );
    expect(screen.getByTestId('nudge-card-pictogram')).toBeDefined();
  });

  it('renders custom media when passed media', () => {
    render(
      <DefaultThemeProvider>
        <NudgeCard
          media={<img alt="test" data-testid="custom-media" src="https://example.com" />}
          pictogram={undefined}
        />
      </DefaultThemeProvider>,
    );
    expect(screen.getByRole('img')).toBeDefined();
  });
});
