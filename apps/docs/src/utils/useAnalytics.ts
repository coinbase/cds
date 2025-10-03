import { useCallback } from 'react';

import { useCDSVersions } from '../hooks/useCDSVersions';

type GtagAnalyticsEvent = {
  action: string;
  category?: string;
  label?: string;
  value?: number;
};

const sessionId = `session_${Date.now()}_${Math.random().toString(36).substring(7)}`;

const ANALYTICS_URL = 'https://api.developer.coinbase.com/analytics';

type CdsEventType = 'cdsCli' | 'cdsMcp' | 'cdsDocs';

type CdsEventData = {
  version: string;
  command: string;
  arguments?: string;
  context?: string;
};

export function useAnalytics() {
  const cdsVersions = useCDSVersions();

  const postMetric = useCallback(
    (eventType: CdsEventType, data: Omit<CdsEventData, 'version'>) => {
      fetch(ANALYTICS_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          eventType,
          sessionId,
          data: {
            version: cdsVersions.cdsCommonVersion,
            ...data,
          } satisfies CdsEventData,
        }),
      }).catch(() => {});
    },
    [cdsVersions],
  );

  const trackGtagEvent = useCallback(({ action, category, label, value }: GtagAnalyticsEvent) => {
    try {
      if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
        window.gtag('event', action, {
          event_category: category,
          event_label: label,
          value,
        });
        return true;
      }
    } catch (error) {
      console.error('Analytics error:', error);
    }
    return false;
  }, []);

  return { trackGtagEvent, postMetric };
}
