import { mergeRefs } from '@coinbase/cds-common/utils/mergeRefs';
import { useMergeRefs } from '@coinbase/cds-common/hooks/useMergeRefs';

const cb = mergeRefs(useMergeRefs(a));
