/**
 * Avoid having to deal with transitive version issues.
 * CDS common is dep of cds-web.
 * This allows consumers to pull directly from cds-web.
 */
export type { EventHandlerProviderProps } from '@coinbase/cds-common/system/EventHandlerProvider';
export { EventHandlerProvider } from '@coinbase/cds-common/system/EventHandlerProvider';
