import { noop } from '@cbhq/cds-utils';
import { renderA11y } from '@cbhq/cds-web-utils/jest';
import { fireEvent, render, screen } from '@testing-library/react';

import { Button } from '../../buttons';
import { DefaultThemeProvider } from '../../utils/test';
import { CellHelperText } from '../CellHelperText';
import { CellMedia } from '../CellMedia';
import { ListCell } from '../ListCell';

const URL = 'https://www.google.com';
const A11Y_TEXT = 'Some accessible text';

describe('ListCell', () => {
  it('passes accessibility', async () => {
    expect(
      await renderA11y(
        <DefaultThemeProvider>
          <ListCell description="Description" detail="Detail" subdetail="Subdetail" title="Title" />
        </DefaultThemeProvider>,
      ),
    ).toHaveNoViolations();
  });

  it('passes accessibility when a button', async () => {
    expect(
      await renderA11y(
        <DefaultThemeProvider>
          <ListCell
            description="Description"
            detail="Detail"
            onClick={noop}
            subdetail="Subdetail"
            title="Title"
          />
        </DefaultThemeProvider>,
      ),
    ).toHaveNoViolations();
  });

  it('passes accessibility when a link', async () => {
    expect(
      await renderA11y(
        <DefaultThemeProvider>
          <ListCell
            description="Description"
            detail="Detail"
            href={URL}
            subdetail="Subdetail"
            title="Title"
          />
        </DefaultThemeProvider>,
      ),
    ).toHaveNoViolations();
  });

  it('sets an accessibile label with accessibilityLabel when pressable', () => {
    render(
      <DefaultThemeProvider>
        <ListCell accessibilityLabel={A11Y_TEXT} onClick={noop} />
      </DefaultThemeProvider>,
    );

    expect(screen.getByRole('button')).toHaveAccessibleName(A11Y_TEXT);
  });

  it('sets an accessibile label with accessibilityLabelledBy when pressable', () => {
    const labelId = 'label-id';

    render(
      <DefaultThemeProvider>
        <span id={labelId}>{A11Y_TEXT}</span>
        <ListCell accessibilityLabelledBy={labelId} onClick={noop} />
      </DefaultThemeProvider>,
    );

    expect(screen.getByRole('button')).toHaveAccessibleName(A11Y_TEXT);
  });

  it('sets an accessibile description with accessibilityHint when pressable', () => {
    const descriptionId = 'description-id';

    render(
      <DefaultThemeProvider>
        <span id={descriptionId}>{A11Y_TEXT}</span>
        <ListCell accessibilityHint={descriptionId} onClick={noop} />
      </DefaultThemeProvider>,
    );

    expect(screen.getByRole('button')).toHaveAccessibleDescription(A11Y_TEXT);
  });

  it('renders a title', () => {
    render(
      <DefaultThemeProvider>
        <ListCell title={<div data-testid="title">Title</div>} />
      </DefaultThemeProvider>,
    );

    expect(screen.getByTestId('title')).toBeVisible();
  });

  it('renders a description', () => {
    render(
      <DefaultThemeProvider>
        <ListCell description={<div data-testid="description">Description</div>} />
      </DefaultThemeProvider>,
    );

    expect(screen.getByTestId('description')).toBeVisible();
  });

  it('renders a detail', () => {
    render(
      <DefaultThemeProvider>
        <ListCell detail={<div data-testid="detail">Detail</div>} />
      </DefaultThemeProvider>,
    );

    expect(screen.getByTestId('detail')).toBeVisible();
  });

  it('renders a subdetail', () => {
    render(
      <DefaultThemeProvider>
        <ListCell subdetail={<div data-testid="subdetail">Subdetail</div>} title="Title" />
      </DefaultThemeProvider>,
    );

    expect(screen.getByTestId('subdetail')).toBeVisible();
  });

  it('renders a helperText', () => {
    render(
      <DefaultThemeProvider>
        <ListCell helperText={<CellHelperText>helperText</CellHelperText>} />
      </DefaultThemeProvider>,
    );

    expect(screen.getByText('helperText')).toBeVisible();
  });

  it('renders media', () => {
    render(
      <DefaultThemeProvider>
        <ListCell media={<CellMedia active name="add" testID="media" type="icon" />} />
      </DefaultThemeProvider>,
    );

    expect(screen.getByTestId('media')).toBeVisible();
  });

  it('renders an accessory', () => {
    render(
      <DefaultThemeProvider>
        <ListCell accessory="arrow" />
      </DefaultThemeProvider>,
    );

    const accessory = screen.getByTestId('icon-base-glyph');

    expect(accessory).toBeVisible();
    expect(accessory).toHaveAttribute('data-icon-name', 'caretRight');
  });

  it('renders a default accessory when selected', () => {
    render(
      <DefaultThemeProvider>
        <ListCell selected />
      </DefaultThemeProvider>,
    );

    const accessory = screen.getByTestId('icon-base-glyph');

    expect(accessory).toBeVisible();
    expect(accessory).toHaveAttribute('data-icon-name', 'checkmark');
  });

  it('overrides the provided accessory with a default accessory when selected', () => {
    render(
      <DefaultThemeProvider>
        <ListCell selected accessory="arrow" />
      </DefaultThemeProvider>,
    );

    const accessory = screen.getByTestId('icon-base-glyph');

    expect(accessory).toBeVisible();
    expect(accessory).toHaveAttribute('data-icon-name', 'checkmark');
  });

  it('does not override the provided accessory when selected and `disableSelectionAccessory` is true', () => {
    render(
      <DefaultThemeProvider>
        <ListCell disableSelectionAccessory selected accessory="arrow" />
      </DefaultThemeProvider>,
    );

    const accessory = screen.getByTestId('icon-base-glyph');

    expect(accessory).toBeVisible();
    expect(accessory).toHaveAttribute('data-icon-name', 'caretRight');
  });

  it('does not render a default accessory when selected and `disableSelectionAccessory` is true', () => {
    render(
      <DefaultThemeProvider>
        <ListCell disableSelectionAccessory selected />
      </DefaultThemeProvider>,
    );

    expect(screen.queryByTestId('icon-base-glyph')).not.toBeInTheDocument();
  });

  it('renders an action', () => {
    const button = <Button data-testid="button">Test</Button>;
    render(
      <DefaultThemeProvider>
        <ListCell action={button} />
      </DefaultThemeProvider>,
    );

    expect(screen.getByTestId('button')).toBeVisible();
  });

  it('renders button when onClick is defined', () => {
    render(
      <DefaultThemeProvider>
        <ListCell onClick={noop} />
      </DefaultThemeProvider>,
    );

    expect(screen.getByRole('button')).toBeVisible();
  });

  it('renders button when onKeyUp is defined', () => {
    render(
      <DefaultThemeProvider>
        <ListCell onKeyUp={noop} />
      </DefaultThemeProvider>,
    );

    expect(screen.getByRole('button')).toBeVisible();
  });

  it('renders button when onKeyDown is defined', () => {
    render(
      <DefaultThemeProvider>
        <ListCell onKeyDown={noop} />
      </DefaultThemeProvider>,
    );

    expect(screen.getByRole('button')).toBeVisible();
  });

  it('renders link when to is set with a url', () => {
    render(
      <DefaultThemeProvider>
        <ListCell href={URL} />
      </DefaultThemeProvider>,
    );

    const link = screen.getByRole('link');

    expect(link).toBeVisible();
    expect(link).toHaveAttribute('href', URL);
  });

  it('renders link when href is set with a url', () => {
    render(
      <DefaultThemeProvider>
        <ListCell href={URL} />
      </DefaultThemeProvider>,
    );

    const link = screen.getByRole('link');

    expect(link).toBeVisible();
    expect(link).toHaveAttribute('href', URL);
  });

  it('renders link when pressable callback is defined but to is set with a url', () => {
    render(
      <DefaultThemeProvider>
        <ListCell href={URL} onClick={noop} />
      </DefaultThemeProvider>,
    );

    const link = screen.getByRole('link');

    expect(link).toBeVisible();
    expect(link).toHaveAttribute('href', URL);
  });

  it('renders link when pressable callback is defined but href is set with a url', () => {
    render(
      <DefaultThemeProvider>
        <ListCell href={URL} onClick={noop} />
      </DefaultThemeProvider>,
    );

    const link = screen.getByRole('link');

    expect(link).toBeVisible();
    expect(link).toHaveAttribute('href', URL);
  });

  it('sets target on link when target is defined', () => {
    const target = '_blank';

    render(
      <DefaultThemeProvider>
        <ListCell href={URL} target={target} />
      </DefaultThemeProvider>,
    );

    expect(screen.getByRole('link')).toHaveAttribute('target', target);
  });

  it('fires onClick', () => {
    const onClickSpy = jest.fn();

    render(
      <DefaultThemeProvider>
        <ListCell onClick={onClickSpy} />
      </DefaultThemeProvider>,
    );
    fireEvent.click(screen.getByRole('button'));

    expect(onClickSpy).toHaveBeenCalledTimes(1);
  });

  it('fires onKeyUp', () => {
    const onKeyUpSpy = jest.fn();

    render(
      <DefaultThemeProvider>
        <ListCell onKeyUp={onKeyUpSpy} />
      </DefaultThemeProvider>,
    );
    fireEvent.keyUp(screen.getByRole('button'), { charCode: 13 });

    expect(onKeyUpSpy).toHaveBeenCalledTimes(1);
  });

  it('fires onKeyDown', () => {
    const onKeyDownSpy = jest.fn();

    render(
      <DefaultThemeProvider>
        <ListCell onKeyDown={onKeyDownSpy} />
      </DefaultThemeProvider>,
    );
    fireEvent.keyDown(screen.getByRole('button'), { charCode: 13 });

    expect(onKeyDownSpy).toHaveBeenCalledTimes(1);
  });
});
