import spotSquareVersionMap from '@coinbase/cds-illustrations/__generated__/spotSquare/data/versionMap';

import {
  createIllustration,
  type IllustrationA11yProps,
  type IllustrationBaseProps,
  type IllustrationDimensionsMap,
} from './createIllustration';

// Loaded lazily — only fetched once a SpotSquare with applyTheme actually mounts — so the
// generated per-name svgEsmMap never lands in the static import graph of consumers that don't
// use theming.
const loadSpotSquareSvgEsmMap = () =>
  import('@coinbase/cds-illustrations/__generated__/spotSquare/data/svgEsmMap').then(
    (mod) => mod.default,
  );

export const SpotSquare = createIllustration(
  'spotSquare',
  spotSquareVersionMap,
  loadSpotSquareSvgEsmMap,
);

export type SpotSquareBaseProps = IllustrationBaseProps<'spotSquare'> &
  IllustrationA11yProps & {
    /**
     * @default 96x96
     * */
    dimension?: IllustrationDimensionsMap['spotSquare'];
  };

export type SpotSquareProps = SpotSquareBaseProps;
export type { SpotSquareName } from '@coinbase/cds-illustrations';
