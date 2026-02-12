import React, { useMemo } from 'react';
import type { BannerProps } from '@coinbase/cds-web/banner/Banner';
import { Banner } from '@coinbase/cds-web/banner/Banner';
import { processAdmonitionProps } from '@docusaurus/theme-common';
import type { Props } from '@theme/Admonition';

import styles from './styles.module.css';

export default function Admonition(unprocessedProps: Props): React.ReactNode {
  const props = processAdmonitionProps(unprocessedProps);
  const { title, children, type } = props;
  const bannerProps: Pick<BannerProps, 'variant' | 'title' | 'children' | 'startIcon'> =
    useMemo(() => {
      switch (type) {
        case 'warning':
          return {
            variant: 'warning',
            title: title ?? 'Warning',
            children,
            startIcon: 'warning',
            borderWidth: 100,
            borderColor: 'bgWarning',
          };
        case 'danger':
          return {
            variant: 'error',
            title: title ?? 'Danger',
            children,
            startIcon: 'error',
            borderWidth: 100,
            borderColor: 'bgNegative',
          };
        case 'tip':
          return {
            variant: 'promotional',
            title: title ?? 'Tip',
            children,
            startIcon: 'info',
            borderWidth: 100,
            borderColor: 'bgPrimary',
          };
        case 'note':
        default:
          return {
            variant: 'informational',
            title: title ?? 'Note',
            children,
            startIcon: 'info',
            borderWidth: 100,
            borderColor: 'bgLine',
          };
      }
    }, [title, children, type]);
  return <Banner className={styles.docsAdmonition} minWidth={0} {...bannerProps} />;
}
