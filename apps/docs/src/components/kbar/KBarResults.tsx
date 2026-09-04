import React, { memo, useCallback } from 'react';
import { Box } from '@coinbase/cds-web/layout/Box';
import { Text } from '@coinbase/cds-web/typography/Text';
import { KBarResults as OriginalKBarResults, useMatches } from 'kbar';

import KBarResultItem from './KBarResultItem';

const KBarResults = memo(function KBarResults() {
  const { results, rootActionId } = useMatches();
  const onRender: React.ComponentProps<typeof OriginalKBarResults>['onRender'] = useCallback(
    ({ item, active }) => {
      if (typeof item === 'string') {
        return (
          <Box paddingBottom={1} paddingTop={3} paddingX={3}>
            <Text font="headline">{item}</Text>
          </Box>
        );
      }
      return <KBarResultItem action={item} active={active} currentRootActionId={rootActionId} />;
    },
    [rootActionId],
  );

  return <OriginalKBarResults items={results} onRender={onRender} />;
});

export default KBarResults;
