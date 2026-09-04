import { renderA11y } from '@coinbase/cds-web-utils/jest';
import { render, screen } from '@testing-library/react';

import { DefaultThemeProvider } from '../../utils/test';
import {
  TextBody,
  TextCaption,
  type TextDefaultElement,
  TextDisplay1,
  TextDisplay2,
  TextDisplay3,
  TextHeadline,
  TextLabel1,
  TextLabel2,
  TextLegal,
  type TextProps,
  TextTitle1,
  TextTitle2,
  TextTitle3,
  TextTitle4,
} from '../index';

const textComponents = [
  TextDisplay1,
  TextDisplay2,
  TextDisplay3,
  TextTitle1,
  TextTitle2,
  TextTitle3,
  TextTitle4,
  TextHeadline,
  TextBody,
  TextLabel1,
  TextLabel2,
  TextCaption,
  TextLegal,
] as const;

describe('Text', () => {
  for (const TextComponent of textComponents) {
    it(`${TextComponent.displayName} passes accessibility`, async () => {
      expect(await renderA11y(<TextComponent>Child</TextComponent>)).toHaveNoViolations();
    });

    it(`${TextComponent.displayName} can show tabular numbers`, () => {
      render(
        <DefaultThemeProvider>
          <TextComponent tabularNumbers testID={`text-${TextComponent.displayName}`}>
            20.21
          </TextComponent>
        </DefaultThemeProvider>,
      );

      expect(screen.getByTestId(`text-${TextComponent.displayName}`).className).toContain(
        'tabularNumbers',
      );
    });

    it(`${TextComponent.displayName} can show slashed Zero`, () => {
      render(
        <DefaultThemeProvider>
          <TextComponent slashedZero testID={`text-${TextComponent.displayName}`}>
            YO2021Coinbase
          </TextComponent>
        </DefaultThemeProvider>,
      );

      expect(screen.getByTestId(`text-${TextComponent.displayName}`).className).toContain(
        'slashedZero',
      );
    });

    it(`${TextComponent.displayName} can be styled to not wrap`, () => {
      render(
        <DefaultThemeProvider>
          <TextComponent noWrap testID={`text-${TextComponent.displayName}`}>
            No Wrap
          </TextComponent>
        </DefaultThemeProvider>,
      );

      expect(screen.getByTestId(`text-${TextComponent.displayName}`).className).toContain('noWrap');
    });

    it(`${TextComponent.displayName} renders empty content when renderEmptyNode is true`, () => {
      render(
        <DefaultThemeProvider>
          <TextComponent renderEmptyNode testID={`text-${TextComponent.displayName}`}>
            {null}
          </TextComponent>
        </DefaultThemeProvider>,
      );

      expect(screen.getByTestId(`text-${TextComponent.displayName}`)).toBeEmptyDOMElement();
    });

    it(`${TextComponent.displayName} does not render when renderEmptyNode is false and content is empty`, () => {
      render(
        <DefaultThemeProvider>
          <TextComponent renderEmptyNode={false} testID={`text-${TextComponent.displayName}`}>
            {undefined}
          </TextComponent>
        </DefaultThemeProvider>,
      );

      expect(screen.queryByTestId(`text-${TextComponent.displayName}`)).not.toBeInTheDocument();
    });

    it(`${TextComponent.displayName} handles different empty values when renderEmptyNode is false`, () => {
      render(
        <DefaultThemeProvider>
          <TextComponent renderEmptyNode={false} testID={`${TextComponent.displayName}-null-text`}>
            {null}
          </TextComponent>
          <TextComponent
            renderEmptyNode={false}
            testID={`${TextComponent.displayName}-undefined-text`}
          >
            {undefined}
          </TextComponent>
          <TextComponent
            renderEmptyNode={false}
            testID={`${TextComponent.displayName}-empty-string-text`}
          />
          <TextComponent renderEmptyNode={false} testID={`${TextComponent.displayName}-nan-text`}>
            {NaN}
          </TextComponent>
          <TextComponent
            renderEmptyNode={false}
            testID={`${TextComponent.displayName}-number-content`}
          >
            {0}
          </TextComponent>
        </DefaultThemeProvider>,
      );

      expect(screen.queryByTestId(`${TextComponent.displayName}-null-text`)).toBeNull();
      expect(screen.queryByTestId(`${TextComponent.displayName}-undefined-text`)).toBeNull();
      expect(screen.queryByTestId(`${TextComponent.displayName}-empty-string-text`)).toBeNull();
      expect(screen.queryByTestId(`${TextComponent.displayName}-nan-text`)).toBeNull();
      expect(screen.getByTestId(`${TextComponent.displayName}-number-content`)).toBeInTheDocument();
      expect(screen.getByTestId(`${TextComponent.displayName}-number-content`)).toHaveTextContent(
        '0',
      );
    });

    it(`${TextComponent.displayName} renders content when renderEmptyNode is false and content exists`, () => {
      render(
        <DefaultThemeProvider>
          <TextComponent renderEmptyNode={false} testID={`${TextComponent.displayName}-text`}>
            Hello World
          </TextComponent>
        </DefaultThemeProvider>,
      );

      expect(screen.getByTestId(`${TextComponent.displayName}-text`)).toBeInTheDocument();
      expect(screen.getByTestId(`${TextComponent.displayName}-text`)).toHaveTextContent(
        'Hello World',
      );
    });
  }
});
