import { renderA11y } from '@coinbase/cds-web-utils/jest';
import { render, screen } from '@testing-library/react';

import { Text } from '../../typography/Text';
import { Table } from '../Table';
import { TableCaption, type TableCaptionProps } from '../TableCaption';

const DEFAULT_CAPTION = 'Table Caption';
const TABLE_TEST_ID = 'mock-table';
const CAPTION_TEST_ID = 'mock-caption';

type TableCaptionMockProps = {
  children?: TableCaptionProps['children'];
} & Omit<TableCaptionProps, 'children'>;

const TableCaptionMock = ({ children = DEFAULT_CAPTION, ...rest }: TableCaptionMockProps) => (
  <Table testID={TABLE_TEST_ID}>
    <TableCaption {...rest} testID={CAPTION_TEST_ID}>
      {children}
    </TableCaption>
  </Table>
);

describe('TableCaption', () => {
  it('passes accessibility', async () => {
    expect(await renderA11y(<TableCaptionMock />)).toHaveNoViolations();
  });

  it('renders an accessible label for table when children is a string', () => {
    render(<TableCaptionMock />);

    expect(screen.getByText(DEFAULT_CAPTION)).toBeVisible();
    expect(screen.getByTestId(TABLE_TEST_ID)).toHaveAccessibleName(DEFAULT_CAPTION);
  });

  it('renders an accessible label for table when children is a React element', () => {
    const caption = 'Some Other Caption';

    render(
      <TableCaptionMock>
        <Text as="h2" display="block" font="display2">
          {caption}
        </Text>
      </TableCaptionMock>,
    );

    expect(screen.getByText(caption)).toBeVisible();
    expect(screen.getByTestId(TABLE_TEST_ID)).toHaveAccessibleName(caption);
  });

  it('renders text as a span by default', () => {
    render(<TableCaptionMock />);

    expect(screen.getByText(DEFAULT_CAPTION).tagName.toLowerCase()).toBe('span');
  });

  it('renders text as the desired element', () => {
    render(<TableCaptionMock as="h2" />);

    const caption = screen.getByText(DEFAULT_CAPTION);
    expect(caption.tagName.toLowerCase()).toBe('h2');
    expect(caption.className).toContain('inline');
    expect(caption.className).toContain('currentColor');
    expect(caption.className).toContain('title3');
    expect(caption.className).toContain('start');
    expect(caption.className).toContain('baseCss');
  });

  it('left aligns string children by default', () => {
    render(<TableCaptionMock />);

    expect(screen.getByText(DEFAULT_CAPTION).className).toContain('start');
  });

  it('center aligns string children', () => {
    render(<TableCaptionMock align="center" />);

    expect(screen.getByText(DEFAULT_CAPTION).className).toContain('center');
  });

  it('right aligns string children', () => {
    render(<TableCaptionMock align="end" />);

    expect(screen.getByText(DEFAULT_CAPTION).className).toContain('end');
  });

  it('justify aligns string children', () => {
    render(<TableCaptionMock align="justify" />);

    expect(screen.getByText(DEFAULT_CAPTION).className).toContain('justify');
  });

  it('sets text color', () => {
    render(<TableCaptionMock color="fgPositive" />);

    expect(screen.getByTestId(CAPTION_TEST_ID)).toHaveStyle({ color: 'var(--color-fgPositive)' });
  });

  it('sets background color', () => {
    render(<TableCaptionMock backgroundColor="bgNegative" />);

    expect(screen.getByTestId(CAPTION_TEST_ID)).toHaveStyle({
      backgroundColor: 'var(--color-bgNegative)',
    });
  });
});
