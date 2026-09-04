import { renderA11y } from '@coinbase/cds-web-utils/jest';

import { Table } from '../Table';
import { TableBody } from '../TableBody';
import { TableFooter } from '../TableFooter';
import { TableHeader } from '../TableHeader';

describe('Table Sections', () => {
  it('Table Head passes accessibility', async () => {
    expect(
      await renderA11y(
        <Table>
          <TableHeader>
            <tr>
              <th>Heading 1</th>
              <th>Heading 2</th>
            </tr>
          </TableHeader>
        </Table>,
      ),
    ).toHaveNoViolations();
  });
  it('Table Body passes accessibility', async () => {
    expect(
      await renderA11y(
        <Table>
          <TableBody>
            <tr>
              <td>Cell 1</td>
              <td>Cell 2</td>
            </tr>
          </TableBody>
        </Table>,
      ),
    ).toHaveNoViolations();
  });
  it('Table Foot passes accessibility', async () => {
    expect(
      await renderA11y(
        <Table>
          <TableFooter>
            <tr>
              <td>Foot Cell 1</td>
              <td>Foot Cell 2</td>
            </tr>
          </TableFooter>
        </Table>,
      ),
    ).toHaveNoViolations();
  });
  it('Combined sections pass accessibility', async () => {
    expect(
      await renderA11y(
        <Table>
          <TableHeader>
            <tr>
              <th>Heading 1</th>
              <th>Heading 2</th>
            </tr>
          </TableHeader>
          <TableBody>
            <tr>
              <td>Cell 1</td>
              <td>Cell 2</td>
            </tr>
          </TableBody>
          <TableFooter>
            <tr>
              <td>Foot Cell 1</td>
              <td>Foot Cell 2</td>
            </tr>
          </TableFooter>
        </Table>,
      ),
    ).toHaveNoViolations();
  });
});
