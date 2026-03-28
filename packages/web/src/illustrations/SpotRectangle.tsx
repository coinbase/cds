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

export const SpotRectangle = createIllustration('spotRectangle', spotRectangleVersionMap);

export type { SpotRectangleName } from '@coinbase/cds-illustrations';
