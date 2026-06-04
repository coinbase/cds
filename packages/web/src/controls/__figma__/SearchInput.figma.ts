// url=https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/CDS-Components?node-id=67-767
// source=packages/web/src/controls/SearchInput.tsx
// component=SearchInput
import figma from 'figma';

const instance = figma.selectedInstance;

// Placeholder text lives in the nested string.search input child instance
const placeholderHandle = instance.findText('search-input-label', { traverseInstances: true });
const placeholder = placeholderHandle.type === 'TEXT' ? placeholderHandle.textContent : 'Search';

// compact and disabled are VARIANT types with string "true"/"false" values
const compact = instance.getEnum('compact', { true: true, false: false });
const disabled = instance.getEnum('disabled', { true: true, false: false });

// state (default, active, focus, typing, hover) and show cursor are interaction-only states with no code equivalent

// eslint-disable-next-line no-restricted-exports
export default {
  example: figma.code`<SearchInput
  placeholder="${placeholder}"
  ${compact ? 'compact' : ''}
  ${disabled ? 'disabled' : ''}
  onChangeText={() => {}}
  value=""
/>`,
  imports: ['import { SearchInput } from "@coinbase/cds-web/controls"'],
  id: 'search-input-desktop',
  metadata: { nestable: false },
};
