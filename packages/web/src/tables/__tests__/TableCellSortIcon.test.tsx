import { renderA11y } from '@coinbase/cds-web-utils/jest';

import { DefaultThemeProvider } from '../../utils/test';
import { TableCellSortIcon } from '../TableCellSortIcon';

describe('Table Cell Sort Icon', () => {
  it('passes accessibility', async () => {
    expect(
      await renderA11y(
        <DefaultThemeProvider>
          <TableCellSortIcon />
        </DefaultThemeProvider>,
      ),
    ).toHaveNoViolations();
    expect(
      await renderA11y(
        <DefaultThemeProvider>
          <TableCellSortIcon direction="ascending" />
        </DefaultThemeProvider>,
      ),
    ).toHaveNoViolations();
    expect(
      await renderA11y(
        <DefaultThemeProvider>
          <TableCellSortIcon direction="descending" />
        </DefaultThemeProvider>,
      ),
    ).toHaveNoViolations();
  });
});
