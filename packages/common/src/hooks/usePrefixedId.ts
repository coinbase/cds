import { useId } from 'react';

type IdentifierPrefix = string | string[] | null;

// We use generics to ensure the return type is inferred correctly
type PrefixedIdResult<T extends IdentifierPrefix> = T extends string
  ? string
  : T extends string[]
    ? string[]
    : string;

/**
 * Returns a prefixed id or array of prefixed ids from React.useId
 * that are SSR safe and unique across the application.
 * @param IdentifierPrefix - A string or array of strings to prefix the id with (optional).
 * @link https://react.dev/reference/react/useId#useid
 * @returns string | string[]
 */
export const usePrefixedId = <T extends IdentifierPrefix = null>(
  identifierPrefix?: T,
): PrefixedIdResult<T> => {
  const id = useId();

  // If no prefix is provided, return a random id
  if (!identifierPrefix) return id as PrefixedIdResult<T>;

  // If the prefix is a string, return a single prefixed id
  if (typeof identifierPrefix === 'string') {
    return `${identifierPrefix}-${id}` as PrefixedIdResult<T>;
  }

  // If the prefix is an array of strings, return an array of prefixed ids
  return identifierPrefix.map((prefix) => `${prefix}-${id}`) as PrefixedIdResult<T>;
};
