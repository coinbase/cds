import { useEffect, useState, useMemo } from 'react';
import { ThemeProvider } from '@coinbase/cds-web';
import { VStack, HStack, Box } from '@coinbase/cds-web/layout';
import { Link, Text } from '@coinbase/cds-web/typography';
import { Button } from '@coinbase/cds-web/buttons';
import { SearchInput } from '@coinbase/cds-web/controls';
import { defaultTheme } from '@coinbase/cds-web/themes/defaultTheme';
import type { Manifest, Preview, SortOption } from './types';
import { SelectChip } from '@coinbase/cds-web/alpha/select-chip';
import { formatRelativeTime } from './utils';
import { MediaQueryProvider } from '@coinbase/cds-web/system';
import { Icon } from '@coinbase/cds-web/icons/Icon';
import { Tag } from '@coinbase/cds-web/tag';
import { Tooltip } from '@coinbase/cds-web/overlays/tooltip/Tooltip';
import { mockManifest } from './mockData';

function App() {
  const [manifest, setManifest] = useState<Manifest | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState<SortOption>('updated-desc');

  useEffect(() => {
    const fetchManifest = async () => {
      try {
        const response = await fetch('/cds/manifest.json');

        if (response.ok) {
          const data = await response.json();
          setManifest(data);
          setLoading(false);
          return;
        }
      } catch (err) {
        // Fall back to mock data only in development
        if (import.meta.env.DEV) {
          setManifest(mockManifest);
          setLoading(false);
        } else {
          // In production, show error if manifest not found
          setError(true);
          setLoading(false);
        }
      }
    };

    fetchManifest();
  }, []);

  const filteredAndSortedPreviews = useMemo(() => {
    if (!manifest) return [];

    let filtered = manifest.previews;

    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (preview) =>
          preview.pr.toString().includes(lowerQuery) ||
          preview.title.toLowerCase().includes(lowerQuery) ||
          preview.branch.toLowerCase().includes(lowerQuery) ||
          preview.author.toLowerCase().includes(lowerQuery),
      );
    }

    const sorted = [...filtered].sort((a, b) => {
      switch (sortOption) {
        case 'updated-desc':
          return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
        case 'updated-asc':
          return new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime();
        case 'pr-desc':
          return b.pr - a.pr;
        case 'pr-asc':
          return a.pr - b.pr;
        default:
          return 0;
      }
    });

    return sorted;
  }, [manifest, searchQuery, sortOption]);

  return (
    <MediaQueryProvider>
      <ThemeProvider theme={defaultTheme} activeColorScheme="light">
        <VStack width="100%" padding={{ base: 6, phone: 4 }} gap={6}>
          <VStack gap={6} width="100%" maxWidth={800} style={{ margin: '0 auto' }}>
            <Header />

            {loading && <LoadingState />}
            {error && <ErrorState />}
            {!loading && !error && (!manifest || manifest.previews.length === 0) && <EmptyState />}

            {!loading && !error && manifest && manifest.previews.length > 0 && (
              <VStack gap={4} width="100%">
                <VStack gap={2}>
                  <SearchInput
                    placeholder="Search by PR number, title, branch, or author..."
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    aria-label="Search previews"
                  />
                  <SelectChip
                    value={sortOption}
                    onChange={(value) => setSortOption(value as SortOption)}
                    label="Sort by"
                    options={[
                      { label: 'Recently Updated', value: 'updated-desc' },
                      { label: 'Oldest Updated', value: 'updated-asc' },
                      { label: 'PR Number (High to Low)', value: 'pr-desc' },
                      { label: 'PR Number (Low to High)', value: 'pr-asc' },
                    ]}
                  />
                </VStack>

                {filteredAndSortedPreviews.length === 0 ? (
                  <EmptySearchState />
                ) : (
                  <VStack gap={2} width="100%">
                    {filteredAndSortedPreviews.map((preview) => (
                      <PreviewCard key={preview.pr} preview={preview} />
                    ))}
                  </VStack>
                )}
              </VStack>
            )}

            {manifest && <Footer lastUpdated={manifest.lastUpdated} />}
          </VStack>
        </VStack>
      </ThemeProvider>
    </MediaQueryProvider>
  );
}

function Header() {
  return (
    <VStack gap={2} alignItems="center">
      <Text as="h1" font={{ base: 'display3', phone: 'title1' }}>
        🚀 CDS PR Previews
      </Text>
      <Text color="fgMuted" font="body" textAlign="center">
        Select a pull request to preview documentation or Storybook changes
      </Text>
    </VStack>
  );
}

function LoadingState() {
  return (
    <VStack gap={4} padding={8} alignItems="center">
      <Box className="spinner" />
      <Text font="body">Loading available previews...</Text>
    </VStack>
  );
}

function ErrorState() {
  return (
    <VStack gap={4} padding={8} alignItems="center">
      <Text font="body">❌ Failed to load previews. Please try again later.</Text>
    </VStack>
  );
}

function EmptyState() {
  return (
    <VStack gap={4} padding={8} alignItems="center">
      <Text font="title3">📭 No PR previews available at the moment.</Text>
      <Text font="body" color="fgMuted">
        Previews are automatically created when pull requests are opened.
      </Text>
    </VStack>
  );
}

function EmptySearchState() {
  return (
    <VStack gap={2} padding={8} alignItems="center">
      <Text font="body">No previews match your search.</Text>
    </VStack>
  );
}

function PreviewCard({ preview }: { preview: Preview }) {
  return (
    <VStack bordered borderRadius={400} padding={2} gap={1}>
      <HStack gap={1} alignItems="baseline">
        <Tag intent="informational" colorScheme="blue">
          <Link
            href={`https://github.com/coinbase/cds/pull/${preview.pr}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            PR #{preview.pr}
          </Link>
        </Tag>
        <Text font="headline">{preview.title}</Text>
      </HStack>
      <HStack gap={4} flexWrap="wrap">
        <HStack gap={1} alignItems="center">
          <Icon name="account" size="s" color="fgMuted" />
          <Text color="fgMuted" font="label2">
            {preview.author}
          </Text>
        </HStack>
        <HStack gap={1} alignItems="center" className="meta-link">
          <Icon name="fork" size="s" color="fgMuted" />
          <Tooltip content="Click to view branch on GitHub">
            <Link
              color="fgMuted"
              font="label2"
              href={`https://github.com/coinbase/cds/tree/${preview.branch}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {preview.branch}
            </Link>
          </Tooltip>
        </HStack>

        <HStack gap={1} alignItems="center" className="meta-link">
          <Icon name="chainLink" size="s" color="fgMuted" />
          <Tooltip content="Click to view commit on GitHub">
            <Link
              href={`https://github.com/coinbase/cds/commit/${preview.commit}`}
              target="_blank"
              rel="noopener noreferrer"
              color="fgMuted"
              font="label2"
              mono
            >
              {preview.commit.substring(0, 7)}
            </Link>
          </Tooltip>
        </HStack>
      </HStack>
      <HStack
        justifyContent="space-between"
        alignItems="baseline"
        flexWrap="wrap"
        gap={3}
        paddingTop={2}
      >
        <HStack gap={2} flexWrap="wrap">
          {preview.previews.docs && (
            <Button
              startIcon="document"
              variant="secondary"
              as="a"
              href={preview.previews.docs}
              target="_blank"
              compact
            >
              Docs
            </Button>
          )}
          {preview.previews.storybook && (
            <Button
              variant="secondary"
              as="a"
              href={preview.previews.storybook}
              target="_blank"
              compact
              startIcon="book"
            >
              Storybook
            </Button>
          )}
        </HStack>
        <Text color="fgMuted" font="label2" title={new Date(preview.updatedAt).toLocaleString()}>
          Updated {formatRelativeTime(new Date(preview.updatedAt))}
        </Text>
      </HStack>
    </VStack>
  );
}

function Footer({ lastUpdated }: { lastUpdated?: string }) {
  return (
    <VStack gap={2} alignItems="center">
      <Button
        variant="secondary"
        as="a"
        href="https://github.com/coinbase/cds"
        target="_blank"
        font="body"
      >
        View Repository on GitHub
      </Button>
      {lastUpdated && (
        <Text color="fg" font="label2">
          Last updated: {formatRelativeTime(new Date(lastUpdated))}
        </Text>
      )}
    </VStack>
  );
}

export default App;
