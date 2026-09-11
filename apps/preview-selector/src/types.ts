export interface Preview {
  pr: number;
  title: string;
  branch: string;
  author: string;
  baseUrl: string;
  previews: {
    docs: string | null;
    storybook: string | null;
  };
  createdAt: string;
  updatedAt: string;
  commit: string;
}

export interface Manifest {
  previews: Preview[];
  lastUpdated: string;
}

export type SortOption = 'updated-desc' | 'updated-asc' | 'pr-desc' | 'pr-asc';
