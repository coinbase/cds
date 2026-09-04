import { renderA11y } from '@coinbase/cds-web-utils/jest';
import { render, screen } from '@testing-library/react';

import { Table } from '../Table';
import { TableBody } from '../TableBody';
import { TableCellFallback } from '../TableCellFallback';
import { TableRow } from '../TableRow';

describe('Table Cell Fallback', () => {
  it('passes accessibility', async () => {
    expect(
      await renderA11y(
        <Table>
          <TableBody>
            <TableRow>
              <TableCellFallback disableRandomRectWidth subtitle title />
            </TableRow>
          </TableBody>
        </Table>,
      ),
    ).toHaveNoViolations();
  });

  it('renders fallback', () => {
    render(
      <Table>
        <TableBody>
          <TableRow>
            <TableCellFallback disableRandomRectWidth subtitle title end="image" start="image" />
          </TableRow>
        </TableBody>
      </Table>,
    );

    expect(screen.getByTestId('table-cell-fallback-title')).toBeTruthy();
    expect(screen.getByTestId('table-cell-fallback-subtitle')).toBeTruthy();
    expect(screen.getByTestId('table-cell-fallback-media')).toBeTruthy();
    expect(screen.getByTestId('table-cell-fallback-accessory')).toBeTruthy();
  });
});
