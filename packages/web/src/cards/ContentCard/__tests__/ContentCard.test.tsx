import { renderA11y } from '@coinbase/cds-web-utils/jest';
import { render, screen } from '@testing-library/react';

import { ContentCard, ContentCardBody, ContentCardFooter, ContentCardHeader } from '..';

describe('ContentCard', () => {
  it('has no accessibility violations', async () => {
    expect(await renderA11y(<ContentCard>Test Content</ContentCard>)).toHaveNoViolations();
  });
  it('renders children', () => {
    render(<ContentCard>Test Content</ContentCard>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });
});

describe('ContentCardHeader', () => {
  it('has no accessibility violations', async () => {
    expect(await renderA11y(<ContentCardHeader title="Test Title" />)).toHaveNoViolations();
  });
  it('renders title', () => {
    render(<ContentCardHeader title="Test Title" />);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  it('renders thumbnail', () => {
    render(<ContentCardHeader thumbnail={<div>Test Thumbnail</div>} title="Test Title" />);
    expect(screen.getByText('Test Thumbnail')).toBeInTheDocument();
  });

  it('renders subtitle', () => {
    render(<ContentCardHeader subtitle={<div>Test Subtitle</div>} title="Test Title" />);
    expect(screen.getByText('Test Subtitle')).toBeInTheDocument();
  });

  it('renders actions', () => {
    render(<ContentCardHeader actions={<div>Test Actions</div>} title="Test Title" />);
    expect(screen.getByText('Test Actions')).toBeInTheDocument();
  });
});

describe('ContentCardBody', () => {
  it('has no accessibility violations', async () => {
    expect(
      await renderA11y(
        <ContentCardBody description="Test Description" label="Test Label" title="Test Title" />,
      ),
    ).toHaveNoViolations();
  });
  it('renders title and description', () => {
    render(<ContentCardBody description="Test Description" title="Test Title" />);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });

  it('renders label', () => {
    render(<ContentCardBody label="Test Label" title="Test Title" />);
    expect(screen.getByText('Test Label')).toBeInTheDocument();
  });

  it('renders media', () => {
    render(<ContentCardBody media={<div>Test Media</div>} title="Test Title" />);
    expect(screen.getByText('Test Media')).toBeInTheDocument();
  });

  it('renders media at the top', () => {
    render(
      <ContentCardBody media={<div>Test Media</div>} mediaPlacement="top" title="Test Title" />,
    );
    const mediaElement = screen.getByText('Test Media');
    expect(mediaElement).toBeInTheDocument();
    // Check that media is the first child of its parent
    expect(mediaElement).toEqual(mediaElement.parentNode?.firstChild);
  });

  it('renders media at the bottom', () => {
    render(
      <ContentCardBody media={<div>Test Media</div>} mediaPlacement="bottom" title="Test Title" />,
    );
    const mediaElement = screen.getByText('Test Media');
    expect(mediaElement).toBeInTheDocument();
    // Check that media is the last child of its parent
    expect(mediaElement).toEqual(mediaElement.parentNode?.lastChild);
  });

  it('renders media at the end', () => {
    render(
      <ContentCardBody media={<div>Test Media</div>} mediaPlacement="end" title="Test Title" />,
    );
    const mediaElement = screen.getByText('Test Media');
    expect(mediaElement).toBeInTheDocument();
    // Check that media is the last child of its parent
    expect(mediaElement).toEqual(mediaElement.parentNode?.lastChild);
  });

  it('renders children', () => {
    render(
      <ContentCardBody description="Test Description" title="Test Title">
        <div>Test Children</div>
      </ContentCardBody>,
    );
    expect(screen.getByText('Test Children')).toBeInTheDocument();
  });
});

describe('ContentCardFooter', () => {
  it('has no accessibility violations', async () => {
    expect(
      await renderA11y(<ContentCardFooter>Test Footer</ContentCardFooter>),
    ).toHaveNoViolations();
  });

  it('renders children', () => {
    render(<ContentCardFooter>Test Footer</ContentCardFooter>);
    expect(screen.getByText('Test Footer')).toBeInTheDocument();
  });

  it('renders multiple children', () => {
    render(
      <ContentCardFooter>
        <div>Child 1</div>
        <div>Child 2</div>
      </ContentCardFooter>,
    );
    expect(screen.getByText('Child 1')).toBeInTheDocument();
    expect(screen.getByText('Child 2')).toBeInTheDocument();
  });
});
