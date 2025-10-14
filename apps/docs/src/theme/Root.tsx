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
      const elementId = window.location.hash.slice(1);
      const element = document.getElementById(elementId);

      if (element) {
        element.scrollIntoView();
        return;
      }

      // If not present, wait for the element to be added to the DOM
      const observer = new MutationObserver(() => {
        const element = document.getElementById(elementId);
        if (element) {
          element.scrollIntoView();
          observer.disconnect();
        }
      });

      observer.observe(document.body, { childList: true, subtree: true });
      return () => observer.disconnect();
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
