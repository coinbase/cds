import { useCallback } from 'react';
import type { GroupToggleState } from '@cbhq/cds-common/hooks/useGroupToggler';
import { useGroupToggler } from '@cbhq/cds-common/hooks/useGroupToggler';

export type CheckboxGroupStateProps<T extends string> = {
  select: React.ChangeEventHandler<HTMLInputElement>;
  unselect: React.ChangeEventHandler<HTMLInputElement>;
  toggle: React.ChangeEventHandler<HTMLInputElement>;
  isAllSelected: GroupToggleState<T>['isAllSelected'];
};

type CheckboxGroupStateHandlerParams = Partial<React.ChangeEvent<HTMLInputElement>>;

/**
 *
 * @param values - An array of all possible options. Make sure the array doesn't change if it's the same values so that the handlers will also stay the same.
 * @param initialState - Initial checked option values.
 * @deprecated Do not use this.
 * @returns [
 *  state,
    {
      select,
      unselect,
      toggle,
      isAllSelected,
    }
  ]
 */
export const useCheckboxGroupState = <T extends string>(
  values: T[],
  initialState?: T[],
): [Set<T>, CheckboxGroupStateProps<T>] => {
  const [state, { select: doSelect, unselect: doUnselect, toggle: doToggle, isAllSelected }] =
    useGroupToggler(values, initialState);

  const select = useCallback(
    (event: CheckboxGroupStateHandlerParams) => {
      doSelect(event?.target?.value as T);
    },
    [doSelect],
  );

  const unselect = useCallback(
    (event: CheckboxGroupStateHandlerParams) => {
      doUnselect(event?.target?.value as T);
    },
    [doUnselect],
  );

  const toggle = useCallback(
    (event: CheckboxGroupStateHandlerParams) => {
      doToggle(event?.target?.value as T);
    },
    [doToggle],
  );

  return [
    state,
    {
      select,
      unselect,
      toggle,
      isAllSelected,
    },
  ];
};
