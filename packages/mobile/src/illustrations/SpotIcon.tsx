import svgJsMap from '@coinbase/cds-illustrations/__generated__/spotIcon/data/svgJsMap';

import {
  createIllustration,
  type IllustrationA11yProps,
  type IllustrationBaseProps,
  type IllustrationDimensionsMap,
} from './createIllustration';

export const SpotIcon = createIllustration('spotIcon', svgJsMap);

export type SpotIconBaseProps = IllustrationBaseProps<'spotIcon'> &
  IllustrationA11yProps & {
    /**
     * @default 32x32
     * */
    dimension?: IllustrationDimensionsMap['spotSquare'];
  };

export type SpotIconProps = SpotIconBaseProps;
export type { SpotIconName } from '@coinbase/cds-illustrations';
