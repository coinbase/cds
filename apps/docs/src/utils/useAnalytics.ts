import { useCallback } from 'react';

type AnalyticsEvent = {
  action: string;
  category?: string;
  label?: string;
  value?: number;
};

export function useAnalytics() {
  const trackEvent = useCallback(({ action, category, label, value }: AnalyticsEvent) => {
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
  return { trackEvent };
}
