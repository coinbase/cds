import { noop } from '@coinbase/cds-utils';
import { fireEvent, render, screen, waitFor } from '@testing-library/react-native';

import { CellMedia } from '../../cells/CellMedia';
import { Text } from '../../typography/Text';
import { DefaultThemeProvider } from '../../utils/testHelpers';
import { Accordion } from '../Accordion';
import { AccordionItem } from '../AccordionItem';

type MockAccordionProps = {
  activeKey?: string;
  defaultActiveKey?: string;
  setActiveKey?: (activeKey: string | null) => void;
  onChange?: (key: string | null) => void;
  onPress1?: (key: string | null) => void;
  onPress2?: (key: string | null) => void;
};

const MockAccordion = ({
  activeKey,
  defaultActiveKey,
  setActiveKey,
  onChange,
  onPress1,
  onPress2,
}: MockAccordionProps) => {
  return (
    <Accordion
      activeKey={activeKey}
      defaultActiveKey={defaultActiveKey}
      onChange={onChange}
      setActiveKey={setActiveKey}
      testID="mock-accordion"
    >
      <AccordionItem
        itemKey="1"
        tertiaryTitle="tertiaryTitle1"
        media={<CellMedia active name="wallet" testID="mock-accordion-item1-media" type="icon" />}
        onPress={onPress1}
        subtitle="subtitle1"
        testID="mock-accordion-item1"
        title="Accordion #1"
      >
        <Text font="body">Accordion Content1</Text>
      </AccordionItem>
      <AccordionItem
        itemKey="2"
        tertiaryTitle="tertiaryTitle2"
        media={<CellMedia active name="wallet" testID="mock-accordion-item2-media" type="icon" />}
        onPress={onPress2}
        subtitle="subtitle2"
        testID="mock-accordion-item2"
        title="Accordion #2"
      >
        <Text font="body">Accordion Content2</Text>
      </AccordionItem>
    </Accordion>
  );
};

const customAccordionStyle = { padding: 20 };
const customAccordionItemStyle = { padding: 30 };

const MockAccordionWithTheme = (props: MockAccordionProps) => {
  return (
    <DefaultThemeProvider>
      <MockAccordion {...props} />
    </DefaultThemeProvider>
  );
};

describe('Accordion', () => {
  describe('uncontrolled', () => {
    it('passes a11y', () => {
      render(<MockAccordionWithTheme />);

      expect(screen.getByTestId('mock-accordion-item1-header')).toBeAccessible();
    });

    it('triggers on press', () => {
      const onChange = jest.fn();
      const onPress1 = jest.fn();
      const onPress2 = jest.fn();

      render(
        <MockAccordionWithTheme onChange={onChange} onPress1={onPress1} onPress2={onPress2} />,
      );

      fireEvent.press(screen.getByTestId('mock-accordion-item1-header'));

      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledWith('1');

      expect(onPress1).toHaveBeenCalledTimes(1);
      expect(onPress1).toHaveBeenCalledWith('1');

      fireEvent.press(screen.getByTestId('mock-accordion-item2-header'));

      expect(onChange).toHaveBeenCalledTimes(2);
      expect(onChange).toHaveBeenCalledWith('2');

      expect(onPress2).toHaveBeenCalledTimes(1);
      expect(onPress2).toHaveBeenCalledWith('2');
    });

    it('renders titles', () => {
      render(
        <DefaultThemeProvider>
          <MockAccordion />
        </DefaultThemeProvider>,
      );

      expect(screen.getByText('Accordion #1')).toBeTruthy();
      expect(screen.getByText('subtitle1')).toBeTruthy();
      expect(screen.getByText('tertiaryTitle1')).toBeTruthy();
      expect(screen.getByText('Accordion #2')).toBeTruthy();
      expect(screen.getByText('subtitle2')).toBeTruthy();
      expect(screen.getByText('tertiaryTitle2')).toBeTruthy();
    });

    it('renders media', () => {
      render(<MockAccordionWithTheme />);

      expect(screen.getByTestId('mock-accordion-item1-media')).toBeTruthy();
      expect(screen.getByTestId('mock-accordion-item2-media')).toBeTruthy();
    });

    it('renders children', () => {
      render(<MockAccordionWithTheme />);

      expect(screen.getByText('Accordion Content1')).toBeTruthy();
      expect(screen.getByText('Accordion Content2')).toBeTruthy();
    });

    it('can override styles', () => {
      render(
        <DefaultThemeProvider>
          <Accordion
            defaultActiveKey="2"
            onChange={noop}
            style={customAccordionStyle}
            testID="mock-accordion"
          >
            <AccordionItem
              itemKey="1"
              onPress={noop}
              style={customAccordionItemStyle}
              subtitle="subtitle1"
              testID="mock-accordion-item1"
              title="Accordion #1"
            >
              <Text font="body">Accordion Content1</Text>
            </AccordionItem>
            <AccordionItem
              itemKey="2"
              onPress={noop}
              subtitle="subtitle2"
              testID="mock-accordion-item2"
              title="Accordion #2"
            >
              <Text font="body">Accordion Content2</Text>
            </AccordionItem>
          </Accordion>
        </DefaultThemeProvider>,
      );

      expect(screen.getByTestId('mock-accordion')).toHaveStyle('padding: 20');
      expect(screen.getByTestId('mock-accordion-item1')).toHaveStyle('padding: 30');
    });
  });

  describe('controlled', () => {
    const setActiveKey = jest.fn();
    const onChange = jest.fn();

    it('uses activeKey prop for controlled state', async () => {
      const { rerender } = render(
        <MockAccordionWithTheme activeKey="1" setActiveKey={setActiveKey} />,
      );

      expect(screen.getByTestId('mock-accordion-item1-panel')).toHaveStyle('visibility: visible');
      expect(screen.getByTestId('mock-accordion-item2-panel')).toHaveStyle('visibility: hidden');

      rerender(<MockAccordionWithTheme activeKey="2" setActiveKey={setActiveKey} />);

      await waitFor(() => {
        expect(screen.getByTestId('mock-accordion-item1-panel')).toHaveStyle('visibility: hidden');
      });
      await waitFor(() => {
        expect(screen.getByTestId('mock-accordion-item2-panel')).toHaveStyle('visibility: visible');
      });
    });

    it('calls onChange but does not update internal state when controlled', () => {
      render(
        <MockAccordionWithTheme activeKey="1" onChange={onChange} setActiveKey={setActiveKey} />,
      );

      fireEvent.press(screen.getByTestId('mock-accordion-item2-header'));

      expect(onChange).toHaveBeenCalledWith('2');

      expect(screen.getByTestId('mock-accordion-item1-panel')).toHaveStyle('visibility: visible');
      expect(screen.getByTestId('mock-accordion-item2-panel')).toHaveStyle('visibility: hidden');
    });

    it('closes panel when clicking active item in controlled mode', async () => {
      const { rerender } = render(
        <MockAccordionWithTheme activeKey="1" onChange={onChange} setActiveKey={setActiveKey} />,
      );

      expect(screen.getByTestId('mock-accordion-item1-panel')).toHaveStyle('visibility: visible');

      fireEvent.press(screen.getByTestId('mock-accordion-item1-header'));

      expect(setActiveKey).toHaveBeenCalledWith(null);

      rerender(
        <MockAccordionWithTheme activeKey="" onChange={onChange} setActiveKey={setActiveKey} />,
      );

      await waitFor(() => {
        expect(screen.getByTestId('mock-accordion-item1-panel')).toHaveStyle('visibility: hidden');
      });
    });
  });
});
