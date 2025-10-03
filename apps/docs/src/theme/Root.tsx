import React, { useEffect } from 'react';
import { useLocation } from '@docusaurus/router';
import { PropsTOCProvider } from '@site/src/utils/toc/PropsTOCManager';
import { TOCProvider } from '@site/src/utils/toc/TOCManager';
import { useAnalytics } from '@site/src/utils/useAnalytics';

export default function Root({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const { postMetric } = useAnalytics();

  useEffect(() => {
    if (window.location.hash) {
      const element = document.getElementById(window.location.hash.slice(1));
      if (element) {
        element.scrollIntoView();
      }
    }
  }, []);

  // Track page view events
  useEffect(() => {
    postMetric('cdsDocs', {
      command: 'page_view',
      arguments: location.search || undefined,
      context: location.pathname,
    });
  }, [location.pathname, location.search, postMetric]);

  return (
    <TOCProvider>
      <PropsTOCProvider>{children}</PropsTOCProvider>
    </TOCProvider>
  );
}
