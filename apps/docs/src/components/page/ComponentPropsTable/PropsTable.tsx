import PropsTableRow from './PropsTableRow';
import type { PropsTableProps } from './types';

function PropsTable({ props, sharedTypeAliases, searchTerm }: PropsTableProps) {
  return (
    <table>
      <thead>
        <tr>
          <th style={{ width: '40%' }}>Name</th>
          <th style={{ width: '40%' }}>Type</th>
          <th style={{ width: '20%' }}>Default</th>
        </tr>
      </thead>
      <tbody>
        {props.map((item) => (
          <PropsTableRow
            key={item.name}
            prop={item}
            searchTerm={searchTerm}
            sharedTypeAliases={sharedTypeAliases}
          />
        ))}
      </tbody>
    </table>
  );
}

export default PropsTable;
