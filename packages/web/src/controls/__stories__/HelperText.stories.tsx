import React from 'react';

import { HelperText } from '../HelperText';

export default {
  title: 'Components/Inputs/HelperText',
  component: HelperText,
};

export const MessageAreaBasic = () => {
  return <HelperText>Put Message Here</HelperText>;
};

export const MessageAreaColor = () => {
  const colors = [
    'fgPositive',
    'fgNegative',
    'fg',
    'fgPrimary',
    'fgMuted',
    // TO DO: replace bgSecondary with textSecondary after value is confirmed with design
    'bgSecondary',
  ] as const;

  return (
    <div>
      {colors.map((color) => (
        <HelperText color={color}>{`${color} Message Here`}</HelperText>
      ))}
    </div>
  );
};

export const TextAlign = () => {
  const alignments = ['start', 'end'] as const;

  return (
    <div>
      {alignments.map((alignment) => (
        <HelperText key={alignment} textAlign={alignment}>
          {`${alignment} message`}
        </HelperText>
      ))}
      {alignments.map((alignment) => (
        <HelperText key={`${alignment}-error`} color="fgNegative" textAlign={alignment}>
          {`${alignment} error message that can wrap onto multiple lines to check icon alignment`}
        </HelperText>
      ))}
    </div>
  );
};

export const CustomColor = () => {
  return (
    <div>
      <HelperText
        color="fgNegative"
        styles={{ root: { color: 'purple' }, icon: { color: 'purple' } }}
      >
        Test message
      </HelperText>
    </div>
  );
};
