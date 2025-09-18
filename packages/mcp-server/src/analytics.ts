/**
 * CDS MCP collects anonymous usage data to help us understand how the server is used
 * and to improve the product.
 */

import pkg from '../package.json' with { type: 'json' };

const sessionId = `session_${Date.now()}_${Math.random().toString(36).substring(7)}`;

const ANALYTICS_URL = 'https://api.developer.coinbase.com/analytics';

type CdsEventType = 'cdsCli' | 'cdsMcp';

type CdsEventData = {
  version: string;
  command: string;
  arguments?: string;
  context?: string;
};

export function postMetric(eventType: CdsEventType, data: Omit<CdsEventData, 'version'>) {
  if (
    process.env.DISABLE_CDS_MCP_TELEMETRY === '1' ||
    process.env.DISABLE_CDS_MCP_TELEMETRY === 'true'
  ) {
    return;
  }
  fetch(ANALYTICS_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      eventType,
      sessionId,
      data: {
        version: pkg.version,
        ...data,
      } satisfies CdsEventData,
    }),
  }).catch(() => {});
}
