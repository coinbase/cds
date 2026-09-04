import { createContext, useContext } from 'react';
import type { InputVariant } from '@coinbase/cds-common/types/InputBaseProps';

export const TextInputFocusVariantContext = createContext<InputVariant | undefined>(undefined);
export const useTextInputFocusVariantContent = () => useContext(TextInputFocusVariantContext);
