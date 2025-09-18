/* eslint-disable jest/expect-expect */
import { fireEvent, screen } from '@testing-library/react';
import { measurePerformance } from 'reassure';

import { Button } from '../Button';

const NoopFn = () => {};

describe('Button performance tests', () => {
  it('fires `onClick` when clicked', async () => {
    const scenario = async () => {
      fireEvent.click(screen.getByRole('button'));
    };
    await measurePerformance(<Button onClick={NoopFn}>Child</Button>, { scenario });
  });
  it('renders when loading', async () => {
    await measurePerformance(<Button loading>Child</Button>);
  });
});
