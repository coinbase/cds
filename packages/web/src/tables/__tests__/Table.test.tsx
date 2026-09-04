import { useRef } from 'react';
import { renderA11y } from '@coinbase/cds-web-utils/jest';
import { render, screen } from '@testing-library/react';

import { Text } from '../../typography/Text';
import type { TableProps } from '../Table';
import { Table } from '../Table';

const A11Y_LABEL = 'An accessible label';

type TableMockProps = Omit<TableProps, 'children'>;

const TableMock = (props: TableMockProps) => (
  <Table {...props}>
    <tbody>
      <tr>
        <td>Child</td>
      </tr>
    </tbody>
  </Table>
);

const TableMockWithRef = (props: TableMockProps) => {
  const tableRef = useRef<HTMLTableElement | null>(null);

  return (
    <Table ref={tableRef} {...props}>
      <thead>
        <tr>
          <th>Header</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Cell</td>
        </tr>
      </tbody>
    </Table>
  );
};

describe('Table', () => {
  it('passes accessibility', async () => {
    expect(await renderA11y(<TableMock />)).toHaveNoViolations();
  });

  it('has an accessible name when accessibilityLabelledBy is set', () => {
    render(
      <>
        <Text as="h2" display="block" font="title2" id="table-title">
          {A11Y_LABEL}
        </Text>
        <TableMock accessibilityLabelledBy="table-title" />
      </>,
    );

    expect(screen.getByLabelText(A11Y_LABEL)).toBeTruthy();
  });

  it('has an accessible name when accessibilityLabel is set', () => {
    render(<TableMock accessibilityLabel={A11Y_LABEL} />);

    expect(screen.getByLabelText(A11Y_LABEL)).toBeTruthy();
  });

  it('is passed with the ref and renders the table', async () => {
    render(<TableMockWithRef />);

    const tableElement = screen.getByRole('table');
    expect(tableElement).toBeInTheDocument();
  });

  const testClassName = 'test-class-name';
  const exampleTestId = 'table-test-id';
  it('passes className', () => {
    render(<TableMock className={testClassName} testID={exampleTestId} />);

    expect(screen.getByTestId(exampleTestId)).toHaveClass(testClassName);
  });
});
