import pictogramIllustrations from '@coinbase/cds-illustrations/__generated__/pictogram/data/svgJsMap';

import {
  createIllustration,
  type IllustrationA11yProps,
  type IllustrationBaseProps,
  type IllustrationDimensionsMap,
} from './createIllustration';

export type PictogramBaseProps = IllustrationBaseProps<'pictogram'> &
  IllustrationA11yProps & {
    /**
     * @default 48x48
     * */
    dimension?: IllustrationDimensionsMap['pictogram'];
  };

export type PictogramProps = PictogramBaseProps;

export const Pictogram = createIllustration('pictogram', pictogramIllustrations);

export type { PictogramName } from '@coinbase/cds-illustrations';
