import { useEffect, useMemo, useState } from 'react';

import { isBrowser } from '../utils/browser';

export const useHasMounted = () => {
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => setHasMounted(true), []);

  const componentShouldMount = useMemo(() => hasMounted && isBrowser(), [hasMounted]);

  return componentShouldMount;
};
