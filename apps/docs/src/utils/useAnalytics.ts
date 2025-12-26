import { useCallback } from 'react';

import { useCDSVersions } from '../hooks/useCDSVersions';

type GtagAnalyticsEvent = {
  action: string;
  category?: string;
  label?: string;
  value?: number;
};

function generateSecureId(): string {
  // Prefer browser crypto APIs when available
  if (typeof window !== 'undefined' && window.crypto) {
    if (typeof window.crypto.randomUUID === 'function') {
      return window.crypto.randomUUID();
    }
    if (typeof window.crypto.getRandomValues === 'function') {
      const bytes = new Uint8Array(16);
      window.crypto.getRandomValues(bytes);
      // Convert to hex string
      return Array.from(bytes)
        .map((b) => b.toString(16).padStart(2, '0'))
        .join('');
    }
  }

  // Fallback for Node or environments without window.crypto
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires,@typescript-eslint/no-require-imports
    const nodeCrypto = require('crypto') as typeof import('crypto');
    if (typeof nodeCrypto.randomUUID === 'function') {
      return nodeCrypto.randomUUID();
    }
    return nodeCrypto.randomBytes(16).toString('hex');
  } catch {
    // Last-resort fallback: still better than predictable Math.random() only
    return `${Date.now().toString(36)}_${Math.random().toString(36).substring(2)}`;
  }
}

const sessionId = `session_${Date.now()}_${generateSecureId()}`;

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
