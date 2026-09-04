/* -------------------------------------------------------------------------- */
/*                        Overrides for narrower types                        */
/* -------------------------------------------------------------------------- */

declare module 'react-docgen-typescript' {
  export function withCustomConfig(
    path: string,
    params: import('react-docgen-typescript/lib/parser').ParserOptions,
  ): { parse: (files: string[]) => import('@coinbase/docusaurus-plugin-docgen').Doc[] };
}

declare module ':docgen/_types/sharedParentTypes' {
  export const sharedParentTypes: import('@coinbase/docusaurus-plugin-docgen').SharedParentTypes;
}

declare module ':docgen/_types/sharedTypeAliases' {
  export const sharedTypeAliases: import('@coinbase/docusaurus-plugin-docgen').SharedTypeAliases;
}
