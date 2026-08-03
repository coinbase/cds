// url=https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/CDS-Components?node-id=252-12575
// source=packages/mobile/src/controls/SearchInput.tsx
// component=SearchInput
import figma from 'figma';

const instance = figma.selectedInstance;

// --- property extractions ---
// size maps directly to the t-shirt size prop; 'l' is the default
const size = instance.getEnum('size', { l: 'l', m: 'm', s: 's' });
const disabled = instance.getEnum('disabled', {
  true: true,
  false: false,
});
// placeholder text is stored in the nested string.search input instance's text layer
const placeholderHandle = instance.findText('search-input-label', { traverseInstances: true });
const placeholder =
  placeholderHandle && placeholderHandle.type === 'TEXT' ? placeholderHandle.textContent : '';

// eslint-disable-next-line no-restricted-exports
export default {
  example: figma.code`<SearchInput
  ${size !== 'l' ? figma.code`size="${size}"` : ''}
  ${disabled ? 'disabled' : ''}
  ${placeholder ? figma.code`placeholder="${placeholder}"` : ''}
  onChangeText={(text) => {}}
  value=""
/>`,
  imports: ['import { SearchInput } from "@coinbase/cds-mobile/controls"'],
  id: 'search-input-mobile',
  metadata: { nestable: true },
};
