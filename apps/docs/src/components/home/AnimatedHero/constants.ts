/** Total number of rows in the grid. */
export const numberOfRows = 4;
/** Total number of columns in the grid. */
export const numberOfColumns = 15;

/**
 * Characters and display values that each grid cell animation will iterate through.
 */
export const characterSet = [
  'A',
  '#F07836',
  'I',
  'G',
  'Y',
  '@',
  '+',
  'M',
  'X',
  '5',
  '9',
  '(',
  '3',
  'Q',
  '#E5CD30',
  'D',
  'E',
  '7',
  '#27AD75',
  'C',
  'B',
  '#',
  'V',
  '-',
  'L',
  'N',
  'U',
  'J',
  'S',
  '6',
  'P',
  '1',
  '!',
  '#CD99FD',
  ' ',
  '$',
  'W',
  '<',
  '/',
  ':',
  '0',
  '4',
  'H',
  '&',
  '#E175D6',
  'F',
  'R',
  'K',
  '2',
  'T',
  '#578BFA',
  ',',
  'O',
  '8',
  '%',
  '~',
  'Z',
];

/**
 * All the messages that the animated hero can display.
 */
export const messages = [
  [
    ['C', 'O', 'I', 'N', 'B', 'A', 'S', 'E', ' ', 'D', 'E', 'S', 'I', 'G', 'N'],
    ['I', 'S', ' ', 'O', 'P', 'E', 'N', ' ', 'S', 'O', 'U', 'R', 'C', 'E', ' '],
    ['F', 'O', 'R', ' ', 'C', 'R', 'E', 'A', 'T', 'I', 'N', 'G', ' ', ' ', ' '],
    ['C', 'R', 'Y', 'P', 'T', 'O', ' ', 'A', 'P', 'P', 'S', ' ', ' ', ' ', ' '],
  ],
  [
    ['H', 'I', 'G', 'H', ' ', 'Q', 'U', 'A', 'L', 'I', 'T', 'Y', ' ', ' ', ' '],
    ['C', 'O', 'M', 'P', 'O', 'N', 'E', 'N', 'T', 'S', ' ', 'U', 'S', 'E', 'D'],
    ['I', 'N', ' ', 'A', 'L', 'L', ' ', 'C', 'O', 'I', 'N', 'B', 'A', 'S', 'E'],
    ['P', 'R', 'O', 'D', 'U', 'C', 'T', 'S', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  ],
  [
    ['C', 'R', 'O', 'S', 'S', ' ', 'P', 'L', 'A', 'T', 'F', 'O', 'R', 'M', ' '],
    ['C', 'O', 'M', 'P', 'A', 'T', 'I', 'B', 'I', 'L', 'I', 'T', 'Y', ' ', ' '],
    ['F', 'O', 'R', ' ', 'R', 'E', 'A', 'C', 'T', ' ', 'D', 'O', 'M', ' ', ' '],
    ['&', ' ', 'N', 'A', 'T', 'I', 'V', 'E', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  ],
  [
    ['R', 'U', 'N', 'N', 'I', 'N', 'G', ' ', 'O', 'N', ':', ' ', ' ', ' ', ' '],
    ['C', 'D', 'S', ' ', 'V', 'E', 'R', 'S', 'I', 'O', 'N', ' ', '8', ' ', ' '],
    ['R', 'E', 'A', 'C', 'T', ' ', 'N', 'A', 'T', 'I', 'V', 'E', ' ', '7', '4'],
    ['R', 'E', 'A', 'C', 'T', ' ', '1', '8', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  ],
  [
    ['N', 'E', 'W', ' ', 'C', 'O', 'M', 'P', 'O', 'N', 'E', 'N', 'T', 'S', ':'],
    ['S', 'L', 'I', 'D', 'E', ' ', 'B', 'U', 'T', 'T', 'O', 'N', ',', ' ', ' '],
    ['P', 'A', 'G', 'I', 'N', 'A', 'T', 'I', 'O', 'N', ',', ' ', 'W', 'E', 'B'],
    ['T', 'R', 'A', 'Y', ',', ' ', '&', ' ', 'M', 'O', 'R', 'E', '!', ' ', ' '],
  ],
];

/**
 * Maps each message's characters to its index in the characterSet.
 */
export const messagesCharSetIndices = messages.map((message) => {
  return message.map((line) => {
    return line.map((character) => {
      const index = characterSet.indexOf(character);
      return index === -1 ? 36 : index;
    });
  });
});

export const messageAccessibilityDescriptions = messages.map(
  (message) =>
    `Current message: ${message
      .map((row) => row.join('').trim())
      .filter((row) => !!row)
      .join(' ')}. Press Enter or Space to skip to the next message.`,
);

// Grid animation constants
export const autoTransitionIntervalMs = 10000; // Interval for automatic message rotation
export const gridCellDistanceDelayMs = 80; // Delay per grid unit for ripple effect
export const maxUpdatesPerSecond = 20;
