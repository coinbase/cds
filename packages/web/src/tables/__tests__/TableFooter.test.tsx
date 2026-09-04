import { renderA11y } from '@coinbase/cds-web-utils/jest';
import { render, screen } from '@testing-library/react';

import { Table } from '../Table';
import { TableCell } from '../TableCell';
import { TableFooter } from '../TableFooter';
import { TableRow } from '../TableRow';

describe('TableFooter', () => {
  const TEST_ID = 'table-footer-testid-test';
  it('attaches testID', () => {
    render(
      <Table>
        <TableFooter testID={TEST_ID}>
          <TableRow>
            <TableCell title="Test Footer" />
          </TableRow>
        </TableFooter>
      </Table>,
    );
    expect(screen.getByTestId(TEST_ID)).toBeInTheDocument();
  });

  it('renders table footer content', () => {
    render(
      <Table>
        <TableFooter testID={TEST_ID}>
          <TableRow>
            <TableCell title="Test Footer" />
          </TableRow>
        </TableFooter>
      </Table>,
    );
    expect(screen.getByText('Test Footer')).toBeInTheDocument();
  });

  it('passes accessibility', async () => {
    expect(
      await renderA11y(
        <Table>
          <TableFooter testID={TEST_ID}>
            <TableRow>
              <TableCell title="Test Footer" />
            </TableRow>
          </TableFooter>
        </Table>,
      ),
    ).toHaveNoViolations();
  });
});
