import { noop } from '@coinbase/cds-utils';
import { renderA11y } from '@coinbase/cds-web-utils/jest';
import { fireEvent, render, screen } from '@testing-library/react';

import { Button } from '../../buttons';
import { DefaultThemeProvider } from '../../utils/test';
import { TableBody } from '../TableBody';
import { TableRow } from '../TableRow';

const TEST_ID = 'some-test-id';

describe('TableRow', () => {
  it('passes accessibility', async () => {
    expect(
      await renderA11y(
        <table>
          <TableBody>
            <TableRow>
              <td>Child</td>
            </TableRow>
          </TableBody>
        </table>,
      ),
    ).toHaveNoViolations();
  });

  it('spreads data props', () => {
    render(
      <table>
        <TableBody>
          <TableRow data-row="my-first-row" testID="first-row">
            <td>First child</td>
          </TableRow>
          <TableRow data-row="my-second-row" testID="second-row">
            <td>Second child</td>
          </TableRow>
        </TableBody>
      </table>,
    );

    expect(screen.getByTestId('first-row')).toHaveAttribute('data-row', 'my-first-row');
    expect(screen.getByTestId('second-row')).toHaveAttribute('data-row', 'my-second-row');
  });

  it('does not set tab index by default', () => {
    render(
      <table>
        <TableBody>
          <TableRow testID={TEST_ID}>
            <td>Child</td>
          </TableRow>
        </TableBody>
      </table>,
    );

    expect(screen.getByTestId(TEST_ID)).not.toHaveAttribute('tabindex');
  });

  it('sets tab index', () => {
    render(
      <table>
        <TableBody>
          <TableRow tabIndex={-1} testID={TEST_ID}>
            <td>Child</td>
          </TableRow>
        </TableBody>
      </table>,
    );

    expect(screen.getByTestId(TEST_ID)).toHaveAttribute('tabindex', '-1');
  });

  it('sets default tab index of 0 when onPress is defined', () => {
    render(
      <table>
        <TableBody>
          <TableRow onClick={noop} testID={TEST_ID}>
            <td>Child</td>
          </TableRow>
        </TableBody>
      </table>,
    );

    expect(screen.getByTestId(TEST_ID)).toHaveAttribute('tabindex', '0');
  });

  it('fires onPress when clicked', () => {
    const onClickSpy = jest.fn();

    render(
      <table>
        <TableBody>
          <TableRow onClick={onClickSpy} testID={TEST_ID}>
            <td>Child</td>
          </TableRow>
        </TableBody>
      </table>,
    );

    fireEvent.click(screen.getByTestId(TEST_ID));

    expect(onClickSpy).toHaveBeenCalledTimes(1);
  });

  it('fires onPress when enter is pressed', () => {
    const onClickSpy = jest.fn();

    render(
      <table>
        <TableBody>
          <TableRow onClick={onClickSpy} testID={TEST_ID}>
            <td>Child</td>
          </TableRow>
        </TableBody>
      </table>,
    );

    fireEvent.keyDown(screen.getByTestId(TEST_ID), { key: 'Enter' });

    expect(onClickSpy).toHaveBeenCalledTimes(1);
  });

  it('fires onPress when space is pressed', () => {
    const onClickSpy = jest.fn();

    render(
      <table>
        <TableBody>
          <TableRow onClick={onClickSpy} testID={TEST_ID}>
            <td>Child</td>
          </TableRow>
        </TableBody>
      </table>,
    );

    fireEvent.keyDown(screen.getByTestId(TEST_ID), { code: 'Space' });

    expect(onClickSpy).toHaveBeenCalledTimes(1);
  });

  it('does not fire onPress when a key other than space or enter is pressed', () => {
    const onClickSpy = jest.fn();

    render(
      <table>
        <TableBody>
          <TableRow onClick={onClickSpy} testID={TEST_ID}>
            <td>Child</td>
          </TableRow>
        </TableBody>
      </table>,
    );

    fireEvent.keyDown(screen.getByTestId(TEST_ID), { key: 'A' });

    expect(onClickSpy).toHaveBeenCalledTimes(0);
  });

  it('does not fire onPress more than once on pressable child keydown events', () => {
    const onClickSpy = jest.fn();

    render(
      <DefaultThemeProvider>
        <table>
          <TableBody>
            <TableRow onClick={onClickSpy}>
              <td>
                <Button testID={TEST_ID}>Child</Button>
              </td>
            </TableRow>
          </TableBody>
        </table>
      </DefaultThemeProvider>,
    );

    fireEvent.keyDown(screen.getByTestId(TEST_ID), { key: 'Enter' });

    expect(onClickSpy).toHaveBeenCalledTimes(1);
  });
});
