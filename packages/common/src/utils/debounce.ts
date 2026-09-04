// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
export function debounce<Params extends unknown[]>(
  func: (...args: Params) => unknown,
  timeout: number,
): (...args: Params) => void {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: Params) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, timeout);
  };
}
