/* eslint-disable jest/expect-expect */
import { measurePerformance } from 'reassure';

import { Icon } from '../Icon';

describe('Icon performance tests', () => {
  it('renders', async () => {
    await measurePerformance(<Icon name="caretDown" size="m" />);
  });
});
