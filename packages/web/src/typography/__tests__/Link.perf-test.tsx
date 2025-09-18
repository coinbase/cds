/* eslint-disable jest/expect-expect */
import { measurePerformance } from 'reassure';

import { Link } from '../Link';

const testHref = 'https://www.coinbase.com/';
const NoopFn = () => {};

describe('Link performance test', () => {
  it('renders', async () => {
    await measurePerformance(
      <Link href={testHref} onClick={NoopFn}>
        Child
      </Link>,
    );
  });
});
