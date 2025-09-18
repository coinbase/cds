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

MessageAreaColor.parameters = {
  a11y: { config: { rules: [{ id: 'color-contrast', enabled: false }] } },
};

export const TextAlign = () => {
  const alignments = ['start', 'end'] as const;

  return (
    <div>
      {alignments.map((alignment) => (
        <HelperText textAlign={alignment}>{`${alignment} message`}</HelperText>
      ))}
    </div>
  );
};

export const CustomColor = () => {
  return (
    <div>
      <HelperText color="fgNegative" dangerouslySetColor="purple">
        Test message
      </HelperText>
    </div>
  );
};
