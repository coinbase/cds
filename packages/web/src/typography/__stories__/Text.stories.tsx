import React from 'react';

import { Box } from '../../layout/Box';
import { VStack } from '../../layout/VStack';
import type { TextProps } from '../index';
import { Text } from '../index';

type FontVariant =
  | 'title3'
  | 'title4'
  | 'headline'
  | 'body'
  | 'label1'
  | 'label2'
  | 'caption'
  | 'legal';

const textFontVariants: FontVariant[] = [
  'title3',
  'title4',
  'headline',
  'body',
  'label1',
  'label2',
  'caption',
  'legal',
];

const renderHeaderComponents = (props?: TextProps<'h1' | 'h2' | 'h3' | 'h4'>) => (
  <>
    <Text as="h1" font="display1" {...props}>
      Display1
    </Text>
    <Text as="h2" font="display2" {...props}>
      Display2
    </Text>
    <Text as="h3" font="display3" {...props}>
      Display3
    </Text>
    <Text as="h3" font="title1" {...props}>
      Title1
    </Text>
    <Text as="h4" font="title2" {...props}>
      Title2
    </Text>
  </>
);

export const Normal = () => (
  <>
    {renderHeaderComponents({ display: 'block' })}
    {textFontVariants.map((font) => (
      <Text key={font} as="p" display="block" font={font}>
        {font.charAt(0).toUpperCase() + font.slice(1)}
      </Text>
    ))}
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
    {textFontVariants.map((font) => (
      <Text key={font} mono as="p" display="block" font={font}>
        {font.charAt(0).toUpperCase() + font.slice(1)}
      </Text>
    ))}
  </>
);

export const SlashedZero = () => (
  <Text slashedZero as="p" font="body">
    OZY28019
  </Text>
);

export const TabularNumbers = () => (
  <>
    <Text tabularNumbers as="p" display="block" font="body" textAlign="end">
      91.23450
    </Text>
    <Text tabularNumbers as="p" display="block" font="body" textAlign="end">
      11.98762
    </Text>
  </>
);

export const SelectableNone = () => (
  <Text as="p" display="block" font="body" userSelect="none">
    BTC
  </Text>
);

export const SelectableText = () => (
  <Text as="p" display="block" font="body" userSelect="text">
    Balance: 1,820,29.56
  </Text>
);

export const SelectableAll = () => (
  <Text slashedZero as="p" display="block" font="body" userSelect="all">
    bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh
  </Text>
);

export const Underline = () => (
  <Text underline as="p" display="block" font="body">
    Learn more
  </Text>
);

export const Strikethrough = () => (
  <Text as="s" font="body" textDecoration="line-through">
    Manual verification
  </Text>
);

const MediumContainer = ({ children }: { children?: React.ReactNode }) => (
  <div style={{ width: '35%', height: '50px', backgroundColor: 'var(--color-bgAlternate)' }}>
    {children}
  </div>
);

export const NoWrap = () => (
  <MediumContainer>
    <Text noWrap as="p" display="block" font="body">
      As with any asset, the value of Digital Currencies can
    </Text>
  </MediumContainer>
);

export const TextOverflowEllipsis = () => (
  <MediumContainer>
    <Text as="p" display="block" font="body" overflow="truncate">
      As with any asset, the value of Digital Currencies can go up or down and there can be a
      substantial risk that you lose money buying, selling, holding, or investing in digital
      currencies. You should carefully consider whether trading or holding Digital Currencies is
      suitable for you in light of your financial condition. Coinbase is not registered with the
      U.S. Securities and Exchange Commission and does not offer securities services in the United
      States or to U.S. persons.
    </Text>
  </MediumContainer>
);

export const TextOverflowClip = () => (
  <MediumContainer>
    <Text as="p" display="block" font="body" overflow="clip">
      Crypto address 0xf847047c69726b4049a5b866c8fa37cfe4ed614f. As with any asset, the value of
      Digital Currencies can go up or down and there can be a substantial risk that you lose money
      buying, selling, holding, or investing in digital currencies. You should carefully consider
      whether trading or holding Digital Currencies is suitable for you in light of your financial
      condition. Coinbase is not registered with the U.S. Securities and Exchange Commission and
      does not offer securities services in the United States or to U.S. persons.
    </Text>
  </MediumContainer>
);

export const TextNumberOfLines = () => (
  <VStack maxWidth={300}>
    <Text as="p" display="block" font="body" numberOfLines={2}>
      Crypto address 0xf847047c69726b4049a5b866c8fa37cfe4ed614f. As with any asset, the value of
      Digital Currencies can go up or down and there can be a substantial risk that you lose money
      buying, selling, holding, or investing in digital currencies. You should carefully consider
      whether trading or holding Digital Currencies is suitable for you in light of your financial
      condition. Coinbase is not registered with the U.S. Securities and Exchange Commission and
      does not offer securities services in the United States or to U.S. persons.
    </Text>
  </VStack>
);

export const TextNumberOfLinesSiblings = () => (
  <VStack gap={3} maxWidth={300}>
    <Text as="p" display="block" font="body" numberOfLines={1} overflow="break">
      Crypto address 0xf847047c69726b4049a5b866c8fa37cfe4ed614f. As with any asset, the value of
      Digital Currencies can go up or down and there can be a substantial risk that you lose money
      buying, selling, holding, or investing in digital currencies. You should carefully consider
      whether trading or holding Digital Currencies is suitable for you in light of your financial
      condition. Coinbase is not registered with the U.S. Securities and Exchange Commission and
      does not offer securities services in the United States or to U.S. persons.
    </Text>
    <Text as="p" display="block" font="body" numberOfLines={2} overflow="break">
      Crypto address 0xf847047c69726b4049a5b866c8fa37cfe4ed614f. As with any asset, the value of
      Digital Currencies can go up or down and there can be a substantial risk that you lose money
      buying, selling, holding, or investing in digital currencies. You should carefully consider
      whether trading or holding Digital Currencies is suitable for you in light of your financial
      condition. Coinbase is not registered with the U.S. Securities and Exchange Commission and
      does not offer securities services in the United States or to U.S. persons.
    </Text>
    <Text as="p" display="block" font="body" numberOfLines={3} overflow="break">
      Crypto address 0xf847047c69726b4049a5b866c8fa37cfe4ed614f. As with any asset, the value of
      Digital Currencies can go up or down and there can be a substantial risk that you lose money
      buying, selling, holding, or investing in digital currencies. You should carefully consider
      whether trading or holding Digital Currencies is suitable for you in light of your financial
      condition. Coinbase is not registered with the U.S. Securities and Exchange Commission and
      does not offer securities services in the United States or to U.S. persons.
    </Text>
  </VStack>
);

export const TextNumberOfLinesNested = () => (
  <VStack gap={3} maxWidth={300}>
    <Text as="p" display="block" font="body" numberOfLines={2}>
      <Text as="p" display="block" font="body" numberOfLines={3}>
        The parent Text says this should only wrap to 2 lines, but the child which actually renders
        this text says it should wrap up to 3 lines.
      </Text>
    </Text>
  </VStack>
);

export const TextNumberOfLinesCustomSpacing = () => {
  return (
    <VStack gap={3} maxWidth={300}>
      <Box as="span" padding={2}>
        <Text as="p" display="block" font="body" numberOfLines={2}>
          Crypto address 0xf847047c69726b4049a5b866c8fa37cfe4ed614f. As with any asset, the value of
          Digital Currencies can go up or down and there can be a substantial risk that you lose
          money buying, selling, holding, or investing in digital currencies. You should carefully
          consider whether trading or holding Digital Currencies is suitable for you in light of
          your financial condition. Coinbase is not registered with the U.S. Securities and Exchange
          Commission and does not offer securities services in the United States or to U.S. persons.
        </Text>
      </Box>
      <Box
        as="span"
        padding={{
          base: 4,
          tablet: 3,
          desktop: 2,
        }}
      >
        <Text as="p" display="block" font="body" numberOfLines={2}>
          Crypto address 0xf847047c69726b4049a5b866c8fa37cfe4ed614f. As with any asset, the value of
          Digital Currencies can go up or down and there can be a substantial risk that you lose
          money buying, selling, holding, or investing in digital currencies. You should carefully
          consider whether trading or holding Digital Currencies is suitable for you in light of
          your financial condition. Coinbase is not registered with the U.S. Securities and Exchange
          Commission and does not offer securities services in the United States or to U.S. persons.
        </Text>
      </Box>
    </VStack>
  );
};

export const Uppercase = () => (
  <Text as="p" display="block" font="body" textTransform="uppercase">
    uppercase
  </Text>
);

export const Lowercase = () => (
  <Text as="p" display="block" font="body" textTransform="lowercase">
    Lowercase
  </Text>
);

export const Capitalize = () => (
  <Text as="p" display="block" font="body" textTransform="capitalize">
    capitalize
  </Text>
);

export const Sub = () => (
  <Text as="sub" font="body">
    sub
  </Text>
);

export const Strong = () => (
  <Text as="strong" font="body">
    strong
  </Text>
);

export const Bold = () => (
  <Text as="p" display="block" font="body">
    b
  </Text>
);

export const DescriptionDlDd = () => (
  <dl>
    <Text as="dt" display="block" font="body">
      Coffee
    </Text>
    <Text as="dd" display="block" font="body">
      Black hot drink
    </Text>
    <div>
      <Text as="dt" display="block" font="body">
        Milk
      </Text>
      <Text as="dd" display="block" font="body">
        White cold drink
      </Text>
    </div>
  </dl>
);

export const Time = () => (
  <Text as="time" dateTime="2020-10-10" font="body">
    2020-10-10
  </Text>
);

export const CustomStyle = () => (
  <>
    {renderHeaderComponents({ style: { background: 'coral', display: 'block' } })}
    {textFontVariants.map((font) => (
      <Text key={font} as="p" display="block" font={font} style={{ background: 'coral ' }}>
        {font.charAt(0).toUpperCase() + font.slice(1)}
      </Text>
    ))}
  </>
);

export default {
  title: 'Components/Text (tsx)',
  component: Text,
};
