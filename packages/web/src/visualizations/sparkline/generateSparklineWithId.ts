import { cloneElement } from 'react';
import type React from 'react';
import type { ElementChildren } from '@coinbase/cds-common/types';

import type { SparklineAreaBaseProps } from './SparklineArea';

export function generateSparklineAreaWithId(
  id: string,
  children: ElementChildren<SparklineAreaBaseProps>,
  maskId?: string,
) {
  return children
    ? cloneElement(children as React.ReactElement<SparklineAreaBaseProps>, {
        patternId: id,
        maskId,
      })
    : undefined;
}
