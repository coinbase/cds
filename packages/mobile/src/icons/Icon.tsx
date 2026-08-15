import type { IconName } from '@coinbase/cds-common/types/IconName';
import { glyphMap } from '@coinbase/cds-icons/glyphMap';

import {
  createIcon,
  DEFAULT_ICON_FONT_FAMILY,
  getIconSourceSize,
  type IconBaseProps as IconBasePropsGeneric,
  type IconProps as IconPropsGeneric,
} from './createIcon';

export type IconBaseProps = IconBasePropsGeneric<IconName>;
export type IconProps = IconPropsGeneric<IconName>;

export const Icon = createIcon<IconName>({
  glyphMap,
  fontFamily: DEFAULT_ICON_FONT_FAMILY,
});

export { getIconSourceSize };
