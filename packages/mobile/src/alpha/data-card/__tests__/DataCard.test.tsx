import { Text } from 'react-native';
import { render, screen } from '@testing-library/react-native';

import { Avatar } from '../../../media/Avatar';
import { Tag } from '../../../tag/Tag';
import { DefaultThemeProvider } from '../../../utils/testHelpers';
import { ProgressBar } from '../../../visualizations/ProgressBar';
import { DataCard } from '../DataCard';

const exampleProps = {
  title: 'Test Title',
  layout: 'vertical' as const,
  testID: 'data-card-test',
};

describe('DataCard', () => {
  it('passes accessibility for vertical layout', () => {
    render(
      <DefaultThemeProvider>
        <DataCard {...exampleProps} layout="vertical" />
      </DefaultThemeProvider>,
    );
    expect(screen.getByTestId(exampleProps.testID)).toBeAccessible();
  });

  it('passes accessibility for horizontal layout', () => {
    render(
      <DefaultThemeProvider>
        <DataCard {...exampleProps} layout="horizontal" />
      </DefaultThemeProvider>,
    );
    expect(screen.getByTestId(exampleProps.testID)).toBeAccessible();
  });

  it('passes accessibility with all props', () => {
    render(
      <DefaultThemeProvider>
        <DataCard
          {...exampleProps}
          subtitle="Test Subtitle"
          thumbnail={<Avatar name="Test" />}
          titleAccessory={<Tag>New</Tag>}
        >
          <ProgressBar accessibilityLabel="Progress" progress={0.5} />
        </DataCard>
      </DefaultThemeProvider>,
    );
    expect(screen.getByTestId(exampleProps.testID)).toBeAccessible();
  });

  it('renders the card with the correct title', () => {
    render(
      <DefaultThemeProvider>
        <DataCard {...exampleProps} />
      </DefaultThemeProvider>,
    );
    expect(screen.getByText(exampleProps.title)).toBeTruthy();
  });

  it('renders the card with the correct subtitle', () => {
    render(
      <DefaultThemeProvider>
        <DataCard {...exampleProps} subtitle="Test Subtitle" />
      </DefaultThemeProvider>,
    );
    expect(screen.getByText('Test Subtitle')).toBeTruthy();
  });

  it('renders thumbnail content', () => {
    render(
      <DefaultThemeProvider>
        <DataCard {...exampleProps} thumbnail={<Text testID="test-thumbnail">Thumb</Text>} />
      </DefaultThemeProvider>,
    );
    expect(screen.getByTestId('test-thumbnail')).toBeTruthy();
  });

  it('renders titleAccessory content', () => {
    render(
      <DefaultThemeProvider>
        <DataCard
          {...exampleProps}
          titleAccessory={<Text testID="test-accessory">Accessory</Text>}
        />
      </DefaultThemeProvider>,
    );
    expect(screen.getByTestId('test-accessory')).toBeTruthy();
  });

  it('renders children (visualization)', () => {
    render(
      <DefaultThemeProvider>
        <DataCard {...exampleProps}>
          <Text testID="test-visualization">Visualization</Text>
        </DataCard>
      </DefaultThemeProvider>,
    );
    expect(screen.getByTestId('test-visualization')).toBeTruthy();
  });

  it('renders custom title node', () => {
    render(
      <DefaultThemeProvider>
        <DataCard {...exampleProps} title={<Text testID="custom-title">Custom Title</Text>} />
      </DefaultThemeProvider>,
    );
    expect(screen.getByTestId('custom-title')).toBeTruthy();
  });

  it('renders custom subtitle node', () => {
    render(
      <DefaultThemeProvider>
        <DataCard
          {...exampleProps}
          subtitle={<Text testID="custom-subtitle">Custom Subtitle</Text>}
        />
      </DefaultThemeProvider>,
    );
    expect(screen.getByTestId('custom-subtitle')).toBeTruthy();
  });

  it('renders with horizontal layout', () => {
    render(
      <DefaultThemeProvider>
        <DataCard {...exampleProps} layout="horizontal">
          <Text testID="test-visualization">Visualization</Text>
        </DataCard>
      </DefaultThemeProvider>,
    );
    expect(screen.getByText(exampleProps.title)).toBeTruthy();
    expect(screen.getByTestId('test-visualization')).toBeTruthy();
  });
});
