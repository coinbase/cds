export type OptionalElement<T> = false | null | undefined | React.ReactElement<T>;

export type ElementChildren<T> = OptionalElement<T> | OptionalElement<T>[];
