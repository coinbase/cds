import { renderHook } from '@testing-library/react-hooks';

import { Table, TableBody } from '../../index';
import { useTableVariant } from '../useTableVariant';

describe('useTableVariant', () => {
  it('Get default variant from Table', async () => {
    const wrapper = ({ children }: React.PropsWithChildren<unknown>) => (
      <Table>
        <TableBody>{children}</TableBody>
      </Table>
    );
    const { result } = renderHook(() => useTableVariant(), { wrapper });

    expect(result.current.variant).toBe('default');
  });

  it('Get graph variant from Table', async () => {
    const wrapper = ({ children }: React.PropsWithChildren<unknown>) => (
      <Table variant="graph">
        <TableBody>{children}</TableBody>
      </Table>
    );
    const { result } = renderHook(() => useTableVariant(), { wrapper });

    expect(result.current.variant).toBe('graph');
  });

  it('Get ruled variant from Table', async () => {
    const wrapper = ({ children }: React.PropsWithChildren<unknown>) => (
      <Table variant="ruled">
        <TableBody>{children}</TableBody>
      </Table>
    );
    const { result } = renderHook(() => useTableVariant(), { wrapper });

    expect(result.current.variant).toBe('ruled');
  });
});
