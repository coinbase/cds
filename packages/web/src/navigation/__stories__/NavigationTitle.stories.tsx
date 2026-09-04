import { VStack } from '../../layout/VStack';
import { NavigationTitle } from '../NavigationTitle';

export default {
  title: 'Components/Navigation/NavigationTitle',
  component: NavigationTitle,
};

export const Default = () => {
  return <NavigationTitle>Page Title</NavigationTitle>;
};

export const FontVariants = () => {
  return (
    <VStack gap={6}>
      <NavigationTitle font="title1">Title 1 (Default)</NavigationTitle>
      <NavigationTitle font="title2">Title 2</NavigationTitle>
      <NavigationTitle font="title3">Title 3</NavigationTitle>
      <NavigationTitle font="headline">Headline</NavigationTitle>
      <NavigationTitle font="display1">Display 1</NavigationTitle>
      <NavigationTitle font="display2">Display 2</NavigationTitle>
    </VStack>
  );
};

export const SemanticElements = () => {
  return (
    <VStack gap={4}>
      <NavigationTitle as="h1">H1 Navigation Title</NavigationTitle>
      <NavigationTitle as="h2">H2 Navigation Title</NavigationTitle>
      <NavigationTitle as="h3">H3 Navigation Title</NavigationTitle>
      <NavigationTitle as="h4">H4 Navigation Title</NavigationTitle>
      <NavigationTitle as="div">Div Navigation Title</NavigationTitle>
      <NavigationTitle as="span">Span Navigation Title</NavigationTitle>
    </VStack>
  );
};

export const Colors = () => {
  return (
    <VStack gap={4}>
      <NavigationTitle color="fg">Default Color</NavigationTitle>
      <NavigationTitle color="fgMuted">Muted Color</NavigationTitle>
      <NavigationTitle color="fgPrimary">Primary Color</NavigationTitle>
      <NavigationTitle color="fgPositive">Positive Color</NavigationTitle>
      <NavigationTitle color="fgWarning">Warning Color</NavigationTitle>
      <NavigationTitle color="fgNegative">Negative Color</NavigationTitle>
    </VStack>
  );
};

export const TextAlignment = () => {
  return (
    <VStack gap={4} width="100%">
      <NavigationTitle textAlign="start">Left Aligned Title</NavigationTitle>
      <NavigationTitle textAlign="center">Center Aligned Title</NavigationTitle>
      <NavigationTitle textAlign="end">Right Aligned Title</NavigationTitle>
    </VStack>
  );
};

export const OverflowBehavior = () => {
  return (
    <VStack gap={4} width="300px">
      <NavigationTitle overflow="truncate">
        This is a very long navigation title that will get truncated with ellipsis
      </NavigationTitle>
      <NavigationTitle overflow="wrap">
        This is a very long navigation title that will wrap to multiple lines
      </NavigationTitle>
      <NavigationTitle overflow="break">
        Thisissuperlongwithoutspacesandwillbreakappropriately
      </NavigationTitle>
    </VStack>
  );
};

export const NumberOfLines = () => {
  return (
    <VStack gap={4} width="300px">
      <NavigationTitle numberOfLines={1}>
        This long title will be limited to just one line no matter how much content there is
      </NavigationTitle>
      <NavigationTitle numberOfLines={2}>
        This longer title will be limited to exactly two lines and will cut off after that even if
        there is more content to display
      </NavigationTitle>
    </VStack>
  );
};

export const Monospace = () => {
  return (
    <VStack gap={4}>
      <NavigationTitle>Regular Font Family</NavigationTitle>
      <NavigationTitle mono>Monospace Font Family</NavigationTitle>
    </VStack>
  );
};

export const TextDecorations = () => {
  return (
    <VStack gap={4}>
      <NavigationTitle>Normal Title</NavigationTitle>
      <NavigationTitle underline>Underlined Title</NavigationTitle>
      <NavigationTitle noWrap>
        This title will not wrap even if the content is very long
      </NavigationTitle>
    </VStack>
  );
};
