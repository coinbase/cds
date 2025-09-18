import { hsl, type HSLColor } from 'd3-color';

import type { AvatarFallbackColor } from '../types';

const hashFromString = (s: string): number =>
  s.split('').reduce((a, b) => {
    a = (a << 5) - a + b.charCodeAt(0);
    return a & a;
  }, 0);

const rgbFromHash = (hash: number): string => {
  const rgbValue = [0, 0, 0];
  rgbValue.forEach((_, idx) => {
    const newVal = (hash >> (idx * 8)) & 255;
    rgbValue[idx] = newVal;
  });

  return `rgb(${rgbValue[0]}, ${rgbValue[1]}, ${rgbValue[2]})`;
};

export const rgbToAvatarFallbackColor = (color: string): AvatarFallbackColor => {
  const hslColor = hsl(color);
  const hue = Math.round(hslColor.h);
  // if gray (low saturation)
  if (hslColor.s < 0.3 || Number.isNaN(hslColor.s)) return 'gray';
  // if green or yellow
  if (hue === 0 || (hue >= 1 && hue <= 79)) return 'green' as const;
  if (hue >= 80 && hue <= 169) return 'teal' as const;
  if (hue >= 70 && hue <= 249) return 'purple' as const;
  // if red or pink or orange
  if ((hue >= 250 && hue <= 344) || hue === 345) return 'pink' as const;

  // // Map hue ranges to all available colors
  // // Hue range: 0-360 degrees
  // if (hue >= 0 && hue < 20) return 'red';           // 0-19: Red
  // if (hue >= 20 && hue < 40) return 'orange';       // 20-39: Orange
  // if (hue >= 40 && hue < 70) return 'yellow';       // 40-69: Yellow
  // if (hue >= 70 && hue < 100) return 'chartreuse';  // 70-99: Chartreuse
  // if (hue >= 100 && hue < 140) return 'green';      // 100-139: Green
  // if (hue >= 140 && hue < 180) return 'teal';       // 140-179: Teal
  // if (hue >= 180 && hue < 220) return 'blue';       // 180-219: Blue
  // if (hue >= 220 && hue < 260) return 'indigo';     // 220-259: Indigo
  // if (hue >= 260 && hue < 300) return 'purple';     // 260-299: Purple
  // if (hue >= 300 && hue < 340) return 'pink';       // 300-339: Pink
  // if (hue >= 340 && hue <= 360) return 'red';       // 340-360: Red (wraps back)

  return 'gray';
};

/**
 * Generates a fallback color for an Avatar based on a unique identifier
 */
export const getAvatarFallbackColor = (id: string) => {
  const hash = hashFromString(id);
  const rgbValue = rgbFromHash(hash);
  return rgbToAvatarFallbackColor(rgbValue);
};
