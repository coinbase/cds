/* eslint-disable */
import { memo, forwardRef } from 'react';

import type { ComboboxSelectControlComponent } from './Combobox';

export const DefaultComboboxSelectControl: ComboboxSelectControlComponent<'single' | 'multi'> =
  memo(
    forwardRef(
      (
        { type, value, placeholder, disabled, setOpen, searchText, onSearch, ...props },
        ref: React.Ref<HTMLElement>,
      ) => {
        return (
          <div
            ref={ref as React.Ref<HTMLDivElement>}
            aria-disabled={disabled}
            style={{ width: 100, background: 'red' }}
            onClick={() => !disabled && setOpen((s) => !s)}
          >
            {value === null ? placeholder : value}
          </div>
        );
      },
    ),
  );
