import type { NodeWithMetadata } from '../helpers/fetchIllustrationLibrary';

type CreateComponentNodeParams = {
  name: `${string}/${string}`;
  id?: `${number}:${number}`;
  width?: number;
  height?: number;
};

export function createMockComponentNode({
  name,
  id = '123:123',
  width = 240,
  height = 240,
}: CreateComponentNodeParams): NodeWithMetadata {
  return {
    document: {
      id,
      name,
      type: 'COMPONENT',
      scrollBehavior: 'SCROLLS',
      blendMode: 'PASS_THROUGH',
      children: [],
      absoluteBoundingBox: {
        x: -1750.0,
        y: 513.0,
        width,
        height,
      },
      absoluteRenderBounds: {
        x: -1750.0,
        y: 513.0,
        width,
        height,
      },
      constraints: {
        vertical: 'TOP',
        horizontal: 'LEFT',
      },
      clipsContent: false,
      fills: [
        {
          blendMode: 'NORMAL',
          visible: false,
          type: 'SOLID',
          color: {
            r: 1.0,
            g: 1.0,
            b: 1.0,
            a: 1.0,
          },
        },
      ],
      strokes: [],
      strokeWeight: 1.0,
      strokeAlign: 'INSIDE',
      effects: [],
    },
    components: {
      [id]: {
        key: 'f7bb932e90ff68a1addfa00c1a10666b9d09929c',
        name,
        description: '',
        documentationLinks: [],
        remote: false,
      },
    },
    componentSets: {},
    schemaVersion: 0,
    styles: {},
    metadata: {
      key: '',
      name,
      node_id: '',
      thumbnail_url: '',
      created_at: '',
      updated_at: '',
      user: {
        id: '',
        handle: '',
        img_url: '',
      },
      file_key: '',
      description: '',
    },
  };
}
