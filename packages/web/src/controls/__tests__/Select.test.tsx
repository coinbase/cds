import React, { useState } from 'react';
import useMeasure from 'react-use-measure';
import { renderA11y } from '@coinbase/cds-web-utils/jest';
import { fireEvent, render, screen } from '@testing-library/react';

import { VStack } from '../../layout/VStack';
import { MediaQueryProvider } from '../../system/MediaQueryProvider';
import { DefaultThemeProvider } from '../../utils/test';
import { Select, type SelectProps } from '../Select';
import { SelectOption } from '../SelectOption';

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

const exampleOptions = ['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5', 'Option 6'];

const MockSelect = ({
  variant,
  placeholder = 'Choose something',
  label,
  accessibilityLabel,
  testID,
  onClick,
  helperText,
  width,
}: Pick<
  SelectProps,
  | 'variant'
  | 'label'
  | 'placeholder'
  | 'accessibilityLabel'
  | 'testID'
  | 'onClick'
  | 'helperText'
  | 'width'
>) => {
  const [value, setValue] = useState<string | undefined>('');

  return (
    <VStack background="bg" padding={2}>
      <Select
        accessibilityLabel={accessibilityLabel}
        helperText={helperText}
        label={label}
        onChange={setValue}
        onClick={onClick}
        placeholder={placeholder}
        testID={testID}
        value={value}
        variant={variant}
        width={width}
      >
        <SelectOption key="Disabled" disabled description="BTC" title="Disabled" value="disabled" />
        {exampleOptions.map((option) => (
          <SelectOption
            key={option}
            description="BTC"
            testID={`option-${option}`}
            title={option}
            value={option}
          />
        ))}
      </Select>
    </VStack>
  );
};

const mockPlaceholder = 'Choose something...';
const accessibilityLabel = 'label';
const mockTestID = 'select-input-test';

describe('Select', () => {
  beforeEach(() => {
    mockUseMeasure(mockDimensions);
  });
  it('passes accessibility', async () => {
    expect(
      await renderA11y(
        <MediaQueryProvider>
          <DefaultThemeProvider>
            <MockSelect accessibilityLabel={accessibilityLabel} />
          </DefaultThemeProvider>
        </MediaQueryProvider>,
      ),
    ).toHaveNoViolations();
    expect(
      await renderA11y(
        <MediaQueryProvider>
          <DefaultThemeProvider>
            <MockSelect label="Test" />
          </DefaultThemeProvider>
        </MediaQueryProvider>,
      ),
    ).toHaveNoViolations();
  });
  it('can pass `aria-label` attribute', () => {
    render(
      <MediaQueryProvider>
        <DefaultThemeProvider>
          <MockSelect accessibilityLabel={accessibilityLabel} testID={mockTestID} />
        </DefaultThemeProvider>
      </MediaQueryProvider>,
    );

    expect(screen.getByTestId(mockTestID)).toHaveAttribute('aria-label', accessibilityLabel);
  });
  it('renders the Select trigger', async () => {
    render(
      <MediaQueryProvider>
        <DefaultThemeProvider>
          <MockSelect testID={mockTestID} />
        </DefaultThemeProvider>
      </MediaQueryProvider>,
    );

    expect(screen.getByTestId(mockTestID)).toBeDefined();
  });
  it('opens the Menu when the Select is pressed', async () => {
    const onClickSpy = jest.fn();
    render(
      <MediaQueryProvider>
        <DefaultThemeProvider>
          <MockSelect onClick={onClickSpy} placeholder={mockPlaceholder} />
        </DefaultThemeProvider>
      </MediaQueryProvider>,
    );

    fireEvent.click(screen.getByText(mockPlaceholder));
    expect(onClickSpy).toHaveBeenCalled();

    const firstOption = await screen.findByText(exampleOptions[0]);
    // expect Menu and SelectOption to render
    expect(firstOption).toBeDefined();
  });
  it('closes the Menu when an option is pressed and fires onChange', async () => {
    const onChangeSpy = jest.fn();

    render(
      <MediaQueryProvider>
        <DefaultThemeProvider>
          <MockSelect onClick={onChangeSpy} placeholder={mockPlaceholder} />
        </DefaultThemeProvider>
      </MediaQueryProvider>,
    );

    const placeholder = screen.getByText(mockPlaceholder);

    fireEvent.click(placeholder);

    // expect Menu and SelectOption to render
    const firstSelectOption = await screen.findByText(exampleOptions[0]);

    // select the first option
    fireEvent.click(firstSelectOption);
    expect(onChangeSpy).toHaveBeenCalled();

    expect(screen.queryByText(mockPlaceholder)).toBeNull();
  });
  it('replaces the placeholder text with the selected value when pressed', async () => {
    render(
      <MediaQueryProvider>
        <DefaultThemeProvider>
          <MockSelect placeholder={mockPlaceholder} />
        </DefaultThemeProvider>
      </MediaQueryProvider>,
    );

    const placeholder = screen.getByText(mockPlaceholder);

    fireEvent.click(placeholder);

    // expect Menu and SelectOption to render
    const secondSelectOption = await screen.findByText(exampleOptions[1]);
    fireEvent.click(secondSelectOption);

    expect(screen.getAllByText(exampleOptions[1])).toBeDefined();
    expect(screen.queryByText(mockPlaceholder)).toBeNull();
  });

  it('trigger is in focus after interaction and menu is closed', async () => {
    render(
      <MediaQueryProvider>
        <DefaultThemeProvider>
          <MockSelect placeholder={mockPlaceholder} />
        </DefaultThemeProvider>
      </MediaQueryProvider>,
    );

    const selectButton = screen.getAllByRole('button')[0];
    fireEvent.click(selectButton);

    // expect Menu and SelectOption to render
    const firstSelectOption = await screen.findByText(exampleOptions[0]);

    // select the first option
    fireEvent.click(firstSelectOption);

    const selectButtonRerendered = screen.getAllByRole('button')[0];
    expect(selectButtonRerendered).toHaveFocus();
  });
  it('renders error icon in helper text when variant is negative', async () => {
    render(
      <MediaQueryProvider>
        <DefaultThemeProvider>
          <MockSelect helperText="helper text" variant="negative" />
        </DefaultThemeProvider>
      </MediaQueryProvider>,
    );

    expect(screen.getByTestId('select-error-icon')).toBeTruthy();
    expect(screen.getByText('helper text')).toBeTruthy();
  });
  it('should not render error icon when passing in helper text node', async () => {
    render(
      <MediaQueryProvider>
        <DefaultThemeProvider>
          <MockSelect helperText={<span>helper text</span>} variant="negative" />
        </DefaultThemeProvider>
      </MediaQueryProvider>,
    );

    expect(screen.queryByTestId('select-error-icon')).toBeFalsy();
  });

  it('renders label outside by default', () => {
    render(
      <MediaQueryProvider>
        <DefaultThemeProvider>
          <MockSelect label="Outside Label" />
        </DefaultThemeProvider>
      </MediaQueryProvider>,
    );

    const label = screen.getByText('Outside Label');
    const inputArea = screen.getByTestId('input-interactable-area');

    expect(label).toBeInTheDocument();
    expect(inputArea).toBeInTheDocument();

    expect(inputArea).not.toContainElement(label);
  });

  it('renders label inside when labelVariant="inside"', () => {
    const SelectWithInsideLabel = () => {
      const [value, setValue] = useState<string | undefined>('');
      return (
        <Select
          label="Inside Label"
          labelVariant="inside"
          onChange={setValue}
          placeholder="Choose something"
          value={value}
        >
          {exampleOptions.map((option) => (
            <SelectOption key={option} title={option} value={option} />
          ))}
        </Select>
      );
    };

    render(
      <MediaQueryProvider>
        <DefaultThemeProvider>
          <SelectWithInsideLabel />
        </DefaultThemeProvider>
      </MediaQueryProvider>,
    );

    const label = screen.getByText('Inside Label');
    const inputArea = screen.getByTestId('input-interactable-area');

    expect(label).toBeInTheDocument();
    expect(inputArea).toBeInTheDocument();
    // Label should be inside the input area
    expect(inputArea).toContainElement(label);
  });

  it('overrides inside label variant when compact is true', () => {
    const CompactSelect = () => {
      const [value, setValue] = useState<string | undefined>('');
      return (
        <Select
          compact
          label="Compact Label"
          labelVariant="inside"
          onChange={setValue}
          placeholder="Choose something"
          value={value}
        >
          {exampleOptions.map((option) => (
            <SelectOption key={option} compact title={option} value={option} />
          ))}
        </Select>
      );
    };

    render(
      <MediaQueryProvider>
        <DefaultThemeProvider>
          <CompactSelect />
        </DefaultThemeProvider>
      </MediaQueryProvider>,
    );

    const label = screen.getByText('Compact Label');
    const inputArea = screen.getByTestId('input-interactable-area');

    expect(label).toBeInTheDocument();
    expect(inputArea).toBeInTheDocument();

    expect(inputArea).toContainElement(label);
  });

  it('positions label correctly with inside variant and start content', () => {
    const SelectWithStartContent = () => {
      const [value, setValue] = useState<string | undefined>('');
      return (
        <Select
          label="Inside Label with Start"
          labelVariant="inside"
          onChange={setValue}
          placeholder="Choose something"
          startNode={<span data-testid="start-content">Start</span>}
          value={value}
        >
          {exampleOptions.map((option) => (
            <SelectOption key={option} title={option} value={option} />
          ))}
        </Select>
      );
    };

    render(
      <MediaQueryProvider>
        <DefaultThemeProvider>
          <SelectWithStartContent />
        </DefaultThemeProvider>
      </MediaQueryProvider>,
    );

    const label = screen.getByText('Inside Label with Start');
    const startContent = screen.getByTestId('start-content');
    const inputArea = screen.getByTestId('input-interactable-area');

    expect(label).toBeInTheDocument();
    expect(startContent).toBeInTheDocument();
    expect(inputArea).toContainElement(label);
    expect(inputArea).toContainElement(startContent);
  });
});
