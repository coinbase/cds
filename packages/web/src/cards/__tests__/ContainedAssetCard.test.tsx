import React from 'react';
import { renderA11y } from '@coinbase/cds-web-utils';
import { fireEvent, render, screen } from '@testing-library/react';

import { ContainedAssetCard } from '../ContainedAssetCard';

const DummyHeader = () => <div>Header</div>;

describe('ContainedAssetCard', () => {
  it('renders title, description and subtitle', () => {
    render(
      <ContainedAssetCard
        description="Description"
        header={<DummyHeader />}
        subtitle="Subtitle"
        title="Title"
      />,
    );

    expect(screen.getByText('Title')).toBeTruthy();
    expect(screen.getByText('Description')).toBeTruthy();
    expect(screen.getByText('Subtitle')).toBeTruthy();
  });

  it('calls onClick when pressed', () => {
    const onClick = jest.fn();
    render(
      <ContainedAssetCard header={<DummyHeader />} onClick={onClick} testID="card" title="Title" />,
    );

    fireEvent.click(screen.getByTestId('card'));

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('passes accessibility', async () => {
    expect(
      await renderA11y(
        <ContainedAssetCard
          description="Description"
          header={<DummyHeader />}
          subtitle="Subtitle"
          title="Title"
        />,
      ),
    ).toHaveNoViolations();
  });

  it('renders default width style', () => {
    render(
      <ContainedAssetCard
        description="Description"
        header={<DummyHeader />}
        subtitle="Subtitle"
        testID="card"
        title="Title"
      />,
    );

    const card = screen.getByTestId('card');
    const style = card.getAttribute('style');
    expect(style).toContain('--minWidth: 156px');
    expect(style).toContain('--maxWidth: 156px');
  });

  it('renders custom width correctly', () => {
    render(
      <ContainedAssetCard
        description="Description"
        header={<DummyHeader />}
        maxWidth="none"
        minWidth={120}
        subtitle="Subtitle"
        testID="card"
        title="Title"
      />,
    );

    const card = screen.getByTestId('card');
    const style = card.getAttribute('style');
    expect(style).toContain('--minWidth: 120px');
    expect(style).toContain('--maxWidth: none');
  });
});
