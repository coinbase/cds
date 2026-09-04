import { useEffect, useLayoutEffect } from 'react';

import { isBrowser } from '../utils/browser';

export const useIsoEffect = isBrowser() ? useLayoutEffect : useEffect;
