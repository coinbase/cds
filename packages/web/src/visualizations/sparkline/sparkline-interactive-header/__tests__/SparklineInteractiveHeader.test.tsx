import { DefaultThemeProvider } from '@coinbase/cds-web/utils/test';
import { render, screen } from '@testing-library/react';

import { SparklineInteractiveHeader } from '../SparklineInteractiveHeader';

const defaultSubHead = {
  percent: '20%',
  priceChange: '888.88',
  sign: 'positive',
  variant: 'positive',
} as const;

describe('SparklineInteractiveHeader.test', () => {
  it('renders text', () => {
    render(
      <DefaultThemeProvider>
        <SparklineInteractiveHeader
          defaultLabel="test label"
          defaultSubHead={defaultSubHead}
          defaultTitle="test title"
          testID="header-component"
        />
      </DefaultThemeProvider>,
    );

    const headerComponent = screen.getByTestId('header-component');
    expect(headerComponent).toBeInTheDocument();

    // Check title, label and subhead content using text content
    expect(headerComponent).toHaveTextContent('test title');
    expect(headerComponent).toHaveTextContent('test label');
    expect(headerComponent).toHaveTextContent('+');
    expect(headerComponent).toHaveTextContent('888.88');
    expect(headerComponent).toHaveTextContent('20%');
  });

  it('renders without default label', () => {
    render(
      <DefaultThemeProvider>
        <SparklineInteractiveHeader
          defaultSubHead={defaultSubHead}
          defaultTitle="test title"
          testID="header-component"
        />
      </DefaultThemeProvider>,
    );

    const headerComponent = screen.getByTestId('header-component');
    expect(headerComponent).toBeInTheDocument();

    // Check title and subhead content
    expect(headerComponent).toHaveTextContent('test title');
    expect(headerComponent).toHaveTextContent('+');
    expect(headerComponent).toHaveTextContent('888.88');
    expect(headerComponent).toHaveTextContent('20%');

    // Verify label is not rendered
    expect(headerComponent).not.toHaveTextContent('test label');
  });

  it('renders without default subhead', () => {
    render(
      <DefaultThemeProvider>
        <SparklineInteractiveHeader
          defaultLabel="test label"
          defaultTitle="test title"
          testID="header-component"
        />
      </DefaultThemeProvider>,
    );

    const headerComponent = screen.getByTestId('header-component');
    expect(headerComponent).toBeInTheDocument();

    // Check title and label content
    expect(headerComponent).toHaveTextContent('test title');
    expect(headerComponent).toHaveTextContent('test label');

    // Verify subhead elements are not rendered
    expect(headerComponent).not.toHaveTextContent('+');
    expect(headerComponent).not.toHaveTextContent('888.88');
    expect(headerComponent).not.toHaveTextContent('20%');
  });
});
