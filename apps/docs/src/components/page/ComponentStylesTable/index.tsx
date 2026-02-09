import { memo, useMemo } from 'react';
import { Box, VStack } from '@coinbase/cds-web/layout';
import { Link } from '@coinbase/cds-web/typography/Link';
import { Text } from '@coinbase/cds-web/typography/Text';
import type { StylesData, StyleSelector } from '@coinbase/docusaurus-plugin-docgen/types';
import DocusaurusLink from '@docusaurus/Link';

import styles from './styles.module.css';

type ComponentStylesTableProps = {
  styles: StylesData;
  componentName: string;
};

const StylesTableRow = ({
  selector,
  showClassName,
}: {
  selector: StyleSelector;
  showClassName: boolean;
}) => {
  const { selector: selectorName, className, description } = selector;

  return (
    <tr>
      <td className={styles.stylesTableCell}>
        <Text mono font="body">
          {selectorName}
        </Text>
      </td>
      {showClassName && (
        <td className={styles.stylesTableCell}>
          <Text mono font="body">
            {className || '--'}
          </Text>
        </td>
      )}
      <td className={styles.stylesTableCell}>
        <Text color="fgMuted" font="body">
          {description || '--'}
        </Text>
      </td>
    </tr>
  );
};

const StylesTable = ({ stylesData }: { stylesData: StylesData }) => {
  const hasAnyClassName = useMemo(
    () => stylesData.selectors.some((selector) => selector.className),
    [stylesData.selectors],
  );

  return (
    <table className={styles.stylesTable}>
      <thead className={styles.stylesTableHead}>
        <tr>
          <th className={hasAnyClassName ? styles.thThreeColSmall : styles.thTwoColSelector}>
            Selector
          </th>
          {hasAnyClassName && <th className={styles.thThreeColSmall}>Static class name</th>}
          <th className={hasAnyClassName ? styles.thThreeColLarge : styles.thTwoColDescription}>
            Description
          </th>
        </tr>
      </thead>
      <tbody>
        {stylesData.selectors.map((selector) => (
          <StylesTableRow
            key={selector.selector}
            selector={selector}
            showClassName={hasAnyClassName}
          />
        ))}
      </tbody>
    </table>
  );
};

export const ComponentStylesTable = memo(({ styles, componentName }: ComponentStylesTableProps) => {
  return (
    <VStack gap={0.5} paddingBottom={3}>
      <Text as="p" color="fgMuted" font="body">
        You can customize {componentName} using selectors for any of the supported{' '}
        <Link as={DocusaurusLink} to="/getting-started/styling">
          styling
        </Link>{' '}
        patterns.
      </Text>
      <Box maxWidth="100%">
        <StylesTable stylesData={styles} />
      </Box>
    </VStack>
  );
});
