import { renderA11y } from '@coinbase/cds-web-utils/jest';
import { fireEvent, render, screen } from '@testing-library/react';

import { Button } from '../../../buttons/Button';
import { Avatar } from '../../../media/Avatar';
import { DefaultThemeProvider } from '../../../utils/test';
import { ContentCard, ContentCardBody, ContentCardFooter, ContentCardHeader } from '..';

describe('ContentCard', () => {
  it('has no accessibility violations', async () => {
    expect(
      await renderA11y(
        <DefaultThemeProvider>
          <ContentCard>Test Content</ContentCard>
        </DefaultThemeProvider>,
      ),
    ).toHaveNoViolations();
  });

  it('renders children', () => {
    render(
      <DefaultThemeProvider>
        <ContentCard>Test Content</ContentCard>
      </DefaultThemeProvider>,
    );
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('renders as article by default', () => {
    render(
      <DefaultThemeProvider>
        <ContentCard data-testid="content-card">Test Content</ContentCard>
      </DefaultThemeProvider>,
    );
    expect(screen.getByTestId('content-card').tagName).toBe('ARTICLE');
  });

  it('renders with custom as prop', () => {
    render(
      <DefaultThemeProvider>
        <ContentCard as="section" data-testid="content-card">
          Test Content
        </ContentCard>
      </DefaultThemeProvider>,
    );
    expect(screen.getByTestId('content-card').tagName).toBe('SECTION');
  });

  it('renders with background prop', () => {
    render(
      <DefaultThemeProvider>
        <ContentCard background="bgAlternate" data-testid="content-card">
          Test Content
        </ContentCard>
      </DefaultThemeProvider>,
    );
    expect(screen.getByTestId('content-card')).toBeInTheDocument();
  });
});

describe('ContentCardHeader', () => {
  it('has no accessibility violations', async () => {
    expect(
      await renderA11y(
        <DefaultThemeProvider>
          <ContentCardHeader title="Test Title" />
        </DefaultThemeProvider>,
      ),
    ).toHaveNoViolations();
  });

  it('renders as header by default', () => {
    render(
      <DefaultThemeProvider>
        <ContentCardHeader data-testid="content-card-header" title="Test Title" />
      </DefaultThemeProvider>,
    );
    expect(screen.getByTestId('content-card-header').tagName).toBe('HEADER');
  });

  it('renders title', () => {
    render(
      <DefaultThemeProvider>
        <ContentCardHeader title="Test Title" />
      </DefaultThemeProvider>,
    );
    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  it('renders custom title node', () => {
    render(
      <DefaultThemeProvider>
        <ContentCardHeader title={<span data-testid="custom-title">Custom Title</span>} />
      </DefaultThemeProvider>,
    );
    expect(screen.getByTestId('custom-title')).toBeInTheDocument();
  });

  it('renders thumbnail', () => {
    render(
      <DefaultThemeProvider>
        <ContentCardHeader thumbnail={<div>Test Thumbnail</div>} title="Test Title" />
      </DefaultThemeProvider>,
    );
    expect(screen.getByText('Test Thumbnail')).toBeInTheDocument();
  });

  it('renders Avatar as thumbnail', () => {
    render(
      <DefaultThemeProvider>
        <ContentCardHeader thumbnail={<Avatar name="Test" />} title="Test Title" />
      </DefaultThemeProvider>,
    );
    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  it('renders subtitle', () => {
    render(
      <DefaultThemeProvider>
        <ContentCardHeader subtitle="Test Subtitle" title="Test Title" />
      </DefaultThemeProvider>,
    );
    expect(screen.getByText('Test Subtitle')).toBeInTheDocument();
  });

  it('renders custom subtitle node', () => {
    render(
      <DefaultThemeProvider>
        <ContentCardHeader
          subtitle={<span data-testid="custom-subtitle">Custom Subtitle</span>}
          title="Test Title"
        />
      </DefaultThemeProvider>,
    );
    expect(screen.getByTestId('custom-subtitle')).toBeInTheDocument();
  });

  it('renders actions', () => {
    render(
      <DefaultThemeProvider>
        <ContentCardHeader actions={<div>Test Actions</div>} title="Test Title" />
      </DefaultThemeProvider>,
    );
    expect(screen.getByText('Test Actions')).toBeInTheDocument();
  });

  it('renders actions with Button', () => {
    const onClick = jest.fn();
    render(
      <DefaultThemeProvider>
        <ContentCardHeader actions={<Button onClick={onClick}>Action</Button>} title="Test Title" />
      </DefaultThemeProvider>,
    );
    fireEvent.click(screen.getByText('Action'));
    expect(onClick).toHaveBeenCalled();
  });
});

describe('ContentCardBody', () => {
  it('has no accessibility violations', async () => {
    expect(
      await renderA11y(
        <DefaultThemeProvider>
          <ContentCardBody description="Test Description" label="Test Label" title="Test Title" />
        </DefaultThemeProvider>,
      ),
    ).toHaveNoViolations();
  });

  it('renders as div by default', () => {
    render(
      <DefaultThemeProvider>
        <ContentCardBody data-testid="content-card-body" title="Test Title" />
      </DefaultThemeProvider>,
    );
    expect(screen.getByTestId('content-card-body').tagName).toBe('DIV');
  });

  it('renders title and description', () => {
    render(
      <DefaultThemeProvider>
        <ContentCardBody description="Test Description" title="Test Title" />
      </DefaultThemeProvider>,
    );
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });

  it('renders custom title node', () => {
    render(
      <DefaultThemeProvider>
        <ContentCardBody title={<span data-testid="custom-title">Custom Title</span>} />
      </DefaultThemeProvider>,
    );
    expect(screen.getByTestId('custom-title')).toBeInTheDocument();
  });

  it('renders custom description node', () => {
    render(
      <DefaultThemeProvider>
        <ContentCardBody
          description={<span data-testid="custom-description">Custom Description</span>}
          title="Test Title"
        />
      </DefaultThemeProvider>,
    );
    expect(screen.getByTestId('custom-description')).toBeInTheDocument();
  });

  it('renders label', () => {
    render(
      <DefaultThemeProvider>
        <ContentCardBody label="Test Label" title="Test Title" />
      </DefaultThemeProvider>,
    );
    expect(screen.getByText('Test Label')).toBeInTheDocument();
  });

  it('renders media', () => {
    render(
      <DefaultThemeProvider>
        <ContentCardBody media={<div>Test Media</div>} title="Test Title" />
      </DefaultThemeProvider>,
    );
    expect(screen.getByText('Test Media')).toBeInTheDocument();
  });

  it('renders media at the top', () => {
    render(
      <DefaultThemeProvider>
        <ContentCardBody media={<div>Test Media</div>} mediaPlacement="top" title="Test Title" />
      </DefaultThemeProvider>,
    );
    const mediaElement = screen.getByText('Test Media');
    expect(mediaElement).toBeInTheDocument();
  });

  it('renders media at the bottom', () => {
    render(
      <DefaultThemeProvider>
        <ContentCardBody media={<div>Test Media</div>} mediaPlacement="bottom" title="Test Title" />
      </DefaultThemeProvider>,
    );
    const mediaElement = screen.getByText('Test Media');
    expect(mediaElement).toBeInTheDocument();
  });

  it('renders media at the start', () => {
    render(
      <DefaultThemeProvider>
        <ContentCardBody media={<div>Test Media</div>} mediaPlacement="start" title="Test Title" />
      </DefaultThemeProvider>,
    );
    const mediaElement = screen.getByText('Test Media');
    expect(mediaElement).toBeInTheDocument();
  });

  it('renders media at the end', () => {
    render(
      <DefaultThemeProvider>
        <ContentCardBody media={<div>Test Media</div>} mediaPlacement="end" title="Test Title" />
      </DefaultThemeProvider>,
    );
    const mediaElement = screen.getByText('Test Media');
    expect(mediaElement).toBeInTheDocument();
  });

  it('renders children', () => {
    render(
      <DefaultThemeProvider>
        <ContentCardBody description="Test Description" title="Test Title">
          <div>Test Children</div>
        </ContentCardBody>
      </DefaultThemeProvider>,
    );
    expect(screen.getByText('Test Children')).toBeInTheDocument();
  });
});

describe('ContentCardFooter', () => {
  it('has no accessibility violations', async () => {
    expect(
      await renderA11y(
        <DefaultThemeProvider>
          <ContentCardFooter>Test Footer</ContentCardFooter>
        </DefaultThemeProvider>,
      ),
    ).toHaveNoViolations();
  });

  it('renders as footer by default', () => {
    render(
      <DefaultThemeProvider>
        <ContentCardFooter data-testid="content-card-footer">Test Footer</ContentCardFooter>
      </DefaultThemeProvider>,
    );
    expect(screen.getByTestId('content-card-footer').tagName).toBe('FOOTER');
  });

  it('renders children', () => {
    render(
      <DefaultThemeProvider>
        <ContentCardFooter>Test Footer</ContentCardFooter>
      </DefaultThemeProvider>,
    );
    expect(screen.getByText('Test Footer')).toBeInTheDocument();
  });

  it('renders multiple children', () => {
    render(
      <DefaultThemeProvider>
        <ContentCardFooter>
          <div>Child 1</div>
          <div>Child 2</div>
        </ContentCardFooter>
      </DefaultThemeProvider>,
    );
    expect(screen.getByText('Child 1')).toBeInTheDocument();
    expect(screen.getByText('Child 2')).toBeInTheDocument();
  });

  it('renders with Button children', () => {
    const onClick = jest.fn();
    render(
      <DefaultThemeProvider>
        <ContentCardFooter>
          <Button onClick={onClick}>Primary Action</Button>
          <Button variant="tertiary">Secondary Action</Button>
        </ContentCardFooter>
      </DefaultThemeProvider>,
    );
    fireEvent.click(screen.getByText('Primary Action'));
    expect(onClick).toHaveBeenCalled();
    expect(screen.getByText('Secondary Action')).toBeInTheDocument();
  });
});

describe('ContentCard composition', () => {
  it('renders complete card with all subcomponents', () => {
    render(
      <DefaultThemeProvider>
        <ContentCard>
          <ContentCardHeader
            subtitle="Subtitle"
            thumbnail={<Avatar name="Test" />}
            title="Header Title"
          />
          <ContentCardBody description="Body Description" title="Body Title" />
          <ContentCardFooter>
            <Button>Action</Button>
          </ContentCardFooter>
        </ContentCard>
      </DefaultThemeProvider>,
    );
    expect(screen.getByText('Header Title')).toBeInTheDocument();
    expect(screen.getByText('Subtitle')).toBeInTheDocument();
    expect(screen.getByText('Body Title')).toBeInTheDocument();
    expect(screen.getByText('Body Description')).toBeInTheDocument();
    expect(screen.getByText('Action')).toBeInTheDocument();
  });
});
