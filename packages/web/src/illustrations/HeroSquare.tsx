import heroSquareVersionMap from '@coinbase/cds-illustrations/__generated__/heroSquare/data/versionMap';

import {
  createIllustration,
  type IllustrationA11yProps,
  type IllustrationBaseProps,
  type IllustrationDimensionsMap,
} from './createIllustration';

export type HeroSquareBaseProps = IllustrationBaseProps<'heroSquare'> &
  IllustrationA11yProps & {
    /**
     * HeroSquare dimensions.
     * @default  240x240
     * */
    dimension?: IllustrationDimensionsMap['heroSquare'];
  };

export type HeroSquareProps = HeroSquareBaseProps;

// Loaded lazily — only fetched once a HeroSquare with applyTheme actually mounts — so the
// generated per-name svgEsmMap never lands in the static import graph of consumers that don't
// use theming.
const loadHeroSquareSvgEsmMap = () =>
  import('@coinbase/cds-illustrations/__generated__/heroSquare/data/svgEsmMap').then(
    (mod) => mod.default,
  );

export const HeroSquare = createIllustration(
  'heroSquare',
  heroSquareVersionMap,
  loadHeroSquareSvgEsmMap,
);

export type { HeroSquareName } from '@coinbase/cds-illustrations/__generated__/heroSquare/types/HeroSquareName';
