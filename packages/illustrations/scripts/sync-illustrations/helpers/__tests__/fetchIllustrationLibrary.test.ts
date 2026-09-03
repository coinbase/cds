import * as getFileComponentsModule from '@cds/figma-api/getFileComponents';
import * as getFileImagesModule from '@cds/figma-api/getFileImages';
import * as getFileNodesModule from '@cds/figma-api/getFileNodes';

import { fetchIllustrationLibrary } from '../fetchIllustrationLibrary';

// Load fixtures
const componentsFixture = require('./__fixtures__/getFileComponents.json');
const nodesFixture = require('./__fixtures__/getFileNodes.json');
const imagesFixture = require('./__fixtures__/getFileImages.json');

// Mock the Figma API modules
jest.mock('@cds/figma-api/getFileComponents');
jest.mock('@cds/figma-api/getFileNodes');
jest.mock('@cds/figma-api/getFileImages');

const mockGetFileComponents = getFileComponentsModule.getFileComponents as jest.Mock;
const mockGetFileNodes = getFileNodesModule.getFileNodes as jest.Mock;
const mockGetFileImages = getFileImagesModule.getFileImages as jest.Mock;

describe('fetchIllustrationLibrary', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockGetFileComponents.mockResolvedValue(componentsFixture);
    mockGetFileNodes.mockResolvedValue(nodesFixture);
    mockGetFileImages.mockResolvedValue(imagesFixture);
  });

  describe('SyncedLibrary structure', () => {
    it('returns an object with remoteIds, recentlyUpdatedIds, nodes, and imageUrls', async () => {
      const result = await fetchIllustrationLibrary({ fileId: 'test-illustrations-file' });

      expect(result).toHaveProperty('remoteIds');
      expect(result).toHaveProperty('recentlyUpdatedIds');
      expect(result).toHaveProperty('nodes');
      expect(result).toHaveProperty('imageUrls');
    });

    it('returns svg image format bucket in imageUrls', async () => {
      const result = await fetchIllustrationLibrary({ fileId: 'test-illustrations-file' });

      expect(result.imageUrls).toHaveProperty('svg');
    });
  });

  describe('remoteIds behavior', () => {
    it('returns remoteIds for all components in the file', async () => {
      const result = await fetchIllustrationLibrary({ fileId: 'test-illustrations-file' });

      expect(result.remoteIds).toBeInstanceOf(Array);
      expect(result.remoteIds.length).toBe(componentsFixture.meta.components.length);

      // All component node_ids should be in remoteIds
      componentsFixture.meta.components.forEach((c: { node_id: string }) => {
        expect(result.remoteIds).toContain(c.node_id);
      });
    });
  });

  describe('recentlyUpdatedIds behavior', () => {
    it('returns all remoteIds as recentlyUpdatedIds when lastUpdated is undefined', async () => {
      const result = await fetchIllustrationLibrary({
        fileId: 'test-illustrations-file',
        lastUpdated: undefined,
      });

      expect(result.recentlyUpdatedIds).toEqual(result.remoteIds);
    });

    it('filters recentlyUpdatedIds based on lastUpdated timestamp', async () => {
      const result = await fetchIllustrationLibrary({
        fileId: 'test-illustrations-file',
        lastUpdated: '2025-01-01T00:00:00.000Z',
      });

      // recentlyUpdatedIds should be a subset of remoteIds
      result.recentlyUpdatedIds.forEach((id) => {
        expect(result.remoteIds).toContain(id);
      });

      // Should filter based on the date
      expect(result.recentlyUpdatedIds.length).toBeLessThanOrEqual(result.remoteIds.length);
    });

    it('recentlyUpdatedIds is always a subset of remoteIds', async () => {
      const result = await fetchIllustrationLibrary({
        fileId: 'test-file',
        lastUpdated: '2024-01-01T00:00:00.000Z',
      });

      result.recentlyUpdatedIds.forEach((id) => {
        expect(result.remoteIds).toContain(id);
      });
    });
  });

  describe('nodes behavior', () => {
    it('returns nodes with COMPONENT document type', async () => {
      const result = await fetchIllustrationLibrary({ fileId: 'test-illustrations-file' });

      Object.values(result.nodes).forEach((node) => {
        expect(node.document).toBeDefined();
        expect(node.document.type).toBe('COMPONENT');
      });
    });

    it('returns nodes with required document fields', async () => {
      const result = await fetchIllustrationLibrary({ fileId: 'test-illustrations-file' });

      Object.values(result.nodes).forEach((node) => {
        expect(node.document.id).toBeDefined();
        expect(node.document.name).toBeDefined();
      });
    });

    it('returns nodes with metadata containing required fields', async () => {
      const result = await fetchIllustrationLibrary({ fileId: 'test-illustrations-file' });

      Object.entries(result.nodes).forEach(([nodeId, node]) => {
        expect(node.metadata).toBeDefined();
        expect(node.metadata.updated_at).toBeDefined();
        expect(node.metadata.created_at).toBeDefined();
        expect(node.metadata.node_id).toBe(nodeId);
      });
    });

    it('returns nodes with absoluteBoundingBox for size calculation', async () => {
      const result = await fetchIllustrationLibrary({ fileId: 'test-illustrations-file' });

      Object.values(result.nodes).forEach((node) => {
        expect('absoluteBoundingBox' in node.document).toBe(true);
        const doc = node.document as {
          absoluteBoundingBox: { width: number; height: number };
        };
        expect(doc.absoluteBoundingBox).toHaveProperty('width');
        expect(doc.absoluteBoundingBox).toHaveProperty('height');
      });
    });

    it('nodes object only contains keys from recentlyUpdatedIds', async () => {
      const result = await fetchIllustrationLibrary({ fileId: 'test-file' });

      const nodeKeys = Object.keys(result.nodes);
      nodeKeys.forEach((key) => {
        expect(result.recentlyUpdatedIds).toContain(key);
      });
    });
  });

  describe('imageUrls behavior', () => {
    it('returns imageUrls for the components directly (not children)', async () => {
      const result = await fetchIllustrationLibrary({ fileId: 'test-illustrations-file' });

      // For components, the node IDs themselves should have image URLs
      Object.keys(result.nodes).forEach((nodeId) => {
        expect(result.imageUrls.svg[nodeId]).toBeDefined();
        expect(result.imageUrls.svg[nodeId]).toMatch(/^https:\/\//);
      });
    });
  });

  describe('edge cases', () => {
    it('returns empty nodes and imageUrls when lastUpdated is in the far future', async () => {
      const result = await fetchIllustrationLibrary({
        fileId: 'test-illustrations-file',
        lastUpdated: '2099-01-01T00:00:00.000Z',
      });

      // remoteIds should still contain all items
      expect(result.remoteIds.length).toBe(componentsFixture.meta.components.length);

      // But recentlyUpdatedIds should be empty
      expect(result.recentlyUpdatedIds).toEqual([]);

      // Nodes and imageUrls should be empty since nothing was updated
      expect(Object.keys(result.nodes)).toHaveLength(0);
      expect(Object.keys(result.imageUrls.svg)).toHaveLength(0);
    });

    it('treats empty string lastUpdated the same as undefined', async () => {
      const resultWithUndefined = await fetchIllustrationLibrary({
        fileId: 'test-illustrations-file',
        lastUpdated: undefined,
      });

      jest.clearAllMocks();
      mockGetFileComponents.mockResolvedValue(componentsFixture);
      mockGetFileNodes.mockResolvedValue(nodesFixture);
      mockGetFileImages.mockResolvedValue(imagesFixture);

      const resultWithEmptyString = await fetchIllustrationLibrary({
        fileId: 'test-illustrations-file',
        lastUpdated: '',
      });

      expect(resultWithEmptyString.recentlyUpdatedIds).toEqual(
        resultWithUndefined.recentlyUpdatedIds,
      );
      expect(resultWithEmptyString.remoteIds).toEqual(resultWithUndefined.remoteIds);
    });

    it('preserves essential metadata fields from components', async () => {
      const result = await fetchIllustrationLibrary({ fileId: 'test-illustrations-file' });

      Object.values(result.nodes).forEach((node) => {
        expect(node.metadata).toHaveProperty('key');
        expect(node.metadata).toHaveProperty('file_key');
        expect(node.metadata).toHaveProperty('name');
        expect(node.metadata).toHaveProperty('containing_frame');
      });
    });
  });
});
