/**
 * Emulates pausing in interaction tests
 * @link https://storybook.js.org/docs/react/writing-stories/play-function
 */
export const pauseStory = async (delay: number) =>
  new Promise((resolve) => setTimeout(resolve, delay));
