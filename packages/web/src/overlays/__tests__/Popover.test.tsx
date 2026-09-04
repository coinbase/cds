import { useCallback, useState } from 'react';
import { renderA11y } from '@coinbase/cds-web-utils/jest';
import { fireEvent, render, screen } from '@testing-library/react';

import { Box } from '../../layout/Box';
import { Pressable } from '../../system/Pressable';
import { DefaultThemeProvider } from '../../utils/test';
import { Popover } from '../popover/Popover';
import type { PopoverProps } from '../popover/PopoverProps';

const SUBJECT_TEST_ID = 'subject';
const CONTENT_TEST_ID = 'content';

const PopoverExample = ({
  visible: initialVisibility = false,
  disabled,
  onPressSubject,
  ...props
}: Partial<Pick<PopoverProps, 'visible' | 'disabled' | 'onPressSubject'>>) => {
  const [visible, setVisible] = useState(initialVisibility);
  const handleSubjectPress = useCallback(() => {
    setVisible(true);
    onPressSubject?.();
  }, [onPressSubject]);
  return (
    <DefaultThemeProvider>
      <Popover
        content={<Box />}
        disabled={disabled}
        onPressSubject={handleSubjectPress}
        testID={CONTENT_TEST_ID}
        visible={visible}
        {...props}
      >
        <Pressable background="bgPrimary" disabled={disabled} testID={SUBJECT_TEST_ID}>
          Button
        </Pressable>
      </Popover>
    </DefaultThemeProvider>
  );
};

describe('Popover', () => {
  it('passes accessibility', async () => {
    expect(await renderA11y(<PopoverExample />)).toHaveNoViolations();
  });

  it('renders subject but not content on mount', () => {
    render(<PopoverExample />);

    expect(screen.getByTestId(SUBJECT_TEST_ID)).toBeInTheDocument();
    expect(screen.queryByTestId(CONTENT_TEST_ID)).not.toBeInTheDocument();
  });

  it('renders content when visible', async () => {
    render(<PopoverExample visible />);

    expect(await screen.findByTestId(CONTENT_TEST_ID)).toBeInTheDocument();
  });
  it('renders content when subject is pressed', async () => {
    const pressSpy = jest.fn();
    render(<PopoverExample onPressSubject={pressSpy} />);
    expect(screen.queryByTestId(CONTENT_TEST_ID)).not.toBeInTheDocument();
    fireEvent.click(await screen.findByTestId(SUBJECT_TEST_ID));

    expect(await screen.findByTestId(CONTENT_TEST_ID)).toBeInTheDocument();
    expect(pressSpy).toHaveBeenCalled();
  });
  it('does not render content when disabled', async () => {
    const pressSpy = jest.fn();
    render(<PopoverExample disabled onPressSubject={pressSpy} />);
    fireEvent.click(await screen.findByTestId(SUBJECT_TEST_ID));

    expect(screen.queryByTestId(CONTENT_TEST_ID)).not.toBeInTheDocument();
    expect(pressSpy).not.toHaveBeenCalled();
  });
  it('renders content with a transparent container', async () => {
    render(<PopoverExample visible />);

    expect((await screen.findByTestId(CONTENT_TEST_ID)).className).toContain('transparent');
  });
});
