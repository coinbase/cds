import { useCallback, useMemo, useState } from 'react';

/** @deprecated Use React.useState instead. */
export function useToggler(initial = false): [
  boolean,
  {
    toggleOn: () => void;
    toggleOff: () => void;
    toggle: () => void;
  },
] {
  const [isToggled, setIsToggled] = useState(initial);

  const toggleOn = useCallback(() => {
    setIsToggled(true);
  }, [setIsToggled]);

  const toggleOff = useCallback(() => {
    setIsToggled(false);
  }, [setIsToggled]);

  const toggle = useCallback(() => {
    setIsToggled((prev) => !prev);
  }, [setIsToggled]);

  const toggler = useMemo(() => {
    return {
      toggleOn,
      toggleOff,
      toggle,
    };
  }, [toggleOn, toggleOff, toggle]);

  return [isToggled, toggler];
}
