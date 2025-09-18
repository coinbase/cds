import React from 'react';

import { Box } from '../../layout/Box';
import { VStack } from '../../layout/VStack';
import type { TextProps } from '../index';
import {
  Text,
  TextBody,
  TextCaption,
  TextDisplay1,
  TextDisplay2,
  TextDisplay3,
  TextHeadline,
  TextLabel1,
  TextLabel2,
  TextLegal,
  TextTitle1,
  TextTitle2,
  TextTitle3,
  TextTitle4,
} from '../index';

const textComponents = [
  TextTitle3,
  TextTitle4,
  TextHeadline,
  TextBody,
  TextLabel1,
  TextLabel2,
  TextCaption,
  TextLegal,
];

const renderHeaderComponents = (props?: TextProps<'h1' | 'h2' | 'h3' | 'h4'>) => (
  <>
    <TextDisplay1 as="h1" {...props}>
      Display1
    </TextDisplay1>
    <TextDisplay2 as="h2" {...props}>
      Display2
    </TextDisplay2>
    <TextDisplay3 as="h3" {...props}>
      Display3
    </TextDisplay3>
    <TextTitle1 as="h3" {...props}>
      Title1
    </TextTitle1>
    <TextTitle2 as="h4" {...props}>
      Title2
    </TextTitle2>
  </>
);

export const Normal = () => (
  <>
    {renderHeaderComponents({ display: 'block' })}
    {textComponents.map((Component) => {
      const name = (Component as { displayName?: string }).displayName?.slice(4);
      return (
        <Component key={name} as="p" display="block">
          {name}
        </Component>
      );
    })}
  </>
);

export const TextWithInherit = () => {
  return (
    // parent's font size is that of a legal text
    <Box flexDirection="column" font="display1">
      <Text as="p" display="block" font="body">
        The following text inherits the parent Display1 font but overrides the fontSize prop
      </Text>
      {/* marking this Text as inherit */}
      <Text as="h1" display="block" font="inherit" fontSize="legal">
        Display1
      </Text>
    </Box>
  );
};

export const MonoFont = () => (
  <>
    {renderHeaderComponents({ mono: true, display: 'block' })}
    {textComponents.map((Component) => {
      const name = (Component as { displayName?: string }).displayName?.slice(4);
      return (
        <Component key={name} mono as="p" display="block">
          {name}
        </Component>
      );
    })}
  </>
);

export const SlashedZero = () => (
  <TextBody slashedZero as="p">
    OZY28019
  </TextBody>
);

export const TabularNumbers = () => (
  <>
    <TextBody tabularNumbers as="p" display="block" textAlign="end">
      91.23450
    </TextBody>
    <TextBody tabularNumbers as="p" display="block" textAlign="end">
      11.98762
    </TextBody>
  </>
);

export const SelectableNone = () => (
  <TextBody as="p" display="block" userSelect="none">
    BTC
  </TextBody>
);

export const SelectableText = () => (
  <TextBody as="p" display="block" userSelect="text">
    Balance: 1,820,29.56
  </TextBody>
);

export const SelectableAll = () => (
  <TextBody slashedZero as="p" display="block" userSelect="all">
    bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh
  </TextBody>
);

export const Underline = () => (
  <TextBody underline as="p" display="block">
    Learn more
  </TextBody>
);

export const Strikethrough = () => (
  <TextBody as="s" textDecoration="line-through">
    Manual verification
  </TextBody>
);

const MediumContainer = ({ children }: { children?: React.ReactNode }) => (
  <div style={{ width: '35%', height: '50px', backgroundColor: 'var(--color-bgAlternate)' }}>
    {children}
  </div>
);

export const NoWrap = () => (
  <MediumContainer>
    <TextBody noWrap as="p" display="block">
      As with any asset, the value of Digital Currencies can
    </TextBody>
  </MediumContainer>
);

export const TextOverflowEllipsis = () => (
  <MediumContainer>
    <TextBody as="p" display="block" overflow="truncate">
      As with any asset, the value of Digital Currencies can go up or down and there can be a
      substantial risk that you lose money buying, selling, holding, or investing in digital
      currencies. You should carefully consider whether trading or holding Digital Currencies is
      suitable for you in light of your financial condition. Coinbase is not registered with the
      U.S. Securities and Exchange Commission and does not offer securities services in the United
      States or to U.S. persons.
    </TextBody>
  </MediumContainer>
);

export const TextOverflowClip = () => (
  <MediumContainer>
    <TextBody as="p" display="block" overflow="clip">
      Crypto address 0xf847047c69726b4049a5b866c8fa37cfe4ed614f. As with any asset, the value of
      Digital Currencies can go up or down and there can be a substantial risk that you lose money
      buying, selling, holding, or investing in digital currencies. You should carefully consider
      whether trading or holding Digital Currencies is suitable for you in light of your financial
      condition. Coinbase is not registered with the U.S. Securities and Exchange Commission and
      does not offer securities services in the United States or to U.S. persons.
    </TextBody>
  </MediumContainer>
);

export const TextNumberOfLines = () => (
  <VStack maxWidth={300}>
    <TextBody as="p" display="block" numberOfLines={2}>
      Crypto address 0xf847047c69726b4049a5b866c8fa37cfe4ed614f. As with any asset, the value of
      Digital Currencies can go up or down and there can be a substantial risk that you lose money
      buying, selling, holding, or investing in digital currencies. You should carefully consider
      whether trading or holding Digital Currencies is suitable for you in light of your financial
      condition. Coinbase is not registered with the U.S. Securities and Exchange Commission and
      does not offer securities services in the United States or to U.S. persons.
    </TextBody>
  </VStack>
);

export const TextNumberOfLinesSiblings = () => (
  <VStack gap={3} maxWidth={300}>
    <TextBody as="p" display="block" numberOfLines={1} overflow="break">
      Crypto address 0xf847047c69726b4049a5b866c8fa37cfe4ed614f. As with any asset, the value of
      Digital Currencies can go up or down and there can be a substantial risk that you lose money
      buying, selling, holding, or investing in digital currencies. You should carefully consider
      whether trading or holding Digital Currencies is suitable for you in light of your financial
      condition. Coinbase is not registered with the U.S. Securities and Exchange Commission and
      does not offer securities services in the United States or to U.S. persons.
    </TextBody>
    <TextBody as="p" display="block" numberOfLines={2} overflow="break">
      Crypto address 0xf847047c69726b4049a5b866c8fa37cfe4ed614f. As with any asset, the value of
      Digital Currencies can go up or down and there can be a substantial risk that you lose money
      buying, selling, holding, or investing in digital currencies. You should carefully consider
      whether trading or holding Digital Currencies is suitable for you in light of your financial
      condition. Coinbase is not registered with the U.S. Securities and Exchange Commission and
      does not offer securities services in the United States or to U.S. persons.
    </TextBody>
    <TextBody as="p" display="block" numberOfLines={3} overflow="break">
      Crypto address 0xf847047c69726b4049a5b866c8fa37cfe4ed614f. As with any asset, the value of
      Digital Currencies can go up or down and there can be a substantial risk that you lose money
      buying, selling, holding, or investing in digital currencies. You should carefully consider
      whether trading or holding Digital Currencies is suitable for you in light of your financial
      condition. Coinbase is not registered with the U.S. Securities and Exchange Commission and
      does not offer securities services in the United States or to U.S. persons.
    </TextBody>
  </VStack>
);

export const TextNumberOfLinesNested = () => (
  <VStack gap={3} maxWidth={300}>
    <TextBody as="p" display="block" numberOfLines={2}>
      <TextBody as="p" display="block" numberOfLines={3}>
        The parent Text says this should only wrap to 2 lines, but the child which actually renders
        this text says it should wrap up to 3 lines.
      </TextBody>
    </TextBody>
  </VStack>
);

export const TextNumberOfLinesCustomSpacing = () => {
  return (
    <VStack gap={3} maxWidth={300}>
      <Box as="span" padding={2}>
        <TextBody as="p" display="block" numberOfLines={2}>
          Crypto address 0xf847047c69726b4049a5b866c8fa37cfe4ed614f. As with any asset, the value of
          Digital Currencies can go up or down and there can be a substantial risk that you lose
          money buying, selling, holding, or investing in digital currencies. You should carefully
          consider whether trading or holding Digital Currencies is suitable for you in light of
          your financial condition. Coinbase is not registered with the U.S. Securities and Exchange
          Commission and does not offer securities services in the United States or to U.S. persons.
        </TextBody>
      </Box>
      <Box
        as="span"
        padding={{
          base: 4,
          tablet: 3,
          desktop: 2,
        }}
      >
        <TextBody as="p" display="block" numberOfLines={2}>
          Crypto address 0xf847047c69726b4049a5b866c8fa37cfe4ed614f. As with any asset, the value of
          Digital Currencies can go up or down and there can be a substantial risk that you lose
          money buying, selling, holding, or investing in digital currencies. You should carefully
          consider whether trading or holding Digital Currencies is suitable for you in light of
          your financial condition. Coinbase is not registered with the U.S. Securities and Exchange
          Commission and does not offer securities services in the United States or to U.S. persons.
        </TextBody>
      </Box>
    </VStack>
  );
};

export const Uppercase = () => (
  <TextBody as="p" display="block" textTransform="uppercase">
    uppercase
  </TextBody>
);

export const Lowercase = () => (
  <TextBody as="p" display="block" textTransform="lowercase">
    Lowercase
  </TextBody>
);

export const Capitalize = () => (
  <TextBody as="p" display="block" textTransform="capitalize">
    capitalize
  </TextBody>
);

export const Sub = () => <TextBody as="sub">sub</TextBody>;

export const Strong = () => <TextBody as="strong">strong</TextBody>;

export const Bold = () => (
  <TextBody as="p" display="block">
    b
  </TextBody>
);

export const DescriptionDlDd = () => (
  <dl>
    <TextBody as="dt" display="block">
      Coffee
    </TextBody>
    <TextBody as="dd" display="block">
      Black hot drink
    </TextBody>
    <div>
      <TextBody as="dt" display="block">
        Milk
      </TextBody>
      <TextBody as="dd" display="block">
        White cold drink
      </TextBody>
    </div>
  </dl>
);

export const Time = () => (
  <TextBody as="time" dateTime="2020-10-10">
    2020-10-10
  </TextBody>
);

export const CustomStyle = () => (
  <>
    {renderHeaderComponents({ style: { background: 'coral', display: 'block' } })}
    {textComponents.map((Component) => {
      const name = (Component as { displayName?: string }).displayName?.slice(4);
      return (
        <Component key={name} as="p" display="block" style={{ background: 'coral ' }}>
          {name}
        </Component>
      );
    })}
  </>
);

export default {
  title: 'Components/Text (tsx)',
  component: TextDisplay1,
};
