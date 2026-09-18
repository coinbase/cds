import spotIconVersionMap from '@coinbase/cds-illustrations/__generated__/spotIcon/data/versionMap';

import {
  createIllustration,
  type IllustrationA11yProps,
  type IllustrationBaseProps,
  type IllustrationDimensionsMap,
} from './createIllustration';

// Loaded lazily — only fetched once a SpotIcon with applyTheme actually mounts — so the
// generated per-name svgEsmMap never lands in the static import graph of consumers that don't
// use theming.
const loadSpotIconSvgEsmMap = () =>
  import('@coinbase/cds-illustrations/__generated__/spotIcon/data/svgEsmMap').then(
    (mod) => mod.default,
  );

export const SpotIcon = createIllustration('spotIcon', spotIconVersionMap, loadSpotIconSvgEsmMap);

export type SpotIconBaseProps = IllustrationBaseProps<'spotIcon'> &
  IllustrationA11yProps & {
    /**
     * @default 32x32
     * */
    dimension?: IllustrationDimensionsMap['spotSquare'];
  };
export type SpotIconProps = SpotIconBaseProps;
export type { SpotIconName } from '@coinbase/cds-illustrations';
