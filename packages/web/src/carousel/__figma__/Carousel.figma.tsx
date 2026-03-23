import figma from '@figma/code-connect/react';

import { Carousel, CarouselItem } from '../';

figma.connect(
  Carousel,
  'https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/%E2%9C%A8-CDS-Components?node-id=48671-10433',
  {
    variant: { platform: 'desktop' },
    imports: ["import { Carousel, CarouselItem } from '@coinbase/cds-web/carousel'"],
    props: {
      title: figma.boolean('show header', {
        true: figma.string('title'),
        false: undefined,
      }),
      hidePagination: figma.boolean('show pagination', {
        true: undefined,
        false: true,
      }),
    },
    example: ({ title, hidePagination }) => (
      <Carousel hidePagination={hidePagination} paginationVariant="dot" title={title}>
        <CarouselItem id="1">{/* Item content */}</CarouselItem>
        <CarouselItem id="2">{/* Item content */}</CarouselItem>
        <CarouselItem id="3">{/* Item content */}</CarouselItem>
      </Carousel>
    ),
  },
);
