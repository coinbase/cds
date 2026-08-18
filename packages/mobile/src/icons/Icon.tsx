import type { RegisteredIconName } from '@coinbase/cds-common/types/IconName';
import { glyphMap } from '@coinbase/cds-icons/glyphMap';

import {
  createIcon,
  DEFAULT_ICON_FONT_FAMILY,
  getIconSourceSize,
  type IconBaseProps as IconBasePropsGeneric,
  type IconProps as IconPropsGeneric,
} from './createIcon';

// Accepted names include any registered through `Cds.IconNameRegistry`, so
// glyphs added via `IconGlyphSourceProvider` can be rendered by name.
export type IconBaseProps = IconBasePropsGeneric<RegisteredIconName>;
export type IconProps = IconPropsGeneric<RegisteredIconName>;

export const Icon = createIcon<RegisteredIconName>({
  glyphMap,
  fontFamily: DEFAULT_ICON_FONT_FAMILY,
});

export { getIconSourceSize };
