import { useStore } from 'zustand';

import type { ComponentConfig } from '../core/componentConfig';
import { useComponentConfigStore } from '../system/ComponentConfigProvider';
import { mergeComponentProps } from '../utils/mergeComponentProps';

/**
 * Subscribes to the component config for a specific component via zustand selectors.
 * Only triggers re-renders when the config for THIS component changes - other
 * components' config changes are ignored.
 *
 * Raw config values are stored in the zustand store (not normalized to functions)
 * so that Object.is reference comparisons work correctly and unchanged entries
 * never cause re-renders.
 *
 * @param componentName - The component key in ComponentConfig (e.g., 'Button')
 * @param localProps - The props passed directly to the component instance
 * @returns Merged props with config defaults applied (local props take precedence)
 */
export const useComponentConfig = <K extends keyof ComponentConfig, P extends Record<string, any>>(
  componentName: K,
  localProps: P,
): P => {
  const store = useComponentConfigStore();

  const rawConfig = useStore(store, (state) => state.components?.[componentName]);

  if (!rawConfig) return localProps;

  const resolvedConfig =
    typeof rawConfig === 'function'
      ? (rawConfig as (props: any) => Record<string, any>)(localProps)
      : rawConfig;
  return mergeComponentProps(resolvedConfig, localProps) as P;
};
