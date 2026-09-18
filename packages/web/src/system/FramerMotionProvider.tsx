import React from 'react';
import { LazyMotion, type LazyProps } from 'framer-motion';

export type FramerMotionProviderProps = Omit<LazyProps, 'features'> & {
  motionFeatures?: LazyProps['features'];
};

/**
 * Loads the `domAnimation` feature bundle asynchronously via `LazyMotion`'s loader form
 * (https://motion.dev/docs/react-reduce-bundle-size), instead of statically importing it.
 * This keeps framer-motion's animation features out of the static import graph of every
 * ThemeProvider consumer, since ThemeProvider always mounts FramerMotionProvider.
 */
const loadDomAnimationFeatures = () => import('framer-motion').then((mod) => mod.domAnimation);

export const FramerMotionProvider = ({
  children,
  motionFeatures = loadDomAnimationFeatures,
}: FramerMotionProviderProps) => {
  return (
    <LazyMotion strict features={motionFeatures}>
      {children}
    </LazyMotion>
  );
};
