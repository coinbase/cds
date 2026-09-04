import { renderA11y } from '@coinbase/cds-web-utils/jest';
import { render, screen } from '@testing-library/react';

import { Avatar } from '../../../media/Avatar';
import { RemoteImage } from '../../../media/RemoteImage';
import { DefaultThemeProvider } from '../../../utils/test';
import { MediaCard } from '..';

const exampleProps = {
  title: 'Test Title',
  thumbnail: <Avatar name="Test" />,
  mediaPlacement: 'end' as const,
};

describe('MediaCard', () => {
  it('passes accessibility', async () => {
    expect(
      await renderA11y(
        <DefaultThemeProvider>
          <MediaCard {...exampleProps} />
        </DefaultThemeProvider>,
      ),
    ).toHaveNoViolations();
  });

  it('passes accessibility with all props', async () => {
    expect(
      await renderA11y(
        <DefaultThemeProvider>
          <MediaCard
            {...exampleProps}
            description="Test Description"
            media={<RemoteImage alt="Test media" height={100} source="https://example.com" />}
            subtitle="Test Subtitle"
          />
        </DefaultThemeProvider>,
      ),
    ).toHaveNoViolations();
  });

  it('renders the card with the correct title', () => {
    render(
      <DefaultThemeProvider>
        <MediaCard {...exampleProps} />
      </DefaultThemeProvider>,
    );
    expect(screen.getByText(exampleProps.title)).toBeInTheDocument();
  });

  it('renders the card with the correct subtitle', () => {
    render(
      <DefaultThemeProvider>
        <MediaCard {...exampleProps} subtitle="Test Subtitle" />
      </DefaultThemeProvider>,
    );
    expect(screen.getByText('Test Subtitle')).toBeInTheDocument();
  });

  it('renders the card with the correct description', () => {
    render(
      <DefaultThemeProvider>
        <MediaCard {...exampleProps} description="Test Description" />
      </DefaultThemeProvider>,
    );
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });

  it('renders thumbnail content', () => {
    render(
      <DefaultThemeProvider>
        <MediaCard {...exampleProps} thumbnail={<div data-testid="test-thumbnail">Thumb</div>} />
      </DefaultThemeProvider>,
    );
    expect(screen.getByTestId('test-thumbnail')).toBeInTheDocument();
  });

  it('renders media content', () => {
    render(
      <DefaultThemeProvider>
        <MediaCard {...exampleProps} media={<div data-testid="test-media">Media</div>} />
      </DefaultThemeProvider>,
    );
    expect(screen.getByTestId('test-media')).toBeInTheDocument();
  });

  it('renders with mediaPlacement start', () => {
    render(
      <DefaultThemeProvider>
        <MediaCard
          {...exampleProps}
          media={<div data-testid="test-media">Media</div>}
          mediaPlacement="start"
        />
      </DefaultThemeProvider>,
    );
    expect(screen.getByTestId('test-media')).toBeInTheDocument();
    expect(screen.getByText(exampleProps.title)).toBeInTheDocument();
  });

  it('renders custom title node', () => {
    render(
      <DefaultThemeProvider>
        <MediaCard {...exampleProps} title={<span data-testid="custom-title">Custom Title</span>} />
      </DefaultThemeProvider>,
    );
    expect(screen.getByTestId('custom-title')).toBeInTheDocument();
  });

  it('renders custom description node', () => {
    render(
      <DefaultThemeProvider>
        <MediaCard
          {...exampleProps}
          description={<span data-testid="custom-description">Custom Description</span>}
        />
      </DefaultThemeProvider>,
    );
    expect(screen.getByTestId('custom-description')).toBeInTheDocument();
  });
});
