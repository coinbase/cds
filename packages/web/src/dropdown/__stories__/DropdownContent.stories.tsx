import React from 'react';

import { SelectOption } from '../../controls/SelectOption';
import { DROPDOWN_MAX_HEIGHT } from '../../dropdown/Dropdown';
import { VStack } from '../../layout/VStack';
import type { DropdownContentProps } from '../DropdownContent';
import { DropdownContent } from '../DropdownContent';

const defaultOptions = [
  'Option 1',
  'Option 2',
  'Option 3',
  'Option 4',
  'Option 5',
  'Option 6',
  'Option 7',
  'Option 8',
  'Option 9',
  'Option 10',
  'Option 11',
];

const baseProps = {
  width: 200,
  maxWidth: 200,
  height: DROPDOWN_MAX_HEIGHT,
};

const DropdownExample = (props: Pick<DropdownContentProps, 'placement'>) => (
  <div aria-label="Example" aria-modal="true" role="dialog">
    <DropdownContent {...baseProps} {...props}>
      {defaultOptions.map((option) => (
        <SelectOption key={option} testID={`option-${option}`} title={option} value={option} />
      ))}
      <SelectOption
        key="long"
        title="Really long content that will get clipped when it wants to wrap"
        value="long"
      />
    </DropdownContent>
  </div>
);

export const DropdownContentExamples = () => {
  return (
    <VStack gap={3}>
      {/* this is to make sure there are no visual regressions to dropdown content */}
      <DropdownExample />
      {/* this is to make sure there are no visual regressions when horizontal placement */}
      <DropdownExample placement="right-start" />
    </VStack>
  );
};

export default {
  title: 'Components/Dropdown/DropdownContent',
  component: DropdownExample,
};
