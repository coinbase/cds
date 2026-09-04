import { AnimatePresence, type AnimatePresenceProps } from 'framer-motion';

// Workaround for React 18 no-implicit-children failure - https://github.com/framer/motion/issues/1509
type NewAnimatePresenceProps = {
  children: React.ReactNode;
} & Omit<AnimatePresenceProps, 'children'>;

export const NewAnimatePresence = AnimatePresence as React.FC<NewAnimatePresenceProps>;
