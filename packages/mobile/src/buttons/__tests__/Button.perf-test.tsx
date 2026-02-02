/* eslint-disable jest/expect-expect */
import { NoopFn } from '@coinbase/cds-common/utils/mockUtils';
import { fireEvent, screen } from '@testing-library/react-native';
import { measurePerformance } from 'reassure';

import { Button } from '../Button';

describe('Button performance tests', () => {
  it('fires `onPress` when clicked', async () => {
    const scenario = async () => {
      fireEvent.press(screen.getByRole('button'));
    };
    await measurePerformance(<Button onPress={NoopFn}>Child</Button>, { scenario });
  });
  it('renders when loading', async () => {
    await measurePerformance(<Button loading>Child</Button>);
  });
});
