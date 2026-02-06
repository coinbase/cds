import { Carousel, CarouselItem } from '@coinbase/cds-mobile/carousel';
import figma from '@figma/code-connect/react';

figma.connect(
  Carousel,
  'https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/%E2%9C%A8-CDS-Components?node-id=48671-10433',
  {
    imports: ["import { Carousel, CarouselItem } from '@coinbase/cds-mobile/carousel'"],
    example: () => (
      <Carousel>
        <CarouselItem id="1">{/* Item content */}</CarouselItem>
        <CarouselItem id="2">{/* Item content */}</CarouselItem>
        <CarouselItem id="3">{/* Item content */}</CarouselItem>
      </Carousel>
    ),
  },
);
