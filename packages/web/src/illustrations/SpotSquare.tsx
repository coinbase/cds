import spotSquareVersionMap from '@coinbase/cds-illustrations/__generated__/spotSquare/data/versionMap';

import {
  createIllustration,
  type IllustrationA11yProps,
  type IllustrationBaseProps,
  type IllustrationDimensionsMap,
} from './createIllustration';

export const SpotSquare = createIllustration('spotSquare', spotSquareVersionMap);

export type SpotSquareBaseProps = IllustrationBaseProps<'spotSquare'> &
  IllustrationA11yProps & {
    /**
     * @default 96x96
     * */
    dimension?: IllustrationDimensionsMap['spotSquare'];
  };

export type SpotSquareProps = SpotSquareBaseProps;
export type { SpotSquareName } from '@coinbase/cds-illustrations';
