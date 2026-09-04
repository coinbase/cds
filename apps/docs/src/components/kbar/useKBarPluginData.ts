import type { PluginData } from '@coinbase/docusaurus-plugin-kbar/types';
import { usePluginData } from '@docusaurus/useGlobalData';

import useKBarCustomActionsToActions from './useKBarCustomActionsToActions';

function useKBarPluginData() {
  const pluginData = usePluginData('@coinbase/docusaurus-plugin-kbar') as PluginData;
  const actions = useKBarCustomActionsToActions(pluginData.actions);
  return { ...pluginData, actions };
}

export default useKBarPluginData;
