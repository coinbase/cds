import React from 'react';
import { LinkIcon } from '@storybook/icons';
import { IconButton } from 'storybook/internal/components';
import { addons, types } from 'storybook/manager-api';

addons.register('cds-docs-link', (api) => {
  addons.add('cds-docs-link/tool', {
    type: types.TOOL,
    title: 'CDS Docs Link',
    match: () => true,
    render: () => (
      <IconButton
        key="cds-docs-link/tool"
        active={false}
        onClick={() => window.open('https://cds.coinbase.com', '_blank')}
        title="Go to CDS Docs"
      >
        <LinkIcon /> CDS Docs
      </IconButton>
    ),
  });
});
