import React from 'react';

import type { PressableProps } from './Pressable';
import { Pressable } from './Pressable';

/**
 * @deprecated Use `<Pressable background="transparent">` instead. This will be removed in a future major release.
 * @deprecationExpectedRemoval v8
 */
export type PressableOpacityProps = Omit<
  PressableProps,
  'background' | 'borderColor' | 'borderRadius' | 'borderWidth' | 'transparentWhileInactive'
>;

/**
 * @deprecated Use `<Pressable background="transparent">` instead. This will be removed in a future major release.
 * @deprecationExpectedRemoval v8
 */
export const PressableOpacity = ({ children, ...props }: PressableOpacityProps) => {
  return (
    <Pressable {...props} background="transparent" borderColor="transparent">
      {children}
    </Pressable>
  );
};
