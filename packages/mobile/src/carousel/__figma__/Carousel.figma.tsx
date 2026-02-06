import React from 'react';
import { figma } from '@figma/code-connect';

import { Carousel, CarouselItem } from '@coinbase/cds-mobile/carousel';

figma.connect(
  Carousel,
  'https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/%E2%9C%A8-CDS-Components?node-id=48671-10433',
  {
    imports: ["import { Carousel, CarouselItem } from '@coinbase/cds-mobile/carousel'"],
    props: {
      hidePagination: figma.boolean('showPagination', {
        true: false,
        false: true,
      }),
      title: figma.boolean('hideTitle', {
        true: undefined,
        false: 'Section header',
      }),
    },
    example: ({ hidePagination, title }) => (
      <Carousel hidePagination={hidePagination} title={title}>
        <CarouselItem id="1">{/* Item content */}</CarouselItem>
        <CarouselItem id="2">{/* Item content */}</CarouselItem>
        <CarouselItem id="3">{/* Item content */}</CarouselItem>
      </Carousel>
    ),
  },
);
