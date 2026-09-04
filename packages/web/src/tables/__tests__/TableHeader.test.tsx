import { render, screen } from '@testing-library/react';

import { Table } from '../Table';
import { TableBody } from '../TableBody';
import { TableCell } from '../TableCell';
import { TableHeader, tableHeaderStaticClassName } from '../TableHeader';
import { TableRow } from '../TableRow';

describe('TableHeader', () => {
  it('with sticky gets proper className', () => {
    const TEST_ID = 'table-header';

    render(
      <Table>
        <TableHeader sticky testID={TEST_ID}>
          <TableRow>
            <TableCell title="Header 1" />
            <TableCell title="Header 2" />
            <TableCell title="Header 3" />
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell title="Header 1" />
            <TableCell title="Header 2" />
            <TableCell title="Header 3" />
          </TableRow>
        </TableBody>
      </Table>,
    );

    const tableHeader = screen.getByTestId(TEST_ID);

    expect(tableHeader.className).toContain(tableHeaderStaticClassName);
    expect(tableHeader.className).toContain('tableStickyCss');
  });

  it('without sticky gets proper className', () => {
    const TEST_ID = 'table-header';

    render(
      <Table>
        <TableHeader testID={TEST_ID}>
          <TableRow>
            <TableCell title="Header 1" />
            <TableCell title="Header 2" />
            <TableCell title="Header 3" />
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell title="Header 1" />
            <TableCell title="Header 2" />
            <TableCell title="Header 3" />
          </TableRow>
        </TableBody>
      </Table>,
    );

    const tableHeader = screen.getByTestId(TEST_ID);

    expect(tableHeader.className).toContain(tableHeaderStaticClassName);
    expect(tableHeader.className).not.toContain('tableStickyStyle');
  });
});
