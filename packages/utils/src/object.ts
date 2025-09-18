import type { AnyObject, StringKey } from './types';

/** @deprecated Do not use */
export const emptyObject = {};

export function entries<T extends Record<string, unknown>>(item: T) {
  return Object.entries(item) as [keyof T, T[keyof T]][];
}

export function mapKeys<
  T extends AnyObject,
  K extends (value: T[keyof T], key: keyof T, obj: T) => StringKey<unknown>,
>(obj: T, callbackFn: K) {
  return Object.keys(obj).reduce(
    (acc, key: keyof T) => {
      const newKey = callbackFn(obj[key], key, obj) as ReturnType<typeof callbackFn>;
      acc[newKey] = obj[key];
      return acc;
    },
    {} as { [key in ReturnType<K>]: T[keyof T] },
  );
}

export function mapValues<
  T extends AnyObject,
  K extends (value: T[keyof T], key: keyof T, i: number) => unknown,
>(obj: T, callbackFn: K) {
  return Object.keys(obj).reduce(
    (acc, key: keyof T, i) => {
      acc[key] = callbackFn(obj[key], key, i) as ReturnType<typeof callbackFn>;
      return acc;
    },
    {} as { [key in keyof T]: ReturnType<K> },
  );
}

export const renameKeys = <T>(obj: Record<string, T>, newKeys: Record<string, string>) => {
  const objClone = { ...obj };

  const transformedObj = Object.keys(objClone).reduce(
    (res, key) => {
      const newKey = newKeys[key] || key;
      res[newKey] = objClone[key];
      return res;
    },
    {} as Record<string, T>,
  );
  return transformedObj;
};

/**
 *
 * @param baseObj The base object you want to merge onto or return if condition is not met
 * @param objToMerge The object you want to merge
 * @returns newly merged object
 */
export function merge<
  BaseObj extends AnyObject | Readonly<AnyObject>,
  ConditionalObj extends AnyObject | Readonly<AnyObject>,
>(baseObj: BaseObj, objToMerge: ConditionalObj | undefined | false) {
  return { ...baseObj, ...(objToMerge ?? emptyObject) };
}
