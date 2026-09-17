import type { Manifest } from './types';

export const mockManifest: Manifest = {
  previews: [
    {
      pr: 123,
      title: 'Add Button component with docs and stories',
      branch: 'feature/button',
      author: 'octocat',
      baseUrl: '/cds/pr-123/',
      previews: {
        docs: '/cds/pr-123/docs/',
        storybook: '/cds/pr-123/storybook/',
      },
      createdAt: '2026-02-12T10:00:00Z',
      updatedAt: '2026-02-12T15:30:00Z',
      commit: 'abc1234',
    },
    {
      pr: 456,
      title: 'Update theme colors (docs only)',
      branch: 'feature/colors',
      author: 'github-user',
      baseUrl: '/cds/pr-456/',
      previews: {
        docs: '/cds/pr-456/docs/',
        storybook: null,
      },
      createdAt: '2026-02-11T10:00:00Z',
      updatedAt: '2026-02-12T12:00:00Z',
      commit: 'def5678',
    },
    {
      pr: 789,
      title: 'Refactor components (storybook only)',
      branch: 'refactor/components',
      author: 'contributor',
      baseUrl: '/cds/pr-789/',
      previews: {
        docs: null,
        storybook: '/cds/pr-789/storybook/',
      },
      createdAt: '2026-02-10T09:00:00Z',
      updatedAt: '2026-02-11T14:00:00Z',
      commit: 'ghi9012',
    },
    {
      pr: 234,
      title: 'Add new TextField component',
      branch: 'feature/textfield',
      author: 'designer',
      baseUrl: '/cds/pr-234/',
      previews: {
        docs: '/cds/pr-234/docs/',
        storybook: '/cds/pr-234/storybook/',
      },
      createdAt: '2026-02-13T08:00:00Z',
      updatedAt: '2026-02-13T16:00:00Z',
      commit: 'jkl3456',
    },
  ],
  lastUpdated: '2026-02-13T16:00:00Z',
};
