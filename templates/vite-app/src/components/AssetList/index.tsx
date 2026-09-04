import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHeader,
  TableRow,
} from '@coinbase/cds-web/tables';
import { mockAccounts } from './data';
import { Tooltip } from '@coinbase/cds-web/overlays';
import { HStack } from '@coinbase/cds-web/layout';
import { Text } from '@coinbase/cds-web/typography';
import { useState } from 'react';
import { Icon } from '@coinbase/cds-web/icons';
import { Pagination } from '@coinbase/cds-web/pagination/Pagination';

export const AssetList = ({ pageSize }: { pageSize: number }) => {
  const totalResults = mockAccounts.length;
  const [activePage, setActivePage] = useState(1);
  const startIndex = (activePage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, totalResults);
  const accountsCopy = mockAccounts.slice(startIndex, endIndex);

  return (
    <Table tableLayout="auto" variant="ruled">
      <TableHeader>
        <TableRow>
          <TableCell title="Currency" width="60%" />
          <TableCell width="40%">
            <Tooltip content="Information about balance">
              <Text as="span" color="currentColor">
                <HStack>
                  Balance <Icon name="info" size="xs" />
                </HStack>
              </Text>
            </Tooltip>
          </TableCell>
          <TableCell alignItems="flex-end" title="Status" width="60%" />
        </TableRow>
      </TableHeader>
      <TableBody>
        {accountsCopy.map((account) => (
          <TableRow key={account.name}>
            <TableCell
              start={<Icon name="currencies" size="m" paddingEnd={1} />}
              subtitle={account.currency.name}
              title={account.name}
              width="60%"
            />
            <TableCell
              subtitle={account.balance.currency}
              title={`$${account.balance.amount}`}
              width="40%"
            />
            <TableCell direction="horizontal" justifyContent="flex-end" width="10%">
              <Icon
                color={account.primary ? 'fgPositive' : 'fgNegative'}
                name={account.primary ? 'circleCheckmark' : 'circleCross'}
                size="m"
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={2} direction="horizontal">
            <Pagination activePage={activePage} onChange={setActivePage} totalPages={5} />
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
};
