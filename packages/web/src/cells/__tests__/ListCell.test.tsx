import { noop } from '@coinbase/cds-utils';
import { renderA11y } from '@coinbase/cds-web-utils/jest';
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

  it('applies classNames to internal components', () => {
    render(
      <DefaultThemeProvider>
        <ListCell
          accessory="arrow"
          classNames={{
            accessory: 'accessory',
            contentContainer: 'content-container',
            description: 'description',
            end: 'end',
            helperText: 'helper-text',
            intermediary: 'intermediary',
            mainContent: 'main-content',
            media: 'media',
            pressable: 'pressable',
            root: 'root',
            subtitle: 'subtitle',
            titleStack: 'title-stack',
            titleStackContainer: 'title-stack-container',
            title: 'title',
          }}
          description="Description"
          detail="Detail"
          helperText={<div>Helper text</div>}
          intermediary={<div data-testid="intermediary-node" />}
          media={<div data-testid="media-node" />}
          onClick={noop}
          subtitle="Subtitle"
          title="Title"
        />
      </DefaultThemeProvider>,
    );

    expect(document.querySelector('.root')).toBeInTheDocument();
    expect(document.querySelector('.pressable')).toBeInTheDocument();
    expect(document.querySelector('.content-container')).toBeInTheDocument();
    expect(document.querySelector('.main-content')).toBeInTheDocument();
    expect(document.querySelector('.title-stack-container')).toBeInTheDocument();
    expect(document.querySelector('.title-stack')).toBeInTheDocument();
    expect(document.querySelector('.title')).toHaveTextContent('Title');
    expect(document.querySelector('.subtitle')).toHaveTextContent('Subtitle');
    expect(document.querySelector('.description')).toHaveTextContent('Description');
    expect(document.querySelector('.helper-text')).toHaveTextContent('Helper text');
    expect(document.querySelector('.media')).toBeInTheDocument();
    expect(document.querySelector('.intermediary')).toBeInTheDocument();
    expect(document.querySelector('.end')).toBeInTheDocument();
    expect(document.querySelector('.accessory')).toBeInTheDocument();
  });

  it('applies styles to internal components', () => {
    render(
      <DefaultThemeProvider>
        <ListCell
          accessory="arrow"
          classNames={{
            accessory: 'accessory',
            contentContainer: 'content-container',
            description: 'description',
            end: 'end',
            helperText: 'helper-text',
            intermediary: 'intermediary',
            mainContent: 'main-content',
            media: 'media',
            pressable: 'pressable',
            root: 'root',
            subtitle: 'subtitle',
            titleStack: 'title-stack',
            titleStackContainer: 'title-stack-container',
            title: 'title',
          }}
          description="Description"
          detail="Detail"
          helperText={<div>Helper text</div>}
          intermediary={<div data-testid="intermediary-node" />}
          media={<div data-testid="media-node" />}
          onClick={noop}
          styles={{
            accessory: { outline: '1px solid rgb(1, 2, 3)' },
            contentContainer: { outline: '1px solid rgb(4, 5, 6)' },
            description: { outline: '1px solid rgb(7, 8, 9)' },
            end: { outline: '1px solid rgb(10, 11, 12)' },
            helperText: { outline: '1px solid rgb(13, 14, 15)' },
            intermediary: { outline: '1px solid rgb(16, 17, 18)' },
            mainContent: { outline: '1px solid rgb(19, 20, 21)' },
            media: { outline: '1px solid rgb(22, 23, 24)' },
            pressable: { outline: '1px solid rgb(25, 26, 27)' },
            root: { outline: '1px solid rgb(28, 29, 30)' },
            subtitle: { outline: '1px solid rgb(31, 32, 33)' },
            title: { outline: '1px solid rgb(34, 35, 36)' },
            titleStack: { outline: '1px solid rgb(37, 38, 39)' },
            titleStackContainer: { outline: '1px solid rgb(40, 41, 42)' },
          }}
          subtitle="Subtitle"
          title="Title"
        />
      </DefaultThemeProvider>,
    );

    expect(document.querySelector('.root')).toHaveStyle('outline: 1px solid rgb(28, 29, 30)');
    expect(document.querySelector('.pressable')).toHaveStyle('outline: 1px solid rgb(25, 26, 27)');
    expect(document.querySelector('.content-container')).toHaveStyle(
      'outline: 1px solid rgb(4, 5, 6)',
    );
    expect(document.querySelector('.main-content')).toHaveStyle(
      'outline: 1px solid rgb(19, 20, 21)',
    );
    expect(document.querySelector('.title-stack-container')).toHaveStyle(
      'outline: 1px solid rgb(40, 41, 42)',
    );
    expect(document.querySelector('.title-stack')).toHaveStyle(
      'outline: 1px solid rgb(37, 38, 39)',
    );

    expect(document.querySelector('.title')).toHaveStyle('outline: 1px solid rgb(34, 35, 36)');
    expect(document.querySelector('.subtitle')).toHaveStyle('outline: 1px solid rgb(31, 32, 33)');
    expect(document.querySelector('.description')).toHaveStyle('outline: 1px solid rgb(7, 8, 9)');

    expect(document.querySelector('.helper-text')).toHaveStyle(
      'outline: 1px solid rgb(13, 14, 15)',
    );
    expect(document.querySelector('.media')).toHaveStyle('outline: 1px solid rgb(22, 23, 24)');
    expect(document.querySelector('.intermediary')).toHaveStyle(
      'outline: 1px solid rgb(16, 17, 18)',
    );
    expect(document.querySelector('.end')).toHaveStyle('outline: 1px solid rgb(10, 11, 12)');
    expect(document.querySelector('.accessory')).toHaveStyle('outline: 1px solid rgb(1, 2, 3)');
  });
});
