import { memo, type ReactNode } from 'react';
import { Tag } from '@coinbase/cds-web/tag/Tag';
import { Text } from '@coinbase/cds-web/typography/Text';

import styles from './styles.module.css';

export type DeprecationPackage = 'common' | 'mobile' | 'web';

export type DeprecationTableRow = {
  packages: DeprecationPackage[];
  deprecated: ReactNode;
  notes?: ReactNode;
};

type DeprecationTableProps = {
  rows: DeprecationTableRow[];
};

const packageLabelMap: Record<DeprecationPackage, string> = {
  common: 'Common',
  mobile: 'Mobile',
  web: 'Web',
};

const packageColorSchemeMap: Record<DeprecationPackage, 'blue' | 'gray' | 'green'> = {
  common: 'gray',
  mobile: 'green',
  web: 'blue',
};

function PackageTags({ packages }: { packages: DeprecationPackage[] }) {
  return (
    <span className={styles.packageTags}>
      {packages.map((packageName) => (
        <Tag key={packageName} colorScheme={packageColorSchemeMap[packageName]}>
          {packageLabelMap[packageName]}
        </Tag>
      ))}
    </span>
  );
}

export const DeprecationTable = memo(({ rows }: DeprecationTableProps) => {
  return (
    <table className={styles.deprecationTable}>
      <thead className={styles.deprecationTableHead}>
        <tr>
          <th className={styles.deprecationColumn}>Deprecation</th>
          <th className={styles.packageColumn}>Package</th>
          <th className={styles.notesColumn}>Notes</th>
        </tr>
      </thead>
      <tbody>
        {rows.map(({ deprecated, notes, packages }, index) => (
          <tr key={`${String(deprecated)}-${index}`}>
            <td className={styles.deprecationTableCell}>
              <Text mono as="span" font="body">
                {deprecated}
              </Text>
            </td>
            <td className={styles.deprecationTableCell}>
              <PackageTags packages={packages} />
            </td>
            <td className={styles.deprecationTableCell}>
              <Text as="span" color="fgMuted" font="body">
                {notes || '--'}
              </Text>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
});
