import type { ExtractedColor, TokenMatch } from './colorUtils';

export type ResultEntry = {
  filename: string;
  imgSrc?: string;
  imgDataURL?: string;
  imgWidth: number;
  imgHeight: number;
  colors?: ExtractedColor[];
  manualRaw?: { hex: string; r: number; g: number; b: number };
  primary: TokenMatch;
  secondary: TokenMatch;
};

export type Screen = 'idle' | 'loading' | 'result';
