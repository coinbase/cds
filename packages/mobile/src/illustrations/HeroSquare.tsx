import heroSquareIllustrations from '@coinbase/cds-illustrations/__generated__/heroSquare/data/svgJsMap';

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

export const HeroSquare = createIllustration('heroSquare', heroSquareIllustrations);

export type { HeroSquareName } from '@coinbase/cds-illustrations';
