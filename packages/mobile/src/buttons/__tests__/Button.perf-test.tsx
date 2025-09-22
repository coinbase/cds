/* eslint-disable jest/expect-expect */
import { NoopFn } from '@cbhq/cds-common/utils/mockUtils';
import { fireEvent, screen } from '@testing-library/react';
import { measurePerformance } from 'reassure';

import { Button } from '../Button';

describe('Button performance tests', () => {
  it('fires `onPress` when clicked', async () => {
    const scenario = async () => {
      fireEvent.click(screen.getByRole('button'));
    };
    await measurePerformance(<Button onPress={NoopFn}>Child</Button>, { scenario });
  });
  it('renders when loading', async () => {
    await measurePerformance(<Button loading>Child</Button>);
  });
});
