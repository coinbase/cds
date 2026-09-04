import type { DotVariant } from './DotBaseProps';
import type { PinPlacement } from './Placement';

export type DotCountVariants = Extract<DotVariant, 'negative'>;

export type DotCountPinPlacement = Extract<PinPlacement, 'top-end'>;
