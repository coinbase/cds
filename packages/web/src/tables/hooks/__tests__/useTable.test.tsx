import { renderHook } from '@testing-library/react-hooks';

import { Table } from '../../Table';
import { TableBody } from '../../TableBody';
import { TableFooter } from '../../TableFooter';
import { TableHeader } from '../../TableHeader';
import {
  compactCellSpacing,
  defaultCellSpacing,
  useTableCellSpacing,
  useTableCellTag,
  useTableSectionTag,
} from '../useTable';

describe('useTableTag', () => {
  it('Throw an error warning devs to use this hook in context', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

    renderHook(() => useTableSectionTag());
    renderHook(() => useTableCellTag());
    renderHook(() => useTableCellSpacing());

    expect(consoleSpy).toHaveBeenCalledTimes(3);
    expect(consoleSpy).toHaveBeenCalledWith(
      'This component must be wrapped in a TableHeader, TableBody or TableFooter.',
    );
  });

  it('Get proper section tag for TableHeader', () => {
    const wrapper = ({ children }: React.PropsWithChildren<unknown>) => (
      <TableHeader>{children}</TableHeader>
    );
    const { result } = renderHook(() => useTableSectionTag(), { wrapper });

    expect(result.current).toBe('thead');
  });

  it('Get proper section tag for TableBody', () => {
    const wrapper = ({ children }: React.PropsWithChildren<unknown>) => (
      <TableBody>{children}</TableBody>
    );
    const { result } = renderHook(() => useTableSectionTag(), { wrapper });

    expect(result.current).toBe('tbody');
  });

  it('Get proper section tag for TableFooter', () => {
    const wrapper = ({ children }: React.PropsWithChildren<unknown>) => (
      <TableFooter>{children}</TableFooter>
    );
    const { result } = renderHook(() => useTableSectionTag(), { wrapper });

    expect(result.current).toBe('tfoot');
  });

  it('Get proper cell tag in TableHeader', () => {
    const wrapper = ({ children }: React.PropsWithChildren<unknown>) => (
      <TableHeader>{children}</TableHeader>
    );
    const { result } = renderHook(() => useTableCellTag(), { wrapper });

    expect(result.current).toBe('th');
  });

  it('Get proper cell tag in TableBody', () => {
    const wrapper = ({ children }: React.PropsWithChildren<unknown>) => (
      <TableBody>{children}</TableBody>
    );
    const { result } = renderHook(() => useTableCellTag(), { wrapper });

    expect(result.current).toBe('td');
  });

  it('Get proper cell tag in TableFooter', () => {
    const wrapper = ({ children }: React.PropsWithChildren<unknown>) => (
      <TableFooter>{children}</TableFooter>
    );
    const { result } = renderHook(() => useTableCellTag(), { wrapper });

    expect(result.current).toBe('td');
  });

  it('Get proper cell tag in TableBody when using the as prop', () => {
    const wrapper = ({ children }: React.PropsWithChildren<unknown>) => (
      <TableBody>{children}</TableBody>
    );
    const { result } = renderHook(() => useTableCellTag('th'), { wrapper });

    expect(result.current).toBe('th');
  });

  it('Get proper cell spacing', () => {
    const cellSpacing = {
      outer: { paddingY: 0, paddingX: 0 },
      inner: { paddingY: 0 },
    } as const;

    const wrapper = ({ children }: React.PropsWithChildren<unknown>) => (
      <Table cellSpacing={cellSpacing}>
        <TableBody>{children}</TableBody>
      </Table>
    );
    const { result } = renderHook(() => useTableCellSpacing(), { wrapper });

    expect(result.current).toEqual(cellSpacing);
  });

  it('Get default cell spacing', () => {
    const wrapper = ({ children }: React.PropsWithChildren<unknown>) => (
      <Table>
        <TableBody>{children}</TableBody>
      </Table>
    );
    const { result } = renderHook(() => useTableCellSpacing(), { wrapper });

    expect(result.current).toEqual(defaultCellSpacing);
  });

  it('Get compact cell spacing', () => {
    const wrapper = ({ children }: React.PropsWithChildren<unknown>) => (
      <Table compact>
        <TableBody>{children}</TableBody>
      </Table>
    );
    const { result } = renderHook(() => useTableCellSpacing(), { wrapper });

    expect(result.current).toEqual(compactCellSpacing);
  });

  it('Get cell spacing can skip as validation', () => {
    const { result } = renderHook(() => useTableCellSpacing({ skipAsValidation: true }));

    expect(result.error).toBeUndefined();
  });
});
