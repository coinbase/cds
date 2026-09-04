import { Text } from 'react-native';
import { render, screen } from '@testing-library/react-native';

import { Avatar } from '../../../media/Avatar';
import { DefaultThemeProvider } from '../../../utils/testHelpers';
import { MediaCard } from '..';

const exampleProps = {
  title: 'Test Title',
  thumbnail: <Avatar name="Test" />,
  mediaPlacement: 'end' as const,
  testID: 'media-card-test',
};

describe('MediaCard', () => {
  it('passes accessibility', () => {
    render(
      <DefaultThemeProvider>
        <MediaCard {...exampleProps} />
      </DefaultThemeProvider>,
    );
    expect(screen.getByTestId(exampleProps.testID)).toBeAccessible();
  });

  it('passes accessibility with all props', () => {
    render(
      <DefaultThemeProvider>
        <MediaCard
          {...exampleProps}
          description="Test Description"
          media={<Text testID="test-media">Media</Text>}
          subtitle="Test Subtitle"
        />
      </DefaultThemeProvider>,
    );
    expect(screen.getByTestId(exampleProps.testID)).toBeAccessible();
  });

  it('renders the card with the correct title', () => {
    render(
      <DefaultThemeProvider>
        <MediaCard {...exampleProps} />
      </DefaultThemeProvider>,
    );
    expect(screen.getByText(exampleProps.title)).toBeTruthy();
  });

  it('renders the card with the correct subtitle', () => {
    render(
      <DefaultThemeProvider>
        <MediaCard {...exampleProps} subtitle="Test Subtitle" />
      </DefaultThemeProvider>,
    );
    expect(screen.getByText('Test Subtitle')).toBeTruthy();
  });

  it('renders the card with the correct description', () => {
    render(
      <DefaultThemeProvider>
        <MediaCard {...exampleProps} description="Test Description" />
      </DefaultThemeProvider>,
    );
    expect(screen.getByText('Test Description')).toBeTruthy();
  });

  it('renders thumbnail content', () => {
    render(
      <DefaultThemeProvider>
        <MediaCard {...exampleProps} thumbnail={<Text testID="test-thumbnail">Thumb</Text>} />
      </DefaultThemeProvider>,
    );
    expect(screen.getByTestId('test-thumbnail')).toBeTruthy();
  });

  it('renders media content', () => {
    render(
      <DefaultThemeProvider>
        <MediaCard {...exampleProps} media={<Text testID="test-media">Media</Text>} />
      </DefaultThemeProvider>,
    );
    expect(screen.getByTestId('test-media')).toBeTruthy();
  });

  it('renders with mediaPlacement start', () => {
    render(
      <DefaultThemeProvider>
        <MediaCard
          {...exampleProps}
          media={<Text testID="test-media">Media</Text>}
          mediaPlacement="start"
        />
      </DefaultThemeProvider>,
    );
    expect(screen.getByTestId('test-media')).toBeTruthy();
    expect(screen.getByText(exampleProps.title)).toBeTruthy();
  });

  it('renders custom title node', () => {
    render(
      <DefaultThemeProvider>
        <MediaCard {...exampleProps} title={<Text testID="custom-title">Custom Title</Text>} />
      </DefaultThemeProvider>,
    );
    expect(screen.getByTestId('custom-title')).toBeTruthy();
  });

  it('renders custom description node', () => {
    render(
      <DefaultThemeProvider>
        <MediaCard
          {...exampleProps}
          description={<Text testID="custom-description">Custom Description</Text>}
        />
      </DefaultThemeProvider>,
    );
    expect(screen.getByTestId('custom-description')).toBeTruthy();
  });
});
