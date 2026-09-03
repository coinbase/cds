import type { NodeDocument } from './fetchIllustrationLibrary';

export function getSize(document: NodeDocument) {
  let height = 0;
  let width = 0;
  if ('size' in document && document.size) {
    width = document.size.x;
    height = document.size.y;
  }

  return {
    width,
    height,
  };
}
