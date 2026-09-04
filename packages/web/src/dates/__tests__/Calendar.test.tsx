import React from 'react';
import { render } from '@testing-library/react';

import { DefaultThemeProvider } from '../../utils/test';
import { Calendar, calendarClassNames } from '../Calendar';

const CalendarWithTheme = (props: React.ComponentProps<typeof Calendar>) => (
  <DefaultThemeProvider>
    <Calendar {...props} />
  </DefaultThemeProvider>
);

describe('Calendar static classNames', () => {
  it('applies static class names to component elements', () => {
    render(<CalendarWithTheme />);

    const root = document.querySelector(`.${calendarClassNames.root}`);
    expect(root).toBeInTheDocument();
    expect(root?.querySelector(`.${calendarClassNames.header}`)).toBeInTheDocument();
    expect(root?.querySelector(`.${calendarClassNames.title}`)).toBeInTheDocument();
    expect(root?.querySelector(`.${calendarClassNames.navigation}`)).toBeInTheDocument();
    expect(root?.querySelector(`.${calendarClassNames.content}`)).toBeInTheDocument();
    expect(root?.querySelector(`.${calendarClassNames.day}`)).toBeInTheDocument();
  });
});
