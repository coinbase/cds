export function keyToRouteName(key: string) {
  return `Debug${key}` as const;
}
