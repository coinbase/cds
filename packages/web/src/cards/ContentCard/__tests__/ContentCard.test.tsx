import { renderA11y } from '@cbhq/cds-web-utils/jest';
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

  it('renders avatar', () => {
    render(<ContentCardHeader avatar={<div>Test Avatar</div>} title="Test Title" />);
    expect(screen.getByText('Test Avatar')).toBeInTheDocument();
  });

  it('renders meta', () => {
    render(<ContentCardHeader meta={<div>Test Meta</div>} title="Test Title" />);
    expect(screen.getByText('Test Meta')).toBeInTheDocument();
  });

  it('renders end', () => {
    render(<ContentCardHeader end={<div>Test End</div>} title="Test Title" />);
    expect(screen.getByText('Test End')).toBeInTheDocument();
  });
});

describe('ContentCardBody', () => {
  it('has no accessibility violations', async () => {
    expect(
      await renderA11y(<ContentCardBody body="Test Body" label="Test Label" />),
    ).toHaveNoViolations();
  });
  it('renders body and label', () => {
    render(<ContentCardBody body="Test Body" label="Test Label" />);
    expect(screen.getByText('Test Body')).toBeInTheDocument();
    expect(screen.getByText('Test Label')).toBeInTheDocument();
  });

  it('renders media', () => {
    render(<ContentCardBody media={<div>Test Media</div>} />);
    expect(screen.getByText('Test Media')).toBeInTheDocument();
  });

  it('renders media at the top', () => {
    render(<ContentCardBody media={<div>Test Media</div>} mediaPosition="top" />);
    const mediaElement = screen.getByText('Test Media');
    expect(mediaElement).toBeInTheDocument();
    // Check that media is the first child of its parent
    expect(mediaElement).toEqual(mediaElement.parentNode?.firstChild);
  });

  it('renders media at the bottom', () => {
    render(<ContentCardBody media={<div>Test Media</div>} mediaPosition="bottom" />);
    const mediaElement = screen.getByText('Test Media');
    expect(mediaElement).toBeInTheDocument();
    // Check that media is the last child of its parent
    expect(mediaElement).toEqual(mediaElement.parentNode?.lastChild);
  });

  it('renders media at the right', () => {
    render(<ContentCardBody media={<div>Test Media</div>} mediaPosition="right" />);
    const mediaElement = screen.getByText('Test Media');
    expect(mediaElement).toBeInTheDocument();
    // Check that media is the last child of its parent
    expect(mediaElement).toEqual(mediaElement.parentNode?.lastChild);
  });

  it('renders children', () => {
    render(
      <ContentCardBody body="Test Body" label="Test Label">
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
