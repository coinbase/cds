import { memo } from 'react';
import { Table, TableBody, TableCell, TableHeader, TableRow } from '@coinbase/cds-web/tables';

export const TableExample = memo(() => {
  return (
    <Table accessibilityLabel="Portfolio holdings" variant="default">
      <TableHeader>
        <TableRow>
          <TableCell as="th" title="Asset" />
          <TableCell as="th" title="Price" />
          <TableCell as="th" title="Change" />
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell subtitle="BTC" title="Bitcoin" />
          <TableCell title="$64,231.00" />
          <TableCell title="+2.4%" />
        </TableRow>
        <TableRow>
          <TableCell subtitle="ETH" title="Ethereum" />
          <TableCell title="$3,421.50" />
          <TableCell title="-0.8%" />
        </TableRow>
        <TableRow>
          <TableCell subtitle="SOL" title="Solana" />
          <TableCell title="$142.30" />
          <TableCell title="+5.1%" />
        </TableRow>
      </TableBody>
    </Table>
  );
});
