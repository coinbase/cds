/* eslint-disable jest/expect-expect */
import { measurePerformance } from 'reassure';

import { LottieStatusAnimation } from '../LottieStatusAnimation';

describe('LottieStatusAnimation performance tests', () => {
  it('renders', async () => {
    await measurePerformance(<LottieStatusAnimation height={250} />);
  });
  it('renders as success', async () => {
    await measurePerformance(<LottieStatusAnimation height={250} status="success" />);
  });
  it('renders as failure', async () => {
    await measurePerformance(<LottieStatusAnimation height={250} status="failure" />);
  });
  it('renders as pending', async () => {
    await measurePerformance(<LottieStatusAnimation height={250} status="pending" />);
  });
  it('renders as cardSuccess', async () => {
    await measurePerformance(<LottieStatusAnimation height={250} status="cardSuccess" />);
  });
});
