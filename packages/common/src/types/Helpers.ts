// Recursive key for nested objects
export type RecursiveKeyOf<T> = {
  [K in keyof T & (string | number)]: T[K] extends object[]
    ? `${K}`
    : T[K] extends object
      ? `${K}.${RecursiveKeyOf<T[K]>}`
      : `${K}`;
}[keyof T & (string | number)];
