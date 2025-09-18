/** Returns number if the type T extends number, e.g. if T is a number or a number string like '2' or '5.5'. Allows for converting object keys that are numbers (such as the `space` scale vars) from string type to number type. */
export type TypeOrNumber<T> = T extends `${infer N extends number}` ? N : T;
