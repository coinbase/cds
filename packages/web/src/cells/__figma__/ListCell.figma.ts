// url=https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/CDS-Components?node-id=62311-39845
// source=packages/web/src/cells/ListCell.tsx
// component=ListCell
import figma from 'figma';

const instance = figma.selectedInstance;

// --- Text content (read from named text layers) ---
const titleHandle = instance.findText('Title');
const title = titleHandle.type === 'TEXT' ? titleHandle.textContent : 'Title';

const showSubtitle = instance.getBoolean('show subtitle');
const subtitleHandle = instance.findText('Subtitle');
const subtitle = subtitleHandle.type === 'TEXT' ? subtitleHandle.textContent : 'Subtitle';

const showDescription = instance.getBoolean('show description');
const descriptionHandle = instance.findText('Description');
const description =
  descriptionHandle.type === 'TEXT' ? descriptionHandle.textContent : 'Description';

// --- End area: detail / subdetail text (inside the nested end/subdetail instance) ---
const showEnd = instance.getBoolean('show end');
const detailHandle = instance.findText('Detail', {
  traverseInstances: true,
  path: ['end/subdetail'],
});
const detail = detailHandle.type === 'TEXT' ? detailHandle.textContent : 'Detail';
const subdetailHandle = instance.findText('SubDetail', {
  traverseInstances: true,
  path: ['end/subdetail'],
});
const subdetail = subdetailHandle.type === 'TEXT' ? subdetailHandle.textContent : 'Subdetail';

// --- Media (start slot) ---
const showMedia = instance.getBoolean('show start');
const mediaInstance = instance.getInstanceSwap('↳ media');
let mediaCode;
if (showMedia && mediaInstance && mediaInstance.type === 'INSTANCE') {
  mediaCode = mediaInstance.executeTemplate().example;
}

// --- Accessory ---
// The ↳ accessory INSTANCE_SWAP maps to the string-typed `accessory` code prop
// ('arrow' | 'more' | 'selected' | 'unselected'). The Figma instance name cannot be
// automatically converted to the string value, so "arrow" is used as a representative placeholder.
const showAccessory = instance.getBoolean('show accessory');

// --- State ---
const state = instance.getEnum('state', {
  default: 'default',
  focus: 'focus',
  hovered: 'hovered',
  pressed: 'pressed',
  selected: 'selected',
  disabled: 'disabled',
});
const selected = state === 'selected';
const disabled = state === 'disabled';

// --- Helper text ---
const showHelperText = instance.getBoolean('show helper text');

// eslint-disable-next-line no-restricted-exports
export default {
  example: figma.code`<ListCell
  title="${title}"
  ${showSubtitle ? figma.code`subtitle="${subtitle}"` : ''}
  ${showDescription ? figma.code`description="${description}"` : ''}
  ${showEnd ? figma.code`detail="${detail}"` : ''}
  ${showEnd ? figma.code`subdetail="${subdetail}"` : ''}
  ${showMedia && mediaCode ? figma.code`media={${mediaCode}}` : ''}
  ${showAccessory ? 'accessory="arrow"' : ''}
  ${selected ? 'selected' : ''}
  ${disabled ? 'disabled' : ''}
  ${showHelperText ? 'helperText="Helper text"' : ''}
/>`,
  imports: ['import { ListCell } from "@coinbase/cds-web/cells"'],
  id: 'list-cell',
  metadata: { nestable: true },
};
