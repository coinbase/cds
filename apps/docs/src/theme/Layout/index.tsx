import '@coinbase/cds-icons/fonts/web/icon-font.css';

import { type JSX, useCallback } from 'react';
import { cx } from '@coinbase/cds-web';
import type { FallbackParams } from '@docusaurus/ErrorBoundary';
import ErrorBoundary from '@docusaurus/ErrorBoundary';
import { PageMetadata, SkipToContentFallbackId, ThemeClassNames } from '@docusaurus/theme-common';
import { useKeyboardNavigation } from '@docusaurus/theme-common/internal';
import AnnouncementBar from '@theme/AnnouncementBar';
import ErrorPageContent from '@theme/ErrorPageContent';
import type { Props } from '@theme/Layout';
import LayoutProvider from '@theme/Layout/Provider';
import Navbar from '@theme/Navbar';
import SkipToContent from '@theme/SkipToContent';

import styles from './styles.module.css';

export default function Layout(props: Props): JSX.Element {
  const {
    children,
    wrapperClassName,
    // Not really layout-related, but kept for convenience/retro-compatibility
    title,
    description,
  } = props;

  useKeyboardNavigation();

  const fallback = useCallback((params: FallbackParams) => <ErrorPageContent {...params} />, []);

  return (
    <LayoutProvider>
      <PageMetadata description={description} title={title} />
      <SkipToContent />
      <AnnouncementBar />
      <Navbar />
      <div
        className={cx(ThemeClassNames.wrapper.main, styles.mainWrapper, wrapperClassName)}
        id={SkipToContentFallbackId}
      >
        <ErrorBoundary fallback={fallback}>{children}</ErrorBoundary>
      </div>
    </LayoutProvider>
  );
}
