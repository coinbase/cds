import { nux } from '@coinbase/cds-lottie-files/nux';
import { measurePerformance } from 'reassure';

import { Lottie } from '../Lottie';

describe('Lottie performance tests', () => {
  it('renders', async () => {
    await measurePerformance(<Lottie source={nux} />);
  });
});
