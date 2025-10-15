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

      const startTime = Date.now();

      const intervalId = setInterval(() => {
        const element = document.getElementById(elementId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
          clearInterval(intervalId);
          return;
        }

        // Give up after 5 seconds
        if (Date.now() - startTime >= 5000) {
          clearInterval(intervalId);
        }
      }, 100);

      return () => clearInterval(intervalId);
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
