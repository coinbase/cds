import React from 'react';
import { css } from '@linaria/core';

import { InputLabel } from '../InputLabel';

export default {
  title: 'Components/Inputs/InputLabel',
  component: InputLabel,
};

export const InputLabelBasic = () => {
  return <InputLabel>Label</InputLabel>;
};

const wrapperCss = css`
  width: 100px;
`;

export const InputLabelTextAlignments = () => {
  const textAlignments = ['start', 'end', 'center'] as const;

  return (
    <div>
      {textAlignments.map((align) => (
        <div key={align} className={wrapperCss}>
          <InputLabel textAlign={align}>{`${align} Label`}</InputLabel>
        </div>
      ))}
    </div>
  );
};

export const LabelColor = () => {
  return <InputLabel color="fgMuted">Label</InputLabel>;
};

const fontWeightCss = css`
  font-weight: 900;
`;

export const InputLabelDangerouslySetClassName = () => {
  return (
    <InputLabel className={fontWeightCss} color="fgMuted">
      Label
    </InputLabel>
  );
};
