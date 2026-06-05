// url=https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/CDS-Components?node-id=48671-10433
// source=packages/mobile/src/carousel/Carousel.tsx
// component=Carousel
import figma from 'figma';

const instance = figma.selectedInstance;

// --- property extractions ---
const showHeader = instance.getBoolean('show header');
const hideTitle = instance.getBoolean('hide title');
const title = instance.getString('title');
const showPagination = instance.getBoolean('show pagination');
const showNavigation = instance.getBoolean('↳ show navigation');
const showAutoplay = instance.getBoolean('↳ show autoplay');

// Header is hidden when show header is false or navigation is explicitly hidden
const hideNavigation = !showHeader || !showNavigation;
// Title is shown when the header is visible and the title is not hidden
const showTitle = showHeader && !hideTitle;

// eslint-disable-next-line no-restricted-exports
export default {
  example: figma.code`<Carousel
  ${showTitle ? figma.code`title="${title}"` : ''}
  ${hideNavigation ? 'hideNavigation' : ''}
  ${!showPagination ? 'hidePagination' : ''}
  ${showAutoplay ? 'autoplay' : ''}
>
  <CarouselItem id="item-1" width="100%">
    {/* carousel item content */}
  </CarouselItem>
  <CarouselItem id="item-2" width="100%">
    {/* carousel item content */}
  </CarouselItem>
  <CarouselItem id="item-3" width="100%">
    {/* carousel item content */}
  </CarouselItem>
</Carousel>`,
  imports: ['import { Carousel, CarouselItem } from "@coinbase/cds-mobile/carousel"'],
  id: 'card-carousel-mobile',
  metadata: { nestable: false },
};
