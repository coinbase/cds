import { figma } from '@figma/code-connect';

import { Table } from '../Table';
import { TableBody } from '../TableBody';
import { TableCell } from '../TableCell';
import { TableHeader } from '../TableHeader';
import { TableRow } from '../TableRow';

figma.connect(
  TableCell,
  'https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/✨-CDS-Components?node-id=8298-12299&m=dev',
  {
    imports: [
      "import { Table } from '@coinbase/cds-web/tables/Table'",
      "import { TableBody } from '@coinbase/cds-web/tables/TableBody'",
      "import { TableRow } from '@coinbase/cds-web/tables/TableRow'",
      "import { TableCell } from '@coinbase/cds-web/tables/TableCell'",
    ],
    props: {
      alignItems: figma.enum('alignment', {
        left: 'flex-start',
        right: 'flex-end',
      }),
      start: figma.boolean('show start', {
        true: figma.instance('↳ start'),
        false: undefined,
      }),
      title: figma.boolean('show title', {
        true: figma.string('↳ title'),
        false: '',
      }),
      subtitle: figma.boolean('show subtitle', {
        true: figma.string('↳ subtitle'),
        false: undefined,
      }),
      end: figma.boolean('show end', {
        true: figma.instance('↳ end'),
        false: undefined,
      }),
      compact: figma.boolean('compact'),
      variant: figma.enum('border style', {
        none: undefined,
        ruled: 'ruled',
        graph: 'graph',
      }),
    },
    example: ({ compact, variant, ...props }) => (
      <Table compact={compact} variant={variant}>
        <TableBody>
          <TableRow>
            <TableCell {...props} />
          </TableRow>
        </TableBody>
      </Table>
    ),
  },
);

figma.connect(
  TableCell,
  'https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/✨-CDS-Components?node-id=8298-12088&m=dev',
  {
    imports: [
      "import { Table } from '@coinbase/cds-web/tables/Table'",
      "import { TableHeader } from '@coinbase/cds-web/tables/TableHeader'",
      "import { TableRow } from '@coinbase/cds-web/tables/TableRow'",
      "import { TableCell } from '@coinbase/cds-web/tables/TableCell'",
    ],
    props: {
      alignItems: figma.enum('alignment', {
        left: 'flex-start',
        right: 'flex-end',
      }),
      start: figma.boolean('show start', {
        true: figma.instance('↳ start'),
        false: undefined,
      }),
      title: figma.boolean('show middle', {
        true: figma.string('↳ title'),
        false: '',
      }),
      subtitle: figma.boolean('show subtitle', {
        true: figma.string('↳ subtitle'),
        false: undefined,
      }),
      end: figma.boolean('show end', {
        true: figma.instance('↳ end'),
        false: undefined,
      }),
      compact: figma.boolean('compact'),
      variant: figma.enum('border style', {
        none: 'default',
        ruled: 'ruled',
        graph: 'graph',
      }),
      backgroundColor: figma.boolean('show background', {
        true: 'bgAlternate',
        false: undefined,
      }),
    },
    example: ({ compact, variant, backgroundColor, ...props }) => (
      <Table compact={compact} variant={variant}>
        <TableHeader>
          <TableRow backgroundColor={backgroundColor}>
            <TableCell {...props} />
          </TableRow>
        </TableHeader>
      </Table>
    ),
  },
);
