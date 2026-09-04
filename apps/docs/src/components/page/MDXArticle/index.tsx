import React from 'react';
import { Box, Divider } from '@coinbase/cds-web/layout';

import styles from './style.module.css';

export function MDXArticle({
  children,
  hideDivider,
}: {
  children: React.ReactNode;
  hideDivider: boolean;
}) {
  return (
    <>
      <Box as="article" className={styles.articleContainer} display="block" padding={4}>
        {children}
      </Box>
      {!hideDivider && <Divider className={styles.divider} />}
    </>
  );
}
