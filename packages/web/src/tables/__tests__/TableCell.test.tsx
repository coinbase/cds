import { renderA11y } from '@coinbase/cds-web-utils/jest';
import { css } from '@linaria/core';
import { render, screen } from '@testing-library/react';

import { Table } from '../Table';
import { TableBody } from '../TableBody';
import { TableCell } from '../TableCell';
import { TableHeader } from '../TableHeader';
import { TableRow } from '../TableRow';

const testCss = css`
  display: flex;
`;
const exampleTestId = 'table-cell-test';

describe('Table Cell', () => {
  it('passes accessibility', async () => {
    expect(
      await renderA11y(
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>Cell</TableCell>
            </TableRow>
          </TableBody>
        </Table>,
      ),
    ).toHaveNoViolations();
  });

  it('renders with children', () => {
    render(
      <Table>
        <TableBody>
          <TableRow>
            <TableCell testID={exampleTestId}>children text</TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    );

    expect(screen.getByText('children text')).toBeTruthy();
  });

  it('assigns default header scope correctly', () => {
    render(
      <Table>
        <TableHeader>
          <TableRow>
            <TableCell testID={exampleTestId}>Header Cell</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell as="th" testID="row-header-cell">
              Row Header Cell
            </TableCell>
            <TableCell testID="body-cell">Body Cell</TableCell>
            <TableCell as="th" scope="col" testID="custom-scope-cell">
              Custom Scope Cell
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    );

    expect(screen.getByTestId(exampleTestId)).toHaveAttribute('scope', 'col');
    expect(screen.getByTestId('row-header-cell')).toHaveAttribute('scope', 'row');
    expect(screen.getByTestId('body-cell')).not.toHaveAttribute('scope');
    expect(screen.getByTestId('custom-scope-cell')).toHaveAttribute('scope', 'col');
  });

  it('renders with title and subtitle', () => {
    render(
      <Table>
        <TableBody>
          <TableRow>
            <TableCell subtitle="test subtitle" testID={exampleTestId} title="test title" />
          </TableRow>
        </TableBody>
      </Table>,
    );

    expect(screen.getByText('test title')).toBeTruthy();
    expect(screen.getByText('test subtitle')).toBeTruthy();
  });

  it('renders start element', () => {
    render(
      <Table>
        <TableBody>
          <TableRow>
            <TableCell start={<div>test start element</div>} testID={exampleTestId}>
              Cell
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    );

    expect(screen.getByText('test start element')).toBeTruthy();
  });

  it('renders end element', () => {
    render(
      <Table>
        <TableBody>
          <TableRow>
            <TableCell end={<div>test end element</div>} testID={exampleTestId}>
              Cell
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    );

    expect(screen.getByText('test end element')).toBeTruthy();
  });

  it('passes a className to className', () => {
    render(
      <Table>
        <TableBody>
          <TableRow>
            <TableCell className={testCss} testID={exampleTestId}>
              Cell
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    );

    expect(screen.getByTestId(exampleTestId)).toHaveClass(testCss);
  });
});
