/* eslint-disable jest/expect-expect */
import { measurePerformance } from 'reassure';

import { Fallback } from '../Fallback';

const props = {
  width: 100,
  height: 50,
};

describe('Fallback performance test', () => {
  it('renders', async () => {
    await measurePerformance(<Fallback {...props} />);
  });
  it('renders with disableRandomRectWidth', async () => {
    await measurePerformance(<Fallback disableRandomRectWidth {...props} />);
  });
});
