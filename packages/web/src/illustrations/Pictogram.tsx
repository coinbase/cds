import pictogramVersionMap from '@coinbase/cds-illustrations/__generated__/pictogram/data/versionMap';

import {
  createIllustration,
  type IllustrationA11yProps,
  type IllustrationBaseProps,
  type IllustrationDimensionsMap,
} from './createIllustration';

// Loaded lazily — only fetched once a Pictogram with applyTheme actually mounts — so the
// generated per-name svgEsmMap never lands in the static import graph of consumers that don't
// use theming.
const loadPictogramSvgEsmMap = () =>
  import('@coinbase/cds-illustrations/__generated__/pictogram/data/svgEsmMap').then(
    (mod) => mod.default,
  );

export const Pictogram = createIllustration(
  'pictogram',
  pictogramVersionMap,
  loadPictogramSvgEsmMap,
);

export type PictogramBaseProps = IllustrationBaseProps<'pictogram'> &
  IllustrationA11yProps & {
    /**
     * @default 48x48
     * */
    dimension?: IllustrationDimensionsMap['pictogram'];
  };

export type PictogramProps = PictogramBaseProps;
export type { PictogramName } from '@coinbase/cds-illustrations';
