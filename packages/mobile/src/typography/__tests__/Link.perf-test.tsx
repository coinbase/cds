import { NoopFn } from '@coinbase/cds-common/utils/mockUtils';
import { measurePerformance } from 'reassure';

import { Link } from '../Link';

const testHref = 'https://www.coinbase.com/';

describe('Link performance test', () => {
  it('renders', async () => {
    await measurePerformance(
      <Link onPress={NoopFn} to={testHref}>
        Child
      </Link>,
    );
  });
});
