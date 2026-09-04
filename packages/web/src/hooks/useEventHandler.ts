/**
 * Avoid having to deal with transitive version issues.
 * CDS common is dep of cds-mobile.
 * This allows consumers to pull directly from cds-web.
 */
export { useEventHandler } from '@coinbase/cds-common/hooks/useEventHandler';
