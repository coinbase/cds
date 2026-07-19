import React from 'react';
import { Animated, Text as RNText } from 'react-native';
import type { ThemeVars } from '@coinbase/cds-common/core/theme';
import { render, screen } from '@testing-library/react-native';

import { DefaultThemeProvider } from '../../utils/testHelpers';
import { Text } from '../Text';

const FontVariants: Record<string, ThemeVars.FontFamily> = {
  Display1: 'display1',
  Display2: 'display2',
  Display3: 'display3',
  Title1: 'title1',
  Title2: 'title2',
  Title3: 'title3',
  Title4: 'title4',
  Headline: 'headline',
  Body: 'body',
  Label1: 'label1',
  Label2: 'label2',
  Caption: 'caption',
  Legal: 'legal',
};

const fontTestRunner = (testFn: (font: ThemeVars.FontFamily, fontName: string) => void) => {
  Object.entries(FontVariants).forEach(([fontName, font]) => testFn(font, fontName));
};

describe('Text', () => {
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <DefaultThemeProvider>{children}</DefaultThemeProvider>
  );

  it('renders text and passes a11y for each font variant', () => {
    fontTestRunner((font, fontName) => {
      render(
        <Text font={font} testID={`text-${fontName}`}>
          Text
        </Text>,
        { wrapper },
      );

      expect(screen.getAllByTestId(`text-${fontName}`)).toHaveLength(1);
      expect(screen.getByText('Text')).toBeTruthy();
      expect(screen.getByTestId(`text-${fontName}`)).toBeAccessible();
    });
  });

  it('renders an Animated.Text when animated={true}', () => {
    fontTestRunner((font, fontName) => {
      render(
        <Text animated font={font} testID={`text-${fontName}`}>
          Sample Text
        </Text>,
        { wrapper },
      );

      expect(screen.UNSAFE_queryAllByType(Animated.Text)).toHaveLength(1);
      expect(screen.getByTestId(`text-${fontName}`)).toBeAccessible();
    });
  });

  it('sets forwarded ref for each font variant', () => {
    fontTestRunner((font, fontName) => {
      const ref = { current: null };
      render(
        <Text ref={ref} font={font} testID={`text-${fontName}`}>
          Text
        </Text>,
        { wrapper },
      );

      expect(ref.current).toBeInstanceOf(RNText);
      expect(screen.getByTestId(`text-${fontName}`)).toBeAccessible();
    });
  });

  it('can show tabular numbers for each font variant', () => {
    fontTestRunner(async (font, fontName) => {
      render(
        <Text tabularNumbers font={font} testID={`text-${fontName}`}>
          Text
        </Text>,
        { wrapper },
      );

      const textElement = screen.getByText('Text');

      expect(textElement).toHaveStyle({
        fontVariant: ['tabular-nums'],
      });
      expect(screen.getByTestId(`text-${fontName}`)).toBeAccessible();
    });
  });

  it('can show underline for each font variant', () => {
    fontTestRunner((font, fontName) => {
      render(
        <Text underline font={font} testID={`text-${fontName}`}>
          Text
        </Text>,
        { wrapper },
      );

      const textElement = screen.getByText('Text');
      expect(textElement).toHaveStyle({
        textDecorationLine: 'underline',
      });
      expect(screen.getByTestId(`text-${fontName}`)).toBeAccessible();
    });
  });

  it('can be styled to not wrap for each font variant', () => {
    fontTestRunner((font, fontName) => {
      render(
        <Text noWrap font={font} testID={`text-${fontName}`}>
          Text
        </Text>,
        { wrapper },
      );

      const textElement = screen.getByText('Text');
      expect(textElement.props).toHaveProperty('numberOfLines', 1);
      expect(screen.getByTestId(`text-${fontName}`)).toBeAccessible();
    });
  });

  it('renders mono font for each font variant', () => {
    fontTestRunner((font, fontName) => {
      render(
        <Text mono font={font} testID={`text-${fontName}`}>
          Text
        </Text>,
        { wrapper },
      );

      const textElement = screen.getByText('Text');
      expect(textElement).toHaveStyle({
        fontFamily: expect.stringContaining('SourceCodePro'),
      });
      expect(screen.getByTestId(`text-${fontName}`)).toBeAccessible();
    });
  });

  it('renders empty content when renderEmptyNode is true', () => {
    render(
      <Text renderEmptyNode font="body" testID="empty-text">
        {null}
      </Text>,
      { wrapper },
    );
    expect(screen.getByTestId('empty-text')).toBeTruthy();
  });

  it('does not render when renderEmptyNode is false and content is empty', () => {
    render(
      <Text font="body" renderEmptyNode={false} testID="empty-text">
        {null}
      </Text>,
      { wrapper },
    );
    expect(screen.queryByTestId('empty-text')).toBeNull();
  });

  it('handles different empty values when renderEmptyNode is false', () => {
    render(
      <>
        <Text font="body" renderEmptyNode={false} testID="null-text">
          {null}
        </Text>
        <Text font="body" renderEmptyNode={false} testID="undefined-text">
          {undefined}
        </Text>
        <Text font="body" renderEmptyNode={false} testID="empty-string-text" />
        <Text font="body" renderEmptyNode={false} testID="nan-text">
          {NaN}
        </Text>
        <Text font="body" renderEmptyNode={false} testID="number-content">
          {0}
        </Text>
      </>,
      { wrapper },
    );

    expect(screen.queryByTestId('null-text')).toBeNull();
    expect(screen.queryByTestId('undefined-text')).toBeNull();
    expect(screen.queryByTestId('empty-string-text')).toBeNull();
    expect(screen.queryByTestId('nan-text')).toBeNull();
    expect(screen.getByTestId('number-content')).toBeTruthy();
    expect(screen.getByText('0')).toBeTruthy();
  });

  it('renders content when renderEmptyNode is false and content exists', () => {
    render(
      <Text font="body" renderEmptyNode={false} testID="content-text">
        Hello World
      </Text>,
      { wrapper },
    );

    expect(screen.getByTestId('content-text')).toBeTruthy();
    expect(screen.getByText('Hello World')).toBeTruthy();
  });
});
