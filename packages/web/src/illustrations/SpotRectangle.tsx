import spotRectangleVersionMap from '@coinbase/cds-illustrations/__generated__/spotRectangle/data/versionMap';

import {
  createIllustration,
  type IllustrationA11yProps,
  type IllustrationBaseProps,
  type IllustrationDimensionsMap,
} from './createIllustration';

export type SpotRectangleBaseProps = IllustrationBaseProps<'spotRectangle'> &
  IllustrationA11yProps & {
    /**
     * SpotRectangle dimensions
     * @default 240x120
     * */
    dimension?: IllustrationDimensionsMap['spotRectangle'];
  };

export type SpotRectangleProps = SpotRectangleBaseProps;

// Loaded lazily — only fetched once a SpotRectangle with applyTheme actually mounts — so the
// generated per-name svgEsmMap never lands in the static import graph of consumers that don't
// use theming.
const loadSpotRectangleSvgEsmMap = () =>
  import('@coinbase/cds-illustrations/__generated__/spotRectangle/data/svgEsmMap').then(
    (mod) => mod.default,
  );

export const SpotRectangle = createIllustration(
  'spotRectangle',
  spotRectangleVersionMap,
  loadSpotRectangleSvgEsmMap,
);

export type { SpotRectangleName } from '@coinbase/cds-illustrations';
