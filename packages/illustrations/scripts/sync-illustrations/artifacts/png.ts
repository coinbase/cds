import sharp from 'sharp';

/** Rasterizes an SVG at its intrinsic (viewBox) size, for destinations that cannot render SVG. */
export const rasterizePng = (svg: string) => sharp(Buffer.from(svg)).png().toBuffer();
