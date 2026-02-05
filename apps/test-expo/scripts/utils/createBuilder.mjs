import { AndroidBuilder } from './AndroidBuilder.mjs';
import { IOSBuilder } from './IOSBuilder.mjs';

/**
 * Factory function to create the appropriate platform builder.
 */
export function createBuilder(buildInfo) {
  if (buildInfo.platform === 'ios') {
    return new IOSBuilder(buildInfo);
  }
  return new AndroidBuilder(buildInfo);
}
