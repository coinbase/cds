import type { LottieStatus } from '../types/LottieStatus';

export const lottieStatusToAccessibilityLabel: Record<LottieStatus, string> = {
  loading: 'Loading',
  success: 'Success',
  cardSuccess: 'Success',
  failure: 'Failed',
  pending: 'Pending',
};
