import { noop } from '@coinbase/cds-utils';
import { renderA11y } from '@coinbase/cds-web-utils/jest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import { CellMedia } from '../../cells/CellMedia';
import type { ComponentConfig } from '../../core/componentConfig';
import { ComponentConfigProvider } from '../../system';
import { Text } from '../../typography/Text';
import { DefaultThemeProvider } from '../../utils/test';
import { Accordion, accordionClassNames } from '../Accordion';
import { AccordionItem, accordionItemClassNames } from '../AccordionItem';
import { getAccordionHeaderId, getAccordionPanelId } from '../utils';

type OnClick = (key: string | null) => void;

type MockAccordionProps = {
  activeKey?: string;
  defaultActiveKey?: string;
  setActiveKey?: (activeKey: string | null) => void;
  onChange?: OnClick;
  onClick1?: OnClick;
  onClick2?: OnClick;
};

const MockAccordion = ({
  activeKey,
  defaultActiveKey,
  setActiveKey,
  onChange,
  onClick1,
  onClick2,
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
        onClick={onClick1}
        subtitle="subtitle1"
        testID="mock-accordion-item1"
        title="Accordion #1"
      >
        <Text as="p" display="block" font="body">
          Accordion Content1
        </Text>
      </AccordionItem>
      <AccordionItem
        itemKey="2"
        tertiaryTitle="tertiaryTitle2"
        media={<CellMedia active name="wallet" testID="mock-accordion-item2-media" type="icon" />}
        onClick={onClick2}
        subtitle="subtitle2"
        testID="mock-accordion-item2"
        title="Accordion #2"
      >
        <Text as="p" display="block" font="body">
          Accordion Content2
        </Text>
      </AccordionItem>
    </Accordion>
  );
};

const customAccordionStyle = { padding: '20px' };
const customAccordionItemStyle = { padding: '30px' };

const MockAccordionWithTheme = (props: MockAccordionProps) => {
  return (
    <DefaultThemeProvider>
      <MockAccordion {...props} />
    </DefaultThemeProvider>
  );
};

describe('Accordion', () => {
  beforeEach(() => {
    jest.spyOn(window, 'scrollTo').mockImplementation();
  });

  describe('uncontrolled', () => {
    it('passes accessibility', async () => {
      expect(await renderA11y(<MockAccordionWithTheme />)).toHaveNoViolations();
    });

    it('has a11y attributes', () => {
      render(<MockAccordionWithTheme defaultActiveKey="2" />);

      const item1Header = screen.getByTestId('mock-accordion-item1-header');
      const item1Panel = screen.getByTestId('mock-accordion-item1-panel');
      const item2Header = screen.getByTestId('mock-accordion-item2-header');
      const item2Panel = screen.getByTestId('mock-accordion-item2-panel');

      expect(item1Header).toHaveAttribute('aria-expanded', 'false');
      expect(item1Header).toHaveAttribute('aria-controls', getAccordionPanelId('1'));
      expect(item1Panel).toHaveAttribute('aria-labelledby', getAccordionHeaderId('1'));

      expect(item2Header).toHaveAttribute('aria-expanded', 'true');
      expect(item2Header).toHaveAttribute('aria-controls', getAccordionPanelId('2'));
      expect(item2Panel).toHaveAttribute('aria-labelledby', getAccordionHeaderId('2'));
    });

    it('triggers on press', () => {
      const onChange = jest.fn();
      const onClick1 = jest.fn();
      const onClick2 = jest.fn();

      render(
        <MockAccordionWithTheme onChange={onChange} onClick1={onClick1} onClick2={onClick2} />,
      );

      fireEvent.click(screen.getByTestId('mock-accordion-item1-header'));

      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledWith('1');

      expect(onClick1).toHaveBeenCalledTimes(1);
      expect(onClick1).toHaveBeenCalledWith('1');

      fireEvent.click(screen.getByTestId('mock-accordion-item2-header'));

      expect(onChange).toHaveBeenCalledTimes(2);
      expect(onChange).toHaveBeenCalledWith('2');

      expect(onClick2).toHaveBeenCalledTimes(1);
      expect(onClick2).toHaveBeenCalledWith('2');
    });

    it('renders active key by default', () => {
      render(<MockAccordionWithTheme defaultActiveKey="2" />);

      expect(screen.getByTestId('mock-accordion-item1-panel')).toBeInTheDocument();
      expect(screen.getByTestId('mock-accordion-item1-panel')).toHaveStyle('display: none');
      expect(screen.getByTestId('mock-accordion-item2-panel')).toBeInTheDocument();
      expect(screen.getByTestId('mock-accordion-item2-panel')).toHaveStyle('visibility: visible');
    });

    it('expand pressed panel and collapse expanded panel', () => {
      render(<MockAccordionWithTheme />);

      fireEvent.click(screen.getByTestId('mock-accordion-item1-header'));

      expect(screen.getByTestId('mock-accordion-item1-header')).toHaveAttribute(
        'aria-expanded',
        'true',
      );
      expect(screen.getByTestId('mock-accordion-item2-header')).toHaveAttribute(
        'aria-expanded',
        'false',
      );
    });

    it('renders titles', () => {
      render(<MockAccordionWithTheme />);

      expect(screen.getByText('Accordion #1')).toBeVisible();
      expect(screen.getByText('subtitle1')).toBeVisible();
      expect(screen.getByText('tertiaryTitle1')).toBeVisible();
      expect(screen.getByText('Accordion #2')).toBeVisible();
      expect(screen.getByText('subtitle2')).toBeVisible();
      expect(screen.getByText('tertiaryTitle2')).toBeVisible();
    });

    it('renders media', () => {
      render(<MockAccordionWithTheme />);

      expect(screen.getByTestId('mock-accordion-item1-media')).toBeVisible();
      expect(screen.getByTestId('mock-accordion-item2-media')).toBeVisible();
    });

    it('renders children', async () => {
      render(<MockAccordionWithTheme defaultActiveKey="2" />);

      expect(screen.getByText('Accordion Content1')).not.toBeVisible();
      expect(screen.getByText('Accordion Content2')).toBeVisible();

      fireEvent.click(screen.getByTestId('mock-accordion-item1-header'));

      await waitFor(() => {
        expect(screen.getByText('Accordion Content1')).toBeVisible();
      });
      await waitFor(() => {
        expect(screen.getByText('Accordion Content2')).not.toBeVisible();
      });
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
              onClick={noop}
              style={customAccordionItemStyle}
              subtitle="subtitle1"
              testID="mock-accordion-item1"
              title="Accordion #1"
            >
              <Text as="p" display="block" font="body">
                Accordion Content1
              </Text>
            </AccordionItem>
            <AccordionItem
              itemKey="2"
              onClick={noop}
              subtitle="subtitle2"
              testID="mock-accordion-item2"
              title="Accordion #2"
            >
              <Text as="p" display="block" font="body">
                Accordion Content2
              </Text>
            </AccordionItem>
          </Accordion>
        </DefaultThemeProvider>,
      );

      expect(screen.getByTestId('mock-accordion')).toHaveStyle('padding: 20px');
      expect(screen.getByTestId('mock-accordion-item1')).toHaveStyle('padding: 30px');
    });

    it('applies static class names to Accordion and AccordionItem elements', () => {
      render(<MockAccordionWithTheme />);

      const root = screen.getByTestId('mock-accordion');
      expect(root).toHaveClass(accordionClassNames.root);

      const item = screen.getByTestId('mock-accordion-item1');
      expect(item).toHaveClass(accordionItemClassNames.root);
      expect(item.querySelector(`.${accordionItemClassNames.header}`)).toBeInTheDocument();
      expect(item.querySelector(`.${accordionItemClassNames.panel}`)).toBeInTheDocument();
    });

    it('applies styles prop to AccordionItem elements', () => {
      render(
        <DefaultThemeProvider>
          <Accordion testID="mock-accordion">
            <AccordionItem
              itemKey="1"
              styles={{ root: { borderWidth: 2 }, header: { opacity: 0.5 } }}
              testID="mock-accordion-item1"
              title="Accordion #1"
            >
              <Text as="p" display="block" font="body">
                Accordion Content1
              </Text>
            </AccordionItem>
          </Accordion>
        </DefaultThemeProvider>,
      );

      expect(screen.getByTestId('mock-accordion-item1')).toHaveStyle('border-width: 2px');
      expect(screen.getByTestId('mock-accordion-item1-header')).toHaveStyle('opacity: 0.5');
    });

    it('renders a divider between header and panel when showHeaderBorder is true', () => {
      render(
        <DefaultThemeProvider>
          <Accordion testID="mock-accordion">
            <AccordionItem
              itemKey="1"
              showHeaderBorder
              testID="mock-accordion-item1"
              title="Accordion #1"
            >
              <Text as="p" display="block" font="body">
                Accordion Content1
              </Text>
            </AccordionItem>
          </Accordion>
        </DefaultThemeProvider>,
      );

      expect(screen.getByTestId('mock-accordion-item1-divider')).toBeInTheDocument();
    });

    it('forwards background, caretSize, and spacing props to the header', () => {
      render(
        <DefaultThemeProvider>
          <Accordion testID="mock-accordion">
            <AccordionItem
              background="bgAlternate"
              caretSize="l"
              itemKey="1"
              paddingX={3}
              paddingY={1}
              testID="mock-accordion-item1"
              title="Accordion #1"
            >
              <Text as="p" display="block" font="body">
                Accordion Content1
              </Text>
            </AccordionItem>
          </Accordion>
        </DefaultThemeProvider>,
      );

      expect(screen.getByTestId('mock-accordion-item1-header')).toBeInTheDocument();
      expect(screen.getByText('Accordion #1')).toBeInTheDocument();
    });

    it('applies borderRadius to Accordion and AccordionItem roots', () => {
      render(
        <DefaultThemeProvider>
          <Accordion borderRadius={200} testID="mock-accordion">
            <AccordionItem
              borderRadius={400}
              itemKey="1"
              testID="mock-accordion-item1"
              title="Item"
            >
              <Text as="p" display="block" font="body">
                Content
              </Text>
            </AccordionItem>
          </Accordion>
        </DefaultThemeProvider>,
      );

      expect(screen.getByTestId('mock-accordion').className).toContain('200');
      expect(screen.getByTestId('mock-accordion').className).toMatch(/hidden/i);
      expect(screen.getByTestId('mock-accordion-item1').className).toContain('400');
      expect(screen.getByTestId('mock-accordion-item1').className).toMatch(/hidden/i);
    });

    it('renders a separator between items by default, and can be disabled via showItemSeparators', () => {
      const { rerender } = render(
        <DefaultThemeProvider>
          <MockAccordion />
        </DefaultThemeProvider>,
      );

      expect(screen.getByRole('separator')).toBeInTheDocument();

      rerender(
        <DefaultThemeProvider>
          <Accordion showItemSeparators={false} testID="mock-accordion">
            <AccordionItem itemKey="1" testID="mock-accordion-item1" title="Item 1">
              <Text as="p" display="block" font="body">
                Content1
              </Text>
            </AccordionItem>
            <AccordionItem itemKey="2" testID="mock-accordion-item2" title="Item 2">
              <Text as="p" display="block" font="body">
                Content2
              </Text>
            </AccordionItem>
          </Accordion>
        </DefaultThemeProvider>,
      );

      expect(screen.queryByRole('separator')).not.toBeInTheDocument();
    });

    it('applies AccordionItem defaults from ComponentConfigProvider', () => {
      const config: ComponentConfig = {
        AccordionItem: {
          showHeaderBorder: true,
          caretSize: 'l',
          borderRadius: 400,
          paddingX: 3,
          paddingY: 1,
        },
      };

      render(
        <DefaultThemeProvider>
          <ComponentConfigProvider value={config}>
            <Accordion testID="mock-accordion">
              <AccordionItem itemKey="1" testID="mock-accordion-item1" title="Item">
                <Text as="p" display="block" font="body">
                  Content
                </Text>
              </AccordionItem>
            </Accordion>
          </ComponentConfigProvider>
        </DefaultThemeProvider>,
      );

      expect(screen.getByTestId('mock-accordion-item1').className).toContain('400');
      expect(screen.getByTestId('mock-accordion-item1-divider')).toBeInTheDocument();
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
      expect(screen.getByTestId('mock-accordion-item2-panel')).toHaveStyle('display: none');

      rerender(<MockAccordionWithTheme activeKey="2" setActiveKey={setActiveKey} />);

      await waitFor(() => {
        expect(screen.getByTestId('mock-accordion-item1-panel')).toHaveStyle('display: none');
      });
      await waitFor(() => {
        expect(screen.getByTestId('mock-accordion-item2-panel')).toHaveStyle('visibility: visible');
      });
    });

    it('calls onChange but does not update internal state when controlled', () => {
      const onChange = jest.fn();
      render(
        <MockAccordionWithTheme activeKey="1" onChange={onChange} setActiveKey={setActiveKey} />,
      );

      fireEvent.click(screen.getByTestId('mock-accordion-item2-header'));

      expect(onChange).toHaveBeenCalledWith('2');

      expect(screen.getByTestId('mock-accordion-item1-panel')).toHaveStyle('visibility: visible');
      expect(screen.getByTestId('mock-accordion-item2-panel')).toHaveStyle('display: none');
    });

    it('closes panel when clicking active item in controlled mode', async () => {
      const { rerender } = render(
        <MockAccordionWithTheme activeKey="1" onChange={onChange} setActiveKey={setActiveKey} />,
      );

      expect(screen.getByTestId('mock-accordion-item1-panel')).toHaveStyle('visibility: visible');

      fireEvent.click(screen.getByTestId('mock-accordion-item1-header'));

      expect(setActiveKey).toHaveBeenCalledWith(null);

      rerender(
        <MockAccordionWithTheme activeKey="" onChange={onChange} setActiveKey={setActiveKey} />,
      );

      await waitFor(() => {
        expect(screen.getByTestId('mock-accordion-item1-panel')).toHaveStyle('display: none');
      });
    });
  });
});
