import React, { useCallback } from 'react';
import { css } from '@linaria/core';

import { InputStack } from '../InputStack';
import { NativeInput } from '../NativeInput';

export default {
  title: 'Components/Inputs/NativeInput',
  component: NativeInput,
};

export const NativeInputBasic = function NativeInputBasic() {
  return <InputStack inputNode={<NativeInput accessibilityLabel="Label" />} labelNode="Label" />;
};

const containerSpacingCss = css`
  padding: var(--space-1);
`;

export const NativeInputCustomContainerSpacing = function NativeInputCustomContainerSpacing() {
  return (
    <InputStack
      inputNode={<NativeInput accessibilityLabel="Label" containerSpacing={containerSpacingCss} />}
      labelNode="Label"
    />
  );
};

export const NativeInputTextAlign = function NativeInputTextAlign() {
  const textAlignments = ['start', 'end'] as const;

  return (
    <div>
      {textAlignments.map((align) => (
        <InputStack
          inputNode={
            <NativeInput
              accessibilityLabel="Label"
              align={align}
              placeholder={`${align}-placeholder`}
            />
          }
          labelNode="Label"
        />
      ))}
    </div>
  );
};

export const NativeInputActions = function NativeInputOnFocus() {
  const onFocus = useCallback(() => {
    console.log('Focusing');
  }, []);

  const onBlur = useCallback(() => {
    console.log('Blurring');
  }, []);

  const onKeyDown = useCallback(() => {
    console.log('Key down');
  }, []);

  const onClick = useCallback(() => {
    console.log('Clicked');
  }, []);

  return (
    <InputStack
      inputNode={
        <NativeInput
          accessibilityLabel="Label"
          onBlur={onBlur}
          onClick={onClick}
          onFocus={onFocus}
          onKeyDown={onKeyDown}
        />
      }
      labelNode="Label"
    />
  );
};
