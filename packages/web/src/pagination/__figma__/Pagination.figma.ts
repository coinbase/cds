// url=https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/CDS-Components?node-id=49607-6651
// source=packages/web/src/pagination/Pagination.tsx
// component=Pagination
import figma from 'figma';

const instance = figma.selectedInstance;

// Maps the Figma "number of pages" variant to a representative totalPages value.
// "5< pages" = few pages (no ellipsis), "5+ pages" = some pages (with ellipsis),
// "50+ pages" = many pages (with jump-to-page input on desktop).
const totalPages = instance.getEnum('number of pages', {
  '5< pages': 5,
  '5+ pages': 10,
  '50+ pages': 50,
});

// eslint-disable-next-line no-restricted-exports
export default {
  example: figma.code`<Pagination
  activePage={1}
  onChange={(page) => {}}
  totalPages={${totalPages}}
/>`,
  imports: ['import { Pagination } from "@coinbase/cds-web/pagination"'],
  id: 'pagination',
  metadata: { nestable: false },
};
