import type { ElevationLevels } from '@coinbase/cds-common/types/ElevationLevels';
import { measurePerformance } from 'reassure';

import { Box } from '../Box';

describe('Box performance test', () => {
  it('renders', async () => {
    await measurePerformance(<Box />);
  });
  it('renders with elevation', async () => {
    await measurePerformance(<Box elevation={2 as ElevationLevels} />);
  });
});
