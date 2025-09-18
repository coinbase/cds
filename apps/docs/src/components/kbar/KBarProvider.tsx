import React, { memo, useMemo } from 'react';
import type { Action } from 'kbar';
import { KBarProvider as OriginalKBarProvider } from 'kbar';

import KBarModal from './KBarModal';
import useKBarPluginData from './useKBarPluginData';
import useKBarThemeActions from './useKBarThemeActions';

const KBarProvider = memo(function KBarProvider({ children }: { children: React.ReactNode }) {
  const { actions: pluginActions } = useKBarPluginData();
  const themeActions = useKBarThemeActions();
  const actions = useMemo(() => [...pluginActions, ...themeActions], [pluginActions, themeActions]);
  return (
    <OriginalKBarProvider actions={actions as Action[]}>
      {children}
      <KBarModal />
    </OriginalKBarProvider>
  );
});

export default KBarProvider;
