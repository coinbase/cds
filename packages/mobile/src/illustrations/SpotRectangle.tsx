import spotRectangleIllustrations from '@coinbase/cds-illustrations/__generated__/spotRectangle/data/svgJsMap';

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

export const SpotRectangle = createIllustration('spotRectangle', spotRectangleIllustrations);

export type { SpotRectangleName } from '@coinbase/cds-illustrations';
