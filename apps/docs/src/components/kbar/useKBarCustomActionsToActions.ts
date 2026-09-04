import { useMemo } from 'react';
import type { KBarCustomAction } from '@coinbase/docusaurus-plugin-kbar/types';
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';
import { useHistory } from '@docusaurus/router';
import decreasePriorityIfCategory from '@site/src/utils/decreasePriorityIfCategory';

export default function useKBarCustomActionsToActions(
  actions: KBarCustomAction[],
): Omit<KBarCustomAction, 'slug'>[] {
  const history = useHistory();
  return useMemo(() => {
    return actions.map(decreasePriorityIfCategory).map(({ slug, url, ...item }) => {
      const hasLink = Boolean(slug ?? url);
      const perform = hasLink
        ? () => {
            if (slug) history.push(slug);
            if (url && ExecutionEnvironment.canUseDOM) window.location.assign(url);
          }
        : undefined;

      return {
        ...item,
        perform,
      };
    });
  }, [history, actions]);
}
