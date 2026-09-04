export const emptyArray = [];

export const arrayToObject = <T extends string | number>(arr: T[] | readonly T[]) =>
  [...arr].reduce(
    (prev, next) => {
      const keyIsHyphenated = typeof next === 'string' && next.includes('-');
      return keyIsHyphenated
        ? {
            ...prev,
            [`'${next}'`]: next,
          }
        : {
            ...prev,
            [`${next}`]: next,
          };
    },
    {} as { [key in T]: key },
  );

export const arrayIncludes = <T>(arr: T[], arg: T) => arr.includes(arg);
