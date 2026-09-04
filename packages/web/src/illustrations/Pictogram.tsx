import pictogramSvgEsmMap from '@coinbase/cds-illustrations/__generated__/pictogram/data/svgEsmMap';
import pictogramVersionMap from '@coinbase/cds-illustrations/__generated__/pictogram/data/versionMap';

import {
  createIllustration,
  type IllustrationA11yProps,
  type IllustrationBaseProps,
  type IllustrationDimensionsMap,
} from './createIllustration';

export const Pictogram = createIllustration('pictogram', pictogramVersionMap, pictogramSvgEsmMap);

export type PictogramBaseProps = IllustrationBaseProps<'pictogram'> &
  IllustrationA11yProps & {
    /**
     * @default 48x48
     * */
    dimension?: IllustrationDimensionsMap['pictogram'];
  };

export type PictogramProps = PictogramBaseProps;
export type { PictogramName } from '@coinbase/cds-illustrations';
