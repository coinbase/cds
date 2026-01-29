import { renderA11y } from '@coinbase/cds-web-utils/jest';
import { render, screen } from '@testing-library/react';

import { Avatar } from '../../../media/Avatar';
import { Tag } from '../../../tag/Tag';
import { DefaultThemeProvider } from '../../../utils/test';
import { ProgressBar } from '../../../visualizations/ProgressBar';
import { DataCard } from '../DataCard';

const exampleProps = {
  title: 'Test Title',
  layout: 'vertical' as const,
};

describe('DataCard', () => {
  it('passes accessibility for vertical layout', async () => {
    expect(
      await renderA11y(
        <DefaultThemeProvider>
          <DataCard {...exampleProps} layout="vertical" />
        </DefaultThemeProvider>,
      ),
    ).toHaveNoViolations();
  });

  it('passes accessibility for horizontal layout', async () => {
    expect(
      await renderA11y(
        <DefaultThemeProvider>
          <DataCard {...exampleProps} layout="horizontal" />
        </DefaultThemeProvider>,
      ),
    ).toHaveNoViolations();
  });

  it('passes accessibility with all props', async () => {
    expect(
      await renderA11y(
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
      ),
    ).toHaveNoViolations();
  });

  it('renders the card with the correct title', () => {
    render(
      <DefaultThemeProvider>
        <DataCard {...exampleProps} />
      </DefaultThemeProvider>,
    );
    expect(screen.getByText(exampleProps.title)).toBeInTheDocument();
  });

  it('renders the card with the correct subtitle', () => {
    render(
      <DefaultThemeProvider>
        <DataCard {...exampleProps} subtitle="Test Subtitle" />
      </DefaultThemeProvider>,
    );
    expect(screen.getByText('Test Subtitle')).toBeInTheDocument();
  });

  it('renders thumbnail content', () => {
    render(
      <DefaultThemeProvider>
        <DataCard {...exampleProps} thumbnail={<div data-testid="test-thumbnail">Thumb</div>} />
      </DefaultThemeProvider>,
    );
    expect(screen.getByTestId('test-thumbnail')).toBeInTheDocument();
  });

  it('renders titleAccessory content', () => {
    render(
      <DefaultThemeProvider>
        <DataCard
          {...exampleProps}
          titleAccessory={<span data-testid="test-accessory">Accessory</span>}
        />
      </DefaultThemeProvider>,
    );
    expect(screen.getByTestId('test-accessory')).toBeInTheDocument();
  });

  it('renders children (visualization)', () => {
    render(
      <DefaultThemeProvider>
        <DataCard {...exampleProps}>
          <div data-testid="test-visualization">Visualization</div>
        </DataCard>
      </DefaultThemeProvider>,
    );
    expect(screen.getByTestId('test-visualization')).toBeInTheDocument();
  });

  it('renders custom title node', () => {
    render(
      <DefaultThemeProvider>
        <DataCard {...exampleProps} title={<span data-testid="custom-title">Custom Title</span>} />
      </DefaultThemeProvider>,
    );
    expect(screen.getByTestId('custom-title')).toBeInTheDocument();
  });

  it('renders custom subtitle node', () => {
    render(
      <DefaultThemeProvider>
        <DataCard
          {...exampleProps}
          subtitle={<span data-testid="custom-subtitle">Custom Subtitle</span>}
        />
      </DefaultThemeProvider>,
    );
    expect(screen.getByTestId('custom-subtitle')).toBeInTheDocument();
  });

  it('renders with horizontal layout', () => {
    render(
      <DefaultThemeProvider>
        <DataCard {...exampleProps} layout="horizontal">
          <div data-testid="test-visualization">Visualization</div>
        </DataCard>
      </DefaultThemeProvider>,
    );
    expect(screen.getByText(exampleProps.title)).toBeInTheDocument();
    expect(screen.getByTestId('test-visualization')).toBeInTheDocument();
  });
});
