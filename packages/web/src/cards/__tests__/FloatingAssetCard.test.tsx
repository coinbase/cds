import React from 'react';
import { renderA11y } from '@coinbase/cds-web-utils';
import { render, screen } from '@testing-library/react';

import { FloatingAssetCard } from '../FloatingAssetCard';

const DummyMedia = () => <div>Media</div>;

describe('FloatingAssetCard', () => {
  it('renders title, description, subtitle & media', () => {
    render(
      <FloatingAssetCard
        description="Description"
        media={<DummyMedia />}
        subtitle="Subtitle"
        title="Title"
      />,
    );

    expect(screen.getByText('Title')).toBeTruthy();
    expect(screen.getByText('Description')).toBeTruthy();
    expect(screen.getByText('Subtitle')).toBeTruthy();
    expect(screen.getByText('Media')).toBeTruthy();
  });

  it('passes accessibility', async () => {
    expect(
      await renderA11y(
        <FloatingAssetCard
          description="Description"
          media={<DummyMedia />}
          subtitle="Subtitle"
          title="Title"
        />,
      ),
    ).toHaveNoViolations();
  });
});
