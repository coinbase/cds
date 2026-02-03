import { useCallback } from 'react';
import type { GroupToggleState } from '@coinbase/cds-common/hooks/useGroupToggler';
import { useGroupToggler } from '@coinbase/cds-common/hooks/useGroupToggler';

export type CheckboxGroupStateProps<CheckboxValue extends string> = {
  select: React.ChangeEventHandler<HTMLInputElement>;
  unselect: React.ChangeEventHandler<HTMLInputElement>;
  toggle: React.ChangeEventHandler<HTMLInputElement>;
  isAllSelected: GroupToggleState<CheckboxValue>['isAllSelected'];
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
export const useCheckboxGroupState = <CheckboxValue extends string>(
  values: CheckboxValue[],
  initialState?: CheckboxValue[],
): [Set<CheckboxValue>, CheckboxGroupStateProps<CheckboxValue>] => {
  const [state, { select: doSelect, unselect: doUnselect, toggle: doToggle, isAllSelected }] =
    useGroupToggler(values, initialState);

  const select = useCallback(
    (event: CheckboxGroupStateHandlerParams) => {
      doSelect(event?.target?.value as CheckboxValue);
    },
    [doSelect],
  );

  const unselect = useCallback(
    (event: CheckboxGroupStateHandlerParams) => {
      doUnselect(event?.target?.value as CheckboxValue);
    },
    [doUnselect],
  );

  const toggle = useCallback(
    (event: CheckboxGroupStateHandlerParams) => {
      doToggle(event?.target?.value as CheckboxValue);
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
