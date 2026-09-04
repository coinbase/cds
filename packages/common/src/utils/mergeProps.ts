export type UnknownProps = Record<string, unknown>;

export function mergeProps<T>(prev: UnknownProps, next: UnknownProps): T {
  const result: UnknownProps = { ...prev };

  Object.entries(next).forEach(([key, value]) => {
    if (key === 'className' && typeof prev[key] === 'string' && typeof next[key] === 'string') {
      result[key] += ` ${value}`;
    } else if (
      /^on[A-Z]/.test(key) &&
      typeof prev[key] === 'function' &&
      typeof next[key] === 'function'
    ) {
      result[key] = (...args: unknown[]) => {
        (prev[key] as (...args: unknown[]) => void)(...args);
        (next[key] as (...args: unknown[]) => void)(...args);
      };
    } else if (value !== undefined) {
      result[key] = value;
    }
  });

  return result as T;
}
