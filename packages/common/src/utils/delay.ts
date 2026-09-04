/** Delay
 * @example await delay(200);
 */
export const delay = async (milliseconds: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
