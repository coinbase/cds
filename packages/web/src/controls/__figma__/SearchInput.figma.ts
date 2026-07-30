// url=https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/CDS-Components?node-id=67-767
// source=packages/web/src/controls/SearchInput.tsx
// component=SearchInput
import figma from 'figma';

const instance = figma.selectedInstance;

// Placeholder text lives in the nested string.search input child instance
const placeholderHandle = instance.findText('search-input-label', { traverseInstances: true });
const placeholder = placeholderHandle.type === 'TEXT' ? placeholderHandle.textContent : 'Search';

// disabled is a VARIANT type with string "true"/"false" values
const disabled = instance.getEnum('disabled', { true: true, false: false });

// size maps directly to the t-shirt size prop; 'l' is the default
const size = instance.getEnum('size', { l: 'l', m: 'm', s: 's' });

// state (default, active, focus, typing, hover) and show cursor are interaction-only states with no code equivalent

// eslint-disable-next-line no-restricted-exports
export default {
  example: figma.code`<SearchInput
  placeholder="${placeholder}"
  ${size !== 'l' ? figma.code`size="${size}"` : ''}
  ${disabled ? 'disabled' : ''}
  onChangeText={() => {}}
  value=""
/>`,
  imports: ['import { SearchInput } from "@coinbase/cds-web/controls"'],
  id: 'search-input-desktop',
  metadata: { nestable: true },
};
