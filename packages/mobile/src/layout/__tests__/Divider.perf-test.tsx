/* eslint-disable jest/expect-expect */
import { measurePerformance } from 'reassure';

import { Divider } from '../Divider';

describe('Divider performance test', () => {
  it('renders', async () => {
    await measurePerformance(<Divider />);
  });
});
