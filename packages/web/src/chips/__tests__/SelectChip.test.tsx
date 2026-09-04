import React, { useCallback } from 'react';
import useMeasure from 'react-use-measure';
import { renderA11y } from '@coinbase/cds-web-utils/jest';
import { fireEvent, render, screen } from '@testing-library/react';

import { SelectOption } from '../../controls/SelectOption';
import { HStack } from '../../layout/HStack';
import { VStack } from '../../layout/VStack';
import { MediaQueryProvider } from '../../system/MediaQueryProvider';
import { ThemeProvider } from '../../system/ThemeProvider';
import { defaultTheme } from '../../themes/defaultTheme';
import { Text } from '../../typography/Text';
import type { SelectChipProps } from '../SelectChip';
import { SelectChip } from '../SelectChip';

jest.mock('react-use-measure');
const mockUseMeasure = (mocks: Partial<ReturnType<typeof useMeasure>>) => {
  (useMeasure as jest.Mock).mockReturnValue(mocks);
};
const mockDimensions: Partial<ReturnType<typeof useMeasure>> = [
  jest.fn(),
  {
    width: 230,
    x: 20,
    y: 64,
    height: 40,
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
  },
];

const selectChipTestId = 'select-chip-test';
const sortOptions = ['Balance', 'Name', 'Asset Value'];
const chipClassName = 'custom-chip-class';

const ExampleSelectChip = ({
  onChange,
  value: defaultValue,
  ...props
}: Omit<SelectChipProps, 'content' | 'children' | 'chipClassName'>) => {
  const [value, setValue] = React.useState<string | undefined>(defaultValue);
  const handleValueChange = useCallback(
    (val: string) => {
      setValue(val);
      onChange?.(val);
    },
    [onChange],
  );

  const content = (
    <VStack>
      <HStack paddingX={2} paddingY={2} role="separator">
        <Text as="h2" color="fgMuted" display="block" font="caption">
          Section Heading
        </Text>
      </HStack>
      {sortOptions.map((option) => (
        <SelectOption key={option} title={option} value={option} />
      ))}
    </VStack>
  );

  return (
    <MediaQueryProvider>
      <ThemeProvider activeColorScheme="light" theme={defaultTheme}>
        <SelectChip
          content={content}
          onChange={handleValueChange}
          placeholder="Select an option"
          testID={selectChipTestId}
          value={value}
          {...props}
        />
      </ThemeProvider>
    </MediaQueryProvider>
  );
};

describe('SelectChip', () => {
  beforeEach(() => {
    mockUseMeasure(mockDimensions);
  });
  it('renders and displays the currently selected value', () => {
    render(<ExampleSelectChip value={sortOptions[0]} />);

    expect(screen.getByText(sortOptions[0])).toBeTruthy();
  });
  it('passes accessibility', async () => {
    expect(await renderA11y(<ExampleSelectChip />)).toHaveNoViolations();
  });
  it('opens a dropdown menu when the chip is pressed', async () => {
    const onClick = jest.fn();
    render(<ExampleSelectChip onClick={onClick} />);

    fireEvent.click(screen.getByTestId(selectChipTestId));
    expect(onClick).toHaveBeenCalled();

    const notSelectedOption = await screen.findByText(sortOptions[1]);
    expect(notSelectedOption).toBeDefined();
  });
  it('does not open the menu when disabled', () => {
    const onClick = jest.fn();
    render(<ExampleSelectChip disabled onClick={onClick} />);

    fireEvent.click(screen.getByTestId(selectChipTestId));

    expect(screen.queryByTestId(`${selectChipTestId}-dropdown`)).not.toBeInTheDocument();
    expect(onClick).not.toHaveBeenCalled();
  });
  it('renders a placeholder when no value is selected', () => {
    render(<ExampleSelectChip />);

    expect(screen.getByText('Select an option')).toBeTruthy();
  });
  it('updates the value when an option is selected', async () => {
    const onChange = jest.fn();
    render(<ExampleSelectChip onChange={onChange} />);

    fireEvent.click(screen.getByTestId(selectChipTestId));

    const notSelectedOption = await screen.findByText(sortOptions[1]);
    // click the first menu item
    fireEvent.click(notSelectedOption);
    expect(onChange).toHaveBeenCalled();
    // have to redefine/find it because it's a different node
    expect(await screen.findByText(sortOptions[1])).toBeDefined();
    expect(screen.queryByText('Select an option')).not.toBeInTheDocument();
  });
  it('trigger is in focus after interaction and menu is closed', async () => {
    render(<ExampleSelectChip />);

    fireEvent.click(screen.getByTestId(selectChipTestId));

    const firstSelectOption = await screen.findByText(sortOptions[1]);
    // select the first option
    fireEvent.click(firstSelectOption);

    expect(screen.getByTestId(selectChipTestId)).toHaveFocus();
  });
  it('renders a valueLabel when provided instead of the value', () => {
    render(<ExampleSelectChip value="Example" valueLabel="Some label" />);

    expect(screen.getByText('Some label')).toBeTruthy();
    expect(screen.queryByText('Example')).not.toBeInTheDocument();
  });
  it('renders a custom chipClassName', () => {
    render(<ExampleSelectChip className={chipClassName} testID={selectChipTestId} />);

    expect(screen.getByTestId(selectChipTestId)).toHaveClass(chipClassName);
  });
});
