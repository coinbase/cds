import type { KebabCase } from 'type-fest';

export type AnyObject = Record<string, unknown>;
export type StringKey<T> = T extends string ? T : string;

export type CssVariable<T extends string> = `--${KebabCase<T>}`;
export type CssVariableFn<T extends string> = `var(${CssVariable<T>})`;
